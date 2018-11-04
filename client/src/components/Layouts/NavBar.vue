<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item v-for="(item,i) in mainMenuItems" :key="i" @click="nav(item.section,true)">
            {{item.label}}
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item right>
          <kendo-combobox v-model="selectedLanguage"
                          :data-source="availablelanguages"
                          :data-text-field="'label'"
                          :data-value-field="'iso'"
                          :filter="'none'"
          @change="widgetReset">
          </kendo-combobox>
        </b-nav-item>
        <b-nav-item right @click="signout"><font-awesome-icon icon="sign-out-alt"/>></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import api from "@/api";
export default {
  name: "NavBar",
  data() {
    return {
      mainMenuItems: [
        { label: "Home", section: "home" },
        { label: "Data", section: "diagnostics" },
        { label: "Reports", section: "reports" },
        { label: "Visualisations", section: "visualisations" }
      ],
      availablelanguages: this.$store.state.availablelanguages
    };
  },
  methods: {
    signout() {
      api.logout().then(() => {
        this.$store.commit("login", false);
      });
    },
    //to go to sections that may not need redirection back
    nav(section, inHistory) {
      if (inHistory) {
        this.$router.push(section);
      } else {
        this.$router.replace(section);
      }
    },
    //prevent override of options
    widgetReset(e) {
      let widget = e.sender;
      if (widget.value() && widget.select() === -1) {
        //custom has been selected
        widget.value(this.selectedLanguage); //reset widget
      }
    }
  },
  computed: {
    selectedLanguage: {
      get() {
        return this.$store.state.selectedLanguage;
      },
      set(e) {
        this.$store.commit("changeLanguage", e);
      }
    }
  }
};
</script>

<style>
.k-icon.k-i-close {
  display: none !important;
}
</style>
