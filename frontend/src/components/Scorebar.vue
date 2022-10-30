<template>
  <div>
    <n-grid :cols="numberOfPlayer" class="scorebar">
      <n-gi class="score-column">
        <n-statistic :label="username" :value="score">
          <template #prefix v-if="scorePosition === 1 && score !== 0">
            <n-icon>
              <trophy-24-regular />
            </n-icon>
          </template>
        </n-statistic>
      </n-gi>

      <n-gi v-for="(enemy, i) in enemies" :key="i" class="score-column">
        <n-statistic :label="enemy.username" :value="getEnemyScore(enemy)">
        </n-statistic>
      </n-gi>
    </n-grid>
    <n-progress
      :show-indicator="false"
      :status="progressStatus"
      :percentage="(scoreMax / scoreToReach) * 100"
      :border-radius="0"
      :height="4"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { Trophy24Regular } from "@vicons/fluent";
import utils from "@/mixins/utils.js";

export default {
  name: "Scorebar",
  mixins: [utils],

  components: {
    Trophy24Regular,
  },

  data() {
    return {};
  },

  computed: {
    ...mapState("game", [
      "enemyData",
      "game",
      "numberOfPlayer",
      "scoreToReach",
    ]),
    ...mapState("player", ["username", "score", "outcome"]),
    ...mapGetters("room", ["enemies"]),

    // isDisplayScorebar() {
    //   if (this.enemies === undefined) return false;
    //   if (this.enemies.length < this.numberOfPlayer - 1) return false;

    //   return true;
    // },

    scorePosition() {
      let enemiesScore = [];

      this.enemyData.forEach((enemy) => {
        enemiesScore.push(enemy.score);
      });

      const max = Math.max(...enemiesScore);

      if (max > this.score) return -1;
      else if (max < this.score) return 1;
      else return 0;
    },

    scoreMax() {
      let allScores = [];

      allScores.push(this.score);

      this.enemyData.forEach((enemy) => {
        allScores.push(enemy.score);
      });

      return Math.max(...allScores);
    },

    progressStatus() {
      if (this.scorePosition === -1) return "error";
      if (this.scorePosition === 0) return "warning";
      return "success";
    },
  },

  methods: {
    ...mapActions("player", ["changeScore"]),

    getEnemyScore(enemy) {
      const data = this.enemyData.find((e) => e.socketId === enemy.socketId);

      if (data === undefined) return 0;

      return data.score;
    },
  },
};
</script>

<style lang="less" scoped>
.scorebar {
  background-color: rgba(255, 255, 255, 0.01);

  .score-column {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
}
</style>