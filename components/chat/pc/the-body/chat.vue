<template>
  <div class="open-channel" id="open-channel">
    <NewMessagesNotification v-if="newMessages" @click="handleLockButtonPressed"/>
    <div class="open-chat">
      <ul id="scroller">
        <LoadMoreMessages v-if="channel.getHasMoreLogs()" :userSession="userSession" :channel="openChannel"/>
        <Message v-for="(message, index) in messages" :key="index"
            :lastSeen="openChannel.oldLastSeen"
            :message="message"
            :userName="openServer.getUserName()"
            :isChannelMessage="openChannel.isChannel()"/>

      </ul>
    </div>
  </div>
</template>

<script>
import NewMessagesNotification from '~/components/chat/pc/the-body/new-messages-notification.vue';
import LoadMoreMessages from '~/components/shared/load-more-messages.vue';
import Message from '~/components/shared/message.vue';

export default {
  props: {
    userSession: Object,
    channel: Object,
  },
  components: {
    Message,
    LoadMoreMessages,
    NewMessagesNotification,
  },
  data() {
    return {
      magnet: true,
      newMessages: false,
    };
  },
  watch: {
    openChannelIndex() {
      this.maxUsersShown = 50;
      this.newMessages = false;
    },
    openChannel(newOpenChannel) {
      // eslint-disable-next-line no-param-reassign
      newOpenChannel.currentAction = 'ChannelChange';
    },
  },
  computed: {
    openServerIndex() { return this.$store.getters['app/get'].openServerIndex; },
    openChannelIndex() { return this.$store.getters['app/get'].openChannelIndex; },
    openServer() { return this.userSession.servers[this.openServerIndex]; },
    openChannel() {
      return this.openServer.channels[this.openChannelIndex];
    },
    messages() {
      this[`on${this.openChannel.currentAction}`]();
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.openChannel.currentAction = null;
      return this.openChannel.messages;
    },
  },
  mounted() {
    this.scrollToBottom();
    this.$root.$el.querySelector('.open-channel').addEventListener('scroll', this.handleScroll);
  },
  methods: {
    onChannelChange() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    onLogAppend() {
      // keep scroll position
      const openChannelElement = this.$root.$el.querySelector('.open-channel');
      const initialScrollHeight = openChannelElement.scrollHeight;
      this.$nextTick(() => {
        const newScrollHeight = openChannelElement.scrollHeight;
        openChannelElement.scrollTo(0, newScrollHeight - initialScrollHeight);
      });
    },
    onMessagePush() {
      this.$nextTick(() => {
        const isOwnMessage = this.openChannel.messages[this.openChannel.messages.length - 1].isOwn;
        if (this.magnet || isOwnMessage) {
          this.openChannel.setLastSeen(new Date());
          this.scrollToBottom();
        } else {
          this.newMessages = true;
        }
      });
    },
    handleLockButtonPressed() {
      this.scrollToBottom();
      this.newMessages = false;
    },
    scrollToBottom() {
      const openChat = this.$root.$el.querySelector('.open-chat');
      if (!openChat) { return; }
      const { scrollHeight } = openChat;
      this.$root.$el.querySelector('.open-channel').scrollTo(0, scrollHeight);
    },
    handleScroll({ srcElement: { scrollTop, scrollHeight, offsetHeight } }) {
      if (scrollTop + offsetHeight >= scrollHeight - 5) {
        this.magnet = true;
        this.newMessages = false;
      } else {
        this.magnet = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.open-channel {
  width: calc(100vw - var(--left-side-bar-width));
  flex-grow: 1;
  margin-left: calc(var(--page-margin));
  padding-right: var(--page-margin);

  overflow-x: hidden;
  overflow-y: auto;
}
.open-chat {
  display: flex;
  flex-direction: column-reverse;
  text-align: left;
}
ul {
  color: var(--font-color);
  list-style: none;
  padding: 0px 0px 0px 0px;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-wrap: break-word;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

</style>
