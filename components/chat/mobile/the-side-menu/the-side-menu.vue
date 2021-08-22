<template>
  <transition name="slide">
    <div class="side-menu" v-if="isSideMenuOpen">
      <TheSideMenuCloseButton />

      <ChannelList :userSession="userSession"/>

      <UserList v-if="channel !== null && channel.isChannel()" :channel="channel" />

      <div class="navigation">
        <VButton @click="switchTheme">{{ switchThemeButtonLabel }}</VButton>

        <VButton v-if="userSession" @click="logout">
          Log out
        </VButton>
      </div>

    </div>
  </transition>
</template>

<script>
import TheSideMenuCloseButton from '~/components/chat/mobile/the-side-menu/the-side-menu-close-button.vue';
import ChannelList from '~/components/chat/mobile/the-side-menu/channel-list.vue';
import UserList from '~/components/chat/mobile/the-side-menu/user-list.vue';

import VButton from '~/components/shared/pc/v-button.vue';

import FireBaseActions from '~/mixins/firebase-actions';

export default {
  mixins: [FireBaseActions],
  components: {
    TheSideMenuCloseButton,
    ChannelList,
    UserList,
    VButton,
  },
  props: {
    userSession: Object,
  },
  computed: {
    isSideMenuOpen() {
      return this.$store.getters['app/get'].isSideMenuOpen;
    },
    channel() {
      if (!this.userSession) return null;
      const server = this.userSession.getServers()[this.$store.getters['app/get'].openServerIndex];
      if (!server) return null;
      const channels = server.getChannels();
      const { openChannelIndex } = this.$store.getters['app/get'];
      if (openChannelIndex === null) return null;

      return channels[openChannelIndex];
    },
    switchThemeButtonLabel() {
      return this.$store.getters['app/getThemeText'];
    },
  },
  methods: {
    switchTheme() {
      this.$store.dispatch('app/switchTheme', { ctx: this });
    },
  },
};
</script>

<style scoped lang="scss">

.side-menu {
  position: absolute;
  height: 100vh;
  width: 76vw;
  background-color: #3A3B3C;
  z-index: 10;

}
.navigation {
  position: absolute;
  bottom: 0px;
  left: 0px;
}

.slide-leave-active,
.slide-enter-active {
  transition: transform 355ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}
.slide-enter {
  transform: translate(-100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

</style>
