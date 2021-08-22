<template>
  <li :class="{'not-seen': (timestamp > lastSeen), highlight: isHighlighted && isChannelMessage && !isSystemMessage }">
    <div v-if="isSystemMessage" class="system-message">
      <span class='timestamp'>{{ hours_str + ":" + minutes_str }}</span>
      <span class='system-message-message'>{{  message.message }}</span>
    </div>
    <div v-else>
      <span class='timestamp'>{{ hours_str + ":" + minutes_str }}</span>
      <span class='bracket first'>{{"&#60;"}}</span><span class='name' :class="[`color-${colorIndex}`, message.isOwn ? 'own-message' : '']">{{ message.sender }}</span><span class='bracket'>{{">"}}</span>
      <span class='message' v-html="msg"/>
    </div>
  </li>
</template>

<script>
import { modulo } from '~/utils/common';

const vipUsers = {
  jerq: 2, lyca: 0, tomppu: 5, okkeli: 4, iigor: 1, superiigor: 1, matelsyka: 3, metalsika: 3, joltkoala: 7, tibexi: 7, tibexy: 7,
};

export default {
  props: {
    message: Object,
    userName: String,
    lastSeen: Date,
    isChannelMessage: Boolean,
  },
  data() {
    return {};
  },
  computed: {
    colorIndex() {
      const canonicalName = this.message.sender.toLowerCase().replace(/[^A-Za-z]/g, '');
      if (vipUsers[canonicalName] !== undefined) return vipUsers[canonicalName];
      return modulo(
        canonicalName.split('')
          .reduce(
            (acc, char) => {
              acc[1] *= -1; return [acc[0] + acc[1] * char.charCodeAt(0), acc[1]];
            }, [0, 1],
          )[0], 8,
      );
    },
    timestamp() {
      return this.message.timestamp;
    },
    isHighlighted() {
      return !this.message.isOwn
          && this.message.message.toLowerCase().includes(this.userName.toLowerCase().replace(/[^A-Za-z]/g, ''));
    },
    isSystemMessage() {
      return this.message.isSystemMessage;
    },
    hours_str() {
      const hours = this.timestamp.getHours();
      return hours < 10 ? `0${hours}` : `${hours}`;
    },
    minutes_str() {
      const minutes = this.timestamp.getMinutes();
      return minutes < 10 ? `0${minutes}` : `${minutes}`;
    },
    msg() {
      // eslint-disable-next-line max-len
      const URLMatcher = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/igm;
      return this.message.message
        .replace(/</g, '&lt;')
        // eslint-disable-next-line no-control-regex
        .replace(/[\u0002-\u0007]/g, '')
        .replace(URLMatcher,
          (match) => `<a target="_blank" href="${!match.startsWith('http') ? '//' : ''}${match}">${match}</a>`);
    },
  },
};
</script>

<style lang="scss">

.color-0 {
  color: var(--user-0);
}
.color-1 {
  color: var(--user-1);
}
.color-2 {
  color: var(--user-2);
}
.color-3 {
  color: var(--user-3);
}
.color-4 {
  color: var(--user-4);
}
.color-5 {
  color: var(--user-5);
}
.color-6 {
  color: var(--user-6);
}
.color-7 {
  color: var(--user-7);
}
.system-message {
  color: var(--tertiary-font-color);
}

.bracket {
  color: #284065;
  font-weight: bold;
  &.first {
    margin-right: 4px;
  }
}
.highlight {
  background-color: #ffffff1c;
  border-top: 2px #2d2d2d96 solid;
  border-bottom: 2px #2d2d2d96 solid;
}
li {
  float: left;
  clear: both;
  padding-bottom: 4px;
  width: 100%;
}
li.not-seen {
  border-top: 1px dotted #587fbe;
}
li.not-seen ~ .not-seen {
  border-top: none;
}

.timestamp {
  color: #546584;
  font-size: 15px;
  margin-right: 9px;
}
.new {
  color: var(--message-highlight) !important;
}
.name {
  font-weight: var(--name-font-weight);
  margin-right: 4px;
}
.own-message {
  color: var(--secondary-font-color);
}
</style>
