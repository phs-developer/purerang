$(function () {
    const lenis = new Lenis({
        duration: 1,
    });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ----- 동적 값 생성 -----
    $(".sc-business .inner2 .brand").each(function (idx) {
        const html = $(this).children().first().prop("outerHTML");
        $(this).append(html);
    });

    for (i = 0; i <= 8; i++) {
        $(".sc-partners .l-line").append('<span class="name">JW중외제약</span>');
    }

    $(".sc-retail .brand").each(function (idx) {
        const html = $(this).children().first().prop("outerHTML");
        $(this).append(html);
    });

    // ------ scroll 이벤트 ------
    let lastScroll = 0;
    $(window).scroll(function () {
        const curr = $(this).scrollTop();

        if ($("body").hasClass("sm")) {
            curr > lastScroll ? $("#header").addClass("hide") : $("#header").removeClass("hide");
        } else {
            $("#header").removeClass("hide");
        }

        lastScroll = curr;
    });

    // ------- 이외 이벤트 ---------
    $(".sc-video .btn-play").click(function () {
        $(".sc-video .inner video").get(0).play();
        gsap.set(this, {
            autoAlpha: 0,
        });
    });

    // ------ scrollTrigger ------

    ScrollTrigger.create({
        trigger: "#container",
        start: "0% 0%",
        end: "100% 100%",
        scrub: 10,
    });

    // sc-intro + sc-video
    const layoutKor = $(".sc-intro .layout2 .cont2 .ko");
    const layoutEng = $(".sc-intro .layout2 .cont2 .en .before");
    const mainStickyTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".main-sticky-wrap",
            start: "0% 0%",
            end: "100% 100%",
            scrub: 2,
            invalidateOnRefresh: true,
        },
    });

    mainStickyTl
        .to(".sc-intro .layout1 .word span", {
            y: function () {
                return window.innerHeight * -1;
            },
            yPercent: -30,
        })
        .to(".sc-intro .layout1", { height: "0vh" })
        .to(".sc-intro .layout2 .cont1", {
            opacity: 0,
            onStart: function () {
                $("body").addClass("dark");
            },
            onReverseComplete: function () {
                $("body").removeClass("dark");
            },
        })
        .to(layoutKor, 2, { xPercent: -100, x: "0vw" })
        .set(layoutKor, { x: "50%", left: "50%", opacity: 0 })
        .to(layoutKor, { scale: 0.125, opacity: 1 })
        .to(layoutKor, { top: "67%" })
        .to(layoutEng[0], 1, {
            text: {
                value: "CREATE WITH A",
                newClass: "after",
            },
            onComplete: function () {
                gsap.set(".layout2 .after", {
                    "--opacity": 0,
                });
            },
        })
        .to(layoutEng[1], 1, {
            text: {
                value: "PHARMACEUTICAL Co.",
                newClass: "after",
            },
            onComplete: function () {
                gsap.set(".layout2 .after", {
                    "--opacity": 0,
                });
            },
        })
        .to({}, 1, {})
        .to(".sc-intro", { height: "0" })
        .to(".sc-video .film", 2, {
            backgroundPosition: "100%",
            onStart: function () {
                $("body").addClass("sm");
            },
            onReverseComplete: function () {
                $("body").removeClass("sm");
            },
        });

    // sc-business
    const businessCircle = $(".sc-business .sticky-cont > .circle");
    const businessCir = $(".sc-business .sticky-cont > .circle div");
    const businessTl = gsap.timeline({
        scrollTrigger: {
            trigger: " .sticky-inner",
            start: "-5% 0%",
            end: "100% 100%",
            scrub: 1,
        },
    });

    businessTl
        .to(businessCir[0], 0.3, { scale: 0.87 }, "a")
        .to(businessCir[1], 0.3, { scale: 0.9 }, "a")
        .to(businessCir[2], { scale: 1 }, "a")
        .to(businessCir[1], 0.5, { scale: 1 }, "b")
        .to(businessCir[0], 0.7, { scale: 1 }, "b")
        .to(businessCircle, { top: "50%" })
        .to(businessCircle, { top: "calc(37.6332622601% + 27.5px)", left: "50%", width: "55px", height: "55px" })
        .from(businessCircle, 0.5, { "--bar-width": "0%" }, ">-=10%")
        .to(businessCircle, 0.5, { xPercent: 0, left: "9.6354166667vw", x: 0, width: "55px", height: "55px" }, ">-=90%")
        .to(businessCircle, 0.3, {
            "--bar-width": "0%",
        });

    let lastIndex = -1;
    let startCount = { var: 0 };
    const endCount = [10, 100, 200];
    const businessContent = $(".sticky-wrap2 .sticky-cont > div");

    gsap.timeline({
        scrollTrigger: {
            trigger: " .sticky-wrap2",
            start: "0% 0%",
            end: "100% 0%",
            scrub: 2,
            onLeaveBack: function () {
                businessContent.removeClass("on");
                lastIndex = -1;
            },
            onUpdate: function (self) {
                idx = Math.floor(self.progress * businessContent.length);

                // contents 등장 및 숫자 카운트
                if (idx !== lastIndex) {
                    businessContent.removeClass("on");
                    businessContent.eq(idx).addClass("on");

                    gsap.to(startCount, {
                        var: endCount[idx],
                        duration: 1,
                        ease: "none",
                        onComplete: function () {
                            return (startCount.var = 0);
                        },
                        onUpdate: function () {
                            return $(".sc-business .number span").eq(idx).html(Math.floor(startCount.var));
                        },
                        scrollTrigger: {
                            trigger: ".sc-business .number",
                        },
                    });

                    startCount.var = 0;
                    lastIndex = idx;
                }
            },
        },
    });

    // sc-about

    gsap.from($(".sc-about .group-title").children(), {
        opacity: 0,
        yPercent: 100,
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".sc-about",
            start: "0% 100%",
        },
    });

    const aboutTrigger1 = gsap.to(".sc-about .proc-list", {
        xPercent: -100,
        x: function () {
            return $(".sc-about .proc-item").innerWidth() * 2;
        },
        ease: "none",
        scrollTrigger: {
            trigger: ".sc-about",
            start: "0% 0%",
            end: "100% 100%",
            scrub: 2,
            invalidateOnRefresh: true,
        },
    });
    gsap.from(".sc-about .bg-text", {
        xPercent: 64,
        ease: "none",
        scrollTrigger: {
            trigger: ".sc-about",
            start: "0% 0%",
            end: "100% 100%",
            scrub: 2,
            invalidateOnRefresh: true,
        },
    });

    const aboutText = $(".sc-about .text");
    aboutText.each(function (idx) {
        gsap.to(aboutText[idx], {
            ease: "none",
            scrollTrigger: {
                trigger: $(".sc-about .proc-item")[idx],
                start: "0% 50%",
                containerAnimation: aboutTrigger1,
                onEnter: function () {
                    aboutText.removeClass("on");
                    aboutText.eq(idx).addClass("on");
                },
                onLeaveBack: function () {
                    aboutText.removeClass("on");
                    aboutText.eq(idx - 1).addClass("on");
                },
            },
        });
    });

    // sc-partners .inner1
    ScrollTrigger.create({
        trigger: ".sc-partners",
        start: "0% 0%",
        onEnter: function () {
            $(".sc-partners .inner1").addClass("on");
        },
        onLeaveBack: function () {
            $(".sc-partners .inner1").removeClass("on");
        },
    });

    // sc-partners .inner2
    const partList = document.querySelectorAll(".sc-partners .inner2 .part-list");
    const partItem = $(".sc-partners .inner2 .part-item");
    const partItemTitle = document.querySelectorAll(".sc-partners .inner2 .logo");

    function lineCreate(idx) {
        const brand = partItem.eq(idx).data("name");
        let bgc = "";
        switch (idx) {
            case 0:
                bgc = "rgb(9, 100, 230)";
                break;
            case 1:
                bgc = "rgb(230, 9, 9)";
                break;
            case 2:
                bgc = "rgb(235, 135, 0)";
                break;
            case 3:
                bgc = "rgb(230, 9, 9)";
                break;
            case 4:
                bgc = "rgb(32, 113, 0)";
                break;

            default:
                break;
        }
        $(".sc-partners .l-line .name").text(brand);
        $(".sc-partners .l-line").css("background", bgc);
    }

    a = gsap.to(partList, {
        xPercent: -100,
        x: function () {
            return window.innerWidth - (partItem.eq(0).innerWidth() - partItem.eq(0).width());
        },
        ease: "none",
        scrollTrigger: {
            trigger: ".sc-partners .inner2",
            start: "0% 0%",
            end: "100% 100%",
            scrub: 1,
            invalidateOnRefresh: true,
            toggleClass: {
                targets: ".sc-partners .inner2 .l-line",
                className: "active",
            },
        },
    });
    $(window).on("load", function () {
        partItem.each(function (idx) {
            gsap.to(partItemTitle[idx], {
                x: function () {
                    // trnasX = parItem의 width - partItemTitle의 width - partItem의 left 패딩값
                    const partItemPadding = partItem.eq(0).innerWidth() - partItem.eq(0).width();
                    const transX = partItem[idx].clientWidth - partItemTitle[idx].clientWidth - partItemPadding;
                    return transX;
                },
                ease: "none",
                scrollTrigger: {
                    trigger: partItem[idx],
                    start: function () {
                        const lineHeight = $(".sc-partners .l-line").innerHeight();
                        return `0% ${lineHeight}px`;
                    },
                    end: function () {
                        // scroller-end 위치 = partItemTitle의 width와 partItem의 left 패딩값 + l-line의 heihgt
                        const lineHeight = $(".sc-partners .l-line").innerHeight();
                        return `100% ${
                            partItemTitle[idx].clientWidth +
                            partItem.eq(0).innerWidth() -
                            partItem.eq(0).width() +
                            lineHeight
                        }px`;
                    },
                    scrub: 0,
                    invalidateOnRefresh: true,
                    containerAnimation: a,
                    onToggle: function (self) {
                        if (self.isActive) {
                            lineCreate(idx);
                        }
                    },
                },
            });
        });
    });

    // sc-news
    gsap.from([$(".sc-news .group-title"), $(".sc-news .news-item").children()], {
        opacity: 0,
        yPercent: 100,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".sc-news",
            start: "0% 100%",
        },
    });
});
