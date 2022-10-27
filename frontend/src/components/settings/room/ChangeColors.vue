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
      :modes="['hex']"
      :swatches="swatchesColor"
      v-model:value="localColorPlayer"
      @update:value="editColorPlayer"
    />

    Adversaire
    <n-color-picker
      :show-alpha="false"
      :modes="['hex']"
      :swatches="swatchesColor"
      v-model:value="localColorEnemy"
      @update:value="editColorEnemy"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Color24Regular } from "@vicons/fluent";

export default {
  name: "ChangeColors",
  components: {
    Color24Regular,
  },
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      localColorPlayer: "",
      localColorEnemy: "",

      swatchesColor: ["#FFFFFF", "#63e2b7", "#e88080", "#f08a00", "#3889c5"],
    };
  },

  computed: {
    colorPlayer() {
      return this.$store.state[this.namespace].colorPlayer;
    },
    colorEnemy() {
      return this.$store.state[this.namespace].colorEnemy;
    },
  },

  created() {
    if (this.localColorPlayer === "") this.localColorPlayer = this.colorPlayer;
    if (this.localColorEnemy === "") this.localColorEnemy = this.colorEnemy;
  },

  methods: {
    ...mapActions({
      changeColorPlayer(dispatch, payload) {
        return dispatch(this.namespace + "/changeColorPlayer", payload);
      },

      changeColorEnemy(dispatch, payload) {
        return dispatch(this.namespace + "/changeColorEnemy", payload);
      },
    }),

    editColorPlayer(value) {
      this.changeColorPlayer(value);
    },

    editColorEnemy(value) {
      this.changeColorEnemy(value);
    },
  },
};
</script>