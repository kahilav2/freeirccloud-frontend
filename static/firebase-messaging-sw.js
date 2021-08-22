importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyC-VGnCQtZNkJg0ZiI7qv1_OhxV-6xXPF0",
  projectId: 'superirc',
  messagingSenderId: '727437452941',
  appId: "1:727437452941:web:c205d844ae57dba508e4c4"
});

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function (payload) {
  return self.registration.showNotification(payload)
})
