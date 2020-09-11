function alertPopup(opened, msg, link) {
  var $obj = $('.popup-alert');
  if (opened) {
    var text = '';
    switch (msg) {
      case 'ready':
        text = '준비 중입니다.';
        break;
      case 'privacy':
        text = '본 이벤트는 개인정보 수집·이용 및 취급위탁에 대한 동의를 완료한 고객만<br />참여하실 수 있습니다.';
        break;
      case 'loginAfter':
        text = '0한동 로그인이 필요합니다.';
        break;
      case 'complete':
        text = '신청이 완료되었습니다';
        break;
      case 'noOpen':
        text = '오픈 준비 중입니다.';
        break;
      case 'noData':
        text = '신청 이력이 없습니다.';
        break;
      case '14up':
        text = '이 이벤트는<br />14세 이상인 고객님만 참여할 수 있습니다.<br />14세 미만일 경우 당첨이 취소될 수 있습니다.';
        break;
      case 'already':
        text = '이미 참여하셨습니다.';
        break;
      default:
        text = msg
    }
    $obj.find('.popup-alert__msg').html(text);
    $obj.addClass('opened');
  } else {
    $obj.removeClass('opened');
  }
  $obj.find('.button__close').off('click').on('click', function () {
    $obj.removeClass('opened');
  });
  $obj.find('.popup-alert__button button').off('click').on('click', function () {
    $obj.removeClass('opened');
    if (link) {
      location.href = link;
    }
  });
}

function popupOpen(target, num) {
  var $obj = $('.popup-' + target)
  if (target === 'goods') {
    var $item = $obj.find('.popup-goods__list li');
    var $selectItem = $item.filter('[data-goods="'+ num +'"]')
    $item.hide();
    $selectItem.show();
    if ($selectItem.attr('data-link')) {
      $obj.find('.button__type5').attr('href', $selectItem.attr('data-link'))
    }
  } else if (target === 'info') {
    $('.popup-info .owl-carousel').trigger('to.owl.carousel', 0).trigger('play.owl.autoplay', 4000)
  }
  $obj.addClass('opened')
}

function popupClose (obj) {
  if (obj.closest('.popup').hasClass('popup-info')) {
    $('.popup-info .owl-carousel').trigger('stop.owl.autoplay')
  }
  obj.closest('.popup').removeClass('opened')
}

function homeBanners () {
  var $obj = $('.home__banners');
  if ($obj.length === 0) return false;
  var owl = $obj.find('.owl-carousel');
  owl.owlCarousel({
    items: 1,
    loop: true,
    autoplay: false,
    autoplayTimeout: 3000,
  });
}

function infoQa () {
  var $obj = $('.info__qa');
  if ($obj.length === 0) return false;
  var owl = $obj.find('.owl-carousel');
  owl.owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
  });
}

function infoToon () {
  var $obj = $('.info__toon');
  if ($obj.length === 0) return false;
  var $nav = $('.info__toon-nav');
  var $owl = $obj.find('.owl-carousel');
  var current = parseInt($obj.attr('data-current')) - 1;
  $owl.owlCarousel({
    items: 1,
    loop: true,
    autoplay: false,
    autoplayTimeout: 3000,
    dots: false
  });
  var itemAction = function () {
    $owl.trigger('to.owl.carousel', 0)
    $('.info__toon-list').addClass('unActive').filter('[data-index="'+ (current + 1) +'"]').removeClass('unActive');
    $obj.find('.button__arrow').attr('href', $obj.find('.owl-item.active .item').attr('data-link'));
    $obj.find('.info__toon-title span em').text(parseInt(current) + 1)
    $nav.find('li').eq(current).addClass('active').siblings().removeClass('active');
  }
  itemAction();
  $nav.find('li').not('.disabled').off('click').on('click', function(e) {
    current = $(this).index();
    itemAction();
  });
}

function infoPopup () {
  var $obj = $('.popup-info');
  if ($obj.length === 0) return false;
  var $owl = $obj.find('.owl-carousel');
  $owl.owlCarousel({
    items: 1,
    loop: true,
    autoplay: false,
    autoplayTimeout: 3000,
    dots: true,
  });
}

function goodsTopSlide () {
  var $obj = $('.goods__top-slide');
  if ($obj.length === 0) return false;
  var owl = $obj.find('.owl-carousel');
  owl.owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
  });
  $('.top-slide-box.disabled a').off('click').on('click', function () {
    owl.trigger('stop.owl.autoplay')
    alertPopup(true, 'noOpen');
    return false;
  });
}

function eventToggle () {
  var $obj = $('.event__main-lists');
  var current = 0;
  $obj.find('li').each(function(i){
    if (i === 0) {
      $obj.append('<div class="dots"></div>')
    }
    $obj.find('.dots').append('<button type="button">'+ (i + 1) +'</button>');
    if ($(this).hasClass('end')) {
      $obj.find('.dots').find('button').eq(i).addClass('end');
    }
  });
  var action = function(num) {
    if (num) current = num;
    $obj.find('li').eq(num).addClass('active').siblings().removeClass('active');
    $obj.find('.dots button').eq(num).addClass('active').siblings().removeClass('active');
  }
  action(0);
  $obj.find('li, .dots button').off('click').on('click', function () {
    if ($(this).hasClass('end')) {
      alertPopup(true, '종료된 이벤트입니다.');
    } else {
      action($(this).index());
    }
  });
}

function inputChecked () {
  var $obj = $('.popup-form .popup-form__inputs');
  if ($obj.find('[data-alert="time"]').length === 1) {
    var $item = $obj.find('[data-alert="time"]')
    if ($item.find('select option:selected').val() == 0) {
      alertPopup(true, '희망 시간을 선택해주세요.');
      return false;
    }
  }
  if ($obj.find('[data-alert="goods"]').length === 1) {
    var $item = $obj.find('[data-alert="goods"]')
    if ($item.find('select option:selected').val() == 0) {
      alertPopup(true, '희망 굿즈를 선택해주세요.');
      return false;
    }
  }
  return true;
}
