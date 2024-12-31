// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_MEMORY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}