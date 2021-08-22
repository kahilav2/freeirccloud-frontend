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
  margin-left: calc(2 * var(--page-margin));
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 0;
  letter-spacing: 0.10em;

  cursor: pointer;
  font-size: 17px;
  width: 100%;
  text-align: left;

  background-color: #ffffff00;
  color: #b0b3b8;
  border: 0;
  &:hover {
    text-decoration: underline;
  }
}
.highlight {
  color: var(--message-highlight) !important;
}
.active {
  color: #e4e6eb;
  font-weight: 500;
}
</style>
