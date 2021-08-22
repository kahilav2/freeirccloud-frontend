<template>
  <ModalTemplate :styles="contents.styles.template">
    <div v-html="contents.body"/>
  </ModalTemplate>
</template>

<script>
import ModalTemplate from '~/components/shared/modals/templates/modal-template.vue';
import ModalBase from '~/mixins/modal-base';

export default {
  extends: ModalBase,
  components: {
    ModalTemplate,
  },
  props: {
    contentID: {
      type: String,
      required: true,
    },
  },
  data() {
    const contents = this.getContents();
    return {
      contents,
    };
  },
  methods: {
    getContents() {
      return this.$getConst('modalContents', this.contentID)[this.contentID];
    },
    confirm() {
      this.killAndEmitSuccess({});
    },
  },
};
</script>
