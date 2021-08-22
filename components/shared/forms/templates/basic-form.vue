<template>
  <div class="basic-form" @keydown.enter="$emit('submit')" @update="childUpdated">
    <slot>
    </slot>
  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  methods: {
    childUpdated(payload) {
      this.$emit('update', payload);
    },
  },
};
</script>
<style scoped lang="scss">
/deep/ input {
  height: 37px;
  width: 100%;
  font-size: 18px;
  border: none;
  padding-left: 10px;
  margin-bottom: 10px;
  clear: both;
  display: inline-block;
  &.input-error {
    border: 2px solid #e25454;
  }
}
/deep/ label {
  margin-bottom: 6px;
  display: inline-block;
}
.basic-form {
  width: 100%;
  display: inline-block;
}
</style>
