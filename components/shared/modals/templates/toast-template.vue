<template>
  <transition name="toast">
    <div class="toast is-active" v-if="$parent.isActive">
      <div class="toast-content" @click="$emit('click')">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
