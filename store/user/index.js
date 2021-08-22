// Vuex is created so that param-reassign must be permitted: (https://vuex.vuejs.org/guide/mutations.html)
/* eslint-disable no-param-reassign */

import { isJsonObject, deepCopyJson } from '~/utils/common';

const getDefaultState = () => ({
  idToken: null,
  isAuthenticated: false,
  isEmailVerified: null,
  sendEmailVerification: null,
  fbUser: null,
  userName: null,
  email: null,
  isMobile: null,
  userID: null,
});

export const getters = {
  get(state) { return state; },
};

export const mutations = {
  reset(state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, getDefaultState());
  },
  set(state, { key, value }) {
    const type = typeof value;
    switch (type) {
      case 'object':
        state[key] = (isJsonObject(value)) ? deepCopyJson(value) : value;
        break;
      default:
        state[key] = value;
    }
  },
};

export const actions = {
  reset({ commit }) {
    commit('reset');
  },
  set({ commit, state }, payload) {
    Object.keys(payload).forEach((key) => {
      if (key in state) {
        commit('set', { key, value: payload[key] });
      } else {
        console.error(`user/set: Tried to change state with a non-existent key, key=${key}`);
      }
    });
  },
};

export const state = getDefaultState;
