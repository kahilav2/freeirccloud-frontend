import MessageFactory from '~/utils/factories/message-factory';

export default class {
  constructor(server, channelName) {
    this.hasNewMessages = false;
    this.server = server;
    this.store = server.store;
    this.channelName = channelName;
    this.messages = null;
    this.users = null;
    this.topic = null;
    this.hasMoreLogs = null;
    this.lastSeen = new Date(0);
    this.oldLastSeen = null;
    this.currentAction = null;
  }

  clearHasNewMessages() { this.hasNewMessages = false; }

  getHasNewMessages() {
    if (!this.messages || this.messages.length === 0) {
      return false;
    }
    return this.messages.filter((message) => !message.isSystemMessage).filter((message) => message.timestamp > this.lastSeen).length > 0;
    // return this.messages[this.messages.length-1].timestamp > this.lastSeen;
    /* return this.hasNewMessages; */
  }

  isChannel() {
    return this.channelName.startsWith('#');
  }

  isReady() {
    if (this.isChannel()) {
      return this.messages !== null && this.users !== null;
    }
    return this.messages !== null;
  }

  sendMessage(input) {
    const userName = this.server.getUserName();

    const messageJSON = MessageFactory.createUserMessage(userName, input, { isOwn: true });

    this.server.getUserSession().sendPackageViaSocket(
      this.server.packageFactory.createPackage('message', {
        channelName: this.channelName,
        message: messageJSON,
      }),
    );

    const timestamp = new Date();
    this.setLastSeen(timestamp);
    this.server.sendLastSeenToBackend(this.channelName, timestamp);

    this.pushMessage(messageJSON);
  }

  pushMessage(message, { ignoreAsNew } = { ignoreAsNew: false }) {
    if (this.messages === null) { this.messages = []; }
    this.messages.push(message);
    this.currentAction = 'MessagePush';
    if (!ignoreAsNew && !message.isSystemMessage) { this.hasNewMessages = true; }
  }

  appendOldLog(log) {
    this.currentAction = 'LogAppend';
    this.messages.unshift(...log);
  }

  getHasMoreLogs() { return this.hasMoreLogs; }

  setHasMoreLogs(hasMoreLogs) { this.hasMoreLogs = hasMoreLogs; return this; }

  getChannelName() { return this.channelName; }

  getServer() { return this.server; }

  getMessages() { return this.messages; }

  isEmpty() { return this.messages.length === 0; }

  getUsers() { return this.users; }

  setUsers(users) { this.users = users; return this; }

  getTopic() { return this.topic; }

  setTopic(topic) { this.topic = topic; return this; }

  setLastSeen(lastSeen) { this.oldLastSeen = this.lastSeen; this.lastSeen = lastSeen; }
}
