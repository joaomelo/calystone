import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import pluginChaiFriendly from "eslint-plugin-chai-friendly";
import pluginCypress from "eslint-plugin-cypress/flat";
import mochaPlugin from "eslint-plugin-mocha";
import perfectionist from "eslint-plugin-perfectionist";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import { resolve } from "path";
import tseslint from "typescript-eslint";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export default tseslint.config(
  { ignores: ["dist", ".legacy"] },

  // javascript
  js.configs.recommended,
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    }
  },

  // typescript
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          disallowTypeAnnotations: true,
          fixStyle: "separate-type-imports",
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/no-extraneous-class": [
        "error",
        {
          allowConstructorOnly: false,
          allowEmpty: false,
          allowStaticOnly: true,
          allowWithDecorator: false,
        }
      ],
      "@typescript-eslint/no-unsafe-call": "off"
    }
  },

  // vue
  ...pluginVue.configs["flat/recommended"],
  {
    rules: {
      "vue/no-mutating-props": "off"
    }
  },

  //style linters
  {
    plugins: { "@stylistic": stylistic },
    rules: {
      "@stylistic/comma-spacing": ["error", { "after": true, "before": false }],
      "@stylistic/indent": ["error", 2],
      "@stylistic/key-spacing": "error",
      "@stylistic/keyword-spacing": "error",
      "@stylistic/lines-between-class-members": [
        "error",
        {
          enforce: [
            { blankLine: "always", next: "method", prev: "*" }
          ],
        },
        {
          exceptAfterOverload: true,
          exceptAfterSingleLine: true
        },
      ],
      "@stylistic/multiline-ternary": ["error", "always-multiline"],
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 0, "maxEOF": 0 }],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/object-curly-newline": [
        "error",
        {
          ExportDeclaration: { consistent: true },
          ImportDeclaration: { consistent: true },
          ObjectExpression: { consistent: true },
          ObjectPattern: { consistent: true },
        },
      ],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
      "@stylistic/operator-linebreak": ["error", "before"],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/type-generic-spacing": ["error"]
    }
  },

  perfectionist.configs["recommended-natural"],
  {
    rules: {
      "perfectionist/sort-interfaces": "off",
      // vue plugin already has a standard way to sort that considers the attribute type like if it is an event or a id definition
      "perfectionist/sort-vue-attributes": "off",
    }
  },

  // language settings
  {
    // this line tells eslint to link the typescript service with all file types used by the project
    files: ["**/*.vue", "**/*.ts", "**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser
      },
      parserOptions: {
        extraFileExtensions: [".vue"],
        parser: "@typescript-eslint/parser",
        project: [resolve(import.meta.dirname, "./tsconfig.json")],
        projectService: true,
        sourceType: "module",
        tsconfigRootDir: resolve(import.meta.dirname)
      }
    },
  },

  // only for e2e tests
  {
    files: ["e2e/**/*.ts", "e2e/**/*.js"],
    plugins: {
      chaiFriendly: pluginChaiFriendly,
      cypress: pluginCypress,
      mocha: mochaPlugin
    },
    ...pluginCypress.configs.recommended,
    ...mochaPlugin.configs.flat.recommended,
    ...pluginChaiFriendly.configs.recommendedFlat,
  },
);