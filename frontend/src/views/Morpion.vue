<template>
  <div class="morpion">
    <n-h1>Morpion</n-h1>

    <div v-if="!isReady">
      <n-collapse-transition class="username-card" :show="displayUsernameCard">
        <n-card>
          <n-form-item label="Nom d'utilisateur">
            <n-input-group>
              <n-input
                v-model:value="tempUsername"
                type="text"
                placeholder="ex: Toto"
                :disabled="lockUsernameInput"
              />
              <n-button
                :type="lockUsernameInput ? 'primary' : ''"
                @click="chooseUsername()"
                :disabled="tempUsername === ''"
              >
                {{ !lockUsernameInput ? "Choisir" : "Modifier" }}
              </n-button>
            </n-input-group>
          </n-form-item>
        </n-card>
      </n-collapse-transition>

      <div class="room-card">
        <n-card>
          <n-space vertical>
            <n-button
              @click="createMorpionRoom()"
              :disabled="!lockUsernameInput || waitingPlayers"
            >
              Créer un salon
            </n-button>

            <n-data-table
              :columns="columns"
              :data="dataColumn"
              :loading="waitingPlayers"
            >
              <template v-slot:empty>Aucun salon dispo</template>
            </n-data-table>
          </n-space>
        </n-card>
      </div>

      <!-- <div class="info-alert">
        <n-alert type="success">
          Partage ce lien pour inviter quelqu'un à jouer avec toi
        </n-alert>
      </div> -->
    </div>
    <div v-else>
      <grid />
    </div>
    <n-button @click="isReady = !isReady">
      {{ !isReady ? "Ready" : "Not ready" }}
    </n-button>
  </div>
</template>

<script>
import { h } from "vue";
import { NButton, NTag } from "naive-ui";
import { mapState, mapActions } from "vuex";
import Grid from "@/components/morpion/Grid.vue";

const createColumns = () => {
  return [
    {
      title: "Jeu",
      key: "tags",
      render(row) {
        const tags = row.tags.map((tagKey) => {
          return h(
            NTag,
            {
              style: {
                marginRight: "6px",
              },
              type: "info",
              bordered: false,
            },
            {
              default: () => tagKey,
            }
          );
        });
        return tags;
      },
    },
    {
      title: "Créateur",
      key: "creator",
    },
    {
      title: "",
      key: "action",
      align: "center",
      render() {
        return h(
          NButton,
          {
            size: "small",
            onClick: () => alert("lauch game"),
          },
          { default: () => "Rejoindre" }
        );
      },
    },
  ];
};

export default {
  name: "Morpion",
  components: { Grid },

  data() {
    return {
      isReady: false,
      tempUsername: "",
      lockUsernameInput: false,
      displayUsernameCard: true,
      waitingPlayers: false,
      columns: createColumns(),
    };
  },

  computed: {
    ...mapState("player", ["username"]),
    ...mapState("room", ["rooms"]),

    dataColumn() {
      console.log("dataColumn");

      let columns = [];

      this.rooms.forEach((element) => {
        let column = {};
        column.creator = element.players[0].username;
        column.tags = [element.players[0].game];
        columns.push(column);
      });

      return columns;
    },
  },

  mounted() {
    this.emitRooms();
    this.listenRooms();

    if (this.username === "") return;

    this.tempUsername = this.username;
    this.chooseUsername();
  },

  methods: {
    ...mapActions("player", ["changeUsername", "changeGame", "createRoom"]),
    ...mapActions("room", ["emitRooms", "listenRooms"]),

    chooseUsername() {
      this.lockUsernameInput = !this.lockUsernameInput;

      this.changeUsername(this.tempUsername);

      if (!this.lockUsernameInput) return;

      window.$message.success(
        `Yo ${this.username}, tu peux maintenant créer ou rejoindre un salon !`
      );
    },

    createMorpionRoom() {
      this.changeGame("Morpion");
      this.createRoom();
      this.listenRooms();

      this.displayUsernameCard = false;
      this.waitingPlayers = true;
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
.info-alert {
  display: flex;
  justify-content: center;
}
.room-card,
.info-alert {
  padding-top: 15px;
}
.n-card {
  max-width: 500px;
}
.n-alert {
  width: 500px;
}
</style>
