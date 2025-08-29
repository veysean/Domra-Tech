import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';
import kh from './locales/kh/common.json';
import conEn from './locales/en/contributeTerm.json';
import conKh from './locales/kh/contributeTerm.json';
import aboutUsEn from './locales/en/aboutUs.json';
import aboutUsKh from './locales/kh/aboutUs.json';
<<<<<<< HEAD
import enSidebar from './locales/en/adSidebar.json';
import khSidebar from './locales/kh/adSidebar.json';

=======
>>>>>>> 87e09df97073b36d7961a878e82f905d85be1802
i18n
  .use(initReactI18next)
  .init({
    resources: {
<<<<<<< HEAD
      en: { 
        translation: en, contributeTerm: conEn, aboutUs: aboutUsEn,
        adSidebar: enSidebar

       },
      kh: { 
        translation: kh, contributeTerm: conKh, aboutUs: aboutUsKh,
        adSidebar: khSidebar
      },
=======
      en: { translation: en, contributeTerm: conEn, aboutUs: aboutUsEn },
      kh: { translation: kh, contributeTerm: conKh, aboutUs: aboutUsKh },
>>>>>>> 87e09df97073b36d7961a878e82f905d85be1802
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
