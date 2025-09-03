import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './index.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/user/Home';
import ContributeTerm from './pages/user/ContributeTerm';
import Categories from './pages/user/Categories';
import AboutUs from './pages/user/AboutUs';
import AuthPage from "./pages/user/AuthPage";
import AdminDashboard from "./pages/admin/Dashboard";
import UserPage from "./pages/admin/User.jsx";
import WordTranslationPage from "./pages/admin/WordTranslation";
import OverviewPage from "./pages/admin/Overview.jsx";
import { useTranslation } from 'react-i18next';
import WordRequestPage from './pages/admin/WordRequest.jsx';
import SettingsPage from './pages/admin/Settings.jsx';
import PrivacyPage from './pages/admin/Privacy.jsx';
import CheckModePage from './pages/admin/CheckMode.jsx';
import ProfilePage from './pages/admin/Profile.jsx';
import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin.jsx";

import GoogleLoginButton from './component/googleLoginButton';
import React from 'react';

function AppRoutes() {

  const { t, i18n } = useTranslation();

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

        {/* <Route
          path="/admin"
          element={
              <AdminLayout>
                <AdminLogin />
              </AdminLayout>
          }
        /> */}


        {/* <Route
          path="/admin/dashboard"
          element={
              <AdminLayout>
                <OverviewPage />
              </AdminLayout>     
          }
        />

        <Route
          path="/admin/users"
          element={
              <AdminLayout>
                <UserPage />
              </AdminLayout>
          }
        />

        <Route
          path="/admin/requests"
          element={
              <AdminLayout>
                <WordRequestPage />
              </AdminLayout>
          }
        />

        <Route
          path="/admin/words"
          element={
              <AdminLayout>
                <WordTranslationPage />
              </AdminLayout>
          }
        /> */}

        {/* --- ADMIN ROUTES --- */}
        {/* Redirect /admin to login page */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        {/* Admin login page */}
        <Route path="/admin/login" element={<AdminLogin />} /> 
        {/* or replace AuthPage with <AdminLogin /> if you have it */}

        {/* Admin pages with layout */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<OverviewPage />} />
          <Route path="users" element={<UserPage />} />
          <Route path="requests" element={<WordRequestPage />} />
          <Route path="words" element={<WordTranslationPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="checkmode" element={<CheckModePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

      </Routes>
        
    </>
  );
}

export default function App(){
  return (  
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
  );
}
