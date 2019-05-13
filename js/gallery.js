// Your web app's Firebase configuration

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

function readFromDatabase() {
return firebase.database().ref('/test@taehyung/gallery/').once('value', function(snapshot) {
    var myValue = snapshot.val();
    var keyList = Object.keys(myValue);
    var imagenum = 1

    for(var i=0;i<keyList.length;i++) {
        if(imagenum > 6){
            continue;
        }
        var myKey = keyList[i];
        //console.log("image"+String(imagenum))
        document.getElementById("name"+String(imagenum)).innerHTML = myValue[myKey].name;
        document.getElementById("image"+String(imagenum)).src = myValue[myKey].src;

        imagenum = imagenum + 1;
    }
});
}

readFromDatabase();