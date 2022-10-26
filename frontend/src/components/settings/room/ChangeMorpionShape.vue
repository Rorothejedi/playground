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
        :class="{ active: isCrossActive }"
        @click="isCircleActive ? switchShape() : ''"
      >
        <div class="cross"></div>
      </div>

      <div
        class="wrapper"
        :class="{ active: isCircleActive }"
        @click="isCrossActive ? switchShape() : ''"
      >
        <div class="circle"></div>
      </div>
    </n-space>
  </div>
</template>

<script>
import { Shapes24Regular } from "@vicons/fluent";

export default {
  name: "ChangeMorpionShape",
  components: { Shapes24Regular },

  data() {
    return {
      isCrossActive: true,
      isCircleActive: false,
    };
  },

  methods: {
    switchShape() {
      this.isCrossActive = !this.isCrossActive;
      this.isCircleActive = !this.isCircleActive;
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
  transition: all 0.3s;
  border: 1px solid #18181c;
}
.active {
  border: 1px solid #7fe7c4;
  border-radius: 3px;
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
  background-color: #63e2b7;
}
.cross:before {
  transform: rotate(45deg);
}
.cross:after {
  transform: rotate(-45deg);
}

// circle design

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
</style>