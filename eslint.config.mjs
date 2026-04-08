import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

// INFRA-001 complete: All violations fixed 2026-04-08. Rules raised to "error".

const eslintConfig = [
  // Global ignores
  {
    ignores: [".next/**", "out/**", "build/**", "node_modules/**", "coverage/**"],
  },

  // Next.js rules
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // TypeScript rules (applied to all TS/TSX files)
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
  })),

  // Project-specific TypeScript rules — all enforced as errors (INFRA-001 complete)
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", disallowTypeAnnotations: false },
      ],
      "@typescript-eslint/no-non-null-assertion": "warn",
      // Allow empty object types (common in Next.js page props)
      "@typescript-eslint/no-empty-object-type": "off",
      // Explicit module boundary types — disabled for gradual adoption
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
];

export default eslintConfig;