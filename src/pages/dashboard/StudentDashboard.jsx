import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../utils/logout";
import { fetchAllCourses } from "../../services/courseService";
import { fetchCoursesByCategory } from "../../services/courseService";
import Navbar from "../../components/student/dashboard/Navbar";
import HeroSection from "../../components/student/dashboard/HeroSection";
import CourseFilter from "../../components/student/dashboard/CourseFilter";
import CourseCard from "../../components/student/dashboard/CourseCard";

export default function StudentDashboard() {
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: 1,
    totalElements: 0
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  const [error, setError] = useState(null);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = selectedCategory
          ? await fetchCoursesByCategory(selectedCategory, pagination.page, pagination.size)
          : await fetchAllCourses(pagination.page, pagination.size, searchTerm);

        setCourses(response.content);
        setPagination(prev => ({
          ...prev,
          totalPages: response.totalPages,
          totalElements: response.totalElements
        }));
      } catch (err) {
        setError("Failed to load courses. Please try again.");
        console.error("Failed to load courses:", err);
      } finally {
        setLoading(false);
      }
    };



    loadCourses();
  }, [searchTerm, selectedCategory, pagination.page, pagination.size]);


  useEffect(() => {
    const loadCategories = async () => {
      try {
        const all = await fetchAllCourses(0, 10, ''); // get all without filters
        const uniqueCategories = [...new Set(all.content.map((c) => c.category))];
        setAllCategories(uniqueCategories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    loadCategories();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  const handleLogout = () => logoutUser(setUser, navigate);
  
  // Update the onEnroll handler in your CourseCard component
  const handleEnroll = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        <HeroSection searchTerm={searchTerm} onSearch={setSearchTerm} />

        <CourseFilter
          categories={allCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
            setPagination(prev => ({ ...prev, page: 0 }));
          }}
        />

        {loading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={handleEnroll}
                />
              ))}
            </div>

            {pagination.totalElements > 0 && (
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 0}
                  className={`px-4 py-2 rounded-md ${pagination.page === 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                  Previous
                </button>

                <span className="text-sm text-gray-600">
                  Page {pagination.page + 1} of {pagination.totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages - 1}
                  className={`px-4 py-2 rounded-md ${pagination.page >= pagination.totalPages - 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {!loading && !error && courses.length === 0 && (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium text-gray-700">No courses found</h3>
            <p className="text-gray-500 mt-2">
              {selectedCategory || searchTerm
                ? "Try adjusting your search or filter criteria"
                : "No courses available at the moment"}
            </p>
          </div>
        )}
      </main>
    </>
  );
}