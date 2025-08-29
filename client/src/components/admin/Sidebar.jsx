

import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsHouseDoor } from "react-icons/bs";
import { BsEnvelopeExclamation } from "react-icons/bs";
import { BsBook } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";
import { BsGear } from "react-icons/bs";
import { BsShieldLock } from "react-icons/bs";
import { BsBoxArrowLeft } from "react-icons/bs";
import { BsCheck2Square } from "react-icons/bs";
<<<<<<< HEAD
import { useTranslation } from 'react-i18next';

const menuItems = [
  { id: 'home',key: 'home', path: '/admin/dashboard', icon: (
    <BsHouseDoor size={22}/>
  ) },
  { id: 'words', key: 'wordTranslation', path: '/admin/words', icon: (
    <BsBook size={22}/>
  ) },
  { id: 'requests', key: 'wordRequest', path: '/admin/requests', icon: (
    <BsEnvelopeExclamation size={22}/>
  ) },
  { id: 'users', key: 'user', path: '/admin/users', icon: (
    <BsPeople size={22}/>
  ) },
  { id: 'settings', key: 'settings', path: '/admin/settings', icon: (
    <BsGear size={22}/>
  ) },
  { id: 'privacy', key: 'privacy', path: '/admin/privacy', icon: (
    <BsShieldLock size={22}/>
  ) },
  { id: 'checkmode', key: 'checkMode', path: '/admin/checkmode', icon: (
=======

const menuItems = [
  { id: 'home', name: 'Home', path: '/admin/dashboard', icon: (
    <BsHouseDoor size={22}/>
  ) },
  { id: 'words', name: 'Word Translation', path: '/admin/words', icon: (
    <BsBook size={22}/>
  ) },
  { id: 'requests', name: 'Word Request', path: '/admin/requests', icon: (
    <BsEnvelopeExclamation size={22}/>
  ) },
  { id: 'users', name: 'User', path: '/admin/users', icon: (
    <BsPeople size={22}/>
  ) },
  { id: 'settings', name: 'Settings', path: '/admin/settings', icon: (
    <BsGear size={22}/>
  ) },
  { id: 'privacy', name: 'Privacy', path: '/admin/privacy', icon: (
    <BsShieldLock size={22}/>
  ) },
  { id: 'checkmode', name: 'Check Mode', path: '/admin/checkmode', icon: (
>>>>>>> 87e09df97073b36d7961a878e82f905d85be1802
    <BsCheck2Square size={22}/>
  ) },
];

const Sidebar = () => {
<<<<<<< HEAD
  const { t } = useTranslation('adSidebar');

=======
>>>>>>> 87e09df97073b36d7961a878e82f905d85be1802
  return (
    <aside className="h-screen w-64 bg-white shadow-lg flex flex-col justify-between fixed left-0 top-0 z-30">
      <div>
        <div className="flex items-center justify-center py-7 border-b border-gray-100">
          <span className="text-2xl font-extrabold text-[#667EEA] tracking-wide">Domra Tech</span>
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
<<<<<<< HEAD
              <span>{t(item.key)}</span>
=======
              <span>{item.name}</span>
>>>>>>> 87e09df97073b36d7961a878e82f905d85be1802
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mb-8 px-4">
        <NavLink
          to="/logout"
          className="flex items-center gap-4 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors duration-150"
        >
          <BsBoxArrowLeft size={22}/>
<<<<<<< HEAD
          <span>{t("logout")}</span>
=======
          <span>Logout</span>
>>>>>>> 87e09df97073b36d7961a878e82f905d85be1802
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
