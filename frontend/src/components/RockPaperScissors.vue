<template>
  <div>
    <div class="choices" v-if="displayChoices">
      <div class="choice">
        <img
          src="@/assets/rock.svg"
          alt="La pierre"
          @click="chooseItem('rock')"
          :class="{
            chosen: itemChosen === 'rock',
            'disabled-item': itemChosen !== '',
          }"
        />
      </div>
      <div class="choice">
        <img
          src="@/assets/paper.svg"
          alt="Le papier"
          @click="chooseItem('paper')"
          :class="{
            chosen: itemChosen === 'paper',
            'disabled-item': itemChosen !== '',
          }"
        />
      </div>
      <div class="choice">
        <img
          src="@/assets/scissors.svg"
          alt="Les ciseaux"
          @click="chooseItem('scissors')"
          :class="{
            chosen: itemChosen === 'scissors',
            'disabled-item': itemChosen !== '',
          }"
        />
      </div>
    </div>

    <n-collapse-transition :show="displayEndgame">
      <div class="endgame">
        <div>
          <img
            v-if="itemChosen === 'rock'"
            src="@/assets/rock.svg"
            alt="La pierre"
            :class="localOutcome"
          />
          <img
            v-else-if="itemChosen === 'paper'"
            src="@/assets/paper.svg"
            alt="Le papier"
            :class="localOutcome"
          />
          <img
            v-else-if="itemChosen === 'scissors'"
            src="@/assets/scissors.svg"
            alt="Les ciseaux"
            :class="localOutcome"
          />
        </div>

        <n-text italic>VS</n-text>

        <div>
          <img
            v-if="enemyData[0].itemChosen === 'rock'"
            src="@/assets/rock-reverse.svg"
            alt="La pierre"
            :class="enemyEndgameColorClass"
          />
          <img
            v-else-if="enemyData[0].itemChosen === 'paper'"
            src="@/assets/paper-reverse.svg"
            alt="Le papier"
            :class="enemyEndgameColorClass"
          />
          <img
            v-else-if="enemyData[0].itemChosen === 'scissors'"
            src="@/assets/scissors-reverse.svg"
            alt="Les ciseaux"
            :class="enemyEndgameColorClass"
          />
        </div>
      </div>
    </n-collapse-transition>
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
    ...mapState("player", ["itemChosen"]),
    ...mapState("game", ["enemyData"]),

    enemyEndgameColorClass() {
      if (this.localOutcome === "win") return "defeat";
      if (this.localOutcome === "defeat") return "win";
      return "equality";
    },
  },

  watch: {
    enemyData(newValue) {
      if (this.itemChosen === "")
        this.createInfoMessage(`${newValue[0].username} a choisi son coup`);
      this.checkResult();
    },
  },

  mounted() {
    this.listenPlay();
    this.resetEnemyData();
    this.changeItemChosen("");
  },

  beforeUnmount() {
    this.resetEnemyData();
    this.changeItemChosen("");
  },

  methods: {
    ...mapActions("player", ["changeItemChosen", "changeOutcome"]),
    ...mapActions("game", ["emitPlay", "listenPlay", "resetEnemyData"]),

    chooseItem(item) {
      if (this.itemChosen !== "") return;

      this.changeItemChosen(item);
      this.emitPlay();
      this.checkResult();
    },

    checkResult() {
      if (this.enemyData.length === 0 || this.itemChosen === "") return;

      const enemyItem = this.enemyData[0].itemChosen;

      this.removeMessage();

      this.checkEquality(enemyItem);
      this.checkVictory(enemyItem);
      this.checkDefeat(enemyItem);
    },

    checkEquality(enemyItem) {
      if (
        (enemyItem === "rock" && this.itemChosen === "rock") ||
        (enemyItem === "paper" && this.itemChosen === "paper") ||
        (enemyItem === "scissors" && this.itemChosen === "scissors")
      ) {
        this.gameOver("equality");
      }
    },

    checkVictory(enemyItem) {
      if (
        (enemyItem === "rock" && this.itemChosen === "paper") ||
        (enemyItem === "paper" && this.itemChosen === "scissors") ||
        (enemyItem === "scissors" && this.itemChosen === "rock")
      ) {
        this.gameOver("win");
      }
    },

    checkDefeat(enemyItem) {
      if (
        (enemyItem === "rock" && this.itemChosen === "scissors") ||
        (enemyItem === "paper" && this.itemChosen === "rock") ||
        (enemyItem === "scissors" && this.itemChosen === "paper")
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

    .win {
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