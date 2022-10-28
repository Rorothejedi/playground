<template>
  <table cellspacing="0" cellpadding="0">
    <tbody>
      <tr v-for="(x, i) in gridContent" :key="i">
        <td
          v-for="(y, j) in x"
          :key="j"
          @click="placeItem(i, j)"
          :class="{ col: hoverColumn === j }"
          @mouseover="hoverColumn = j"
          @mouseout="hoverColumn = -1"
        >
          <div class="inner-circle">
            <span
              v-if="gridContent[i][j] !== ''"
              :class="{
                'enemy-item': gridContent[i][j] === enemySymbol,
                'my-item': gridContent[i][j] === symbol,
                'victory-end-game': gridContent[i][j] === victorySymbol,
                'defeat-end-game': gridContent[i][j] === defeatSymbol,
                'end-game': isEnd,
              }"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import gameMessages from "@/mixins/gameMessages";
import utils from "@/mixins/utils";

export default {
  name: "Connect4",
  mixins: [gameMessages, utils],

  data() {
    return {
      gridContent: [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
      ],
      symbol: "X",
      enemySymbol: "O",
      victorySymbol: "V",
      defeatSymbol: "D",

      hoverColumn: -1,

      isEnd: false,
    };
  },

  computed: {
    ...mapState("player", ["socketId", "turn"]),
    ...mapState("game", ["enemyData", "playedCell"]),
    ...mapState("connect4", ["victoryCells", "colorPlayer", "colorEnemy"]),
    ...mapGetters("room", ["enemies"]),

    darkenColorPlayer() {
      return this.hexTorgba(this.colorPlayer, 0.5);
    },
    darkenColorEnemy() {
      return this.hexTorgba(this.colorEnemy, 0.5);
    },
  },

  watch: {
    enemyData() {
      this.placeEnemyItem();
    },
  },

  mounted() {
    this.listenPlayToConnect4();

    if (this.turn) {
      this.createInfoMessage("A toi de jouer");
    } else {
      this.createLoadingMessage(`${this.enemies[0].username} prépare son coup`);
    }
  },

  beforeUnmount() {
    this.changeVictoryCells([]);
    this.changePlayedCell("");
  },

  methods: {
    ...mapActions("player", ["changeTurn", "changeOutcome", "changeIsWinner"]),
    ...mapActions("game", ["changePlayedCell"]),
    ...mapActions("connect4", [
      "emitPlayToConnect4",
      "listenPlayToConnect4",
      "changeVictoryCells",
    ]),

    placeItem(x, y) {
      if (!this.turn) return;
      if (this.gridContent[0][y] !== "" || this.gridContent[x][y] !== "")
        return;

      this.removeMessage();

      const newX = this.placeItemInBottomOfColumn(y);
      this.changePlayedCell([newX, y]);

      this.checkVictory();

      this.changeTurn(false);
      this.emitPlayToConnect4();

      if (this.isEnd) return;
      if (this.checkEquality()) return;

      this.createLoadingMessage(`${this.enemies[0].username} prépare son coup`);
    },

    placeEnemyItem() {
      if (this.enemyData.length === 0) return;
      if (this.socketId === this.enemyData.socketId) return;
      if (this.enemyData.turn) return;

      this.removeMessage();

      let cell = this.enemyData.playedCell;
      this.gridContent[cell[0]][cell[1]] = this.enemySymbol;

      if (this.checkDefeat()) return;
      if (this.checkEquality()) return;

      this.changeTurn(true);
      this.createInfoMessage("A toi de jouer");
    },

    placeItemInBottomOfColumn(y) {
      for (let i = 5; i >= 0; i--) {
        if (this.gridContent[i][y] !== "") continue;

        this.gridContent[i][y] = this.symbol;
        return i;
      }
    },

    checkVictory() {
      if (this.enemyData.length === 0) return;
      if (
        !this.checkVictoryBottom() &&
        !this.checkVictoryHorizontal() &&
        !this.checkVictoryForward() &&
        !this.checkVictoryBack()
      )
        return;

      this.changeIsWinner(true);
      this.gameOver("victory");
    },

    checkDefeat() {
      if (!this.enemyData.isWinner) return false;

      this.gameOver("defeat");

      return true;
    },

    checkEquality() {
      const isGridFull = this.gridContent.every((row) => !row.includes(""));

      if (!isGridFull) return false;

      this.gameOver("equality");

      return true;
    },

    checkVictoryBottom() {
      let cells = [];
      let x = this.playedCell[0];
      let y = this.playedCell[1];

      while (x < 6) {
        if (this.gridContent[x][y] !== this.symbol) break;
        cells.push([x, y]);
        if (cells.length === 4) {
          this.changeVictoryCells(cells);
          return true;
        }

        x++;
      }
      return false;
    },

    checkVictoryHorizontal() {
      let cells = [];
      let x = this.playedCell[0];

      for (let i = 0; i < 7; i++) {
        if (this.gridContent[x][i] === this.symbol) cells.push([x, i]);
        if (cells.length > 0 && this.gridContent[x][i] !== this.symbol)
          cells = [];
        if (cells.length === 4) {
          this.changeVictoryCells(cells);
          return true;
        }
      }

      return false;
    },

    checkVictoryForward() {
      // . . O
      // . O .
      // O . .

      let cells = [];
      let [x, y] = this.findStartCoordonateForward();

      while (x >= 0 && y <= 6) {
        if (this.gridContent[x][y] === this.symbol) {
          cells.push([x, y]);
        } else {
          cells = [];
        }

        if (cells.length === 4) {
          this.changeVictoryCells(cells);
          return true;
        }
        x--;
        y++;
      }

      return false;
    },

    checkVictoryBack() {
      // O . .
      // . O .
      // . . O

      let cells = [];
      let [x, y] = this.findStartCoordonateBack();

      while (x >= 0 && y >= 0) {
        if (this.gridContent[x][y] === this.symbol) {
          cells.push([x, y]);
        } else {
          cells = [];
        }

        if (cells.length === 4) {
          this.changeVictoryCells(cells);
          return true;
        }
        x--;
        y--;
      }

      return false;
    },

    findStartCoordonateForward() {
      let x = this.playedCell[0];
      let y = this.playedCell[1];

      while (x < 5 && y > 0) {
        x++;
        y--;
      }

      return [x, y];
    },

    findStartCoordonateBack() {
      let x = this.playedCell[0];
      let y = this.playedCell[1];

      while (x < 5 && y < 6) {
        x++;
        y++;
      }

      return [x, y];
    },

    async gameOver(way) {
      if (way !== "equality") {
        const cells =
          this.victoryCells.length === 0
            ? this.enemyData.victoryCells
            : this.victoryCells;

        for (let i = 0; i < 4; i++) {
          this.gridContent[cells[i][0]][cells[i][1]] =
            way === "victory" ? this.victorySymbol : this.defeatSymbol;
        }
      }

      this.isEnd = true;

      await this.sleep(3000);

      this.changeOutcome(way);
    },
  },
};
</script>

