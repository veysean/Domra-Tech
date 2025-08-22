import './index.css';
import { useTranslation } from 'react-i18next';
import GoogleLoginButton from './component/googleLoginButton';

function App() {
    const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <GoogleLoginButton />

    </div>
    
  );
}

export default App;
