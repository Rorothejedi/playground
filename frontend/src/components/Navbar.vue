<template>
  <n-collapse-transition appear :show="username !== ''">
    <n-layout-header
      style="height: 64px"
      :bordered="!isMobile || isOnHome"
      class="nav"
    >
      <div class="title-wrapper">
        <n-button
          text
          class="title"
          @click="toHome()"
          title="Accueil"
          type="success"
        >
          Playground
        </n-button>
        <n-collapse-transition v-show="game !== '' && !isMobile">
          <n-text depth="3" class="separator"> / </n-text>
          <n-text class="game-name">{{ game ? $t(game) : "" }}</n-text>
        </n-collapse-transition>
      </div>

      <transition name="fade" mode="out-in">
        <n-space inline :size="isMobile ? 'small' : 'medium'" v-if="!isOnHome">
          <drawer-room-settings
            :isMobile="isMobile"
            :windowWidth="windowWidth"
          />

          <drawer-global-settings
            :isMobile="isMobile"
            :windowWidth="windowWidth"
          />

          <n-button round @click="toHome()">
            <template #icon v-if="isMobile">
              <n-icon size="22">
                <close-filled />
              </n-icon>
            </template>
            <n-text v-if="!isMobile">
              {{ $t("navbar.quit") }}
            </n-text>
          </n-button>
        </n-space>
        <div v-else>
          <drawer-global-settings
            :isMobile="isMobile"
            :windowWidth="windowWidth"
          />
        </div>
      </transition>
    </n-layout-header>
    <n-collapse-transition :show="game !== '' && isMobile">
      <n-layout>
        <n-layout-header class="sub-nav">
          <n-text>
            {{ $t(game) }}
          </n-text>
        </n-layout-header>
      </n-layout>
    </n-collapse-transition>
  </n-collapse-transition>
</template>

<script>
import { mapState } from "vuex";
import { CloseFilled } from "@vicons/material";
import responsive from "@/mixins/responsive";
import utils from "@/mixins/utils";
import DrawerGlobalSettings from "@/components/settings/DrawerGlobalSettings.vue";
import DrawerRoomSettings from "@/components/settings/DrawerRoomSettings.vue";

export default {
  name: "Navbar",
  mixins: [responsive, utils],
  components: {
    CloseFilled,
    DrawerGlobalSettings,
    DrawerRoomSettings,
  },

  data() {
    return {
      drawerRoomSettings: false,
      drawerGlobalSettings: false,
      selectedLanguage: "french",
    };
  },

  computed: {
    ...mapState("game", ["game"]),
    ...mapState("player", ["username"]),

    isOnHome() {
      return this.$route.name === "Home" || this.$route.name === undefined;
    },
  },

  methods: {
    toHome() {
      this.$router.push({
        name: "Home",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.nav {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  grid-template-rows: calc(64px - 1px);
  padding: 0 32px;

  .title-wrapper {
    display: flex;
    align-items: flex-end;

    .title {
      font-family: "Major Mono Display", monospace;
      font-size: 2em;
    }
    .separator {
      margin: auto 8px;
    }
    .game-name,
    .separator {
      cursor: default;
    }
  }
}

@media screen and (max-width: 700px) {
  .nav {
    padding: 0 15px;
    grid-template-rows: 64px;

    .title-wrapper {
      align-items: center;

      .title {
        font-size: 1.5em;
      }
    }
  }

  .sub-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.09);
    height: 22px;
  }
}
</style>