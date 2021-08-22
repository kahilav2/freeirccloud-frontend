<template>
  <div class="channel-list">
    <ServerItem
      v-for="(server, serverIndex) in servers"
      :server="server"
      :serverIndex="serverIndex"
      :userSession="userSession"
      :key="'server' + serverIndex"
    />
  </div>
</template>

<script>
import ServerItem from '~/components/chat/pc/the-left-side-bar/server-item.vue';

export default {
  components: {
    ServerItem,
  },
  props: {
    userSession: Object,
  },
  computed: {
    servers() { return this.userSession.getServers(); },
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.channel-list {
  margin-left: var(--page-margin);
  height: calc(100vh - var(--header-height) - var(--footer-height));
  width: calc(var(--vertical-panel-width) + var(--page-margin));
  float: left;
  padding-top: 3px;
  text-align: left;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 3px solid #193f79;
  border-radius: 5px;
}
</style>
