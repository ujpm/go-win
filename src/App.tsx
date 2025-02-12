import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/Layout/Navbar';
import { Home } from '@/components/home/Home';
import { CourseList } from '@/components/courses/CourseList';
import { CourseViewer } from '@/components/courses/CourseViewer';
import { Login } from '@/components/auth/Login';
import { Register } from '@/components/auth/Register';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Layout from './components/Layout/Layout';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/courses"
              element={
                <PrivateRoute>
                  <CourseList />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses/:courseId"
              element={
                <PrivateRoute>
                  <CourseViewer />
                </PrivateRoute>
              }
            />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
