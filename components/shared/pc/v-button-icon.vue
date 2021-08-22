<template>
  <button @click.prevent="$emit('click')" class="v-button-icon" :disabled="isDisabled">
    <img class="v-button-icon--icon" alt="button" :src="src" />
  </button>
</template>
<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>

.v-button-icon--icon {
  height: 90%;
}

.v-button-icon {
  height: 100%;
  width: 100%;
  border: none;
  display: inline-block;
  background: none;
  -webkit-transition: background 0.3s;
  transition: background 0.3s;
  &:hover {
    background-color: #193f79;
  }
}
</style>
