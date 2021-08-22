// Vuex is created so that param-reassign must be permitted: (https://vuex.vuejs.org/guide/mutations.html)
/* eslint-disable no-param-reassign */

const getDefaultState = () => ({
  landingPageAnimationShown: false,
  appStateTransition: null,
  shiftKeyPressed: false,
  tabFillCandidateIndex: 0,
  input: '',
  isClockBright: false,
  isUploading: false,
  isSoundOn: false,
  uploadPercentage: null,
  uploadUrl: null,
  currentAction: null,
  openServerIndex: 0,
  openChannelIndex: 0,
  activeModalLevel: 0, // 0 means no modals are active
  loading: false,
  platform: null,
  isConnectionClosed: false,
  isConnectionOpened: false,
  connectionClosedReason: null,
  isSideMenuOpen: false,
  theme: 'dark',
  savedSettings: null,
  pageTitleMessageCount: 0,
  versionHasUpdatedSinceLastUse: false,
});

export const getters = {
  get(state) { return state; },
  getThemeText(state) {
    return (state.theme !== null) ? state.theme : 'Dark';
  },
};

export const mutations = {
  reset(state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, getDefaultState());
  },
  set(state, payload) {
    Object.keys(payload).forEach((key) => {
      if (key in state) {
        state[key] = payload[key];
      } else {
        console.error(`Tried to change appState with a non-existent key, key=${key}`);
      }
    });
  },
  switchTheme(state, theme) {
    state.theme = theme;
  },
  toggleSideMenu(state) {
    state.isSideMenuOpen = !state.isSideMenuOpen;
  },
  setSettings(state, settings) {
    state.savedSettings = settings;
    state.theme = settings.theme;
  },
};
export const actions = {
  reset({ commit }) {
    commit('reset');
  },
  set({ commit }, payload) {
    commit('set', payload);
  },
  async switchTheme({ commit, state }, { ctx }) {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    const { platform } = state;
    try {
      ctx.$userAPI.setSettings({ theme: newTheme, platform });
    } catch (error) {
      console.error(error);
    }
    commit('switchTheme', newTheme);
  },
  toggleSideMenu({ commit }) {
    commit('toggleSideMenu', {});
  },
  async fetchSettings({ commit }, payload) {
    try {
      const completeUserSettings = await payload.ctx.$userAPI.getSettings({});
      const platform = payload.ctx.$store.getters['app/get'].platform || 'pc';
      const settingsForCurrentPlatform = completeUserSettings.find((settingItem) => settingItem.platform === platform);
      commit('setSettings', settingsForCurrentPlatform);
    } catch (error) {
      console.error(error);
    }
  },
  restoreTitle({ commit }, { ctx }) {
    document.title = ctx.$getConst('page.title');
    commit('set', { pageTitleMessageCount: 0 });
  },
};

export const state = getDefaultState;
