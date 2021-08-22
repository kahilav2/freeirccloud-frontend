<template>
  <div class="container">
    <template v-if="currentAction === 'login' || currentAction === 'logout'">
      <div class="loading-screen">
        <div class="background-text-container">
          <div class="background-text">freeIRC</div>
        </div>
        <div class="loading-text">
          Loading...
        </div>
      </div>
    </template>
    <template v-else-if="currentAction === 'unverifiedEmail'">
      <UnverifiedEmailPage />
    </template>
    <template v-else-if="currentAction === 'authenticated'">
      <MobileChat v-if="isMobile" :userSession="userSession"/>

      <PcChat v-else :userSession="userSession"/>

    </template>
    <template v-else>
      <LandingPage/>
    </template>
  </div>
</template>

<script>

import UserSession from '~/irc/user-session';
import firebase from '~/plugins/firebase';

import PcChat from '~/components/chat/pc/index.vue';
import MobileChat from '~/components/chat/mobile/index.vue';
import LandingPage from '~/components/landing/index.vue';
import UnverifiedEmailPage from '~/components/unverified-email/index.vue';

// import { getFileList } from '~/utils/firebase';

export default {
  layout: 'default',
  components: {
    MobileChat,
    PcChat,
    LandingPage,
    UnverifiedEmailPage,
  },
  data() {
    return {
      userSession: null,
    };
  },
  watch: {
    channels() {
      if (this.openChannelIndex === -1) { // TODO: whats this???
        this.openChannelIndex = 0;
      }
    },
    theme(newVal) {
      document.getElementById('body-container').setAttribute('data-theme', newVal);
    },
    platform(newVal) {
      document.getElementById('body-container').setAttribute('data-platform', newVal);
    },
    currentAction(newVal) {
      if (newVal === 'authenticated') {
        this.afterAuthenticated();
      }
    },
  },
  computed: {
    theme() {
      return this.$store.getters['app/get'].theme;
    },
    platform() {
      return this.$store.getters['app/get'].platform;
    },
    isMobile() {
      return this.$store.getters['user/get'].isMobile;
    },
    currentAction() {
      return this.$store.getters['app/get'].currentAction;
    },
    isEmailVerified() {
      return this.$store.getters['user/get'].isEmailVerified;
    },
    email() {
      return this.$store.getters['user/get'].email;
    },
  },
  mounted() {
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    const isMobile = (window.innerWidth <= 425);
    this.$store.dispatch('user/set', { isMobile });
    this.$store.dispatch('app/set', { platform: isMobile ? 'mobile' : 'pc' });

    let isSoundOn = !(window.localStorage.getItem('isSoundOn') === '0');
    if (isMobile) isSoundOn = false;
    this.$store.dispatch('app/set', { isSoundOn });

    if (this.currentAction === 'authenticated') {
      this.afterAuthenticated();
    }

    this.checkIfVersionHasUpdatedSinceLastUse();
  },
  beforeDestroy() {
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  },
  methods: {
    checkIfVersionHasUpdatedSinceLastUse() {
      const lastUsedVersionCookieExists = window.localStorage.getItem('lastUsedVersion') !== null;
      if (lastUsedVersionCookieExists) {
        const versionHasUpdated = (window.localStorage.getItem('lastUsedVersion') !== process.env.version);
        if (versionHasUpdated) {
          window.localStorage.setItem('lastUsedVersion', process.env.version);
          this.$store.dispatch('app/set', { versionHasUpdatedSinceLastUse: versionHasUpdated });
        }
      } else {
        window.localStorage.setItem('lastUsedVersion', process.env.version);
        this.$store.dispatch('app/set', { versionHasUpdatedSinceLastUse: true });
      }
    },
    async afterAuthenticated() {
      try {
        document.title = this.$getConst('page.title');
        this.$nextTick(() => {
          this.initializeNotifications();
        });

        this.beginUserSession();
      } catch (error) {
        console.error(error);
      }
    },
    initializeNotifications() {
      if (this.isTokenSentToServer()) {
        return;
      }
      const messaging = firebase.messaging();

      if (messaging.vapidKey === null) {
        messaging.usePublicVapidKey('BBPvAtZ0lb8WTGKEa1QBKACMyVC2eCa-tQi8J1Vg-c7s0gDWnODB4DVm6B4g7yyLogyWi7iTOoooAH8Pkf7zif0');
      }
      messaging.getToken().then(async (fcmToken) => {
        await this.$userAPI.setFCMToken({ fcmToken, platform: this.$store.getters['app/get'].platform });
        this.setTokenSentToServerFlg(true);
      }).catch((error) => {
        switch (error.code) {
          case 'messaging/permission-blocked':
            console.log('messaging/permission-blocked');
            break;
          default:
            console.error(error);
            break;
        }
      });
    },
    // eslint-disable-next-line no-unused-vars
    onVisibilityChange(event) {
      if (!document.hidden) {
        this.$store.dispatch('app/restoreTitle', { ctx: this });
      }
    },
    isTokenSentToServer() {
      return window.localStorage.getItem('sentToServer') === '1';
    },

    setTokenSentToServerFlg(sent) {
      window.localStorage.setItem('sentToServer', sent ? '1' : '0');
    },
    async beginUserSession() {
      this.$store.dispatch('app/set', { isConnectionClosed: false });

      this.userSession = new UserSession(this.$root);
      await this.userSession.connectToBackEnd();
      this.$store.dispatch('app/set', { isConnectionOpened: true });
    },
  },
};
</script>

<style lang="scss">
.loading-screen {
  margin: 0px;
  height: 100vh;
  background: #242526;
  width: 100vw;
}
.background-text {
  font-size: 400px;
  font-family: 'Racing Sans One';
  color: rgba(0,0,0,0.23);
  text-align: center;
  transform: rotate(18deg);
  user-select: none;
}
.background-text-container {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0px;
  user-select: none;
}
.loading-text {
  margin: 0 auto;
  width: 100%;
  font-size: 32px;
  text-align: center;
  z-index: 2;
  position: relative;
  padding-top: 45vh;
  color: white;
}
</style>
