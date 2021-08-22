<template>
  <VContainerButton>
    <input type="file" ref="file" @change="handleFileChange" style="display: none" :disabled="isDisabled">

    <VButtonIcon
      @click="$refs.file.click()"
      :src="'image-upload-white.svg'"
      :disabled="isDisabled"
    />
  </VContainerButton>
</template>

<script>
import { processAndUploadImage } from '~/utils/firebase';
import VButtonIcon from '~/components/shared/pc/v-button-icon.vue';
import VContainerButton from '~/components/shared/pc/v-container-button.vue';

export default {
  components: {
    VButtonIcon,
    VContainerButton,
  },
  props: {
    isDisabled: Boolean,
    userSession: Object,
  },
  methods: {
    onUploadProgressUpdate(percentage) {
      this.$store.dispatch('app/set', { input: `${percentage}%` });
    },
    handleUploadFinished(url) {
      this.$store.dispatch('app/set', { isUploading: false, input: url });
    },
    handleFileChange(event) {
      const imageData = event.target.files[0];

      const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!imageData || !IMAGE_TYPES.includes(imageData.type)) { return; }

      this.$store.dispatch('app/set', { isUploading: true });

      processAndUploadImage(imageData, this.handleUploadFinished, this.onUploadProgressUpdate);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
