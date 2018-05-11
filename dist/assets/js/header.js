window.onscroll = function () {
    var headerheight = $('#header').height();
    var headerbottom = $('.header-bottom').height();
    var header = headerheight;
    if (window.pageYOffset > header) {
        document.querySelector('.header-bottom').classList.add('fixed-header');
    }
    if (window.pageYOffset <= header) {
        document.querySelector('.header-bottom').classList.remove('fixed-header');
      }
}.bind(this);