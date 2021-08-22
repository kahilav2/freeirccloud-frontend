const resource = '/users';

export default (axios, $store) => ({
  register(payload) {
    axios.setHeader('Content-Type', 'application/json;charset=utf-8'); // TODO: What's this??
    return axios.$post(`${resource}/`, payload);
  },
  getSettings(payload) {
    const { userID } = $store.getters['user/get'];
    return axios.$get(`${resource}/${userID}/settings`, payload);
  },
  setSettings(payload) {
    const { userID } = $store.getters['user/get'];
    return axios.$put(`${resource}/${userID}/settings`, payload);
  },
  setFCMToken(payload) {
    const { userID } = $store.getters['user/get'];
    return axios.$put(`${resource}/${userID}/fcm_token`, payload);
  },
  getUser() {
    const { userID } = $store.getters['user/get'];
    return axios.$get(`${resource}/${userID}/`);
  },
});
