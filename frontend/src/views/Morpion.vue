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
      <grid v-if="outcome === ''" />

      <n-collapse-transition :show="outcome !== ''">
        <div class="end-game">
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
      </n-collapse-transition>

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
.n-h1 {
  padding-top: 70px;
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

.end-game {
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
