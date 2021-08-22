<template>
  <div class="container">
    <div class="background-text-container">
      <div class="background-text">freeIRC</div>
    </div>
    <slot />
  </div>
</template>
<style lang="scss" scoped>

.container {
  h1 {
    font-size: 38px;
    margin-bottom: 50px;
  }
  font-size: 20px;
  background-color: #242526;

  width: 100vw;
  color: #F8F8F8;
  font-family: 'ABeeZee';
}

.background-text-container {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0px;
}

.background-text {
  font-size: 400px;
  font-family: 'Racing Sans One';
  color: rgba(0,0,0,0.23);
  text-align: center;
  transform: rotate(18deg);
  user-select: none;
}
</style>
