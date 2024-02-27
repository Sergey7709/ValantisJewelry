/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly API_BASE_URL: string;
  readonly AUTH_VALUE_PART: string;

}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
