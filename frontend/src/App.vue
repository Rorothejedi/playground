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
    this.listenGetRooms();
  },

  beforeUnmount() {
    SocketioService.disconnect();
  },

  methods: {
    ...mapActions("room", ["listenGetRooms"]),
  },
};
</script>

<style lang="less">
#app {
  font-family: "Exo 2", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #18181c;
  min-height: 100vh;

  .n-config-provider {
    min-height: 100vh;
  }
}

.n-h1 {
  text-align: center;
  padding-top: 50px;
  font-family: "Major Mono Display", monospace;
}
</style>
