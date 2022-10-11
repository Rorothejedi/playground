<template>
  <div>
    <n-collapse-transition :show="displayChoices">
      <div class="choices">
        <div class="choice">
          <img
            src="@/assets/rock.svg"
            alt="La pierre"
            title="La pierre"
            @click="chooseItem('rock')"
            :class="{
              chosen: chosenItem === 'rock',
              'disabled-item': chosenItem !== '',
            }"
            rel="preload"
          />
        </div>
        <div class="choice">
          <img
            src="@/assets/paper.svg"
            alt="Le papier"
            title="Le Papier"
            @click="chooseItem('paper')"
            :class="{
              chosen: chosenItem === 'paper',
              'disabled-item': chosenItem !== '',
            }"
            rel="preload"
          />
        </div>
        <div class="choice">
          <img
            src="@/assets/scissors.svg"
            alt="Les ciseaux"
            title="Les ciseaux"
            @click="chooseItem('scissors')"
            :class="{
              chosen: chosenItem === 'scissors',
              'disabled-item': chosenItem !== '',
            }"
            rel="preload"
          />
        </div>
      </div>
    </n-collapse-transition>

    <n-collapse-transition :show="displayEndgame">
      <div class="endgame">
        <div>
          <img
            v-show="chosenItem === 'rock'"
            src="@/assets/rock.svg"
            alt="La pierre"
            :class="localOutcome"
            rel="preload"
          />
          <img
            v-show="chosenItem === 'paper'"
            src="@/assets/paper.svg"
            alt="Le papier"
            :class="localOutcome"
            rel="preload"
          />
          <img
            v-show="chosenItem === 'scissors'"
            src="@/assets/scissors.svg"
            alt="Les ciseaux"
            :class="localOutcome"
            rel="preload"
          />
        </div>

        <n-text italic>VS</n-text>

        <div>
          <img
            v-show="enemyData.chosenItem === 'rock'"
            src="@/assets/rock-reverse.svg"
            alt="La pierre"
            :class="enemyEndgameColorClass"
            rel="preload"
          />
          <img
            v-show="enemyData.chosenItem === 'paper'"
            src="@/assets/paper-reverse.svg"
            alt="Le papier"
            :class="enemyEndgameColorClass"
            rel="preload"
          />
          <img
            v-show="enemyData.chosenItem === 'scissors'"
            src="@/assets/scissors-reverse.svg"
            alt="Les ciseaux"
            :class="enemyEndgameColorClass"
            rel="preload"
          />
        </div>
      </div>
    </n-collapse-transition>

    <div class="scores">
      <div>
        <n-text italic>{{ username }} </n-text>
        <n-text> - {{ score }} </n-text>
      </div>

      <div>
        <n-text italic>
          {{ enemy !== undefined ? enemy.username : "" }}
        </n-text>
        <n-text>
          -
          {{ enemyData.length !== 0 ? enemyData.score : 0 }}
        </n-text>
      </div>
    </div>
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
      displayChoices: true,
      displayEndgame: false,
      localOutcome: "",
    };
  },

  computed: {
    ...mapState("player", ["username", "score"]),
    ...mapState("game", ["enemyData", "chosenItem", "scoreToReach"]),
    ...mapGetters("room", ["room", "enemy"]),

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
        this.createInfoMessage(`${newValue.username} a choisi son coup`);
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

    chooseItem(item) {
      if (this.chosenItem !== "") return;

      this.changeChosenItem(item);
      this.emitPlayToRockPaperScissors();
      this.checkResult();
    },

    checkResult() {
      if (this.enemyData.length === 0 || this.chosenItem === "") return;

      const enemyItem = this.enemyData.chosenItem;

      this.removeMessage();

      this.checkEquality(enemyItem);
      this.checkVictory(enemyItem);
      this.checkDefeat(enemyItem);
    },

    checkEquality(enemyItem) {
      if (
        (enemyItem === "rock" && this.chosenItem === "rock") ||
        (enemyItem === "paper" && this.chosenItem === "paper") ||
        (enemyItem === "scissors" && this.chosenItem === "scissors")
      ) {
        this.roundOver("equality");
      }
    },

    checkVictory(enemyItem) {
      if (
        (enemyItem === "rock" && this.chosenItem === "paper") ||
        (enemyItem === "paper" && this.chosenItem === "scissors") ||
        (enemyItem === "scissors" && this.chosenItem === "rock")
      ) {
        this.changeScore(this.score + 1);
        this.roundOver("victory");
      }
    },

    checkDefeat(enemyItem) {
      if (
        (enemyItem === "rock" && this.chosenItem === "scissors") ||
        (enemyItem === "paper" && this.chosenItem === "rock") ||
        (enemyItem === "scissors" && this.chosenItem === "paper")
      ) {
        let data = this.enemyData;
        data.score = this.enemyData.score + 1;
        this.changeEnemyData(data);

        this.roundOver("defeat");
      }
    },

    async roundOver(way) {
      this.localOutcome = way;
      this.displayChoices = false;
      this.displayEndgame = true;

      await this.sleep(2500);

      let data = this.enemyData;
      data.chosenItem = "";
      this.changeEnemyData(data);
      this.changeChosenItem("");

      if (this.score === this.room.scoreToReach) {
        this.gameOver("victory");
      } else if (this.enemyData.score === this.room.scoreToReach) {
        this.gameOver("defeat");
      } else {
        this.displayEndgame = false;
        this.displayChoices = true;
      }
    },

    gameOver(way) {
      this.displayChoices = false;

      this.changeOutcome(way);
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

  div {
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
}

.scores {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
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

    div img {
      width: 170px;
    }
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