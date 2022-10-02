<template>
  <table cellspacing="0" cellpadding="0">
    <tbody>
      <tr>
        <td class="cell h-1 w-1" @click="placeItem(0, 0)">
          {{ grid_content[0][0] }}
        </td>
        <td class="cell h-1 w-2" @click="placeItem(0, 1)">
          {{ grid_content[0][1] }}
        </td>
        <td class="cell h-1 w-3" @click="placeItem(0, 2)">
          {{ grid_content[0][2] }}
        </td>
      </tr>
      <tr>
        <td class="cell h-2 w-1" @click="placeItem(1, 0)">
          {{ grid_content[1][0] }}
        </td>
        <td class="cell h-2 w-2" @click="placeItem(1, 1)">
          {{ grid_content[1][1] }}
        </td>
        <td class="cell h-2 w-3" @click="placeItem(1, 2)">
          {{ grid_content[1][2] }}
        </td>
      </tr>
      <tr>
        <td class="cell h-3 w-1" @click="placeItem(2, 0)">
          {{ grid_content[2][0] }}
        </td>
        <td class="cell h-3 w-2" @click="placeItem(2, 1)">
          {{ grid_content[2][1] }}
        </td>
        <td class="cell h-3 w-3" @click="placeItem(2, 2)">
          {{ grid_content[2][2] }}
        </td>
      </tr>
    </tbody>
    <!-- <n-button @click="createMessage()">create</n-button> -->
    <!-- <n-button @click="removeMessage()">destroy</n-button> -->
  </table>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "grid",

  data() {
    return {
      grid_content: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      loadingMessage: null,
      infoMessage: null,
    };
  },

  computed: {
    ...mapState("player", ["turn", "socketId", "enemyPlayer"]),
  },

  watch: {
    enemyPlayer() {
      if (
        this.socketId !== this.enemyPlayer.socketId &&
        !this.enemyPlayer.turn
      ) {
        this.removeMessage();

        let cell = this.enemyPlayer.playedCell;

        this.grid_content[cell[0]][cell[1]] = "O";
        this.changeTurn(true);

        this.createInfoMessage();
      }
    },
  },

  mounted() {
    this.listenPlay();

    if (this.turn) {
      this.createInfoMessage();
    } else {
      this.createLoadingMessage();
    }
  },

  beforeUnmount() {
    this.removeMessage();
  },

  methods: {
    ...mapActions("player", [
      "changePlayedCell",
      "changeTurn",
      "emitPlay",
      "listenPlay",
    ]),

    createLoadingMessage() {
      if (!this.loadingMessage) {
        this.loadingMessage = window.$message.loading(
          "L'adversaire prépare son coup",
          {
            duration: 0,
          }
        );
      }
    },

    createInfoMessage() {
      if (!this.infoMessage) {
        this.infoMessage = window.$message.info("A toi de jouer", {
          duration: 0,
        });
      }
    },

    removeMessage() {
      if (this.loadingMessage) {
        this.loadingMessage.destroy();
        this.loadingMessage = null;
      }
      if (this.infoMessage) {
        this.infoMessage.destroy();
        this.infoMessage = null;
      }
    },

    placeItem(x, y) {
      if (!this.turn) return;
      if (this.grid_content[x][y] !== "") return;

      this.removeMessage();
      this.createLoadingMessage();

      this.grid_content[x][y] = "X";

      this.changePlayedCell([x, y]);
      this.changeTurn(false);

      this.emitPlay();
    },
  },
};
</script>

<style lang="less" scoped>
table {
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
td {
  height: 150px;
  text-align: center;
  vertical-align: middle;
  width: 150px;
}

.h-1 {
  border-bottom: #63e2b7 2px solid;
}
.h-2 {
  border-top: #63e2b7 2px solid;
  border-bottom: #63e2b7 2px solid;
}
.h-3 {
  border-top: #63e2b7 2px solid;
}
.w-1 {
  border-right: #63e2b7 2px solid;
}
.w-2 {
  border-left: #63e2b7 2px solid;
  border-right: #63e2b7 2px solid;
}
.w-3 {
  border-left: #63e2b7 2px solid;
}
</style>