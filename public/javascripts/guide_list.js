var x = $(".sss").val();
var y = $("#ssa").val();
// console.log(y);

$(function () {
  //
  $("#aass").animate(
    {
      opacity: 1,
      paddingLeft: "+=100",
    },
    1000
  );

  // 行程列表資料庫_開始
  if(x === "trip"){ 
    if (y == "where" || y == "") {
      $.get("/trip/tripList", function (e) {
        tripList = JSON.parse(e);
        pagination(tripList, 1);
        josnData = tripList;
        console.log(josnData[0].memberId);
        return josnData;
      }).then(() => {
        $(".guide").empty();
      });
      $(".btnAll").attr("class","selected");
    }else { 
      switch (y) {
          case "北部":
            $.get("/trip/tripList/areaNorth", function (e) {
              tripList_North = JSON.parse(e);
              pagination(tripList_North, 1);
              josnData = tripList_North;
              console.log(josnData[0].memberId);
              return josnData;
            }).then(() => {
              $(".guide").empty();
            });
            $(".btnNorth").attr("class","selected");
            break;
          case "中部":
            $.get("/trip/tripList/areaMidst", function (e) {
              tripList_Midst = JSON.parse(e);
              pagination(tripList_Midst, 1);
              josnData = tripList_Midst;
              console.log(josnData[0].memberId);
              return josnData;
            }).then(() => {
              $(".guide").empty();
            });
            $(".btnMidst").attr("class","selected");
              break;
          case "南部":
            $.get("/trip/tripList/areaSouth", function (e) {
              tripList_South = JSON.parse(e);
              pagination(tripList_South, 1);
              josnData = tripList_South;
              console.log(josnData[0].memberId);
              return josnData;
            }).then(() => {
              $(".guide").empty();
            });
            $(".btnSouth").attr("class","selected");
              break;
          case "東部":
            $.get("/trip/tripList/areaEast", function (e) {
              tripList_East = JSON.parse(e);
              pagination(tripList_East, 1);
              josnData = tripList_East;
              console.log(josnData[0].memberId);
              return josnData;
            }).then(() => {
              $(".guide").empty();
            });
            $(".btnEast").attr("class","selected");
              break;
          default:
            $.get("/trip/tripList/areaIslandsArea", function (e) {
              tripList_IslandsArea = JSON.parse(e);
              pagination(tripList_IslandsArea, 1);
              josnData = tripList_IslandsArea;
              console.log(josnData[0].memberId);
              return josnData;
            }).then(() => {
              $(".guide").empty();
            });
            $(".btnIslandsArea").attr("class","selected");
              break;
      };
    };

  // 導遊資料庫_開始
  }else if(x === "guide") {
    if (y == "where" || y == "") { 
    $.get("/guide/memberList", function (e) {
      guideList = JSON.parse(e);
      pagination(guideList, 1);
      josnData = guideList;
      console.log(josnData);
      return josnData;
    }).then(() => {
      $(".guide").empty();
    });
    $(".btnAll").attr("class","selected");
    }else {
      switch(y) {
          case "北部":
            $.get("/trip/tripList/areaNorthGuide", function (e) {
              guideList_North = JSON.parse(e);
              pagination(guideList_North, 1);
              josnData = guideList_North;
              console.log(josnData[0].memberId);
              return josnData;
            }).then(() => {
              $(".guide").empty();
            });
            $(".btnNorth").attr("class","selected");
              break;
          case "中部":
            $.get("/trip/tripList/areaMidstGuide", function (e) {
              guideList_Midst = JSON.parse(e);
              pagination(guideList_Midst, 1);
              josnData = guideList_Midst;
              console.log(josnData[0].memberId);
              return josnData;
            }).then(() => {
              $(".guide").empty();
            });
            $(".btnMidst").attr("class","selected");
              break;
          case "南部":
            $.get("/trip/tripList/areaSouthGuide", function (e) {
              guideList_South = JSON.parse(e);
              pagination(guideList_South, 1);
              josnData = guideList_South;
              console.log(josnData[0].memberId);
              return josnData;
            }).then(() => {
              $(".guide").empty();
            });
            $(".btnSouth").attr("class","selected");
              break;
          case "東部":
            $.get("/trip/tripList/areaEastGuide", function (e) {
              guideList_East = JSON.parse(e);
              pagination(guideList_East, 1);
              josnData = guideList_East;
              console.log(josnData[0].memberId);
              return josnData;
            }).then(() => {
              $(".guide").empty();
            });
            $(".btnEast").attr("class","selected");
              break;
          default:
            $.get("/trip/tripList/areaIslandsAreaGuide", function (e) {
              guideList_IslandsArea = JSON.parse(e);
              pagination(guideList_IslandsArea, 1);
              josnData = guideList_IslandsArea;
              console.log(josnData[0].memberId);
              return josnData;
            }).then(() => {
              $(".guide").empty();
            });
            $(".btnIslandsArea").attr("class","selected");
              break;
      };
    };
  };
});

