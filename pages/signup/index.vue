<template>
  <LandingPageTemplate>
    <Header />
    <main>
      <h2> Sign up</h2>
      <div class="form-container">
        <SignUpForm @submitted="signUp"/>
      </div>
    </main>
  </LandingPageTemplate>
</template>

<script>

import firebase from '~/plugins/firebase';
import Header from '~/components/landing/header.vue';
import SignUpForm from '~/components/shared/forms/forms/sign-up.vue';
import LandingPageTemplate from '~/components/landing/landing-page-template.vue';

export default {
  layout: 'default',
  components: {
    LandingPageTemplate,
    Header,
    SignUpForm,
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
    };
  },
  methods: {
    async signUp(formData) {
      try {
        const fbUser = await firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password);

        fbUser.user.sendEmailVerification({
          url: 'https://freeirc.cloud/',
        });
        const registerPayload = Object.assign(formData, { userID: fbUser.user.uid });
        this.$userAPI.register(registerPayload);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
main {
  position: relative;

  padding-left: calc(50% - 220px);
  padding-right: calc(50% - 220px);

  h2 {
    margin-left: 60px;
  }
  h1 {
    font-size: 38px;
    margin-bottom: 50px;
  }
  font-size: 20px;
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
  padding: 30px 60px 60px 60px;
  margin: 0 auto;
  margin-top: 20px;
  width: 100%;
}
</style>
