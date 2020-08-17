$(function () {
$.get("/trip/tripList", function (e) {
  tripList = JSON.parse(e);
  return tripList;
}).then(()=>{
console.log(tripList);
})
})

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
var month_olympic = [31,29,31,30,31,30,31,31,30,31,30,31];
var month_normal = [31,28,31,30,31,30,31,31,30,31,30,31];
var month_name = ["January","Febrary","March","April","May","June","July","Auguest","September","October","November","December"];
var holder = document.getElementById("days");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var ctitle = document.getElementById("calendar-title");
var cyear = document.getElementById("calendar-year");
var my_date = new Date();
// console.log(my_date);
var my_year = my_date.getFullYear();
var my_month = my_date.getMonth();
// console.log(my_month);
var my_day = my_date.getDate();

//獲取某年某月第一天是星期幾
function dayStart(month, year) {
var tmpDate = new Date(year, month, 1);
return (tmpDate.getDay());
}

//計算某年是不是閨年，通過求年份除以4的餘數即可
function daysMonth(month, year) {
var tmp = year % 4;
if (tmp == 0) {
    return (month_olympic[month]);
} else {
    return (month_normal[month]);
}
}

function refreshDate(){
var str = "";
var totalDay = daysMonth(my_month, my_year); //獲取該月總天數
var firstDay = dayStart(my_month, my_year); //獲取該月第一天是星期幾
var myclass;
for(var i=1; i<firstDay; i++){ 
    str += "<li></li>"; //為起始日之前的日期創建空白節點
}
for(var i=1; i<=totalDay; i++){
    if((i<my_day && my_year==my_date.getFullYear() && my_month==my_date.getMonth()) || my_year<my_date.getFullYear() || ( my_year==my_date.getFullYear() && my_month<my_date.getMonth())){ 
        myclass = " class='lightgrey'"; //當該日期在今天之前時，以淺灰色字體顯示
    }else if (i==my_day && my_year==my_date.getFullYear() && my_month==my_date.getMonth()){
        myclass = " id='greenbox'"; //當天日期以綠色背景突出顯示
    }else{
        myclass = " class='darkgreyAli'"; //當該日期在今天之後時，以深灰字體顯示
    }
    str += "<li"+myclass+">"+i+"</li>"; //創建日期節點
    
}

holder.innerHTML = str; //設置日期顯示
ctitle.innerHTML = month_name[my_month]; //設置英文月份顯示
cyear.innerHTML = my_year; //設置年份顯示

}

// 點擊在"當天日期"時，取得該點擊的數字
function getDateValueNew(){
  dateNew = document.getElementById("greenbox");
  dateNew.addEventListener("click", function(){
    
    var dateAfter = document.getElementsByClassName("darkgreyAli");
      for(var i=0;i<dateAfter.length;i++){
        dateAfter[i].style="background-color:fff";
      }

    greenbox.style.backgroundColor = "#6ac13c"; 
    greenbox.style.color = "#fff"; 

    // alert(`${my_year}/${my_month+1}/${this.innerText}`);
    // 增加新屬性值或改變現有的屬性值(JS課p.12-9 ~ 12-10)
    var ConDateAfter = (`${my_year}/${my_month+1}/${this.innerText}`);
    // 第一種寫法
    // document.getElementById("dateResult").setAttribute("value",ConDateAfter);
    // 第二種寫法
    // document.getElementById("dateResult").value = ConDateAfter;
    // 第三種寫法
    dateResult.value = ConDateAfter;
  })
}

