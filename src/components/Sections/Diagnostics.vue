<template>
    <div>
    <kendo-datepicker :value="new Date()"></kendo-datepicker></div>
</template>

<script>
import { Calendar } from "@progress/kendo-dateinputs-vue-wrapper";
export default {
  name: "Diagnostics",
  components: {
    Calendar
  }
};
</script>

<style scoped>
</style>
