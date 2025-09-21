import CourseCard from "@/components/CourseCard";
import Hero from "@/components/Hero";
import { getCourses } from "@/sanity/lib/courses/getCourses";

export default async function Home() {
  const courses = await getCourses();
  return (
    <div className="min-h-screen bg-background">
      <Hero />

      {/* Courses grid */}
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 px-8">
          <div className="h-px flex-1 bg-gradient-to-r from-border/75 via-border to-border/15" />
          <span className="text-sm font-medium text-muted-foreground">
            Highlighted Courses
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-border/75 via-border to-border/15" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              href={`/courses/${course.slug}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
