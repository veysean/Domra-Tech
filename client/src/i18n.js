import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';
import kh from './locales/kh/common.json';
import conEn from './locales/en/contributeTerm.json';
import conKh from './locales/kh/contributeTerm.json';
import aboutUsEn from './locales/en/aboutUs.json';
import aboutUsKh from './locales/kh/aboutUs.json';
import ourCategoryEn from './locales/en/ourCategory.json';
import ourCategoryKh from './locales/kh/ourCategory.json';
import contributeCardEn from './locales/en/contributeCard.json';
import contributeCardKh from './locales/kh/contributeCard.json';
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en, contributeTerm: conEn, aboutUs: aboutUsEn, ourCategory: ourCategoryEn, contributeCard: contributeCardEn},
      kh: { translation: kh, contributeTerm: conKh, aboutUs: aboutUsKh, ourCategory: ourCategoryKh, contributeCard: contributeCardKh },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
