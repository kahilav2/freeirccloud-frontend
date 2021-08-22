export default {
  settings: {
    tooLongTextThreshold: 350 * 2, // quakenet's one message max length times 2
  },
  irc: {
    userSession: {
      pingTimeoutTime: 1000 * 60 * 15,
    },
  },
  page: {
    title: 'freeIRC',
  },
  placeholders: {
    messageInput: 'Write a message or Ctrl + V for image/long text from clipboard',
  },
  actions: {
    logout: 'logout',
    login: 'login',
  },
  modalContents: {
    connectionLost: {
      body: 'Connection was lost. Reconnect?',
      confirm: 'Reconnect',
      cancel: 'Cancel',
      styles: {
        template: ['small'],
      },
    },
    settings: {
      body: 'Settings',
      confirm: 'Close',
      styles: {
        template: ['fit-to-content'],
      },
    },
    help: {
      styles: {
        template: ['large'],
      },
    },
    userList: {
      styles: {
        template: ['fit-to-content'],
      },
    },
    activateAccount: {
      body: 'Please activate your account. An activation link has been sent to your email address.',
      styles: {
        template: ['small'],
      },
    },
    fileIDSelector: {
      body: '',
      styles: {
        template: ['small'],
      },
    },
  },
};
