$(function () {

  $('.header__btn').on('click', function () {
    $('.rightside-menu').removeClass('rightside-menu_close');
  });
  $('.rightside-menu__close').on('click', function () {
    $('.rightside-menu').addClass('rightside-menu_close');
  });

  $('.header__btn-menu').on('click', function () {
    console.log('ok');
    $('.menu').toggleClass('_open');
  });

  if ($(window).width() < 651) {
    $('._measurement').appendTo($('.works-path__items-box'));
  }


  $('.top__slider').slick({
    dots: true,
    arrows: false,
    fade: true,
    // autoplay: true,
    // autoplaySpeed: 2000,
  });
  if ($('.gallery__inner')) {
    const mixer = mixitup('.gallery__inner', {
      load: {
        filter: '.living'
      }
    });
  }


});
