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
          />
          <n-button
            :type="!lockUsernameInput ? 'primary' : ''"
            @click="chooseUsername()"
            :disabled="tempUsername === ''"
          >
            {{ !lockUsernameInput ? "Choisir" : "Modifier" }}
          </n-button>
        </n-input-group>
      </n-card>
    </div>

    <n-collapse-transition :show="lockUsernameInput">
      <div class="create-room-card">
        <n-card>
          <n-space justify="space-between" size="small">
            <n-select
              v-model:value="selectedGame"
              filterable
              placeholder="Choisi un jeu"
              :options="gamesAvailable"
            />

            <n-button
              @click="createRoom()"
              :disabled="!lockUsernameInput || !selectedGame"
            >
              Créer un salon
            </n-button>
          </n-space>
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

export default {
  name: "Rooms",

  data() {
    return {
      tempUsername: "",
      lockUsernameInput: false,
      selectedGame: null,
      gamesAvailable: [
        { label: "Morpion", value: "Morpion" },
        { label: "Skyjo", value: "Skyjo" },
        { label: "President", value: "President" },
      ],
      loadingCreatingRoom: false,
    };
  },

  computed: {
    ...mapState("player", ["username", "game"]),
    ...mapState("room", ["rooms"]),

    availableRooms() {
      return this.rooms.filter((r) => r.players.length < 2);
    },
  },

  mounted() {
    if (this.game !== "") this.changeGame("");
    this.changeRoomId("");
    this.changeRoomPlayers([]);

    this.emitRooms();

    if (this.username === "") {
      this.$refs.usernameInput.focus();
      return;
    }

    this.tempUsername = this.username;
    this.validUsername();
  },

  methods: {
    ...mapActions("player", [
      "changeUsername",
      "changeGame",
      "changeHost",
      "changeRoomId",
      "changeSocketId",
      "changeTurn",
      "changeWin",
      "emitPlayerData",
    ]),
    ...mapActions("room", ["emitRooms", "changeRoomPlayers"]),

    validUsername() {
      this.lockUsernameInput = !this.lockUsernameInput;

      this.changeUsername(this.tempUsername);
    },

    welcome() {
      if (!this.lockUsernameInput) return;

      window.$message.success(
        `Yo ${this.username}, tu peux maintenant créer ou rejoindre un salon !`
      );
    },

    chooseUsername() {
      this.validUsername();
      this.welcome();
    },

    createRoom() {
      if (this.loadingCreatingRoom) return;

      this.loadingCreatingRoom = true;

      this.changeGame(this.selectedGame);
      this.changeHost(true);
      this.changeTurn(true);
      this.changeWin(false);
      this.changeSocketId(socketioService.socket.id);

      this.emitPlayerData();

      window.$loading.start();
      window.$message.loading(`Salon en cours de création...`, {
        duration: 2000,
      });

      setTimeout(() => {
        this.$router.push({
          name: this.selectedGame,
          query: { room: this.rooms.at(-1).id },
        });

        window.$loading.finish();
      }, 2000);
    },

    joinRoom(room) {
      this.changeGame(room.players[0].game);
      this.changeRoomId(room.id);
      this.changeTurn(false);
      this.changeWin(false);
      this.changeSocketId(socketioService.socket.id);

      this.emitPlayerData();

      this.$router.push({
        name: room.players[0].game,
        query: { room: room.id },
      });
    },
  },
};
</script>

<style lang="less" scoped>
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
