<template>
    <div><b-progress :variant="type" :value="counter" :max="max" show-progress animated></b-progress></div>
</template>

<script>
export default {
  name: "Canvas",
  data() {
    return {
      counter: Math.random() * 100,
      max: 100
    };
  },
  computed: {
    type() {
      return this.counter > 25
        ? this.counter > 75
          ? "success"
          : "default"
        : this.counter > 10
          ? "warning"
          : "danger";
    }
  }
};
</script>

<style scoped>
</style>