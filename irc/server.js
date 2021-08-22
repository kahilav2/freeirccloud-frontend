// TODO: fix exception
/* eslint-disable camelcase */
import Channel from '~/irc/channel';

import MessageFactory from '~/utils/factories/message-factory';
import PackageFactory from '~/utils/factories/package-factory';
import ModalFactory from '~/utils/factories/modal-factory';
import {
  capitalizeFirstLetter, no, isValidChannel, isIRCCommand,
} from '~/utils/common';
import sound from '~/assets/ping.ogg';

// ### Server.js ###
export default class {
  constructor(userSession, context, userName, serverURL, channels, index, serverName, serverID) {
    this.index = index;
    this.serverID = serverID;
    this.serverName = serverName;
    this.userSession = userSession;
    this.serverURL = serverURL;
    this.userName = userName;
    this.channels = [];

    this.context = context;
    this.$store = context.$store;
    this.$getConst = context.$getConst;
    this.pingSound = new Audio(sound);
    this.pingSound.volume = 0.45;

    this.packageFactory = new PackageFactory(serverURL, process.env.syncVersion);

    channels.forEach((channelState) => this.createChannelFromState(channelState));
  }

  createChannelFromState({
    channelName, lastSeen, log, topic, users, hasMoreLogs,
  }) {
    const newChannel = new Channel(this, channelName);
    newChannel.setLastSeen(new Date(lastSeen));
    log.forEach((message) => {
      // TODO: remove eslint exception
      // eslint-disable-next-line no-param-reassign
      message.timestamp = new Date(message.timestamp);
      newChannel.pushMessage(message, { ignoreAsNew: true });
    });

    newChannel.setTopic(topic).setUsers(users).setHasMoreLogs(hasMoreLogs);

    this.channels.push(newChannel);
  }

  sendUserInput(input, channelName) {
    if (isIRCCommand(input)) {
      this.sendIRCCommand(input, channelName);
    } else {
      this.findChannel(channelName).sendMessage(input);
    }
  }

  receivePackage(data) {
    const functionName = `receive${capitalizeFirstLetter(data.type)}`;
    this[functionName](data);
  }

  /**
   *
   * @param {String} channelName
   * @returns {Boolean} removed or not?
   */
  removeChannel(channelName) {
    const channelIndex = this.findChannelIndex(channelName);
    const shouldIgnoreRequest = channelIndex === -1 || this.channels.length <= 1;
    if (shouldIgnoreRequest) {
      return false;
    }

    this.channels.splice(channelIndex, 1);
    this.$store.dispatch('app/set', { openChannelIndex: 0 });
    return true;
  }

  sendIRCCommand(input, channelName) {
    const command = input.split(' ')[0].slice(1).toUpperCase();
    const parameters = input.split(' ').splice(1);
    this[`send${command}`](parameters, channelName);
  }

  sendPART([channelName]) {
    if (!channelName) {
      new ModalFactory(this.context).createToast({ text: 'Too few parameters' });
      return;
    }

    const removedSuccessfully = this.removeChannel(channelName);
    if (!removedSuccessfully) { return; }

    this.userSession.sendPackageViaSocket(
      this.packageFactory.createPackage('part', {
        channelName,
      }),
    );
  }

  sendNICK([userName]) {
    if (!userName) {
      new ModalFactory(this.context).createToast({ text: 'Too few parameters' });
      return;
    }

    this.userSession.sendPackageViaSocket(
      this.packageFactory.createPackage('nick', {
        userName,
      }),
    );
  }

  sendKICK([userName], channelName) {
    if (!userName) {
      new ModalFactory(this.context).createToast({ text: 'Too few parameters' });
      return;
    }

    this.userSession.sendPackageViaSocket(
      this.packageFactory.createPackage('kick', {
        userName,
        channelName,
      }),
    );
  }

  sendTOPIC(topicArray, channelName) {
    if (no(topicArray)) {
      new ModalFactory(this.context).createToast({ text: 'Too few parameters' });
      return;
    }

    this.userSession.sendPackageViaSocket(
      this.packageFactory.createPackage('topic', {
        topic: topicArray.join(' '),
        channelName,
      }),
    );
  }

