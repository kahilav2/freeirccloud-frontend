<template>
  <div>
    <div>
      <label>Password </label>
      <input
          :class="!isTargetValid['password'] && (hasUserTriedToSubmit || hasTargetChanged['password']) ? 'input-error' : ''"
          type="password"
          v-model="password"
          @blur="removeFocus('password')"
          @focus="addFocus('password')"
      />
      <div v-if="hasTargetChanged['password'] && !isTargetValid['password'] && !targetHasFocus['password']">
        <ErrorMessages :errorMessages="[errorMessages[0]]"/>
      </div>
    </div>
    <div>
      <label>Again </label>
      <input
          :class="!isTargetValid['passwordAgain'] && (hasUserTriedToSubmit || hasTargetChanged['passwordAgain']) ? 'input-error' : ''"
          type="password"
          v-model="passwordAgain"
          placeholder=""
          @blur="removeFocus('passwordAgain')"
          @focus="addFocus('passwordAgain')"
      />
      <div v-if="hasTargetChanged['passwordAgain'] && !isTargetValid['passwordAgain'] && !targetHasFocus['passwordAgain']">
        <ErrorMessages :errorMessages="[errorMessages[1] || errorMessages[0]]"/>
      </div>
     </div>
  </div>
</template>

<script>
import Validatable from '~/mixins/validatable';
import ErrorMessages from '~/components/shared/forms/error-messages.vue';

export default {
  extends: Validatable,
  components: {
    ErrorMessages,
  },

  data() {
    return {
      name: 'password',
      targets: ['password', 'passwordAgain'],
      password: '',
      passwordAgain: '',
    };
  },
  methods: {
    getValue() {
      return { password: this.password };
    },
    validate() {
      this.VALIDATE('password', 'isValidPassword');
      this.VALIDATE('passwordAgain', 'arePasswordsSame', this.password);
    },
  },
};
</script>

<style scoped>
</style>
