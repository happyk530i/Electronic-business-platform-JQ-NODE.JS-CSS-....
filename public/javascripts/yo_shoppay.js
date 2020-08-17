$(function () {
  $("#btn1").click(function () {
    $("html,body").animate({ scrollTop: $("#p1").offset().top - 100 }, 800);
  });
  $("#btn2").click(function () {
    $("html,body").animate({ scrollTop: $("#p3").offset().top - 100 }, 800);
  });

  $.get("/guide/shopcart", function (e) {
    cartList = JSON.parse(e);
    var cUserId = $("#checkUser").val();
    results = [];
    cartList.forEach((memberIdd) => {
      if (memberIdd.memberId == cUserId) {
        results.push(memberIdd);
      }
    });
    var mylenth = results.length;
    $("#totalList").append("共" + mylenth + "筆");
    $.each(results, function (index, obj) {
      $(".shopList").append(` <tr>
        <td> <img class="img-fluid" src="/images/trip/${obj.tripPic1}" alt=""></td>
        <td>台灣｜${obj.preTripName}</td>
        <td>${obj.preTripDate} <br>${obj.preTripTime}</td>
        <td>${obj.tripPeo}</td>
        <td >${obj.preTripPrice}</td>
        <td >${obj.orderLan}</td>
        <td style="width: 300px;">${obj.tripNeed}</td>
    </tr>`);
    });

    $("#summit").click(function () {
      console.log("123");
      var today = new Date();
      var orderIdd = today.getTime();
      var orderDate =
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate();
      var memberId = $("#memberId").val();
      var memberName = $("#memberName").val();
      var memberTel = $("#memberTel").val();
      var memberBir = $("#memberBir").val();
      var memberEmail = $("#memberEmail").val();
      var orderTotal = results
        .map((el) => parseInt(el.preTripPrice))
        .reduce((a, b) => a + b);
      var payWay = $("input[name=memberPay]:checked").val();
      var orderList = [
        {
          memberId,
          orderIdd,
          orderDate,
          memberName,
          memberTel,
          memberBir,
          memberEmail,
          orderTotal,
          payWay,
        },
      ];
      // console.log(memberId);
      // console.log(orderDate);
      // console.log(memberName);
      // console.log(memberTel);
      // console.log(memberBir);
      // console.log(memberEmail);
      // console.log(payWay);
    //  var myDataa = JSON.stringify(results);
      $.ajax({
        type: "post",
        url: "/users/shoppay",
        data: orderList[0],
      }).then(function (e) {
        alert("謝謝您，您已完成訂單");
        setTimeout(function(){
          location.replace("/")
        },500);
        // console.log(results);
        // $.each(results, function (index, obj) {
        // $.ajax({
        //   type: "post",
        //   url: "/users/shoppay2",
        //   data:{tripNeed:"obj.tripNeed",
          // data:{tripNeed:obj.tripNeed,
        //   orderLan:obj.orderLan ,
        //   preOrder:obj.preOrder ,
        //   tripPic1:obj.tripPic1 ,
        //   preTripName:obj.preTripName ,
        //   preTripDate:obj.preTripDate ,
        //   preTripTime:obj.preTripTime ,
        //   tripPeo:obj.tripPeo, 
        //   preTripPrice:obj.preTripPrice ,
        //   memberId:obj.memberId,
        //   orderIdd,       
      // }
        // })
      // })
        // console.log(myDataa);
      });
    });
  });
});
// alert("123")
