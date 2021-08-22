<template>
  <div class="verify-email-screen">
    <div class="background-text-container">
      <div class="background-text">freeIRC</div>
    </div>
    <main>
      <h1>Verify your email address</h1>
      <div class="box-container">
        <div class="intro">
          We have sent email containing verification instructions to {{ email }}.
        </div>

        <div class="controls">
          <div>
            {{ isResendDisabled ? '(Wait 30 seconds to retry)' : ''}}
          </div>
          <button class="button" @click="resend" :disabled="isResendDisabled">Resend email</button>
          <button class="button" @click="logout">Log out</button>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import firebase from '~/plugins/firebase';
import FireBaseActions from '~/mixins/firebase-actions';

export default {
  mixins: [FireBaseActions],
  data() {
    return {
      isResendDisabled: false,
    };
  },
  computed: {
    email() {
      return this.$store.getters['user/get'].email;
    },
  },
  methods: {
    async resend() {
      this.isResendDisabled = true;

      firebase.auth().currentUser.sendEmailVerification({
        url: 'https://freeirc.cloud/',
      });
      setTimeout(() => { this.isResendDisabled = false; }, 30000);
    },
  },
};
</script>
<style lang="scss" scoped>
.controls {
  padding-top: 20px;
}
.button {
  background-color: #3680FF;
  padding: 10px 20px;
  margin-right: 20px;
  margin-bottom: 15px;
  margin-top: 20px;
  color: #fff;
  border-radius: 50px;
  border: none;
  font-size: 18px;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    background-color: #6b92d4;
  }
}
.verify-email-screen {
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  h1 {
    font-size: 38px;
    margin-bottom: 50px;
    color: #f8f8f8;
  }
  font-size: 20px;
  background-color: #242526;
  color: #F8F8F8;
  font-family: 'ABeeZee';
}
main {
  z-index: 2;
  //padding-left: calc(50% - 150px);
  //padding-right: calc(50% - 150px);

  //padding-top: 33%;

  a {
    color: #b0b3b8;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

}

.box-container {
  background-color: #3a3b3c;
  color: #f8f8f8;
  border-radius: 3px;
  padding: 30px 30px 10px 30px;
  .intro {
    max-width: 400px;
  }
  margin-top: 20px;
  width: 60vw;
}

.verify-email-screen {
  margin: 0px;
  height: 100vh;
  background: #242526;
  width: 100vw;
}
.card-container {
  background-color: #e3e3e3;
  color: black;
  font-size: 24px;
}
</style>
