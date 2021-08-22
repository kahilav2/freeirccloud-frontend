<template>
  <div>
    <ModalTemplate @backgroundClicked="close" :styles="contents.styles.template">
      <h3 v-html="contents.body"/>
      <hr class="space">
      <div>
        User: {{ email }}
        <br>
        <br>
        Theme:
        <VButton @click="switchTheme">
          {{ switchThemeButtonLabel }}
        </VButton>
        <span class="unimportant">(for pc)</span>
        <br>
        <br>
        Sounds:
        <VButton @click="switchSounds">
          {{ switchSoundsButtonLabel }}
        </VButton>
        <span class="unimportant">(for this device only)</span>
      </div>
      <div class="modal-btn">
        <VButton @click="confirm">{{contents.confirm}}</VButton>
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
    const contents = this.getContents();
    return {
      contents,
    };
  },
  mounted() {
    this.$userAPI.getSettings({});
  },
  computed: {
    isSoundOn: {
      get() { return this.$store.getters['app/get'].isSoundOn; },
      set(isSoundOn) { this.$store.dispatch('app/set', { isSoundOn }); },
    },
    switchThemeButtonLabel() {
      return this.$store.getters['app/getThemeText'];
    },
    switchSoundsButtonLabel() {
      return this.isSoundOn ? 'On' : 'Off';
    },
    email() {
      return this.$store.getters['user/get'].email;
    },
  },
  methods: {
    getContents() {
      return this.$getConst('modalContents', this.contentID)[this.contentID];
    },
    getIsSoundOn() {
      return window.localStorage.getItem('isSoundOn') === '1';
    },
    refreshIsSoundOn() {
      this.isSoundOn = this.getIsSoundOn();
    },
    switchSounds() {
      this.setIsSoundOnCookie(!this.isSoundOn);
      this.refreshIsSoundOn();
    },
    setIsSoundOnCookie(isSoundOn) {
      window.localStorage.setItem('isSoundOn', isSoundOn ? '1' : '0');
    },
    confirm() {
      const payload = {};
      this.killAndEmitSuccess(payload);
    },
    switchTheme() {
      this.$store.dispatch('app/switchTheme', { ctx: this });
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
