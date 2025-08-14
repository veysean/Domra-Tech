import './index.css';
import { useTranslation } from 'react-i18next';

function App() {
    const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <h1>{t('login')}</h1>
      <h1>{t('logout')}</h1>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button className='bg-amber-300 p-1.5' onClick={() => changeLanguage('kh')}>Khmer</button>
    </div>
    
  );
}

export default App;
