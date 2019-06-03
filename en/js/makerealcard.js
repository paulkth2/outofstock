var storage = firebase.storage();
var storageref = firebase.storage().ref();
var database = firebase.database();

var mainfile = null;
var ingre1file = null;
var ingre2file = null;
var ingre3file = null;

function getDropdown(){
    firebase.database().ref('/').child("LufDvbmzy5dl3viNeMq18158leR2").child("menus").once('value', function(snapshot) {
        var myValue = snapshot.val();
        var mykeys = Object.keys(myValue);
        var dropdown = document.getElementById("dropdownMenuButton");
        for (var key in myValue) {
            if (myValue.hasOwnProperty(key)) {
                var option = document.createElement('option');
                option.text = myValue[key].name;
                dropdown.add(option);
            }
        }
      });
}

//function code taken from http://blog.tompawlak.org/how-to-generate-random-values-nodejs-javascript
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
function ranstring(){
    return makeid(12);
}


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
        var mykeys = Object.keys(myValue).sort(function (a, b) {
            return Number(a.split("card")[1]) - Number(b.split("card")[1]);
        });
      key = "card" + String(Number(mykeys[mykeys.length - 1].split("card")[1]) + 1);
    });

    if (document.getElementById("menuimage").files.length == 0){
        alert("Please enter the menu image");
        return;
    }
    if (document.getElementById("ingreimage1").files.length == 0){
        alert("Please enter the ingredient1 image");
        return;
    }
    if (document.getElementById("ingreimage2").files.length == 0){
        alert("Please enter the ingredient2 image");
        return;
    }
    if (document.getElementById("ingreimage3").files.length == 0){
        alert("Please enter the ingredient3 image");
        return;
    }

    if (document.getElementById("menu-name").value == ""){
        alert("Please enter the menu image");
        return;
    }
    if (document.getElementById("1-name").value == ""){
        alert("Please enter the ingredient1 image");
        return;
    }
    if (document.getElementById("2-name").value == ""){
        alert("Please enter the ingredient2 image");
        return;
    }
    if (document.getElementById("3-name").value == ""){
        alert("Please enter the ingredient3 image");
        return;
    }
    if (document.getElementById("text").value == ""){
        alert("Please write a simple explanations.");
        return;
    }
    $("#mask").css({ 'width': $(document).width(), 'height': $(document).height() });

    //alert("업로드 중입니다. 이미지 파일이 큰 경우 시간이 오래 걸릴 수 있으니 잠시만 기다려주세요.");
    //console.log(typeof mainfile);
    storageref.child(mainname+ranstring()).put(mainfile).then(function(snapshot) {
        //console.log("check1");


      snapshot.ref.getDownloadURL().then(function(downloadURL) {
        //console.log(key);
        firebase.database().ref('/').child(firebase.auth().currentUser.uid).child("card").child(key).child("explain").child("menu").set(mainname);
        firebase.database().ref('/').child(firebase.auth().currentUser.uid).child("card").child(key).child("explain").child("ing1").set(ingre1name);
        firebase.database().ref('/').child(firebase.auth().currentUser.uid).child("card").child(key).child("explain").child("ing2").set(ingre2name);
        firebase.database().ref('/').child(firebase.auth().currentUser.uid).child("card").child(key).child("explain").child("ing3").set(ingre3name);
        firebase.database().ref('/').child(firebase.auth().currentUser.uid).child("card").child(key).child("explain").child("text").set(document.getElementById("text").value);
        firebase.database().ref('/').child(firebase.auth().currentUser.uid).child("card").child(key).child("main_image").child("src").set(downloadURL);
        storageref.child(ingre1name+ranstring()).put(ingre1file).then(function(snapshot) {
            //window.location.href = "./makecard.html";
            //console.log("check2");
              snapshot.ref.getDownloadURL().then(function(downloadURL) {
                  firebase.database().ref('/').child(firebase.auth().currentUser.uid).child("card").child(key).child("sub_images").child("ing1").child("src").set(downloadURL);
                  storageref.child(ingre2name+ranstring()).put(ingre2file).then(function(snapshot) {
                      //window.location.href = "./makecard.html";
                      //console.log("check3");
                      snapshot.ref.getDownloadURL().then(function(downloadURL) {
                      firebase.database().ref('/').child(firebase.auth().currentUser.uid).child("card").child(key).child("sub_images").child("ing2").child("src").set(downloadURL);
                      storageref.child(ingre3name+ranstring()).put(ingre3file).then(function(snapshot) {
                          //window.location.href = "./makecard.html";
                          //console.log("check4");
                          snapshot.ref.getDownloadURL().then(function(downloadURL) {
                          firebase.database().ref('/').child(firebase.auth().currentUser.uid).child("card").child(key).child("sub_images").child("ing3").child("src").set(downloadURL);
                              alert("Card making complete!");
                              window.location.href = "./madeCard.html";
                            });
                          });
                      });
                  });
              });
          });
    });

        //window.location.href = "./makecard.html";
    });


}
