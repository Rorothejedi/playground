<template>
  <div>
    <transition name="fade">
      <div class="choices" v-show="displayChoices && imgChoicesIsLoad">
        <div class="choice" v-for="(item, i) in items" :key="i">
          <img
            v-if="item !== ''"
            :src="require(`@/assets/${item}.svg`)"
            @click="chooseItem(item)"
            :class="{
              chosen: chosenItem === item,
              'disabled-item': chosenItem !== '',
            }"
            @load="loadImgChoices(i)"
          />
        </div>
      </div>
    </transition>

    <transition name="fade-in-down">
      <div
        class="endgame"
        v-show="displayEndgame && imgPlayerChosenIsLoad && imgEnemyChosenIsLoad"
      >
        <div>
          <img
            v-if="chosenItem !== ''"
            :src="require(`@/assets/${chosenItem}.svg`)"
            :class="localOutcome"
            @load="imgPlayerChosenIsLoad = true"
          />
        </div>

        <n-text italic>VS</n-text>

        <div :class="{ 'endgame-enemy-choices': enemyData.length === 2 }">
          <div v-for="enemy in enemyData" :key="enemy.socketId">
            <img
              v-for="(item, i) in items"
              :key="i"
              v-show="enemy.chosenItem === item"
              :src="require(`@/assets/${item}-reverse.svg`)"
              @load="loadImgEnemyChosen(i)"
            />
          </div>
        </div>
      </div>
    </transition>

    <!-- 
    <div class="scores">
      <div>
        <n-text underline>{{ username }} </n-text>
        <n-text depth="3"> - </n-text>
        <n-text type="success"> {{ score }} </n-text>
      </div>

      <div v-for="(enemy, i) in enemies" :key="enemy.socketId">
        <n-text italic>
          {{ enemy.username }}
        </n-text>
        <n-text depth="3"> - </n-text>
        <n-text type="warning">
          {{
            enemyData.length > 0 && enemyData[i] !== undefined
              ? enemyData[i].score
              : 0
          }}
        </n-text>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import gameMessages from "@/mixins/gameMessages";
import utils from "@/mixins/utils";

export default {
  name: "RockPaperScissors",
  mixins: [gameMessages, utils],

  data() {
    return {
      items: ["rock", "paper", "scissors"],
      displayChoices: true,
      displayEndgame: false,
      localOutcome: "",

      imgChoices: [],
      imgChoicesIsLoad: false,
      imgPlayerChosenIsLoad: false,
      imgEnemyChosen: [],
      imgEnemyChosenIsLoad: false,

      transitionTiming: 300,
    };
  },

  computed: {
    ...mapState("player", ["username", "score"]),
    ...mapState("game", ["enemyData", "chosenItem", "scoreToReach"]),
    ...mapGetters("room", ["room", "enemies"]),

    enemyEndgameColorClass() {
      if (this.localOutcome === "victory") return "defeat";
      if (this.localOutcome === "defeat") return "victory";

      return "equality";
    },
  },

  watch: {
    enemyData(newValue) {
      if (newValue.length === 0) return;

      if (this.chosenItem === "") {
        const enemies = newValue.filter((enemy) => enemy.chosenItem !== "");

        this.removeMessage();

        if (enemies.length === 1)
          this.createInfoMessage(
            this.$t("game.choseMove", {
              user: enemies[0].username,
            })
          );
        else if (enemies.length === 2)
          this.createInfoMessage(
            this.$t("game.choseMoves", {
              user1: enemies[0].username,
              user2: enemies[1].username,
            })
          );
      }

      this.checkResult();
    },
  },

  mounted() {
    this.listenPlayToRockPaperScissors();
  },

  beforeUnmount() {
    this.resetEnemyData();

    this.changeChosenItem("");
    this.changeScore(0);
  },

  methods: {
    ...mapActions("player", ["changeOutcome", "changeScore"]),
    ...mapActions("game", [
      "emitPlayToRockPaperScissors",
      "listenPlayToRockPaperScissors",
      "changeEnemyData",
      "resetEnemyData",
      "changeChosenItem",
    ]),

    loadImgChoices(index) {
      this.imgChoices.push(index);

      if (this.imgChoices.length < 3) return;

      this.imgChoicesIsLoad = true;
    },

    loadImgEnemyChosen(index) {
      this.imgEnemyChosen.push(index);

      if (this.imgEnemyChosen.length < this.enemyData.length) return;

      this.imgEnemyChosenIsLoad = true;
    },

    chooseItem(item) {
      if (this.chosenItem !== "") return;

      this.removeMessage();

      this.changeChosenItem(item);
      this.emitPlayToRockPaperScissors();

      this.checkResult();
    },

    checkResult() {
      if (
        this.enemyData.length < this.room.numberOfPlayer - 1 ||
        this.chosenItem === ""
      )
        return;

      const checkEnemiesItems = this.enemyData.filter(
        (a) => a.chosenItem !== ""
      );

      if (checkEnemiesItems.length !== this.enemyData.length) return;

      let wayOfEndCursor = 0;
      let enemyVictories = [];
      let enemyEqualities = [];

      for (let i = 0; i < this.enemyData.length; i++) {
        const enemyItem = this.enemyData[i].chosenItem;

        if (this.checkVictory(enemyItem)) {
          wayOfEndCursor++;
        }
        if (this.checkDefeat(enemyItem)) {
          enemyVictories.push(this.enemyData[i]);
          wayOfEndCursor--;
        }
        if (this.checkEquality(enemyItem)) {
          enemyEqualities.push(this.enemyData[i]);
        }
      }

      if (wayOfEndCursor > 0) {
        let data = this.enemyData;

        enemyEqualities.forEach((enemyData) => {
          const i = data.findIndex((el) => el.socketId === enemyData.socketId);
          data[i].score = enemyData.score + 1;
        });
        this.changeEnemyData(data);
        this.changeScore(this.score + 1);
      }
      if (wayOfEndCursor < 0) {
        let data = this.enemyData;

        enemyVictories.forEach((enemyData) => {
          const i = data.findIndex((el) => el.socketId === enemyData.socketId);
          data[i].score = enemyData.score + 1;
        });
        this.changeEnemyData(data);
      }

      if (wayOfEndCursor > 0) {
        this.roundOver("victory");
      } else if (wayOfEndCursor < 0) {
        this.roundOver("defeat");
      } else if (wayOfEndCursor === 0) {
        this.roundOver("equality");
      }
    },

    checkEquality(enemyItem) {
      return (
        (enemyItem === "rock" && this.chosenItem === "rock") ||
        (enemyItem === "paper" && this.chosenItem === "paper") ||
        (enemyItem === "scissors" && this.chosenItem === "scissors")
      );
    },

    checkVictory(enemyItem) {
      return (
        (enemyItem === "rock" && this.chosenItem === "paper") ||
        (enemyItem === "paper" && this.chosenItem === "scissors") ||
        (enemyItem === "scissors" && this.chosenItem === "rock")
      );
    },

    checkDefeat(enemyItem) {
      return (
        (enemyItem === "rock" && this.chosenItem === "scissors") ||
        (enemyItem === "paper" && this.chosenItem === "rock") ||
        (enemyItem === "scissors" && this.chosenItem === "paper")
      );
    },

    async roundOver(way) {
      this.localOutcome = way;
      this.displayChoices = false;

      await this.sleep(this.transitionTiming);

      this.displayEndgame = true;

      await this.sleep(2000);

      this.displayEndgame = false;

      if (
        this.score !== this.room.scoreToReach &&
        this.enemyData.find((enemy) => enemy.score !== this.room.scoreToReach)
      ) {
        await this.sleep(this.transitionTiming);
      }

      this.resetChosenItemForEnemyData();
      this.changeChosenItem("");

      if (this.score === this.room.scoreToReach) {
        this.changeOutcome("victory");
      } else if (
        this.enemyData.find((enemy) => enemy.score === this.room.scoreToReach)
      ) {
        this.changeOutcome("defeat");
      } else {
        this.displayChoices = true;
      }
    },

    resetChosenItemForEnemyData() {
      let data = this.enemyData;

      for (let i = 0; i < data.length; i++) {
        data[i].chosenItem = "";
      }

      this.changeEnemyData(data);
    },
  },
};
</script>

