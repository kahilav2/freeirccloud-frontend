<template>
  <div class="new-messages" @click="$emit('click', {})">
    New messages!<img class="new-message-icon" alt="new-messages-arrow" src="new-message-arrow.svg"/>
  </div>
</template>
<style lang="scss" scoped>
.new-messages {
  position: fixed;
  border-radius: 13px;
  font-weight: 500;
  background-color: var(--secondary-color);
  padding: 5px 13px;
  color: white;
  right: 16vw;
  z-index: 1;
  bottom: 110px;
  right: 120px;
  cursor: pointer;
}
.new-message-icon {
  width: 20px;
  margin-left: 15px;
}
</style>
