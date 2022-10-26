<template>
  <dialog-naive />
  <loading-bar-naive />
  <message-naive />
</template>

<script>
import DialogNaive from "./naive/DialogNaive.vue";
import LoadingBarNaive from "./naive/LoadingBarNaive.vue";
import MessageNaive from "./naive/MessageNaive.vue";

export default {
  name: "UtilsForNaive",
  components: {
    DialogNaive,
    LoadingBarNaive,
    MessageNaive,
  },
};
</script>