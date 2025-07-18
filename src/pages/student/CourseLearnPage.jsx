import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/student/dashboard/Navbar';
import LoadingSpinner from '../../components/ui/loading/LoadingSpinner';
import CourseHeader from '../../components/student/enrollCourse/CourseHeader';
import CourseDescription from '../../components/student/enrollCourse/CourseDescription';
import CourseCurriculum from '../../components/student/lesson/CourseCurriculum';
import LessonPlayer from '../../components/student/lesson/LessonPlayer';
import { fetchCourseById } from '../../services/courseService';

export default function CourseLearnPage() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLessonComplete = () => {
        const { sections } = course;

        for (let i = 0; i < sections.length; i++) { // iterate through sections
            const lessons = sections[i].lessons; // get lessons in current section
            if (!lessons || lessons.length === 0) continue; // skip if no lessons
            // Iterate through lessons in current section
            for (let j = 0; j < lessons.length; j++) {
                const lesson = lessons[j]; 

                if (lesson.title === currentLesson.title) {
                    // Find next lesson in same section
                    if (j + 1 < lessons.length) {
                        return setCurrentLesson({
                            // spread operator to copy lessons properites
                            ...lessons[j + 1],
                            sectionTitle: sections[i].title,
                        });
                    }

                    // Find next section's first lesson
                    if (i + 1 < sections.length && sections[i + 1].lessons.length > 0) {
                        return setCurrentLesson({
                            ...sections[i + 1].lessons[0],
                            sectionTitle: sections[i + 1].title,
                        });
                    }

                    // No more lessons
                    return;
                }
            }
        }
    };


    useEffect(() => {
        const loadCourse = async () => {
            try {
                const data = await fetchCourseById(courseId);
                setCourse(data);

                // Auto-select first lesson
                const firstSection = data.sections?.[0];
                const firstLesson = firstSection?.lessons?.[0];
                if (firstLesson) {
                    setCurrentLesson({ ...firstLesson, sectionTitle: firstSection.title });
                }
            } catch (err) {
                console.error('Error loading course:', err);
            } 
            finally {
                setLoading(false);
            }
        };

        loadCourse();
    }, [courseId]);

    const handleLessonSelect = (lesson, sectionTitle) => {
        setCurrentLesson({ ...lesson, sectionTitle });
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!course || !currentLesson) {
        return <div className="text-center py-20">Lesson not found</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left side (reuse header, desc, curriculum) */}
                    <div className="lg:w-3/4 space-y-8">
                        <CourseHeader
                            title={course.title}
                            category={course.category}
                            instructorName={course.instructorName}
                            instructorImage={course.instructorImage}
                        />
                        <CourseDescription description={course.description} />
                        <CourseCurriculum
                            sections={course.sections}
                            onLessonSelect={handleLessonSelect}
                        />
                    </div>

                    {/* Right side (lesson player) */}
                    <div className="lg:w-1/4">
                        <LessonPlayer
                            lesson={currentLesson}
                            courseId={courseId}
                            onLessonComplete={handleLessonComplete}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
