<template>
    <div class="login">
        <img alt="Logo" src="../../assets/logo.png" style="margin-top:6em">
        <h1 class="text-light">{{product}}</h1>
        <div>
            <div>
                <input id="user" placeholder="Login"/>
            </div>
            <div>
                <input id="pass" type="password" placeholder="Password"/>
            </div>
        </div>
        <button @click="login" style="margin-top:1em">Login</button>
    </div>
</template>

<script>
import api from "@/api";
export default {
  name: "Login",
  data() {
    return {
      logins: this.$store.state.loginCount,
      product: ""
    };
  },
  methods: {
    login() {
      const vm = this;
      api
        .login(
          document.getElementById("user").value,
          document.getElementById("pass").value
        )
        .then(res => {
          if (res.data.loggedin === false) {
            alert(res.data.reason);
          } else {
            vm.$store.commit("userdata", res.data.user);
            vm.$store.commit("login", res.data.loggedin);
          }
        });
    }
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

<!-- "scoped" attribute - limit CSS to this component only -->
<style scoped>
</style>
