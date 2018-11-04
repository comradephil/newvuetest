import Vue from "vue";
import Router from "vue-router";

//Section Vues
import Login from "@/components/Sections/Login";
import Dash from "@/components/Sections/Dash";
import Diagnostics from "@/components/Sections/Diagnostics";

Vue.use(Router);

//routes
const routes = [
  { path: "/login", name: "", component: Login },
  { path: "/home", name: "", component: Dash },
  { path: "/diagnostics", component: Diagnostics },
  { path: "/reports", component: Diagnostics },
  { path: "/visualisations", component: Diagnostics }
];

export default new Router({
  routes
});
