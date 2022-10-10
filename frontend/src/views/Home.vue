<template>
  <n-collapse-transition class="rooms" :show="!loadingCreatingRoom">
    <n-h1>Playground</n-h1>

    <div class="username-card">
      <n-card title="Nom d'utilisateur">
        <n-input-group>
          <n-input
            v-model:value="tempUsername"
            ref="usernameInput"
            type="text"
            placeholder="ex: Toto"
            :disabled="lockUsernameInput"
            size="large"
          />
          <n-button
            :type="!lockUsernameInput ? 'primary' : ''"
            @click="chooseUsername()"
            :disabled="tempUsername === ''"
            size="large"
          >
            {{ !lockUsernameInput ? "Choisir" : "Modifier" }}
          </n-button>
        </n-input-group>
      </n-card>
    </div>

    <n-collapse-transition :show="lockUsernameInput">
      <div class="create-room-card">
        <n-card>
          <n-form>
            <n-form-item label="Jeu">
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
            <n-form inline>
              <n-form-item label="Nombre de joueur">
                <n-input-number
                  v-model:value="roomNumberOfPlayer"
                  :min="2"
                  :max="5"
                  :disabled="true"
                />
              </n-form-item>
              <n-form-item label="Score à atteindre">
                <n-input-number
                  v-model:value="roomScoreToReach"
                  :min="1"
                  :max="10"
                />
              </n-form-item>
            </n-form>
          </n-collapse-transition>

          <n-button
            @click="createRoom()"
            :disabled="!lockUsernameInput || !selectedGame"
          >
            Créer un salon
          </n-button>
        </n-card>
      </div>

      <div class="room-card">
        <n-card title="Liste des salons disponibles">
          <n-space vertical :size="12">
            <div v-if="availableRooms.length !== 0">
              <n-list bordered>
                <n-list-item v-for="(room, key) in availableRooms" :key="key">
                  <template #prefix>
                    <n-tag :bordered="false" type="success">
                      {{ room.players[0].game }}
                    </n-tag>
                  </template>

                  <n-space justify="space-between">
                    <span>
                      by
                      <i>
                        {{ room.players[0].username }}
                      </i>
                    </span>
                    <n-text depth="3">{{ room.id }}</n-text>
                  </n-space>

                  <template #suffix>
                    <n-button @click="joinRoom(room)">Rejoindre</n-button>
                  </template>
                </n-list-item>
              </n-list>
            </div>
            <div v-else>
              <n-list bordered>
                <n-list-item>
                  <n-space justify="center" class="no-room">
                    Aucun salon disponible
                  </n-space>
                </n-list-item>
              </n-list>
            </div>
          </n-space>
        </n-card>
      </div>
    </n-collapse-transition>
  </n-collapse-transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
import socketioService from "../services/socketio.service";
import title from "@/mixins/title.js";

export default {
  name: "Home",
  title: "Playground",
  mixins: [title],

  data() {
    return {
      tempUsername: "",
      lockUsernameInput: false,
      selectedGame: null,
      gamesAvailable: [
        { label: "Morpion", value: "Morpion" },
        {
          label: "Pierre-papier-ciseaux",
          value: "Pierre-papier-ciseaux",
        },
      ],
      loadingCreatingRoom: false,

      // game options (rock-paper-scissors)
      roomNumberOfPlayer: 2,
      roomScoreToReach: 1,
    };
  },

  computed: {
    ...mapState("player", ["username"]),
    ...mapState("room", ["rooms"]),
    ...mapState("game", ["game"]),

    availableRooms() {
      return this.rooms.filter((r) => r.players.length < 2);
    },
  },

  watch: {
    roomScoreToReach(newValue) {
      this.changeScoreToReach(newValue);
    },
    roomNumberOfPlayer(newValue) {
      this.changeNumberOfPlayer(newValue);
    },
  },

  mounted() {
    if (this.game !== "") this.emitLeaveRoom();

    this.resetEnemyData();
    this.changeOutcome("");
    this.changeGame("");
    this.changeRoomId("");

    this.emitGetRooms();

    if (this.username === "") {
      this.$refs.usernameInput.focus();
      return;
    }

    this.tempUsername = this.username;
    this.chooseUsername();
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
      "emitCreateOrJoinRoom",
    ]),
    ...mapActions("room", ["emitGetRooms", "emitLeaveRoom"]),
    ...mapActions("game", [
      "resetEnemyData",
      "changeGame",
      "changeScoreToReach",
      "changeNumberOfPlayer",
    ]),

    chooseUsername() {
      this.lockUsernameInput = !this.lockUsernameInput;

      this.changeUsername(this.tempUsername);
    },

    createRoom() {
      if (this.loadingCreatingRoom) return;

      this.loadingCreatingRoom = true;

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
  },
};
</script>

<style lang="less" scoped>
.n-h1 {
  font-size: 2.5em;
  padding-bottom: 20px;
}
.username-card,
.room-card,
.create-room-card {
  display: flex;
  justify-content: center;
}
.username-card {
  padding-bottom: 25px;
}
.room-card,
.create-room-card {
  padding-top: 15px;
}
.n-card {
  max-width: 600px;
}
.no-room {
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
