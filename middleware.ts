import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export default clerkMiddleware((auth, req: NextRequest) => {
  // Пропускаємо Stripe вебхуки, щоб вони не проходили через Clerk
  if (req.nextUrl.pathname.startsWith("/api/stripe/webhook")) {
    return NextResponse.next();
  }
  // 对于其他请求，先调用 auth() 然后继续处理
  auth();
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
