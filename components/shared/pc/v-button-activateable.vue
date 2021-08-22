<template>
  <button
      @click.prevent="$emit('click')"
      class="button-activateable"
      :class="{ active: isActive, highlight: isHighlighted }">

    <slot/>
  </button>
</template>
<script>
export default {
  props: {
    isActive: Boolean,
    isHighlighted: Boolean,
  },
};
</script>
<style lang="scss" scoped>
.button-activateable {
  padding-top: 0px;
  padding-bottom: 6px;
  letter-spacing: 0.10em;

  cursor: pointer;
  font-size: 17px;
  width: 100%;
  padding-left: 0px;
  text-align: left;

  background-color: #ffffff00;
  color: var(--tertiary-font-color);
  border: 0;
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
  &.active {
    color: #e4e6eb;
    font-weight: 500;
    text-shadow: 0px 0px 10px #606060;
  }
  &:hover {
    color: #e4e6eb;
    text-shadow: 0px 0px 10px #606060;
  }
}
.highlight {
  color: var(--message-highlight) !important;
}

</style>
