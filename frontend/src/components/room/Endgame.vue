<template>
  <div class="end-game">
    <n-result
      :status="statusEndGame"
      :title="titleEndGame"
      :description="descriptionEndGame"
    >
      <template #footer>
        <n-button @click="restartGame()" v-if="host && outcome">
          {{ $t("actions.replay") }}
        </n-button>
        <n-spin v-else size="medium" />
      </template>
    </n-result>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Endgame",

  watch: {
    replay(newValue, oldValue) {
      if (newValue && !oldValue && !this.host) this.resetGame();
    },
  },

  computed: {
    ...mapState("player", ["host", "outcome"]),
    ...mapState("room", ["replay"]),

    statusEndGame() {
      if (this.outcome === "defeat") return "500";
      if (this.outcome === "victory") return "418";

      return "404";
    },
    titleEndGame() {
      if (this.outcome === "defeat") return this.$t("room.endgame.defeat");
      if (this.outcome === "victory") return this.$t("room.endgame.victory");

      return this.$t("room.endgame.equality");
    },
    descriptionEndGame() {
      if (this.outcome === "defeat") return this.$t("room.endgame.defeatText");
      if (this.outcome === "victory")
        return this.$t("room.endgame.victoryText");

      return this.$t("room.endgame.equalityText");
    },
  },

  methods: {
    ...mapActions("player", ["changeTurn", "changeIsWinner", "changeOutcome"]),
    ...mapActions("room", ["emitReplay", "changeReplay"]),

    restartGame() {
      this.emitReplay();
      this.resetGame();
    },

    resetGame() {
      const turn =
        this.outcome === "defeat" || (this.outcome === "equality" && this.host);

      this.changeTurn(turn);
      this.changeOutcome("");
      this.changeIsWinner(false);
      this.changeReplay(false);
    },
  },
};
</script>

<style lang="less" scoped>
.end-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 600px) {
  .end-game {
    height: calc(100vh - 154px);
  }
}
</style>