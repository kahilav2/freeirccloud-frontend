<template>
  <div class="container">
    <label>IRC nick </label>
    <input  v-model="userName"
            :class="!isValid && (hasTargetChanged['userName'] || hasUserTriedToSubmit) ? 'input-error' : ''"
            type="userName"
    />
  </div>
</template>

<script>
import Validatable from '~/mixins/validatable';

export default {
  extends: Validatable,
  props: {
    index: Number,
  },
  data() {
    return {
      userName: '',
      name: 'userName',
      targets: ['userName'],
    };
  },
  methods: {
    validate() {
      this.VALIDATE('userName', 'isValidUserName');
    },
  },
};
</script>
<style scoped>
.container {
  margin-bottom: 20px;
}
</style>
