$(document).ready(function() {
  const $tmHeader = $(".tm-header");

  $(".navbar-toggler").on("click", function(e) {
    $tmHeader.toggleClass("show");
    e.stopPropagation();
  });

  $("html").on("click", function(e) {
    if (!$tmHeader.is(e.target) && $tmHeader.has(e.target).length === 0) {
      $tmHeader.removeClass("show");
    }
  });

  $("#tm-nav .nav-link").on("click", function() {
    $tmHeader.removeClass("show");
  });
});
