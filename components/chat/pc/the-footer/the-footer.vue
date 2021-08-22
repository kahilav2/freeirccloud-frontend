<template>
  <footer>
    <div class="left">
      <UserName :userName="userName"/>
    </div>
    <div class="right">
      <UserClock/>
      <div class="message-input-container">
        <MessageInput
          @send="onSend"
          :isDisabled="isDisabled"
          :openChannel="openChannel"
          :showTime="true"
          :showPlaceholder="showInputPlaceholder"
        />
      </div>
      <FileUploadButton :isDisabled="isDisabled"/>
      <VContainerButton>
      <VButtonIcon
          @click="onSend"
          :src="'send-white.svg'"
          :isDisabled="isDisabled"
        />
      </VContainerButton>
    </div>
  </footer>
</template>

<script>
import { no } from '~/utils/common';
import { processAndUploadImage } from '~/utils/firebase';
import MessageInput from '~/components/chat/pc/the-footer/message-input.vue';
import FileUploadButton from '~/components/chat/pc/the-footer/file-upload-button.vue';
import UserName from '~/components/chat/pc/the-footer/user-name.vue';
import VContainerButton from '~/components/shared/pc/v-container-button.vue';
import VButtonIcon from '~/components/shared/pc/v-button-icon.vue';
import UserClock from '~/components/chat/pc/the-footer/user-clock.vue';

export default {
  components: {
    MessageInput,
    FileUploadButton,
    UserName,
    VContainerButton,
    VButtonIcon,
    UserClock,
  },
  props: {
    userSession: Object,
  },
  data() {
    return {
      showInputPlaceholder: true,
    };
  },
  computed: {
    input() { return this.$store.getters['app/get'].input; },

    isDisabled() {
      return this.isConnectionClosed || this.isUploading || !this.isOpenChannelReady;
    },
    isOpenChannelReady() {
      return (this.openChannel !== null && this.openChannel !== undefined && this.openChannel.isReady());
    },
    isUploading() { return this.$store.getters['app/get'].isUploading; },

    isConnectionClosed() { return this.$store.getters['app/get'].isConnectionClosed; },

    userName() {
      return (this.openChannel) ? this.openChannel.getServer().getUserName() : '...';
    },
    openChannel() {
      const server = this.userSession.getServers()[this.$store.getters['app/get'].openServerIndex];
      if (!server) return null;
      const channels = server.getChannels();
      if (no(channels)) { return null; }
      const { openChannelIndex } = this.$store.getters['app/get'];
      if (openChannelIndex === null) return null;

      return channels[openChannelIndex];
    },
  },
  mounted() {
    window.addEventListener('keypress', this.onKeyPress, false);
  },
  beforeDestroy() {
    window.removeEventListener('keypress', this.onKeyPress, false);
  },
  methods: {
    onSend() {
      let { input } = this;
      this.$store.commit('app/set', { input: '' });
      if (input === '') { return; }

      this.showInputPlaceholder = false;

      const noCaseInput = input.toLowerCase();

      if (noCaseInput === '/part' || noCaseInput === '/close') { input = `/part ${this.openChannel.getChannelName()}`; }
      if (noCaseInput.startsWith('/j ')) { input = `/join${input.substring(2)}`; }
      if (noCaseInput.startsWith('/msg ')) { input = `/message${input.substring(4)}`; }

      if (this.openChannel === undefined) {
        console.error('openChannel undef');
        return;
      }
      this.userSession.sendUserInput(input, this.openChannel.getServer().getServerURL(), this.openChannel.getChannelName());
    },
    onKeyPress(e) {
      this.$store.commit('app/set', { shiftKeyPressed: e.shiftKey });

      if (!e.altKey) { this.$store.commit('app/set', { tabFillCandidateIndex: 0 }); }
      if (e.ctrlKey || e.altKey) { return; }
      if (document.activeElement !== this.$root.$el.querySelector('#input')) {
        this.$root.$el.querySelector('#input').focus();
      }
    },

    handleFileChange(event) {
      const imageData = event.target.files[0];

      const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!imageData || !IMAGE_TYPES.includes(imageData.type)) { return; }
      this.uploading = true;
      processAndUploadImage(imageData, this.handleUploadFinished, this.updateUploadProgress);
    },
  },
};
</script>

<style lang="scss" scoped>
.message-input-container {
  width: calc(100vw - var(--left-side-bar-width) - var(--page-margin) - 150px - 30px);
  height: 35px;
  margin-right: 20px;
  display: inline-block;
}
.input-container {
  border-top: 1px solid var(--quaternary-color);
  padding-top: 6px;
  height: 45px;
  padding-right: 100px;
}
footer {
  width: 100vw;
  height: var(--footer-height);
}
.left {
  display: inline-block;
  width: var(--left-side-bar-width);
  height: calc(var(--header-height) - var(--page-margin));
  padding-left: calc(3 * var(--page-margin));
  padding-top: calc(var(--horizontal-panel-height) / 3);
}
.right {
  display: inline-block;
}
</style>
