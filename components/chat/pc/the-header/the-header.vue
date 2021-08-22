<template>
  <header>
    <StatusBar/>
    <div class="header-logo">
      <span>free</span>IRC
    </div>
    <div v-if="userSession !== null" class="user-navigation">
      <TheNavigationBar :userSession="userSession"/>
    </div>
  </header>
</template>

<script>
import TheNavigationBar from '~/components/chat/pc/the-header/the-navigation-bar/the-navigation-bar.vue';
import StatusBar from '~/components/chat/pc/the-header/status-bar.vue';

export default {
  props: {
    userSession: Object,
  },
  components: {
    TheNavigationBar,
    StatusBar,
  },
};
</script>
<style lang="scss" scoped>
header {
  position: relative;
  height: var(--header-height);
}
.header-logo {
  display: inline-block;
  width: calc(var(--left-side-bar-width));
  background-image: linear-gradient(to right, rgb(26, 96, 189) 14%, rgb(118, 76, 191) 95%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  text-shadow: 14px 16px 12px #00000047;
  height: 100%;
  font-size: 49px;
  letter-spacing: 0px;
  color: #8fa0bb;
  font-family: 'Racing Sans One';
  padding-left: calc(3 * var(--page-margin));
  padding-top: var(--page-margin);
  span {
    letter-spacing: 5px;
  }
}
.user-navigation {
  display: inline-block;
  padding-top: calc(var(--page-margin) + 20px);
  padding-right: var(--page-margin);
  flex-direction: column;
  font-size: 12px;
  right: 0px;
  width: calc(100vw - var(--left-side-bar-width));
  position: absolute;
}
</style>
