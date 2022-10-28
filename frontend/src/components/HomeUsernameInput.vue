<template>
  <div class="username">
    <n-h1 class="username-title" v-if="username === ''"> Playground </n-h1>
    <div class="username-card">
      <n-card title="Ton pseudo">
        <n-input-group>
          <n-input
            v-model:value="localUsername"
            ref="usernameInput"
            type="text"
            placeholder="ex: Toto"
            maxlength="30"
            show-count
          />
          <n-button @click="addUsername()" :disabled="localUsername === ''">
            Choisir
          </n-button>
        </n-input-group>
      </n-card>
    </div>
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
    if (this.username !== "") return;

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
  margin: 50px auto;
}
.username-title {
  display: flex;
  justify-content: center;
  font-family: "Major Mono Display", monospace;
  margin-bottom: 50px;
  font-size: 3em;
}

.username-card {
  display: flex;
  justify-content: center;
  padding-bottom: 25px;

  .n-card {
    max-width: 600px;
  }
}
</style>