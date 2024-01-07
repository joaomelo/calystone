const stylistic = require('@stylistic/eslint-plugin')

const customized = stylistic.configs.customize({
  indent: 2,
  quotes: 'double',
  semi: true,
  'object-property-newline': true
})

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ['@stylistic'],
  rules: {
    ...customized.rules,    
    '@stylistic/object-property-newline': ['error', { 
      allowAllPropertiesOnSameLine: true
    }],    
    "vue/component-definition-name-casing": ["error", "kebab-case"],
    'no-duplicate-imports': 'error',
    "sort-imports": ["error", {
      "ignoreCase": true,
      "ignoreDeclarationSort": false,
      "ignoreMemberSort": false,
      "memberSyntaxSortOrder": ["multiple", "single", "all", "none" ],
      "allowSeparatedGroups": true
    }],    
    semi: ["error", "always"],
    "no-console": [
      "warn",
      {
        allow: ["warn", "error", "info"],
      },
    ],
  },
};
