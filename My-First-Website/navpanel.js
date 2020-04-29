var main = function(){
    $('#icon-menu i').click(function(){
        $('.menu').animate({
            left:'0px'
            },200);
        $('body').animate({
            left: '285px'
        },200);
    });

     $('#min-icon i').click(function(){
            $('.menu').animate({
            left: '-285px'
            },200);
            
            $('body').animate({
            left: '0px'
            },200);
            
    });

};

$(document).ready(main);