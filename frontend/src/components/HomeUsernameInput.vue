<template>
  <div class="username">
    <n-h1 class="username-title" v-if="username === ''"> Playground </n-h1>
    <n-card title="Ton pseudo" class="username-card" :bordered="false">
      <n-input-group>
        <n-input
          v-model:value="localUsername"
          ref="usernameInput"
          type="text"
          size="large"
          placeholder="ex: Toto"
          maxlength="30"
          show-count
        />
        <n-button
          @click="addUsername()"
          :disabled="localUsername === ''"
          size="large"
        >
          Choisir
        </n-button>
      </n-input-group>
    </n-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import utils from "@/mixins/utils.js";

export default {
  name: "HomeUsernameInput",
  mixins: [utils],

  data() {
    return {
      localUsername: "",
    };
  },

  computed: {
    ...mapState("player", ["username"]),
  },

  async mounted() {
    await this.sleep(100);

    this.$refs.usernameInput.focus();
  },

  methods: {
    ...mapActions("player", ["changeUsername"]),

    addUsername() {
      this.changeUsername(this.localUsername);
    },
  },
};
</script>

<style lang="less" scoped>
.username {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .username-title {
    font-family: "Major Mono Display", monospace;
    margin-top: 17vh;
    margin-bottom: 10vh;
    font-size: 3em;
    color: #63e2b7;
  }
  .n-card {
    max-width: 600px;
  }
}
</style>