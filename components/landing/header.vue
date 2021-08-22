<template>
  <header>
    <div class="navigation-container">
      <div class="item">
        <button @click.prevent="$router.push('/')" class="navigation-link">
          Home
        </button>
      </div>
      <div class="item">
        <button @click.prevent="$router.push('/signup')" class="navigation-link">
          Sign up
        </button>
      </div>
      <div class="item">
        <button @click.prevent="$router.push({ path: '/', hash:'#features'})" class="navigation-link">
          Features
        </button>
      </div>
      <div class="item">
        <button @click.prevent="$router.push({ path: '/', hash:'#downloads'})" class="navigation-link">
          Downloads
        </button>
      </div>
    </div>
    <div v-if="showLoginButton" class="navigation-container-right">
      <div class="item">
        <button @click.prevent="$router.push('/login')" class="button login">
          Log in
        </button>
      </div>
    </div>

  </header>
</template>
<script>
export default {
  props: {
    showLoginButton: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  padding-left: 60px;
  padding-right: 60px;
  height: 60px;
  position: relative;
  display: flex;
  margin-bottom: 120px;
}

.navigation-container {
  display: flex;
  flex-grow: 1;
  position: absolute;
  bottom: 0px;
  .item {
    display: var(--display-none-on-mobile);
    float: left;
    margin-right: 40px;
  }
}

.navigation-link {
  font-size: 20px;
  text-decoration: none;
  background: none;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 0px;
  line-height: 26px;
  color: #F8F8F8;
  position: relative;
  &:hover {
    cursor: pointer;
  }
  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: var(--unimportant-color);
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  &:hover:after {
    width: 100%;
    left: 0;
  }
}
.navigation-container-right {
  display: block;
  flex-grow: 1;
  position: absolute;
  right: 60px;
  bottom: 0px;

  .item {
    float: right;
  }
}
.button {
  background-color: #3680FF;
  color: #fff;
  border-radius: 50px;
  border: none;

  &:hover {
    cursor: pointer;
  }

  &.login {
    width: 90px;
    height: 36px;
    font-size: 18px;
  }
}
</style>
