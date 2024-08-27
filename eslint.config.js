import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        console: "readonly",
        document: "readonly",
        window: "readonly",
      },
      parserOptions: {
        allowDefaultProject: true,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: "module",
    },
  },

  eslint.configs.recommended,
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-duplicate-imports": "error",
    }
  },

  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    rules: {
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    }
  },

  {
    plugins: {
      "@stylistic": stylistic
    },
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/object-curly-newline": [
        "error",
        {
          ExportDeclaration: { consistent: true },
          ImportDeclaration: { consistent: true },
          ObjectExpression: { consistent: true },
          ObjectPattern: { consistent: true },
        },
      ],
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

  ...pluginVue.configs["flat/recommended"],
);
