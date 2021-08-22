<template>
  <div>
    <ModalTemplate @backgroundClicked="close" :styles="contents.styles.template">
      <h3> Help </h3>
      <hr class="space">
      <div>
        <p>/connect quakenet - Connects QuakeNet</p>
        <p>/connect ircnet</p>
        <p>/disconnect quakenet - Disconnects QuakeNet </p>
        <p>/join #freeirc - Joins #freeirc</p>
        <p>/part #freeirc - Exits #freeirc</p>
        <p>/part, /close - Closes current chat window</p>
        <p>/nick John - changes IRC nick to John</p>
        <p>/topic Happy new year - Sets topic for the channel</p>
        <p>/op Mike - adds ops to Mike</p>
        <p>/deop Mike - removes ops from Mike</p>
        <p>/kick Mike - Kicks user Mike</p>
        <p>/msg Mike Hello! - sends a message to Mike</p>
        <p>/message Mike Hello!</p>
        <p>/whois Mike - retrieves information about Mike</p>
        <br>
        <p>Bugs reports and suggestions to #freeirc@quakenet or freeIRC.cloud@gmail.com</p>
      </div>
      <div class="modal-btn">
        <VButton @click="confirm"> Thanks, that was helpful!</VButton>
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
</style>
