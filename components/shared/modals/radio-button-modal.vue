<template>
  <ModalTemplate>
    Select slot:
    <br>
    <input type="radio" id="one" value="1" v-model="picked">
    <label for="one">One</label>
    <br>
    <input type="radio" id="two" value="2" v-model="picked">
    <label for="two">Two</label>
    <br>
    <input type="radio" id="three" value="3" v-model="picked">
    <label for="three">Three</label>
    <br>
    <input type="radio" id="four" value="4" v-model="picked">
    <label for="four">Four</label>
    <br>
    <input type="radio" id="five" value="5" v-model="picked">
    <label for="five">Five</label>
    <br>
    <span>Use slot: {{ picked }}</span>
    <br>
    <VButton @click="confirm">Ok</VButton>

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
    return {
      contents: null,
      picked: 1,
    };
  },
  methods: {
    getContents() {
      return this.$getConst('modalContents', this.contentID)[this.contentID];
    },
    confirm() {
      this.killAndEmitSuccess(this.picked);
    },
  },
};
</script>
