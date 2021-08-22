<template>
  <button @click="$store.dispatch('app/toggleSideMenu')"
          class="hamburger-menu">

    <img src='hamburger-menu-white.png' alt="menu"/>
  </button>
</template>

<style lang="scss" scoped>
.hamburger-menu {
  background-color: #242526;
  border-radius: 4px;
  border: 0;
  filter: brightness(0.4);
  img {
    width:40px;
  }
}
</style>
