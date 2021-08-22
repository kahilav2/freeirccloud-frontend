<template>
  <div class="channel-title">
    {{ channelName }}
    {{ topic }}
  </div>
</template>
<script>
export default {
  props: {
    channel: Object,
  },
  computed: {
    channelName() { return this.channel.getChannelName(); },

    topic() {
      return this.channel.getTopic() || '';
    },
  },
};
</script>
<style lang="scss" scoped>
.channel-title {
  color: #587fbe;
  width: 100vw;
  display: block;
  padding: 0vh 2vw;
  margin: 0 auto;
  position: absolute;
  overflow: hidden;
  background-color: #000;
}
</style>
