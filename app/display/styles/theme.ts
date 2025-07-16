/* eslint-disable import-x/default */
import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";

export const ThemePreset = definePreset(Aura, { semantic: {
  colorScheme: {
    dark: {
      highlight: {
        background: "rgba(250, 250, 250, .16)",
        color: "rgba(255,255,255,.87)",
        focusBackground: "rgba(250, 250, 250, .24)",
        focusColor: "rgba(255,255,255,.87)"
      },
      primary: {
        activeColor: "{zinc.200}",
        color: "{zinc.50}",
        hoverColor: "{zinc.100}",
        inverseColor: "{zinc.950}"
      },
      surface: {
        0: "#ffffff",
        50: "{slate.50}",
        100: "{slate.100}",
        200: "{slate.200}",
        300: "{slate.300}",
        400: "{slate.400}",
        500: "{slate.500}",
        600: "{slate.600}",
        700: "{slate.700}",
        800: "{slate.800}",
        900: "{slate.900}",
        950: "{slate.950}"
      }
    },
    light: {
      highlight: {
        background: "{zinc.950}",
        color: "#ffffff",
        focusBackground: "{zinc.700}",
        focusColor: "#ffffff"
      },
      primary: {
        activeColor: "{zinc.800}",
        color: "{zinc.950}",
        hoverColor: "{zinc.900}",
        inverseColor: "#ffffff"
      },
      surface: {
        0: "#ffffff",
        50: "{zinc.50}",
        100: "{zinc.100}",
        200: "{zinc.200}",
        300: "{zinc.300}",
        400: "{zinc.400}",
        500: "{zinc.500}",
        600: "{zinc.600}",
        700: "{zinc.700}",
        800: "{zinc.800}",
        900: "{zinc.900}",
        950: "{zinc.950}"
      }
    }
  },
  primary: {
    50: "{zinc.50}",
    100: "{zinc.100}",
    200: "{zinc.200}",
    300: "{zinc.300}",
    400: "{zinc.400}",
    500: "{zinc.500}",
    600: "{zinc.600}",
    700: "{zinc.700}",
    800: "{zinc.800}",
    900: "{zinc.900}",
    950: "{zinc.950}"
  }
} });
