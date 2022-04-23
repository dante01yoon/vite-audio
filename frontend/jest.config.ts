export default {
  transform: {
    '^.+\\.ts?.$': 'ts-jest'
  },
  moduleNameMapper: {
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@/(.*)': '<rootDir>/src/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@store/(.*)': '<rootDir>/src/store/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1'
  }
};
