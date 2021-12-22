// wait until window loads before making our changes
window.addEventListener('load', function () {
  // establish namespace and shortcut
  if (!window.WanderTheResort) {
    window.WanderTheResort = {};
  }
  let wtr = window.WanderTheResort;

  // initialize hero
  wtr.initHero = function() {  
      var hero = document.querySelectorAll('.anim-hero')[0];
      var heroVideo = document.querySelectorAll('.hero-video')[0];
      var heroTitle = document.querySelectorAll('.hero-title')[0];
      var heroPaths = $('#hero-svg path');

      if (hero) {
          setTimeout(function() {
              hero.classList.remove('anim-hero');
          }, 2000);
      }
  };

  // initialize all carousels on page - to be deprecated
  wtr.initCarousels = function() {
      
      $(".carousel-container:not(.new-slider), .carousel-container-2021, .events-carousel, .stay-carousel").each(function() {

          var carouselItemClass = '.anim-forward';
          var carousel = $(this);
          var items = carousel.find(carouselItemClass);
          var captions = carousel.find('.c2');
          if (captions.length == 0) {
            captions = carousel.find('.c2-2021');
          }
          var dots = carousel.find('.dot');
          var currentIndex = 0;

          var onSelectCarouselItem = function(index) {
              currentIndex = index;

              var item = carousel.find(carouselItemClass+'[data-index="'+currentIndex+'"]');  
              var caption = carousel.find('.c2[data-index="'+currentIndex+'"]');
              if (caption.length == 0) {
                caption = carousel.find('.c2-2021[data-index="'+currentIndex+'"]');
              }

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
              caption.css({'display': 'none'});
          });

          onSelectCarouselItem(currentIndex);
      });
  }

  // initialize all first variant carousels on page - to be deprecated
  wtr.initNewCarousels = function() {

      $(".carousel-container.new-slider:not(.new-slider-2021)").each(function() {

          var carouselItemClass = '.anim-forward';
          var carousel = $(this);
          var items = carousel.find(carouselItemClass);
          var captions = carousel.find('.c2');
          if (captions.length == 0) {
            captions = carousel.find('.c2-2021');
          }

          var dots = carousel.find('.dot');
          var ctas = carousel.find('.cta:not(.w-condition-invisible)');
          if (ctas.length == 0) {
            ctas = carousel.find('.cta-button-2021:not(.w-condition-invisible)');
          }
          var currentIndex = 0;
          var nextIndex = 1;
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
              nextIndex = index + 1;
              nextIndex = (currentIndex + 1) > items.length - 1 ? 0 : (currentIndex + 1);
              finalIndex = (currentIndex - 1) < 0 ? (items.length - 1):(currentIndex - 1);
              var item = carousel.find(carouselItemClass+'[data-index="'+currentIndex+'"]');  
              var previousItem = carousel.find(carouselItemClass+'[data-index="'+previousIndex+'"]');
              var nextItem = carousel.find(carouselItemClass+'[data-index="'+nextIndex+'"]');
              var finalItem = carousel.find(carouselItemClass+'[data-index="'+finalIndex+'"]');  
              var caption = carousel.find('.c2[data-index="'+currentIndex+'"]');
              if (caption.length == 0) {
                caption = carousel.find('.c2-2021[data-index="'+currentIndex+'"]');
              }
              var dot = carousel.find('.dot[data-index="'+currentIndex+'"]');
              var cta = carousel.find('.cta[data-index="'+currentIndex+'"]');
              if (cta.length == 0) {
                cta = carousel.find('.cta-button-2021[data-index="'+currentIndex+'"]');
              }

              if (notFirst && goingForward(previousIndex, currentIndex)) {
                let itemToFade = carousel.find(carouselItemClass+'.last'); 
                itemToFade.addClass('fade');
              } else if (notFirst) {
                let itemToFade = carousel.find(carouselItemClass+':not(.last):not(.active)'); 
                itemToFade.addClass('fade');
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
                // nextItem.addClass('last');

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

          onSelectCarouselItem(currentIndex, false);
      });
  }

  // full width carousels
  wtr.initNewCarousels2021 = function() {

      $(".carousel-container.new-slider-2021").each(function() {

          var carouselItemClass = '.anim-forward';
          var carousel = $(this);
          var items = carousel.find(carouselItemClass);

          var captionsContainer = carousel.find('.new-slider-captions');
          var dotsContainer = carousel.find('.new-slider-dots');
          var ctasContainer = carousel.find('.new-slider-ctas');

          items.each(function(i) {
              var item = $(this);
              let dot = item.find('.dot');
              dotsContainer.append(dot);
              let caption = item.find('.c2-2021');
              captionsContainer.append(caption);
              let ctas = item.find('.cta-button-2021');
              ctasContainer.append(ctas);
          });

          var captions = carousel.find('.c2');
          if (captions.length == 0) {
            captions = carousel.find('.c2-2021');
          }

          var dots = carousel.find('.dot');
          var ctas = carousel.find('.cta');
          if (ctas.length == 0) {
            ctas = carousel.find('.cta-button-2021');
          }
          var currentIndex = 0;
          var nextIndex = 1;
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
              nextIndex = (currentIndex + 1) > items.length - 1 ? 0 : (currentIndex + 1);
              nextIndex2 = (currentIndex + 2) > items.length - 1 ? (currentIndex + 2) - (items.length) : (currentIndex + 2);
              nextIndex3 = (currentIndex + 3) > items.length - 1 ? (currentIndex + 3) - (items.length) : (currentIndex + 3);
              finalIndex = (currentIndex - 1) < 0 ? (items.length - 1):(currentIndex - 1);
              var item = carousel.find(carouselItemClass+'[data-index="'+currentIndex+'"]');  
              var previousItem = carousel.find(carouselItemClass+'[data-index="'+previousIndex+'"]');
              var nextItems = [
                carousel.find(carouselItemClass+'[data-index="'+nextIndex+'"]'),
                carousel.find(carouselItemClass+'[data-index="'+nextIndex2+'"]'),
              ];
              var nextItem = carousel.find(carouselItemClass+'[data-index="'+nextIndex+'"]');
              var finalItem = carousel.find(carouselItemClass+'[data-index="'+finalIndex+'"]');  
              var caption = carousel.find('.c2[data-index="'+currentIndex+'"]');
              if (caption.length == 0) {
                caption = carousel.find('.c2-2021[data-index="'+currentIndex+'"]');
              }
              var dot = carousel.find('.dot[data-index="'+currentIndex+'"]');
              var cta = carousel.find('.cta[data-index="'+currentIndex+'"]');
              if (cta.length == 0) {
                cta = carousel.find('.cta-button-2021[data-index="'+currentIndex+'"]');
              }

              if (notFirst && goingForward(previousIndex, currentIndex)) {
                let itemToFade = carousel.find(carouselItemClass+'.last'); 
                itemToFade.addClass('fade');
              } else if (notFirst) {
                let itemToFade = carousel.find(carouselItemClass+':not(.last):not(.active)'); 
                itemToFade.addClass('fade');
              }
              setTimeout(() => {
                items.removeClass('last');
                items.removeClass('next');
                items.removeClass('active');
                items.removeClass('fade');
                if (goingForward(previousIndex, currentIndex)) {
                  items.addClass('forward');
                } else {
                  items.removeClass('forward');
                }
                item.addClass('active next');
                finalItem.addClass('last');
                // nextItems.forEach((e) => {
                //   e.addClass('next');
                // });
                nextItem.addClass('next');

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
              if(!cta[0].classList.contains('w-condition-invisible')) {
                let ctaIndex = Math.floor(i/2);
                cta.attr('data-index', ctaIndex);
                cta.css({'display': 'none'});
              }
          });
          ctas.eq(0).css({'display': 'inline-block'});

          onSelectCarouselItem(currentIndex, false);
      });
  }

  // standard carousels
  wtr.initNeoCarousels = function() {

    $(".neocarousel-container-2021:not(.uses-cms)").each(function() {

        var carouselItemClass = '.anim-forward';
        var carousel = $(this);
        var items = carousel.find(carouselItemClass);
        var captions = carousel.find('.c2-2021');
        var dots = carousel.find('.dot');
        var currentIndex = 0;

        var onSelectCarouselItem = function(index) {
            currentIndex = index;

            var item = carousel.find(carouselItemClass+'[data-index="'+currentIndex+'"]');  
            var caption = carousel.find('.c2-2021[data-index="'+currentIndex+'"]');

            var dot = carousel.find('.dot[data-index="'+currentIndex+'"]');

            items.removeClass('active-2021');
            item.addClass('active-2021');

            captions.removeClass('active-2021');
            captions.css({'display': 'none'});
            caption.addClass('active-2021');
            caption.css({'display': 'inline-block'});

            dots.removeClass('active-2021');
            dot.addClass('active-2021');
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
            caption.css({'display': 'none'});
        });

        onSelectCarouselItem(currentIndex);
    });
  }

  // standard carousels using CMS
  wtr.initNeoCarouselsCMS = function() {

    $(".neocarousel-container-2021.uses-cms").each(function() {

        var carouselItemClass = '.anim-forward';
        var carousel = $(this);
        var containers = carousel.find(carouselItemClass).parent();
        var items = carousel.find(carouselItemClass);

        var captionsContainer = carousel.find('.carousel-caption-2021');
        var dotsContainer = carousel.find('.carousel-dots-2021');
        var ctasContainer = carousel.find('.carousel-cta-2021');

        containers.each(function(i) {
          var item = $(this);
          let dot = item.find('.dot');
          dotsContainer.append(dot);
          let caption = item.find('.c2-2021');
          captionsContainer.append(caption);
          let ctas = item.find('.cta-button-2021');
          ctasContainer.append(ctas);
        });

        var captions = carousel.find('.c2-2021');
        var dots = carousel.find('.dot');
        var ctas = carousel.find('.cta-button-2021');

        var currentIndex = 0;

        var onSelectCarouselItem = function(index, notFirst = true) {
            if (currentIndex == index && notFirst) {
              return;
            }
            currentIndex = index;

            var item = carousel.find(carouselItemClass+'[data-index="'+currentIndex+'"]');  
            var caption = carousel.find('.c2-2021[data-index="'+currentIndex+'"]');

            var dot = carousel.find('.dot[data-index="'+currentIndex+'"]');

            var cta = carousel.find('.cta-button-2021[data-index="'+currentIndex+'"]');

            items.removeClass('active-2021');
            item.addClass('active-2021');

            captions.removeClass('active-2021');
            captions.css({'display': 'none'});
            caption.addClass('active-2021');
            caption.css({'display': 'inline-block'});

            dots.removeClass('active-2021');
            dot.addClass('active-2021');
            ctas.removeClass('active');
            ctas.css({'display': 'none'});
            cta.addClass('active');
            cta.css({'display': 'inline-block'});

        }

        $(items.get().reverse()).each(function(i) {
            var item = $(this);
            item.attr('data-index', i);
            if (item.hasClass('neocarousel-image')) {
              if (i == 0) {
                item.addClass('neocarousel-image-left-3');
              } else if (i == 1) {
                item.addClass('neocarousel-image-right-2');
              } else if (i == 2) {
                item.addClass('neocarousel-image-left');
              }
            }
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

        $(captions.get().reverse()).each(function(i) {
            var caption = $(this);
            caption.attr('data-index', i);
            caption.css({'display': 'none'});
        });
        captions.eq(0).css({'display': 'inline-block'});
        ctas.each(function(i) {
            var cta = $(this);
            if(!cta[0].classList.contains('w-condition-invisible')) {
              let ctaIndex = Math.floor(i/2);
              cta.attr('data-index', ctaIndex);
              cta.css({'display': 'none'});
            }
        });
        ctas.eq(0).css({'display': 'inline-block'});

        onSelectCarouselItem(currentIndex, false);
    });
  }

  // run initializers
  $(document).ready(function() {
      wtr.initCarousels();
      wtr.initNewCarousels();
      wtr.initNewCarousels2021();
      wtr.initNeoCarousels();
      wtr.initNeoCarouselsCMS();
      wtr.initHero();
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

  // purge old toast status cookie if still present
  wtr.oldToast = localStorage.getItem('wanderToast');
  if (wtr.oldToast) {
    localStorage.removeItem('wanderToast');
  }

  // update visibility of toast based on status cookie
  wtr.wanderToast = localStorage.getItem('wanderToast_0821');
  wtr.toastEl = document.getElementsByClassName('toast-wrapper')[0];
  wtr.toastToggle = document.querySelector('.toggle-wrapper .toast-toggle');
  if ((wtr.toastEl && wtr.toastToggle && !wtr.wanderToast) || (window.location.pathname.indexOf('/cms') == 0)) {
      wtr.toastEl.style.display = "block";
  }
  
  // listener on "close toast" button to set toast status cookie
  wtr.toastCloseEl = document.getElementsByClassName('toast-close')[0];
  if (wtr.toastCloseEl) {
    wtr.toastCloseEl.onclick = function setWanderToast() {
        localStorage.setItem('wanderToast_0821', true);
    }
  }

  // update visibility of privacy message based on status cookie
  wtr.wanderCookies = localStorage.getItem('wanderCookies');
  wtr.cookiesEl = document.querySelector('.privacy-message');
  if (wtr.cookiesEl && !wtr.wanderCookies){
    wtr.cookiesEl.style.display = "block";
  }

  // listener on privacy message to set status cookie
  wtr.cookieCloseEl = document.querySelector('.privacy .link-block');
  if (wtr.cookieCloseEl) {
    wtr.cookieCloseEl.onclick = function setWanderCookies() {
        localStorage.setItem('wanderCookies', true);
    }
  }

  // show new at wander on dev even when hidden
  wtr.newAtWander = document.querySelector('.new-at-wander');
  if (wtr.newAtWander && window.location.host == 'wander-the-resort-dev.webflow.io') {
    wtr.newAtWander.classList.remove('hidden');
  }
}, false);