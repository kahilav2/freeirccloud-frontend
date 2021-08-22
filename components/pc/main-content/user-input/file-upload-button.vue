<template>
  <div class="container">
    <input type="file" ref="file" @change="handleFileChange" style="display: none" :disabled="isDisabled">
    <button
      @click="$refs.file.click()"
      class="file-upload-button icon-button"
      :disabled="isDisabled">
      <img class="image-upload-icon" src="image-upload.svg" alt="image-upload"/>
    </button>
  </div>
</template>

<script>

import { processAndUploadImage } from '~/utils/firebase';

export default {
  components: {},
  props: {
    isDisabled: Boolean,
    userSession: Object,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    onUploadProgressUpdate(percentage) {
      this.$store.commit('app-state/set2', { input: `${percentage}%` });
    },
    handleUploadFinished(url) {
      this.$store.commit('app-state/set2', { input: url, isUploading: false });
    },

    handleFileChange(event) {
      const imageData = event.target.files[0];

      const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!imageData || !IMAGE_TYPES.includes(imageData.type)) { return; }
      this.$store.commit('app-state/set2', { isUploading: true });
      processAndUploadImage(imageData, this.handleUploadFinished, this.onUploadProgressUpdate);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: inline-block;
}
.file-upload-button {
  width: 50px;
  display: inline-block;
  height: 25px;
  font-size: 18px;
  border: 0;

}
.file-upload-button:hover {
  background-color: var(--secondary-unimportant-color);
}
.image-upload-icon {
  height: 90%;
}
</style>
