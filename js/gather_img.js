$(document).ready(function(){
  console.log("ready")

  $(document).on("click", ".btn-success", function(){
    var img_src = $(this).closest(".card").find("img").attr("src")
    localStorage.setItem("sending_card", img_src)
    //console.log(img_src)
    //console.log("here")
  })
  //var img_src = $(".btn_secondary").closest(".card").find("img").attr("src")
  //localStorage.setItem()
})
