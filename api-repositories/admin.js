const resource = '/admin';

export default (axios) => ({
  getSystemSummary(payload) {
    return axios.$get(`${resource}/system_summary`, payload);
  },
  perform(payload) {
    return axios.$post(`${resource}/perform`, payload);
  },
});
