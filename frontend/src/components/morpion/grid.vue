<template>
  <div>
    <n-collapse-transition :show="displayGrid" appear>
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
      </table>
    </n-collapse-transition>

    <n-collapse-transition :show="!displayGrid">
      <div class="test">
        <n-h2 v-if="equality">Egalité</n-h2>
        <n-h2 v-else-if="win">Victoire</n-h2>
        <n-h2 v-else-if="loose">Défaite</n-h2>
        <n-button @click="replay()">Rejouer ?</n-button>
        <!-- <n-button @click="removeMessage()">Rejouer</n-button> -->
      </div>
    </n-collapse-transition>
  </div>
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
      displayGrid: true,
      loadingMessage: null,
      infoMessage: null,

      equality: false,
      loose: false,
    };
  },

  computed: {
    ...mapState("player", [
      "turn",
      "socketId",
      "win",
      "playedCell",
      "symbol",
      "enemyPlayer",
    ]),
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

        if (this.checkEquality()) return;
        if (this.checkLoose()) return;

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
      "changeWin",
      "emitPlay",
      "listenPlay",
    ]),

    createLoadingMessage() {
      if (this.loadingMessage) return;

      this.loadingMessage = window.$message.loading(
        "L'adversaire prépare son coup",
        {
          duration: 0,
        }
      );
    },

    createInfoMessage() {
      if (this.infoMessage) return;

      this.infoMessage = window.$message.info("A toi de jouer", {
        duration: 0,
      });
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

      this.grid_content[x][y] = "X";
      this.changePlayedCell([x, y]);

      this.checkWin();

      this.changeTurn(false);
      this.emitPlay();

      if (this.checkEquality()) return;
      if (this.win) return;

      this.createLoadingMessage();
    },

    checkEquality() {
      for (const x of this.grid_content) {
        for (const y of x) {
          if (y === "") return false;
        }
      }

      this.displayGrid = false;
      this.equality = true;

      return true;
    },

    checkLoose() {
      if (!this.enemyPlayer.win) return false;

      this.loose = true;
      this.displayGrid = false;

      return true;
    },

    checkWin() {
      if (this.enemyPlayer.length === 0) return;
      if (
        !this.checkWinHorizontal() &&
        !this.checkWinVertical() &&
        !this.checkWinDiagonalBack() &&
        !this.checkWinDiagonalForward()
      )
        return;

      this.displayGrid = false;
      this.changeWin(true);
    },

    checkWinHorizontal() {
      let row = this.playedCell[0];

      for (let y = 0; y < 3; y++) {
        if (this.grid_content[row][y] !== this.symbol) return false;
      }

      return true;
    },

    checkWinVertical() {
      let column = this.playedCell[1];

      for (let x = 0; x < 3; x++) {
        if (this.grid_content[x][column] !== this.symbol) return false;
      }

      return true;
    },

    checkWinDiagonalBack() {
      // * - -
      // - * -
      // - - *

      for (let i = 0; i < 3; i++) {
        if (this.grid_content[i][i] !== this.symbol) return false;
      }

      return true;
    },

    checkWinDiagonalForward() {
      // - - *
      // - * -
      // * - -

      for (let x = 0; x < 3; x++) {
        let y = 2 - x;

        if (this.grid_content[x][y] !== this.symbol) return false;
      }

      return true;
    },

    replay() {
      this.grid_content = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      this.equality = false;
      this.loose = false;
      this.displayGrid = true;

      this.changeWin(false);
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

.test {
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>