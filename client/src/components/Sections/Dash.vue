<template>
    <div>
      <b-row>
        <b-col>
          <h1>{{$t('hello',{user:user.firstname})}}</h1>
        </b-col>
      </b-row>      
      <b-row v-drag-and-drop:options="dragoptions" class="dragwrapper">
        <b-col cols="2" id="sidebar" class="dropzone" ref="sidebar">
            <component v-for="(item) in subItems" v-if="item.visible" :is="item.template" v-bind="item.props" :key="item.label"></component>
        </b-col>
        <b-col cols="10" id="mainarea" class="dropzone" ref="mainarea">
            <component v-for="(item) in mainItems" v-if="item.visible" :is="item.template" v-bind="item.props" :key="item.label"></component>
        </b-col>
      </b-row>
    </div>
</template>

<script>
import StatsView from "../Layouts/StatsView";
import TextView from "../Layouts/TextView";
import ProgressBar from "../Layouts/ProgressBar";
// eslint-disable-next-line
import lang from "@/lang";

export default {
  name: "Dash",
  data() {
    const self = this;
    return {
      user: this.$store.state.user,
      dragoptions: {
        dropzoneSelector: ".dropzone",
        draggableSelector: ".draggable",
        onDrop() {
          self.saveView();
        }
      },
      menuItems: [
        {
          label: "Summary",
          template: "ProgressBar",
          visible: true,
          targetarea: "main",
          props: {
            title: "Summary",
            body: "This section is under construction",
            class: "draggable"
          }
        },
        {
          label: "Projects",
          template: "ProgressBar",
          visible: true,
          targetarea: "side",
          props: {
            title: "Projects",
            body: "This section is under construction",
            class: "draggable"
          }
        },
        {
          label: "About",
          template: "ProgressBar",
          visible: true,
          targetarea: "side",
          props: {
            title: "About",
            body: "This section is under construction",
            class: "draggable"
          }
        },
        {
          label: "Games",
          template: "ProgressBar",
          visible: true,
          targetarea: "side",
          props: {
            title: "Games",
            body: "This section is under construction",
            class: "draggable"
          }
        }
      ]
    };
  },
  computed: {
    subItems() {
      return this.menuItems.filter(x => x.targetarea === "side");
    },
    mainItems() {
      return this.menuItems.filter(x => x.targetarea === "main");
    }
  },
  methods: {
    saveView() {
      //self is this. this being the Vue
      let self = this;
      let newOrder = [];
      //create an array from elements that contain ids and then filter them to just the ids
      let sidebar = Array.from(
        Array.from(self.$refs["sidebar"].childNodes).filter(x => x.id),
        x => x.id
      );
      let mainarea = Array.from(
        Array.from(self.$refs["mainarea"].childNodes).filter(x => x.id),
        x => x.id
      );
      //given how the arrays are constructed we have the order defined by index in the array
      //now loop through them and get the associated object from the full data set
      sidebar.forEach(function(x) {
        let item = self.menuItems[self.lookupItem(x)];
        newOrder.push(item);
        //important - update props in new array not reference object
        newOrder[newOrder.length - 1].targetarea = "side";
      });
      mainarea.forEach(function(x) {
        let item = self.menuItems[self.lookupItem(x)];
        newOrder.push(item);
        newOrder[newOrder.length - 1].targetarea = "main";
      });
      //notify the store of the new order(s)
      this.$store.commit("updateMenuOrder", newOrder);
    },
    lookupItem(item) {
      return this.menuItems.findIndex(x => x.label.toLowerCase() === item);
    }
  },
  //on mounted check whether we have an order saved, otherwise, it's the default
  mounted() {
    if (this.$store.state.menuItems.length > 0) {
      this.menuItems = this.$store.state.menuItems;
    }
  },
  components: {
    StatsView,
    TextView,
    ProgressBar
  }
};
</script>

<style scoped>
.dragwrapper {
  display: flex;
}
.dropzone {
  height: flex;
}

/* drop target state */
.dropzone[aria-dropeffect="move"] {
  border-color: #68b;
  border-style: dashed;
}

/* drop target focus and dragover state */
.dropzone[aria-dropeffect="move"]:focus,
.dropzone[aria-dropeffect="move"].dragover {
  outline: none;
}

/* draggable items */

.draggable:hover {
  box-shadow: 0 0 0 2px #68b, inset 0 0 0 1px #ddd;
}

/* items focus state */
.draggable:focus {
  outline: none;
  box-shadow: 0 0 0 2px #68b, inset 0 0 0 1px #ddd;
}

/* items grabbed state */
.draggable[aria-grabbed="true"] {
  background: #5cc1a6;
  color: #fff;
}

@keyframes nodeInserted {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 0.8;
  }
}

.item-dropzone-area {
  height: 2rem;
  background: #888;
  opacity: 0.8;
  animation-duration: 0.5s;
  animation-name: nodeInserted;
}

#sidebar {
  margin: 0;
  padding: 20px 0 20px 20px;
  vertical-align: top;
  float: left;
}
#mainarea {
  margin: 0;
  padding: 20px;
  width: 100%;

  vertical-align: top;
}
</style>
