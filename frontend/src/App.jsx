import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/auth/Register';
import { AuthContext } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import AdminLayout from './components/admin/adminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import UserDashboard from './pages/user/Dashboard';

const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                {/* Authentication Routes */}
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

                {/* Dashboard Route */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            {user?.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/user" />}
                        </ProtectedRoute>
                    }
                />

                {/* Admin Routes */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="/admin/users" />} />
                    <Route path="users" element={<div>Manage Users</div>} />
                    <Route path="exams" element={<div>Manage Exams</div>} />
                    <Route path="questions" element={<div>Manage Questions</div>} />
                    <Route path="submissions" element={<div>Manage Submissions</div>} />
                    <Route path="results" element={<div>View Results</div>} />
                </Route>

                {/* User Routes */}
                <Route
                    path="/user"
                    element={
                        <ProtectedRoute allowedRoles={['user']}>
                            <UserDashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
