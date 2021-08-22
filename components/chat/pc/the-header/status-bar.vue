<template>
  <div class="status-bar">
    <div v-if="isConnectionClosed" class="error">
      Connection lost
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isConnectionClosed() {
      return this.$store.getters['app/get'].isConnectionClosed;
    },
  },
};
</script>
<style lang="scss" scoped>
.error {
  font-size: 20px;
  line-height: 30px;
}
.status-bar {
  text-align: center;
  position: absolute;
  height: 30px;
  width: 100vw;
  font-size: 16px;
  border-radius: 3px;
}
</style>
