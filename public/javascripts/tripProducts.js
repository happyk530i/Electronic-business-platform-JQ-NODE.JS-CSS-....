var cache={
    "/images/add_guide1.jpg":{
        "$img":jQuery Object,
        "islLoading":false
    },
    "/images/add_guide2.jpg":{
    "$img":jQuery Object,
    "islLoading":false
    },
    "/images/add_guide3.jpg":{
    "$img":jQuery Object,
    "islLoading":false
    },
    }
var request;
var $current;
var cache:{};
var $fram = $('.photoViewer');
var $thumbs = $('.thumb');

function crossfade($img){
    if($current){
        $current.stop().fadeOut('slow');
    }
    $img.css({
        marginLeft:-$img.width()/2,
        marginTop:-$img.height()/2,
    });
    $img.stop().fadeTo('slow',1);
    $current=$img;
}