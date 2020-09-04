function alertPopup(opened, msg, link) {
  var $obj = $('.popup-alert');
  if (opened) {
    var text = '';
    switch (msg) {
      case 'ready':
        text = '준비 중입니다.'
        break;
      case 'privacy':
        text = '본 이벤트는 개인정보 수집·이용 및 취급위탁에 대한 동의를 완료한 고객만<br />참여하실 수 있습니다.'
        break;
      case 'loginAfter':
        text = '0한동 로그인 후<br />이벤트에 참여해주세요!'
        break;
      case 'complete':
        text = '이미 이벤트 참여를 완료하셨습니다.<br />당첨자 발표를 기다려주세요.'
        break;
      case 'end':
        text = '캠핑인더시티<br />이벤트 참여기간이 종료되었습니다.'
        break;
      case 'noOpen':
        text = '오픈 준비 중입니다.'
        break;
      case 'noData':
        text = '신청 정보가 없습니다.'
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
  }
  $obj.addClass('opened')
}

function popupClose (obj) {
  obj.closest('.popup').removeClass('opened')
}

function homeTopSlide () {
  var $obj = $('.home__top-slide');
  if ($obj.length === 0) return false;
  $obj.find('.slick-lists').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false
  });
}

function homeBannersType1 () {
  var $obj = $('.home__banners-type1');
  if ($obj.length === 0) return false;
  $obj.find('.slick-lists').slick({
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 3000
  });
}

function goodsTopSlide () {
  var $obj = $('.goods__top-slide');
  if ($obj.length === 0) return false;
  var owl = $obj.find('.owl-carousel');
  owl.owlCarousel({
    items: 1,
    loop: false,
    autoplay: false,
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
