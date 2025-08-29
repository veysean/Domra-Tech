import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './index.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/user/Home';
import ContributeTerm from './pages/user/ContributeTerm';
import Categories from './pages/user/Categories';
import AboutUs from './pages/user/AboutUs';
import AuthPage from "./pages/user/AuthPage";
import AdminDashboard from "./pages/admin/Dashboard";
import UsersPage from "./pages/admin/User";
import WordTranslationPage from "./pages/admin/WordTranslation";
import OverviewPage from "./pages/admin/Overview.jsx";
import { useTranslation } from 'react-i18next';
import WordRequestPage from './pages/admin/WordRequest.jsx';
import SettingsPage from './pages/admin/Settings.jsx';
import PrivacyPage from './pages/admin/Privacy.jsx';
import CheckModePage from './pages/admin/CheckMode.jsx';
import ProfilePage from './pages/admin/Profile.jsx';
import AdminLayout from "./layouts/AdminLayout";

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


        <Route
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
                <UsersPage />
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
        /> 
        <Route path="/admin" element={<AdminDashboard />}>
          <Route
            index
            element={
              <OverviewPage />
            }
          />
          <Route
            path="requests"
            element={
              <WordRequestPage />
            }
          />
          <Route
            path="users"
            element={
              <UsersPage />
            }
          />
          <Route
            path="dashboard"
            element={
              <OverviewPage />
            }
          />
          <Route
            path="words"
            element={
              <WordTranslationPage />
            }
          />
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
