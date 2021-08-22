<template>
  <div class="navigation-bar">
    <VButton @click="logout" class="item">
      Log out
    </VButton>
    <VButton @click="openSettings" class="item">
      Settings
    </VButton>
    <VButton @click="openHelp" class="item">
      Help
    </VButton>
  </div>
</template>
<script>
import VButton from '~/components/shared/pc/v-button.vue';

import FireBaseActions from '~/mixins/firebase-actions';
import ModalFactory from '~/utils/factories/modal-factory';

export default {
  mixins: [FireBaseActions],
  components: {
    VButton,
  },
  props: {
    userSession: Object,
  },
  methods: {
    openSettings() {
      new ModalFactory(this).createSettingsModal({ contentID: 'settings' }, () => {});
    },
    openHelp() {
      new ModalFactory(this).createHelpModal({ contentID: 'help' }, () => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.navigation-bar {
  display: flex;
  flex-direction: row-reverse;
}
.item {
  margin-left: 40px;
}
/deep/ .button {
  color: #8ca2c1;
  &:hover {
    color: var(--font-color);
  }
}
</style>
