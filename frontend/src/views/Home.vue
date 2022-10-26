<template>
  <n-collapse-transition class="rooms" :show="!loadingRoom">
    <n-collapse-transition :show="displayUsernameInput">
      <n-h1 class="username-title" v-if="username === ''"> Playground </n-h1>
      <div class="username-card">
        <n-card title="Ton pseudo">
          <n-input-group>
            <n-input
              v-model:value="localUsername"
              ref="usernameInput"
              type="text"
              placeholder="ex: Toto"
              maxlength="30"
              show-count
            />
            <n-button @click="addUsername()" :disabled="localUsername === ''">
              Choisir
            </n-button>
          </n-input-group>
        </n-card>
      </div>
    </n-collapse-transition>

    <n-collapse-transition :show="!displayUsernameInput">
      <n-space vertical>
        <div class="create-room-card">
          <n-card title="Nouvelle partie">
            <n-form>
              <n-form-item :show-label="false">
                <n-select
                  v-model:value="selectedGame"
                  :options="gamesAvailable"
                  placeholder="Choisir un jeu"
                />
              </n-form-item>
            </n-form>
            <n-collapse-transition
              :show="selectedGame === 'Pierre-papier-ciseaux'"
            >
              <n-form>
                <n-form-item label="Participants">
                  <n-radio
                    :checked="localNumberOfPlayer === 2"
                    name="radio-number-of-player"
                    @change="
                      localNumberOfPlayer = parseInt($event.target.value)
                    "
                    value="2"
                    label="2 joueurs"
                  />
                  <n-radio
                    :checked="localNumberOfPlayer === 3"
                    name="radio-number-of-player"
                    @change="
                      localNumberOfPlayer = parseInt($event.target.value)
                    "
                    value="3"
                    label="3 joueurs"
                  />
                </n-form-item>
                <n-form-item label="Score à atteindre">
                  <n-slider
                    v-model:value="localScoreToReach"
                    :min="1"
                    :max="10"
                    :marks="{
                      1: '1',
                      5: '5',
                      10: '10',
                    }"
                  />
                </n-form-item>
              </n-form>
            </n-collapse-transition>
            <n-button @click="createRoom()" :disabled="!selectedGame">
              Créer
            </n-button>
          </n-card>
        </div>

        <div class="room-card">
          <n-card title="Liste des parties disponibles">
            <n-space vertical :size="12">
              <div v-if="availableRooms.length !== 0">
                <n-list>
                  <n-list-item v-for="(room, key) in availableRooms" :key="key">
                    <template #prefix>
                      <n-tag
                        :bordered="false"
                        type="success"
                        :size="isMobile ? 'small' : 'medium'"
                        round
                      >
                        {{ room.players[0].game }}
                        <template #icon>
                          <n-icon-wrapper
                            :size="isMobile ? 20 : 24"
                            :border-radius="20"
                          >
                            <n-icon :size="isMobile ? 16 : 18">
                              <grid-3-x-3-sharp
                                v-if="room.players[0].game === 'Morpion'"
                              />
                              <hand-scissors-regular
                                v-if="
                                  room.players[0].game ===
                                  'Pierre-papier-ciseaux'
                                "
                              />
                              <hand-spock-regular
                                v-if="
                                  room.players[0].game ===
                                  'Pierre-papier-ciseaux-lézard-spock'
                                "
                              />
                              <grid-dots-24-filled
                                v-if="room.players[0].game === 'Puissance 4'"
                              />
                            </n-icon>
                          </n-icon-wrapper>
                        </template>
                      </n-tag>

                      <n-text
                        v-if="isMobile"
                        italic
                        depth="2"
                        class="room-creator"
                      >
                        by {{ room.players[0].username }}
                      </n-text>
                    </template>

                    <n-tag
                      title="Nombre de joueur requis"
                      :size="isMobile ? 'small' : 'medium'"
                      class="number-of-player"
                    >
                      {{ room.players.length }} /
                      {{ room.numberOfPlayer }}
                    </n-tag>

                    <n-text
                      v-if="!isMobile"
                      italic
                      depth="2"
                      class="room-creator"
                    >
                      by {{ room.players[0].username }}
                    </n-text>

                    <template #suffix>
                      <n-button
                        @click="joinRoom(room)"
                        :size="isMobile ? 'small' : 'medium'"
                      >
                        Rejoindre
                      </n-button>
                    </template>
                  </n-list-item>
                </n-list>
              </div>
              <div v-else>
                <n-list bordered>
                  <n-list-item>
                    <n-space justify="center" class="no-room">
                      Aucune partie disponible
                    </n-space>
                  </n-list-item>
                </n-list>
              </div>
            </n-space>
          </n-card>
        </div>
      </n-space>
    </n-collapse-transition>
  </n-collapse-transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
