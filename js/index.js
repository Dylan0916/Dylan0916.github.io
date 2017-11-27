"use strict";

$(function() {
  
let header_height = $('.header').height();

let edu_offset = 0,
    experience_offset = 0,
    skills_offset = 0,
    works_offset = 0,
    contact_offset = 0;

$(window).scroll(evt => {
  let $windowST = $(window).scrollTop();
  
  $windowST < 20
    ? $("header").addClass("js-at_top")
    : $("header").removeClass("js-at_top");
  
  // 置頂箭頭 & 下滑指示箭頭
  $windowST <= 100
    ? $(".goTop, .js-arrow").addClass("js-at_top")
    : $(".goTop, .js-arrow").removeClass("js-at_top");
  
  // nav 加底線
  edu_offset = $('#edu').offset().top - header_height;
  experience_offset = $('#experience').offset().top - header_height;
  skills_offset = $('#skills').offset().top - header_height;
  works_offset = $('#works').offset().top - header_height;
  contact_offset = $('#contact').offset().top - header_height;
  
  $('a.navbar__link').removeClass('js-at_scroll');
  if ( $windowST >= edu_offset && $windowST < experience_offset ) {    
    $('a.navbar__link[href="#edu"]').addClass('js-at_scroll');
  } else if ( $windowST >= experience_offset && $windowST < skills_offset ) {
    $('a.navbar__link[href="#experience"]').addClass('js-at_scroll');
  } else if ( $windowST >= skills_offset && $windowST < works_offset ) {
    $('a.navbar__link[href="#skills"]').addClass('js-at_scroll');
  } else if ( $windowST >= works_offset && $windowST < contact_offset ) {
    $('a.navbar__link[href="#works"]').addClass('js-at_scroll');
  } else if ( $windowST >= contact_offset ) {
    $('a.navbar__link[href="#contact"]').addClass('js-at_scroll');
  }
});
  
// 至頂端
$('.navbar__brand, .goTop').click(() => {
  $('html, body').animate({
    scrollTop: 0
  }, 600);

  return false;
});

// ID href
$('.navbar__link, .js-arrow').click(() => {
  let $this = $(event.currentTarget),
      href = $this.attr('href'),
      window_width = document.body.clientWidth;

  $('html, body').animate({
    scrollTop: $(href).offset().top - ( header_height - ( (window_width < 768) ? 3 : 1 ) )
  }, 600);
  
  // menu
 (window_width < 768 && !$this.hasClass('js-arrow')) ? menu_tggle() : '';

  return false;
});

// menu toggle
$('a.menu-toggle').click(() => {
  menu_tggle();
});
  
function menu_tggle() {
  let $this = $('a.menu-toggle');
  
  $this.hasClass('js-at_cross') ? $this.removeClass('js-at_cross') : $this.addClass('js-at_cross');
  
  // open menu
  let navbar_item = $this.nextAll('#navbarLink');
  $(navbar_item).hasClass('js-target') ? $(navbar_item).removeClass('js-target') : $(navbar_item).addClass('js-target');
}
  

// owl-carousel plugin initialize
$(".owl-carousel").owlCarousel({
  loop: true,
  nav: true,
  navText: [],
  items: 1,
  // autoplay: true,
  // autoplaySpeed: 1000,
  // smartSpeed: 500,
  // autoplayHoverPause: true
});
  
// wow plugin initialize
new WOW().init();
  
});


