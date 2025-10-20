import { useI18n as useVueI18n } from "vue-i18n";

export function useI18n() {
  return useVueI18n({
    inheritLocale: true,
    useScope: "global"
  });
}
