
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/admin/Header.jsx';
import Sidebar from '../../components/admin/Sidebar.jsx';

const menuItems = [
  { id: 'home', name: 'Home', path: '/admin' },
  { id: 'requests', name: 'Word Requests', path: '/admin/requests' },
  { id: 'words', name: 'Word Management', path: '/admin/words' },
  { id: 'users', name: 'Users', path: '/admin/users' },
];

const AdminDashboard = () => {
  const { i18n } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50">
      <Header i18n={i18n} />
      <Sidebar menuItems={menuItems} />
      <main className="ml-64 p-8 bg-[#F4F4F4] min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
