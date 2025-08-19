

import React from 'react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { id: 'home', name: 'Home', path: '/admin', icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l9-9 9 9"/><path d="M9 21V9h6v12"/></svg>
  ) },
  { id: 'words', name: 'Word Translation', path: '/admin/words', icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4h16v13H4z"/></svg>
  ) },
  { id: 'requests', name: 'Word Request', path: '/admin/requests', icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/></svg>
  ) },
  { id: 'users', name: 'User', path: '/admin/users', icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>
  ) },
  { id: 'settings', name: 'Settings', path: '/admin/settings', icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  ) },
  { id: 'privacy', name: 'Privacy', path: '/admin/privacy', icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ) },
  { id: 'checkmode', name: 'Check Mode', path: '/admin/checkmode', icon: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
  ) },
];

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-white shadow-lg flex flex-col justify-between fixed left-0 top-0 z-30">
      <div>
        <div className="flex items-center justify-center py-7 border-b border-gray-100">
          <span className="text-2xl font-extrabold text-[#667EEA] tracking-wide">Domra</span>
        </div>
        <nav className="mt-8 flex flex-col gap-2 px-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-[#667EEA] text-white shadow'
                    : 'text-[#4A5568] hover:bg-gray-100'
                }`
              }
              end={item.id === 'home'}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mb-8 px-4">
        <NavLink
          to="/logout"
          className="flex items-center gap-4 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors duration-150"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7"/><path d="M3 21V3a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v4"/></svg>
          <span>Logout</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
