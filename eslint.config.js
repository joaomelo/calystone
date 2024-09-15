import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import { resolve } from "path";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // javascript
  js.configs.recommended,
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-duplicate-imports": "error",
    }
  },

  // typescript
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    rules: {
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off"
    }
  },

  // vue
  ...pluginVue.configs["flat/recommended"],

  //style linters
  {
    plugins: { "@stylistic": stylistic },
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/lines-between-class-members": ["error", 
        {
          enforce: [
            { blankLine: "always", next: "method", prev: "*" }
          ],
          "exceptAfterSingleLine": true
        },        
      ],
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
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
    }
  },  
  perfectionist.configs["recommended-natural"],
  {
    rules: {
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
);