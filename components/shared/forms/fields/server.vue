<template>
  <div>

    <select v-model="serverID">
      <option :value="null" disabled selected hidden>Please select server</option>
      <template v-if="listServers !== null">
        <option v-for="(listServer, index) in listServers" :key="index" :value="listServer.serverID" >
          {{ `${listServer.serverName} (${listServer.serverURL})` }}
        </option>
      </template>
    </select>
  </div>
</template>

<script>
import Validatable from '~/mixins/validatable';

export default {
  extends: Validatable,
  data() {
    return {
      listServers: null,
      targets: ['serverID', 'listServers'],
      serverID: null,
      name: 'serverID',
      isErroneous: false,
    };
  },
  async created() {
    try {
      this.listServers = await this.$serverAPI.getServerList();
    } catch (e) {
      this.isErroneous = true;
      console.error(e);
    }
  },
  methods: {
    getValue() {
      return { serverID: this.serverID };
    },
    validate() {
      this.VALIDATE('listServers', 'isNotNull');
      this.VALIDATE('serverID', 'isNotNull');
    },
  },
};
</script>
<style scoped>
</style>
