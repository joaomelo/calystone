import type { Locale } from "./locales";

export type Messages<MessageSchema> = Record<Locale, MessageSchema>;
