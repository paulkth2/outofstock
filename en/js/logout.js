var firebaseConfig = {
  apiKey: "AIzaSyDDa6NB9RLNLuSPzudu0XvJ6yNeiDhYr7I",
  authDomain: "outofstockcs374.firebaseapp.com",
  databaseURL: "https://outofstockcs374.firebaseio.com",
  projectId: "outofstockcs374",
  storageBucket: "outofstockcs374.appspot.com",
  messagingSenderId: "825220328740",
  appId: "1:825220328740:web:7fe1219c00c1ebae"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var uid = "";

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    uid = firebase.auth().currentUser.uid;
  } else {
    // No user is signed in.
  }
});

function logout(){
  var user = firebase.auth().currentUser;

  if (user) {
    firebase.auth().signOut().then(function() {
      window.location.href = './index.html';
    }).catch(function(error){

    });

    // User is signed in.
  } else {

    // No user is signed in.
  }
}
