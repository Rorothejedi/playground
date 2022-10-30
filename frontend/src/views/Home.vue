<template>
  <div class="home" :class="{ 'home-without-nav': username === '' }">
    <transition appear name="fade" mode="out-in">
      <home-username-input v-if="username === ''" />

      <n-space vertical class="home-cards" v-else>
        <div class="create-room-card">
          <n-card title="Nouvelle partie" :bordered="false">
            <n-form>
              <n-form-item :show-label="false">
                <n-select
                  v-model:value="selectedGame"
                  :options="gamesAvailable"
                  placeholder="Choisir un jeu"
                  size="large"
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
          <n-card title="Liste des parties disponibles" :bordered="false">
            <n-space vertical :size="12">
              <div v-if="availableRooms.length !== 0">
                <n-list>
                  <n-list-item v-for="(room, key) in availableRooms" :key="key">
                    <!-- Use transition-group -->
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
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import socketioService from "../services/socketio.service";
import responsive from "@/mixins/responsive.js";
import title from "@/mixins/title.js";
import utils from "@/mixins/utils.js";
import HomeUsernameInput from "@/components/HomeUsernameInput.vue";
import { HandScissorsRegular } from "@vicons/fa";
import { Grid3X3Sharp } from "@vicons/material";
import { GridDots24Filled } from "@vicons/fluent";

export default {
  name: "Home",
  title: "Home | Playground",
  mixins: [responsive, title, utils],
  components: {
    HomeUsernameInput,
    HandScissorsRegular,
    Grid3X3Sharp,
    GridDots24Filled,
  },

  data() {
    return {
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

      localNumberOfPlayer: 2,
      localScoreToReach: 3,

      saveRoomsBeforeRedirect: null,
    };
  },

  computed: {
    ...mapState("player", ["socketId", "username"]),
    ...mapState("room", ["rooms"]),
    ...mapState("game", ["game"]),

    availableRooms() {
      if (this.saveRoomsBeforeRedirect !== null)
        return this.saveRoomsBeforeRedirect;

      return this.rooms.filter(
        (room) => room.players.length < room.numberOfPlayer
      );
    },
  },

  watch: {
    localScoreToReach(newValue) {
      this.changeScoreToReach(newValue);
    },
    localNumberOfPlayer(newValue) {
      this.changeNumberOfPlayer(newValue);
    },

    rooms(newValue) {
      const arrayOfNewRoom = newValue.filter(
        (room) => room.players[0].socketId === this.socketId
      );

      if (arrayOfNewRoom.length !== 1) return;

      this.redirectAfterCreateRoom();
    },
  },

  mounted() {
    this.emitGetRooms();
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

    createRoom() {
      this.changeSocketId(socketioService.socket.id);
      this.changeGame(this.selectedGame);
      this.changeHost(true);
      this.changeTurn(true);
      this.changeIsWinner(false);

      this.saveRoomsBeforeRedirect = this.availableRooms;

      this.emitCreateOrJoinRoom();
    },

    redirectAfterCreateRoom() {
      const roomId = this.rooms.at(-1).id;

      this.changeRoomId(roomId);

      this.$router.push({
        name: "Room",
        query: { id: roomId, game: this.selectedGame },
      });
    },

    joinRoom(room) {
      this.$router.push({
        name: "Room",
        query: { id: room.id, game: room.game },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.home-without-nav {
  height: 100vh;
}
.home {
  margin-top: 64px;
  height: calc(100vh - 128px);
}

.room-card,
.create-room-card {
  display: flex;
  justify-content: center;
}
.room-card {
  margin-top: 15px;
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
  .home {
    margin-top: 20px;
    height: calc(100vh - 84px);
  }
  .room-card {
    margin-top: 10px;
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