let works_data = [
  {
    "url":"images/specialTopic-front.png",
    "title":"Fun \u5fc3\u65c5\u904a",
    "content":"\u9019\u662f\u6211\u5927\u5b78\u7684\u5c08\u984c\uff0c\u662f\u500b\u80fd\u8b93\u7279\u6b8a\u65cf\u7fa4\u51fa\u9580\u65c5\u904a\u80fd\u4e0d\u7528\u64d4\u5fc3\u53bb\u8655\u6709\u7121\u7121\u969c\u7919\u7a7a\u9593\u6216\u6551\u8b77\u8a2d\u5099\uff0c\u8b93\u65c5\u904a\u66f4\u5b89\u5fc3\u3002"
  },
  {
    "url":"images/ntunhs-usedboob-front.png",
   "title":"\u5317\u8b77\u4e8c\u624b\u66f8\u4ea4\u6613\u5e73\u53f0",
   "content":"一個提供給北護師生收購需用或販售不要的二手書的平台。"
  },
  {
    "url":"images/Tic-Tac-Toe-front.png",
   "title":"Tic Tac Toe",
   "content":"\u5229\u7528 JavaScript \u88fd\u4f5c\u51fa\u96fb\u8166\u7248\u7db2\u9801\u73a9\u7684\u4e95\u5b57\u68cb (\u5708\u5708\u53c9\u53c9)\u3002"
  },
  {
    "url":"images/snake-game-front.png",
   "title":"\u8caa\u98df\u86c7",
   "content":"\u9019\u662f\u7528 JavaScript \u6240\u505a\u51fa\u7684\u8caa\u98df\u86c7\uff0c\u5229\u7528\u9375\u76e4\u4f86\u64cd\u63a7\u86c7\u7684\u79fb\u52d5\u3002"
  }
];

// $.get("http://dehaokong.tigrimigri.com/api/works_data.php", (res) => {
//   works_data = res;
// });


let vm1 = new Vue({
  el: "#app",
  data: {
    works_data: works_data
  },
  methods: {
    bg_css(url) {
      return {
        'background-image': `url('${url}')`
      }
    },
    work_click(id) {
      $('body, .box, #box_' + id).addClass('box-open');
      $('[id^="box_"]:not(#box_' + id + ')').css('display', 'none');
    }
  }
  
});
  

let box_data = [
  {
    "img": ["specialTopic-01.png", 'specialTopic-02.png', 'specialTopic-03.png', 'specialTopic-04.png', 'specialTopic-05.png', 'specialTopic-06.png'],
    "title": "Fun 心旅遊",
    'description': "<p>這是我大學的專題，是個能讓特殊族群出門旅遊能不用擔心去的地方有無無障礙空間、急救設備、客製化飲食等等，讓旅遊更安心、放心。</p><p>使用者可以依需求選擇美食或者住宿，還可篩選自身狀況與想要的距離，之後再排序來快速找出理想的店家。</p>"
  },
  {
    "img": ["ntunhs-usedbook-01.png", 'ntunhs-usedbook-02.png'],
    "title": "北護二手書交易平台",
    'description': "<p>這是一個提供給北護師生收購需用貨販售不要的二手書的平台。</p><p>大學時曾製作一個簡易版的二手書平台，之後持續這個概念，利用 Laravel 框架來完成這網頁，網頁加上 RWD，讓使用者不管是 Desptop 或是 Mobile 都能舒適的瀏覽內容。</p>"
  },
  {
    "img": ['Tic-Tac-Toe-01.png', 'Tic-Tac-Toe-02.png', 'Tic-Tac-Toe-03.png'],
    "title": "Tic Tac Toe",
    'description': "<p>利用 JavaScript 製作出電腦版網頁玩的井字棋 (圈圈叉叉)。</p><p>玩家可以透過棋盤下方的圖示來得知該換哪個玩家，也能透過文字來得知當前狀況，玩得簡單又輕鬆。</p>"
  },
  {
    "img": ["snake_game-01.png", 'snake_game-02.png', 'snake_game-03.png', 'snake_game-04.png'],
    "title": "貪食蛇",
    'description': "<p>這是用 JavaScript 所做出的貪食蛇，玩家可以利用鍵盤來操控蛇的移動。</p><p>鍵盤的上下左右鍵為前後左右移動，或是用 F 來左轉，R 來右轉；P 為暫停；空白鍵為開始</p><p>當蛇吃到的食物越多，移動的速快越快，遊戲簡單好上手，等你來挑戰！</p>"
  }
];

let vm2 = new Vue({
  el: "#app2",
  data: {
    box_data: box_data
  },
  methods: {
    bg_css(url) {
      return {
        'background-image': `url('images/screenshots/${url}')`
      }
    },
    close_box() {
      $('body, .box, [id^="box_"]').removeClass('box-open');
      $('[id^="box_"]').css('display', 'block');
    }
    
  }
});