  sendCONNECT([serverName]) {
    if (!serverName || serverName.length === 0) {
      new ModalFactory(this.context).createToast({ text: 'Too few parameters' });
      return;
    }

    this.userSession.sendPackageViaSocket(
      this.packageFactory.createPackage('connect', {
        serverName,
      }),
    );
  }

  sendDISCONNECT() {
    // if (!serverName || serverName.length === 0) { return new ModalFactory(this.context).createToast({ text: "Too few parameters" }) }

    this.userSession.sendPackageViaSocket(
      this.packageFactory.createPackage('disconnect', {
        serverName: this.serverName,
      }),
    );
  }

  sendOP(userNamesArray, channelName) {
    if (userNamesArray.length === 0) {
      new ModalFactory(this.context).createToast({ text: 'Too few parameters' });
      return;
    }

    this.userSession.sendPackageViaSocket(
      this.packageFactory.createPackage('op', {
        userNames: userNamesArray,
        channelName,
      }),
    );
  }

  sendDEOP(userNamesArray, channelName) {
    if (userNamesArray.length === 0) {
      new ModalFactory(this.context).createToast({ text: 'Too few parameters' });
      return;
    }

    this.userSession.sendPackageViaSocket(
      this.packageFactory.createPackage('deop', {
        userNames: userNamesArray,
        channelName,
      }),
    );
  }

  sendJOIN([channelName]) {
    if (!channelName) {
      new ModalFactory(this.context).createToast({ text: 'Too few parameters' });
      return;
    }

    if (!isValidChannel(channelName)) {
      new ModalFactory(this.context).createToast({ text: 'Channel name is invalid' });
      return;
    }

    this.createChannelIfNotExist(channelName);
    this.$store.dispatch('app/set', { openChannelIndex: this.channels.length - 1 });

    this.userSession.sendPackageViaSocket(
      this.packageFactory.createPackage('join', {
        channelName,
      }),
    );
  }

  sendWHOIS([userName]) {
    if (!userName) {
      new ModalFactory(this.context).createToast({ text: 'Too few parameters' });
      return;
    }

    this.userSession.sendPackageViaSocket(
      this.packageFactory.createPackage('whois', { userName }),
    );
  }

  sendMESSAGE([channelName, ...messageItselfArray]) {
    if (!channelName || no(messageItselfArray)) {
      new ModalFactory(this.context).createToast({ text: 'Too few parameters' });
      return;
    }

    const messageJSON = MessageFactory.createUserMessage(this.userName,
      messageItselfArray.join(' '), { isOwn: true });

    const channel = this.createChannelIfNotExist(channelName);

    const timestamp = new Date();
    channel.setLastSeen(timestamp);
    this.sendLastSeenToBackend(channelName, timestamp);

    channel.pushMessage(messageJSON);

    this.userSession.sendPackageViaSocket(
      this.packageFactory.createPackage('message', {
        channelName,
        message: messageJSON,
      }),
    );
  }

  sendLastSeenToBackend(channelName, timestamp) {
    this.userSession.sendPackageViaSocket(
      this.packageFactory.createPackage('lastSeen', { channelName, timestamp }),
    );
  }

  createChannelIfNotExist(channelName) {
    const channel = this.findChannel(channelName);
    if (channel) {
      return channel;
    }
    const newChannel = new Channel(this, channelName);
    this.channels.push(newChannel);
    return newChannel;
  }

  /* TODO: change to receiveMessage */
  receiveChannel({ channelName, message }) {
    // TODO
    // eslint-disable-next-line no-param-reassign
    message.timestamp = new Date(message.timestamp);

    let channel = this.findChannel(channelName);
    if (!channel && message.isSystemMessage) {
      return;
    }

    channel = this.createChannelIfNotExist(channelName);

    const receivedMessageToOpenChannel = (this.$store.getters['app/get'].openServerIndex === this.index
        && this.channels[this.$store.getters['app/get'].openChannelIndex].getChannelName() === channelName);

    this.receiveChannel__checkIfShouldUpdateLastSeen(channel, channelName);

    this.receiveChannel__checkIfShouldIncrementPageTitleMessageCount(message);

    this.receiveChannel__checkIfShouldPlaySound(message, receivedMessageToOpenChannel, !channel.isChannel());

    channel.pushMessage(message);
  }

