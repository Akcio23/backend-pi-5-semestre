import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
    plugins: { js, prettier }, 
    extends: ["js/recommended", "plugin:prettier/recommended"], 
    languageOptions: { globals: globals.browser },
    rules: {
      "prettier/prettier": "warn"
    }
  },
  {
    files: ["**/*.{ts,mts,cts}"],
    plugins: { "@typescript-eslint": tseslint.plugin, prettier },
    extends: [tseslint.configs.recommended, "plugin:prettier/recommended"],
    rules: {
      "@typescript-eslint/no-namespace": "error",
      "prettier/prettier": "warn"
    }
  }
]);