<template>
  <div>
    <label>IRC channel </label>
    <input :class="!isValid && (hasTargetChanged['channelName'] || hasUserTriedToSubmit) ? 'input-error' : ''"
            type="channelName"
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
  },
};
</script>
<style scoped>
</style>
