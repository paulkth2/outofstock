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
function writeToDatabase_1(uid, name, address, rec_menu, status, last_date){
  var newkey = firebase.database().ref(uid).child("customer").child(name).set({
    address: address,
    menu: rec_menu,
    status: status,
    last_date: last_date
  });
}

function writeToDatabaseMenu(uid, menu){
  firebase.database().ref(uid+"/menus").once('value',function(snapshot){
    var myValue = snapshot.val(); //{address:"xxx@bbb.ccc", menu:"xxx"}
    var keys = Object.keys(myValue);
    var length = keys.length;
    var newkey = firebase.database().ref(uid).child("menus").child("menu"+length).set({
      name: menu
    });
    $("#menus").append("<input id='ch"+ length +"' type='checkbox'>"+menu+" <br>")
  })
}

function writeToDatabase_ver2(uid, menu){
  var dict = {}
  firebase.database().ref(uid+"/menus").once('value',function(snapshot){
    var myValue = snapshot.val(); //{address:"xxx@bbb.ccc", menu:"xxx"}
    if (myValue != null){
      var keys = Object.keys(myValue);
      var length = keys.length;
    }
    var length = 0;
    var newkey = firebase.database().ref(uid).child("menus").child("menu"+length).set({
      name: menu
    });
  }).then(function(){
    setTimeout(readFromDatabaseMenu(uid,menu), 1000);//readFromDatabaseMenu(uid,menu)
  })
}

function readFromDatabase(uid,name){
  firebase.database().ref(uid+"/customer/"+name).once('value',function(snapshot){
    var myValue = snapshot.val(); //{address:"xxx@bbb.ccc", menu:"xxx"}
    return myValue
  })
}

function readFromDatabaseMenu(uid, new_val){
  firebase.database().ref(uid+"/menus").once('value',function(snapshot){
    var myValue = snapshot.val(); //{address:"xxx@bbb.ccc", menu:"xxx"}
    /*
    var keys = Object.keys(myValue);
    var tmp_list = [];
    for(var i = 0; i < keys.length; i++){
      var name = myValue[keys[i]]["name"]
      tmp_list.push(name);
    }
    localStorage.setItem("cur_value", tmp_list)
    */
  }).then(function(){
    $(document).on("click", "#add", function(){
      var name = $("#exampleInputEmail1").val();
      if(name.includes(".") || name.includes("#") || name.includes("$") || name.includes("[") || name.includes("]")){
        alert("이름에 .#$[] 의 특수문자를 넣지말아주세요")
      }
      var address = $("#exampleInputPassword1").val();
      var status = 2; // 0:VVIP 1:VIP 2:NEW
      var rec_menu = [];
      var menu_str = $(".favorite_food").val();

      //var cur_value = localStorage.getItem("cur_value").split(",");
      //var length = cur_value.length;
      for(var i = 0; i < 3; i++){
        if($("#stat" + i).prop("checked") == true){
          status = i;
        }
      }

      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var date = today.getDate();
      var ymd = String(month)+"-"+String(date)+"-"+String(year);
      writeToDatabase_1(uid, name, address, menu_str, status, ymd);
      alert("등록완료");
      $("#exampleInputEmail1").val("");
      $("#exampleInputPassword1").val("");
      $(".favorite_food").val("");
      $("#stat0").prop("checked",false);
      $("#stat1").prop("checked",false);
      $("#stat2").prop("checked", true);
      location.reload();
    })
  })
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
     var myUID = firebase.auth().currentUser.uid;
     readFromDatabaseMenu(myUID);
     $(document).ready(function(){
       /*
       $("#menu_btn").on("click",function(){
         var menu = $("#menu_hold").val();
         $("#menus").html("");
         writeToDatabase_ver2(myUID, menu);
         $("#menu_hold").val("");
       })
       */
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
  $("#mask").css({ 'width': $(document).width(), 'height': $(document).height() });
  $("#addcustomer").css({ 'left': $(document).width() / 2 - $("#addcustomer").width() / 2, 'top': $(document).height() / 2 - $("#addcustomer").height() / 2 });

  $("#btn_add").click(function () {
    $("#addcustomer").show();
    $("#mask").show();
    return false;
  });
  $("#addcustomer > .btn-danger").click(function () {
    $("#addcustomer").hide();
    $("#mask").hide();
    return false;
  });
})
