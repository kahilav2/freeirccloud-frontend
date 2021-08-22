<template>
  <div>
    <label>Password </label>
    <input
        :class="!isValid && (hasTargetChanged['password'] || hasUserTriedToSubmit) ? 'input-error' : ''"
        type="password"
        v-model="password"
     />
  </div>
</template>

<script>
import Validatable from '~/mixins/validatable';

export default {
  extends: Validatable,
  data() {
    return {
      name: 'password',
      targets: ['password'],
      password: '',
    };
  },
  methods: {
    validate() {
      this.VALIDATE('password', 'isNotEmpty');
    },
  },
};
</script>
<style scoped>

</style>
