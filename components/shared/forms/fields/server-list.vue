<template>
  <div>
    <div v-for="index in servers" :key="index" class="server-item" :class="{last: index === servers.length - 1 }">
      <div>
        <button @click="removeServer(index)">-</button>
      </div>
      <ServerListItem @update="childUpdated" />
    </div>
    <button @click="addServer" class="add-button">+</button>
  </div>
</template>

<script>
import Validatable from '~/mixins/validatable';

import ServerListItem from '~/components/shared/forms/fields/server-list-item.vue';

import { lowestUnusedNumberInArray } from '~/utils/common';

export default {
  extends: Validatable,
  components: {
    ServerListItem,
  },
  data() {
    return {
      servers: [],
      name: 'servers',
      targets: [],
    };
  },
  created() {
    this.addServer();
  },
  methods: {
    addServer() {
      if (this.servers.length > 3) { return; }

      this.servers.push(lowestUnusedNumberInArray(this.servers, 0));
    },
    removeServer(index) {
      if (this.servers.length === 1) { return; }

      this.servers = this.servers.filter((i) => i !== index);
    },
    getValue() {
      return this.getChildrenValuesAsArray();
    },
    validate() {
      this.serverList = this.getValue().servers.map((a) => a.serverID);
      this.VALIDATE('serverList', 'hasNoDuplicates');
      this.VALIDATE_CHILDREN();
    },
  },
};
</script>
<style scoped lang="scss">
.add-button {
  color: #f5f5f5;
  font-size: 38px;
  background: none;
  border: 0px;
  cursor: pointer;
  margin-bottom: 15px;
}
/deep/ select {
  margin-bottom: 30px;

}
/deep/ h2 {
  margin-bottom: 30px;
}
/deep/ input {
  background-color: #fff;
}
.last {
  margin-bottom: 200px;
}
.server-item {
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 20px 30px 20px 30px;
  color: #3a3b3c;

  margin-bottom: 50px;
  &.last {
    margin-bottom: 10px;
  }

  button {
    line-height: 17px;
    width: 23px;
    color: #3a3b3c;
    font-size: 54px;
    background: none;
    float: right;
    border: 0;
    cursor: pointer;
  }
}

</style>
