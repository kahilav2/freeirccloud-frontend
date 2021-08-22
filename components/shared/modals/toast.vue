<template>
  <ToastTemplate @click="killAndEmitSuccess({})">
    {{ text }}
  </ToastTemplate>
</template>

<script>
import ToastTemplate from '~/components/shared/modals/templates/toast-template.vue';
import ModalBase from '~/mixins/modal-base';

export default {
  extends: ModalBase,
  components: {
    ToastTemplate,
  },
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  mounted() {
    setTimeout(() => this.killAndEmitSuccess({}), 5000);
  },
  methods: {
  },
};
</script>
