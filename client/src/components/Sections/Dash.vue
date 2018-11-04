<template>
    <div class="panel-wrap">
        <h1>{{$t('hello',{user:user.firstname})}}</h1>
        <div id="mainarea">
            <component v-for="(item,i) in mainItems" v-if="item.visible" :is="item.template" :key="i"></component>
        </div>
        <div id="sidebar">
            <component v-for="(item,i) in subMenuItems" v-if="item.visible" :is="item.template" :key="i"></component>
        </div>
    </div>
</template>

<script>
import StatsView from "../Layouts/StatsView";
import TextView from "../Layouts/TextView";
import Canvas from "../Layouts/Canvas";
// eslint-disable-next-line
import lang from "@/lang";

export default {
  name: "Dash",
  data() {
    return {
      user: this.$store.state.user,
      mainItems: [
        {
          label: "Summary",
          template: "StatsView",
          visible: true
        }
      ],
      subMenuItems: [
        {
          label: "Projects",
          template: "Canvas",
          visible: true
        },
        {
          label: "Games",
          template: "Canvas",
          visible: true
        },
        {
          label: "About",
          template: "TextView",
          visible: true
        }
      ]
    };
  },
  components: {
    StatsView,
    TextView,
    Canvas
  }
};
</script>

<style>
#sidebar {
  display: table-cell;
  margin: 0;
  padding: 20px 0 20px 20px;
  width: 220px;
  vertical-align: top;
}
#mainarea {
  display: table-cell;
  margin: 0;
  padding: 20px;
  width: 680px;
  vertical-align: top;
}
</style>
