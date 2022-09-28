<template>
  <table cellspacing="0" cellpadding="0">
    <tbody>
      <tr>
        <td class="cell h-1 w-1" id="cell-1-1" @click="placeItem(0, 0)">
          {{ grid_content[0][0] }}
        </td>
        <td class="cell h-1 w-2" id="cell-1-2" @click="placeItem(0, 1)">
          {{ grid_content[0][1] }}
        </td>
        <td class="cell h-1 w-3" id="cell-1-3" @click="placeItem(0, 2)">
          {{ grid_content[0][2] }}
        </td>
      </tr>
      <tr>
        <td class="cell h-2 w-1" id="cell-2-1" @click="placeItem(1, 0)">
          {{ grid_content[1][0] }}
        </td>
        <td class="cell h-2 w-2" id="cell-2-2" @click="placeItem(1, 1)">
          {{ grid_content[1][1] }}
        </td>
        <td class="cell h-2 w-3" id="cell-2-3" @click="placeItem(1, 2)">
          {{ grid_content[1][2] }}
        </td>
      </tr>
      <tr>
        <td class="cell h-3 w-1" id="cell-3-1" @click="placeItem(2, 0)">
          {{ grid_content[2][0] }}
        </td>
        <td class="cell h-3 w-2" id="cell-3-2" @click="placeItem(2, 1)">
          {{ grid_content[2][1] }}
        </td>
        <td class="cell h-3 w-3" id="cell-3-3" @click="placeItem(2, 2)">
          {{ grid_content[2][2] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "grid",

  data() {
    return {
      grid_content: [[], [], []],
    };
  },

  methods: {
    placeItem(x, y) {
      this.grid_content[x][y] = "X";
    },
  },
};
</script>

<style lang="less" scoped>
table {
  height: 70vh;
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
  border-bottom: #63e2b7 3px solid;
}
.h-2 {
  border-top: #63e2b7 3px solid;
  border-bottom: #63e2b7 3px solid;
}
.h-3 {
  border-top: #63e2b7 3px solid;
}
.w-1 {
  border-right: #63e2b7 3px solid;
}
.w-2 {
  border-left: #63e2b7 3px solid;
  border-right: #63e2b7 3px solid;
}
.w-3 {
  border-left: #63e2b7 3px solid;
}
</style>