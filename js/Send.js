//This function calculates the date between current date and the last date
function betweenDate(last_date){
  // format of last_date : e.g.)2019-1-23
  var dateList = last_date.split("-");
  var month = parseInt(dateList[0]);
  var date = parseInt(dateList[1]);
  var year = parseInt(dateList[2]);
  var date1 = new Date(year, month - 1, date);

  var current_date = new Date();
  var diff = Math.abs(current_date.getTime() - date1.getTime());
  var diff_days = Math.ceil(diff / (1000 * 3600 * 24))

  return diff_days;
}

//delete a customer
function deleteFromDatebase(uid, name){
  firebase.database().ref(uid).child("customer").child(name).set({});
}

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

/*
function readMenu(uid){

  var foodList = []
  firebase.database().ref(uid+"/menus/").once('value',function(snapshot){
    var myValue = snapshot.val(); //{address:"xxx@bbb.ccc", menu:"xxx", status:"xxx"}
    //var foodList = [];
    for(key in myValue){
      foodList.push(myValue[key]["name"])
    }
    console.log(foodList)

    console.log("here")
  }).then(readFromDatabaseAll(uid))
}*/

function readFromDatabaseAll(uid){
  firebase.database().ref(uid+"/customer/").once('value',function(snapshot){
    var myValue = snapshot.val(); //{address:"xxx@bbb.ccc", menu:"xxx"}
    //var i = Object.keys(myValue).length - 1;
    var key = Object.keys(myValue);
    if(key == null){
      return;
    }
    key.sort((a, b) => a.localeCompare(b, 'fr', {ignorePunctuation: true})).reverse()
    var i = key.length - 1;
    localStorage.setItem("length2",key.length);
    var length1 = 0;
    for(var k = 0; k < key.length; k++){
      //console.log(key)
      var dict = myValue[key[k]]
      var status;
      var color;
      //var menu = send_food
      //var menu_sel = dict["menu"].split(",");
      //var menu_final = [];
      /*
      for(var j = 0; j < menu_sel.length; j++){
        menu_final.push(menu[menu_sel[j]]);
      }
      */

      if(dict["status"] == 2){
        status = "NEW"
        color = "NEW"
      }else if(dict["status"] == 1){
        status = "VIP"
        color = "table-warning"
      }else{
        status = "VVIP"
        color = "table-danger"
      }

      var address = dict["address"];
      var last_date = dict["last_date"];
      var menu = dict["menu"];
      var between_date = betweenDate(last_date);

      var thres_date = parseInt($("#cur_card").find("strong").html());

      var row_rec = document.getElementById("rec_customers").insertRow(1);
      if (between_date >= thres_date){
        row_rec.innerHTML = "<tr><td><input id='rec_" + i + "'class='check' type='checkbox'></td><td class='name'>"+key[k]+"</td><td>"+menu+"</td><td class='address' id=" + address +">" +between_date+" day </td><td>"+status+"</td></tr>"
        $("#rec_"+i).closest("tr").prop("class",color)
        length1 = length1 + 1;
      }

      var row = document.getElementById("reg_customers").insertRow(1);
      if (between_date == 1){
        row.innerHTML = "<tr><td><input id='reg_" + i + "'class='check' type='checkbox'></td><td class='name'>"+key[k]+"</td><td>"+menu+"</td><td class='address' id=" + address +">" + between_date + " day </td><td>"+status+"</td></tr>"
      }else{
        row.innerHTML = "<tr><td><input id='reg_" + i + "'class='check' type='checkbox'></td><td class='name'>"+key[k]+"</td><td>"+menu+"</td><td class='address' id=" + address +">"+between_date+" days </td><td>"+status+"</td></tr>"
      }
      $("#reg_"+i).closest("tr").prop("class",color)
      i = i - 1
    }
    localStorage.setItem("length1",length1);
  })
}




firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
     var myUID = firebase.auth().currentUser.uid;
     readFromDatabaseAll(myUID)
     //readFromDatabaseAll(myUID) // write a table
  } else {
    // No user is signed in.
  }
});


