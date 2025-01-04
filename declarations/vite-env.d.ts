// <reference types="vite/client" />

type ImportMetaEnv = Readonly<Record<`VITE_${string}`, boolean | number | string | undefined>>;

interface ImportMeta {
  readonly env: ImportMetaEnv
}