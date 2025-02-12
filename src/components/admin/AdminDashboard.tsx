import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import CourseManagement from './CourseManagement';
import CourseEditor from './CourseEditor';
import ResourceForm from './ResourceForm';

const AdminDashboard: React.FC = () => {
  const { isAdmin } = useAuth();
  const location = useLocation();

  if (!isAdmin) {
    return <div>Access denied. Admin privileges required.</div>;
  }

  const isActive = (path: string) => {
    return location.pathname.startsWith(`/admin${path}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/admin/courses"
                  className={`${isActive('/courses') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Courses
                </Link>
                <Link
                  to="/admin/resources"
                  className={`${isActive('/resources') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route index element={<AdminOverview />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="courses/new" element={<CourseEditor />} />
          <Route path="courses/:courseId/edit" element={<CourseEditor />} />
          <Route path="resources" element={<ResourceForm />} />
        </Routes>
      </div>
    </div>
  );
};

const AdminOverview: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Welcome to Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/courses"
          className="block p-6 bg-indigo-50 rounded-lg hover:bg-indigo-100"
        >
          <h3 className="text-lg font-medium text-indigo-900">Course Management</h3>
          <p className="mt-2 text-indigo-600">
            Create, edit, and manage driving course content
          </p>
        </Link>
        <Link
          to="/admin/resources"
          className="block p-6 bg-green-50 rounded-lg hover:bg-green-100"
        >
          <h3 className="text-lg font-medium text-green-900">Resource Management</h3>
          <p className="mt-2 text-green-600">
            Manage learning resources and materials
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
