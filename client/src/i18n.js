import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';
import kh from './locales/kh/common.json';
import conEn from './locales/en/contributeTerm.json';
import conKh from './locales/kh/contributeTerm.json';
import aboutUsEn from './locales/en/aboutUs.json';
import aboutUsKh from './locales/kh/aboutUs.json';
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en, contributeTerm: conEn, aboutUs: aboutUsEn },
      kh: { translation: kh, contributeTerm: conKh, aboutUs: aboutUsKh },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
