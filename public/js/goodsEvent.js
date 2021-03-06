function alertPopup(opened, msg, link) {
  var $obj = $('.popup-alert');
  if (opened) {
    var text = '';
    switch (msg) {
      case 'ready':
        text = '<span><em>준비 중</em></span>입니다.';
        break;
      case 'privacy':
        text = '개인정보 수집·이용 및<br />' +
            '취급위탁에 대한 <span><em>동의 완료</em></span>한<br />' +
            '고객만 참여하실 수 있습니다';
        break;
      case 'loginAfter':
        text = '<span><em>0한동 로그인</em></span>이<br />' +
            '필요합니다.';
        break;
      case 'complete':
        text = '<span><em>신청이 완료</em></span>되었습니다';
        break;
      case 'noOpen':
        text = '<span><em>오픈 준비 중</em></span>입니다.';
        break;
      case 'noData':
        text = '신청 이력이 없습니다.';
        break;
      case '14up':
        text = '<span><em>14세 이상</em></span> 고객님만<br /> 참여할 수 있습니다.';
        break;
      case 'already':
        text = '이미 참여하셨습니다.';
        break;
      case 'goods':
        text = '한정판 굿즈는<br /><span><em>순차 공개 </em></span> 됩니다.';
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
    var $item = $obj.find('[data-goods]');
    var $selectItem = $item.filter('[data-goods="'+ num +'"]')
    $obj.find('.popup__contents').scrollTop(0);
    $item.hide();
    $selectItem.show();
  } else if (target === 'info' || target === 'benefit' || target === 'how-apply') {
    $obj.find('.owl-carousel').trigger('play.owl.autoplay')
  }
  $obj.addClass('opened')
}

function popupClose (obj) {
  var $parent = obj.closest('.popup')
  if ($parent.hasClass('popup-info') || $parent.hasClass('popup-benefit') || $parent.hasClass('popup-how-apply')) {
    $parent.find('.owl-carousel').trigger('stop.owl.autoplay').trigger('to.owl.carousel', 0)
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

function homeDDays () {
  var $obj = $('.home__timer');
  if ($obj.length === 0) {return false;}
  var today = moment();
  var endDate = moment($obj.find('em').attr('data-endDate'));
  var diff = endDate.diff(today, 'days') + 1;
  $obj.find('em').text('D-' + numPad(diff < 0 ? 0 : diff , 3))
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
    loop: false,
    autoplay: false,
    autoplayTimeout: 3000,
    dots: false
  });
  $owl.on('changed.owl.carousel', function(event) {
    if (event.item.index + 1 === event.item.count) {
      $owl.parents('.info__toon-list').addClass('last');
    } else {
      $owl.parents('.info__toon-list').removeClass('last');
    }
  })
  var itemAction = function () {
    $('.info__toon-list').addClass('unActive').filter('[data-index="'+ (current + 1) +'"]').removeClass('unActive');
    $obj.find('.button__arrow').attr('href', $obj.find('.owl-item.active .item').attr('data-link'));
    $nav.find('li').eq(current).addClass('active').siblings().removeClass('active');
  }
  itemAction();
  $nav.find('li').off('click').on('click', function(e) {
    if (!$(this).hasClass('disabled')) {
      current = $(this).index();
      itemAction();
    }
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
    autoplay: false,
    autoplayTimeout: 3000,
  });
  $obj.find('.item .button__plus').off('click').on('click', function () {
    owl.trigger('stop.owl.autoplay');
    if ($(this).closest('.item').hasClass('disabled')) {
      alertPopup(true, 'goods');
    } else {
      popupOpen('goods', $(this).attr('data-index'))
    }
    return false;
  });
}

function numPad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function fontResize(){
  var resolution=750, font=24;
  var width = $('html').outerWidth(true, true);
  var fontSize = font * (width/resolution);
  $('html').css('font-size', fontSize > font ? font : fontSize);
}

fontResize();
$(window).resize(fontResize);

function dateCheck () {
  var $obj = $('[data-startDate]');
  $obj.each(function () {
    var $this = $(this)
    var date = $(this).attr('data-startDate')
    var today = moment()
    var startDay = moment(date)
    if ($this.hasClass('disabled')) {
      if (today > startDay) {
        $this.removeClass('disabled');
      }
    }
    if ($this[0].tagName === 'A') {
      $this.off('click').on('click', function () {
        if (today < startDay) {
          if ($this.attr('data-alert') === 'day') {
            alertPopup(true, '<span><em>'+ startDay.format('DD') +'일</em></span> 오픈');
          } else {
            alertPopup(true, 'ready');
          }
          return false;
        }
      });
    }
  });
}

function hashTagCopy () {
  const copyTarget = document.createElement('textarea')
  document.body.appendChild(copyTarget)
  copyTarget.value = $('.event-step__hash').html().replace(/<br ?\/?>/g, '')
  copyTarget.select()
  copyTarget.setSelectionRange(0, 9999)
  document.execCommand('copy')
  document.body.removeChild(copyTarget)
  alert('해시태그를 복사했습니다.')
}

function eventSlide () {
  var $obj = $('.event-step__slide');
  if ($obj.length > 0) {
    var $owl = $obj.find('.owl-carousel');
    var change = function () {
      var src = $obj.find('.owl-stage .active img').attr('src')
      $obj.parent().find('.button__black-line').attr('href', src)
    }
    $owl.on('initialized.owl.carousel', change)
    $owl.owlCarousel({
      items: 1,
      loop: true,
      autoplay: false,
      autoplayTimeout: 3000,
      nav: true,
    });
    $owl.on('translated.owl.carousel', change);
  }

  var $popupWay = $('.popup-how-apply');
  if ($popupWay.length > 0) {
    var $owl = $popupWay.find('.owl-carousel');
    $owl.owlCarousel({
      items: 1,
      loop: true,
      autoplay: false,
      autoplayTimeout: 3000,
      dots: true,
      nav: false
    });
  }

  var $popupBenefit = $('.popup-benefit');
  if ($popupBenefit.length > 0) {
    var $owl = $popupBenefit.find('.owl-carousel');
    $owl.owlCarousel({
      items: 1,
      loop: true,
      autoplay: false,
      autoplayTimeout: 3000,
      dots: true,
      nav: false
    });
  }
}

function mobileCheck() {
  var os;

  var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));

  if (mobile) {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.search("android") > -1) {
      return os = "android";
    } else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1) || (userAgent.search("ipad") > -1)) {
      return os = "ios";
    } else {
      return os = "otehr";
    }

  } else {
    return os = "pc";
  }
}

function actionInstagram(android_url, ios_url, ios_appstore_url) {
  var check = mobileCheck();
  if (check !== "pc") {
    if (check === "ios") {
      setTimeout(function () {
        window.open(ios_appstore_url);
      }, 1500);
      location.href = ios_url;
    } else {
      location.href = android_url;
    }
  }
}
