<template>
  <div class="chat-notification" @click="$emit('click', {})" >
    <slot/>
    <img class="chat-notification-icon" alt="chat-notification-icon" src="new-message-arrow.svg"/>
  </div>
</template>
<style lang="scss" scoped>

.chat-notification {
  position: absolute;
  border-radius: 13px;
  font-weight: 500;
  background-color: var(--secondary-color);
  padding: 5px 13px;
  color: white;
  right: 16vw;
  z-index: 1;
  top: calc(80vh - 77px);;
  right: 20px;
  cursor: pointer;
}
.chat-notification-icon {
  width: 20px;
  margin-left: 15px;
}
</style>
