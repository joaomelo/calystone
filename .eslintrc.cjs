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
  extends: ["eslint:recommended", "plugin:perfectionist/recommended-natural", "plugin:vue/vue3-recommended", ],
  plugins: ['@stylistic'],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    'no-duplicate-imports': 'error',
    'semi': ["error", "always"],
    "no-console": [ "warn", { allow: ["warn", "error", "info"] } ],

    ...customized.rules,    
    '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],    
    '@stylistic/object-curly-newline': ["error", {
      "ObjectExpression": { "consistent": true },
      "ObjectPattern": { "consistent": true },
      "ImportDeclaration": { "consistent": true },
      "ExportDeclaration": { "consistent": true }
    }],

    // vue plugin already has a standard way to sort that considers the attribute type like if it is an event or a id definition
    'perfectionist/sort-vue-attributes': 'off',

    "vue/component-definition-name-casing": ["error", "kebab-case"],
  },
};
