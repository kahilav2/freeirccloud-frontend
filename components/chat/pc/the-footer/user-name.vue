<template>
  <div class="user-name">{{ userName }}</div>
</template>

<script>

export default {
  props: {
    userName: String,
  },
};
</script>
<style lang="scss" scoped>
.user-name {
  color: var(--secondary-font-color);
  font-size: 18px;
  font-weight: 500;
}
</style>
