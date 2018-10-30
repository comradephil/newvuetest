<template>
    <div class="panel-wrap">
        <h1>{{$t('hello',{user:'Phil'})}}</h1>
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
import lang from "@/lang"

export default {
  name: "Dash",
  data() {
    return {
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
      ],
      mainItems: [
        {
          label: "Summary",
          template: "StatsView",
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

.widget.placeholder {
  opacity: 0.4;
  border: 1px dashed #a6a6a6;
}

/* WIDGETS */
.widget {
  margin: 0 0 20px;
  padding: 0;
  background-color: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 3px;
  cursor: move;
}

.widget:hover {
  background-color: #fcfcfc;
  border-color: #cccccc;
}

.widget div {
  padding: 10px;
  min-height: 50px;
}

.widget h3 {
  font-size: 12px;
  padding: 8px 10px;
  text-transform: uppercase;
  border-bottom: 1px solid #e7e7e7;
}

.widget h3 span {
  float: right;
}

.widget h3 span:hover {
  cursor: pointer;
  background-color: #e7e7e7;
  border-radius: 20px;
}
</style>
