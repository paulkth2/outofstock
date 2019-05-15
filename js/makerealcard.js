var storage = firebase.storage();
var storageref = firebase.storage().ref();
var database = firebase.database();

var mainfile = null;
var ingre1file = null;
var ingre2file = null;
var ingre3file = null;


function handleFileSelect(evt) {
    var files = evt.target.files;

    for (var i = 0, f; f = files[i]; i++) {
      if (!f.type.match('image.*')) {
        continue;
      }
      mainfile = f;
      var reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
          document.getElementById('mainpic').src = e.target.result;
        };
      })(f);
      reader.readAsDataURL(f);
    }
  }
document.getElementById('menuimage').addEventListener('change', handleFileSelect, false);



function handleFileSelect2(evt) {
    var files = evt.target.files;

    for (var i = 0, f; f = files[i]; i++) {
      if (!f.type.match('image.*')) {
        continue;
      }
      ingre1file = f;
      var reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
            //ingre1file = f;
          document.getElementById('ingredient1').src = e.target.result;
        };
      })(f);
      reader.readAsDataURL(f);
    }
  }

document.getElementById('ingreimage1').addEventListener('change', handleFileSelect2, false);

function handleFileSelect3(evt) {
    var files = evt.target.files;

    for (var i = 0, f; f = files[i]; i++) {
      if (!f.type.match('image.*')) {
        continue;
      }
      ingre2file = f;
      var reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
            //ingre2file = f;
          document.getElementById('ingredient2').src = e.target.result;
        };
      })(f);
      reader.readAsDataURL(f);
    }
  }

document.getElementById('ingreimage2').addEventListener('change', handleFileSelect3, false);

function handleFileSelect4(evt) {
    var files = evt.target.files;

    for (var i = 0, f; f = files[i]; i++) {
      if (!f.type.match('image.*')) {
        continue;
      }
      ingre3file = f;
      var reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
            //ingre3file = f;
          document.getElementById('ingredient3').src = e.target.result;
        };
      })(f);
      reader.readAsDataURL(f);
    }
  }

document.getElementById('ingreimage3').addEventListener('change', handleFileSelect4, false);


function send() {
    var mainname = document.getElementById('menu-name').value;
    var ingre1name = document.getElementById('1-name').value;
    var ingre2name = document.getElementById('2-name').value;
    var ingre3name = document.getElementById('3-name').value;
    //next card to make
    var key = "";
    firebase.database().ref('/').child(firebase.auth().currentUser.uid).child("card").once('value', function(snapshot) {
      var myValue = snapshot.val();
      var mykeys = Object.keys(myValue);
      key = "card" + String(mykeys.length);
    });

    //console.log(typeof mainfile);
    storageref.child(mainname+'-'+firebase.auth().currentUser.uid).put(mainfile).then(function(snapshot) {
      storageref.child(ingre1name+'-'+firebase.auth().currentUser.uid).put(ingre1file).then(function(snapshot) {
          //window.location.href = "./makecard.html";
      });
      storageref.child(ingre2name+'-'+firebase.auth().currentUser.uid).put(ingre2file).then(function(snapshot) {
          //window.location.href = "./makecard.html";
      });
      storageref.child(ingre3name+'-'+firebase.auth().currentUser.uid).put(ingre3file).then(function(snapshot) {
          //window.location.href = "./makecard.html";
      });
      snapshot.ref.getDownloadURL().then(function(downloadURL) {
        firebase.database().ref('/').child(firebase.auth().currentUser.uid).child("card").child(key).child("explain").child("menu").set(mainname);
        firebase.database().ref('/').child(firebase.auth().currentUser.uid).child("card").child(key).child("explain").child("ing1").set(ingre1name);
        firebase.database().ref('/').child(firebase.auth().currentUser.uid).child("card").child(key).child("explain").child("ing2").set(ingre2name);
        firebase.database().ref('/').child(firebase.auth().currentUser.uid).child("card").child(key).child("explain").child("ing3").set(ingre3name);
        firebase.database().ref('/').child(firebase.auth().currentUser.uid).child("card").child(key).child("main_image").child("src").set(downloadURL);
      });
        alert("성공적으로 카드를 생성했습니다!");
        window.location.href = "./makecard.html";
    });


}
