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
      <n-drawer-content :title="$t('settings.room.title')" closable>
        <invite-friend />
        <change-colors
          v-if="game === 'morpion' || game === 'connect4'"
          :namespace="game"
        />
        <change-morpion-shape v-if="game === 'morpion'" />

        <template #footer>
          <n-button @click="drawer = false">
            {{ $t("actions.close") }}
          </n-button>
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
  },
};
</script>