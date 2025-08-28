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
import OverviewPage from "./pages/admin/Overview";
import WordRequestPage from "./pages/admin/WordRequest";
import React from 'react';
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

        {/* <Route
          path="/admin"
          element={
              <AdminDashboard />
          }
        /> */}


        {/* <Route
          path="/admin/dashboard"
          element={
              <AdminDashboard />     
          }
        />

        <Route
          path="/admin/users"
          element={
              <UsersPage />
          }
        />

        <Route
          path="/admin/requests"
          element={
              <WordRequestPage />
          }
        />

        <Route
          path="/admin/words"
          element={
              <WordTranslationPage />
          }
        /> */}

        <Route>
          <Route path="/admin/dashboard" element={<AdminDashboard/>}>
          <Route index element={<OverviewPage/>}></Route>
          <Route path="/admin/dashboard/words" element={<WordTranslationPage/>}></Route>
          
          </Route>
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
