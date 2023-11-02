module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // "linebreak-style": ["error", "unix"],
    // // "indent": ["error", { "allowIndentationTabs": true }],
    // 'prettier/prettier': ['error', { 'endOfLine': 'auto' }],
    // "prettier/prettier": ["error", {'trailingComma': "none"}],
    "@typescript-eslint/no-misused-new": "off",
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-interface': [
      'error',
      { allowSingleExtends: true },
    ],
  },
};
