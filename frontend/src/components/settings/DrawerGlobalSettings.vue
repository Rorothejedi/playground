<template>
  <div>
    <n-button circle @click="drawer = true">
      <template #icon>
        <n-icon size="22">
          <settings-24-regular />
        </n-icon>
      </template>
    </n-button>

    <n-drawer
      v-model:show="drawer"
      :width="isMobile ? windowWidth : 400"
      style="background-color: #18181c"
    >
      <n-drawer-content title="Paramètres généraux" closable>
        <n-divider title-placement="left">
          <n-tag round size="large">
            Pseudo
            <template #avatar>
              <n-avatar>
                <n-icon>
                  <person-24-regular />
                </n-icon>
              </n-avatar>
            </template>
          </n-tag>
        </n-divider>

        <n-input-group>
          <n-input
            v-model:value="localUsername"
            ref="usernameInput"
            type="text"
            placeholder="ex: Toto"
            maxlength="30"
            show-count
          />
          <n-button @click="editUsername()" :disabled="localUsername === ''">
            Choisir
          </n-button>
        </n-input-group>

        <n-divider title-placement="left">
          <n-tag round size="large">
            Langue
            <template #avatar>
              <n-avatar>
                <n-icon>
                  <local-language-24-regular />
                </n-icon>
              </n-avatar>
            </template>
          </n-tag>
        </n-divider>

        <n-select
          disabled
          v-model:value="selectedLanguage"
          :options="[
            {
              label: 'Français',
              value: 'french',
            },
            {
              label: 'English',
              value: 'english',
            },
          ]"
        />

        <template #footer>
          <n-button @click="drawer = false">Fermer</n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import {
  Settings24Regular,
  Person24Regular,
  LocalLanguage24Regular,
} from "@vicons/fluent";

export default {
  name: "DrawerGlobalSettings",
  components: {
    Settings24Regular,
    Person24Regular,
    LocalLanguage24Regular,
  },
  props: ["isMobile", "windowWidth"],

  data() {
    return {
      drawer: false,
      localUsername: "",
      selectedLanguage: "french",
    };
  },

  computed: {
    ...mapState("player", ["username"]),
  },

  watch: {
    drawer(value) {
      if (value) this.displayDefaultValues();
    },
  },

  created() {
    this.displayDefaultValues();
  },

  methods: {
    ...mapActions("player", ["changeUsername"]),

    displayDefaultValues() {
      if (this.username === "") return;

      this.localUsername = this.username;
    },

    editUsername() {
      this.changeUsername(this.localUsername);

      window.$message.success(`${this.localUsername}, quel beau pseudo !`);
    },
  },
};
</script>

<style lang="less" scoped>
</style>