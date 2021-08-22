<template>
  <div>
    <div class="server-name">
      {{ server.getServerName() }}
    </div>
    <div class="channel-item-list-container">
      <div
        v-for="(channel, channelIndex) in server.getChannels()" :key="'channel' + channelIndex"
        class="channel">
        <ChannelItem :channel="channel" :channelIndex="channelIndex" :serverIndex="serverIndex"/>
      </div>
    </div>
  </div>
</template>

<script>
import ChannelItem from '~/components/chat/pc/the-left-side-bar/channel-item.vue';

export default {
  components: {
    ChannelItem,
  },
  props: {
    server: Object,
    serverIndex: Number,
  },
  watch: {
    openChannelIndex(newVal, oldVal) {
      if (this.channels && this.channels.length > 0 && this.channels[oldVal]) {
        this.channels[oldVal].clearHasNewMessages();
      }
    },
  },
  computed: {
    channels() { return this.server.getChannels(); },
    openChannelIndex() { return this.$store.getters['app/get'].openChannelIndex; },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.channel {
  display: block;
  margin-bottom: 1px;
  padding-left: 0px;
  padding-right: 0px;
}
.channel:last-child {
  margin-bottom: 7px;
}
.server-name {

  margin-left: var(--page-margin);
  padding-left: var(--page-margin);
  padding-top: 10px;
  padding-bottom: 10px;
  color: var(--secondary-font-color);

  font-size: 18px;
  font-weight: 500;
}
.channel-item-list-container {
  padding: 0px 0px 10px 62px;
  display: inline-block;
}
</style>
