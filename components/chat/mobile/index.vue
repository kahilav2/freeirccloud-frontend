<template>
  <div class="container">
    <TheSideMenu :userSession="userSession"/>
    <TheHeader />

    <template v-if="userSession && isChannelReady">
      <TheBody :userSession="userSession"/>
      <TheFooter :userSession="userSession"/>
    </template>

  </div>
</template>

<script>

import TheSideMenu from '~/components/chat/mobile/the-side-menu/the-side-menu.vue';
import TheHeader from '~/components/chat/mobile/the-header/the-header.vue';
import TheFooter from '~/components/chat/mobile/the-footer/the-footer.vue';
import TheBody from '~/components/chat/mobile/the-body/the-body.vue';

export default {
  components: {
    TheSideMenu,
    TheHeader,
    TheBody,
    TheFooter,
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
};
</script>

<style scoped lang="scss">
.looader {
  width: 100%
}
.container {
  margin: 0 auto;
  min-height: 90.5vh;
  display: block;
  justify-content: center;
  align-items: center;
}

</style>
