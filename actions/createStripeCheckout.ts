"use server";

import Stripe from "stripe"; // 🔑 імпорт типів
import stripe from "@/lib/stripe";
import baseUrl from "@/lib/baseUrl";

import { urlFor } from "@/sanity/lib/image";
import getCourseById from "@/sanity/lib/courses/getCourseById";
import { createStudentIfNotExists } from "@/sanity/lib/student/createStudentIfNotExists";
import { clerkClient } from "@clerk/nextjs/server";
import { createEnrollment } from "@/sanity/lib/student/createEnrollment";

export async function createStripeCheckout(courseId: string, userId: string) {
  try {
    // 1. Отримати курс з Sanity
    const course = await getCourseById(courseId);
    const clerkUser = await (await clerkClient()).users.getUser(userId);

    const { emailAddresses, firstName, lastName, imageUrl } = clerkUser;
    const email = emailAddresses[0]?.emailAddress;

    if (!email) throw new Error("User email not found");
    if (!course) throw new Error("Course not found");

    // 2. Створити студента в Sanity, якщо його немає
    const user = await createStudentIfNotExists({
      clerkId: userId,
      email,
      firstName: firstName || email,
      lastName: lastName || "",
      imageUrl: imageUrl || "",
    });

    if (!user) throw new Error("User not found in Sanity");

    // 3. Якщо курс безкоштовний – одразу створюємо enrollment
    if (!course.price || course.price === 0) {
      await createEnrollment({
        studentId: user._id,
        courseId: course._id,
        paymentId: "free",
        amount: 0,
      });

      return { url: `/courses/${course.slug?.current ?? courseId}` };
    }

    // 4. Підготовка Stripe Checkout Session
    const priceInCents = Math.round(course.price * 100);
    const { title, description, image, slug } = course;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title || "Untitled course",
              description: description || "",
              images: image ? [urlFor(image).url() || ""] : [],
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/courses/${slug?.current ?? courseId}?success=true`,
      cancel_url: `${baseUrl}/courses/${slug?.current ?? courseId}?canceled=true`,
      metadata: {
        courseId: course._id,
        userId,
      },
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return { url: session.url! };
  } catch (error) {
    console.error("Error in createStripeCheckout:", error);
    throw new Error("Failed to create checkout session");
  }
}
