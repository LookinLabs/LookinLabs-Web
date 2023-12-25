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

fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        const carousel = document.getElementById('carousel');

        data.forEach(project => {
            const carouselItem = document.createElement('div');
            carouselItem.className = 'max-w-xs flex-shrink-0 mr-8 text-center';

            const link = document.createElement('a');
            link.className = 'group block h-full';
            link.href = project.url;

            const imageContainer = document.createElement('div');
            imageContainer.className = 'relative w-full h-72 mb-3';

            // Only add hover animation if project name is not "LookinLabs Website"
            if (project.name !== "LookinLabs Website") {
                const hoverImageContainer = document.createElement('div');
                hoverImageContainer.className = 'hidden group-hover:flex items-center justify-center absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-40';

                const hoverImage = document.createElement('img');
                hoverImage.src = project.picture;
                hoverImageContainer.appendChild(hoverImage);

                imageContainer.appendChild(hoverImageContainer);
            }

            const image = document.createElement('img');
            image.className = 'block w-full h-full';
            image.src = project.picture;

            imageContainer.appendChild(image);

            const projectName = document.createElement('span');
            projectName.className = 'text-sm';
            projectName.textContent = project.name;

            link.appendChild(imageContainer);
            link.appendChild(projectName);

            carouselItem.appendChild(link);

            carousel.appendChild(carouselItem);
        });
    })
    .catch(error => console.error('Error:', error));

    window.onload = function() {
      // Get the body's computed background color
      var bodyStyle = window.getComputedStyle(document.body);
      var bodyBackgroundColor = bodyStyle.backgroundColor;
    
      // Create a new style element
      var style = document.createElement('style');
    
      // Set the CSS text
      style.innerHTML = `
          .carousel-container::before {
              content: "";
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              width: 10%;
              background: linear-gradient(to right, rgba(0, 0, 0, 0.7), transparent);
              z-index: 2;
              pointer-events: none;
          }
          .carousel-container::after {
              content: "";
              position: absolute;
              top: 0;
              bottom: 0;
              right: 0;
              width: 10%;
              background: linear-gradient(to left, rgba(0, 0, 0, 0.7), transparent);
              z-index: 2;
              pointer-events: none;
          }
      `;
    
      // Append the style element to the head of the document
      document.head.appendChild(style);
    };