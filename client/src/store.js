import Vue from "vue";
import Vuex from "vuex";
import session from "./session";

Vue.use(Vuex);

export default new Vuex.Store({
  //store
  plugins: [session.plugin],
  state: {
    loggedIn: false,
    loginCount: 0,
    availablelanguages: [
      { iso: "EN", label: "English" },
      { iso: "FR", label: "French" },
      {
        iso: "DE",
        label: "German"
      }
    ],
    selectedLanguage: "EN",
    menuItems: [],
    user: {
      title: "", //prefix
      firstname: "", //name
      lastname: "", //name
      type: "", //admin, leader, user
      role: "" //job title
    }
  },
  mutations: {
    login(state, payload) {
      state.loggedIn = payload;
    },
    userdata(state, payload) {
      state.user = payload;
    },
    changeLanguage(state, payload) {
      state.selectedLanguage = payload;
    },
    updateMenuOrder(state, payload) {
      state.menuItems = payload;
    }
  }
});
