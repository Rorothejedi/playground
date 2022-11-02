<template>
  <div class="username">
    <n-h1 class="username-title" v-if="username === ''"> Playground </n-h1>
    <n-card :title="$t('hello.label')" class="username-card" :bordered="false">
      <n-input-group>
        <n-input
          v-model:value="localUsername"
          ref="usernameInput"
          type="text"
          size="large"
          :placeholder="`ex: ${usernamePlaceholder}`"
          maxlength="30"
          show-count
          @keyup.enter="localUsername !== '' ? addUsername() : ''"
        />
        <n-button
          @click="addUsername()"
          :disabled="localUsername === ''"
          size="large"
        >
          {{ $t("actions.choose") }}
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
      usernamePlaceholder: "",
    };
  },

  computed: {
    ...mapState("player", ["username"]),
  },

  async mounted() {
    await this.sleep(100);

    this.randomUsernamePlaceholder();

    this.$refs.usernameInput.focus();
  },

  methods: {
    ...mapActions("player", ["changeUsername"]),

    addUsername() {
      this.changeUsername(this.localUsername);
    },

    randomUsernamePlaceholder() {
      const famousCharacters = [
        "Katniss Everdeen",
        "Beatrix Kiddo",
        "Sarah Connor",
        "Ellen Ripley",
        "Mercredi Addams",
        "Imperator Furiosa",
        "Leia Organa",
        "Lara Croft",
        "Barbara Gordon",
        "O-Ren Ishii",
        "Hermione Granger",
        "Claire Bennet",
        "Lisa Simpson",
        "Sansa Stark",
        "Elena Fisher",
        "Tifa Lockhart",
        "John McClane",
        "Korben Dallas",
        "John Shepard",
        "Sheldon Cooper",
        "Vincent Vega",
        "John Rambo",
        "Ramsay Bolton",
        "James Crochet",
        "Ronon Dex",
        "Charles Xavier",
        "Mia Wallace",
        "Mr Blonde",
        "Aldo Raine",
        "Kyle Broflovski",
        "Barney Stinson",
        "Johnny Rico",
        "Thomas Anderson",
        "Emmett Brown",
        "James Bond",
        "Luke Skywalker",
        "Inigo Montoya",
        "Tony Montana",
        "Vito Corleone",
        "Rick Deckard",
        "Maximus Decimus Meridius",
        "Trinity",
        "Neo",
        "Harley Quinn",
        "Samantha Carter",
        "Jack O'Neill",
        "Daniel Jackson",
        "Rodney McKay",
        "Vala Mal Doran",
        "Garrus Vakarian",
        "Miranda Lawson",
        "Tali'Zorah vas Normandy",
        "Sauron",
        "Samsagace Gamegie",
        "Peregrin Touque",
        "Tom Bombadil",
        "Meriadoc Brandebouc",
        "Finrod Felagund",
        "Wilhuff Tarkin",
        "Mon Mothma",
        "Mara Jade",
        "Kyle Katarn",
        "Daenerys Targaryen",
        "Samus Aran",
      ];

      const randomIndex = Math.floor(Math.random() * famousCharacters.length);

      this.usernamePlaceholder = famousCharacters[randomIndex];
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