
(function ($)
{ "use strict"

/* 1. Preloder (готовый код, можно использовать в любом проекте) */
  $(window).on('load', function () {
    $('#preloader-active').delay(450).fadeOut('slow');
    $('body').delay(450).css({
      'overflow': 'visible'
    });
  });
}) 
  (jQuery);

// фиксация меню
$(function($) {
  $(window).scroll(function(){
      if($(this).scrollTop()>100){
          $('.header').addClass('fixed');
      }
      else if ($(this).scrollTop()<100){
          $('.header').removeClass('fixed');
      }
  });
});

// активный пункт меню
$(function () {  
  $('.header-nav__item-link').each(function () { 
      var location = window.location.href; 
      var link = this.href;  
      if(location == link) { 
          $(this).addClass('active');
      }
  });
  $('.footer-wrap-nav__item-link').each(function () { 
    var location = window.location.href; 
    var link = this.href;  
    if(location == link) { 
        $(this).addClass('active');
    }
});
});
//слайдер верхний
$(document).ready(function(){
	$('.slider-offer').slick({
		arrows:false,
    dots: true,
    fade:true,
		slidesToShow:1,
		autoplay:true,
		speed:1000,
    autoplaySpeed: 800,
    asNavFor:".slider-img"
  });
  $('.slider-img').slick({
		arrows:false,
    dots: false,
    fade:false,
		slidesToShow:1,
		speed:1000,
    autoplaySpeed: 800,
    asNavFor:".slider-offer"
	});
});
// плавный переход по якорной ссылке
$(document).ready(function(){
  $(".slider-offer__item-arrow").on("click", function (event) {
  event.preventDefault();
  var id = $(this).attr('href'),
  top = $(id).offset().top;
  $('body,html').animate({scrollTop: top}, 1500);
  });
});
//слайдер нижний
$(document).ready(function(){
	$('.about-wrap__slider').slick({
		arrows:true,
    dots: true,
    infinite:false,
		slidesToShow:1,
		autoplay:false,
		speed:1000,
    autoplaySpeed: 800,
    responsive:[
			{
				breakpoint: 1150,
				settings: {
					arrows:false,
				}
      },
      {
				breakpoint: 500,
				settings: {
          dots: false,
          arrows: false,
          autoplay:true,
				}
			},
		]
  });
});
//гамбургер

$('.meny__btn').on('click', function () {
  $('.header-nav__items').toggleClass('active');
  $('.meny__btn').toggleClass('active');
  $('body').toggleClass('scroll-lock');
});

// табы
$('.tabs-shop').addClass('active');

$('.tabs-items__item-link').click(function() {
  var id = $(this).attr('data-category'),
      content = $('.tabs-shop[data-category="'+ id +'"]');
  
  $('.tabs-items__item-link').removeClass('active');
  $(this).addClass('active');
  
  $('.tabs-shop').removeClass('active');
  content.addClass('active');
});
$('.all').on('click', function (event) {
  event.preventDefault();

  $('.all').removeClass('active');
  $(this).addClass('active');

  $('.tabs-shop').removeClass('active');
  $('.tabs-shop').addClass('active'); 
});

// модальное окно
$('.header-nav__btn').on('click', function() {
  $('.overlay').toggleClass('active');
  $('.wrapper-modal').toggleClass('active');
  $('body').addClass('modal-lock');
});
$('.overlay').on('click', function() {
  $('.wrapper-modal').removeClass('active');
  $('.overlay').removeClass('active');
  $('body').removeClass('modal-lock');
});
$('.close__btn').on('click', function() {
  $('.wrapper-modal').removeClass('active');
  $('.overlay').removeClass('active');
  $('body').removeClass('modal-lock');
});
//валидация

$.validator.addMethod("regex", function(value, element, regexp) {
  var regExsp = new RegExp(regexp);
  return regExsp.test(value);
},"Please check your input."
);

$(document).ready(function () {
  $('[data-submit]').on('click', function (e) {
    e.preventDefault();
    $(this).parent('form').submit();
  })
  $.validator.addMethod("regex", function (value, element, regexp) {
    var regExsp = new RegExp(regexp);
    return this.optional(element) || regExsp.test(value);
  }, "Please check your input."
  );
function valEl(el) {
  el.validate({
    rules: {
      tel: {
        required: true,
        regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
      },
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      tel: {
        required: 'Поле обязательное для заполнения',
        regex: 'Телефон может содержать символы + - ()'
      },
      name: {
        required: 'Поле обязательное для заполнения',
      },
      email: {
        required: 'Поле обязательное для заполнения',
        email: 'Неверный формат E-mail'
      }
    },
    submitHandler: function (form) {
      $('#preloader-active').fadeIn();
      var $form = $(form);
      var $formId = $(form).attr('id');
      switch ($formId) {
        case 'form-cover':
          $.ajax({
            type: 'POST',
            url: $form.attr('action'),
            data: $form.serialize()
          })
            .always(function () {
              console.log('Always');
              setTimeout(function () {
                $form.trigger('reset');
                $('#preloader-active').fadeIn();
              }, 1100);
              setTimeout(function () {
                $('#preloader-active').fadeOut();
              }, 1300)
            });
          break;
        case 'form-modal':
          $.ajax({
            type: 'POST',
            url: $form.attr('action'),
            data: $form.serialize()
          })
            .always(function () {
              console.log('Always');
              setTimeout(function () {
                $('#massage-for-user').fadeIn();
                $form.trigger('reset');
                $('#preloader-active').fadeIn();
              }, 1100);
              setTimeout(function () {
                $('#preloader-active').fadeOut();
                $('.wrapper-modal').fadeOut();
                $('.close__btn1').on('click', function() {
                  $('#massage-for-user').fadeOut();
                });
              }, 1300)
            });
          break;
      }
      return false;
    }
  });
  }
$('.js-form').each(function () {
  valEl($(this));
});
});

