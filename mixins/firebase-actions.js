import firebase from '~/plugins/firebase';

export default {
  methods: {
    logout() {
      this.$store.dispatch('app/set', { currentAction: this.$getConst('actions.logout'), theme: 'light' });

      if (this.userSession) this.userSession.getSocket().close();

      firebase.auth().signOut();
      // TODO: make sure currentAction is changed back

      this.$store.dispatch('user/set', { fbUser: null });
    },
  },
};
