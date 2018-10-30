<template>
    <div>
        <ul>
            <button v-for="(item,i) in mainMenuItems" class="navlink" :key="i" @click="nav(item.section,true)">
                {{item.label}}
            </button>

            <button class="sigh" @click="signout"><font-awesome-icon icon="sign-out-alt" /></button>
            <div class="sigh" >
                <kendo-combobox v-model="selectedLanguage"
                                :data-source="availablelanguages"
                                :data-text-field="'label'"
                                :data-value-field="'iso'"
                                :filter="'none'"
                @change="widgetReset">
                </kendo-combobox>
            </div>
        </ul>

    </div>
</template>

<script>
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
      this.$store.commit("login", false);
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
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 35px;
  width: 100%;
  background-color: transparent;
}

li {
  display: inline-flex;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
}

/* Change the link color on hover */
li:hover {
  background-color: #555;
  color: white;
}

.sigh {
  float: right;
}

.navlink {
  float: left;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
}

.dropdown-content button {
  display: block;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.k-icon.k-i-close {
  display: none !important;
}
</style>
