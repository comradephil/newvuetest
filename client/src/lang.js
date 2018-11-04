import Vue from "vue"
import VueI18n from "vue-i18n";

import english from "@/translations/en.json"
import german from "@/translations/de.json"
import french from "@/translations/fr.json"

Vue.use(VueI18n)

export default new VueI18n({
  locale: "en", // set locale
  messages: {
    en: english,
    fr: french,
    de: german
  }
});