<style lang="less" scoped>
table {
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: hidden;
}
td {
  background-color: rgba(255, 255, 255, 0.1);
  width: 90px;
  height: 90px;
  text-align: center;
  position: relative;
  transition: all 0.1s;
}
.col {
  background-color: rgba(255, 255, 255, 0.15);
  transition: all 0.1s;
}

.inner-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: #101014;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  cursor: pointer;
}
span {
  display: block;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  margin: auto;
  cursor: initial;
  animation: appear 0.3s ease-out;
}

@keyframes appear {
  0% {
    margin-top: -100px;
    opacity: 0;
  }
  100% {
    margin-top: 0px;
    opacity: 1;
  }
}

:root {
  --test: v-bind(colorEnemy);
}

// @color: v-bind(colorEnemy);

.enemy-item {
  border: 3px solid v-bind(colorEnemy);
  background-color: v-bind(darkenColorEnemy);
}
.my-item {
  border: 3px solid v-bind(colorPlayer);
  background-color: v-bind(darkenColorPlayer);
}

.victory-end-game {
  border: 3px solid v-bind(colorPlayer);
  background-color: v-bind(colorPlayer) !important;
  transition: all 0.3s ease-out 0.3s;
}
.defeat-end-game {
  border: 3px solid v-bind(colorEnemy);
  background-color: v-bind(colorEnemy) !important;
  transition: all 0.3s ease-out 0.3s;
}
.end-game {
  background-color: #18181c;
  transition: all 0.3s ease-out 0.3s;
}

@media screen and (max-width: 600px) {
  td {
    width: 45px;
    height: 45px;
  }
  .inner-circle {
    width: 40px;
    height: 40px;
  }
  span {
    height: 35px;
    width: 35px;
  }
}
</style>