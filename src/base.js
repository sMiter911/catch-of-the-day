import Rebase from 're-base'
import firebase, { initializeApp } from 'firebase'

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDPjraJRBGodJlMN8_1Z0jG6V1O2Uq3Mpw",
  authDomain: "catch-of-the-day-wandu.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-wandu.firebaseio.com",
  projectId: "catch-of-the-day-wandu",
});

const base = Rebase.createClass(firebase.database());


// This is a name export
export {firebaseApp};

// Thios is a default export
export default base;