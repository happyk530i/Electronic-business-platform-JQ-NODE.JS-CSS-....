// w3c:https://www.w3school.com.cn/jquery/event_ready.asp
$(document).ready(function(){

    // 網頁下拉100px時隱藏、往上滑時顯示搜尋列search
      $(window).scroll(function() {
        if ($(this).scrollTop() > 100 && $(this).scrollTop() < 800){
          $('div.search').fadeOut("fast");
        } else {
          $('div.search').fadeIn("fast");
        }
      });
      
      
    // GoTop按鈕 - 讓網頁快速回到最上方
      /* 按下GoTop按鈕時的事件 */
      $('#gotop').click(function(){
        // animate() 語法 : $(selector).animate(styles,options)
        $('html,body').animate({ scrollTop: 0 }, 'normal');   /* 返回到最頂上 */
        return false;
      });
      /* // 網頁/視窗事件: scroll() : 當拖曳瀏覽器捲動軸時觸發
      偵測卷軸滑動時，往下滑超過400px就讓GoTop按鈕出現 */
      $(window).scroll(function() {
        if ( $(this).scrollTop() > 400){
            $('#gotop').fadeIn("fast");
        } else {
            $('#gotop').fadeOut("fast");
        }
      });
    
      
    // three button 點擊事件
      $('.btnGro').on('click', function(){
        $('.btnGro').removeClass('selected');
        $(this).addClass('selected'); 
      });
    
    
    // 點選地區
      $('.areaConnect').on('click', function(){
        $('.areaConnect').removeClass('selected');
        $(this).addClass('selected'); 
      });
      
    
    // line黃色豎線 - 讓網頁滑動到指定的位置
      $('.line').click(function() {
        // https://medium.com/chloelo925/jquery-scrolltop-offset-%E9%81%8B%E7%94%A8-f7bbe93b77c4
        // animate()方法 : 執行 CSS 屬性集的自定義動畫
        // .animate( properties [, duration ] [, easing ] [, complete ] )
        // offset( )方法 : 返回偏移座標
        $('html,body').animate({scrollTop:$('#a1').offset().top},800);
      });
    
      
    // 網頁下拉時隱藏、往上滑時顯示導覽列navbar
      // scrollTop() : 取得 或 設置 匹配元素滾動條的垂直位置(如果該方法未設置參數，則返回以像素計的相對滾動條頂部的偏移)
      // w3c範例 : https://www.w3school.com.cn/tiy/t.asp?f=jquery_css_scrolltop_set 
      var getPosition = $(document).scrollTop();
        
      // outerHeight()  : 取得匹配元素的外部高度
      var navbarHeight = $('header').outerHeight();
      // alert( getPosition);
        
      // 網頁/視窗事件: scroll() : 當拖曳瀏覽器捲動軸時觸發
      $(window).scroll(function() {
        var windowPosition = $(document).scrollTop();
        
        // 指滾輪滾到 navbar 時才會顯示 navbar
        if (windowPosition > navbarHeight){
          $('header').addClass('hiddenDiv');
          }else{
            $('header').removeClass('hiddenDiv');
          }
          
        // 指滾輪往下滑時隱藏 navbar ， 往上滑時顯示 navbar  
        if (windowPosition > getPosition){
          $('header').removeClass('displayDiv');
          }else{
            $('header').addClass('displayDiv');
          }				
        getPosition = $(document).scrollTop();	
      });
     
    
    // 圖片立體效果輪播區
    
      var exchangeSpeed = 600;
    
      var myGod = false;
    
      var json0 = {
        "width": "174px",
        "height": "122px",
        "left": "-116px",
        "top": "100px"
      };
    
      var json1 = {
        "width": "356px",
        "height": "223px",
        "left": "0px",
        "top": "26px"
      };
    
      var json2 = {
        "width": "442px",
        "height": "273px",
        "left": "274px",
        "top": "0"
      };
    
      var json3 = {
        "width": "356px",
        "height": "223px",
        "left": "634px",
        "top": "26px"
      };
    
      var json4 = {
        "width": "174px",
        "height": "122px",
        "left": "997px",
        "top": "100px"
      };
    
      var currentIndex = 2;
    
      // 滑鼠移入移出時
      var timer = setInterval(rightBtnEvent, 2000);
    
      $("#loopBtn").mouseenter(
    
        function () {
          clearInterval(timer);
        }
    
      );
    
      $("#loopBtn").mouseleave(
    
        function () {
          clearInterval(timer);
          timer = setInterval(rightBtnEvent, 2000);
        }
    
      );
      // ##滑鼠移入移出時
    
      // 點擊圖片右邊的span
      $("#rightBtn").click(rightBtnEvent);
        function rightBtnEvent() {
    
        // w3c:https://www.w3school.com.cn/jquery/traversing_is.asp
        // is() : 根據選擇器、元素或jQuery 對象來檢測匹配元素集合，如果這些元素中至少有一個元素匹配給定的參數，則返回true,否則返回false。
        // img 
        if (!$(".imgUl li").is(":animated") || myGod === true) {
    
          if (currentIndex < 4) {
            currentIndex++;
          } else {
            currentIndex = 0;
          }
    
          // button
          // w3c:https://www.w3school.com.cn/jquery/traversing_siblings.asp
          // siblings() : 獲得匹配集合中每個元素的同胞，通過選擇器進行篩選是可選的。
          // eq() ==>從"0"開始算
          $("#tipDot li").eq(currentIndex).addClass("cur").siblings().removeClass("cur");
          // animate() 語法 : $(selector).animate(styles,options)
          // speed
          $(".no1").animate(json0, exchangeSpeed);
          $(".no2").animate(json1, exchangeSpeed);
          $(".no3").animate(json2, exchangeSpeed);
          $(".no4").animate(json3, exchangeSpeed);
          $(".no0").css(json4);
    
          // $( selector ).attr( attribute ) : "返回"被選元素的"屬性值"
          // $( selector ).attr( attribute , value ) : "設置"被選元素的"屬性"和"值"
          $(".no1").attr("class", "no0");
          $(".no2").attr("class", "no1");
          $(".no3").attr("class", "no2");
          $(".no4").attr("class", "no3");
    
          if ($(".no3").next().length !== 0) {
            $(".no3").next().attr("class", "no4");
          } else {
            $(".imgUl li:first").attr("class", "no4");
          }
    
          $(".no4").css(json4);
        }
    
      }
    
      $("#leftBtn").click(
    
        function () {
    
          if (!$(".imgUl li").is(":animated") || myGod === true) {
    
            if (currentIndex > 0) {
              currentIndex--;
            } else {
              currentIndex = 4;
            }
    
            $(".tipDot li").eq(currentIndex).addClass("cur").siblings().removeClass("cur");
            $(".no0").animate(json1, exchangeSpeed);
            $(".no1").animate(json2, exchangeSpeed);
            $(".no2").animate(json3, exchangeSpeed);
            $(".no3").animate(json4, exchangeSpeed);
            $(".no4").css(json0);
            $(".no3").attr("class", "no4");
            $(".no2").attr("class", "no3");
            $(".no1").attr("class", "no2");
            $(".no0").attr("class", "no1");
    
            if ($(".no1").prev().length != 0) {
              $(".no1").prev().attr("class", "no0");
            } else {
              $(".imgUl li:last").attr("class", "no0");
            }
    
            $(".no0").css(json0);
          }
    
        }
    
      );
    
      // button 
      $("#loopBtn .tipDot li").click(
    
        function () {
    
          exchangeSpeed = 100;
          myGod = true;
          var exchangeIndex = $(this).index();
    
          if (exchangeIndex > currentIndex) {
    
            var exchangeCount = exchangeIndex - currentIndex;
    
            for (var i = 1; i <= exchangeCount; i++) {
    
              $(".right").trigger("click");
            }
          } else {
    
            var exchangeCount2 = currentIndex - exchangeIndex;
    
            for (var i = 1; i <= exchangeCount2; i++) {
    
              $(".left").trigger("click");
            }
          }
    
          currentIndex = exchangeIndex;
    
          exchangeSpeed = 600;
    
          myGod = false;
    
        }
    
      );
    
    
    });


// bootstrap 輪播   
$('#carouselExample').on('slide.bs.carousel', function (e) {

  var $e = $(e.relatedTarget);
  var idx = $e.index();
  var itemsPerSlide = 4;
  var totalItems = $('.carousel-item').length;
  
  if (idx >= totalItems-(itemsPerSlide-1)) {
      var it = itemsPerSlide - (totalItems - idx);
      for (var i=0; i<it; i++) {
          // append slides to end
          if (e.direction=="left") {
              $('.carousel-item').eq(i).appendTo('.carousel-inner');
          }
          else {
              $('.carousel-item').eq(0).appendTo('.carousel-inner');
          }
      }
  }
});

$('#carouselExample').carousel({ 
              interval: 2000
      });

$(document).ready(function() {
/* show lightbox when clicking a thumbnail */
  $('a.thumb').click(function(event){
    event.preventDefault();
    var content = $('.modal-body');
    content.empty();
      var title = $(this).attr("title");
      $('.modal-title').html(title);        
      content.html($(this).html());
      $(".modal-profile").modal({show:true});
  });

});

$('#carouselExample').carousel({
  pause: true,
  interval: false
  });