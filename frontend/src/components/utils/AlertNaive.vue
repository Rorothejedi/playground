<template>
  <div></div>
</template>

<script>
import { useMessage } from "naive-ui";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    window.$alert = useMessage();
  },
});
</script>