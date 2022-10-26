<template>
  <div>
    <n-divider title-placement="left">
      <n-tag round size="large">
        Inviter un ami
        <template #avatar>
          <n-avatar>
            <n-icon>
              <person-add-24-regular />
            </n-icon>
          </n-avatar>
        </template>
      </n-tag>
    </n-divider>

    <n-space vertical>
      <n-input-group>
        <n-input
          readonly
          :default-value="linkToCopy"
          @click="$refs.linkInput.select()"
          ref="linkInput"
        />
        <n-button @click="copyLinkToClipboard()" title="Copier le lien">
          <template #icon>
            <n-icon size="22">
              <copy-select-20-regular v-if="!isLinkCopied" />
              <checkmark-24-regular v-else />
            </n-icon>
          </template>
        </n-button>
      </n-input-group>

      <n-text italic depth="3">
        Partage le lien ci-dessus à la personne de ton choix pour jouer ensemble
        !
      </n-text>
    </n-space>
  </div>
</template>

<script>
import utils from "@/mixins/utils.js";
import {
  PersonAdd24Regular,
  CopySelect20Regular,
  Checkmark24Regular,
} from "@vicons/fluent";

export default {
  name: "InviteFriend",
  components: {
    PersonAdd24Regular,
    CopySelect20Regular,
    Checkmark24Regular,
  },
  mixins: [utils],

  data() {
    return {
      isLinkCopied: false,
    };
  },

  computed: {
    linkToCopy() {
      const url = process.env.VUE_APP_BASE_URL;
      const fullPath = this.$route.fullPath;

      return url + fullPath;
    },
  },

  methods: {
    async copyLinkToClipboard() {
      if (this.isLinkCopied) return;

      await navigator.clipboard.writeText(this.linkToCopy);

      this.isLinkCopied = true;

      window.$message.success("Lien copié !");

      await this.sleep(3000);

      this.isLinkCopied = false;
    },
  },
};
</script>