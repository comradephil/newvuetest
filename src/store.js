import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  //store
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
      title: '', //prefix
      first: '', //name
      last: '', //name
      type: '', //admin, leader, user
      role: '' //job title
    }
  },
  mutations: {
    login(state, payload) {
      if(payload) {
        state.loginCount++
      }
      state.loggedIn = payload;
    },
    changeLanguage(state, payload) {
      state.selectedLanguage = payload;
    }
  }
});
