<template>
  <dialog-naive />
  <loading-bar-naive />
  <message-naive />
</template>

<script>
import DialogNaive from "./DialogNaive.vue";
import LoadingBarNaive from "./LoadingBarNaive.vue";
import MessageNaive from "./MessageNaive.vue";

export default {
  name: "UtilsForNaive",
  components: {
    DialogNaive,
    LoadingBarNaive,
    MessageNaive,
  },
};
</script>