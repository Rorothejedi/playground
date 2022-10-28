<template>
  <n-config-provider :theme="darkTheme">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-message-provider :placement="placement">
          <utils-for-naive />
          <n-layout>
            <navbar />
            <n-layout>
              <router-view />
            </n-layout>
          </n-layout>
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script>
import { darkTheme } from "naive-ui";
import { ref } from "vue";
import { mapActions } from "vuex";
import SocketioService from "./services/socketio.service.js";
import UtilsForNaive from "@/components/utils/UtilsForNaive.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    UtilsForNaive,
    Navbar,
  },

  data() {
    return {
      darkTheme,
      placement: ref("bottom"),
    };
  },

  // in app or in room view ?
  beforeCreate() {
    this.$store.commit("player/INIT_LOCALSTORAGE", null, { root: true });
    this.$store.commit("morpion/INIT_LOCALSTORAGE", null, { root: true });
    this.$store.commit("connect4/INIT_LOCALSTORAGE", null, { root: true });
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
@import "./styles/normalize.css";

#app {
  font-family: "Exo 2", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #101014;
  min-height: 100vh;

  .n-config-provider {
    min-height: 100vh;
  }
}
</style>