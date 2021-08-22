export default {
  mounted() {
    setTimeout(this.isActive = true, 1);

    this.$store.dispatch('app/set', {
      activeModalLevel: 1,
    });
  },
  destroyed() {
    this.destroyed = true;
    this.$store.dispatch('app/set', {
      activeModalLevel: 0,
    });
    if (this.$el.parentNode !== null) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  data() {
    return {
      payload: null,
      eventId: null,
      isActive: false,
      ANIMATION_DURATION: 500,
      fadeOutStarted: false,
      destroyed: false,
    };
  },
  methods: {
    close() {
      this.killAndEmitCancel({});
    },
    killAndEmitSuccess(payload) {
      this.eventId = 'modal-success';
      this.payload = payload;
      this.prepareToDestroy();
    },
    killAndEmitCancel(payload) {
      this.eventId = 'modal-cancel';
      this.payload = payload;
      this.prepareToDestroy();
    },
    killAndEmitError(payload) {
      this.eventId = 'modal-error';
      this.payload = payload;
      this.prepareToDestroy();
    },
    prepareToDestroy() {
      if (this.fadeOutStarted || this.destroyed) {
        return;
      }

      this.fadeOutStarted = true;
      this.isActive = false;
      this.$emit(this.eventId, this.payload);

      setTimeout(() => { if (!this.destroyed) { this.$destroy(); } }, this.ANIMATION_DURATION);
    },
  },
};
