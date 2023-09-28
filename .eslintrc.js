module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    'react/no-unescaped-entities': 0,
    // 'no-console': 'error',
  },
  plugins: ['prettier', 'unused-imports'],
};
