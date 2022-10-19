<template>
  <div>
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
                  'end-game': isEnd,
                }"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Connect4",
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

      winPoints: 0,
      otherTurn: false,

      hoverColumn: -1,

      isEnd: false,
    };
  },

  methods: {
    placeItem(x, y) {
      if (this.gridContent[0][y] !== "" || this.gridContent[x][y] !== "")
        return;

      const columnX = this.placeItemInColumn(y);

      this.checkBottom(columnX, y);
      this.checkHorizontal(columnX);
      this.checkForward(columnX, y);
      this.checkBack(columnX, y);
    },

    placeItemInColumn(y) {
      for (let i = 5; i >= 0; i--) {
        if (this.gridContent[i][y] !== "") continue;

        this.gridContent[i][y] = this.otherTurn
          ? this.enemySymbol
          : this.symbol;
        this.otherTurn = !this.otherTurn;
        return i;
      }
    },

    checkBottom(x, y) {
      let points = [];

      while (x < 6) {
        if (this.gridContent[x][y] !== this.symbol) break;
        points.push([x, y]);
        if (points.length === 4) {
          this.gameOver(points);
          break;
        }

        x++;
      }
    },

    checkHorizontal(x) {
      let points = [];

      for (let i = 0; i < 7; i++) {
        if (this.gridContent[x][i] === this.symbol) points.push([x, i]);
        if (points.length > 0 && this.gridContent[x][i] !== this.symbol)
          points = [];
        if (points.length === 4) this.gameOver(points);
      }
    },

    checkForward(x, y) {
      // . . O
      // . O .
      // O . .

      let points = [];
      let [newX, newY] = this.findStartCoordonateForCheckForward(x, y);

      while (newX > 0 && newY < 6) {
        if (this.gridContent[newX][newY] === this.symbol) {
          points.push([newX, newY]);
        } else {
          points = [];
        }

        if (points.length === 4) {
          this.gameOver(points);
          break;
        }
        newX--;
        newY++;
      }
    },

    checkBack(x, y) {
      // O . .
      // . O .
      // . . O

      let points = [];
      let [newX, newY] = this.findStartCoordonateForCheckBack(x, y);

      while (newX > 0 && newY > 0) {
        if (this.gridContent[newX][newY] === this.symbol) {
          points.push([newX, newY]);
        } else {
          points = [];
        }

        if (points.length === 4) {
          this.gameOver(points);
          break;
        }
        newX--;
        newY--;
      }
    },

    findStartCoordonateForCheckForward(x, y) {
      while (x < 5 && y > 0) {
        x++;
        y--;
      }

      return [x, y];
    },

    findStartCoordonateForCheckBack(x, y) {
      while (x < 5 && y < 6) {
        x++;
        y++;
      }

      return [x, y];
    },

    gameOver(points) {
      for (let i = 0; i < 4; i++) {
        this.gridContent[points[i][0]][points[i][1]] = this.victorySymbol;
      }

      this.isEnd = true;

      console.log("VICTORY");
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
  background-color: #18181c;
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

.enemy-item {
  border: 3px solid rgba(240, 138, 0);
  background-color: rgba(240, 138, 0, 0.5);
}
.my-item {
  border: 3px solid #3889c5;
  background-color: rgba(56, 137, 197, 0.5);
}

.victory-end-game {
  border: 3px solid #3889c5;
  background-color: #3889c5 !important;
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