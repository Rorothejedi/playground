<template>
  <div>
    <n-divider title-placement="left">
      <n-tag round size="large">
        Couleurs
        <template #avatar>
          <n-avatar>
            <n-icon>
              <color-24-regular />
            </n-icon>
          </n-avatar>
        </template>
      </n-tag>
    </n-divider>

    Moi
    <n-color-picker
      :show-alpha="false"
      :show-preview="true"
      :actions="['confirm']"
      :modes="['hex']"
      :swatches="['#FFFFFF', '#63e2b7', '#e88080']"
      v-model:value="localColorPlayer"
      @confirm="editColorPlayer"
    />

    Adversaire
    <n-color-picker
      :show-alpha="false"
      :actions="['confirm', 'reset']"
      :modes="['hex']"
      :swatches="['#FFFFFF', '#63e2b7', '#e88080']"
      default-value="#e88080"
      :value="localColorEnemy"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Color24Regular } from "@vicons/fluent";

export default {
  name: "ChangeColors",
  components: {
    Color24Regular,
  },

  data() {
    return {
      localColorPlayer: "",
      localColorEnemy: "",
    };
  },

  computed: {
    ...mapState("morpion", ["colorPlayer", "colorEnemy"]),
  },

  created() {
    if (this.localColorPlayer === "") this.localColorPlayer = this.colorPlayer;
    if (this.localColorEnemy === "") this.localColorEnemy = this.colorEnemy;
  },

  methods: {
    ...mapActions("morpion", ["changeColorPlayer", "changeColorEnemy"]),

    editColorPlayer(value) {
      console.log(value);
      this.changeColorPlayer(value);
    },
  },
};
</script>