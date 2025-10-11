import type { Locale } from "../selectors";

import { pageOpen } from "../selectors";

export function openDropbox(locale?: Locale) {
  prepareLocale(locale);
  pageOpen.open.dropbox().click();
}

export function openMemory(locale?: Locale) {
  prepareLocale(locale);
  pageOpen.open.memory().click();
}

export function openOneDrive(locale?: Locale) {
  prepareLocale(locale);
  pageOpen.open.oneDrive().click();
}

function prepareLocale(locale: Locale = "en") {
  cy.visit("/");
  pageOpen.locale.option(locale).click();
}