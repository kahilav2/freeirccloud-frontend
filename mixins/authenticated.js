import firebase from '~/plugins/firebase';

const ACCEPTED_NON_LOGIN_PAGES = [
  /\/login$/,
  /\/password\/reset$/,
  /\/signup$/,
  /\/u\//,
];
const PATHS_WITH_NO_REDIRECT = [
  /\/$/,
  /\/admin$/,
  /\/u\//,
];

export default {
  data() {
    return {
      authListener: null,
    };
  },
  created() {
    this.$store.dispatch('app/set', { currentAction: 'login' });
    if (this.authListener !== null) return;
    this.authListener = firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        fbUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
          this.$store.dispatch('user/set', {
            fbUser,
            email: fbUser.email,
            idToken,
            isAuthenticated: true,
            userID: fbUser.uid,
            isEmailVerified: fbUser.emailVerified,
            sendEmailVerification: fbUser.sendEmailVerification,
          });

          this.$store.dispatch('app/set', { currentAction: fbUser.emailVerified ? 'authenticated' : 'unverifiedEmail' });

          this.$axios.setToken(idToken, 'Bearer', ['post', 'delete', 'put', 'get', 'common']);

          if (PATHS_WITH_NO_REDIRECT.find((regex) => regex.test(this.$route.fullPath))) return;
          this.$router.push('/');
        });
      } else {
        if (ACCEPTED_NON_LOGIN_PAGES.find((regex) => regex.test(this.$route.fullPath))) {
          this.$store.dispatch('app/set', { currentAction: 'unauthenticated' });
          return;
        }

        if (this.$store.getters['app/get'].currentAction === this.$getConst('actions.logout')) {
          this.$router.go({ path: this.$router.currentRoute.path, force: true });
          return;
        }
        this.$store.dispatch('app/set', { currentAction: 'unauthenticated' });
      }
    });
  },
};
