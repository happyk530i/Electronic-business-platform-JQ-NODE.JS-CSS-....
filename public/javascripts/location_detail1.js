$(function () {
  $.get("/trip/tripList", function (e) {
    tripList = JSON.parse(e);
    return tripList;
  }).then(() => {
    console.log(tripList);
  });
});

// 圖片選擇器_開始
$(function () {
  var request;
  var $current;
  var cache = {};
  var $frame = $("#photoViewer");
  var $thumbs = $(".thumb");
  function crossfade($img) {
    if ($current) {
      $current.stop().fadeOut("slow");
    }
    $img.css({
      marginLeft: -$img.width() / 2,
      marginTop: -$img.height() / 2,
    });
    $img.stop().fadeTo("slow", 1);
    $current = $img;
  }
  $(document).on("click", ".thumb", function (e) {
    var $img;
    var src = this.href;
    request = src;
    // console.log('123');
    e.preventDefault();
    $thumbs.removeClass("active");
    $(this).addClass("active");
    if (cache.hasOwnProperty(src)) {
      if (cache[src].isLoading === false) {
        crossfade(cache[src].$img);
      }
    } else {
      $img = $("<img/>");
      cache[src] = {
        $img: $img,
        isLoading: true,
      };
      $img.on("load", function () {
        $img.hide();
        $frame.removeClass("is-loading").append($img);
        cache[src].isLoading = false;
        if (request === src) {
          crossfade($img);
        }
      });
      $frame.addClass("is-loading");
      $img.attr({
        src: src,
        alt: this.title || "",
      });
    }
  });
  $(".thumb").eq(0).click();
});
// 圖片選擇器_結束

// 日曆_開始
var month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var month_name = [
  "January",
  "Febrary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Auguest",
  "September",
  "October",
  "November",
  "December",
];
var holder = document.getElementById("days");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var ctitle = document.getElementById("calendar-title");
var cyear = document.getElementById("calendar-year");
var my_date = new Date();
var my_year = my_date.getFullYear();
var my_month = my_date.getMonth();
var my_day = my_date.getDate();
//獲取某年某月第一天是星期幾
function dayStart(month, year) {
  var tmpDate = new Date(year, month, 1);
  return tmpDate.getDay();
}
//計算某年是不是閨年，通過求年份除以4的餘數即可
function daysMonth(month, year) {
  var tmp = year % 4;
  if (tmp == 0) {
    return month_olympic[month];
  } else {
    return month_normal[month];
  }
}
function refreshDate() {
  var str = "";
  var totalDay = daysMonth(my_month, my_year); //獲取該月總天數
  var firstDay = dayStart(my_month, my_year); //獲取該月第一天是星期幾
  var myclass;
  for (var i = 1; i < firstDay; i++) {
    str += "<li></li>"; //為起始日之前的日期創建空白節點
  }
  for (var i = 1; i <= totalDay; i++) {
    if (
      (i < my_day &&
        my_year == my_date.getFullYear() &&
        my_month == my_date.getMonth()) ||
      my_year < my_date.getFullYear() ||
      (my_year == my_date.getFullYear() && my_month < my_date.getMonth())
    ) {
      myclass = " class='lightgrey'"; //當該日期在今天之前時，以淺灰色字體顯示
    } else if (
      i == my_day &&
      my_year == my_date.getFullYear() &&
      my_month == my_date.getMonth()
    ) {
      myclass = " class='green greenbox'"; //當天日期以綠色背景突出顯示
    } else {
      myclass = " class='darkgreyAli' "; //當該日期在今天之後時，以深灰字體顯示
    }
    str += "<li" + myclass + ">" + i + "</li>"; //創建日期節點
  }

  holder.innerHTML = str; //設置日期顯示
  ctitle.innerHTML = month_name[my_month]; //設置英文月份顯示
  cyear.innerHTML = my_year; //設置年份顯示
}

// 點擊該日期在今天之後時，取得該點擊的數字
// function getDateValueAfter() {
//   var dateAfter = document.getElementsByClassName("darkgreyAli");
//   for (var i = 0; i < dateAfter.length; i++) {
//     dateAfter[i].addEventListener(
//       "click",
//       function () {
//         alert(`${my_year}/${my_month + 1}/${this.innerText}`);
//         document.getElementById("myDate").value= `${my_year}/${
//   my_month + 1
//         }/${this.innerText}`;
//         if(myDate.value == myDate2.value ){
//          $('#myd3').removeAttr('hidden');
//           }
//       },
//       false
//     );
   
//   }
// }

refreshDate(); //執行該函數

getDateValueAfter();

//往上一個月
prev.onclick = function (e) {
  e.preventDefault();
  my_month--;
  if (my_month < 0) {
    my_year--;
    my_month = 11;
  }

  refreshDate();

  getDateValueAfter();
};
// ##往上一個月

//往下一個月
next.onclick = function (e) {
  e.preventDefault();
  my_month++;
  if (my_month > 11) {
    my_year++;
    my_month = 0;
  }

  refreshDate();

  getDateValueAfter();
};
// ##往下一個月

// 日曆_結束
