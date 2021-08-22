<template>
  <LandingPageTemplate>
    <Header :showLoginButton="false"/>
    <main>
      <h2> Log in</h2>
      <div class="form-container">
        <LoginForm ref="loginForm" @submitted="login" @error="onFormError"/>
        <ErrorMessages :errorMessages="errorMessages"/>
        <div class="forgot-password">
          <router-link to="/password/reset">Forgot password?</router-link>
        </div>
      </div>
    </main>
  </LandingPageTemplate>
</template>
<script>

import firebase from '~/plugins/firebase';
import Header from '~/components/landing/header.vue';
import LoginForm from '~/components/shared/forms/forms/login.vue';
import ErrorMessages from '~/components/shared/forms/error-messages.vue';
import LandingPageTemplate from '~/components/landing/landing-page-template.vue';

export default {
  layout: 'default',
  head() {
    return {
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
      ],
    };
  },
  components: {
    LandingPageTemplate,
    Header,
    LoginForm,
    ErrorMessages,
  },
  data() {
    return {
      errorMessages: [],
    };
  },
  methods: {
    onFormError(errorMessages) {
      this.errorMessages = errorMessages;
    },
    async login({ email, password }) {
      debugger;
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        switch (error.code) {
          case 'auth/too-many-requests':
            this.errorMessages = ['Too many login attempts'];
            break;
          case 'auth/wrong-password':
          case 'auth/user-not-found':
            this.errorMessages = ['Wrong email or password'];
            break;
          default:
            this.errorMessages = ['Undefined error'];
        }
        this.$refs.loginForm.enableAll();
      }
    },
  },
};

</script>
<style lang="scss" scoped>
main {
  position: relative;
  padding-left: calc(50% - 150px);
  padding-right: calc(50% - 150px);
  height: 600px;

  a {
    color: #b0b3b8;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}

.form-container {
  background-color: #3a3b3c;
  color: #f8f8f8;
  border-radius: 3px;
  padding: 30px 30px 10px 30px;
  margin: 0 auto;
  margin-top: 20px;
  width: 300px;
}
h2 {
  margin-bottom: 20px;
  margin-left: 30px;
}

.login-form {
  display: inline-block;
}
.error-message {
  color: #d81313;
  clear: both;
  background-color: #ffbfbf;
}
.forgot-password {
  padding-top: 18px;
  font-size: 15px;
  text-align: right;
}

</style>
