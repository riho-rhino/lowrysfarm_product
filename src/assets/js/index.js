import $ from "jquery"

var $win  = $(window);
var $body = $('body');



opning();
function tick(time) {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve()
            console.log('YES');
        }, time)
    })
}

async function opning() {
    $('.wrapper').addClass('start');
    await tick(1500);
    $('.pc-left').addClass('move');
    $('.right_inner').addClass('move');
}



$win.on({
    'load' : function(){
        spAnchor();
        closeAnchor();
    },
    'scroll' : function(){
        styleOn();
    }
});



// SPアンカーリンク
$(window).on('load', function () {
    $('.sp-anchor_list a[href*="#"]').on('click', function () {
      var elmHash = $(this).attr('href');
      var pos = $(elmHash).offset().top - 20;
      $('html, body').animate({ scrollTop: pos }, 800);
      $('.sp-anchor').removeClass('open');
      $body.removeClass('noscroll');
      return false;
    });
  });


  function spAnchor() {
    $('.lineup_btn').on('click', function(){
        $('.sp-anchor').addClass('open');
        $body.addClass('noscroll');
    });
}
  function closeAnchor() {
    $('.sp-closebtn').on('click', function(){
        $('.sp-anchor').removeClass('open');
        $body.removeClass('noscroll');
    });
}

// アンカーリンク
$(window).on('load', function () {
    $('.anchor_list a[href*="#"]').on('click', function () {
      var elmHash = $(this).attr('href');
      var pos = $(elmHash).offset().top;
      $('html, body').animate({ scrollTop: pos }, 800);
      return false;
    });
  });


//   セクションごとのクラス付与

  function styleOn() {
    $('.style').each(function () {
        var element = $(this);
        var elementTop = element.offset().top;
        var windowTop = $(window).scrollTop();
        var windowHeight = $(window).height();

        // 要素の上部がウィンドウの60%位置に来たときにクラスを追加
        if (windowTop + windowHeight * 0.6 > elementTop) {
            element.addClass('on');
            element.addClass('active');
        } else {
            element.removeClass('on');
        }
    });
}



gsap.utils.toArray(".active").forEach((element) => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 70%",
        toggleClass: {
          targets: element,
          className: "move",
        },
        once: true,
      },
    });
  });

  

  gsap.utils.toArray(".fadein").forEach((element) => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 60%",
        toggleClass: {
          targets: element,
          className: "in",
        },
        once: true,
      },
    });
  });

//   gsap.utils.toArray(".item_bg").forEach((element) => {
//   gsap.to(element, {
//     scale: 6,
//     scrollTrigger: {
//       trigger: ('.item_wrap'),
//       start: "top 100%", 
//       end: "bottom 40%", 
//       scrub: 2, 
//       markers:true,
//     },
//   });
// });

// // 各セクションごとに個別にアニメーションを設定
document.querySelectorAll('.style').forEach(section => {
  const itemBg = section.querySelector('.item_bg');
  const itemPh = section.querySelector('.item_wrap');

  gsap.to(itemBg, {
    scale: 3.5,
    scrollTrigger: {
      trigger: itemPh,          
      start: "top 90%",         
      end: "bottom 40%",        
      scrub: true,               
    },
    
  });
});



  gsap.to(".lineup_btn", {
    scrollTrigger: {
      toggleActions: "play none none reverse",  
      trigger: ".main",
      start: "top 70%", 
      toggleClass: {
        targets: ".lineup_btn", 
        className: "show", 
      },
    },
  });



function load_init() {

  // スクロールバー
  function scrollbar() {
    var $win = $(window);
    var $body = $("body");
    var $scrollbar = $(".js-scrollbar > .current");
    var $scrollbarContainer = $(".js-scrollbar"); // スクロールバーの親要素

    function updateScrollbar() {
      var body_h = $body.outerHeight(true),
        scroll_current_h = $scrollbar.outerHeight(),
        win_h = $win.height(),
        scroll_pos = $win.scrollTop(),
        scrollbarContainer_h = $scrollbarContainer.outerHeight(); // スクロールバーの親要素の高さ

      // スクロールバーの位置を計算
      var scrollbar_top = (scroll_pos / (body_h - win_h)) * (scrollbarContainer_h - scroll_current_h);
      $scrollbar.css("top", scrollbar_top + "px");
    }

    addEventListener('scroll', function () {
      updateScrollbar();
    }, { passive: true });
  }

  scrollbar();
}
$(window).on('load', function () {
  load_init();
});

