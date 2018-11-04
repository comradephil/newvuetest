<template>
    <b-container id="app" fluid class="bg-dark">
        <!-- navbar -->
        <nav-bar v-if="this.$store.state.loggedIn"></nav-bar>
        <router-view></router-view>
    </b-container>
</template>

<script>
import Login from "./components/Sections/Login.vue";
import Dash from "./components/Sections/Dash.vue";
import NavBar from "./components/Layouts/NavBar";

export default {
  name: "app",
  components: {
    NavBar,
    Login,
    Dash
  },
  mounted: function() {
    if (this.$store.state.loggedIn) {
      this.$router.replace("home");
    } else {
      this.$router.replace("login");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
}
</style>
