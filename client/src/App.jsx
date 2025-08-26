import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/user/Home';
import ContributeTerm from './pages/user/ContributeTerm';
import Categories from './pages/user/Categories';
import AboutUs from './pages/user/AboutUs';
import AuthPage from "./pages/user/AuthPage";
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
