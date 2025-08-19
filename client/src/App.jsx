import './index.css';
import { useTranslation } from 'react-i18next';
import React from 'react';
import AuthPage from './pages/user/AuthPage';
function App() {
    const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div>
      <AuthPage/>
    </div>
   
  );
}

export default App;
