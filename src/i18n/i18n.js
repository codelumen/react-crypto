import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        PRODUCT: "Our products",
        FINANCE: "Finance",
        MARKETPLACE: "Marketplace",
        COMICS: "Comics",
        MEMES: "Memes",
        WHITEPAPER: "Whitepaper",
        CONTACTS: "Contacts",

        ENG: "ENG",
        RUS: "RUS",

        BUTTON_TITLE: "Buy METO",

        BACK: "Back",
        STAKE: {
          STAKE_TITLE: "Stake METO - Earn ",
          APR: "APR",
          EARNED: "Earned",
          EARN: "Earn",
          FEES: "Fees",
          HARVEST: "Harvest",
          WITHDRAW: "Withdraw Dep",
          STAKE: "Stake",
          INSTAKE: "in Stake",
        },
      },
    },
    ru: {
      translation: {
        PRODUCT: "Наши продукты",
        FINANCE: "Финансы",
        MARKETPLACE: "Маркетплейс",
        COMICS: "Комиксы",
        MEMES: "Мемы",
        WHITEPAPER: "Whitepaper",
        CONTACTS: "Контакты",

        ENG: "АНГ",
        RUS: "РУС",

        BUTTON_TITLE: "Купить METO",

        BACK: "Назад",
        STAKE: {
          STAKE_TITLE: "Внес METO - Получил ",
          APR: "Ставка",
          EARNED: "Цель",
          EARN: "Earn",
          FEES: "сборы",
          HARVEST: "Результаты",
          WITHDRAW: "Вывести",
          STAKE: "Внести",
          INSTAKE: "хранится",
        },
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  debug: true,

  interpolation: {
    escapeValue: false,
  },
  react: {
    wait: true,
    bindI18n: "languageChanged",
  },
});

export default i18n;
