<template>
  <div>
    <n-divider title-placement="left">
      <n-tag round size="large">
        Forme
        <template #avatar>
          <n-avatar>
            <n-icon>
              <shapes-24-regular />
            </n-icon>
          </n-avatar>
        </template>
      </n-tag>
    </n-divider>

    <n-space justify="space-around">
      <div
        class="wrapper"
        :class="{ active: shapePlayer === 'X' }"
        @click="shapePlayer === 'O' ? handleShapes() : ''"
      >
        <div class="cross"></div>
      </div>

      <div
        class="wrapper"
        :class="{ active: shapePlayer === 'O' }"
        @click="shapePlayer === 'X' ? handleShapes() : ''"
      >
        <div class="circle"></div>
      </div>
    </n-space>
  </div>
</template>

<script>
import { Shapes24Regular } from "@vicons/fluent";
import { mapActions, mapState } from "vuex";

export default {
  name: "ChangeMorpionShape",
  components: { Shapes24Regular },

  data() {
    return {};
  },

  computed: {
    ...mapState("morpion", [
      "colorPlayer",
      "colorEnemy",
      "shapePlayer",
      "shapeEnemy",
    ]),

    colorCross() {
      return this.shapePlayer === "X" ? this.colorPlayer : this.colorEnemy;
    },
    colorCircle() {
      return this.shapePlayer === "O" ? this.colorPlayer : this.colorEnemy;
    },
  },

  methods: {
    ...mapActions("morpion", ["changeShapePlayer", "changeShapeEnemy"]),

    handleShapes() {
      const newShapePlayer = this.shapePlayer === "X" ? "O" : "X";
      const newShapeEnemy = newShapePlayer === "X" ? "O" : "X";

      this.changeShapePlayer(newShapePlayer);
      this.changeShapeEnemy(newShapeEnemy);
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 150px;
  height: 150px;
  text-align: center;
  vertical-align: middle;
  position: relative;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid #18181c;
  border-radius: 3px;
  transition: all 0.3s;
}
.wrapper:hover {
  border: 1px solid #7fe7c4;
  transition: all 0.3s;
}
.active {
  border: 1px solid #7fe7c4;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 8px 0 rgba(99, 226, 183, 0.3);
  transition: all 0.3s;
}
.wrapper:not(.active) {
  cursor: pointer;
}

// cross design

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
  transition: all 0.3s;
}
.cross:before {
  transform: rotate(45deg);
}
.cross:after {
  transform: rotate(-45deg);
}

// circle design

.circle:before {
  content: " ";
  position: absolute;
  left: calc(25% - 3px);
  top: calc(25% - 3px);
  width: 60px;
  height: 60px;
  border: 10px solid v-bind(colorCircle);
  border-radius: 100%;
  transition: all 0.3s;
}

@media screen and (max-width: 400px) {
  .wrapper {
    width: 120px;
    height: 120px;
  }

  .cross:before,
  .cross:after {
    top: 9px;
    left: 55px;
    height: 100px;
  }

  .circle:before {
    top: calc(20% - 3px);
    left: calc(20% - 3px);
    width: 60px;
    height: 60px;
  }
}
</style>