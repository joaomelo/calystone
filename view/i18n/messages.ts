import type { SupportedLocales } from "./locales";

export type Messages = RecordOf<SupportedLocales, MessagesLocalized>;
export type MessagesLocalized = RecordOf<MessagesKeys, string>;
export type MessageKey = MessagesKeys[number];
export type MessagesKeys = [
  "accept",
  "add",
  "append",
  "archive",
  "artifact",
  "artifacts",
  "cancel",
  "close",
  "delete",
  "edit",
  "email",
  "ignore",
  "invite",
  "load",
  "name",
  "notes",
  "password",
  "pending",
  "plan",
  "planningOf",
  "programs",
  "save",
  "sharing",
  "sharingOf",
  "signIn",
  "signOut",
  "signUp",
  "unarchive",
  "unloaded",
  "unsolved"
];
export type MessageValues = Record<string, string>;
type RecordOf<T extends string[], Z> = {
  [K in T[number]]: Z;
};

export const messages: Messages = {
  en: {
    load: "load data",
    close: "close",
    accept: "accept",
    add: "add",
    append: "append",
    archive: "archive",
    artifacts: "artifacts",
    artifact: "artifact",
    cancel: "cancel",
    delete: "delete",
    edit: "edit",
    email: "email",
    ignore: "ignore",
    invite: "invite",
    unsolved: "attempting to recover your last session",
    unloaded: "please wait while we load your data",
    name: "name",
    notes: "notes",
    password: "password",
    pending: "pending",
    plan: "plan",
    planningOf: "planning of",
    programs: "programs",
    save: "save",
    sharing: "sharing",
    sharingOf: "sharing of",
    signIn: "sign in",
    signOut: "sign out",
    signUp: "sign up",
    unarchive: "unarchive",
  },
  "pt-br": {
    load: "carregar dados",
    close: "fechar",
    accept: "aceitar",
    add: "novo",
    append: "acrescentar",
    archive: "arquivar",
    artifacts: "artefatos",
    artifact: "artefato",
    cancel: "cancelar",
    delete: "excluir",
    edit: "editar",
    email: "email",
    ignore: "ignorar",
    invite: "convidar",
    unsolved: "tentando recuperar sua última sessão",
    unloaded: "por favor, aguarde enquanto carregamos seus dados",
    name: "nome",
    notes: "notas",
    password: "senha",
    pending: "pendente",
    plan: "planejar",
    planningOf: "planejamento de",
    programs: "programas",
    save: "salvar",
    sharing: "compartilhamento",
    sharingOf: "compartilhamento de",
    signIn: "entrar",
    signOut: "sair",
    signUp: "criar",
    unarchive: "desarquivar",
  },
};