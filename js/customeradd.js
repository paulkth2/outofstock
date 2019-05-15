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
    var keys = Object.keys(myValue);
    var length = keys.length;
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
    var keys = Object.keys(myValue);
    var tmp_list = [];
    for(var i = 0; i < keys.length; i++){
      var name = myValue[keys[i]]["name"]
      tmp_list.push(name);
      $("#menus").append("<input id='ch"+ i +"' type='checkbox'>"+name+" <br>")
    }
    /*
    if(new_val){
      tmp_list.push(new_val);
      $("#menus").append("<input id='ch"+ keys.length +"' type='checkbox'>"+new_val+" <button type='button' class='btn btn-outline-danger btn-sm'>삭제</button><br>")
      console.log("newval here")
    }
    */
    localStorage.setItem("cur_value", tmp_list)
  }).then(function(){
    $(document).on("click", ".btn-success", function(){
      var name = $("#exampleInputEmail1").val();
      var address = $("#exampleInputPassword1").val();
      var status = 2; // 0:VVIP 1:VIP 2:NEW
      var rec_menu = [];
      var menu_str;

      var cur_value = localStorage.getItem("cur_value").split(",");
      var length = cur_value.length;
      console.log(cur_value)
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
      console.log(rec_menu)
      menu_str = rec_menu.join();
      writeToDatabase(uid, name, address, menu_str, status)
      alert("등록완료")
      $("#exampleInputEmail1").val("");
      $("#exampleInputPassword1").val("");
      $("#stat0").prop("checked",false);
      $("#stat1").prop("checked",false);
      $("#stat2").prop("checked",true);
      for(var i = 0; i < length; i++){
        $("#ch" + i + " ").prop("checked",false);
      }
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
       var rec_menu = [];
       var cur_value = localStorage.getItem("cur_value").split(",");
       var length = cur_value.length;

       for(var i = 0; i < length; i++){
         $(document).on("change","#ch"+i+" ", function(){
           if($(this).prop("checked") == true){
             console.log("here")
             rec_menu.push(i);
           }
         })
       }
       localStorage.setItem("rec_menu",rec_menu)
       */

       /*
       $(document).on("click", ".btn-success", function(){
         var name = $("#exampleInputEmail1").val();
         var address = $("#exampleInputPassword1").val();
         var status = 2; // 0:VVIP 1:VIP 2:NEW
         //var rec_menu = [];
         var menu_str;

         var cur_value = localStorage.getItem("cur_value").split(",");
         var length = cur_value.length;

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
       */
       /*
       $(".btn-success").on("click",function(){
         var name = $("#exampleInputEmail1").val();
         var address = $("#exampleInputPassword1").val();
         var status = 2; // 0:VVIP 1:VIP 2:NEW
         var rec_menu = [];
         var menu_str;

         var length = cur_value.length;
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
       */

       $("#menu_btn").on("click",function(){
         var menu = $("#menu_hold").val();
         $("#menus").html("");
         writeToDatabase_ver2(myUID, menu);
         $("#menu_hold").val("");
         //readFromDatabaseMenu(myUID);
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
