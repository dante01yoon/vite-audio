export const getLanguage = (languageFrom: string) => {
  switch (languageFrom) {
    case 'kr':
    case 'KR':
    case 'ko':
    case 'KO':
      return 'νκΈ';
    case 'en':
    case 'EN':
      return 'μμ΄';
  }
};
