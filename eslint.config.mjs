import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    /* 우리 코드가 아닙니다 — 검사하지 않습니다.
       `.claude/` 는 도구(Claude Code·Impeccable)가 설치한 폴더이고
       git 에도 올라가지 않습니다. 그 안에 JS 파일이 100개쯤 있어서,
       검사에 넣으면 `npm run lint` 가 우리 코드와 상관없는 경고를
       151건 쏟아냅니다. 후임자가 '코드가 엉망이구나' 하고 오해합니다.
       (2026-08-05) */
    ".claude/**",
  ]),
]);

export default eslintConfig;
