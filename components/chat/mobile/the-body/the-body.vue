<template>
  <div class="open-channel" id="open-channel">
    <Title
        v-if="openChannel !== undefined && openChannel !== null"
        :channel="openChannel"/>
    <ChatNotification
        v-if="newMessages"
        @click="handleNewMessagesNotificationClick">
        New messages!
    </ChatNotification>

    <div v-if="openChannel !== undefined && openChannel !== null" class="open-channel-inner">
      <ul>
        <LoadMoreMessages v-if="openChannel.getHasMoreLogs()" :userSession="userSession" :channel="openChannel"/>
        <Message v-for="(message, index) in messages" :key="index"
            :lastSeen="openChannel.oldLastSeen"
            :message="message"
            :userName="openChannel.getServer().getUserName()"
            :isChannelMessage="openChannel.isChannel()"
        />
      </ul>
    </div>
  </div>
</template>
<script>

import Title from '~/components/chat/mobile/the-body/title.vue';
import ChatNotification from '~/components/chat/mobile/the-body/chat-notification.vue';
import LoadMoreMessages from '~/components/shared/load-more-messages.vue';
import Message from '~/components/shared/message.vue';

export default {
  components: {
    Title,
    ChatNotification,
    LoadMoreMessages,
    Message,
  },
  props: {
    userSession: Object,
  },
  data() {
    return {
      magnet: true,
      newMessages: false,
      channelChanged: true,
      oldMessagesLength: 0,
      isMounted: false,
    };
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
  watch: {
    openChannel(newOpenChannel) {
      // eslint-disable-next-line no-param-reassign
      newOpenChannel.currentAction = 'ChannelChange';
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      const openChat = this.$root.$el.querySelector('.open-channel-inner');
      if (!openChat) { return; }
      const { scrollHeight } = openChat;
      this.$root.$el.querySelector('.open-channel').scrollTo(0, scrollHeight);
    });
    this.$root.$el.querySelector('.open-channel').addEventListener('scroll', this.handleScroll);
    this.isMounted = true;
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
    handleNewMessagesNotificationClick() {
      this.scrollToBottom();
      this.newMessages = false;
    },
    scrollToBottom() {
      const openChat = this.$root.$el.querySelector('.open-channel-inner');
      if (!openChat) { return; }
      const { scrollHeight } = openChat;
      this.$root.$el.querySelector('.open-channel').scrollTo(0, scrollHeight);
    },
    handleScroll(event) {
      const { scrollTop } = event.srcElement;
      const { scrollHeight } = event.srcElement;
      const { offsetHeight } = event.srcElement;

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
<style scoped lang="scss">
.open-channel {
  width: 100%;
  height: calc(76vh - 77px);
  background-color: #000;
  overflow-x: hidden;
  overflow-y: auto;
  margin-bottom: 4px;
}
.open-channel-inner {
  display: flex;
  flex-direction: column-reverse;
  text-align: left;
  padding: 0vh 2vw;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-wrap: break-word;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
ul {
  list-style: none;
  padding: 18px 0px 0px 3px;
  color: var(--font-color);
}

</style>
