<template>
  <div class="room">
    <div v-if="!isReady" class="waiting-card">
      <n-h1>Morpion</n-h1>

      <n-alert type="success">
        <template #icon>
          <n-spin size="small" />
        </template>
        En attente d'un autre joueur...
      </n-alert>
      <n-button @click="quitRoom()"> Annuler </n-button>
    </div>

    <div v-else class="game-wrapper">
      <n-h1>Morpion</n-h1>

      <grid v-if="outcome === ''" />

      <div v-else class="end-game">
        <n-result
          :status="statusEndGame"
          :title="titleEndGame"
          :description="descriptionEndGame"
        >
          <template #footer>
            <n-button @click="restartGame()" v-if="host && outcome">
              Rejouer
            </n-button>
            <n-spin v-else size="medium" />
          </template>
        </n-result>
      </div>

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
      toBack: false,
    };
  },

  computed: {
    ...mapState("player", ["host", "outcome"]),
    ...mapState("room", ["rooms", "roomPlayers", "replay"]),

    statusEndGame() {
      if (this.outcome === "defeat") return "500";
      if (this.outcome === "win") return "418";

      return "404";
    },
    titleEndGame() {
      if (this.outcome === "defeat") return "Défaite";
      if (this.outcome === "win") return "Victoire";

      return "Egalité";
    },
    descriptionEndGame() {
      if (this.outcome === "defeat")
        return "Aïe ! Pourquoi ne pas retenter votre chance ?";
      if (this.outcome === "win")
        return "Trop facile ! Vous prendrez bien un thé ?";

      return "Bizarre... J'était pourtant sûr que vous alliez l'avoir !";
    },
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
    replay(newValue, oldValue) {
      if (newValue && !oldValue && !this.host) this.resetGame();
    },
  },

  created() {
    if (this.host) {
      this.changeRoomId(this.$route.query.room);
    }
  },

  mounted() {
    this.listenReplay();
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
    ...mapActions("room", ["emitLeaveRoom", "listenReplay", "changeReplay"]),
    ...mapActions("player", [
      "changeRoomId",
      "emitReplay",
      "changeTurn",
      "changeWin",
      "changeOutcome",
    ]),

    watchRoom(roomPlayers) {
      if (roomPlayers.length === 2 && !this.isReady) {
        this.isReady = true;
      }
    },

    restartGame() {
      this.emitReplay();
      this.resetGame();
    },

    resetGame() {
      let turn =
        this.outcome === "defeat" || (this.outcome === "equality" && this.host);

      this.changeTurn(turn);
      this.changeOutcome("");
      this.changeWin(false);
      this.changeReplay(false);
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
      this.changeOutcome("");
      this.$router.push({ name: "Rooms" });
    },
  },
};
</script>

<style lang="less" scoped>
.room {
  min-height: 100vh;
}
.n-h1 {
  padding-top: 1em;
  margin-bottom: 0;
}
.n-h3 {
  margin-top: 5px;
  margin-bottom: 15px;
}
.waiting-card {
  height: 100vh;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}

.game-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.end-game {
  height: 466px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
