function writeToDatabase(uid, name, address, rec_menu){
  var newkey = firebase.database().ref(uid).child("customer").child(name).set({
    address: address,
    menu: rec_menu
  });
}

function readFromDatabase(uid,name){
  firebase.database().ref(uid+"/customer/"+name).once('value',function(snapshot){
    var myValue = snapshot.val(); //{address:"xxx@bbb.ccc", menu:"xxx", status:"xxx"}
    return myValue
  })
}

function readMenu(uid){
  var foodList = []
  firebase.database().ref(uid+"/menus/").once('value',function(snapshot){
    var myValue = snapshot.val(); //{address:"xxx@bbb.ccc", menu:"xxx", status:"xxx"}
    //var foodList = [];
    for(key in myValue){
      foodList.push(myValue[key]["name"])
    }
    console.log(foodList)
  }).then(readFromDatabaseAll(uid,foodList))
}

/*
<tr class="table-danger">
  <td>
    <input id="rec_0" class="check" type="checkbox">
  </td>
  <td>
    (FOOD)
  </td>
  <td class="address">
    (628)xxx-xxxx
  </td>
  <td>
    VVIP
  </td>
</tr>
*/

function readFromDatabaseAll(uid, send_food){
  firebase.database().ref(uid+"/customer/").once('value',function(snapshot){
    var myValue = snapshot.val(); //{address:"xxx@bbb.ccc", menu:"xxx"}
    //var i = Object.keys(myValue).length - 1;
    var key = Object.keys(myValue);
    key.sort((a, b) => a.localeCompare(b, 'fr', {ignorePunctuation: true})).reverse()
    var i = key.length - 1;
    localStorage.setItem("length2",key.length);
    for(var k = 0; k < key.length; k++){
      //console.log(key)
      var dict = myValue[key[k]]
      var status;
      var color;
      //var menu = ["연어회덮밥","참치회덮밥","초밥 셋","컷틝","정식","우동","소바"]; // have to implement
      var menu = send_food
      var menu_sel = dict["menu"].split(",");
      var menu_final = [];
      for(var j = 0; j < menu_sel.length; j++){
        menu_final.push(menu[menu_sel[j]]);
      }

      if(dict["status"] == 2){
        status = "NO"
        color = "NO"
      }else if(dict["status"] == 1){
        status = "VIP"
        color = "table-warning"
      }else{
        status = "VVIP"
        color = "table-danger"
      }

      var row = document.getElementById("reg_customers").insertRow(1);
      row.innerHTML = "<tr><td><input id='reg_" + i + "'class='check' type='checkbox'></td><td>"+key[k]+"</td><td>"+menu_final+"</td><td class='address'>"+dict["address"]+"</td><td>"+status+"</td></tr>"
      $("#reg_"+i).closest("tr").prop("class",color)
      i = i - 1
    }
  })
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
     var myUID = firebase.auth().currentUser.uid;
     readMenu(myUID)
     //readFromDatabaseAll(myUID) // write a table
  } else {
    // No user is signed in.
  }
});





$(document).ready(function(){

  $("#cur_card").html(localStorage.getItem("card_title"))
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
    var length2 = parseInt(localStorage.getItem("length2"));
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
      var subject = "이 메뉴를 추천드려요:" + localStorage.getItem("card_title");
      var body = ""+localStorage.getItem("sending_card");
      var link = 'mailto:'+address+'?subject=' +subject+ "&body=" + body;
      window.location.href = link;
      //alert("보내기 완료")
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
