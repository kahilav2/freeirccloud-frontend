<template>
  <h1 class="title">
    <img src="/logo-2-small-tinyfied.png" class="logo"/>freeIRC
  </h1>
</template>
<style scoped lang="scss">
.NuxtLogo {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.logo {
  display: inline-block;
  max-width: 70px;
  width: 17vw;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  /*font-size: 100px;*/
  color: var(--heading-color);
  letter-spacing: 1px;
  font-size: 74px;
  margin-bottom: 23px;
  text-align: center;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  /*display: flex;*/
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
