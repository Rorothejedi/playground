<template>
  <div class="room" :class="{ 'room-without-nav': username === '' }">
    <n-collapse-transition
      class="scorebar-wrapper"
      :show="
        isDisplayScorebar &&
        outcome === '' &&
        isReady &&
        game === 'rockPaperScissors'
      "
    >
      <scorebar />
    </n-collapse-transition>

    <transition appear name="fade" mode="out-in">
      <home-username-input v-if="username === ''" />

      <div v-else>
        <transition name="fade" mode="out-in">
          <div v-if="!isReady" class="waiting-card">
            <n-alert type="success" :bordered="false" :show-icon="false">
              <div class="waiting-card-content">
                <n-h5>
                  {{ $t("room.waitingText") }}
                </n-h5>
                <n-spin size="small" />
              </div>
            </n-alert>
          </div>

          <div v-else class="game-wrapper">
            <div class="game">
              <transition name="fade" mode="out-in">
                <morpion v-if="outcome === '' && game === 'morpion'" />
                <connect-4 v-else-if="outcome === '' && game === 'connect4'" />
                <rock-paper-scissors
                  v-else-if="outcome === '' && game === 'rockPaperScissors'"
                />

                <endgame v-else-if="outcome !== ''" />
              </transition>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import title from "@/mixins/title.js";
import Scorebar from "@/components/Scorebar.vue";
import HomeUsernameInput from "@/components/HomeUsernameInput.vue";
import Endgame from "@/components/room/Endgame.vue";
import Connect4 from "@/components/games/Connect4.vue";
import Morpion from "@/components/games/Morpion.vue";
import RockPaperScissors from "@/components/games/RockPaperScissors.vue";
import socketioService from "../services/socketio.service";

export default {
  name: "Room",
  title: "Room | Playground",
  mixins: [title],
  components: {
    Scorebar,
    HomeUsernameInput,
    Connect4,
    Morpion,
    RockPaperScissors,
    Endgame,
  },

  data() {
    return {
      isReady: false,
      enemyUsername: "",
    };
  },

  computed: {
    ...mapState("player", ["username", "host", "outcome", "socketId"]),
    ...mapState("room", ["rooms"]),
    ...mapState("game", ["game", "numberOfPlayer"]),
    ...mapGetters("room", ["room", "enemies"]),

    isDisplayScorebar() {
      if (this.enemies === undefined) return false;
      if (this.enemies.length < this.numberOfPlayer - 1) return false;

      return true;
    },
  },

  watch: {
    room(newValue) {
      if (newValue === undefined && this.isReady) {
        window.$message.error(
          this.$t("room.leaveGame", { user: this.enemyUsername })
        );
        this.$router.push({ name: "Home" });
        return;
      }

      this.watchRoomForReady();
    },

    enemies(newValue) {
      if (newValue === undefined) return;
      if (newValue.length === 0) return;
      if (this.enemyUsername !== "") return;

      this.enemyUsername = newValue[0].username;
    },

    username(newValue, oldValue) {
      if (newValue !== "" && oldValue === "") this.joinRoom();
    },
  },

  created() {
    if (this.username === "" || this.socketId !== "") return;

    this.joinRoom();
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
    this.emitLeaveRoom();

    this.resetEnemyData();

    this.changeSocketId("");
    this.changeGame("");
    this.changeRoomId("");
    this.changeHost(false);
    this.changeIsWinner(false);
    this.changeTurn(false);
    this.changeOutcome("");
    this.changeNumberOfPlayer(2);
    this.changeScoreToReach(3);
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
      "emitLeaveRoom",
      "listenReplay",
    ]),
    ...mapActions("game", [
      "changeGame",
      "resetEnemyData",
      "changeNumberOfPlayer",
      "changeScoreToReach",
    ]),

    watchRoomForReady() {
      if (this.room === undefined) return;
      if (this.room.players.length !== this.room.numberOfPlayer) return;
      if (this.isReady) return;

      if (!this.host) {
        this.changeScoreToReach(this.room.scoreToReach);
        this.changeNumberOfPlayer(this.room.numberOfPlayer);
      }

      this.isReady = true;
    },

    quitRoomConfirm() {
      return new Promise((resolve) => {
        window.$dialog.warning({
          title: this.$t("room.quitConfirm.title"),
          content: this.$t("room.quitConfirm.content"),
          positiveText: this.$t("room.quitConfirm.yes"),
          negativeText: this.$t("room.quitConfirm.no"),
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
.room-without-nav {
  height: 100vh;
}
.room {
  height: calc(100vh - 64px);
}

.scorebar-wrapper {
  position: absolute;
}

.waiting-card {
  height: calc(100vh - 128px);
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;

  .waiting-card-content {
    display: flex;
    flex-direction: column;
    padding: 5px;
  }
}

.game-wrapper {
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  .game {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (max-width: 600px) {
  .room {
    height: calc(100vh - 86px);
  }
  .waiting-card,
  .game-wrapper {
    height: calc(100vh - 86px);
  }
}
</style>
