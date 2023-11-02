module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  overrides: [],
  parser: "vue-eslint-parser",
  parserOptions: {
    project: true,
    parser: "@typescript-eslint/parser",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
    ecmaVersion: "latest",
    sourceType: "module",
    extraFileExtensions: [".vue"],
  },
  plugins: ["@typescript-eslint", "vue"],
  rules: {
    "vue/component-definition-name-casing": ["error", "kebab-case"],
    "eslint-disable-next-line @typescript-eslint/await-thenable": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    semi: ["error", "always"],
    "no-console": [
      "warn",
      {
        allow: ["warn", "error", "info"],
      },
    ],
  },
};
