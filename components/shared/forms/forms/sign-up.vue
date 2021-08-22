<template>
  <BasicFormTemplate @submit="submit">
    <EmailAddress @update="childUpdated"/>
    <PasswordCreator class="password-creator" @update="childUpdated"/>
    <ServerList @update="childUpdated"/>

    <div><button :disabled="isDisabled" @click="submit" class="button">Sign up</button></div>
    <ErrorMessages :errorMessages="errorMessagesDisplayed"/>
  </BasicFormTemplate>
</template>

<script>
import Validatable from '~/mixins/validatable';
import BasicFormTemplate from '~/components/shared/forms/templates/basic-form.vue';

import ServerList from '~/components/shared/forms/fields/server-list.vue';
import EmailAddress from '~/components/shared/forms/fields/email-address.vue';
import PasswordCreator from '~/components/shared/forms/fields/password-creator.vue';

import ErrorMessages from '~/components/shared/forms/error-messages.vue';

export default {
  extends: Validatable,
  components: {
    EmailAddress,
    ServerList,
    PasswordCreator,
    ErrorMessages,
    BasicFormTemplate,
  },
  data() {
    return {
      name: 'signUpForm',
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
.button {
  background-color: #3680FF;
  color: #fff;
  border-radius: 50px;
  border: none;
  float: right;
  width: 90px;
  height: 36px;
  font-size: 18px;
  &:disabled {
    background-color: #6b92d4;
  }
  &:hover {
    cursor: pointer;
  }
}
ul{
  list-style: none;
}
h2 {
  margin-bottom: 20px;
}
button {
  float: left;
  font-size: 18px;
  clear: both;
}
.form-container {
  background-color: var(--bg-color);
  padding: 20px 20px;
  margin: 0 auto;
  margin-top: 20px;
  min-width: 400px;
  width: 60vw;
}
.basic-form {
  display: inline-block;
}
.footer {
  padding-top: 18px;
}
.password-creator {
  margin-bottom: 50px;
}

</style>
