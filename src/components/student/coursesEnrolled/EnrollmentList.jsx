import EnrollmentCard from './EnrollmentCard';


export default function EnrollmentList({ courses }) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">No Enrollments Found</h2>
        <p className="text-gray-500 mt-2">Try adjusting your search terms or enroll in a course.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <EnrollmentCard
          key={course.courseId}
          course={{
            id: course.courseId,
            title: course.courseTitle,
            imageUrl: course.courseImageUrl,
          }}
          enrolledAt={course.enrolledAt}
          progress={course.progress}
          completedLessons={course.completedLessons}
          totalLessons={course.totalLessons}
        />
      ))}
    </div>
  );
}
