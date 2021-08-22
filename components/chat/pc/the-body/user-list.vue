<template>
  <div class="user-list">
    <template v-if="channel.isChannel()">
      <div class="title"><img class="users-icon" alt="user-list" src="users.svg"/></div>
      <div v-for="(user, index) in channel.users.slice(0,maxUsersShown)" :key="index" class="item">
        {{ user.status + user.userName }}
      </div>
      <VButton v-if="maxUsersShown < channel.users.length" @click="incrementMaxUsersShown(1000)">Show more</VButton>
    </template>
  </div>
</template>
<script>
import VButton from '~/components/shared/pc/v-button.vue';

export default {
  components: {
    VButton,
  },
  props: {
    channel: Object,
  },
  data() {
    return {
      maxUsersShown: 50,
    };
  },
  methods: {
    incrementMaxUsersShown(amount) { this.maxUsersShown += amount; },
  },
};
</script>
<style lang="scss" scoped>
.user-list {
  float: right;
  text-align: left;
  padding: 0px 0px 0px 0px;
  height: calc(100vh - 85px);
  overflow-x: hidden;
  overflow-y: auto;
  width: 100px;

}
.title {
  background-color: var(--secondary-color);
  color: white;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  padding-left: 0px;
}
.item {
  padding-left: 5px;
  color: var(--unimportant-color);
}
.users-icon {
  height: 2.5vh;
  max-height: 20px;
}
</style>
