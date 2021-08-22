const resource = '/servers';

export default (axios) => ({
  getServerList(payload) {
    return axios.$get(`${resource}/`, payload);
  },
});
