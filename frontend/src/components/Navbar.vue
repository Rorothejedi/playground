<template>
  <n-collapse-transition :show="username !== ''">
    <n-layout-header
      style="height: 64px"
      :bordered="!isMobile || $route.name === 'Home'"
      class="nav"
    >
      <div class="title-wrapper">
        <n-button text class="title" @click="toHome()" title="Accueil">
          Playground
        </n-button>
        <n-collapse-transition v-show="game !== '' && !isMobile">
          <n-text depth="3" class="separator"> / </n-text>
          <n-text class="game-name">{{ game }}</n-text>
        </n-collapse-transition>
      </div>

      <n-space inline>
        <!-- <n-button tertiary>Infos de la partie</n-button> -->
        <!-- <n-button>Paramètres globaux</n-button> -->

        <n-button title="Paramétres"> Params </n-button>

        <n-button
          circle
          @click="toHome()"
          v-if="game !== ''"
          title="Quitter la partie"
        >
          <template #icon>
            <n-icon>
              <close-filled />
            </n-icon>
          </template>
        </n-button>
      </n-space>
    </n-layout-header>
    <n-collapse-transition :show="game !== '' && isMobile">
      <n-layout>
        <n-layout-header class="sub-nav">
          <n-text>{{ game }}</n-text>
        </n-layout-header>
      </n-layout>
    </n-collapse-transition>
  </n-collapse-transition>
</template>

<script>
import { mapState } from "vuex";
import { CloseFilled } from "@vicons/material";

export default {
  name: "Navbar",
  components: { CloseFilled },

  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },

  computed: {
    ...mapState("game", ["game"]),
    ...mapState("player", ["username"]),

    isMobile() {
      return this.windowWidth <= 600;
    },
  },

  mounted() {
    window.addEventListener("resize", this.onResize);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    toHome() {
      this.$router.push({
        name: "Home",
      });
    },

    onResize() {
      this.windowWidth = window.innerWidth;
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

@media screen and (max-width: 600px) {
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