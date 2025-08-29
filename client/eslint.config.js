// client/eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['node_modules', 'dist'] },

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: { presets: ['@babel/preset-react'] },
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // React 17+ doesn't require React in scope
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Allow unused vars for imports used only in JSX
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern:
            'React|Routes|Route|Link|BrowserRouter|AuthProvider|Outlet|Navigate|Header|Courses|CourseDetail|CreateCourse|UpdateCourse|UserSignIn|UserSignUp|App',
        },
      ],
    },
    settings: {
      react: { version: 'detect' },
    },
  },
];
