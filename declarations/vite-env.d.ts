// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv
}

type ImportMetaEnv = Readonly<Record<`VITE_${string}`, boolean | number | string | undefined>>;