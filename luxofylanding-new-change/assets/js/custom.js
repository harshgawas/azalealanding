////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var resizeId;
$(document).ready(function ($) {
  "use strict";

  sliderHeight();

  if ($(".read-more").length > 0) {
    $(".read-more").each(function () {
      var collapseHeight = parseInt(
        $(this).attr("data-read-more-collapse-height"),
        10
      );
      if (!collapseHeight) collapseHeight = 200;

      var moreLink = $(this).attr("data-read-more-more-link");
      if (!moreLink) moreLink = "Read more";

      var lessLink = $(this).attr("data-read-more-less-link");
      if (!lessLink) lessLink = "Read less";

      $(this).readmore({
        speed: 500,
        collapsedHeight: collapseHeight,
        moreLink:
          '<div class="read-more-btn"><a href="#" class="btn btn-framed btn-primary btn-light-frame btn-rounded">' +
          moreLink +
          "</a></div>",
        lessLink:
          '<div class="read-more-btn"><a href="#" class="btn btn-framed btn-primary btn-light-frame btn-rounded">' +
          lessLink +
          "</a></div>",
      });
    });
  }

  //  Smooth Scroll

  $('.main-nav a[href^="#"], a[href^="#"].scroll').on("click", function (e) {
    e.preventDefault();
    var target = this.hash,
      $target = $(target);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top,
        },
        2000,
        "swing",
        function () {
          window.location.hash = target;
        }
      );
  });

  //   $(".nav-btn").on("click", function () {
  //     $(".page-wrapper").toggleClass("show-navigation");
  //   });
  $(".navigation-links, .hero-section, #page-content, #page-footer").on(
    "click",
    function () {
      $(".page-wrapper").removeClass("show-navigation");
    }
  );

  //   $(window).scroll(function () {
  //     if ($(window).scrollTop() > 1) {
  //       $(".navigation").addClass("show-background");
  //     } else {
  //       $(".navigation").removeClass("show-background");
  //     }
  //   });

  //  Responsive Video Scaling

  if ($(".video").length > 0) {
    $(this).fitVids();
  }

  //  Magnific Popup

  if ($(".image-popup").length > 0) {
    $(".image-popup").magnificPopup({
      type: "image",
      removalDelay: 300,
      mainClass: "mfp-fade",
      overflowY: "scroll",
    });
  }

  //  Scroll Reveal

  if ($(window).width() > 768 && $("[data-scroll-reveal]").length) {
    window.scrollReveal = new scrollReveal();
  }

  //bigGalleryWidth();

  if ($(".count-down").length) {
    var year = parseInt($(".count-down").attr("data-countdown-year"), 10);
    var month = parseInt($(".count-down").attr("data-countdown-month"), 10) - 1;
    var day = parseInt($(".count-down").attr("data-countdown-day"), 10);
    $(".count-down").countdown({
      until: new Date(year, month, day),
      padZeroes: true,
    });
  }

  $("[data-background-color-custom]").each(function () {
    $(this).css(
      "background-color",
      $(this).attr("data-background-color-custom")
    );
  });

  if ($("body").hasClass("links-hover-effect")) {
    $("a, button").each(function () {
      if (
        !$(this).hasClass("image-popup") &&
        !$(this).hasClass("video-popup") &&
        !$(this).hasClass("arrow-up") &&
        !$(this).hasClass("image") &&
        !$(this).hasClass("no-hover-effect")
      ) {
        $(this).addClass("hover-effect");
        var htmlContent = $(this).html();
        $(this).text("");
        $(this).append(
          "<span><div class='hover-element'>" +
            htmlContent +
            "</div><div class='hover-element'>" +
            htmlContent +
            "</div></span>"
        );
      }
    });
  }

  // if( $("body").hasClass("has-loading-screen") ){
  //     Pace.on("done", function() {
  //         $(".page-wrapper").addClass("loading-done");
  //         setTimeout(function() {
  //             $(".page-wrapper").addClass("hide-loading-screen");
  //         }, 500);
  //         $.each( $("#page-header .animate"), function (i) {
  //             var $this = $(this);
  //             setTimeout(function(){
  //                 $this.addClass("show");
  //             }, i * 150);
  //         });
  //     });
  // }
  // else {
  $.each($("#page-header .animate"), function (i) {
    var $this = $(this);
    setTimeout(function () {
      $this.addClass("show");
    }, i * 150);
  });
  // }

  $(".bg-transfer").each(function () {
    $(this).css(
      "background-image",
      "url(" + $(this).find("img").attr("src") + ")"
    );
  });

  $('.modal-body a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
    var element = $($(this).attr("href")).find(".one-item-carousel");
    if (!element.hasClass("owl-carousel")) {
      $(element).owlCarousel({
        autoheight: 1,
        loop: 0,
        margin: 0,
        items: 1,
        nav: 0,
        dots: 1,
        autoHeight: true,
        navText: [],
      });
    }
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On Load
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).load(function () {
  if ($(document).width() > 768) {
    var $equalHeight = $(".container");
    for (var i = 0; i < $equalHeight.length; i++) {
      equalHeight($equalHeight);
    }
  }
  centerVerticalNavigation();
});

$(window).resize(function () {
  clearTimeout(resizeId);
  resizeId = setTimeout(doneResizing, 250);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Do after resize

function doneResizing() {
  //bigGalleryWidth();
  sliderHeight();
  centerVerticalNavigation();
}

function centerVerticalNavigation() {
  if ($(document).width() > 768) {
    $(".nav-btn-only .navigation-links").css(
      "padding-top",
      $(window).height() / 2 -
        $(".navigation .container").height() -
        $(".nav-btn-only .navigation-links").height() / 2 -
        40
    );
  }
}

function sliderHeight() {
  if ($(".hero-section").find(".container").height() > $(window).height()) {
    var paddingTop = $("nav.navigation").height();
    $(".hero-section .wrapper .hero-title").css(
      "padding-top",
      paddingTop + "px"
    );
    $(".hero-section").height(
      $(".hero-section").find(".container").height() + paddingTop
    );
    $(".hero-section .owl-stage-outer").height(
      $(".hero-section").children(".wrapper").height() + paddingTop
    );
    console.log("bigger");
  } else {
    $(".hero-section").height($(window).height());
    $(".hero-section .owl-stage-outer").height($(window).height());
    console.log("smaller");
  }

  //$(".hero-section").css( "min-height", $(window).height() + "px" );
  //$(".hero-section .owl-stage-outer").css( "min-height", $(window).height() + "px" );
}

function bigGalleryWidth() {
  if ($(document).width() < 768) {
    $(".big-gallery .slide .container").width($(document).width());
  }
}

function equalHeight(container) {
  var currentTallest = 0,
    currentRowStart = 0,
    rowDivs = new Array(),
    $el,
    topPosition = 0;

  $(container)
    .find(".equal-height")
    .each(function () {
      $el = $(this);
      $($el).height("auto");
      topPostion = $el.position().top;
      if (currentRowStart != topPostion) {
        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
          rowDivs[currentDiv].height(currentTallest);
        }
        rowDivs.length = 0; // empty the array
        currentRowStart = topPostion;
        currentTallest = $el.height();
        rowDivs.push($el);
      } else {
        rowDivs.push($el);
        currentTallest =
          currentTallest < $el.height() ? $el.height() : currentTallest;
      }
      for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
        rowDivs[currentDiv].height(currentTallest);
      }
    });
}
