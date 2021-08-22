<template>
  <div class="channel-name">
    <div v-if="channel.isChannel()" class="user-count-area" @click="openUserListModal">
      <div class="user-count">{{ channel.users.length }}</div>
      <img class="users-icon" alt="user-list" src="users.svg"/>
    </div>
    {{ channelName }}
    {{ topic }}
  </div>
</template>

<script>
import ModalFactory from '~/utils/factories/modal-factory';

export default {
  props: {
    channel: Object,
  },
  computed: {
    channelName() { return this.channel.getChannelName(); },
    topic() { return this.channel.getTopic() || ''; },
  },
  methods: {
    openUserListModal() {
      new ModalFactory(this).createUserListModal({
        contentID: 'userList',
        userList: this.channel.users,
      }, () => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.channel-name {

  width: calc(100vw - var(--left-side-bar-width));
  margin-left: calc(var(--page-margin));
  z-index: 1;
  font-weight: 500;
  margin-top: 0px;
  margin-bottom: 6px;
  color: var(--app-tertiary-color);
  display: block;
}
.users-icon {
  display: inline-block;
  height: 15px;
  filter: brightness(0.65);
}
.user-count {
  display: inline-block;
  color: #b0b3b8;
}
.user-count-area {
  display: inline-block;
  &:hover {
    cursor: pointer;
  }
}
</style>
