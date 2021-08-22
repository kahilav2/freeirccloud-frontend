<template>
  <BasicFormTemplate @submit="submit">
    <EmailAddress @update="childUpdated" class="fields"/>
    <div><button :disabled="isDisabled" @click="submit" class="button">Reset</button></div>
  </BasicFormTemplate>
</template>

<script>
import Validatable from '~/mixins/validatable';
import BasicFormTemplate from '~/components/shared/forms/templates/basic-form.vue';

import EmailAddress from '~/components/shared/forms/fields/email-address.vue';

export default {
  extends: Validatable,
  components: {
    EmailAddress,
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
.fields {
  margin-bottom: 20px;
}
ul{
  list-style: none;
}
h2 {
  margin-bottom: 20px;
}
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

.login-form {
  display: inline-block;
}
.footer {
  padding-top: 18px;
}

</style>
