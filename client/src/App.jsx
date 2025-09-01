import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/user/Home';
import ContributeTerm from './pages/user/ContributeTerm';
import Categories from './pages/user/Categories';
import AboutUs from './pages/user/AboutUs';
import AuthPage from "./pages/user/AuthPage";
import ForgotPasswordPage from "./pages/user/ForgotPasswordPage";
import ResetPasswordPage from "./pages/user/ResetPasswordPage";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/contribute-term" element={<MainLayout><ContributeTerm /></MainLayout>} />
        <Route path="/categories" element={<MainLayout><Categories /></MainLayout>} />
        <Route path="/about-us" element={<MainLayout><AboutUs /></MainLayout>} />
        
        {/* All auth-related routes are now defined here explicitly */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

        {/* A fallback route for any unmatched paths */}
        <Route path="*" element={<Navigate to="/" />} />
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