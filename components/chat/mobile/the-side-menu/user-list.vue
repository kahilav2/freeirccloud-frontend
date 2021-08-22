<template>
  <div class="user-list">
    <div class="title">
      <img class="users-icon" alt="user-list" src="users.svg"/>
      {{ channel.getChannelName() }}
    </div>
    <div class="user-list-container">
      <div class="item" v-for="(user, index) in channel.users" :key="index">
        {{ user.status + user.userName }}
      </div>
    </div>
  </div>

</template>
<script>
export default {
  props: {
    channel: Object,
  },
};
</script>
<style lang="scss" scoped>
.user-list-container {
  display: inline-block;
  width: 100%;
  max-height: 20vh;
  overflow-y: scroll;
}
.user-list {
  display: inline-block;
  width: 100%;
}
.title {
  color: white;
  font-weight: 600;
  background-color: #242526;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 40px;
}
.item {
  color: #b0b3b8;
  padding-left: 60px;
}
</style>
