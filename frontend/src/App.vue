<template>
  <n-config-provider :theme="darkTheme">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-message-provider :placement="placement">
          <utils-for-naive />
          <router-view />
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script>
import { darkTheme } from "naive-ui";
import { ref } from "vue";
import SocketioService from "./services/socketio.service.js";
import UtilsForNaive from "@/components/utils/UtilsForNaive.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    UtilsForNaive,
  },

  data() {
    return {
      darkTheme,
      placement: ref("top"),
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
.n-h1 {
  text-align: center;
  padding-top: 50px;
}
</style>
