import firebaseRulesPlugin from "@firebase/eslint-plugin-security-rules";

export default [
  {
    ignores: ["dist/**/*", "node_modules/**/*"]
  },
  {
    files: ["**/*.rules"],
    plugins: {
      "firebase-rules": firebaseRulesPlugin
    }
  },
  firebaseRulesPlugin.configs["flat/recommended"]
];
