<template>
  <div class="morpion">
    <n-h1>Morpion</n-h1>

    <div v-if="!isReady">
      <n-collapse-transition class="waiting-card" :show="displayWaitingCard">
        <n-alert type="success">
          <template #icon>
            <n-spin size="small" />
          </template>
          En attente d'un autre joueur...
        </n-alert>
        <n-button @click="quitRoom()"> Annuler </n-button>
      </n-collapse-transition>
    </div>

    <div v-else class="grid-wrapper">
      <grid />
      <n-button @click="quitRoomConfirm()" class="quit-button">
        Quitter la partie
      </n-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
    ...mapState("player", ["host"]),
    ...mapState("room", ["rooms", "roomPlayers"]),
  },

  watch: {
    rooms(newValue) {
      const findRoom = newValue.find(
        (room) => room.id === this.$route.query.room
      );

      if (findRoom === undefined && this.isReady) {
        window.$alert.error("Votre adversaire à quitter la partie");
        this.quitRoom();
      }
    },
    roomPlayers(newValue) {
      this.watchRoom(newValue);
    },
  },

  mounted() {
    this.watchRoom(this.roomPlayers);
  },

  methods: {
    ...mapActions("room", ["emitLeaveRoom"]),

    watchRoom(roomPlayers) {
      if (roomPlayers.length === 2 && !this.isReady) {
        this.startGame();
      }
    },

    startGame() {
      this.isReady = true;

      let message = this.host
        ? "Un joueur à rejoint la partie."
        : "La partie commence maintenant.";
      message += " Que le meilleur gagne !";

      window.$alert.success(message);
    },

    quitRoomConfirm() {
      window.$dialog.warning({
        title: "Quitter la partie ?",
        content:
          "Vous êtes certain de vouloir quitter ? Dans ce cas, votre adversaire sera expulsé de la partie...",
        positiveText: "Oui, je suis sûr",
        negativeText: "Finalement non",
        onPositiveClick: () => {
          this.quitRoom();
        },
        onNegativeClick: () => {
          return;
        },
      });
    },

    quitRoom() {
      this.emitLeaveRoom();
      this.$router.push({ name: "Rooms" });
    },
  },
};
</script>

<style lang="less" scoped>
.n-h1 {
  text-align: center;
}
.n-h3 {
  margin-top: 5px;
  margin-bottom: 15px;
}
.waiting-card {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .n-alert {
    margin-bottom: 15px;
  }
}

.grid-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
