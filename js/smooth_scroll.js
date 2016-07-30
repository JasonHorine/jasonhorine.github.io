// scrolling is hidden until other on-page links can be added


// from bootstrap docs
// Add scrollspy to <body>
$(document).ready(function(){
  $('body').scrollspy({target: ".navbar", offset: 100});

  // Add smooth scrolling to all links inside a navbar
  $("#myNavbar a").on('click', function(event){

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {

      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash (#)
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area (the speed of the animation)
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 700, function(){
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      }) // End if statement
    };
  });
})

// collapse the dropdown nav, mobile widths
//https://github.com/twbs/bootstrap/issues/12852
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});