<style lang="less" scoped>
.choices {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  height: 200px;

  .choice {
    display: flex;
    justify-content: center;
    width: 200px;
  }

  .chosen {
    box-shadow: 0px 0px 0px 6px #63e2b7;
    transition: all 0.3s;
    filter: brightness(0) saturate(100%) invert(81%) sepia(34%) saturate(568%)
      hue-rotate(102deg) brightness(93%) contrast(92%);
  }

  .disabled-item {
    pointer-events: none;
  }

  img {
    width: 170px;
    height: auto;
    border-radius: 50%;
    transition: all 0.3s;
    box-shadow: 0px 0px 0px 1px #ffffffd1;
  }
  img:hover {
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0px 0px 0px 6px #ffffffd1;
  }
}

.endgame {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 600px;

  div:not(.endgame-enemy-choices) {
    img {
      width: 300px;
      height: auto;
    }

    .victory {
      // #63e2b7
      filter: brightness(0) saturate(100%) invert(81%) sepia(34%) saturate(568%)
        hue-rotate(102deg) brightness(93%) contrast(92%);
    }
    .defeat {
      // e88080
      filter: brightness(0) saturate(100%) invert(53%) sepia(17%)
        saturate(1351%) hue-rotate(312deg) brightness(112%) contrast(82%);
    }
    .equality {
      // #f2c97d
      filter: brightness(0) saturate(100%) invert(87%) sepia(17%)
        saturate(1176%) hue-rotate(339deg) brightness(98%) contrast(94%);
    }
  }
  .endgame-enemy-choices {
    display: flex;
    flex-direction: column;
    div img {
      width: 200px;
      height: auto;
    }
  }
}

.scores {
  display: block;
  text-align: center;
  font-size: 1.3rem;
  padding-top: 50px;
}

@media screen and (max-width: 620px) {
  .choices {
    flex-wrap: wrap;
    justify-content: center;
    width: 95vw;
    height: auto;

    .choice {
      width: 150px;
      padding-top: 5px;
    }
    img {
      width: 120px;
    }
  }

  .endgame {
    width: 95vw;

    div:not(.endgame-enemy-choices) img {
      width: 170px;
    }

    .endgame-enemy-choices {
      div img {
        width: 140px;
      }
    }
  }

  .scores {
    display: block;
    text-align: center;
    padding-top: 35px;
  }
}

@media screen and (max-width: 350px) {
  .choice {
    padding-top: 10px !important;
  }
  img {
    width: 110px !important;
  }
}

@media screen and (max-height: 600px) {
  .scores {
    padding-top: 0px !important;
  }
}
</style>