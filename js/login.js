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

var database = firebase.database();

var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
       // document.getElementById('loader').style.display = visible;
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: './makecard.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '#',
    // Privacy policy url.
    privacyPolicyUrl: '#'
  };

/*
ui.start('#firebaseui-auth-container', {
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
      }
    ],
    // Other config options...
  });
*/



// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);