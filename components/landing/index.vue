<template>
  <LandingPageTemplate>
    <Header />
    <main>
      <div class="page-1">
        <div class="left">

          <h1 :class="{ show: show_phase1 }" class="fade-in">
            Free, browser-based IRC service in the cloud that keeps you connected.
          </h1>
          <div :class="{ show: show_phase2 }" :key="2" class="marketing-points fade-in">
            <p>
              Access IRC from a pc/mobile browser or download a desktop client.
            </p>
            <p>
              Persist connection to multiple IRC networks when you are away.
            </p>
          </div>
          <button :class="{ show: show_phase3 }" @click.prevent="$router.push('/signup')" class="button-1 signup fade-in">
            Sign up
          </button>
        </div>

        <div :class="{ show: show_phase3 }" class="right fade-in">
          <div class="dark-area"/>
          <img class="screenshot" src="freeirc-screenshot-tinified.png" alt="freeirc-widescreen-screenshot">
        </div>
      </div>

      <div class="page-2">
        <div class="white-transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="100vw" height="248.422" preserveAspectRatio="none" viewBox="0 0 1281.053 248.422"> <path id="Path_1" data-name="Path 1" d="M-1.053,902.105s2.105-51.579,171.579-75.789c1.495-.747,937.642-52.813,937.895-53.684C1280,754.737,1280,705.263,1280,705.263V953.685L-1.053,948.422Z" transform="translate(1.053 -705.263)" fill="#f3f3f3"/> </svg>
        </div>
        <div class="features-outer">
          <div class="features">

            <div class="right">
              <img alt="freeirc-mobile-screenshot" src="freeirc-mobile-screenshot-tinyfied.png">
            </div>

            <div class="left">
              <h1 id="features"> Features </h1>

              <div class="feature-item">Persist connection to multiple networks. Available networks: IRCnet, QuakeNet. </div>
              <div class="feature-item">Access IRC using your mobile phone, desktop PC, or any device with a browser on it.</div>
              <div class="feature-item">Upload pictures within seconds and share them with other users.</div>
              <div class="feature-item">Receive push notifications to your smartphone when someone mentions you or sends you a private message.</div>
              <div class="feature-item">For more, check out the source code on <a href="https://github.com/kahilav2/freeirccloud-frontend">GitHub</a></div>
            </div>
          </div>
        </div>

        <div class="downloads-outer">
          <h1 id="downloads">Downloads</h1>

          <div class="download-intro">
            <p>Use freeIRC on Windows, Mac OS, or Linux with a native client.</p>
          </div>

          <div class="download-area">
            <div class="download-box">
              <h2>Windows 10</h2>
              <a href="https://firebasestorage.googleapis.com/v0/b/superirc.appspot.com/o/public%2Fdesktop-client%2FfreeIRC-win32-x64.zip?alt=media"><svg xmlns="http://www.w3.org/2000/svg" width="51.917" height="32.864" viewBox="0 0 51.917 32.864"><g id="Component_1_1" data-name="Component 1 – 1" transform="translate(1.505)"><path id="Path_2" data-name="Path 2" d="M5.445-12.106S3.908.006,7.883,0c12.2-.019,38.126-.066,42.267,0,4.877.085,3.793-12.106,3.793-12.106" transform="translate(-5.152 31.364)" fill="none" stroke="#f2f2f2" stroke-width="3"/><path id="Path_4" data-name="Path 4" d="M0,3.636V26" transform="translate(23.848 -3.636)" fill="none" stroke="#f2f2f2" stroke-width="4"/><path id="Path_3" data-name="Path 3" d="M0,0,11.122,9.409" transform="translate(12.693 14.364)" fill="none" stroke="#f2f2f2" stroke-width="3"/><line id="Line_4" data-name="Line 4" x1="13" y2="10" transform="translate(22.848 14.364)" fill="none" stroke="#f2f2f2" stroke-width="3"/></g></svg></a>
            </div>
            <div class="download-box">
              <h2>Mac OS</h2>
              <a href="https://firebasestorage.googleapis.com/v0/b/superirc.appspot.com/o/public%2Fdesktop-client%2FfreeIRC-mac-x64.zip?alt=media"><svg xmlns="http://www.w3.org/2000/svg" width="51.917" height="32.864" viewBox="0 0 51.917 32.864"><g id="Component_1_1" data-name="Component 1 – 1" transform="translate(1.505)"><path id="Path_2" data-name="Path 2" d="M5.445-12.106S3.908.006,7.883,0c12.2-.019,38.126-.066,42.267,0,4.877.085,3.793-12.106,3.793-12.106" transform="translate(-5.152 31.364)" fill="none" stroke="#f2f2f2" stroke-width="3"/><path id="Path_4" data-name="Path 4" d="M0,3.636V26" transform="translate(23.848 -3.636)" fill="none" stroke="#f2f2f2" stroke-width="4"/><path id="Path_3" data-name="Path 3" d="M0,0,11.122,9.409" transform="translate(12.693 14.364)" fill="none" stroke="#f2f2f2" stroke-width="3"/><line id="Line_4" data-name="Line 4" x1="13" y2="10" transform="translate(22.848 14.364)" fill="none" stroke="#f2f2f2" stroke-width="3"/></g></svg></a>
            </div>
            <div class="download-box">
              <h2>Linux</h2>
              <a href="https://firebasestorage.googleapis.com/v0/b/superirc.appspot.com/o/public%2Fdesktop-client%2FfreeIRC-linux-x64.deb?alt=media"><svg xmlns="http://www.w3.org/2000/svg" width="51.917" height="32.864" viewBox="0 0 51.917 32.864"><g id="Component_1_1" data-name="Component 1 – 1" transform="translate(1.505)"><path id="Path_2" data-name="Path 2" d="M5.445-12.106S3.908.006,7.883,0c12.2-.019,38.126-.066,42.267,0,4.877.085,3.793-12.106,3.793-12.106" transform="translate(-5.152 31.364)" fill="none" stroke="#f2f2f2" stroke-width="3"/><path id="Path_4" data-name="Path 4" d="M0,3.636V26" transform="translate(23.848 -3.636)" fill="none" stroke="#f2f2f2" stroke-width="4"/><path id="Path_3" data-name="Path 3" d="M0,0,11.122,9.409" transform="translate(12.693 14.364)" fill="none" stroke="#f2f2f2" stroke-width="3"/><line id="Line_4" data-name="Line 4" x1="13" y2="10" transform="translate(22.848 14.364)" fill="none" stroke="#f2f2f2" stroke-width="3"/></g></svg></a>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer/>
  </LandingPageTemplate>
