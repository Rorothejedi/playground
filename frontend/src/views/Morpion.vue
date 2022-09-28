<template>
  <div class="morpion">
    <n-h1>Morpion</n-h1>

    <div v-if="!isReady">
      <div class="username-card">
        <n-card>
          <n-form-item label="Nom d'utilisateur">
            <n-input-group>
              <n-input
                v-model:value="local_username"
                type="text"
                placeholder="ex: Toto"
                :disabled="lockUsernameInput"
              />
              <n-button
                :type="lockUsernameInput ? 'primary' : ''"
                @click="chooseUsername()"
                :disabled="local_username === ''"
              >
                {{ !lockUsernameInput ? "Choisir" : "Modifier" }}
              </n-button>
            </n-input-group>
          </n-form-item>
        </n-card>
      </div>

      <div class="room-card">
        <n-card>
          <n-space vertical>
            <n-button @click="isReady = true" :disabled="!lockUsernameInput">
              Créer un salon
            </n-button>

            <n-data-table :columns="columns" :data="data" :loading="false">
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
  </div>
</template>

<script>
import { h, ref } from "vue";
import { NTag, NButton } from "naive-ui";
import { mapState, mapActions } from "vuex";
import Grid from "@/components/morpion/Grid.vue";

const createColumns = () => {
  return [
    {
      title: "Créateur",
      key: "creator",
    },
    {
      title: "ID",
      key: "id",
    },
    {
      title: "Type de jeu",
      key: "game",
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
      title: "",
      key: "action",
      render() {
        return h(
          NButton,
          {
            size: "small",
            onClick: () => alert("lauch game"),
          },
          { default: () => "Send Email" }
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
      local_username: "",
      lockUsernameInput: false,
      data: ref([]),
      columns: createColumns(),
    };
  },

  computed: {
    ...mapState("user", ["username"]),
  },

  mounted() {
    this.local_username = this.username;
    this.chooseUsername();
  },

  methods: {
    ...mapActions("user", ["changeUsername"]),

    chooseUsername() {
      this.lockUsernameInput = !this.lockUsernameInput;

      this.changeUsername(this.local_username);

      if (!this.lockUsernameInput) return;

      window.$message.success(
        `Hello ${this.local_username}, tu peux maintenant créer ou rejoindre un salon`
      );
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
