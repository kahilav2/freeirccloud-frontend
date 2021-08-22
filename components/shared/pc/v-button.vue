<template>
  <button @click.prevent="$emit('click')" class="button">
    <slot/>
  </button>
</template>

<style lang="scss" scoped>
.button {
  font-size: 16px;

  background: none;
  border: 0;
  line-height: 26px;
  color: #b0b3b8;
  position: relative;
  letter-spacing: 0.10em;
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
    background: var(--secondary-font-color);
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  &:hover:after {
    width: 100%;
    left: 0;
  }
}
</style>
