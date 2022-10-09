<template>
  <div class="room">
    <div v-if="!isReady" class="waiting-card">
      <n-h1>{{ game }}</n-h1>

      <n-alert type="success">
        <template #icon>
          <n-spin size="small" />
        </template>
        En attente d'un autre joueur...
      </n-alert>
      <n-button @click="quitRoom()"> Annuler </n-button>
    </div>

    <div v-else class="game-wrapper">
      <n-h1>{{ game }}</n-h1>

      <div class="game">
        <n-collapse-transition :show="outcome === ''" appear>
          <morpion v-if="game === 'Morpion'" />
          <rock-paper-scissors v-else-if="game === 'Pierre-papier-ciseaux'" />
        </n-collapse-transition>

        <n-collapse-transition :show="outcome !== ''" appear>
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
      </div>

      <n-button @click="quitRoomConfirm(quitRoom)" class="quit-button">
        Quitter la partie
      </n-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import title from "@/mixins/title.js";
import Morpion from "@/components/Morpion.vue";
import RockPaperScissors from "@/components/RockPaperScissors.vue";

export default {
  name: "Room",
  title: "Room | Playground",
  mixins: [title],
  components: { Morpion, RockPaperScissors },

  data() {
    return {
      isReady: false,
      toBack: false,
    };
  },

  computed: {
    ...mapState("player", ["host", "outcome", "game"]),
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
        (room) => room.id === this.$route.query.id
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
      this.changeRoomId(this.$route.query.id);
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
      console.log("replay");
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
      console.log("reset game");
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
      this.changeReplay(false);
      this.$router.push({ name: "Home" });
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

.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.game-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.end-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
