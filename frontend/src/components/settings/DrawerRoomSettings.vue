<template>
  <div>
    <n-button circle @click="drawer = true">
      <template #icon>
        <n-icon size="22">
          <options-24-regular />
        </n-icon>
      </template>
    </n-button>

    <n-drawer
      v-model:show="drawer"
      :width="isMobile ? windowWidth : 400"
      style="background-color: #18181c"
    >
      <n-drawer-content title="Paramètres de la partie" closable>
        <invite-friend />
        <change-colors
          v-if="
            formattedGameName === 'morpion' || formattedGameName === 'connect4'
          "
          :namespace="formattedGameName"
        />
        <change-morpion-shape v-if="game === 'Morpion'" />

        <template #footer>
          <n-button @click="drawer = false">Fermer</n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script>
import InviteFriend from "@/components/settings/room/InviteFriend.vue";
import ChangeColors from "@/components/settings/room/ChangeColors.vue";
import ChangeMorpionShape from "@/components/settings/room/ChangeMorpionShape.vue";
import { Options24Regular } from "@vicons/fluent";
import { mapState } from "vuex";

export default {
  name: "DrawerRoomSettings",
  components: {
    InviteFriend,
    ChangeColors,
    ChangeMorpionShape,
    Options24Regular,
  },
  props: ["isMobile", "windowWidth"],

  data() {
    return {
      drawer: false,
    };
  },

  computed: {
    ...mapState("game", ["game"]),

    formattedGameName() {
      if (this.game === "Morpion") return "morpion";
      if (this.game === "Puissance 4") return "connect4";

      return null;
    },
  },
};
</script>

<style lang="less" scoped>
</style>