<template>
  <transition name="modal">
    <div class="modal is-active on-top" v-if="$parent.isActive">
      <div class="modal-background" @click.self="backgroundClicked" @dragover="preventDrop" @drop="preventDrop"></div>
      <div class="modal-content" :class="styles" >
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['styles'],
  methods: {
    backgroundClicked() {
      this.$emit('backgroundClicked', {});
    },
    preventDrop(e) { e.preventDefault(); },
  },
};
</script>
