<template>
  <div>
    <h3>Channels</h3>
    <div v-for="index in channels" :key="index" class="channel-item">
      <div>
        <button @click="removeChannel(index)">-</button>
      </div>

      <IRCChannel @update="childUpdated"/>
    </div>
    <button @click="addChannel" class="add-button">+</button>
  </div>
</template>

<script>
import Validatable from '~/mixins/validatable';
import IRCChannel from '~/components/shared/forms/fields/addable-irc-channel.vue';

import { lowestUnusedNumberInArray } from '~/utils/common';

export default {
  extends: Validatable,
  components: {
    IRCChannel,
  },
  data() {
    return {
      name: 'channels',
      targets: ['channels'],
      channels: [],
    };
  },
  created() {
    this.addChannel();
  },
  methods: {
    removeChannel(index) {
      if (this.channels.length === 1) { return; }

      this.channels = this.channels.filter((i) => i !== index);
    },
    addChannel() {
      if (this.channels.length > 6) { return; }
      this.channels.push(lowestUnusedNumberInArray(this.channels, 0));
    },
    getValue() {
      return this.getChildrenValuesAsArray();
    },
    validate() {
      this.VALIDATE_CHILDREN();
    },
  },
};
</script>
<style scoped lang="scss">
h3 {
  margin-bottom: 7px;
  font-weight: normal;
  font-size: 20px;
}
.add-button {
  color: #3a3b3c;
  background: none;
  font-size: 28px;
  border: 0px;
  cursor: pointer;
}
.channel-item {
  button {
    line-height: 6px;
    width: 23px;
    color: #3a3b3c;
    font-size: 44px;
    background: none;
    float: right;
    border: 0;
    cursor: pointer;
  }
}
</style>