import socketioService from "../services/socketio.service";
import title from "@/mixins/title.js";
import utils from "@/mixins/utils.js";
import { HandScissorsRegular, HandSpockRegular } from "@vicons/fa";
import { Grid3X3Sharp } from "@vicons/material";
import { GridDots24Filled } from "@vicons/fluent";

export default {
  name: "Home",
  title: "Playground",
  mixins: [title, utils],
  components: {
    HandScissorsRegular,
    HandSpockRegular,
    Grid3X3Sharp,
    GridDots24Filled,
  },

  data() {
    return {
      displayUsernameInput: true,
      selectedGame: null,
      gamesAvailable: [
        { label: "Morpion", value: "Morpion" },
        {
          label: "Puissance 4",
          value: "Puissance 4",
        },
        {
          label: "Pierre-papier-ciseaux",
          value: "Pierre-papier-ciseaux",
        },
      ],
      loadingRoom: true,
      windowWidth: window.innerWidth,

      localUsername: "",
      localNumberOfPlayer: 2,
      localScoreToReach: 3,
    };
  },

  computed: {
    ...mapState("player", ["username"]),
    ...mapState("room", ["rooms"]),
    ...mapState("game", ["game"]),

    availableRooms() {
      return this.rooms.filter(
        (room) => room.players.length < room.numberOfPlayer
      );
    },
    isMobile() {
      return this.windowWidth <= 600;
    },
  },

  watch: {
    localScoreToReach(newValue) {
      this.changeScoreToReach(newValue);
    },
    localNumberOfPlayer(newValue) {
      this.changeNumberOfPlayer(newValue);
    },
  },

  created() {
    if (this.username !== "") {
      this.localUsername = this.username;
      this.addUsername();
    }
  },

  async mounted() {
    this.loadingRoom = false;

    if (this.game !== "") this.emitLeaveRoom();

    this.resetEnemyData();
    this.changeOutcome("");
    this.changeGame("");
    this.changeRoomId("");
    this.changeNumberOfPlayer(2);

    this.emitGetRooms();

    window.addEventListener("resize", this.onResize);

    if (this.username === "") {
      await this.sleep(100);
      this.$refs.usernameInput.focus();
    }
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    ...mapActions("player", [
      "changeUsername",
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
      "emitLeaveRoom",
    ]),
    ...mapActions("game", [
      "resetEnemyData",
      "changeGame",
      "changeScoreToReach",
      "changeNumberOfPlayer",
    ]),

    addUsername() {
      this.displayUsernameInput = !this.displayUsernameInput;

      this.changeUsername(this.localUsername);
    },

    createRoom() {
      if (this.loadingRoom) return;

      this.loadingRoom = true;

      this.changeSocketId(socketioService.socket.id);
      this.changeGame(this.selectedGame);
      this.changeHost(true);
      this.changeTurn(true);
      this.changeIsWinner(false);

      this.emitCreateOrJoinRoom();

      window.$loading.start();
      window.$message.loading("Salon en cours de création...", {
        duration: 2000,
      });

      setTimeout(() => {
        this.$router.push({
          name: "Room",
          query: { id: this.rooms.at(-1).id },
        });

        window.$loading.finish();
      }, 2000);
    },

    joinRoom(room) {
      this.changeSocketId(socketioService.socket.id);
      this.changeGame(room.players[0].game);
      this.changeRoomId(room.id);
      this.changeHost(false);
      this.changeTurn(false);
      this.changeIsWinner(false);

      this.emitCreateOrJoinRoom();

      this.$router.push({
        name: "Room",
        query: { id: room.id },
      });
    },

    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
};
</script>

<style lang="less" scoped>
.rooms {
  margin: 50px auto;
}

.username-title {
  font-family: "Major Mono Display", monospace;
  margin-bottom: 50px;
  font-size: 3em;
}
.username-title,
.username-card,
.room-card,
.create-room-card {
  display: flex;
  justify-content: center;
}
.username-card {
  padding-bottom: 25px;
}

.n-card {
  max-width: 600px;
}
.no-room {
  padding-top: 30px;
  padding-bottom: 30px;
}

.n-list-item {
  display: flex;
  justify-content: space-between;
}

.room-creator {
  margin-left: 5px;
}
.n-tag {
  width: fit-content;
}
.n-tag.n-tag--icon.n-tag--round {
  padding-left: 12px;
}
.number-of-player {
  margin-left: 5px;
}

@media screen and (max-width: 600px) {
  .rooms {
    margin: 20px auto;
  }
  .n-tag.n-tag--icon.n-tag--round {
    padding-left: 8px;
  }
  .room-creator {
    margin-left: 20px;
  }
}
</style>

<style>
.n-list-item__prefix {
  margin-right: 0px !important;
  flex: initial !important;
  display: flex;
  flex-direction: column;
}
@media screen and (max-width: 600px) {
  .n-list-item__main {
    place-self: normal;
  }
}
</style>
