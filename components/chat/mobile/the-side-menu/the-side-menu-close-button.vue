<template>
  <button
      class="close-button"
      @click="$store.dispatch('app/set', { isSideMenuOpen: false })">

    X
  </button>
</template>
<style lang="scss" scoped>
.close-button {
  color: var(--primary-color);;
  font-size: 15px;
  font-weight: 800;
  float: right;
}
</style>
