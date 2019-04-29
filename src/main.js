import Vue from 'vue';
import './plugins/vuetify';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firestorePlugin } from 'vuefire';
import App from './App.vue';

import firebaseConfig from '../firebase.config'

Vue.use(firestorePlugin);
firebase.initializeApp({
  projectId: firebaseConfig.projectId,
  databaseURL: firebaseConfig.databaseURL,
});

export const fb = firebase;
export const db = firebase.firestore();

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
