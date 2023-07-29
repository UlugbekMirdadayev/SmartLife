import localization from '../../components/Language/index';
const title = (title_uz, title_ru, title_en, defaultTitle) => {
  let currentLangCode = localization.getLanguage();
  switch (true) {
    case currentLangCode === 'uz' && !!title_uz:
      return title_uz;
    case currentLangCode === 'ru' && !!title_ru:
      return title_ru;
    default: {
      return defaultTitle;
    }
  }
};

export default {
  title,
};
