// @ts-check
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginJest from 'eslint-plugin-jest';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import React from 'react';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // ESLint recommended
  {
    name: '@eslint/js/recommended',
    ...eslint.configs.recommended,
  },

  // normal Typescript code
  ...tseslint.configs.all,
  {
    // enable linting with type information
    name: 'typescript-parser-options',
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // use `type` instead of `interface`
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // allow PascalCase for React components
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
      ],

      // allow async functions to be used for React event handler
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],

      // no need because most of functions are short than 100 lines
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // all parameters are readonly already
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',

      // prefer simple truthy check
      '@typescript-eslint/strict-boolean-expressions': 'off',

      // this will be done through code review
      '@typescript-eslint/no-magic-numbers': 'off',

      // a default case is enough
      '@typescript-eslint/switch-exhaustiveness-check': 'off',

      // a lot of third party libraries violate this rule
      '@typescript-eslint/max-params': 'off',

      // allow class parameter properties
      '@typescript-eslint/parameter-properties': 'off',

      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    },
  },

  // React Typescript
  {
    name: 'eslint-plugin-react',
    files: ['**/*.tsx'],
    ...reactPlugin.configs.flat?.recommended,
    ...reactPlugin.configs.flat?.['jsx-runtime'],
    languageOptions: {
      ...reactPlugin.configs.flat?.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: React.version,
      },
    },
  },

  // Jest test files
  {
    name: 'eslint-plugin-jest',
    files: ['**/*.spec.ts', '**/*.test.ts'],
    ...pluginJest.configs['flat/all'],
  },

  // Prettier: turns off all rules that are unnecessary or might conflict with Prettier.
  {
    name: 'eslint-config-prettier',
    ...eslintConfigPrettier,
  },

  // global ignore, include only files in `src` directory
  {
    name: 'Global Ignore',
    ignores: ['*', '!src'],
  },
);
