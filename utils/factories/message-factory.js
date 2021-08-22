// ### MessageFactory class ###

export default class {
  static createSelfJoin(channelName) {
    return this.createSystemMessage(`Joined ${channelName}`);
  }

  static createOtherJoin(userName) {
    return this.createSystemMessage(`${userName} has joined the channel`);
  }

  static otherParted(userName, reason) {
    return this.createSystemMessage(`${userName} has left the channel${reason}`);
  }

  static selfUserNameChange(userName) {
    return this.createSystemMessage(`You are now known as ${userName}`);
  }

  static otherSetTopic(userName, topic) {
    return this.createSystemMessage(`${userName} set the topic to ${topic}`);
  }

  static otherUserNameChange(oldUserName, newUserName) {
    return this.createSystemMessage(`${oldUserName} is now known as ${newUserName}`);
  }

  static createOtherQuit(userName, reason) {
    return this.createSystemMessage('freeIRC', `${userName} has quit${reason}`);
  }

  static createChannelRestored(channelName) {
    return this.createSystemMessage(`Restored ${channelName}`);
  }

  static createUserMessage(sender, message, { isOwn = false } = {}) {
    return {
      sender,
      message,
      timestamp: new Date(),
      isOwn,
      isSystemMessage: false,
    };
  }

  static createSystemMessage(message) {
    return {
      sender: null,
      message,
      isOwn: false,
      timestamp: new Date(),
      isSystemMessage: true,
    };
  }
}
