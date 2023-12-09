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

// Make the carousel scrollable by itself
setCarouselScrollTimer();

// Assuming carousel and buttons are defined
carousel.addEventListener("mouseover", function () {
  clearInterval(scrollTimer);
});

carousel.addEventListener("mouseout", function () {
  setCarouselScrollTimer();
});

// Assuming buttons is an array of button elements
var buttons = [leftCarouselButton, rightCarouselButton];
buttons.forEach(function (button) {
  button.addEventListener("mouseover", function () {
    clearInterval(scrollTimer);
  });

  button.addEventListener("mouseout", function () {
    setCarouselScrollTimer();
  });

  button.addEventListener("click", function () {
    clearInterval(scrollTimer);
  });
});

var scrollAmount = 0;
function setCarouselScrollTimer() {
  scrollTimer = setInterval(function () {
    carousel.scrollLeft += 1;
    scrollAmount += 1;

    if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
      carousel.scrollLeft = 0;
    }
  }, 20);
}
