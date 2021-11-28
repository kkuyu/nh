const $main = $('.main');

// header showing
// hamburger click => gnb open
$(function(){
  const $header = $main.find('.app-header');
  const $gnb = $main.find('.app-gnb');

  $(document).ready(function () {
    $header
      .delay(400)
      .animate({
        top: 0,
      }, 500, 'easeOutCubic');
  });

  $header.find('.btn-open').on("click", function (event) {
    event.preventDefault();
    $gnb.addClass('show');
  });

  $gnb.find('.btn-close').on("click", function (event) {
    event.preventDefault();
    $gnb.removeClass('show');
  });
});

// retails parallax
$(function(){
  const $retails = $main.find('.only-pc .retails');

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

// news parallax
$(function(){
  const $news = $main.find('.only-pc .news');

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

// footer showing
$(function(){
  const $footer = $main.find('.only-pc .app-footer');
  const $fake = $main.find('.only-pc .fake-footer');

  gsap.to($fake, {
    scrollTrigger: {
      trigger: $fake,
      pin: false,
      end: 'bottom top+=100%',
      onUpdate: function (self) {
        if (self.progress > 0) {
          $footer.css('opacity', 1);
        } else {
          $footer.css('opacity', 0);
        }
        const num = 50 - (self.progress * 50);
        $footer.find('img').css('transform', 'translateY(' + num + '%)');
      },
      invalidateOnRefresh: true,
    },
  });
});

// open inquiry popup
$(function(){
  const $button = $main.find(".only-pc .btn-inquiry");
  const $inquiry = $main.find(".only-pc .app-inquiry");

  $button.on("click", function (event) {
    event.preventDefault();
    $inquiry.addClass("show");
  });

  $inquiry.find('.btn-close').on("click", function (event) {
    event.preventDefault();
    $inquiry.removeClass('show');
  });
});

// floating
$(function(){
  const $floating = $main.find('.only-pc .app-floating');
  const $default = $floating.find('.image-default');
  const $active = $floating.find('.image-active');

  console.log($default, $active)

  gsap.registerPlugin(ScrollTrigger);

  gsap.to($main, {
    scrollTrigger: {
      trigger: $main,
      start: function () {
        return 0;
      },
      end: function () {
        return $main.find('.hero').height();
      },
      onToggle: function (self) {
        console.log('toggle')
        if (window.scrollY === 0) {
          console.log('111')
          $active.hide();
          $default.show();
        } else if (!self.isActive) {
          console.log('222')
          $active.show();
          $default.hide();
        } else {
          console.log('333')
          $active.hide();
          $default.show();
        }
      },
      invalidateOnRefresh: true
    },
  });
});
