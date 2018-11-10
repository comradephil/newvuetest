<template>
  <b-card :id="title.toLowerCase()" :class="draggable" :title="title" bg-variant="secondary" border-variant="light" text-variant="white"
            style="max-width: 100%"
            class="mb-2">
      <p class="card-text">
        {{body}}
      </p>
      <b-progress v-b-popover.hover="popoverInfo.body" :title="popoverInfo.title" 
      :variant="type" :value="counter" :max="max" show-progress animated></b-progress>
    </b-card>
</template>

<script>
export default {
  name: "ProgressBar",
  data() {
    return {
      counter: Math.random() * 100,
      max: 100
    };
  },
  props: ["title", "body", "draggable"],
  computed: {
    type() {
      return this.counter > 25
        ? this.counter > 75
          ? "success"
          : "default"
        : this.counter > 10
          ? "warning"
          : "danger";
    },
    popoverInfo() {
      return {
        title: "Progress",
        body: `Currently ${Math.round(this.counter)}% complete`
      };
    }
  }
};
</script>

<style scoped>
</style>