$(document).ready(function(){
  var sending_card = localStorage.getItem("sending_card")

  $("#cur_card").find(".dropdown-item").on("click",function(){
    var date = $(this).html();
    $("#cur_card").find("strong").html(date);

    $("#rec_customers").find("thead").html("<tr><th><input class='checkall' type='checkbox'></th><th>Name</th><th>Favorite Food</th><th>Last date</th><th>Status</th></tr>")
    $("#reg_customers").find("thead").html("<tr><th><input class='checkall' type='checkbox'></th><th>Name</th><th>Favorite Food</th><th>Last date</th><th>Status</th></tr>")
    readFromDatabaseAll(firebase.auth().currentUser.uid)
  })



  $(document).on("click",".checkall", function(){
    if($(this).prop("checked")==false){
      //$(this).closest("table").find("input").prop("checked",false);
      var hindex = $(this).closest("table").prop("id").split("_")[0];
      if(hindex == "reg"){
        $("#rec_customers").find(".checkall").prop("checked",false);
        var length = localStorage.getItem("length2");
        for(var i = 0; i < length; i++){
          $("#rec_"+i).prop("checked", false);
        }
      }else{
        $("#reg_customers").find(".checkall").prop("checked",false);
        var length = localStorage.getItem("length2");
        var index = [];
        for(var i = 0; i < length; i++){
          if($("#rec_"+i).prop("checked") == true) index.push(i)
        }
        for(var i = 0; i < index.length; i++){
          $("#reg_"+index[i]).prop("checked",false)
        }
      }
      $(this).closest("table").find("input").prop("checked",false);
    }else{
      $(this).closest("table").find("input").prop("checked",true);
      var hindex = $(this).closest("table").prop("id").split("_")[0];
      if(hindex == "reg"){
        $("#rec_customers").find(".checkall").prop("checked",true);
        var length = localStorage.getItem("length2");
        for(var i = 0; i < length; i++){
          $("#rec_"+i).prop("checked", true);
        }
      }else{
        var length = localStorage.getItem("length2");
        var index = [];
        for(var i = 0; i < length; i++){
          if($("#rec_"+i).prop("checked") == true) index.push(i)
        }
        for(var i = 0; i < index.length; i++){
          $("#reg_"+index[i]).prop("checked",true)
        }
      }
    }
  })

  $(document).on("click",".check",function(){
    if($(this).prop("checked")==true){
      //can implement to check "checkall" button
      var index = $(this).prop("id").split("_")[1];
      $("#reg_"+index).prop("checked",true);
      $("#rec_"+index).prop("checked",true);
    }else{
      $(this).closest("table").find(".checkall").prop("checked",false);
      var index = $(this).prop("id").split("_")[1];
      $("#reg_"+index).prop("checked",false);
      $("#rec_"+index).prop("checked",false);
    }
  })

  $(".delete").on("click",function(){
    var length2 = parseInt(localStorage.getItem("length2"));
    for(var i = 0; i < length2; i++){
      if($("#reg_"+i).prop("checked") == true){
        var name = $("#reg_"+i).closest("tr").find(".name").html();
        //delete from database;
        deleteFromDatebase(firebase.auth().currentUser.uid, name);
        $("#reg_"+i).closest("tr").html("");
      }
      if($("#rec_"+i).prop("checked") == true){
        var name = $("#rec_"+i).closest("tr").find(".name").html();
        //delete from database;
        deleteFromDatebase(firebase.auth().currentUser.uid, name);
        $("#rec_"+i).closest("tr").html("");
      }
    }
    for(var i = 0; i < length2; i++){
      $("#reg_"+i).prop("checked",false)
      $("#reg_"+i).closest("table").find(".checkall").prop("checked",false);
      $("#rec_"+i).prop("checked",false)
      $("#rec_"+i).closest("table").find(".checkall").prop("checked",false);
    }
  })

  $(".btn-send").on("click",function(){
    var length1 = parseInt(localStorage.getItem("length1"));
    var length2 = parseInt(localStorage.getItem("length2"));
    var address = [];
    for(var i = 0; i < length2; i++){
      if($("#rec_"+i).prop("checked") == true){
        var myAdd = $("#rec_"+i).closest("tr").find(".address").prop("id");
        address.push(myAdd.trim());
      }
    }
    for(var i = 0; i < length2; i++){
      if($("#reg_"+i).prop("checked") == true){
        var myAdd = $("#reg_"+i).closest("tr").find(".address").prop("id");
        address.push(myAdd.trim());
      }
    }
    var tmp_set = new Set(address);
    address = Array.from(tmp_set);

    localStorage.setItem("customerList",address)
    if(address.length > 0){
      // have to implement how to send it.
      var subject = "이 메뉴를 추천드려요: " + localStorage.getItem("card_title");
      var body = ""+localStorage.getItem("sending_card");
      var body_p = "아래 링크를 들어가 이 메뉴 재료를 자세히 알아보세요->"
      var link_body = "https://outofstockcs374.firebaseapp.com/forcustomer.html?" + firebase.auth().currentUser.uid + "?" + localStorage.getItem("card_idx")
      var link = 'mailto:'+address+'?subject=' +subject+ "&body=" + body_p + link_body;
      window.location.href = link;
      //alert("보내기 완료")
      for(var i = 0; i < length2; i++){
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
