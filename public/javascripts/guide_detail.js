window.addEventListener('load', function() {
    // tab切換部分
    var tab_list = document.querySelector('.tab_list');
    var lis = tab_list.querySelectorAll('li');
    var items = document.querySelectorAll('.tab_con');
    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i);
        lis[i].onclick = function() {
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            for (var i = 0; i < items.length; i++) {
                items[i].style.display = 'none';
            }
            items[index].style.display = 'block';
        }
    }
    // 評分長條圖
})

// 使用 text-overflow: ellipsis; 屬性時、文字只能單行出現。若是想要多行文字、就必須要用js來判斷
// https://www.astralweb.com.tw/css-ellipsis/
$(document).ready(function(){
        var len = 100; // 超過幾個字以"..."取代
        $(".viewIntroduce").each(function(i){
            if($(this).text().length>len){
                $(this).attr("title",$(this).text());
                var text=$(this).text().substring(0,len-1)+"...";
                $(this).text(text);
            }
        });
});
    