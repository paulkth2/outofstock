var storage = firebase.storage();
var storageref = firebase.storage().ref();

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
      console.log(typeof f);
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
      
      var reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
            ingre1file = f;
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

      var reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
            ingre2file = f;
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

      var reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
            ingre3file = f;
          document.getElementById('ingredient3').src = e.target.result;
        };
      })(f);
      reader.readAsDataURL(f);
    }
  }

document.getElementById('ingreimage3').addEventListener('change', handleFileSelect4, false);


function send() {
    var mainname = document.getElementById('menu-name').value;
    //console.log(typeof mainfile);
    storageref.child(mainname).put(mainfile).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
      }); 
}