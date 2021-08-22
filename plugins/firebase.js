// ~/plugins/firebase.js

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/messaging';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.firebaseAPIKey,
  authDomain: 'superirc.firebaseapp.com',
  databaseURL: 'https://superirc.firebaseio.com',
  projectId: 'superirc',
  storageBucket: 'superirc.appspot.com',
  messagingSenderId: '727437452941',
  appId: '1:727437452941:web:c205d844ae57dba508e4c4',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
