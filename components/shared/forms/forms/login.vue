<template>
  <BasicFormTemplate @submit="submit">
    <EmailAddress @update="childUpdated"/>
    <PasswordAsker :label="'Password'" :type="'passwordInput'" @update="childUpdated"/>
    <div class="login-button"><button :disabled="isDisabled" @click="submit" class="button-1 login">Log in</button></div>
  </BasicFormTemplate>
</template>

<script>
import Validatable from '~/mixins/validatable';
import EmailAddress from '~/components/shared/forms/fields/email-address.vue';
import PasswordAsker from '~/components/shared/forms/fields/password-asker.vue';
import BasicFormTemplate from '~/components/shared/forms/templates/basic-form.vue';

export default {
  extends: Validatable,
  components: {
    EmailAddress,
    PasswordAsker,
    BasicFormTemplate,
  },
  data() {
    return {
      name: 'loginForm',
      targets: [],
    };
  },
  methods: {
    getValidatableChildren() {
      return this.$children[0].$children.filter((child) => child.extendsValidatable === true);
    },
    validate() {
      this.VALIDATE_CHILDREN();
    },
  },
};
</script>
<style lang="scss" scoped>
.login-button {
  padding-top: 18px;
}
.button-1 {
  border-radius: 50px;
  border: none;
  float: right;
  &:disabled {
    background-color: #6b92d4;
  }
  &.login {
    width: 90px;
    height: 36px;
    font-size: 18px;
  }
}

h2 {
  margin-bottom: 20px;
}
.form-container {
  background-color: var(--bg-color);
  padding: 20px 20px;
  margin: 0 auto;
  margin-top: 20px;
  min-width: 400px;
  width: 60vw;
}
.error-message {
  color: #f95151;
  clear: both;
}
.footer {
  padding-top: 18px;
}

</style>