  receiveChannel__checkIfShouldPlaySound(messageObj, receivedMessageToOpenChannel, isPrivateMessage) {
    if (!this.$store.getters['app/get'].isSoundOn) return;

    const privateMessageCondition = (isPrivateMessage && !receivedMessageToOpenChannel);

    const highlightCondition = (document.hidden || !receivedMessageToOpenChannel)
        && messageObj.message.toLowerCase().includes(this.userName.toLowerCase().replace(/[^A-Za-z]/g, ''))
        && !messageObj.isSystemMessage;

    if (privateMessageCondition || highlightCondition) {
      this.pingSound.play().catch((e) => console.log(e));
    }
  }

  receiveChannel__checkIfShouldUpdateLastSeen(channel, channelName) {
    const receivedMessageToOpenChannel = (this.$store.getters['app/get'].openServerIndex === this.index
        && this.channels[this.$store.getters['app/get'].openChannelIndex].getChannelName() === channelName);

    if (receivedMessageToOpenChannel) {
      const timestamp = new Date();
      channel.setLastSeen(timestamp);
      this.sendLastSeenToBackend(channelName, timestamp);
    }
  }

  receiveChannel__checkIfShouldIncrementPageTitleMessageCount(message) {
    const shouldIncrementPageTitleMessageCount = document.hidden && !message.isSystemMessage;
    if (shouldIncrementPageTitleMessageCount) {
      const incrementedPageTitleMessageCount = this.$store.getters['app/get'].pageTitleMessageCount + 1;
      this.$store.dispatch('app/set', { pageTitleMessageCount: incrementedPageTitleMessageCount });
      document.title = `(${incrementedPageTitleMessageCount}) ${this.context.$getConst('page.title')}`;
    }
  }

  receiveLog({ channelName, log, hasMoreLogs }) {
    const channel = this.findChannel(channelName);

    // TODO
    // eslint-disable-next-line no-param-reassign
    log.forEach((entry) => { entry.timestamp = new Date(entry.timestamp); });
    channel.appendOldLog(log);
    channel.setHasMoreLogs(hasMoreLogs);
  }

  receiveNick({ userName }) {
    this.userName = userName;
  }

  receiveUserList({ channelName, users }) {
    const channel = this.findChannel(channelName);
    channel.setUsers(users);
  }

  receiveTopic({ channelName, topic }) {
    const channel = this.findChannel(channelName);
    channel.setTopic(topic);
  }

  receiveWhois({
    nick: userName, ident, hostname, channels, real_name: realName, server, error,
  }) {
    const openChannel = this.channels[this.$store.getters['app/get'].openChannelIndex];
    if (error) {
      openChannel.pushMessage(MessageFactory.createSystemMessage(`User ${userName} not found`));
      return;
    }

    openChannel.pushMessage(MessageFactory.createSystemMessage(`WHOIS ${userName}`));
    openChannel.pushMessage(MessageFactory.createSystemMessage(`${userName} [${ident}@${hostname}]`));
    openChannel.pushMessage(MessageFactory.createSystemMessage(`ircname: ${realName}`));
    openChannel.pushMessage(MessageFactory.createSystemMessage(`channels: ${channels}`));
    openChannel.pushMessage(MessageFactory.createSystemMessage(`server: ${server}`));
    openChannel.setLastSeen(new Date());
  }

  findChannel(channelName) { /* TODO: create function areChannelsSame(a,b), isChannelsName(name) */
    return this.channels.find((channel) => channel.getChannelName().toLowerCase() === channelName.toLowerCase());
  }

  findChannelIndex(channelName) {
    return this.channels.findIndex((channel) => channel.getChannelName().toLowerCase() === channelName.toLowerCase());
  }

  getServerName() { return this.serverName; }

  getServerURL() { return this.serverURL; }

  getChannels() { return this.channels; }

  getUserName() { return this.userName; }

  getUserSession() { return this.userSession; }
}
