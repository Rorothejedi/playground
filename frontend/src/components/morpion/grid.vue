<template>
  <div>
    <n-collapse-transition :show="displayGrid" appear>
      <table cellspacing="0" cellpadding="0">
        <tbody>
          <tr class="case-h case-v">
            <td
              class="cell h-1 w-1"
              :class="{
                'h-0-0': lineHorizontalTop,
                'v-0-0': lineVerticalLeft,
                'db-0-0': lineDiagonalBack,
              }"
              @click="placeItem(0, 0)"
            >
              <span class="circle" v-if="grid_content[0][0] === 'O'"></span>
              <span class="cross" v-if="grid_content[0][0] === 'X'"></span>
            </td>
            <td
              class="cell h-1 w-2"
              :class="{
                'h-0-1': lineHorizontalTop,
                'v-0-1': lineVerticalCenter,
              }"
              @click="placeItem(0, 1)"
            >
              <span class="circle" v-if="grid_content[0][1] === 'O'"></span>
              <span class="cross" v-if="grid_content[0][1] === 'X'"></span>
            </td>
            <td
              class="cell h-1 w-3"
              :class="{
                'h-0-2': lineHorizontalTop,
                'v-0-2': lineVerticalRight,
                'df-0-2': lineDiagonalForward,
              }"
              @click="placeItem(0, 2)"
            >
              <span class="circle" v-if="grid_content[0][2] === 'O'"></span>
              <span class="cross" v-if="grid_content[0][2] === 'X'"></span>
            </td>
          </tr>

          <tr class="case-h case-v">
            <td
              class="cell h-2 w-1"
              :class="{
                'h-1-0': lineHorizontalCenter,
                'v-1-0': lineVerticalLeft,
              }"
              @click="placeItem(1, 0)"
            >
              <span class="circle" v-if="grid_content[1][0] === 'O'"></span>
              <span class="cross" v-if="grid_content[1][0] === 'X'"></span>
            </td>
            <td
              class="cell h-2 w-2"
              :class="{
                'h-1-1': lineHorizontalCenter,
                'v-1-1': lineVerticalCenter,
                'db-1-1': lineDiagonalBack,
                'df-1-1': lineDiagonalForward,
              }"
              @click="placeItem(1, 1)"
            >
              <span class="circle" v-if="grid_content[1][1] === 'O'"></span>
              <span class="cross" v-if="grid_content[1][1] === 'X'"></span>
            </td>
            <td
              class="cell h-2 w-3"
              :class="{
                'h-1-2': lineHorizontalCenter,
                'v-1-2': lineVerticalRight,
              }"
              @click="placeItem(1, 2)"
            >
              <span class="circle" v-if="grid_content[1][2] === 'O'"></span>
              <span class="cross" v-if="grid_content[1][2] === 'X'"></span>
            </td>
          </tr>

          <tr class="case-h case-v">
            <td
              class="cell h-3 w-1"
              :class="{
                'h-2-0': lineHorizontalBottom,
                'v-2-0': lineVerticalLeft,
                'df-2-0': lineDiagonalForward,
              }"
              @click="placeItem(2, 0)"
            >
              <span class="circle" v-if="grid_content[2][0] === 'O'"></span>
              <span class="cross" v-if="grid_content[2][0] === 'X'"></span>
            </td>
            <td
              class="cell h-3 w-2"
              :class="{
                'h-2-1': lineHorizontalBottom,
                'v-2-1': lineVerticalCenter,
              }"
              @click="placeItem(2, 1)"
            >
              <span class="circle" v-if="grid_content[2][1] === 'O'"></span>
              <span class="cross" v-if="grid_content[2][1] === 'X'"></span>
            </td>
            <td
              class="cell h-3 w-3"
              :class="{
                'h-2-2': lineHorizontalBottom,
                'v-2-2': lineVerticalRight,
                'db-2-2': lineDiagonalBack,
              }"
              @click="placeItem(2, 2)"
            >
              <span class="circle" v-if="grid_content[2][2] === 'O'"></span>
              <span class="cross" v-if="grid_content[2][2] === 'X'"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </n-collapse-transition>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import utils from "@/mixins/utils";

