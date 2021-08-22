<template>
  <div class="container">
    <div class="background"/>
    <div class="inner-container">
      <TheHeader :userSession="userSession"/>

      <template v-if="userSession !== null">
        <TheLeftSideBar :userSession="userSession"/>
        <TheBody :userSession="userSession"/>
        <TheFooter :userSession="userSession"/>
      </template>

      <Loading v-else />

    </div>
  </div>
</template>

<script>

import TheHeader from '~/components/chat/pc/the-header/the-header.vue';
import TheLeftSideBar from '~/components/chat/pc/the-left-side-bar/the-left-side-bar.vue';
import TheBody from '~/components/chat/pc/the-body/the-body.vue';
import TheFooter from '~/components/chat/pc/the-footer/the-footer.vue';

import Loading from '~/components/shared/loading.vue';

import ModalFactory from '~/utils/factories/modal-factory';

export default {
  components: {
    TheHeader,
    TheLeftSideBar,
    TheBody,
    TheFooter,
    Loading,
  },
  props: {
    userSession: Object,
  },
  watch: {
    isConnectionClosed(newVal, oldVal) {
      const { currentAction } = this.$store.getters['app/get'];
      if (newVal === true && oldVal === false && currentAction !== this.$getConst('actions.logout')) {
        new ModalFactory(this).createConfirmationModal({ contentID: 'connectionLost' }, () => {
          window.location.reload();
        });
      }
    },
  },
  computed: {
    isConnectionClosed() {
      return this.$store.getters['app/get'].isConnectionClosed;
    },
  },

};
</script>
<style scoped lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: block;
  justify-content: center;
  align-items: center;

  color: var(--font-color);
}
.inner-container {
  clear: both;
  width: 100vw;
  margin: auto;
}
.background {
  background-color: var(--app-background-color);
  z-index: -3;
  position: absolute;
  width: 100vw;
  height: 100vh;
}
</style>
