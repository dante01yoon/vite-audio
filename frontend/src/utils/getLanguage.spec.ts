import { getLanguage } from './getLanguage';

test('getLanguage shouldbe returned with 영어', () => {
  expect(getLanguage('EN')).toBe('영어');
  expect(getLanguage('en')).toBe('영어');
});
