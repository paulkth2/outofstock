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

function register(){
  var email = document.getElementById("emailinput").value;
  var password = document.getElementById("passwordinput").value;

  var passcheck1 = document.getElementById("passwordinput").value;
  var passcheck2 = document.getElementById("passwordinput2").value;

  if (passcheck1 != passcheck2){
    alert("비밀번호가 일치하지 않습니다.");
    document.getElementById("passwordinput").value = "";
    document.getElementById("passwordinput2").value = "";

    return 0;
  }
  console.log("check1");
  console.log(email);
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(user){
    var storename = document.getElementById("storename").value;
    var phonenum = document.getElementById("phonenum").value;
    var address = document.getElementById("address").value;
    var opertime = document.getElementById("opertime").value;
    console.log("check2");
    console.log(user.user.uid);
    firebase.database().ref('/'+user.user.uid).set({
      info: {"storename":storename,
      "phonenum":phonenum, "address":address, "opertime":opertime},
      card: {"card0":"default"},
    });

    document.getElementById("emailinput").value = "";
    document.getElementById("passwordinput").value = "";
    document.getElementById("storename").value = "";
    document.getElementById("phonenum").value = "";
    document.getElementById("address").value = "";
    document.getElementById("opertime").value = "";
    console.log("check3");

    alert("회원가입이 완료되었습니다. 로그인 해주세요.")
    location.reload();
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...

    alert("회원가입 오류입니다" + errorMessage);
  });
}

function login(){
  var email = document.getElementById("email").value;
  var password = document.getElementById("pw").value;

  firebase.auth().signInWithEmailAndPassword(email, password).then(function(User){
    window.location.href = './makecard.html';
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...

    alert("로그인 오류입니다. 이메일 혹은 비밀번호를 확인하세요." + errorMessage);

  });
}
function logsub() {
    if (event.keyCode == 13) {
        login();
        return false;
    }
}
/*
* working UI part of code
*
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        return true;
      },
      uiShown: function() {
      }
    },
    signInFlow: 'popup',
    signInSuccessUrl: './makecard.html',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    tosUrl: '#',
    privacyPolicyUrl: '#'
  };


ui.start('#firebaseui-auth-container', uiConfig);

*/
