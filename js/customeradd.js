/*
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
*/
function writeToDatabase(uid, name, address, rec_menu, status){
  var newkey = firebase.database().ref(uid).child("customer").child(name).set({
    address: address,
    menu: rec_menu,
    status: status
  });
}

function readFromDatabase(uid,name){
  firebase.database().ref(uid+"/customer/"+name).once('value',function(snapshot){
    var myValue = snapshot.val(); //{address:"xxx@bbb.ccc", menu:"xxx"}
    return myValue
  })
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
     var myUID = firebase.auth().currentUser.uid;

     $(document).ready(function(){
       $(".btn-success").on("click",function(){
         var name = $("#exampleInputEmail1").val();
         var address = $("#exampleInputPassword1").val();
         var status = 2; // 1:VVIP 2:VIP 3:NEW
         var rec_menu = [];
         var menu_str;

         length = 7;
         for(var i = 0; i < length; i++){
           if($("#ch" + i).prop("checked") == true){
             rec_menu.push(i);
           }
         }
         for(var i = 0; i < 3; i++){
           if($("#stat" + i).prop("checked") == true){
             status = i;
           }
         }
         menu_str = rec_menu.join();
         writeToDatabase(myUID, name, address, menu_str, status)
         alert("등록완료")
         $("#exampleInputEmail1").val("");
         $("#exampleInputPassword1").val("");
         $("#stat0").prop("checked",false);
         $("#stat1").prop("checked",false);
         $("#stat2").prop("checked",true);
         for(var i = 0; i < length; i++){
           $("#ch" + i).prop("checked",false);
         }
       })
     })

  } else {
    // No user is signed in.
  }
});

$(document).ready(function(){
  $("#stat0").click(function(){
    $("#stat0").prop("checked",true);
    $("#stat1").prop("checked",false);
    $("#stat2").prop("checked",false);
  })
  $("#stat1").click(function(){
    $("#stat0").prop("checked",false);
    $("#stat1").prop("checked",true);
    $("#stat2").prop("checked",false);
  })
  $("#stat2").click(function(){
    $("#stat0").prop("checked",false);
    $("#stat1").prop("checked",false);
    $("#stat2").prop("checked",true);
  })
})
