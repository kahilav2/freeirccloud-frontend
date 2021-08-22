<template>
  <ModalTemplate @backgroundClicked="close" :styles="contents.styles.template">
    <div v-html="contents.body"/>
    <div class="modal-btn">

      <VButton @click="close" >
        {{ contents.cancel }}
      </VButton>
      <VButton @click="confirm" >
        {{ contents.confirm }}
      </VButton>
    </div>
  </ModalTemplate>
</template>

<script>
import ModalTemplate from '~/components/shared/modals/templates/modal-template.vue';
import ModalBase from '~/mixins/modal-base';
import VButton from '~/components/shared/pc/v-button.vue';

export default {
  extends: ModalBase,
  components: {
    ModalTemplate,
    VButton,
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
