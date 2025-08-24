import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';
import kh from './locales/kh/common.json';
import enSidebar from './locales/en/adSidebar.json';
import khSidebar from './locales/kh/adSidebar.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { 
        translation: en,
        adSidebar: enSidebar

       },
      kh: { 
        translation: kh,
        adSidebar: khSidebar
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