</template>

<script>
import LandingPageTemplate from '~/components/landing/landing-page-template.vue';
import Header from '~/components/landing/header.vue';
import Footer from '~/components/landing/footer.vue';

export default {
  layout: 'default',
  components: {
    LandingPageTemplate,
    Header,
    Footer,
  },
  data() {
    const animationShown = this.$store.getters['app/get'].landingPageAnimationShown;
    if (!animationShown) { this.$store.dispatch('app/set', { landingPageAnimationShown: true }); }
    return {
      show_phase1: animationShown,
      show_phase2: animationShown,
      show_phase3: animationShown,
      show_phase4: animationShown,
    };
  },
  computed: {
    fbUser() { return this.$store.getters['user/get'].fbUser; },
  },
  mounted() {
    this.kickstartAnimation();
  },
  methods: {
    kickstartAnimation() {
      const animationStepTime = 1200;
      setTimeout(() => { this.show_phase1 = true; }, 0.5 * animationStepTime);
      setTimeout(() => { this.show_phase2 = true; }, 1.5 * animationStepTime);
      setTimeout(() => { this.show_phase3 = true; }, 2.5 * animationStepTime);
      setTimeout(() => { this.show_phase4 = true; }, 3.5 * animationStepTime);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 2480px;
}
.fade-in {
  opacity: 0;
  visibility: hidden;
  transition: opacity 1.2s;
  &.show {
    opacity: 1;
    visibility: visible;
  }
}
.downloads-outer {
  max-width: 760px;
  margin: 0 auto;
  display: block;
}
.features-outer {
  max-width: 760px;
  margin: 0 auto;
  display: block;
  margin-bottom: 100px;
}
.features {
  color: #444343;
  display: flex;
  flex-direction: var(--front-page-flex-direction);
  .left {
    flex: 1 7 auto;
    margin-bottom: var(--front-page-left-margin-right);
    .feature-item {
      margin-bottom: 1.6em;

    }
  }
  .right {
    flex: 1 5 auto;
    margin-right: 3.2em;
    img {
      width: 100%;
    }
  }
}

.download-box {
  width: 200px;
  height: 170px;
  a {
    display: block;
    background: rgb(54,128,255);
    background: linear-gradient(90deg,
      rgb(54, 128, 255) 23%,
      rgb(58, 110, 191) 100%);
    color: #fff;
    border-radius: 13px;
    text-align: center;
    padding-top: 7px;
    border: none;
    width: 200px;
    height: 50px;
    border-radius: 16px;
    position: relative;
    box-shadow: 0 1px 2px rgba(0,0,0,0.15);
    transition: all 0.3s ease-in-out;
    &:hover {
      box-shadow: 2px 2px 2px #000;
    }
    &:after {
      content: '';
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      opacity: 0;
      border-radius: 5px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      transition: opacity 0.3s ease-in-out;
    }
  }
  h2 {
    font-weight: normal;
    color: #000;
    font-size: 30px;
    margin-bottom: 25px;
    text-align: center;
  }
}
.download-intro {
  width: var(--front-page-download-intro-width);
  color: #444343;
  margin-bottom: 8em;
}
.download-area {
  max-width: 800px;
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
  flex-direction: var(--front-page-flex-direction);
  margin-bottom: 50px;
}
.marketing-points {
  margin-bottom: 60px;
}
.screenshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left;
  box-shadow: #000 0px 3px 6px;
}
.button-1.signup {
  width: 150px;
  height: 50px;
  font-size: 24px;
}
.button-1.download {
  width: 200px;
  height: 50px;
  border-radius: 16px;
}
.page-1 {
  padding-left: var(--front-page-page-padding);
  padding-right: var(--front-page-page-padding);
  display: flex;
  flex-direction: var(--front-page-flex-direction);
  margin-bottom: var(--front-page-page-1-margin-bottom);

  .left {
    flex: 1 5 auto;
    margin-right: var(--front-page-left-margin-right);
    z-index: 1;
    margin-bottom: var(--front-page-left-margin-bottom);
  }
  .right {
    flex: 1 5 auto;
    position: relative;
  }
}
.page-2 {
  position: relative;
  height: var(--front-page-page-2-height);

  padding-top: var(--front-page-page-2-padding-top);
  padding-left: var(--front-page-page-2-padding-horizontal);
  padding-right: var(--front-page-page-2-padding-horizontal);
  background-color: #f3f3f3;
  h1 {
    color: #1c1c1c;
  }
}
.dark-area {
  position: absolute;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 75%);
  width: 100%;
  height: 15%;
  bottom: 0px;
}
p {
  margin-bottom: 26px;
}
.white-transition {
  position: absolute;
    left: 0px;
    top: -230px;
}
</style>
