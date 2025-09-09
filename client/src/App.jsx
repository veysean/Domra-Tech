import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

import React from 'react';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// User Pages
import Home from './pages/user/Home';
import ContributeTerm from './pages/user/ContributeTerm';
import Categories from './pages/user/Categories';
import AboutUs from './pages/user/AboutUs';
import AuthPage from "./pages/user/AuthPage";
import Profile from "./pages/user/Profile";

// Admin Pages
import UsersPage from "./pages/admin/User";
import WordTranslationPage from "./pages/admin/WordTranslation";
import WordRequestPage from "./pages/admin/WordRequest";
import AdminLogin from "./pages/admin/AdminLogin";
import OverviewPage from "./pages/admin/Overview";
import UnauthorizedPage from "./pages/admin/Unauthorized";

// Components
import ProtectedRoute from "./components/admin/ProtectedRoute";

function AppRoutes() {
  return (
    <>
      <Routes>

        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/contribute-term"
          element={
            <MainLayout>
              <ContributeTerm />
            </MainLayout>
          }
        />

        <Route
          path="/categories"
          element={
            <MainLayout>
              <Categories />
            </MainLayout>
          }
        />

        <Route
          path="/about-us"
          element={
            <MainLayout>
              <AboutUs />
            </MainLayout>
          }
        />

        <Route
          path="/auth"
          element={
            <AuthPage />
          }
        />

        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />

        <Route 
          path="/unauthorized" 
          element={
            <UnauthorizedPage />
          } 
        />


        <Route
          path="/admin/login"
          element={
              <AdminLogin />
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <OverviewPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <UsersPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/requests"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <WordRequestPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/words"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <WordTranslationPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

