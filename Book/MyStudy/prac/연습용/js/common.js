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

    if(sc_w3 >= 0){
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

        $(document).on('mouseover focus', 
        '.pc .menu > .menu2 > ul > li > a', gnbplay);
        $(document).on('mouseover focus', 
        '.tablet .menu > .menu2 > ul > li > a', gnbplay);
        $(document).on('click', 
        '.mobile .menu > .menu2 > ul > li > a', gnbplay);

        
        function gnbplay(){
            var $ts = $(this);
            var $html = $('html');
            if($html.hasClass('mobile')){
                $('.menu > .menu2 > ul ul:visible').slideUp(500);
                $('.menu > .menu2 > ul > li > a').removeClass("on"); 
                if($ts.next().is(':hidden')){
                    $ts.addClass("on"); 
                    $ts.next().stop(true,true).slideDown(500);
                }
            }
            else {
                $('.menu > .menu2 > ul ul:visible').slideUp(500);
                $ts.next().stop(true,true).slideDown(500);
            }
        };

        $(document).on('mouseleave','.pc .menu > .menu2 > ul > li > a',gnbleave);
        $(document).on('mouseleave','.tablet .menu > .menu2 > ul > li > a',gnbleave);
        
        function gnbleave(){
            $(".menu > .menu2 > ul ul:visible").slideUp(500);
        }
        
        $('.mobile-menu-open button').on('click', function(){
            $("header > .menu").animate({'left':'0'}, 300);
            scrollShowHide("hidden");
        });
        $('.mobile-menu-close button').on('click', function(){
            $("header > .menu").animate({'left':'-1000px'}, 300);
            gnbleave();
            $('.menu > .menu2 > ul > li > a').removeClass("on");
            scrollShowHide("scroll");
        });


    })
})(window, jQuery)