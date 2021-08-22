<template>
  <div class="channel-list-item">
    <input :class="!isValid && (hasTargetChanged['channelName'] || hasUserTriedToSubmit) ? 'input-error' : ''"
            type="channel"
            v-model="channelName"
            placeholder="#freeirc"
    />
  </div>
</template>

<script>
import Validatable from '~/mixins/validatable';

export default {
  extends: Validatable,
  data() {
    return {
      name: 'channelName',
      targets: ['channelName'],
      channelName: '',
    };
  },
  methods: {
    validate() {
      this.VALIDATE('channelName', 'isValidIRCChannel');
    },
    getValue() {
      return this.channelName;
    },
  },
};
</script>
<style scoped>
.channel-list-item {
  display: inline-block;
}
</style>
