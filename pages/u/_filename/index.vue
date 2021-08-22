<template>
  <div class="container">
    <div v-if="fileType ==='image'">
      <button @click="changeImageProportions"><img :src="source" alt="minimized" :class="minimized ? 'minimized' : ''"></button>
    </div>
    <textarea v-if="fileType === 'text'" v-model="text"/>
  </div>
</template>

<script>

export default {
  data() {
    return {
      text: 'Loading...',
      minimized: false,
      authenticatedUser: null,
      email: '',
      password: '',
      registrationPassword: '',
    };
  },
  computed: {
    fileType() {
      const extension = this.fileName.split('.')[1];
      switch (extension) {
        case 'txt':
          return 'text';
        default:
          return 'image';
      }
    },
    source() {
      return `https://firebasestorage.googleapis.com/v0/b/superirc.appspot.com/o/uploads%2F${this.fileName}?alt=media`;
    },
    fileName() {
      return this.$route.params.filename.replace('_', '.');
    },
  },
  mounted() {
    if (this.fileType === 'text') {
      this.$axios({ method: 'GET', url: this.source }).then((result) => {
        this.text = result.data;
      }, (error) => {
        console.error(error);
      });
    }
  },
  methods: {
    changeImageProportions() {
      this.minimized = !this.minimized;
    },
  },
};
</script>
<style scoped>
.container {
  background-color: black;
  min-height: 100vh;
}
button {
  display: inline-block;
    height: 100vh;
    width: 100vw;
    border: 0;
    background-color: black;
}
img {
  display: inline-block;
  cursor: zoom-in;
    width: auto;
    max-height: 100vh;

    border: 0;
    margin: 0 auto;
    max-width: 100vw;
    height: auto;
}
.minimized {

  cursor: zoom-out;
    height: auto;
    max-height: none;
    max-width: none;
    width: auto;
}
textarea {
  font-size: 15px;
  width: 100vw;
  height: 100vh;
}
</style>
