window.addEventListener('load', function () {
  var initHero = function() {  
      var hero = document.querySelectorAll('.anim-hero')[0];
      var heroVideo = document.querySelectorAll('.hero-video')[0];
      var heroTitle = document.querySelectorAll('.hero-title')[0];
      var heroPaths = $('#hero-svg path');

      if (hero) {
          setTimeout(function() {
              hero.classList.remove('anim-hero');
          }, 2000);
      }

      /*
      setTimeout(function() {
        heroVideo.classList.add('no-transition');
        heroTitle.classList.add('no-transition');
        heroPaths.classList.add('no-transition');
      }, 6000);
      */
  };
  var initCarousels = function() {
      
      $(".carousel-container:not(.new-slider), .events-carousel, .stay-carousel").each(function() {

          var carouselItemClass = '.anim-forward';
          var carousel = $(this);
          // var hitArea = carousel.find('.carousel-hit-area');
          var items = carousel.find(carouselItemClass);
          var captions = carousel.find('.c2');
          var dots = carousel.find('.dot');
          var currentIndex = 0;

          var onSelectCarouselItem = function(index) {
              currentIndex = index;

              var item = carousel.find(carouselItemClass+'[data-index="'+currentIndex+'"]');  
              var caption = carousel.find('.c2[data-index="'+currentIndex+'"]');
              var dot = carousel.find('.dot[data-index="'+currentIndex+'"]');

              items.removeClass('active');
              item.addClass('active');

              captions.removeClass('active');
              captions.css({'display': 'none'});
              caption.addClass('active');
              caption.css({'display': 'inline-block'});

              dots.removeClass('active');
              dot.addClass('active');
          }

          $(items.get().reverse()).each(function(i) {
              var item = $(this);
              item.attr('data-index', i);
              item.on('click', function(e) {
                  onSelectCarouselItem(i);
              });
          });

          dots.each(function(i) {
              var dot = $(this);
              var target = $(carouselItemClass+'[data-index="'+i+'"]');
              dot.attr('data-index', i);
              dot.on('click', function(e) {
                  onSelectCarouselItem(i);
              });
          });

          captions.each(function(i) {
              var caption = $(this);
              caption.attr('data-index', i);
              caption.css({'diplay': 'none'});
          });

          // hitArea.on('click', function(e) {
          //      currentIndex = (currentIndex >= items.length-1) ? 0 : currentIndex += 1;
          //  onSelectCarouselItem(currentIndex);
          // });

          onSelectCarouselItem(currentIndex);
      });
  }
  var initCarousels2 = function() {
      
      $(".carousel-container.new-slider").each(function() {

          var carouselItemClass = '.anim-forward';
          var carousel = $(this);
          // var hitArea = carousel.find('.carousel-hit-area');
          var items = carousel.find(carouselItemClass);
          var captions = carousel.find('.c2');
          var dots = carousel.find('.dot');
          var ctas = carousel.find('.cta:not(.w-condition-invisible)');
          var currentIndex = 0;
          var finalIndex = items.length - 1;
          var previousIndex = finalIndex;
          const goingForward = function(previousIndex, currentIndex) {
            if (currentIndex == 0 && previousIndex == (items.length - 1)) {
              return true;
            } else if (currentIndex == 1 && previousIndex == 0) {
              return true;
            } else if (currentIndex == (items.length - 1) && previousIndex == (items.length - 2)) {
              return true;
            } else if (previousIndex > currentIndex) {
              return false;
            }
          };
          var onSelectCarouselItem = function(index, notFirst = true) {
              if (currentIndex == index && notFirst) {
                return;
              }
              previousIndex = currentIndex;
              currentIndex = index;
              finalIndex = (currentIndex - 1) < 0 ? (items.length - 1):(currentIndex - 1);
              var item = carousel.find(carouselItemClass+'[data-index="'+currentIndex+'"]');  
              var previousItem = carousel.find(carouselItemClass+'[data-index="'+previousIndex+'"]');  
              var finalItem = carousel.find(carouselItemClass+'[data-index="'+finalIndex+'"]');  
              var caption = carousel.find('.c2[data-index="'+currentIndex+'"]');
              var dot = carousel.find('.dot[data-index="'+currentIndex+'"]');
              var cta = carousel.find('.cta[data-index="'+currentIndex+'"]');

              if (notFirst && goingForward(previousIndex, currentIndex)) {
                let lastItem = carousel.find(carouselItemClass+'.last'); 
                lastItem.addClass('fade');
              } else if (notFirst) {
                let nextItem = carousel.find(carouselItemClass+':not(.last):not(.active)'); 
                nextItem.addClass('fade');
              }
              setTimeout(() => {
                items.removeClass('last');
                items.removeClass('active');
                items.removeClass('fade');
                if (goingForward(previousIndex, currentIndex)) {
                  items.addClass('forward');
                } else {
                  items.removeClass('forward');
                }
                item.addClass('active');
                finalItem.addClass('last');

                captions.removeClass('active');
                captions.css({'display': 'none'});
                caption.addClass('active');
                caption.css({'display': 'inline-block'});

                dots.removeClass('active');
                dot.addClass('active');
                ctas.removeClass('active');
                ctas.css({'display': 'none'});
                cta.addClass('active');
                cta.css({'display': 'inline-block'});
              }, 300);

          };

          items.each(function(i) {
              var item = $(this);
              item.attr('data-index', i);
              item.on('click', function(e) {
                  onSelectCarouselItem(i);
              });
          });

          dots.each(function(i) {
              var dot = $(this);
              var target = $(carouselItemClass+'[data-index="'+i+'"]');
              dot.attr('data-index', i);
              dot.on('click', function(e) {
                  onSelectCarouselItem(i);
              });
          });

          captions.each(function(i) {
              var caption = $(this);
              caption.attr('data-index', i);
              caption.css({'display': 'none'});
          });
          captions.eq(0).css({'display': 'inline-block'});

          ctas.each(function(i) {
              var cta = $(this);
              //cta.attr('data-index', i);
              cta.css({'display': 'none'});
          });
          ctas.eq(0).css({'display': 'inline-block'});


          // hitArea.on('click', function(e) {
          //      currentIndex = (currentIndex >= items.length-1) ? 0 : currentIndex += 1;
          //  onSelectCarouselItem(currentIndex);
          // });

          onSelectCarouselItem(currentIndex, false);
      });
  }
  var initAddons = function() {
    console.log('init addons');
    $('.cta.addons.w-button').on('click', (e) => {
      e.preventDefault();
      console.log('addonscta');
    });
  }

  $(document).ready(function() {
      initCarousels();
      initCarousels2();
      initHero();
      //initAddons();
  });

    $(document).ready(function() {
      $('#earlyaccess').on('click', function(e) {
        gtag('event', 'Signup', {
          'event_category': 'Newsletter',
          'event_label': 'Early access',
          'value': 50
        });
      });
    });

    // toast
    let oldToast = localStorage.getItem('wanderToast');
    if (oldToast) {
      localStorage.removeItem('wanderToast');
    }

    let wanderToast = localStorage.getItem('wanderToast_0821');
    
    let toastEl = document.getElementsByClassName('toast-wrapper')[0];
    if (toastEl && !wanderToast) {
        toastEl.style.display = "block";
    }
    
    let toastCloseEl = document.getElementsByClassName('toast-close')[0];
    if (toastCloseEl) {
      toastCloseEl.onclick = function setWanderToast() {
          localStorage.setItem('wanderToast_0821', true);
      }
    }

    let wanderCookies = localStorage.getItem('wanderCookies');
    let cookiesEl = document.querySelector('.privacy-message');
    if (cookiesEl && !wanderCookies) {
      cookiesEl.style.display = "block";
    }

    let cookieCloseEl = document.querySelector('.privacy .link-block');
    if (cookieCloseEl) {
      cookieCloseEl.onclick = function setWanderCookies() {
          localStorage.setItem('wanderCookies', true);
      }
    }

    // 
    let newAtWander = document.querySelector('.new-at-wander');
    if (newAtWander && window.location.host == 'wander-the-resort-dev.webflow.io') {
      newAtWander.classList.remove('hidden');
    }
}, false);