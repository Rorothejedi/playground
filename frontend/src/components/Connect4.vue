<template>
  <div>
    <table cellspacing="0" cellpadding="0">
      <tbody>
        <tr v-for="(x, i) in grid_content" :key="i">
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
                v-if="grid_content[i][j] !== ''"
                :class="{
                  'enemy-item': grid_content[i][j] === enemySymbol,
                  'my-item': grid_content[i][j] === symbol,
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
      grid_content: [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
      ],
      symbol: "X",
      enemySymbol: "O",

      winPoints: 0,
      otherTurn: false,

      hoverColumn: -1,
    };
  },

  methods: {
    placeItem(x, y) {
      if (this.grid_content[0][y] !== "" || this.grid_content[x][y] !== "")
        return;

      const columnX = this.placeItemInColumn(y);

      this.checkBottom(columnX, y);
      this.checkHorizontal(columnX);
      this.checkForward(columnX, y);
      this.checkBack(columnX, y);
    },

    placeItemInColumn(y) {
      for (let i = 5; i >= 0; i--) {
        if (this.grid_content[i][y] !== "") continue;

        this.putItemOnTheGrid(i, y);
        return i;
      }
    },

    putItemOnTheGrid(x, y) {
      this.grid_content[x][y] = this.otherTurn ? this.enemySymbol : this.symbol;
      this.otherTurn = !this.otherTurn;
    },

    checkBottom(x, y) {
      let point = 0;

      while (x < 6) {
        if (this.grid_content[x][y] !== this.symbol) break;
        point++;
        if (point === 4) {
          console.log("VICTORY");
          break;
        }

        x++;
      }
    },

    checkHorizontal(x) {
      let point = 0;

      for (let i = 0; i < 7; i++) {
        if (this.grid_content[x][i] === this.symbol) point++;
        if (point > 0 && this.grid_content[x][i] !== this.symbol) point = 0;
        if (point === 4) console.log("VICTORY");
      }
    },

    checkForward(x, y) {
      // . . O
      // . O .
      // O . .

      let point = 0;
      let [newX, newY] = this.findStartCoordonateForCheckForward(x, y);

      while (newX > 0 && newY < 6) {
        if (this.grid_content[newX][newY] === this.symbol) point++;
        else point = 0;

        if (point === 4) {
          console.log("VICTORY");
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

      let point = 0;
      let [newX, newY] = this.findStartCoordonateForCheckBack(x, y);

      while (newX > 0 && newY > 0) {
        if (this.grid_content[newX][newY] === this.symbol) point++;
        else point = 0;

        if (point === 4) {
          console.log("VICTORY");
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
  border: 3px solid rgba(56, 137, 197);
  background-color: rgba(56, 137, 197, 0.5);
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