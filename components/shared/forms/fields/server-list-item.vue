<template>
  <div>
    <h2>Server</h2>
    <Server
            @update="childUpdated"
    />
    <IRCNick
            @update="childUpdated"
    />
    <IRCChannelList
            @update="childUpdated"
    />
  </div>
</template>

<script>
import Validatable from '~/mixins/validatable';

import Server from '~/components/shared/forms/fields/server.vue';
import IRCNick from '~/components/shared/forms/fields/irc-nick.vue';
import IRCChannelList from '~/components/shared/forms/fields/irc-channel-list.vue';

export default {
  extends: Validatable,
  components: {
    IRCChannelList,
    IRCNick,
    Server,
  },
  data() {
    return {
      name: 'server',
      targets: [],
    };
  },
  methods: {
    getValue() {
      return this.getChildrenValues();
    },

    validate() {
      this.VALIDATE_CHILDREN();
    },
  },
};
</script>
<style scoped>
</style>
