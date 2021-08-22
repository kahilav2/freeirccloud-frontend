<template>
  <div>
    <ModalTemplate @backgroundClicked="close" :styles="contents.styles.template">
      <h3> Users </h3>
      <hr class="space">
      <div class="user-list">
        <div v-for="(user, index) in userList" :key="index" class="item">
            {{ user.status + user.userName }}
        </div>

      </div>
      <div class="modal-btn">
        <VButton @click="confirm">Close</VButton>
      </div>
    </ModalTemplate>
  </div>
</template>

<script>

import VButton from '~/components/shared/pc/v-button.vue';
import ModalTemplate from '~/components/shared/modals/templates/modal-template.vue';
import ModalBase from '~/mixins/modal-base';

export default {
  extends: ModalBase,
  components: {
    ModalTemplate,
    VButton,
  },
  props: {
    contentID: {
      type: String,
      required: true,
    },
    userList: {
      type: Array,
      required: true,
    },
  },
  data() {
    const contents = this.$getConst('modalContents', this.contentID)[this.contentID];
    return {
      contents,
    };
  },
  methods: {
    getContents() {
      return this.$getConst('modalContents', this.contentID)[this.contentID];
    },
    confirm() {
      const payload = {};
      this.killAndEmitSuccess(payload);
    },
  },
};
</script>
<style scoped>
.unimportant {
  color: var(--quaternary-color);
  font-size: 16px;
}
.user-list {
  max-height: 60vh;
  overflow-y: scroll;
}
</style>
