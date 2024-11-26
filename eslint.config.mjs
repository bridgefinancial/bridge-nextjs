import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import stylisticJs from '@stylistic/eslint-plugin-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  ...fixupConfigRules(
    compat.extends(
      'next/core-web-vitals',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
    ),
  ),
  {
    plugins: {
      '@stylistic': stylisticJs,
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks),
      prettier: fixupPluginRules(prettier),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      '@stylistic/indent': ['warn', 2],
      '@stylistic/quotes': ['warn', 'single'],
      'no-tabs': 'warn',
      'no-empty-pattern': 'warn',
      'react/no-unescaped-entities': 'warn',
      'react/prop-types': 'warn',
      'react/display-name': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-var-requires': 'warn',

      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
          singleQuote: true,
        },
      ],

      'react/jsx-pascal-case': [
        'warn',
        {
          allowAllCaps: true,
        },
      ],

      'react/jsx-boolean-value': ['warn', 'always'],
      'react/self-closing-comp': 'warn',
      'react-hooks/rules-of-hooks': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-prototype-builtins': 'warn',
      'prefer-const': 'warn',
      'no-console': 'off',
      'no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.js'],

    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 5,
      sourceType: 'commonjs',
    },
  },
  {
    files: ['components/**/*.tsx'],

    rules: {
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variableLike',
          format: ['camelCase'],
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
      ],
    },
  },
];

export default config;
