<template>
  <div class="rooms">
    <n-h1>Playground</n-h1>

    <div class="username-card">
      <n-card title="Nom d'utilisateur">
        <n-input-group>
          <n-input
            v-model:value="tempUsername"
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
            <div v-if="rooms.length !== 0">
              <n-list bordered>
                <n-list-item v-for="(room, key) in rooms" :key="key">
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
                    <router-link
                      :to="`${room.players[0].game.toLowerCase()}?room=${
                        room.id
                      }`"
                    >
                      <n-button>Rejoindre</n-button>
                    </router-link>
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Morpion",

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
    };
  },

  computed: {
    ...mapState("player", ["username"]),
    ...mapState("room", ["rooms"]),
  },

  mounted() {
    this.emitRooms();
    this.listenRooms();

    if (this.username === "") return;

    this.tempUsername = this.username;
    this.validUsername();
  },

  methods: {
    ...mapActions("player", ["changeUsername", "changeGame", "emitPlayerData"]),
    ...mapActions("room", ["emitRooms", "listenRooms"]),

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
      this.changeGame("Morpion");

      this.emitPlayerData();

      // to improve
      setTimeout(() => {
        this.$router.push({
          name: this.selectedGame,
          query: { room: this.rooms.at(-1).id },
        });
      }, 1);
    },

    joinRoom() {
      this.changeGame("Morpion");

      this.emitPlayerData();

      setTimeout(() => {
        this.$router.push({
          name: this.selectedGame,
          query: { room: this.rooms[0].id },
        });
      }, 1);

      this.$router.push({
        name: this.selectedGame,
        // params: { id: this.rooms.at(-1).id },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.n-h1 {
  text-align: center;
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
