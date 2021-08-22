<template>
  <LandingPageTemplate>
    <Header />
    <main>
      <h2>Reset password</h2>
      <div class="form-container">
        <template v-if="!passwordResetSuccessful">
          <p>Instructions for resetting your password will be sent to your email address. </p>
          <PasswordResetForm ref="passwordResetForm"
                            @submitted="resetPassword"
                            @error="onFormError"/>
          <ErrorMessages :errorMessages="errorMessages"/>
        </template>
        <template v-else>
          <h3>Password reset email has been sent! </h3>
          <p>Email with instructions for password resetting has been sent to
          <b>{{ email }}</b></p>
        </template>
      </div>
    </main>
  </LandingPageTemplate>
</template>

<script>

import firebase from '~/plugins/firebase';
import Header from '~/components/landing/header.vue';
import PasswordResetForm from '~/components/shared/forms/forms/password-reset.vue';
import ErrorMessages from '~/components/shared/forms/error-messages.vue';
import LandingPageTemplate from '~/components/landing/landing-page-template.vue';

export default {
  layout: 'default',
  components: {
    LandingPageTemplate,
    Header,
    PasswordResetForm,
    ErrorMessages,
  },
  head() {
    return {
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
      ],
    };
  },
  data() {
    return {
      unsubscribeToFbListener: null,
      passwordResetSuccessful: false,
      email: '',
      errorMessages: [],
    };
  },
  methods: {
    onFormError(errorMessages) {
      this.errorMessages = errorMessages;
    },
    resetPassword({ email }) {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        this.passwordResetSuccessful = true;
        this.email = email;
        this.$refs.passwordResetForm.enableAll();
      }).catch((error) => {
        this.errorMessages = [error.message];
        this.$refs.passwordResetForm.enableAll();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
main {
  position: relative;

  padding-left: calc(50% - 240px);
  padding-right: calc(50% - 240px);

  a {
    color: #b0b3b8;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}

.form-container {
  p {
    font-size: 16px;
    margin-bottom: 20px;
  }
  background-color: #3a3b3c;
  color: #f8f8f8;
  border-radius: 3px;
  padding: 30px 30px 30px 30px;

  margin: 0 auto;
  margin-top: 20px;
  width: 100%;
}
h2 {
  margin-bottom: 20px;
  margin-left: 30px;
}
h3 {
  margin-bottom: 20px;
}
</style>
