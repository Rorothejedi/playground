<template>
  <n-config-provider :theme="darkTheme">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-message-provider :placement="placement">
          <utils-for-naive />
          <kinesis-container>
            <n-layout>
              <navbar />
              <n-layout>
                <router-view v-slot="{ Component, route }">
                  <transition name="fade" mode="out-in">
                    <component :is="Component" :key="route.path" />
                  </transition>
                </router-view>
              </n-layout>
            </n-layout>
          </kinesis-container>
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

  beforeCreate() {
    this.$store.commit("player/INIT_LOCALSTORAGE", null, { root: true });
    this.$store.commit("morpion/INIT_LOCALSTORAGE", null, { root: true });
    this.$store.commit("connect4/INIT_LOCALSTORAGE", null, { root: true });

    if (!localStorage.getItem("language")) return;

    this.$i18n.locale = localStorage.getItem("language");
  },

  created() {
    SocketioService.setupSocketConnection();
  },

  mounted() {
    this.listenGetRooms();
    this.listenError();
    this.listenErrorRoomFull();
    this.listenErrorRoomNoExist();
  },

  beforeUnmount() {
    SocketioService.disconnect();
  },

  methods: {
    ...mapActions("room", [
      "listenGetRooms",
      "listenError",
      "listenErrorRoomFull",
      "listenErrorRoomNoExist",
    ]),
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

// TRANSITIONS

// fade

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// fade-in-down

.fade-in-down-enter-active {
  transition: all 0.3s ease-out;
}
.fade-in-down-leave-active {
  transition: all 0.3s ease;
}

.fade-in-down-enter-from {
  transform: translateY(-50px);
  opacity: 0;
}
.fade-in-down-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>