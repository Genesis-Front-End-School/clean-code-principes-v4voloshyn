module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:css-import-order/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'css-import-order'],
  rules: {
    '@typescript-eslint/no-use-before-define': 0,
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': 0,
    'import/prefer-default-export': 0,
    'import/no-cycle': 0,
    'no-console': 1,
    'react/require-default-props': 0,
    'prefer-destructuring': 0,
    'no-param-reassign': 0,
    'import/order': [
      2,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
          {
            pattern: '{.,..}/**/*.scss',
            group: 'object',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
        warnOnUnassignedImports: true,
      },
    ],
  },
};
