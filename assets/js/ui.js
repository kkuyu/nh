$(function(){
  const $header = $('.main .app-header');
  const $gnb = $('.main .app-gnb');

  if (!$header || !$gnb) {
    return;
  }

  $header.find('.btn-open').on("click", function (event) {
    event.preventDefault();
    $gnb.addClass('show');
  });

  $gnb.find('.btn-close').on("click", function (event) {
    event.preventDefault();
    $gnb.removeClass('show');
  });
});

$(function(){
  const $retails = $('.main .only-pc .retails');

  if (!$retails) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const sections = gsap.utils.toArray($retails.find('.item'));
  let maxWidth = 0;

  const getMaxWidth = function () {
    maxWidth = 0;
    maxWidth += 1 *  $retails.find('.inner').css('padding-left').replace(/[^-\d\.]/g, '');
    maxWidth += 1 *  $retails.find('.inner').css('padding-right').replace(/[^-\d\.]/g, '');
    sections.forEach(function (section) {
      maxWidth += $(section).outerWidth();
    });
  };
  getMaxWidth();

  ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

  gsap.to(sections, {
    x: function () {
      return '-' + (maxWidth - $(window).width());
    },
    ease: "none",
    scrollTrigger: {
      trigger: $retails,
      pin: true,
      scrub: 0.2,
      end: function () {
        return '+=' + maxWidth;
      },
      invalidateOnRefresh: true
    },
  });
});

$(function(){
  const $news = $('.main .only-pc .news');

  if (!$news) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const sections = gsap.utils.toArray($news.find('.item'));
  let maxWidth = 0;

  const getMaxWidth = function () {
    maxWidth = 0;
    maxWidth += 1 *  $news.find('.inner').css('padding-left').replace(/[^-\d\.]/g, '');
    maxWidth += 1 *  $news.find('.inner').css('padding-right').replace(/[^-\d\.]/g, '');
    sections.forEach(function (section) {
      maxWidth += $(section).outerWidth();
    });
  };
  getMaxWidth();

  ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

  gsap.to(sections, {
    x: function () {
      return '-' + (maxWidth - $(window).width());
    },
    ease: "none",
    scrollTrigger: {
      trigger: $news,
      pin: true,
      scrub: 0.2,
      end: function () {
        return '+=' + maxWidth;
      },
      invalidateOnRefresh: true
    },
  });
});

$(function(){
  const $button = $(".main .only-pc .btn-inquiry");
  const $inquiry = $(".main .only-pc .inquiry");

  if (!$inquiry) {
    return;
  }

  $button.on("click", function (event) {
    event.preventDefault();
    $inquiry.addClass("show");
  });

  $inquiry.find('.btn-close').on("click", function (event) {
    event.preventDefault();
    $inquiry.removeClass('show');
  });
});
