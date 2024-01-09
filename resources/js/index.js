// DOM Elements
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const leftCarouselButton = document.getElementById("left-carousel-button");
const rightCarouselButton = document.getElementById("right-carousel-button");
const carousel = document.getElementById("carousel");
const buttons = [leftCarouselButton, rightCarouselButton];

// Event Listeners
navToggle.addEventListener("click", toggleNavMenu);
leftCarouselButton.addEventListener("click", scrollCarouselLeft);
rightCarouselButton.addEventListener("click", scrollCarouselRight);
carousel.addEventListener("mouseover", stopCarouselScroll);
carousel.addEventListener("mouseout", startCarouselScroll);
buttons.forEach(button => {
  button.addEventListener("mouseover", stopCarouselScroll);
  button.addEventListener("mouseout", startCarouselScroll);
  button.addEventListener("click", stopCarouselScroll);
});

window.onload = function () {
  carousel.scrollLeft = 0;
  setCarouselScrollTimer();
  setCarouselGradient();
};

// Functions
function toggleNavMenu() {
  navMenu.style.display = navMenu.style.display === "none" ? "flex" : "none";
}

function scrollCarouselLeft() {
  carousel.scrollTo({
    left: carousel.scrollLeft - carousel.clientWidth,
    behavior: "smooth",
  });
}

function scrollCarouselRight() {
  carousel.scrollTo({
    left: carousel.scrollLeft + carousel.clientWidth,
    behavior: "smooth",
  });
}

let scrollTimer;
function setCarouselScrollTimer() {
  scrollTimer = setInterval(() => {
    carousel.scrollLeft += 1;
    if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 1) {
      carousel.classList.add('fade-out');
      setTimeout(() => {
        carousel.scrollLeft = 0;
        carousel.classList.remove('fade-out');
      }, 250);
    }
  }, 20);
}
function stopCarouselScroll() {
  clearInterval(scrollTimer);
}

function startCarouselScroll() {
  setCarouselScrollTimer();
}

function setCarouselGradient() {
  const style = document.createElement('style');
  style.innerHTML = `
    .carousel-container::before {
      position: absolute;
      width: 20%;
      background: linear-gradient(to right, rgba(0, 0, 0, 0.7), transparent);
      z-index: 2;
      pointer-events: none;
    }
    .carousel-container::after {
      position: absolute;
      width: 20%;
      background: linear-gradient(to left, rgba(0, 0, 0, 0.7), transparent);
      z-index: 2;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
}

// Fetch and populate carousel
fetch('projects.json')
  .then(response => response.json())
  .then(data => populateCarousel(data))
  .catch(error => console.error('Error:', error));

function populateCarousel(data) {
  data.forEach(project => {
    const carouselItem = createCarouselItem(project);
    carousel.appendChild(carouselItem);
  });

  // Duplicate the first image and append it to the end of the carousel
  const firstCarouselItem = createCarouselItem(data[0]);
  carousel.appendChild(firstCarouselItem);
}

function createCarouselItem(project) {
  const carouselItem = document.createElement('div');
  carouselItem.className = 'max-w-xs flex-shrink-0 mr-8 text-center';

  const link = document.createElement('a');
  link.className = 'group block h-full';
  link.href = project.url;

  const imageContainer = document.createElement('div');
  imageContainer.className = 'relative w-full h-72 mb-3';

  const hoverImageContainer = createHoverImageContainer(project);
  imageContainer.appendChild(hoverImageContainer);

  const image = createImage(project);
  imageContainer.appendChild(image);

  const projectName = document.createElement('span');
  projectName.className = 'text-sm';
  projectName.textContent = project.name;

  link.appendChild(imageContainer);
  link.appendChild(projectName);

  carouselItem.appendChild(link);

  return carouselItem;
}

function createHoverImageContainer(project) {
  const hoverImageContainer = document.createElement('div');
  hoverImageContainer.className = 'hidden group-hover:flex items-center justify-center absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80';

  const hoverImage = createImage(project);
  hoverImageContainer.appendChild(hoverImage);

  return hoverImageContainer;
}

function createImage(project) {
  const image = document.createElement('img');
  image.className = 'block w-full h-full';
  image.src = project.picture;
  image.style.width = '300px';
  image.style.height = '400px';

  return image;
}