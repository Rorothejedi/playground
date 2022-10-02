<template>
  <n-config-provider :theme="darkTheme">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-message-provider :placement="placement">
          <utils-for-naive />

          <div id="nav">
            <n-menu mode="horizontal" :options="menuOptions" />
          </div>
          <router-view />
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script>
import { darkTheme } from "naive-ui";
import { h, ref } from "vue";
import { RouterLink } from "vue-router";
import SocketioService from "./services/socketio.service.js";
import UtilsForNaive from "@/components/utils/UtilsForNaive.vue";
import { mapActions } from "vuex";

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
    UtilsForNaive,
  },

  data() {
    return {
      darkTheme,
      menuOptions,
      placement: ref("top-right"),
    };
  },

  created() {
    SocketioService.setupSocketConnection();
  },
  mounted() {
    this.listenRooms();
    this.listenStartGame();
  },
  beforeUnmount() {
    SocketioService.disconnect();
  },

  methods: {
    ...mapActions("room", ["listenRooms", "listenStartGame"]),
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
a {
  text-decoration: none;
}
</style>
