<template>
  <alert-naive />
  <dialog-naive />
  <loading-bar-naive />
</template>

<script>
import AlertNaive from "./AlertNaive.vue";
import LoadingBarNaive from "./LoadingBarNaive.vue";
import DialogNaive from "./DialogNaive.vue";

export default {
  name: "UtilsForNaive",
  components: {
    AlertNaive,
    DialogNaive,
    LoadingBarNaive,
  },
};
</script>