export default {
  name: "grid",
  mixins: [utils],

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
      endLineColor: "#63e2b7",
      lineHorizontalTop: false,
      lineHorizontalCenter: false,
      lineHorizontalBottom: false,
      lineVerticalLeft: false,
      lineVerticalCenter: false,
      lineVerticalRight: false,
      lineDiagonalBack: false,
      lineDiagonalForward: false,
    };
  },

  computed: {
    ...mapState("player", [
      "host",
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
      this.placeEnemyItem();
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
      "changeOutcome",
      "changeVictoryWay",
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

      if (this.win) return;
      if (this.checkEquality()) return;

      this.createLoadingMessage();
    },

    placeEnemyItem() {
      if (this.socketId === this.enemyPlayer.socketId) return;
      if (this.enemyPlayer.turn) return;

      this.removeMessage();

      let cell = this.enemyPlayer.playedCell;
      this.grid_content[cell[0]][cell[1]] = "O";

      if (this.checkDefeat()) return;
      if (this.checkEquality()) return;

      this.changeTurn(true);
      this.createInfoMessage();
    },

    checkEquality() {
      for (const x of this.grid_content) {
        for (const y of x) {
          if (y === "") return false;
        }
      }

      this.gameOver("equality");

      return true;
    },

    checkDefeat() {
      if (!this.enemyPlayer.win) return false;

      this.endLineColor = "#e88080";
      this.addLine(this.enemyPlayer.victoryWay);
      this.gameOver("defeat");

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

      this.changeWin(true);
      this.gameOver("win");
    },

    checkWinHorizontal() {
      let row = this.playedCell[0];

      for (let y = 0; y < 3; y++) {
        if (this.grid_content[row][y] !== this.symbol) return false;
      }

      if (row === 0) this.addLine("h-t");
      if (row === 1) this.addLine("h-c");
      if (row === 2) this.addLine("h-b");

      return true;
    },

    checkWinVertical() {
      let column = this.playedCell[1];

      for (let x = 0; x < 3; x++) {
        if (this.grid_content[x][column] !== this.symbol) return false;
      }

      if (column === 0) this.addLine("v-l");
      if (column === 1) this.addLine("v-c");
      if (column === 2) this.addLine("v-r");

      return true;
    },

    checkWinDiagonalBack() {
      // * - -
      // - * -
      // - - *

      for (let i = 0; i < 3; i++) {
        if (this.grid_content[i][i] !== this.symbol) return false;
      }

      this.addLine("d-b");

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

      this.addLine("d-f");

      return true;
    },

    async gameOver(way) {
      if (way !== "equality") await this.sleep(2000);
      else await this.sleep(1000);
      this.displayGrid = false;
      this.endLineColor = "#63e2b7";
      this.changeOutcome(way);
    },

    addLine(type) {
      if (type === "h-t") this.lineHorizontalTop = !this.lineHorizontalTop;
      if (type === "h-c")
        this.lineHorizontalCenter = !this.lineHorizontalCenter;
      if (type === "h-b")
        this.lineHorizontalBottom = !this.lineHorizontalBottom;
      if (type === "v-l") this.lineVerticalLeft = !this.lineVerticalLeft;
      if (type === "v-c") this.lineVerticalCenter = !this.lineVerticalCenter;
      if (type === "v-r") this.lineVerticalRight = !this.lineVerticalRight;
      if (type === "d-b") this.lineDiagonalBack = !this.lineDiagonalBack;
      if (type === "d-f") this.lineDiagonalForward = !this.lineDiagonalForward;

      this.changeVictoryWay(type);
    },
  },
};
</script>

<style lang="less" scoped>
table {
  z-index: 3;
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
  position: relative;
}

.h-1 {
  border-bottom: #ffffffd1 4px solid;
}
.h-2 {
  border-top: #ffffffd1 4px solid;
  border-bottom: #ffffffd1 4px solid;
}
.h-3 {
  border-top: #ffffffd1 4px solid;
}
.w-1 {
  border-right: #ffffffd1 4px solid;
}
.w-2 {
  border-left: #ffffffd1 4px solid;
  border-right: #ffffffd1 4px solid;
}
.w-3 {
  border-left: #ffffffd1 4px solid;
}

// CIRCLE

.circle:before {
  z-index: 1;
  content: " ";
  position: absolute;
  left: calc(25% - 3px);
  top: calc(25% - 3px);
  width: 60px;
  height: 60px;
  border: 10px solid #e88080;
  border-radius: 100%;
  opacity: 1;
  animation: circle-appear 0.3s ease;
}

@keyframes circle-appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

// CROSS

.cross:before,
.cross:after {
  z-index: 1;
  content: " ";
  position: absolute;
  top: 28px;
  left: 70px;
  height: 95px;
  width: 10px;
  background-color: #63e2b7;
}
.cross:before {
  transform: rotate(45deg);
  animation: cross-appear 0.3s ease;
}
.cross:after {
  transform: rotate(-45deg);
  animation: cross-appear 0.3s ease;
}

@keyframes cross-appear {
  0% {
    height: 0;
    top: 75px;
  }
  100% {
    height: 95px;
    top: 28px;
  }
}

