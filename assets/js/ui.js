const $main = $('.main');

window.scrollTo(0, 0);

$(document).ready(function () {
    // header showing
    // hamburger click => gnb open
    $(function () {
        const $header = $main.find('.app-header');
        const $gnb = $main.find('.app-gnb');

        $header
            .delay(400)
            .animate({
                top: 0,
            }, 500, 'easeOutCubic');

        $header.find('.btn-open').on("click", function (event) {
            event.preventDefault();
            $gnb.addClass('show');
        });

        $gnb.find('.btn-close').on("click", function (event) {
            event.preventDefault();
            $gnb.removeClass('show');
        });
    });

    // location parallax
    $(function () {
        const $location = $main.find('.only-pc .location');
        const $childImage = $location.find('> img');

        const $nav = $location.find('.location-nav');
        const $navBlock = $location.find('.location-nav .block');
        const $groupItems = $location.find('.location-group .item');

        gsap.registerPlugin(ScrollTrigger);

        gsap.to($location, {
            scrollTrigger: {
                trigger: $childImage,
                start: 'center center-=7%',
                endTrigger: $location,
                end: 'bottom bottom',
                pin: true,
                scrub: 0.2,
                invalidateOnRefresh: true
            },
        });
        gsap.to($location, {
            scrollTrigger: {
                trigger: $nav,
                start: 'center center-=7%',
                endTrigger: $location,
                end: 'bottom bottom',
                pin: true,
                scrub: 0.2,
                onUpdate: function () {
                    let activeIdx = -1;
                    const center = window.innerHeight / 2;
                    for (let idx = 0; idx < $groupItems.length; idx++) {
                        const elRect = $groupItems[idx].getBoundingClientRect();
                        if (center > elRect.top + elRect.height) {
                            activeIdx = idx;
                        }
                    }
                    $navBlock
                        .eq(activeIdx + 1)
                        .addClass('active')
                        .siblings()
                        .removeClass('active');
                },
                invalidateOnRefresh: true
            },
        });
    });

    // amenities parallax
    $(function () {
        const $amenities = $main.find('.only-pc .amenities');
        const $childImage = $amenities.find('> img');

        const $groupItems = $amenities.find('.amenities-group .item');

        gsap.registerPlugin(ScrollTrigger);

        gsap.to($amenities, {
            scrollTrigger: {
                trigger: $childImage,
                endTrigger: $amenities,
                end: 'bottom bottom',
                pin: true,
                scrub: 0.2,
                invalidateOnRefresh: true
            },
        });
        gsap.to($main, {
            scrollTrigger: {
                trigger: $childImage,
                endTrigger: $groupItems,
                pin: false,
                onUpdate: function (self) {
                    const num = 20 - (self.progress * 50);
                    $groupItems.last().css('transform', 'translateY(' + num + '%)');
                },
                invalidateOnRefresh: true
            },
        });
    });

    // retails parallax
    $(function () {
        const $retails = $main.find('.only-pc .retails');
        const $group = $retails.find('.retails-group');
        const $groupInner = $retails.find('.retails-group .inner');
        const $groupItems = $retails.find('.retails-group .item');

        gsap.registerPlugin(ScrollTrigger);

        let maxWidth = 0;

        const getMaxWidth = function () {
            maxWidth = 0;
            maxWidth += 1 * $retails.find('.inner').css('padding-left').replace(/[^-\d\.]/g, '');
            maxWidth += 1 * $retails.find('.inner').css('padding-right').replace(/[^-\d\.]/g, '');
            $groupItems.each(function (index, el) {
                maxWidth += $(el).outerWidth();
            });
        };

        getMaxWidth();

        ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

        gsap.to($main, {
            scrollTrigger: {
                trigger: $group,
                pin: false,
                start: 'top bottom',
                end: 'bottom top',
                endTrigger: $retails,
                scrub: 0.2,
                onUpdate: function (self) {
                    const num = -1 * maxWidth * self.progress;
                    $groupInner.css('transform', 'translateX(' + num + 'px)');
                },
                invalidateOnRefresh: true
            },
        });
    });

    // news parallax
    $(function () {
        const $news = $main.find('.only-pc .news');
        const $group = $news.find('.news-group');
        const $groupInner = $news.find('.news-group .inner');
        const $groupItems = $news.find('.news-group .item');

        gsap.registerPlugin(ScrollTrigger);

        let maxWidth = 0;

        const getMaxWidth = function () {
            maxWidth = 0;
            maxWidth += 1 * $news.find('.inner').css('padding-left').replace(/[^-\d\.]/g, '');
            maxWidth += 1 * $news.find('.inner').css('padding-right').replace(/[^-\d\.]/g, '');
            $groupItems.each(function (index, el) {
                maxWidth += $(el).outerWidth();
            });
        };

        getMaxWidth();

        ScrollTrigger.addEventListener("refreshInit", getMaxWidth);

        gsap.to($main, {
            scrollTrigger: {
                trigger: $group,
                pin: false,
                start: 'top bottom',
                end: 'bottom top',
                endTrigger: $news,
                scrub: 0.2,
                onUpdate: function (self) {
                    const num = -1 * maxWidth * self.progress;
                    $groupInner.css('transform', 'translateX(' + num + 'px)');
                },
                invalidateOnRefresh: true
            },
        });
    });

    // footer showing
    $(function () {
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
                    const num = 60 - (self.progress * 60);
                    $footer.find('img').css('transform', 'translateY(' + num + '%)');
                },
                invalidateOnRefresh: true,
            },
        });
    });

    // inquiry popup
    $(function () {
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
    $(function () {
        const $floating = $main.find('.only-pc .app-floating');
        const $default = $floating.find('.image-default');
        const $active = $floating.find('.image-active');

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
                    if (window.scrollY === 0) {
                        $active.hide();
                        $default.show();
                    } else if (!self.isActive) {
                        $active.show();
                        $default.hide();
                    } else {
                        $active.hide();
                        $default.show();
                    }
                },
                invalidateOnRefresh: true
            },
        });
    });
});