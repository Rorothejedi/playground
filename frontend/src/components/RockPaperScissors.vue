<template>
  <div>
    <div class="choices" v-if="displayChoices">
      <div class="choice">
        <img
          src="@/assets/rock.svg"
          alt="La pierre"
          @click="chooseItem('rock')"
          :class="{
            chosen: chosenItem === 'rock',
            'disabled-item': chosenItem !== '',
          }"
        />
      </div>
      <div class="choice">
        <img
          src="@/assets/paper.svg"
          alt="Le papier"
          @click="chooseItem('paper')"
          :class="{
            chosen: chosenItem === 'paper',
            'disabled-item': chosenItem !== '',
          }"
        />
      </div>
      <div class="choice">
        <img
          src="@/assets/scissors.svg"
          alt="Les ciseaux"
          @click="chooseItem('scissors')"
          :class="{
            chosen: chosenItem === 'scissors',
            'disabled-item': chosenItem !== '',
          }"
        />
      </div>
    </div>

    <n-collapse-transition :show="displayEndgame">
      <div class="endgame">
        <div>
          <img
            v-if="chosenItem === 'rock'"
            src="@/assets/rock.svg"
            alt="La pierre"
            :class="localOutcome"
          />
          <img
            v-else-if="chosenItem === 'paper'"
            src="@/assets/paper.svg"
            alt="Le papier"
            :class="localOutcome"
          />
          <img
            v-else-if="chosenItem === 'scissors'"
            src="@/assets/scissors.svg"
            alt="Les ciseaux"
            :class="localOutcome"
          />
        </div>

        <n-text italic>VS</n-text>

        <div>
          <img
            v-if="enemyData.chosenItem === 'rock'"
            src="@/assets/rock-reverse.svg"
            alt="La pierre"
            :class="enemyEndgameColorClass"
          />
          <img
            v-else-if="enemyData.chosenItem === 'paper'"
            src="@/assets/paper-reverse.svg"
            alt="Le papier"
            :class="enemyEndgameColorClass"
          />
          <img
            v-else-if="enemyData.chosenItem === 'scissors'"
            src="@/assets/scissors-reverse.svg"
            alt="Les ciseaux"
            :class="enemyEndgameColorClass"
          />
        </div>
      </div>
    </n-collapse-transition>

    <div>
      <n-text>Score : </n-text>
      <n-text>{{}}</n-text>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
    ...mapState("game", ["chosenItem", "enemyData"]),

    enemyEndgameColorClass() {
      if (this.localOutcome === "victory") return "defeat";
      if (this.localOutcome === "defeat") return "victory";

      return "equality";
    },
  },

  watch: {
    enemyData(newValue) {
      // console.log("watch enemy data", newValue);
      if (newValue.length === 0) return;
      if (this.chosenItem === "")
        this.createInfoMessage(`${newValue.username} a choisi son coup`);
      this.checkResult();
    },
  },

  mounted() {
    this.listenPlayToRockPaperScissors();
    this.resetEnemyData();
    this.changeChosenItem("");
  },

  beforeUnmount() {
    this.resetEnemyData();
    this.changeChosenItem("");
  },

  methods: {
    ...mapActions("player", ["changeOutcome"]),
    ...mapActions("game", [
      "emitPlayToRockPaperScissors",
      "listenPlayToRockPaperScissors",
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
        this.gameOver("equality");
      }
    },

    checkVictory(enemyItem) {
      if (
        (enemyItem === "rock" && this.chosenItem === "paper") ||
        (enemyItem === "paper" && this.chosenItem === "scissors") ||
        (enemyItem === "scissors" && this.chosenItem === "rock")
      ) {
        this.gameOver("victory");
      }
    },

    checkDefeat(enemyItem) {
      if (
        (enemyItem === "rock" && this.chosenItem === "scissors") ||
        (enemyItem === "paper" && this.chosenItem === "rock") ||
        (enemyItem === "scissors" && this.chosenItem === "paper")
      ) {
        this.gameOver("defeat");
      }
    },

    async gameOver(way) {
      this.localOutcome = way;
      this.displayChoices = false;
      this.displayEndgame = true;

      await this.sleep(2000);

      this.displayEndgame = false;

      this.changeOutcome(way);
    },
  },
};
</script>

<style lang="less" scoped>
.choices {
  display: flex;
  justify-content: space-evenly;
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

    // #e88080
    // filter: brightness(0) saturate(100%) invert(53%) sepia(17%) saturate(1351%)
    //   hue-rotate(312deg) brightness(112%) contrast(82%);
    // #63e2b7
    // filter: brightness(0) saturate(100%) invert(81%) sepia(34%) saturate(568%)
    //   hue-rotate(102deg) brightness(93%) contrast(92%);
    // #f2c97d
    // filter: brightness(0) saturate(100%) invert(87%) sepia(17%) saturate(1176%)
    //   hue-rotate(339deg) brightness(98%) contrast(94%);
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

  div {
    img {
      width: 300px;
      height: auto;
    }

    .victory {
      filter: brightness(0) saturate(100%) invert(81%) sepia(34%) saturate(568%)
        hue-rotate(102deg) brightness(93%) contrast(92%);
    }
    .defeat {
      filter: brightness(0) saturate(100%) invert(53%) sepia(17%)
        saturate(1351%) hue-rotate(312deg) brightness(112%) contrast(82%);
    }
    .equality {
      filter: brightness(0) saturate(100%) invert(87%) sepia(17%)
        saturate(1176%) hue-rotate(339deg) brightness(98%) contrast(94%);
    }
  }
}

@media screen and (max-width: 500px) {
  .choices {
    flex-direction: column;
  }
}
</style>