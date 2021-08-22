<template>
  <div class="open-channel-container">
    <template v-if="isChannelReady">
      <Title :channel="openChannel" />
      <Chat :channel="openChannel" :userSession="userSession"/>
    </template>
    <template v-else>
      <div class="loader-container">
        <img src="loading.svg" alt="loading" onerror="this.src='your.png'">
      </div>
    </template>
  </div>
</template>
<script>
import Title from '~/components/chat/pc/the-body/title.vue';
import Chat from '~/components/chat/pc/the-body/chat.vue';

export default {
  components: {
    Title,
    Chat,
  },
  props: {
    userSession: Object,
  },
  computed: {
    isChannelReady() {
      return this.openChannel && this.openChannel.isReady();
    },
    openServerIndex() { return this.$store.getters['app/get'].openServerIndex; },
    openChannelIndex() { return this.$store.getters['app/get'].openChannelIndex; },
    openServer() { return this.userSession.servers[this.openServerIndex]; },
    openChannel() { return this.openServer?.channels[this.openChannelIndex]; },

  },
  watch: {
    openChannel() {
      const timestamp = new Date();
      this.openChannel.setLastSeen(timestamp);
      this.openServer.sendLastSeenToBackend(this.openChannel.getChannelName(), timestamp);
    },
  },
};
</script>
<style scoped lang="scss">
.open-channel-container {
  height: calc(100vh - var(--header-height) - var(--footer-height));
  width: calc(100vw - var(--left-side-bar-width));
  display: flex;
  flex-direction: column;
}
.loader-container {
  width: 100px;
  display: block;
  margin: 0 auto;
}
</style>
