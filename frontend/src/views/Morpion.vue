<template>
  <div class="morpion">
    <n-h1>Morpion</n-h1>

    <div v-if="!isReady">
      <n-collapse-transition class="waiting-card" :show="displayWaitingCard">
        <n-card title="En attente d'un 2ème joueur...">
          <n-button @click="isReady = !isReady">
            {{ !isReady ? "Ready" : "Not ready" }}
          </n-button>
          <n-button @click="leaveMorpionRoom()"> Annuler </n-button>
        </n-card>
      </n-collapse-transition>
    </div>

    <div v-else>
      <grid />
      <n-button @click="isReady = !isReady">
        {{ !isReady ? "Ready" : "Not ready" }}
      </n-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Grid from "@/components/morpion/Grid.vue";

export default {
  name: "Morpion",
  components: { Grid },

  data() {
    return {
      isReady: false,
      displayWaitingCard: true,
    };
  },

  computed: {
    ...mapState("player", ["username"]),
    ...mapState("room", ["rooms"]),
  },

  mounted() {
    this.listenStartGame();
  },

  methods: {
    ...mapActions("player", ["changeGame"]),
    ...mapActions("room", ["listenStartGame", "leaveRoom"]),

    checkRoomForStartGame() {
      // const roomId = this.
    },

    leaveMorpionRoom() {
      this.changeGame("");

      this.leaveRoom();

      this.$router.push({ name: "Rooms" });
    },

    startGame() {
      this.isReady = true;
    },
  },
};
</script>

<style lang="less" scoped>
.n-h1 {
  text-align: center;
}
.waiting-card,
.info-alert {
  display: flex;
  justify-content: center;
}
.room-card,
.info-alert {
  padding-top: 15px;
}
.n-card {
  max-width: 500px;
}
.n-alert {
  width: 500px;
}
</style>
