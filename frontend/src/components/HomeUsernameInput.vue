<template>
  <div class="username">
    <kinesis-element :strength="1" type="depth">
      <n-h1 class="username-title" v-if="username === ''"> Playground </n-h1>
    </kinesis-element>
    <kinesis-element :strength="testCard" type="depth" class="username">
      <n-card class="username-card" :bordered="true">
        <kinesis-element :strength="testInput + 3" type="depth">
          <n-h3>{{ $t("hello.label") }}</n-h3>
        </kinesis-element>
        <!-- <n-input-group> -->
        <!-- <n-space vertical align="end"> -->
        <kinesis-element :strength="testInput" type="depth">
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
        </kinesis-element>
        <kinesis-element :strength="testInput + 5" type="depth">
          <n-button
            circle
            @click="addUsername()"
            :disabled="localUsername === ''"
            size="large"
          >
            {{ $t("actions.choose") }}
          </n-button>
        </kinesis-element>
        <!-- </n-space> -->

        <!-- </n-input-group> -->
      </n-card>
    </kinesis-element>

    <n-space>
      <n-button @click="testCard = testCard + 1">depth card +</n-button>
      <n-button @click="testCard = testCard - 1">depth card -</n-button>
      <n-button @click="testInput = testInput + 1">depth input +</n-button>
      <n-button @click="testInput = testInput - 1">depth input -</n-button>
    </n-space>
    <n-text> testCard: {{ testCard }} </n-text>
    <n-text> testInput: {{ testInput }} </n-text>

    <!-- <kinesis-element :strength="30" type="depth">
      <n-button>Test</n-button>
    </kinesis-element> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "HomeUsernameInput",

  data() {
    return {
      localUsername: "",
      usernamePlaceholder: "",

      testCard: 13,
      testInput: 15,
    };
  },

  computed: {
    ...mapState("player", ["username"]),
  },

  async mounted() {
    this.randomUsernamePlaceholder();

    await this.$nextTick();

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
  width: -webkit-fill-available;

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