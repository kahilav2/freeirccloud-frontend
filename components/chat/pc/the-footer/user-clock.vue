<template>
  <div :class="{ clock: true, bright: isBright }">
    {{ hoursString + ":" + minutesString }}
  </div>
</template>

<script>

export default {
  data() {
    return {
      now: new Date(),
    };
  },
  mounted() {
    this.refreshClock();
  },
  computed: {
    isBright() {
      return this.$store.getters['app/get'].isClockBright;
    },
    hoursString() {
      return this.now.getHours();
    },
    minutesString() {
      const minutes = this.now.getMinutes();
      return minutes < 10 ? `0${minutes}` : `${minutes}`;
    },
  },
  methods: {
    refreshClock() {
      this.now = new Date();
      const secondsUntilNextMinute = 61 - (new Date()).getSeconds();
      setTimeout(this.refreshClock, secondsUntilNextMinute * 1000);
    },
  },
};
</script>
<style lang="scss" scoped>

.clock {
  display: inline-block;
  margin-right: 8px;
  color: #2b5088;
  font-weight: bold;
  pointer-events: none;
  &.bright {
    color: var(--secondary-font-color);
  }
}

</style>
