(function(win, $){
    var $html = $("html");
    var deviceSize = {
        pc:992,
        tablet:768,
        mobile:767
    }

    function scrollShowHide(status){
        $html.css({'overflow-y':status});
        return $html.width();
    }

    var sc_w1 = scrollShowHide("hidden"),
        sc_w2 = scrollShowHide("scroll"),
        sc_w3 = sc_w1 - sc_w2;

    if(sc_w3 > 0){
        deviceSize.pc -= sc_w3; 
        deviceSize.tablet -= sc_w3; 
        deviceSize.mobile -= sc_w3; 
    }

    $(win).on("resize", function(){
        var w_size = $(win).width();
        if(w_size >= deviceSize.pc && !$html.hasClass('pc')){
            $html.removeClass('tablet mobile').addClass('pc');
            scrollShowHide("scroll");
        } 
        else if(w_size < deviceSize.pc && w_size >= deviceSize.tablet 
            && !$html.hasClass('tablet')){
                $html.removeClass('pc mobile').addClass('tablet');
                scrollShowHide("scroll");
        } 
        else if(w_size <= deviceSize.tablet && !$html.hasClass('mobile')){
            $html.removeClass('pc tablet').addClass('mobile');
            let menu_pos = parseInt($(".mobil .menu").css("left"));
            if(menu_pos >= 0){
                scrollShowHide("hidden");
            }
            console.log(menu_pos);
        }
    });

    $(function(){
        $(win).trigger('resize');

        $('.pc .menu > .menu2 > ul > li > a').on('mouseover focus', gnbplay);
        $('.tablet .menu > .menu2 > ul > li > a').on('mouseover focus', gnbplay);
        
        function gnbplay(){
            var $ts = $(this);
            var $html = $('html');
            if($html.hasClass('mobile')){
                
            }
            else {
                $('.menu > .menu2 > ul ul:visible').slideUp(400);
                $ts.next().stop(true,true).slideDown(400);
            }
        }
        
        $('.pc .menu > .menu2 > ul > li > a').on('mouseleave blur', gnbleave);
        $('.tablet .menu > .menu2 > ul > li > a').on('mouseleave blur', gnbleave);

        function gnbleave(){
            $(".menu > .menu2 > ul ul:visible").slideUp(500);
        }

    })
})(window, jQuery)