<template>
  <div class="morpion">
    <table cellspacing="0" cellpadding="0">
      <tbody>
        <tr v-for="(x, i) in gridContent" :key="i">
          <td
            v-for="(y, j) in x"
            :key="j"
            :class="[
              `h-${i} w-${j}`,
              {
                [`ht-${i}-${j}`]: lineHorizontalTop,
                [`hc-${i}-${j}`]: lineHorizontalCenter,
                [`hb-${i}-${j}`]: lineHorizontalBottom,
                [`vl-${i}-${j}`]: lineVerticalLeft,
                [`vc-${i}-${j}`]: lineVerticalCenter,
                [`vr-${i}-${j}`]: lineVerticalRight,
                [`db-${i}-${j}`]: lineDiagonalBack,
                [`df-${i}-${j}`]: lineDiagonalForward,
              },
            ]"
            @click="placeItem(i, j)"
          >
            <span class="circle" v-if="gridContent[i][j] === 'O'"></span>
            <span class="cross" v-if="gridContent[i][j] === 'X'"></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import gameMessages from "@/mixins/gameMessages";
import utils from "@/mixins/utils";

export default {
  name: "Morpion",
  mixins: [gameMessages, utils],

  data() {
    return {
      gridContent: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      endLineColor: "",
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
    ...mapState("player", ["socketId", "host", "turn", "isWinner"]),
    ...mapState("game", ["playedCell", "enemyData"]),
    ...mapState("morpion", [
      "colorPlayer",
      "colorEnemy",
      "shapePlayer",
      "shapeEnemy",
    ]),
    ...mapGetters("room", ["enemies"]),

    colorCross() {
      return this.shapePlayer === "X" ? this.colorPlayer : this.colorEnemy;
    },
    colorCircle() {
      return this.shapePlayer === "O" ? this.colorPlayer : this.colorEnemy;
    },
  },

  watch: {
    enemyData() {
      this.placeEnemyItem();
    },
    shapePlayer() {
      this.switchShapesInGridContent();
    },
  },

  mounted() {
    this.listenPlayToMorpion();

    if (this.turn) {
      this.createInfoMessage(this.$t("game.yourTurn"));
    } else {
      this.createLoadingMessage(
        this.$t("game.preparesMove", { user: this.enemies[0].username })
      );
    }
  },

  methods: {
    ...mapActions("player", ["changeTurn", "changeIsWinner", "changeOutcome"]),
    ...mapActions("game", ["changePlayedCell"]),
    ...mapActions("morpion", [
      "emitPlayToMorpion",
      "listenPlayToMorpion",
      "changeVictoryWay",
    ]),

    placeItem(x, y) {
      if (!this.turn) return;
      if (this.gridContent[x][y] !== "") return;

      this.removeMessage();

      this.gridContent[x][y] = this.shapePlayer;
      this.changePlayedCell([x, y]);

      this.checkVictory();

      this.changeTurn(false);
      this.emitPlayToMorpion();

      if (this.isWinner) return;
      if (this.checkEquality()) return;

      this.createLoadingMessage(
        this.$t("game.preparesMove", { user: this.enemies[0].username })
      );
    },

    placeEnemyItem() {
      if (this.enemyData.length === 0) return;
      if (this.socketId === this.enemyData.socketId) return;
      if (this.enemyData.turn) return;

      this.removeMessage();

      let cell = this.enemyData.playedCell;
      this.gridContent[cell[0]][cell[1]] = this.shapeEnemy;

      if (this.checkDefeat()) return;
      if (this.checkEquality()) return;

      this.changeTurn(true);
      this.createInfoMessage(this.$t("game.yourTurn"));
    },

    checkEquality() {
      for (const x of this.gridContent) {
        for (const y of x) {
          if (y === "") return false;
        }
      }

      this.gameOver("equality");

      return true;
    },

    checkDefeat() {
      if (!this.enemyData.isWinner) return false;

      this.endLineColor = this.colorEnemy;
      this.addLine(this.enemyData.victoryWay);
      this.gameOver("defeat");

      return true;
    },

    checkVictory() {
      if (this.enemyData.length === 0) return;

      this.endLineColor = this.colorPlayer;

      if (
        !this.checkVictoryHorizontal() &&
        !this.checkVictoryVertical() &&
        !this.checkVictoryDiagonalBack() &&
        !this.checkVictoryDiagonalForward()
      )
        return;

      this.changeIsWinner(true);
      this.gameOver("victory");
    },

    checkVictoryHorizontal() {
      let row = this.playedCell[0];

      for (let y = 0; y < 3; y++) {
        if (this.gridContent[row][y] !== this.shapePlayer) return false;
      }

      if (row === 0) this.addLine("h-t");
      if (row === 1) this.addLine("h-c");
      if (row === 2) this.addLine("h-b");

      return true;
    },

    checkVictoryVertical() {
      let column = this.playedCell[1];

      for (let x = 0; x < 3; x++) {
        if (this.gridContent[x][column] !== this.shapePlayer) return false;
      }

      if (column === 0) this.addLine("v-l");
      if (column === 1) this.addLine("v-c");
      if (column === 2) this.addLine("v-r");

      return true;
    },

    checkVictoryDiagonalBack() {
      // * - -
      // - * -
      // - - *

      for (let i = 0; i < 3; i++) {
        if (this.gridContent[i][i] !== this.shapePlayer) return false;
      }

      this.addLine("d-b");

      return true;
    },

    checkVictoryDiagonalForward() {
      // - - *
      // - * -
      // * - -

      for (let x = 0; x < 3; x++) {
        let y = 2 - x;

        if (this.gridContent[x][y] !== this.shapePlayer) return false;
      }

      this.addLine("d-f");

      return true;
    },

    async gameOver(way) {
      if (way !== "equality") await this.sleep(2000);
      else await this.sleep(1000);
      this.endLineColor = this.colorPlayer;

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

    switchShapesInGridContent() {
      for (let x = 0; x < this.gridContent.length; x++) {
        for (let y = 0; y < this.gridContent[x].length; y++) {
          if (this.gridContent[x][y] === this.shapePlayer) {
            this.gridContent[x][y] = this.shapeEnemy;
          } else if (this.gridContent[x][y] === this.shapeEnemy) {
            this.gridContent[x][y] = this.shapePlayer;
          }
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.morpion {
  height: 466px;
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

.h-0 {
  border-bottom: #ffffffd1 4px solid;
}
.h-1 {
  border-top: #ffffffd1 4px solid;
  border-bottom: #ffffffd1 4px solid;
}
.h-2 {
  border-top: #ffffffd1 4px solid;
}
.w-0 {
  border-right: #ffffffd1 4px solid;
}
.w-1 {
  border-left: #ffffffd1 4px solid;
  border-right: #ffffffd1 4px solid;
}
.w-2 {
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
  border: 10px solid v-bind(colorCircle);
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
  background-color: v-bind(colorCross);
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

.ht-0-0:before,
.ht-0-1:before,
.ht-0-2:before,
.hc-1-0:before,
.hc-1-1:before,
.hc-1-2:before,
.hb-2-0:before,
.hb-2-1:before,
.hb-2-2:before {
  z-index: 2;
  content: " ";
  position: absolute;
  left: -15px;
  top: calc(50% - 5px);
  width: 180px;
  border-bottom: 10px solid;
  border-bottom-color: v-bind(endLineColor);
}

.vl-0-0:before,
.vl-1-0:before,
.vl-2-0:before,
.vc-0-1:before,
.vc-1-1:before,
.vc-2-1:before,
.vr-0-2:before,
.vr-1-2:before,
.vr-2-2:before {
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

.ht-0-0:before,
.hc-1-0:before,
.hb-2-0:before,
.vl-0-0:before,
.vc-0-1:before,
.vr-0-2:before {
  animation: line 0.1s linear;
}
.ht-0-1:before,
.hc-1-1:before,
.hb-2-1:before,
.vl-1-0:before,
.vc-1-1:before,
.vr-1-2:before {
  animation: line 0.1s linear 0.1s both;
}
.ht-0-2:before,
.hc-1-2:before,
.hb-2-2:before,
.vl-2-0:before,
.vc-2-1:before,
.vr-2-2:before {
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

  // CIRCLE - RESPONSIVE

  .circle:before {
    left: calc(15% - 3px);
    top: calc(15% - 3px);
    width: 50px;
    height: 50px;
  }

  // CROSS - RESPONSIVE

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

  // HORIZONTAL AND VERTICAL CASES - RESPONSIVE

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

  //  DIAGONAL CASES - RESPONSIVE

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