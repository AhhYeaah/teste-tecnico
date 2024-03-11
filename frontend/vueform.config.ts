import en from "@vueform/vueform/locales/en";
import tailwind from "@vueform/vueform/dist/tailwind";
import { defineConfig } from "@vueform/vueform";

// You might place these anywhere else in your project
import "@vueform/vueform/dist/vueform.css";

export default defineConfig({
  theme: tailwind,
  locales: { en },
  locale: "en",
});
