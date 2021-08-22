<template>
  <div>
    <label>Email </label>
    <input :class="!isValid && (hasTargetChanged['email'] || hasUserTriedToSubmit) ? 'input-error' : ''" type="email" v-model="email" />
  </div>
</template>

<script>
import Validatable from '~/mixins/validatable';

export default {
  extends: Validatable,
  data() {
    return {
      name: 'email',
      targets: ['email'],
      email: '',
    };
  },
  methods: {
    validate() {
      this.VALIDATE('email', 'isValidEmail');
    },
  },
};
</script>
<style scoped>
</style>
