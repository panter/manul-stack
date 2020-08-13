module.exports = {
    "env": {
      "browser": true,
      "es6": true,
      "node": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:prettier/recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/eslint-recommended",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
    },
    "plugins": [
      "react",
      "@typescript-eslint"
    ],
    "rules": {
      "no-console": 1,
      "prefer-template": 1,
      "no-unused-vars": 0,
      "react/display-name": 0,
      "react/prop-types": 0,
      "react/react-in-jsx-scope": 0,
      "react/no-unescaped-entities": 0,
      "react/no-children-prop": 0
    },
    settings: {
      react: {
        version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
      }
    }
  };
  