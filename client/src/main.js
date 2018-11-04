//main bits
import Vue from "vue";
import Vuex from "vuex";
//import VuexPersist from "vuex-persist";
import VueRouter from "vue-router";
import VueI18n from "vue-i18n";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@progress/kendo-ui";
import "@progress/kendo-theme-default/dist/all.css";
//import Kendo stuff
import {
  // eslint-disable-next-line
  Calendar,
  DateinputsInstaller
} from "@progress/kendo-dateinputs-vue-wrapper";
import {
  AutoComplete,
  ComboBox,
  DropDownList,
  MultiSelect,
  MultiColumnComboBox,
  MultiColumnComboBoxColumn,
  DropdownsInstaller
} from "@progress/kendo-dropdowns-vue-wrapper";
//app bits
import api from "./api";
//import session from "./session"
import store from "./store";
import router from "./router";
import i18n from "./lang";
//main Vue
import App from "./App.vue";

//fontawesome for Vue
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText
} from "@fortawesome/vue-fontawesome";

// eslint-disable-next-line
import session from "./session";
Vue.component("font-awesome-layers", FontAwesomeLayers);
Vue.component("font-awesome-layers-text", FontAwesomeLayersText);

//add font awesome library (lazily - could add icons separately)
library.add(fas);

//api config
api.props.customer = "";
api.props.user = "";
api.props.server = "http://192.168.0.9:3000/";

Vue.config.productionTip = false;

//set Vue up
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueI18n);

Vue.component(Calendar.name, Calendar);
Vue.use(DropdownsInstaller);
Vue.use(DateinputsInstaller);

//set directive for fontawesome
Vue.component("font-awesome-icon", FontAwesomeIcon);

//set watchers
store.watch(
  state => state.loggedIn,
  newValue => {
    if (newValue === false) {
      router.replace("login");
    } else {
      router.replace("home");
    }
  }
);
store.watch(
  state => state.selectedLanguage,
  newValue => {
    i18n.locale = newValue.toLowerCase();
  }
);

new Vue({
  el: "#app",
  router,
  store,
  api,
  i18n,
  template: "<App/>",
  components: {
    App,
    Calendar,
    AutoComplete,
    ComboBox,
    DropDownList,
    MultiSelect,
    MultiColumnComboBox,
    MultiColumnComboBoxColumn
  }
});
