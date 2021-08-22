<template>
  <div class="container">
    <input :value="input"
      @keydown.shift="setShiftPressed(true)"
      @paste="onPaste"
      @input="onInputChange"
      @focus="$store.dispatch('app/set', { isClockBright: true })"
      @blur="$store.dispatch('app/set', { isClockBright: false })"
      :placeholder="showPlaceholder ? placeholder : ''"
      class="message-input"
      :class="{ 'show-time': showTime }"
      autocomplete="off"
      v-on:keydown.exact.enter="$emit('send', {})"
      @keydown.exact.tab="onTab"
      :maxlength="$getConst('settings.tooLongTextThreshold')"
      id="input"
      :disabled="isDisabled">
    <span class="message-input-border"/>
  </div>
</template>

<script>
import { processAndUploadText, processAndUploadImage } from '~/utils/firebase';

export default {
  components: {
  },
  props: {
    isDisabled: Boolean,
    showPlaceholder: Boolean,
    showTime: Boolean,
    openChannel: Object,
  },
  data() {
    return {
      placeholder: this.$getConst('placeholders.messageInput'),
      shiftPressed: false,
    };
  },
  mounted() {
    window.addEventListener('keyup', this.onKeyUp);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onKeyUp);
  },
  computed: {
    tabFillCandidateIndex() { return this.$store.getters['app/get'].tabFillCandidateIndex; },
    input() { return this.$store.getters['app/get'].input; },
  },
  methods: {
    onKeyUp(e) {
      if (e.keyCode === 16) {
        this.setShiftPressed(false);
      }
    },
    setShiftPressed(shiftPressed) { this.shiftPressed = shiftPressed; },

    onInputChange(e) {
      this.$store.commit('app/set', { input: e.target.value });
    },
    onPaste(e) {
      const { clipboardData } = e;

      const hasImageFiles = clipboardData.files.length > 0 && clipboardData.files[0].type === 'image/png';
      if (hasImageFiles) {
        e.preventDefault();
        this.$store.commit('app/set', { isUploading: true });
        const imageData = clipboardData.files[0];
        processAndUploadImage(imageData, this.handleUploadFinished, this.updateUploadProgress);
        return;
      }
      const clipboardText = clipboardData.getData('text');
      const textTooLongForIRC = clipboardText.length > this.$getConst('settings.tooLongTextThreshold');
      if (textTooLongForIRC && !this.shiftPressed) {
        e.preventDefault();
        this.$store.commit('app/set', { isUploading: true });
        processAndUploadText(clipboardText, this.handleUploadFinished, this.updateUploadProgress);
      }
    },

    onTab(event) {
      event.preventDefault();

      const parts = this.input.split(' ');
      if (parts.length === 0) { return; }
      const lastPart = parts[parts.length - 1].toLowerCase();
      if (lastPart === '') { return; }
      const candidates = this.openChannel
        .getUsers()
        .map((user) => (
          { userName: user.userName, userNameLower: user.userName.toLowerCase() }))
        .filter((user) => user.userNameLower.startsWith(lastPart));

      if (candidates.length === 0) { return; }
      const newLastPart = `${candidates[this.tabFillCandidateIndex % (candidates.length)].userName} `;
      const withoutLastPart = parts.slice(0, parts.length - 1).join(' ');

      const newInput = (withoutLastPart !== '') ? (`${withoutLastPart} ${newLastPart}`) : newLastPart;
      this.$store.commit('app/set', { input: newInput });

      this.$store.commit('app/set', { tabFillCandidateIndex: this.tabFillCandidateIndex + 1 });
    },
    updateUploadProgress(percentage) {
      this.$store.commit('app/set', { input: `${percentage}%` });
    },
    handleUploadFinished(url) {
      this.$store.commit('app/set', { input: url, isUploading: false });
    },
  },
};
</script>
<style lang="scss" scoped>
.message-input {
  border-bottom: 2px solid #193f79;
  border-right: 0;
  border-left: 0;
  border-top: 0;
  width: 100%;
  height: 100%;
  font-size: 18px;
  color: var(--font-color);
  padding-left: 8px;
  background-color: var(--app-background-color);
  position: relative;

  padding: 5px 10px;
}
.message-input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #193f79;
  opacity: 1; /* Firefox */
}
.message-input:focus {
  &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #3d7ad6;
    opacity: 1; /* Firefox */
  }
}

.message-input-border {
  display:inline-block;
  width: 0;
  left: 50%;
  height: 2px;
  background: #3d7ad6;
  position: absolute;
  top: 33px;
  -webkit-transition: all ease-in-out .15s;
  -o-transition: all ease-in-out .15s;
  transition: all ease-in-out .15s;
}
.message-input:hover,
.message-input:active,
.message-input:focus{
  outline: none;
}
.message-input:active+.message-input-border,
.message-input:focus+.message-input-border {
  width:100%;
  left: 0px;
}
.container {
  display: inline-block;
  position: relative;
  height: 35px;
  width: 100%;
  left: 0;
}

</style>
