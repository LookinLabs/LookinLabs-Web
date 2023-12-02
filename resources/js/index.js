document.getElementById("nav-toggle").addEventListener("click", function () {
  var navMenu = document.getElementById("nav-menu");
  if (navMenu.style.display === "none") {
    navMenu.style.display = "flex";
  } else {
    navMenu.style.display = "none";
  }
});

// Carousel buttons click event
var leftCarouselButton = document.getElementById("left-carousel-button");
var rightCarouselButton = document.getElementById("right-carousel-button");
var carousel = document.getElementById("carousel");

leftCarouselButton.onclick = function () {
  carousel.scrollTo({
    left: carousel.scrollLeft - carousel.clientWidth,
    behavior: "smooth",
  });
};

rightCarouselButton.onclick = function () {
  carousel.scrollTo({
    left: carousel.scrollLeft + carousel.clientWidth,
    behavior: "smooth",
  });
};

window.onload = function () {
  carousel.scrollLeft = 0;
};
