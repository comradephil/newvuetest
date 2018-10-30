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
      if (
        document.getElementById("user").value === "Phil" &&
        document.getElementById("pass").value === "password"
      ) {
        this.$store.commit("login", true);
      } else {
        this.$store.commit("login", false);
        alert("Invalid username or password");
      }
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
