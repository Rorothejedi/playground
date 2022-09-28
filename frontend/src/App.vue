<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <alerts />
      <div id="nav">
        <n-menu mode="horizontal" :options="menuOptions" />
      </div>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>

<script>
import { darkTheme } from "naive-ui";
import { h, ref } from "vue";
import { RouterLink } from "vue-router";
import Alerts from "@/components/utils/Alerts.vue";

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "Morpion",
          },
        },
        { default: () => "Morpion" }
      ),
    key: "morpion",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "Skyjo",
          },
        },
        { default: () => "Skyjo" }
      ),
    key: "skyjo",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "President",
          },
        },
        { default: () => "President" }
      ),
    key: "president",
  },
];

export default {
  name: "App",
  components: {
    Alerts,
  },

  data() {
    return {
      darkTheme,
      menuOptions,
      activeKey: ref(null),
    };
  },

  mounted() {
    window.Echo.channel("channel").listen("Hello", (e) => {
      console.log(e);
    });
    // window.Echo.channel("test").listen("Hello", (e) => {
    //   console.log(e);
    // });
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: rgb(24, 24, 28);
  min-height: 100vh;
}
</style>
