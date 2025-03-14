import stylisticTs from "@stylistic/eslint-plugin-ts";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [...compat.extends("plugin:@typescript-eslint/recommended-type-checked"), {
  plugins: {
    "@stylistic/ts": stylisticTs,
  },

  languageOptions: {
    ecmaVersion: 5,
    sourceType: "script",

    parserOptions: {
      project: true,
    },
  },

  rules: {
    "@stylistic/ts/indent": ["error", 2],
    'prettier/prettier': 0,
  }
},
{
  ignores: ["eslint.config.mjs"],
},];