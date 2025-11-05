import { defineConfig, globalIgnores } from 'eslint/config'
/* import nextCoreWebVitals from "eslint-config-next/core-web-vitals"; */
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  globalIgnores(['**/node_modules', '**/.next/**/*', '**/next-env.d.ts']),
  {
    extends: fixupConfigRules(
      compat.extends(
        'eslint:recommended',
        'next/core-web-vitals',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
      )
    ),

    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks),
      'unused-imports': unusedImports,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.node,
        ...globals.jest,
      },
    },

    rules: {
      'react/jsx-no-literals': 'error',

      'react/jsx-pascal-case': [
        'warn',
        {
          allowAllCaps: true,
        },
      ],

      'react/prop-types': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/no-direct-mutation-state': 'warn',
      'react/style-prop-object': 'warn',
      'react/require-render-return': 'error',
      'react/no-deprecated': 'warn',
      'react/jsx-fragments': 'warn',
      'react/jsx-no-target-blank': 'warn',

      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          ignoreCase: true,
        },
      ],

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'always', // Allow empty interfaces
          allowObjectTypes: 'never', // Disallow empty object types (type Foo = {})
        },
      ],
      '@next/next/no-img-element': 'warn',
      '@next/next/no-html-link-for-pages': 'warn',
      'unused-imports/no-unused-imports': 'warn',
      'no-const-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'prefer-const': 'warn',
      'prefer-template': 'error',

      'no-duplicate-imports': [
        'error',
        {
          includeExports: true,
        },
      ],

      eqeqeq: 'warn',

      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],

      'require-await': 'error',

      'spaced-comment': [
        'warn',
        'always',
        {
          exceptions: ['*'],
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'next/link',
              message: "Use '@/i18n/routing' for Link component.",
            },
            {
              name: 'next/navigation',
              importNames: [
                'redirect',
                'permanentRedirect',
                'useRouter',
                'usePathname',
              ],
              message: "Use '@/i18n/routing' for navigation.",
            },
          ],

          patterns: ['@/app/[locale]/**/*.tsx'],
        },
      ],
    },
  },
  {
    files: ['**/app/api/**/route.ts', '**/app/page.tsx'],

    rules: {
      'no-restricted-imports': [
        'error',
        {
          name: '@/i18n/routing',
          importNames: [
            'Link',
            'redirect',
            'getPathname',
            'useRouter',
            'usePathname',
          ],
          message: "Use 'next/link' or 'next/navigation' for API routes.",
        },
      ],
    },
  },
  {
    files: ['!@/lib/datocms/executeQuery.ts'],

    rules: {
      'no-restricted-imports': [
        'error',
        {
          name: '@datocms/cda-client',
          importNames: ['executeQuery'],
          message: "Use '@/lib/datocms/executeQuery' for custom queries.",
        },
      ],
    },
  },
  {
    files: ['**/**.ts'],

    rules: {
      'no-restricted-imports': [
        'error',
        {
          name: 'gql.tada',
          importNames: ['graphql'],
          message: "Use '@/lib/datocms/graphql' for custom gql imports.",
        },
      ],
    },
  },
])
