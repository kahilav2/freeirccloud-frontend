<template>
  <div>
    <div v-for="(errorMessage, index) in errorMessages" class="error-message" :key="index">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>

export default {
  props: {
    errorMessages: Array,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.error-message {
  color: #d81313;
  clear: both;
}
</style>
