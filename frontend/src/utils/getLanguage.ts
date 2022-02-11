export const getLanguage = (languageFrom: string) => {
  switch (languageFrom) {
    case 'kr':
    case 'KR':
    case 'ko':
    case 'KO':
      return '한글';
    case 'en':
    case 'EN':
      return '영어';
  }
};
