import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  sections: CourseSection[];
  createdAt: string;
  updatedAt: string;
}

interface CourseSection {
  id: string;
  title: string;
  content: string;
  order: number;
  resources: SectionResource[];
}

interface SectionResource {
  id: string;
  title: string;
  type: 'document' | 'video' | 'quiz';
  url: string;
}

const CourseManagement: React.FC = () => {
  const { isAdmin } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch('http://localhost:5000/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError('Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      // TODO: Replace with actual API call
      await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: 'DELETE',
      });
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (err) {
      setError('Failed to delete course');
      console.error('Error deleting course:', err);
    }
  };

  if (!isAdmin) {
    return <div>Access denied. Admin privileges required.</div>;
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <Link
          to="/admin/courses/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Create New Course
        </Link>
      </div>

      <div className="grid gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-md p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p className="text-gray-600 mt-1">{course.description}</p>
              </div>
              {course.imageUrl && (
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-24 h-24 object-cover rounded"
                />
              )}
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Sections ({course.sections.length})</h3>
              <ul className="space-y-2">
                {course.sections.map((section) => (
                  <li key={section.id} className="flex items-center justify-between">
                    <span>{section.title}</span>
                    <span className="text-gray-500 text-sm">
                      {section.resources.length} resources
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t">
              <Link
                to={`/admin/courses/${course.id}/edit`}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Edit Course
              </Link>
              <button
                onClick={() => handleDeleteCourse(course.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>

            <div className="text-sm text-gray-500 pt-2">
              <p>Created: {new Date(course.createdAt).toLocaleDateString()}</p>
              <p>Last updated: {new Date(course.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No courses available. Create your first course!
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
