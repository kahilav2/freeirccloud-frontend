<template>
  <div class="container">
    <h2> Admin </h2>
    <div class="form-container">
      <div v-for="(userItem, index) in userList" :key="index" class="item">
        {{ userItem.email }}
        {{ userItem.userID }}
        {{ userItem.userName }}
        <template v-if="userItem.activeAt !== null">
          active on {{(new Date(userItem.activeAt)).toISOString().slice(0, 10) }}
        </template>
        regdate {{(new Date(userItem.createdAt)).toISOString().slice(0, 10) }}

        <span v-if="userItem.isOnline" class="online">online</span>
        <span v-else class="offline">offline</span>
        <span v-if="userItem.isDisabled" class="disabled">disabled!</span>
        <template v-if="userItem.isOnline">
          <button @click="disconnectUser(userItem)">Disconnect</button>
        </template>
        <template v-if="!userItem.isDisabled">
          <button @click="disableUser(userItem)">Disable</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'default',
  data() {
    return {
      idToken: null,
      userList: [],
    };
  },
  computed: {
    isAuthenticated() { return this.$store.getters['user/get'].isAuthenticated; },
  },
  watch: {
    isAuthenticated(newVal, oldVal) {
      console.log(newVal, oldVal);
      if (newVal) {
        this.fetchAdminData();
      }
    },
  },
  methods: {
    async fetchAdminData() {
      try {
        this.userList = await this.$adminAPI.getSystemSummary();
      } catch (error) {
        console.error(error);
      }
    },
    async disableUser(user) {
      try {
        // eslint-disable-next-line no-alert
        if (!window.confirm(`Do you really want to disable (ban) user ${user.email}?`)) return;
        await this.$adminAPI.perform({
          action: 'disable',
          userID: user.userID,
          idToken: this.idToken,
        });
        console.log('success');
      } catch (error) {
        console.error(error);
      }
    },
    async disconnectUser(user) {
      try {
        // eslint-disable-next-line no-alert
        if (!window.confirm(`Do you really want to disconnect user ${user.email}?`)) return;
        await this.$adminAPI.perform({
          action: 'disconnect',
          userID: user.userID,
          idToken: this.idToken,
        });
        console.log('success');
      } catch (error) {
        console.error(error);
      }
    },
  },

};
</script>
<style scoped>
.online {
  color: #63f93f;
}
.offline {
  color: #bb2514;
}
.disabled {
  color: yellow;
}
.container {
  background-color: #242526;
  color: #e3e3e3;
}
h2 {
  margin-left: 5vw;
}
.form-container {
  font-family: "ABeeZee";
  background-color: #3a3b3c;
  border-radius: 3px;
  padding: 20px 20px;
  margin: 0 auto;

  font-size: 18px;
  margin-top: 20px;
  min-width: 400px;
  width: 90vw;
}
.item {
  height: 40px;
  width: 100%;
  margin-bottom: 20px;

}
h2 {
  margin-bottom: 20px;
}
ul {
  list-style: none;
}
button {
  font-size: 12px;
}
.footer {
  padding-top: 18px;
}
</style>
