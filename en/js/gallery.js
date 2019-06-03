// Your web app's Firebase configuration

var database = firebase.database();

var storageRef = firebase.storage().ref();

var uid = ""


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      uid = firebase.auth().currentUser.uid;
    } else {
      // No user is signed in.
    }
  });


function writeNewPost(uid, username, picture, title, body) {
    // A post entry.
    var postData = {
        author: username,
        uid: uid,
        body: body,
        title: title,
        starCount: 0,
        authorPic: picture
};

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}

function submitFile(){
    var file = document.getElementById("image-file").value;
    var name = ducument.getElementById("image-name").value;


}

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
