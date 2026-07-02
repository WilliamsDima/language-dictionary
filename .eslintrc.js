module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        indent: 'off',
        quotes: ['error', 'single'],
        semi: ['off'], // Не требовать точек с запятой
        'no-restricted-syntax': [
          'error',
          {
            selector: 'VariableDeclaration[kind="let"]',
            message: 'Использование `let` запрещено. Используй `const` (пересоздавай значение вместо переприсваивания).',
          },
        ],
      },
    },
  ],
}
