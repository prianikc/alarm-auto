$(function() {
//selectiz plugin
	$('select').selectize({
		create: true,
		hideSelected: true,
		closeAfterSelect: true,		
	});

//E-mail Ajax Send
	$("form.callback_1,form.callback_2").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(th).find('.success').addClass('active').css("display", "flex").hide().fadeIn();
			setTimeout(function() {
				$(th).find('.success').removeClass('active').fadeOut();
				th.trigger("reset");
			}, 3000);
		});
		return false;
	});
	

//jquery.mask
$('#i_redline-selectized').mask('');
$('#i_services-selectized').mask('');

//slick carousel
$('.partners').slick({
  dots: false,
  infinite: true,
  speed: 700,
  slidesToShow: 4,
  slidesToScroll: 2,
  arrows: true,
  prevArrow: '<i class="fa fa-angle-left"></i>',
  nextArrow: '<i class="fa fa-angle-right"></i>',
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
   ]
  });

	$("#my-menu,#footer_nav").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

	$('.top_slide').click(function() {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});
	$(window).scroll(function() {
		if ($(this).scrollTop() > $(window).height()) {
			$('.top_slide').addClass("active");
		} else {
			$('.top_slide').removeClass("active");
		};
	});
});

//$(document).ready(function(){
//$("#btn_open").click(
//  function () {
//  	$(this).fadeOut(300);
//    $('html,body').stop().animate({left: -320},300).addClass('body_fixed');    
//    $('.menu_body').animate({right: 0},300);
//    $('#my-page').addClass('my-page_obscure');
//  });
//$('.link,#btn_close,#my-page').click(
//	function() {
//	$('html,body').animate({left: 0},300).removeClass('body_fixed');    
//  $('.menu_body').animate({right: -320},300);
//  $('#btn_open').fadeIn(300);
//  $('#my-page').removeClass('my-page_obscure');
//});
//});
(function ($, window, document, undefined) {

    'use strict';

    var $topServiceSlider = $('.top_services_slid');
    var $parkSlider = $('.park_slid');
    var $parkInfo = $('.park_info');
    var $audioSlider = $('.audio_slid');
    var $audioInfo = $('.audio_info');
 		var $navSlider = $('.nav_slid');
    var $navInfo = $('.nav_info');
		var $nosoundSlider = $('.nosound_slid');
    var $nosoundInfo = $('.nosound_info');
		var $alarmSlider = $('.alarm_slid');
    var $alarmInfo = $('.alarm_info');

    var $myPage = $('#my-page');
    var $btnOpen = $('#btn_open');
    var $btnClose = $('#btn_close');
    var $linkClose = $('.link');
    var $menu = $('.menu_body');
    var $myBody = $('html,body');

    var openMenu = function(e) {
      $myPage.addClass('move_body my-page_obscure no_scroll'),
     // $myBody.addClass('no_scroll'),
      $menu.addClass('move_menu');
    };

    var closeMenu = function(e) {
      $myPage.removeClass('move_body my-page_obscure no_scroll'),
     // $myBody.removeClass(''),
      $menu.removeClass('move_menu');
    };
    var addEventListeners = function() {
        $btnOpen.on('click', openMenu);
        $btnClose.on('click', closeMenu);
        $linkClose.on('click', closeMenu);

    };   
        addEventListeners();


	var parkOpen = function(e) {
      $topServiceSlider.animate({left: -300},400),
	    $parkInfo.animate({left: 20},400);

    };

    var parkClose = function(e) {
        $topServiceSlider.animate({left: 0},400),
        $parkInfo.animate({left: 330},400);
    };

    var addEventListeners = function() {
        $parkSlider.on('click', parkOpen);
        $parkInfo.on('click', parkClose);
    };  
    addEventListeners();

	var audioOpen = function(e) {
      $topServiceSlider.animate({left: -300},400),
	    $audioInfo.animate({left: 20},400);

    };

    var audioClose = function(e) {
        $topServiceSlider.animate({left: 0},400),
        $audioInfo.animate({left: 330},400);
    };

    var addEventListeners = function() {
        $audioSlider.on('click', audioOpen);
        $audioInfo.on('click', audioClose);
    };    

    addEventListeners();

	var navOpen = function(e) {
      $topServiceSlider.animate({left: -300},400),
	    $navInfo.animate({left: 20},400);

    };

    var navClose = function(e) {
        $topServiceSlider.animate({left: 0},400),
        $navInfo.animate({left: 330},400);
    };

    var addEventListeners = function() {
        $navSlider.on('click', navOpen);
        $navInfo.on('click', navClose);
    };    

    addEventListeners();
	var nosoundOpen = function(e) {
      $topServiceSlider.animate({left: -300},400),
	    $nosoundInfo.animate({left: 20},400);

    };

    var nosoundClose = function(e) {
        $topServiceSlider.animate({left: 0},400),
        $nosoundInfo.animate({left: 330},400);
    };

    var addEventListeners = function() {
        $nosoundSlider.on('click', nosoundOpen);
        $nosoundInfo.on('click', nosoundClose);
    };    

    addEventListeners();
		var alarmOpen = function(e) {
      	$topServiceSlider.animate({left: -300},400),
	    	$alarmInfo.animate({left: 20},400);

    };

    var alarmClose = function(e) {
        $topServiceSlider.animate({left: 0},400),
        $alarmInfo.animate({left: 330},400);
    };

    var addEventListeners = function() {
        $alarmSlider.on('click', alarmOpen);
        $alarmInfo.on('click', alarmClose);
    };    

    addEventListeners();

})(jQuery, window, document);

$(window).on('load', function() {
	$('.preloader').delay(1000).fadeOut('slow');
});

















