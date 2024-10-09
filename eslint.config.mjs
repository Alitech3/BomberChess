import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
        "no-unused-vars": "error",
        "no-undef": "error",
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        'react/no-unescaped-entities': 'off',
        '@next/next/no-page-custom-font': 'off',
        'indent': ['warn', 4],
        'linebreak-style': ['warn', 'windows'],
        'quotes': ['warn', 'double'],
        'semi': ['warn', 'always'],
    }
}
];