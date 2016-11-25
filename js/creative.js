(function($) {
  "use strict"; // Start of use strict
  /**

  /**
   * Scrolls to the location on the page specified by the hash.
   */
  var scrollWindow = function(){
    var hash = window.location.hash;
    if (hash){
        // We add '-content' to manually scroll into the div of our choice.
      $('html, body').stop().animate({
        scrollTop: ($(hash + "-content").offset().top - 50)
      }, 1250, 'easeInOutExpo');

      // close the menu if open
      $('.navbar-toggle:visible').click();
    }
  };

  /**
   * Redirects the user based on their preferred language.
   */
  var languageRedirect = function() {
    var lang = navigator.languages ? navigator.languages[0]
      : (navigator.language || navigator.userLanguage);
    console.log(lang);
    if (lang.indexOf("zh") > -1 && window.location.pathname.substr(1,2) != "cn"
      && !window.sessionStorage.getItem("redirect")) {
      window.location.replace("zh/");
      window.sessionStorage.setItem("redirect", true);
    }
  }

  // Redirect user based on preferred language.
  languageRedirect();

  // Wait until window has loaded!
  $(window).load(function(){
    // Scroll to the URL (ie, refresh location)
    $('a.page-refresh').bind('click', function(event) {
       var $anchor = $(this);

       // extract only [#ELEMENT]
       var hash = "#" + $anchor.attr('href').split("#")[1];
       if (hash){
        window.location.hash = hash;
      }
    });

    // Blueberry slideshow!
    $('#blueberry').waitForImages(function(){
      $(this).blueberry({
        pager: false,
        duration: 5000
      })
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
      offset: {
        top: -1
      }
    })

    // Initialize and Configure Scroll Reveal Animation
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
      duration: 600,
      scale: 0.3,
      distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
      duration: 1000,
      delay: 200
    });
    sr.reveal('.sr-contact', {
      duration: 600,
      scale: 0.3,
      distance: '0px'
    }, 300);

    // Initialize and Configure Magnific Popup Lightbox Plugin
    $('.popup-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
      },
      image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
      }
    });

    // scroll to location
    scrollWindow();

    // Track hash changes and scroll to location
    $(window).on('hashchange', scrollWindow);
  });

})(jQuery); // End of use strict
