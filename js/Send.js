function writeToDatabase(uid, name, address, rec_menu){
  var newkey = firebase.database().ref(uid).child("customer").child(name).set({
    address: address,
    menu: rec_menu
  });
}

function readFromDatabase(uid,name){
  firebase.database().ref(uid+"/customer/"+name).once('value',function(snapshot){
    var myValue = snapshot.val(); //{address:"xxx@bbb.ccc", menu:"xxx"}
    return myValue
  })
}

function readFromDatabaseAll(uid){
  firebase.database().ref(uid+"/customer/").once('value',function(snapshot){
    var myValue = snapshot.val(); //{address:"xxx@bbb.ccc", menu:"xxx"}
    console.log(myValue)
    return myValue
  })
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
     var myUID = firebase.auth().currentUser.uid;
     readFromDatabaseAll(myUID)
  } else {
    // No user is signed in.
  }
});





$(document).ready(function(){
  console.log("ready_send")
  var sending_card = localStorage.getItem("sending_card")

  $(".checkall").on("click",function(){
    if($(this).prop("checked")==false){
      $(this).closest("table").find("input").prop("checked",false);
    }else{
      $(this).closest("table").find("input").prop("checked",true);
    }
  })

  $(".check").on("click",function(){
    if($(this).prop("checked")==true){
      //can implement to check "checkall" button
    }else{
      $(this).closest("table").find(".checkall").prop("checked",false);
    }
  })

  $(".btn-send").on("click",function(){
    var length1 = 3;
    var length2 = 5;
    var address = [];
    for(var i = 0; i < length1; i++){
      if($("#rec_"+i).prop("checked") == true){
        var myAdd = $("#rec_"+i).closest("tr").find(".address").html();
        address.push(myAdd.trim());
      }
    }
    for(var i = 0; i < length2; i++){
      if($("#reg_"+i).prop("checked") == true){
        var myAdd = $("#reg_"+i).closest("tr").find(".address").html();
        address.push(myAdd.trim());
      }
    }
    localStorage.setItem("customerList",address)
    if(address.length > 0){
      // have to implement how to send it.
      alert("보내기 완료")
      for(var i = 0; i < length1; i++){
        $("#rec_"+i).prop("checked",false)
        $("#rec_"+i).closest("table").find(".checkall").prop("checked",false);
      }
      for(var i = 0; i < length2; i++){
        $("#reg_"+i).prop("checked",false)
        $("#reg_"+i).closest("table").find(".checkall").prop("checked",false);
      }
    }else{
      alert("하나 이상을 선택하십시오")
    }
  })
})
