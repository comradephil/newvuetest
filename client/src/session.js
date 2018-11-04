import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

export default new VuexPersist({
  key: "vuex",
  storage: window.sessionStorage
});
