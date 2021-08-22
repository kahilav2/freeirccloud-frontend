<template>
  <div class="channel-list">

    <div v-for="(server, serverIndex) in servers" :key="serverIndex">
      <div class="server-name">
        {{ server.getServerName() }}
      </div>
      <div class="channel" v-for="(channel, channelIndex) in server.getChannels()" :key="channelIndex">
        <VButtonActivateable
          @click="changeOpenChannel(serverIndex, channelIndex)"
          :isActive="(openChannelIndex===channelIndex && openServerIndex===serverIndex)"
          :isHighlighted="channel.getHasNewMessages()"
        >
          {{ channel.getChannelName() }}
        </VButtonActivateable>
      </div>
    </div>

  </div>
</template>

<script>

import VButtonActivateable from '~/components/shared/mobile/v-button-activateable.vue';

export default {
  components: {
    VButtonActivateable,
  },
  props: {
    userSession: Object,
  },
  watch: {
    openChannelIndex(newVal, oldVal) {
      if (this.channels && this.channels.length > 0 && this.channels[oldVal]) {
        this.channels[oldVal].clearHasNewMessages();
      }
    },
  },
  computed: {
    servers() {
      if (!this.userSession) return [];
      return this.userSession.getServers();
    },
    channels() {
      if (!this.userSession) return [];
      const server = this.userSession.findServer('orwell.freenode.net');
      if (!server) return [];
      const channels = server.getChannels();
      return channels || [];
    },
    openChannelIndex() {
      return this.$store.getters['app/get'].openChannelIndex;
    },
    openServerIndex() {
      return this.$store.getters['app/get'].openServerIndex;
    },
  },
  methods: {
    changeOpenChannel(serverIndex, channelIndex) {
      this.$store.dispatch('app/set', { openChannelIndex: channelIndex, openServerIndex: serverIndex });
      setTimeout(() => {
        this.$store.dispatch('app/set', { isSideMenuOpen: false });
      }, 150);
    },
  },
};
</script>

<style scoped lang="scss">

.channel {
  display: inline-block;
  margin-bottom: 3px;
  width: 65%;
  margin-left: 60px;
}
.channel:last-child {
  margin-bottom: 7px;
}
.channel-list {
  padding-bottom: 30px;
  float: left;
  padding-top: 3px;
  width: 100%;
  background-color: #3A3B3C;
}

.server-name {
  background-color: #242526;
  color: #dedede;
  padding: 8px 0px 8px 40px;
  text-align: left;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 7px;
}

</style>
