const $main = $('.main');

$(document).ready(function () {
    gsap.registerPlugin(ScrollTrigger);

    smoothScroll("#scroll-container");

    // header
    (function () {
        const $header = $main.find('.app-header');

        $header
            .delay(400)
            .animate({
                top: 0,
            }, 500, 'easeOutCubic');
    })();

    // nhfinance parallax
    (function () {
        const $nhfinance = $main.find('.only-pc .nhfinance-real');
        const $fake = $main.find('.only-pc .nhfinance-fake');
        const $content = $main.find('.only-pc .nhfinance-content');

        gsap.to($main, {
            scrollTrigger: {
                trigger: $nhfinance,
                endTrigger: $fake,
                pin: false,
                onUpdate: function (self) {
                    const num = 10 - (self.progress * 20);
                    $nhfinance.find('img').css('transform', 'translateY(' + num * -1 * 0.5 + '%)');
                    $content.find('img').css('transform', 'translateY(' + num + '%)');
                },
                invalidateOnRefresh: true
            },
        });
    })();

    // location parallax
    (function () {
        const $location = $main.find('.only-pc .location');
        const $childImage = $location.find('> img');

        const $nav = $location.find('.location-nav');
        const $navBlock = $location.find('.location-nav .block');
        const $groupItems = $location.find('.location-group .item');

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
    })();

    // amenities parallax
    (function () {
        const $amenities = $main.find('.only-pc .amenities');
        const $childImage = $amenities.find('> img');

        const $content = $amenities.find('.amenities-content');
        const $groupItems = $amenities.find('.amenities-group .item');

        gsap.to($amenities, {
            scrollTrigger: {
                trigger: $childImage,
                endTrigger: $amenities,
                end: 'bottom bottom',
                pin: true,
                scrub: 0.2,
                onUpdate: function () {
                    $content.find('img').css('transform', $childImage.css('transform'));
                },
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
        gsap.to($main, {
            scrollTrigger: {
                trigger: $childImage,
                endTrigger: $groupItems,
                end: 'top top',
                pin: false,
                onUpdate: function (self) {
                    const num = 10 - self.progress * 10;
                    $content.css('transform', 'translateY(' + num + '%)');
                },
                invalidateOnRefresh: true
            },
        });
    })();

    // retails parallax
    (function () {
        const $retails = $main.find('.only-pc .retails');
        const $content = $retails.find('.retails-content');
        const $group = $retails.find('.retails-group');
        const $groupInner = $retails.find('.retails-group .inner');
        const $groupItems = $retails.find('.retails-group .item');

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
        gsap.to($main, {
            scrollTrigger: {
                trigger: $content,
                pin: false,
                start: 'top bottom',
                end: 'top top',
                endTrigger: $retails,
                scrub: 0.2,
                onUpdate: function (self) {
                    const num = 20 - self.progress * 20;
                    $content.css('transform', 'translateY(' + num + '%)');
                },
                invalidateOnRefresh: true
            },
        });
    })();

    // news parallax
    (function () {
        const $news = $main.find('.only-pc .news');
        const $content = $news.find('.news-content');
        const $group = $news.find('.news-group');
        const $groupInner = $news.find('.news-group .inner');
        const $groupItems = $news.find('.news-group .item');

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
        gsap.to($main, {
            scrollTrigger: {
                trigger: $content,
                pin: false,
                start: 'top bottom',
                end: 'top top',
                endTrigger: $news,
                scrub: 0.2,
                onUpdate: function (self) {
                    const num = 20 - self.progress * 20;
                    $content.css('transform', 'translateY(' + num + '%)');
                },
                invalidateOnRefresh: true
            },
        });
    })();

    // footer showing
    (function () {
        const $footer = $main.find('.only-pc .footer-real');
        const $fake = $main.find('.only-pc .footer-fake');

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
    })();

    // gnb open
    (function () {
        const $gnb = $main.find('.app-gnb');

        $main.find('.btn-gnb-open').on("click", function (event) {
            event.preventDefault();
            $gnb.addClass('show');
        });

        $main.find('.btn-gnb-close').on("click", function (event) {
            event.preventDefault();
            $gnb.removeClass('show');
        });
    })();

    // go top
    (function () {
        $main.find('.btn-top').on("click", function (event) {
            event.preventDefault();
            window.scrollTo(0, 0);
        });
    })();

    // inquiry popup open
    (function () {
        const $inquiry = $main.find(".only-pc .app-inquiry");

        $main.find(".only-pc .btn-inquiry-open").on("click", function (event) {
            event.preventDefault();
            $inquiry.addClass("show");
        });

        $inquiry.find('.btn-inquiry-close').on("click", function (event) {
            event.preventDefault();
            $inquiry.removeClass('show');
        });
    })();

    // floating
    (function () {
        const $floating = $main.find('.only-pc .app-floating');

        const $default = $floating.find('.image-default');
        const $menu = $floating.find('.image-menu');
        const $top = $floating.find('.image-top');

        let lastScrollTop = 0;

        $(window).scroll(function(){
           const st = $(this).scrollTop();

           if ($(window).scrollTop() < 50) {
               $default.show();
               $menu.hide();
               $top.hide();
           } else if (st > lastScrollTop){
                $default.hide();
                $menu.show();
                $top.hide();
           } else {
                $default.hide();
                $menu.hide();
                $top.show();
           }

           lastScrollTop = st;
        });
    })();

    // ui parallax
    (function () {
        const $parallax = $main.find('.ui-parallax');

        $parallax.each(function (index, el) {
            const $el = $(el);
            gsap.to($el, {
                scrollTrigger: {
                    trigger: $el,
                    start: 'top bottom',
                    end: 'bottom top',
                    onUpdate: function (self) {
                        const num = 6 - self.progress * 12;
                        $el.find('> img').css('transform', 'translateY(' + num + 'vw) scale(1.22)');
                    },
                    invalidateOnRefresh: true
                },
            });
        });
    })();

    // ui stagger
    (function () {
        const $stagger = $main.find('.ui-stagger');
        const $row = $stagger.find('.row');

        $row.each(function (index, el) {
            const $el = $(el);
            ScrollTrigger.batch($el.find("img"), {
                onEnter: elements => {
                    gsap.from(elements, {
                        autoAlpha: 0,
                        delay: index * 0.5,
                        duration: 1,
                        y: '100%',
                        rotate: '15deg',
                        stagger: 0.15,
                        onStart: function () {
                            if ($el.find('.box').length) {
                                gsap.to($el.find('.box'), {
                                    scaleX: 1,
                                    delay: 0.2,
                                    duration: 0.5,
                                });
                            }
                        },
                    });
                },
                once: true
            });
        });
    })();
});


function smoothScroll(content, viewport, smoothness) {
    content = gsap.utils.toArray(content)[0];
    smoothness = smoothness || 1;

    gsap.set(viewport || content.parentNode, {
        overflow: "hidden",
        position: "fixed",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    });
    gsap.set(content, {
        overflow: "visible",
        width: "100%"
    });

    let getProp = gsap.getProperty(content),
        setProp = gsap.quickSetter(content, "y", "px"),
        setScroll = ScrollTrigger.getScrollFunc(window),
        removeScroll = () => content.style.overflow = "visible",
        killScrub = trigger => {
            let scrub = trigger.getTween ? trigger.getTween() : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
            scrub && scrub.kill();
            trigger.animation.progress(trigger.progress);
        },
        height, isProxyScrolling;

    function refreshHeight() {
        height = content.clientHeight;
        content.style.overflow = "visible"
        document.body.style.height = height + "px";
        return height - document.documentElement.clientHeight;
    }

    ScrollTrigger.addEventListener("refresh", () => {
        removeScroll();
        requestAnimationFrame(removeScroll);
    })
    ScrollTrigger.defaults({
        scroller: content
    });
    ScrollTrigger.prototype.update = p => p; // works around an issue in ScrollTrigger 3.6.1 and earlier (fixed in 3.6.2, so this line could be deleted if you're using 3.6.2 or later)

    ScrollTrigger.scrollerProxy(content, {
        scrollTop(value) {
            if (arguments.length) {
                isProxyScrolling = true; // otherwise, if snapping was applied (or anything that attempted to SET the scroll proxy's scroll position), we'd set the scroll here which would then (on the next tick) update the content tween/ScrollTrigger which would try to smoothly animate to that new value, thus the scrub tween would impede the progress. So we use this flag to respond accordingly in the ScrollTrigger's onUpdate and effectively force the scrub to its end immediately.
                setProp(-value);
                setScroll(value);
                return;
            }
            return -getProp("y");
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
    });

    return ScrollTrigger.create({
        animation: gsap.fromTo(content, {
            y: 0
        }, {
            y: () => document.documentElement.clientHeight - height,
            ease: "none",
            onUpdate: ScrollTrigger.update
        }),
        scroller: window,
        invalidateOnRefresh: true,
        start: 0,
        end: refreshHeight,
        refreshPriority: -999,
        scrub: smoothness,
        onUpdate: self => {
            if (isProxyScrolling) {
                killScrub(self);
                isProxyScrolling = false;
            }
        },
        onRefresh: killScrub // when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub.
    });
}