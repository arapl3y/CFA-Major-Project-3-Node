$(document).ready(function(){

  $(function() {
    $(".element").typed({
      strings: [
        "Welcome to Virtual Gallery.",
      ],
      callback: function() {
        $(".get-started").fadeIn();
      },
      typeSpeed: 10,
    });
  });
});