// HORIZONTAL AND VERTICAL CASES

.h-0-0:before,
.h-0-1:before,
.h-0-2:before,
.h-1-0:before,
.h-1-1:before,
.h-1-2:before,
.h-2-0:before,
.h-2-1:before,
.h-2-2:before {
  z-index: 2;
  content: " ";
  position: absolute;
  left: -15px;
  top: calc(50% - 5px);
  width: 180px;
  border-bottom: 10px solid;
  border-bottom-color: v-bind(endLineColor);
}

.v-0-0:before,
.v-1-0:before,
.v-2-0:before,
.v-0-1:before,
.v-1-1:before,
.v-2-1:before,
.v-0-2:before,
.v-1-2:before,
.v-2-2:before {
  z-index: 2;
  content: " ";
  position: absolute;
  left: calc(50% + 5px);
  top: -15px;
  width: 180px;
  border-bottom: 10px solid;
  border-bottom-color: v-bind(endLineColor);
  transform: rotate(90deg);
  transform-origin: top left;
}

.h-0-0:before,
.h-1-0:before,
.h-2-0:before,
.v-0-0:before,
.v-0-1:before,
.v-0-2:before {
  animation: line 0.1s linear;
}
.h-0-1:before,
.h-1-1:before,
.h-2-1:before,
.v-1-0:before,
.v-1-1:before,
.v-1-2:before {
  animation: line 0.1s linear 0.1s both;
}
.h-0-2:before,
.h-1-2:before,
.h-2-2:before,
.v-2-0:before,
.v-2-1:before,
.v-2-2:before {
  animation: line 0.1s linear 0.2s both;
}

@keyframes line {
  0% {
    width: 0px;
  }
  100% {
    width: 180px;
  }
}

//  DIAGONAL CASES

.db-0-0:before,
.db-1-1:before,
.db-2-2:before,
.df-0-2:before,
.df-1-1:before,
.df-2-0:before {
  z-index: 2;
  content: " ";
  position: absolute;
  top: -5px;
  width: 149%;
  border-bottom: 10px solid;
  border-bottom-color: v-bind(endLineColor);
}

.db-0-0:before,
.db-1-1:before,
.db-2-2:before {
  left: 2px;
  transform: rotate(45deg);
  transform-origin: top left;
}

.df-0-2:before,
.df-1-1:before,
.df-2-0:before {
  right: 2px;
  transform: rotate(-45deg);
  transform-origin: top right;
}

.db-0-0:before,
.df-0-2:before {
  animation: diagonal-line 0.1s linear;
}
.db-1-1:before,
.df-1-1:before {
  animation: diagonal-line 0.1s linear 0.1s both;
}
.db-2-2:before,
.df-2-0:before {
  animation: diagonal-line 0.1s linear 0.2s both;
}

@keyframes diagonal-line {
  0% {
    width: 0%;
  }
  100% {
    width: 149%;
  }
}

// RESPONSIVE

@media screen and (max-width: 500px) {
  td {
    height: 100px;
    width: 100px;
  }

  // CIRCLE

  .circle:before {
    left: calc(15% - 3px);
    top: calc(15% - 3px);
    width: 50px;
    height: 50px;
  }

  // CROSS

  .cross:before,
  .cross:after {
    top: 8px;
    left: 45px;
    height: 85px;
  }

  @keyframes cross-appear {
    0% {
      height: 0;
      top: 50px;
    }
    100% {
      height: 85px;
      top: 8px;
    }
  }

  // HORIZONTAL AND VERTICAL CASES

  .h-0-0:before,
  .h-0-1:before,
  .h-0-2:before,
  .h-1-0:before,
  .h-1-1:before,
  .h-1-2:before,
  .h-2-0:before,
  .h-2-1:before,
  .h-2-2:before {
    width: 110px;
    left: -5px;
  }

  .v-0-0:before,
  .v-1-0:before,
  .v-2-0:before,
  .v-0-1:before,
  .v-1-1:before,
  .v-2-1:before,
  .v-0-2:before,
  .v-1-2:before,
  .v-2-2:before {
    width: 110px;
    top: -5px;
  }

  @keyframes line {
    0% {
      width: 0px;
    }
    100% {
      width: 110px;
    }
  }

  //  DIAGONAL CASES

  .db-0-0:before,
  .db-1-1:before,
  .db-2-2:before,
  .df-0-2:before,
  .df-1-1:before,
  .df-2-0:before {
    width: 153%;
  }

  @keyframes diagonal-line {
    0% {
      width: 0%;
    }
    100% {
      width: 153%;
    }
  }
}
</style>