// 上面按鈕點擊事件
function findSide(button) {
  let inDomButton = document.querySelectorAll('button');
  for(let i = 0;i<inDomButton.length;i++){
    inDomButton[i].style.setProperty("background-color", "#fff");
    inDomButton[i].style.setProperty("color", "#666");
  }
  button.style.setProperty("background-color", "#6ac13c");
  button.style.setProperty("color", "#fff");
  // alert("123");
  // if (x === "guide") {
  //   $.get("/guide/memberList", function (e) {
  //     guideList = JSON.parse(e);
  //   });
  //   findSide1 = guideList.map((item) => Object.values(item)[2]);
  // }
  // if (x === "trip") {
  //   $.get("/trip/tripList", function (e) {
  //     tripList = JSON.parse(e);

  //   });
  // }
};

//取每個行程的id
function redirect(e) {
  console.log(josnData);
  window.location.replace("/trip/location_detail?id=" + (e - 1));
}
function change(e) {
  console.log(josnData);
  window.location.replace("/guide/guide_detail?id=" + (e - 1));
}

//分頁製作
function pagination(josnData, nowPage) {
  // 取得全部資料長度
  const dataTotal = josnData.length;
  // 設定要顯示在畫面上的資料數量
  // 預設每一頁只顯示 5 筆資料。
  const perpage = 8;
  // page 按鈕總數量公式 總資料數量 / 每一頁要顯示的資料
  // 這邊要注意，因為有可能會出現餘數，所以要無條件進位。
  const pageTotal = Math.ceil(dataTotal / perpage);
  // 當前頁數，對應現在當前頁數
  let currentPage = nowPage;
  // 因為要避免當前頁數筆總頁數還要多，假設今天總頁數是 3 筆，就不可能是 4 或 5
  // 所以要在寫入一個判斷避免這種狀況。
  // 當"當前頁數"比"總頁數"大的時候，"當前頁數"就等於"總頁數"
  // 注意這一行在最前面並不是透過 nowPage 傳入賦予與 currentPage，所以才會寫這一個判斷式，但主要是預防一些無法預期的狀況，例如：nowPage 突然發神經？！
  if (currentPage > pageTotal) {
    currentPage = pageTotal;
  }
  // 由前面可知 最小數字為 6 ，所以用答案來回推公式。
  const minData = currentPage * perpage - perpage + 1;
  const maxData = currentPage * perpage;
  // 先建立新陣列
  const data = [];
  // 這邊將會使用 ES6 forEach 做資料處理
  // 首先必須使用索引來判斷資料位子，所以要使用 index
  josnData.forEach((item, index) => {
    // 獲取陣列索引，但因為索引是從 0 開始所以要 +1。
    const num = index + 1;
    // 這邊判斷式會稍微複雜一點
    // 當 num 比 minData 大且又小於 maxData 就push進去新陣列。
    if (num >= minData && num <= maxData) {
      data.push(item);
    }
  });
  // 用物件方式來傳遞資料
  const page = {
    pageTotal,
    currentPage,
    hasPage: currentPage > 1,
    hasNext: currentPage < pageTotal,
  };
  displayData(data);
  pageBtn(page);
}
//生成每個卡片
function displayData(data) {
  let str = "";
  //判斷是導遊還是行程
  data.forEach((item) => {
    if (x === "guide") {
      str += `<a href=""></a>
      <div onclick="change(${
        item.memberId
      })"  class="col-md-3 py-2 px-2 imgTripList"><div class="card"><div class="card bg-dark text-white text-left">
        <img class="card-img-top bg-cover" height="155px" src="/images/guide/${
          item.memberPic
        }">
        <div class="card-img-overlay d-flex justify-content-between align-items-end p-0 px-3" style="background-color: rgba(0, 0, 0, .1)">
         <h5 class="card-img-title-lg">${
           item.memberName
         }</h5><h5 class="card-img-title-sm"></h5>
       </div>
      </div>
      <div class="card-body text-left">
          <p class="card-p-text"><i class="far fa-clock fa-clock-time"></i>&nbsp;<b>擅長項目：</b>${
            item.guideBest
          }</p>
        <div class="d-flex justify-content-between align-items-end">
          <p class="card-p-text"><i class="fas fa-mobile-alt fa-mobile"></i>&nbsp;${item.guideInfo.substring(
            0,
            20
          )}...</p>
        </div>
      </div>
    </div>
  </div>`;
    }
    if (x === "trip") {
      str += `
      <div onclick="redirect(${item.tripId})"  id="${
        item.tripId
      }" class=" col-md-3 py-2 px-2 imgTripList" ><div class="card"><div class="card bg-dark text-white text-left">
        <img class="card-img-top bg-cover" height="155px" src="/images/trip/${
          item.tripPic1
        }">
        <div class="card-img-overlay d-flex justify-content-between align-items-end p-0 px-3" style="background-color: rgba(0, 0, 0, .1)">
         <h5 class="card-img-title-lg">${
           item.tripName
         }</h5><h5 class="card-img-title-sm"></h5>
       </div>
      </div>
      <div class="card-body text-left">
          <p class="card-p-text"><i class="far fa-clock fa-clock-time"></i>&nbsp;<b>${
            item.tripDate
          }</b>&emsp;<span>${item.tripTime}</span></p>
        <div class="d-flex justify-content-between align-items-end">
          <p class="card-p-text"><i class="fas fa-mobile-alt fa-mobile"></i>&nbsp;${item.tripIntroduce.substring(
            0,
            20
          )}...</p>
        </div>
      </div>
    </div>
  </div>`;
    }
  });
  content.innerHTML = str;
}
//分頁按鈕
function pageBtn(page) {
  let str = "";
  const total = page.pageTotal;
  if (page.hasPage) {
    str += `<li class="page-item"><a class="page-link" href="#" data-page="${
      Number(page.currentPage) - 1
    }">Previous</a></li>`;
  } else {
    str += `<li class="page-item disabled"><span class="page-link">Previous</span></li>`;
  }
  for (let i = 1; i <= total; i++) {
    if (Number(page.currentPage) === i) {
      str += `<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    } else {
      str += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    }
  }
  if (page.hasNext) {
    str += `<li class="page-item"><a class="page-link" href="#" data-page="${
      Number(page.currentPage) + 1
    }">Next</a></li>`;
  } else {
    str += `<li class="page-item disabled"><span class="page-link">Next</span></li>`;
  }
  pageid.innerHTML = str;
}
//更換頁面
function switchPage(e) {
  e.preventDefault();
  if (e.target.nodeName !== "A") return;
  const page = e.target.dataset.page;
  pagination(josnData, page);
}
pageid.addEventListener("click", switchPage);

// 圖片淡入效果
$(document).ready(function(){
  var a,b,c;
  a = $(window).height(); //瀏覽器窗口高度
  var group = $("#content");
  $(window).scroll(function(){
  b = $(this).scrollTop(); //頁面滾動的高度
  c = group.offset().top; //元素距離文檔（document）頂部的高度
    if(a+b>c){
      // alert("123");
      $("#content").animate({'opacity':'1'},1000);
    }
  });
});
  
