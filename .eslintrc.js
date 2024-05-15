module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      'react',
    ],
    rules: {
      // 여기에 기존 규칙들을 추가할 수 있습니다.
    },
    globals: {
      kakao: 'readonly', // kakao 전역 변수를 추가
    },
  };
  