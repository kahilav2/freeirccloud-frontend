import Server from '~/irc/server';
import ModalFactory from '~/utils/factories/modal-factory';

const SUPPORTED_COMMANDS = ['join', 'part', 'message', 'nick', 'kick', 'op', 'deop', 'topic', 'whois', 'connect', 'disconnect', 'close'];

function isValidInput(input) {
  if (!input.startsWith('/')) { return true; }

  const command = input.split(' ')[0].slice(1);

  if (!SUPPORTED_COMMANDS.includes(command.toLowerCase())) { return false; }

  return true;
}
export default class {
  constructor(context) {
    this.servers = [];
    this.socket = null;
    this.context = context;
    this.$store = context.$store;
    this.$getConst = context.$getConst;
  }

  async connectToBackEnd() {
    this.socket = await new WebSocket(`${process.env.backendURL}:${process.env.backendPort}`);
    this.socket.onopen = this.onSocketOpen.bind(this);
    this.socket.onmessage = this.receivePackage.bind(this);
    this.socket.onclose = this.onSocketClose.bind(this);
  }

  onSocketClose(event) {
    this.$store.dispatch('app/set', { isConnectionClosed: true, connectionClosedReason: event.reason });
  }

  onSocketOpen() {
    this.ping();
    this.sendHandshake();
  }

  sendHandshake() {
    const { idToken, email } = this.$store.getters['user/get'];

    const handShakeJSON = {
      command: 'authenticate',
      email,
      idToken,
      syncVersion: process.env.syncVersion,
    };
    this.socket.send(JSON.stringify(handShakeJSON));
  }

  ping() {
    if (this.$store !== undefined && !this.$store.getters['app/get'].isConnectionClosed) {
      console.log('ping');
      this.socket.send('');
      setTimeout(this.ping, this.$getConst('irc.userSession.pingTimeoutTime'));
    }
  }

  receivePackage(event) {
    const data = JSON.parse(event.data);

    if (data.type === 'authenticate') {
      this.handleAuthenticate(data);
    } else {
      if (data.type === 'connectedServer') {
        this.receiveConnectedServer(data);
        return;
      }
      if (data.type === 'disconnectedServer') {
        this.receiveDisconnectedServer(data);
        return;
      }
      if (data.type === 'toast') {
        this.receiveToast(data);
        return;
      }
      this.findServer(data.serverURL).receivePackage(data);
    }
  }

  receiveConnectedServer({
    server: {
      serverURL, serverName, userName, channels, serverID,
    },
  }) {
    const index = Math.max(...this.servers.map((server) => server.index)) + 1;

    this.servers.push(new Server(this, this.context, userName, serverURL, channels, index, serverName, serverID));
  }

  receiveDisconnectedServer({ serverName }) {
    this.servers = this.servers.filter((server) => server.serverName !== serverName);
    this.$store.dispatch('app/set', { openChannelIndex: 0, openServerIndex: 0 });
  }

  sendUserInput(input, serverURL, channelName) {
    if (!isValidInput(input)) {
      new ModalFactory(this.context).createToast({ text: 'Unrecognized command' });
      return;
    }
    this.findServer(serverURL).sendUserInput(input, channelName);
  }

  receiveToast({ body }) {
    new ModalFactory(this.context).createToast({ text: body });
  }

  sendPackageViaSocket(json) {
    this.getSocket().send(JSON.stringify(json));
  }

  handleAuthenticate({ servers }) {
    servers.forEach(({
      serverURL, userName, channels, serverID, serverName,
    }, index) => {
      this.servers.push(new Server(this, this.context, userName, serverURL, channels, index, serverName, serverID));
    });

    this.$store.dispatch('app/set', { openChannelIndex: 0, openServerIndex: 0 });
  }

  findServer(serverURL) {
    return this.servers.find((server) => server.getServerURL().toLowerCase() === serverURL.toLowerCase());
  }

  getServers() { return this.servers; }

  getSocket() { return this.socket; }
}
