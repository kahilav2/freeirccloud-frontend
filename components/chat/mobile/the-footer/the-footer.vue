<template>
  <div>
    <div class="user-name">{{ userName }}</div>

    <div class="message-input-container">
      <MessageInput
        @send="onSend"
        :isDisabled="isDisabled"
        :openChannel="openChannel"
        :showTime="false"
        :showPlaceholder="false"
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
</template>

<script>
import { no } from '~/utils/common';
import { processAndUploadText, processAndUploadImage } from '~/utils/firebase';
import FileUploadButton from '~/components/chat/pc/the-footer/file-upload-button.vue';
import VContainerButton from '~/components/shared/pc/v-container-button.vue';
import VButtonIcon from '~/components/shared/pc/v-button-icon.vue';
import MessageInput from '~/components/chat/pc/the-footer/message-input.vue';

export default {
  components: {
    FileUploadButton,
    MessageInput,
    VContainerButton,
    VButtonIcon,
  },
  props: {
    userSession: Object,
  },
  computed: {
    isDisabled() {
      return this.isConnectionClosed || this.isUploading
                  || !(this.openChannel !== null && this.openChannel !== undefined && this.openChannel.isReady());
    },
    userName() {
      return (this.openChannel) ? this.openChannel.getServer().getUserName() : '...';
    },

    isUploading() { return this.$store.getters['app/get'].isUploading; },

    input() { return this.$store.getters['app/get'].input; },

    isConnectionClosed() {
      return this.$store.getters['app/get'].isConnectionClosed;
    },
    openChannel() {
      if (!this.userSession) return null;
      const server = this.userSession.getServers()[this.$store.getters['app/get'].openServerIndex];
      if (!server) return null;
      const channels = server.getChannels();
      if (no(channels)) { return null; }
      const { openChannelIndex } = this.$store.getters['app/get'];
      if (openChannelIndex === null) return null;

      return channels[openChannelIndex];
    },
  },
  methods: {
    onSend() {
      let { input } = this;
      this.$store.dispatch('app/set', { input: '' });
      if (input === '') { return; }

      const noCaseInput = input.toLowerCase();

      if (noCaseInput === '/part' || noCaseInput === '/close') { input = `/part ${this.openChannel.getChannelName()}`; }
      if (noCaseInput.startsWith('/j ')) { input = `/join${input.substring(2)}`; }
      if (noCaseInput.startsWith('/msg ')) { input = `/message${input.substring(4)}`; }

      if (this.openChannel === undefined) return;
      this.userSession.sendUserInput(input, this.openChannel.getServer().getServerURL(), this.openChannel.getChannelName());
    },
    onPaste(e) {
      const { clipboardData } = e;

      const hasImageFiles = clipboardData.files.length > 0 && clipboardData.files[0].type === 'image/png';
      if (hasImageFiles) {
        e.preventDefault();
        this.isUploading = true;
        const imageData = clipboardData.files[0];
        processAndUploadImage(imageData, this.handleUploadFinished, this.updateUploadProgress);
        return;
      }
      const clipboardText = clipboardData.getData('text');
      const textTooLongForIRC = clipboardText.length > 384;
      if (textTooLongForIRC) {
        e.preventDefault();
        this.isUploading = true;
        processAndUploadText(clipboardText, this.handleUploadFinished, this.updateUploadProgress);
      }
    },
  },
};
</script>

<style scoped lang="scss">

/deep/ .container-button {
  height: 33px;
}

.user-name {
  width: 95vw;
  height: 21px;
  text-align: left;
  font-size: 18px;
  font-weight: 500;
  color: #f3f3f3;
  margin-left: 3vw;
  margin-bottom: 4px;
}
.message-input-container {
  height: 33px;
  width: 62vw;
  font-size: 18px;
  float: left;
  margin-left: 2vw;
}

</style>