// 點擊該日期在"今天之後"時，取得該點擊的數字
function getDateValueAfter(){
  var dateAfter = document.getElementsByClassName("darkgreyAli");
    for(var i=0;i<dateAfter.length;i++){
        dateAfter[i].addEventListener("click", function(){
          //在點擊事件中再加一個迴圈，當點擊事件觸發時，先讓其他元素的顏色保持不變
          for(i=0;i<dateAfter.length;i++){
            dateAfter[i].style="background-color:fff";
          }
          // 點擊事件發生顏色變化，在觸發下一次的點擊事件時，會先再跑上一步的迴圈，以讓上一次點擊變化的顏色恢復到原來的顏色
          // this.style="background-color:#6ac13c"; 
          this.style.backgroundColor = "#6ac13c";  
          this.style.color = "#fff";  
          
          // 如果是當月當天，才執行!
          var totalDay = daysMonth(my_month, my_year); 
            for(var i=1; i<=totalDay; i++){
              if (i==my_day && my_year==my_date.getFullYear() && my_month==my_date.getMonth()){
                    document.getElementById("greenbox");
                    greenbox.style.backgroundColor = "#fff"; 
                    greenbox.style.color = "#6ac13c"; 
              }
            }
          
          // alert(`${my_year}/${my_month+1}/${this.innerText}`);
          // 增加新屬性值或改變現有的屬性值(JS課p.12-9 ~ 12-10)
          var ConDateAfter = (`${my_year}/${my_month+1}/${this.innerText}`);
          // 第一種寫法
          // document.getElementById("dateResult").setAttribute("value",ConDateAfter);
          // 第二種寫法
          // document.getElementById("dateResult").value = ConDateAfter;
          // 第三種寫法
          dateResult.value = ConDateAfter;
          $("#tripDate").attr('value',dateResult.value)
        })  
    }
}

//執行該函數
refreshDate(); 

getDateValueAfter();

getDateValueNew();

// 默認顯示的日期(顯示當天)
dateResult.value = (`${my_year}/${my_month+1}/${my_day}`);
 
//往上一個月  
prev.onclick = function(e){
e.preventDefault();
my_month--;
console.log(my_month);
if(my_month<0){
    my_year--;
    my_month = 11;
}

refreshDate();

getDateValueAfter();

// 如果是當天，才呼叫getDateValueNew()
var totalDay = daysMonth(my_month, my_year); 
  for(var i=1; i<=totalDay; i++){
       if (i==my_day && my_year==my_date.getFullYear() && my_month==my_date.getMonth()){
        getDateValueNew();
      }
  }
}
// ##往上一個月 


//往下一個月  
next.onclick = function(e){
e.preventDefault();
my_month++;
// console.log(my_month);
if(my_month>11){
    my_year++;
    my_month = 0;
}

refreshDate();

getDateValueAfter();

// 如果是當天，才呼叫getDateValueNew()
var totalDay = daysMonth(my_month, my_year); 
  for(var i=1; i<=totalDay; i++){
     if (i==my_day && my_year==my_date.getFullYear() && my_month==my_date.getMonth()){
      getDateValueNew();
    }
  }
} 
// ##往下一個月

// 日曆_結束


// 計算數量對應到價格
$(document).ready(function(){
    // 成人 - 增加
    $(".add").click(function(){
        var t=$(this).parent().find('input[class=text_box]');
        t.val(parseInt(t.val())+1)
        setTotal();
    })
    // // 小孩 - 增加
    // $(".add_chil").click(function(){
    //     var t1=$(this).parent().find('input[class=text_boxchil]');
    //     t1.val(parseInt(t1.val())+1)
    //     setTotal();
    // })
    // 成人 - 減少
    $(".min").click(function(){
        var t=$(this).parent().find('input[class=text_box]');
        t.val(parseInt(t.val())-1)
        if(parseInt(t.val()) < 1){
            t.val(1);
        }
        setTotal();
    })
    // // 小孩 - 減少
    // $(".min_chil").click(function(){
    //     var t1=$(this).parent().find('input[class=text_boxchil]');
    //     t1.val(parseInt(t1.val())-1)
    //     if(parseInt(t1.val()) < 0){
    //         t1.val(0);
    //     }
    //     setTotal();
    // })

    function setTotal(){
        var s=0;
        $(".gm").each(function(){
            var adult = parseInt($(this).find('input[class=text_box]').val())*parseFloat($(this).find('span[class*=price]').text());
            // var child = parseInt($(this).find('input[class=text_boxchil]').val())*parseFloat($(this).find('span[class*=price]').text());
            s+= adult;
           
          });
        
        // toFixed（）方法將數字轉換為字符串，四捨五入為指定的小數位數
        $("#total").html(s.toFixed());
        $("#totalPost").attr('value',s.toFixed());
    }

    setTotal();

})

