// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReviewPage from './pages/ReviewPage';
import CreatePage from './pages/CreatePage';
import SettingsPage from './pages/SettingsPage';
import StatsPage from './pages/StatsPage';
import LoginPage from './pages/LoginPage'; // صفحه ورود که قبلاً اضافه کردیم

// ایمپورت کامپوننت صفحه ثبت نام جدید
import SignupPage from './pages/SignupPage';

import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        {/* Header در اینجا قرار می‌گیرد و شامل لینک Sign Up خواهد بود */}
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* اضافه کردن مسیر جدید برای صفحه ثبت نام */}
          <Route path="/signup" element={<SignupPage />} />

          {/*
            می‌توانید یک مسیر برای خطای 404 (صفحه پیدا نشد) نیز اضافه کنید.
            این مسیر باید آخرین Route در لیست باشد.
            مثال: <Route path="*" element={<NotFoundPage />} />
            اگر کامپوننت NotFoundPage را دارید.
          */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

// توضیحات:
// - import SignupPage from './pages/SignupPage';: کامپوننت صفحه ثبت نام را ایمپورت می‌کند.
//   مسیر './pages/SignupPage' صحیح است زیرا App.tsx در src/ و SignupPage.tsx در src/pages/ قرار دارد.
// - <Route path="/signup" element={<SignupPage />} />: یک Route جدید برای مسیر '/signup' اضافه می‌کند.
//   وقتی کاربر به این مسیر می‌رود، کامپوننت SignupPage نمایش داده می‌شود.
// - سایر Routeها و ساختار کلی Router، Routes و Layout حفظ شده است.
