<template>
  <div class="channel-item-container">
    <div v-if="channel.getHasNewMessages()" class="channel-status-mark"/>
    <VButtonActivateable
        @click="changeOpenChannel(serverIndex, channelIndex)"
        :isActive="isChannelSelected"
        :isHighlighted="false">
      {{ channel.getChannelName() }}
    </VButtonActivateable>
  </div>
</template>

<script>
import VButtonActivateable from '~/components/shared/pc/v-button-activateable.vue';

export default {
  components: {
    VButtonActivateable,
  },
  props: {
    channel: Object,
    channelIndex: Number,
    serverIndex: Number,
  },
  computed: {
    isChannelSelected() {
      return (this.openChannelIndex === this.channelIndex) && (this.openServerIndex === this.serverIndex);
    },
    openChannelIndex() { return this.$store.getters['app/get'].openChannelIndex; },
    openServerIndex() { return this.$store.getters['app/get'].openServerIndex; },
  },
  methods: {
    changeOpenChannel(serverIndex, channelIndex) {
      this.$store.dispatch('app/set', { openChannelIndex: channelIndex, openServerIndex: serverIndex });
    },
  },
};
</script>

<style scoped lang="scss">
.channel-item-container {
  position: relative;
}
.channel-status-mark {
  background-color: #d6d13d;
  border-radius: 2px;
  width: 8px;
  height: 8px;
  position: absolute;
  left: -14px;
  top: 7px;
}
</style>
