<template>
  <div class="morpion">
    <n-h1>Morpion</n-h1>

    <div v-if="!isReady">
      <div class="username-card">
        <n-card>
          <n-form-item label="Nom d'utilisateur">
            <n-input
              v-model:value="username"
              type="text"
              placeholder="ex: Toto"
            />
          </n-form-item>

          <n-button @click="isReady = true">Créer un salon privé</n-button>
        </n-card>
      </div>

      <div class="room-card">
        <n-card>
          <n-h3>Salons</n-h3>
          <n-data-table :columns="columns" :data="data" :loading="false">
            <template v-slot:empty>Aucun salon dispo</template>
          </n-data-table>
        </n-card>
      </div>

      <div class="info-alert">
        <n-alert type="success">
          Partage ce lien pour inviter quelqu'un à jouer avec toi
        </n-alert>
      </div>
    </div>
    <div v-else>
      <grid />
    </div>
  </div>
</template>

<script>
import { h, ref } from "vue";
import { NTag, NButton } from "naive-ui";
import grid from "@/components/morpion/grid.vue";

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
  components: { grid },

  data() {
    return {
      isReady: false,
      username: "",
      data: ref([]),
      columns: createColumns(),
    };
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
  min-width: 500px;
}
</style>
