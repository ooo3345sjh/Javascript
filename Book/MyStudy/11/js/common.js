(function(win, $){
	var $html = $("html");
	var deviceSize = {
		pc:1009,
		tablet:801,
		mobile:800
	};

	// 매개변수에 전달되 값이 "scroll"이면 스크롤바가 생성되고 너빗값을 반환합니다.
	function scrollShowHide(status){
		$html.css({"overflow-y":status})
		return $html.width();
	}

	var sc_w1 = scrollShowHide("hidden"),
	sc_w2 = scrollShowHide("scroll"),
	sc_w3 = sc_w1 - sc_w2;

	if(sc_w3 > 3){
		deviceSize.pc = deviceSize.pc - sc_w3;
		deviceSize.tablet = deviceSize.tablet - sc_w3;
		deviceSize.mobile = deviceSize.mobile - sc_w3;
	}
	//console.log(deviceSize.pc);

	// 브라우저의 창 너비가 변하면 창의 너비를 w_size에 저장한다.
	$(win).on("resize", function(){ 
		var w_size = $(win).width();

		// 브라우저의 창 너비가 데스크톱의 너비보다 크거나 같으면 실행한다.
		if(w_size >= deviceSize.pc && !$("html").hasClass("pc")){ 
			$html.removeClass("mobile tablet").addClass("pc");
			scrollShowHide("scroll");
		} 
		// 태블릿 사이즈인 경우 실행한다.
		else if(w_size < deviceSize.pc && w_size >= deviceSize.tablet 
			&& !$("html").hasClass("tablet")){
			$html.removeClass("mobile pc").addClass("tablet");
			scrollShowHide("scroll");
		}
		// 모바일 사이즈인 경우 실행한다. 
		else if(w_size < deviceSize.tablet && !$("html").hasClass("mobile")){
			$html.removeClass("pc tablet").addClass("mobile");
			var menu_pos = parseInt($(".mobile-menu-wrap").css("left"));
			if(menu_pos >= 0){
				scrollShowHide("hidden");
			}
		}
	});

	$(function(){
		// 문서가 로딩될 때 resize 이벤트가 발생한다. 이때 설정한 중단점에 맞는 class 값을 생성한다.
		$(win).trigger("resize");

		
		$(document).on("mouseover focus", ".pc #gnb>ul>li>a, .tablet #gnb>ul>li>a", gnbPlay);

		$(document).on("click", ".mobile #gnb>ul>li:not(.no-sub)>a", gnbPlay);

		function gnbPlay(){
			var $ts = $(this);
			if($("html").hasClass("mobile")){
				$(".mobile #gnb>ul>li>a").removeClass("on");
				$("#gnb ul ul:visible").slideUp(300);
				if($ts.next().is(":hidden")){
					$ts.addClass("on");
					$ts.next().stop(true,true).slideDown(300);
				}
			} else {
				$("#gnb ul ul:visible").slideUp(300);
				$ts.next().stop(true, true).slideDown(300);
			}
		}

		$(document).on("mouseleave", ".pc #gnb, .tablet #gnb", gnbleave);
		function gnbleave(){
			$("#gnb ul ul:visible").slideUp(300);
			$("#gnb>ul>li>a").removeClass("on");
		}

		$(".mobile-menu-open button").on("click", function() {
			$(".mobile-menu-wrap").animate({"left":0}, 200);
			scrollShowHide("hidden");
		});

		$(".mobile-menu-close button").on("click", function() {
			$(".mobile-menu-wrap").animate({"left":"-1000px"}, 200);
			scrollShowHide("scroll");
			gnbleave();
		});
	});
})(window, jQuery);
