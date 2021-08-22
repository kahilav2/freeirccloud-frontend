<template>
  <VButton class="button" @click="onClick">
    Load more
  </VButton>
</template>

<script>
import VButton from '~/components/shared/pc/v-button.vue';

export default {
  components: {
    VButton,
  },
  props: {
    userSession: Object,
    channel: Object,
  },
  data() {
    return {};
  },
  methods: {
    onClick() {
      this.userSession.socket.send(JSON.stringify({
        command: 'log',
        serverURL: this.channel.getServer().getServerURL(),
        channelName: this.channel.getChannelName(),
        earlierThan: this.channel.messages[0].timestamp,
        syncVersion: process.env.syncVersion,
      }));
    },
  },
};
</script>
<style scoped>
button {
  margin-top: 20px;
}
</style>
