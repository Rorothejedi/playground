<template>
  <div>
    <n-collapse-transition :show="username === ''">
      <home-username-input />
    </n-collapse-transition>

    <div v-if="username !== ''">
      <div v-if="!isReady" class="waiting-card">
        <n-alert type="success">
          <template #icon>
            <n-spin size="small" />
          </template>
          En attente d'un autre joueur...
        </n-alert>
      </div>

      <div v-else class="game-wrapper">
        <div class="game">
          <n-collapse-transition :show="outcome === ''" appear>
            <morpion v-if="game === 'Morpion'" />
            <rock-paper-scissors v-else-if="game === 'Pierre-papier-ciseaux'" />
            <connect-4 v-else-if="game === 'Puissance 4'" />
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import title from "@/mixins/title.js";
import HomeUsernameInput from "@/components/HomeUsernameInput.vue";
import Connect4 from "@/components/games/Connect4.vue";
import Morpion from "@/components/games/Morpion.vue";
import RockPaperScissors from "@/components/games/RockPaperScissors.vue";
import socketioService from "../services/socketio.service";

export default {
  name: "Room",
  title: "Room | Playground",
  mixins: [title],
  components: { HomeUsernameInput, Connect4, Morpion, RockPaperScissors },

  data() {
    return {
      isReady: false,
      enemyUsername: "",
    };
  },

  computed: {
    ...mapState("player", ["username", "host", "outcome", "socketId"]),
    ...mapState("room", ["rooms", "replay"]),
    ...mapState("game", ["game"]),
    ...mapGetters("room", ["room", "enemies"]),

    statusEndGame() {
      if (this.outcome === "defeat") return "500";
      if (this.outcome === "victory") return "418";

      return "404";
    },
    titleEndGame() {
      if (this.outcome === "defeat") return "Défaite";
      if (this.outcome === "victory") return "Victoire";

      return "Egalité";
    },
    descriptionEndGame() {
      if (this.outcome === "defeat")
        return "Aïe ! Pourquoi ne pas retenter votre chance ?";
      if (this.outcome === "victory")
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
        window.$message.error(`${this.enemyUsername} a quitté la partie`);
        this.$router.push({ name: "Home" });
      }

      this.watchRoomForReady();
    },

    replay(newValue, oldValue) {
      if (newValue && !oldValue && !this.host) this.resetGame();
    },

    enemies(newValue) {
      if (
        newValue === undefined ||
        newValue.length === 0 ||
        this.enemyUsername !== ""
      )
        return;

      this.enemyUsername = newValue[0].username;
    },

    username(newValue, oldValue) {
      if (newValue !== "" && oldValue === "") this.joinRoom();
    },
  },

  created() {
    if (this.host) {
      this.changeRoomId(this.$route.query.id);
    } else if (this.username !== "" && this.socketId === "") {
      this.joinRoom();
    }
  },

  mounted() {
    this.listenReplay();
    this.watchRoomForReady();
  },

  async beforeRouteLeave(to, from, next) {
    if (this.enemies === undefined || this.enemies.length === 0) return next();

    const answer = await this.quitRoomConfirm();

    if (!answer) return next(false);

    next();
  },

  beforeUnmount() {
    this.changeReplay(false);
  },

  methods: {
    ...mapActions("player", [
      "changeHost",
      "changeRoomId",
      "changeSocketId",
      "changeTurn",
      "changeIsWinner",
      "changeOutcome",
    ]),
    ...mapActions("room", [
      "emitCreateOrJoinRoom",
      "emitGetRooms",
      "listenGetRooms",
      "emitReplay",
      "listenReplay",
      "changeReplay",
    ]),
    ...mapActions("game", ["changeGame"]),

    watchRoomForReady() {
      if (
        this.room === undefined ||
        this.room.players.length !== this.room.numberOfPlayer ||
        this.isReady
      )
        return;

      this.isReady = true;
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
      this.changeIsWinner(false);
      this.changeReplay(false);
    },

    quitRoomConfirm() {
      return new Promise((resolve) => {
        window.$dialog.warning({
          title: "Quitter la partie ?",
          content:
            "Vous êtes certain de vouloir quitter ? Dans ce cas, votre adversaire sera expulsé de la partie...",
          positiveText: "Oui, je suis sûr",
          negativeText: "Finalement non",
          onPositiveClick: () => {
            resolve(true);
          },
          onNegativeClick: () => {
            resolve(false);
          },
          onMaskClick: () => {
            resolve(false);
          },
          onClose: () => {
            resolve(false);
          },
        });
      });
    },

    joinRoom() {
      this.changeSocketId(socketioService.socket.id);
      this.changeGame(this.$route.query.game);
      this.changeRoomId(this.$route.query.id);
      this.changeHost(false);
      this.changeTurn(false);
      this.changeIsWinner(false);

      this.emitCreateOrJoinRoom();
    },
  },
};
</script>

<style lang="less" scoped>
.waiting-card {
  height: calc(100vh - 128px);
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
  height: calc(100vh - 128px);
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

@media screen and (max-width: 600px) {
  .waiting-card,
  .end-game,
  .game-wrapper {
    height: calc(100vh - 154px);
  }
}
</style>
