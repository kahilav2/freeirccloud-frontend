<template>
  <div class="main-header">
    <HamburgerMenu />

    <div class="status-bar-container">
      <template v-if="isConnectionClosed">
        <div class="error status-bar unselectable">Connection lost</div>
        <div class="button reload-button unselectable" @click="reloadPage()">Reload</div>
      </template>
    </div>

  </div>
</template>

<script>
import HamburgerMenu from '~/components/chat/mobile/the-header/hamburger-menu.vue';

export default {
  components: {
    HamburgerMenu,
  },
  computed: {
    isConnectionClosed() {
      return this.$store.getters['app/get'].isConnectionClosed;
    },
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.reload-button {
  text-align: center;
  color: #f3f3f3;
}
.main-header {
  text-align: left;
  height: 9vh;
  padding-top: 0vh;
  background-color: var(--app-background-color);
}
.status-bar-container {
  display: inline-block;
  width: calc(100vw - 75px);
}
.status-bar {
  padding: 2px 0px;
  text-align: center;
  font-size: 16px;
}

</style>
