<template>
  <div></div>
</template>

<script>
import { useDialog } from "naive-ui";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    window.$dialog = useDialog();
  },
});
</script>