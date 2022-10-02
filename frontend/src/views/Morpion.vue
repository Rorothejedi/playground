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
      <n-button @click="quitRoomConfirm(quitRoom)" class="quit-button">
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
      toBack: false,
    };
  },

  computed: {
    ...mapState("player", ["host"]),
    ...mapState("room", ["rooms", "roomPlayers"]),
  },

  watch: {
    rooms(newValue, oldValue) {
      const findRoom = newValue.find(
        (room) => room.id === this.$route.query.room
      );

      if (
        newValue.length !== oldValue.length &&
        findRoom === undefined &&
        this.isReady
      ) {
        window.$message.error("Votre adversaire a quitté la partie");
        this.quitRoom();
      }
    },
    roomPlayers(newValue) {
      this.watchRoom(newValue);
    },
  },

  created() {
    if (this.host) {
      this.changeRoomId(this.$route.query.room);
    }
  },

  mounted() {
    this.watchRoom(this.roomPlayers);

    window.onpopstate = () => {
      this.toBack = true;
    };
  },

  beforeRouteLeave(to, from, next) {
    setTimeout(() => {
      if (!this.toBack) return next();

      this.quitRoomConfirm(next);
    }, 100);
  },

  methods: {
    ...mapActions("room", ["emitLeaveRoom"]),
    ...mapActions("player", ["changeRoomId"]),

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

      window.$message.success(message);
    },

    quitRoomConfirm(onPositive) {
      window.$dialog.warning({
        title: "Quitter la partie ?",
        content:
          "Vous êtes certain de vouloir quitter ? Dans ce cas, votre adversaire sera expulsé de la partie...",
        positiveText: "Oui, je suis sûr",
        negativeText: "Finalement non",
        onPositiveClick: () => {
          onPositive();
        },
      });
    },

    quitRoom() {
      this.toBack = false;
      this.$router.push({ name: "Rooms" });
    },
  },
};
</script>

<style lang="less" scoped>
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
