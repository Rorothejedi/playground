<template>
  <div class="end-game">
    <n-result
      :status="statusEndGame"
      :title="titleEndGame"
      :description="descriptionEndGame"
    >
      <template #footer>
        <n-button @click="restartGame()" v-if="host && outcome">
          Rejouer
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
      if (this.outcome === "defeat") return "Défaite";
      if (this.outcome === "victory") return "Victoire";

      return "Egalité";
    },
    descriptionEndGame() {
      if (this.outcome === "defeat")
        return "Aïe ! Pourquoi ne pas retenter votre chance ?";
      if (this.outcome === "victory")
        return "Trop facile ! Vous prendrez bien un thé ?";

      return "Bizarre... J'était pourtant sûr que vous alliez l'avoir !";
    },
  },

  //   beforeUnmount() {
  //     this.changeReplay(false);
  //   },

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