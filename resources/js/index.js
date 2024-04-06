// DOM Elements
const leftCarouselButton = document.getElementById("left-carousel-button");
const rightCarouselButton = document.getElementById("right-carousel-button");
const carousel = document.getElementById("carousel");
const buttons = [leftCarouselButton, rightCarouselButton];

// Event Listeners
leftCarouselButton.addEventListener("click", scrollCarouselLeft);
rightCarouselButton.addEventListener("click", scrollCarouselRight);
carousel.addEventListener("mouseover", stopCarouselScroll);
carousel.addEventListener("mouseout", startCarouselScroll);
buttons.forEach((button) => {
  button.addEventListener("mouseover", stopCarouselScroll);
  button.addEventListener("mouseout", startCarouselScroll);
  button.addEventListener("click", stopCarouselScroll);
});

document.querySelector("#navbar-toggler").addEventListener("click", () => {
  const navLinks = document.querySelector("#navbar-default");
  navLinks.classList.toggle("hidden");
  navLinks.classList.toggle("md:flex");
});

// Get all navigation links
const navItems = document.querySelectorAll("#navbar-default ul li a");

// Add event listener to each navigation link
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const navLinks = document.querySelector("#navbar-default");
    // Check if the screen width is less than 768px (Tailwind's md breakpoint)
    if (window.innerWidth < 768 && !navLinks.classList.contains("hidden")) {
      navLinks.classList.add("hidden");
      navLinks.classList.remove("md:flex");
    }
  });
});

window.onload = function () {
  carousel.scrollLeft = 0;
  setCarouselScrollTimer();
  setCarouselGradient();
};

// Functions
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
    if (
      carousel.scrollLeft >=
      carousel.scrollWidth - carousel.clientWidth - 1
    ) {
      carousel.classList.add("fade-out");
      setTimeout(() => {
        carousel.scrollLeft = 0;
        carousel.classList.remove("fade-out");
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
  const style = document.createElement("style");
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
fetch("projects.json")
  .then((response) => response.json())
  .then((data) => populateCarousel(data))
  .catch((error) => console.error("Error:", error));

function populateCarousel(data) {
  data.forEach((project) => {
    const carouselItem = createCarouselItem(project);
    carousel.appendChild(carouselItem);
  });

  // Duplicate the first image and append it to the end of the carousel
  const firstCarouselItem = createCarouselItem(data[0]);
  carousel.appendChild(firstCarouselItem);
}

function createCarouselItem(project) {
  const carouselItem = document.createElement("div");
  carouselItem.className = "max-w-xs flex-shrink-0 mr-8 text-center";

  const link = document.createElement("a");
  link.className = "group block h-full";
  link.href = project.url;

  const imageContainer = document.createElement("div");
  imageContainer.className = "relative w-full h-72 mb-3";

  const hoverImageContainer = createHoverImageContainer(project);
  imageContainer.appendChild(hoverImageContainer);

  const image = createImage(project);
  imageContainer.appendChild(image);

  const projectName = document.createElement("span");
  projectName.className = "text-sm";
  projectName.textContent = project.name;

  link.appendChild(imageContainer);
  link.appendChild(projectName);

  carouselItem.appendChild(link);

  return carouselItem;
}

function createHoverImageContainer(project) {
  const hoverImageContainer = document.createElement("div");
  hoverImageContainer.className =
    "hidden group-hover:flex items-center justify-center absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80";

  const hoverImage = createImage(project);
  hoverImageContainer.appendChild(hoverImage);

  return hoverImageContainer;
}

function createImage(project) {
  const image = document.createElement("img");
  image.className = "block w-full h-full";
  image.src = project.picture;
  image.style.width = "300px";
  image.style.height = "400px";

  return image;
}

fetch("members.json")
  .then((response) => response.json())
  .then((data) => populateMembers(data))
  .catch((error) => console.error("Error:", error));

function populateMembers(members) {
  // Sort members so that the CEO is in the center
  const ceoIndex = members.findIndex((member) =>
    member.profession.includes("CEO")
  );
  const ceoMember = members[ceoIndex];
  members.splice(ceoIndex, 1);
  const centerIndex = Math.floor(members.length / 2);
  members.splice(centerIndex, 0, ceoMember);

  const membersDiv = document.getElementById("team-members");
  members.forEach((member, index) => {
    const memberDiv = document.createElement("div");
    memberDiv.className =
      "w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 flex flex-col items-center text-center";
    memberDiv.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2)";
    memberDiv.style.transition = "0.3s";
    memberDiv.style.borderRadius = "5px"; // Rounded corners
    memberDiv.style.margin = "0 20px"; // Increase horizontal space between boxes

    const img = document.createElement("img");
    img.className = "w-32 h-32 rounded-full mb-4 object-cover"; // Same size for all images
    img.src = member.picture;
    img.alt = `${member.name}'s picture`;
    img.style.width = "150px"; // Set width
    img.style.height = "150px"; // Set height

    const name = document.createElement("h2");
    name.className = "text-xl font-bold mb-2";
    name.textContent = member.name;

    const profession = document.createElement("p");
    profession.className = "mb-2";
    profession.textContent = member.profession;

    const emailDiv = document.createElement("div"); // Create a new div for the email icon and text
    emailDiv.className = "block mb-2";
    emailDiv.style.display = "flex"; // Arrange children in a row
    emailDiv.style.alignItems = "center"; // Vertically center the children

    const emailIcon = document.createElement("i");
    emailIcon.className = "fas fa-envelope";
    emailIcon.style.marginRight = "10px"; // Space to the right of the icon

    const email = document.createElement("a");
    email.href = `mailto:${member.email}`;
    email.textContent = member.email;

    const portfolio = document.createElement("a");
    portfolio.className = "block";
    portfolio.href = member.portfolio;
    portfolio.innerHTML = '<i class="fas fa-briefcase"></i> Portfolio';
    portfolio.style.color = "#ffffff"; // White color for links

    memberDiv.style.margin = "0 30px 30px 0"; // Increase space between members
    memberDiv.appendChild(img);
    memberDiv.appendChild(name);
    memberDiv.appendChild(profession);

    emailDiv.appendChild(emailIcon);
    emailDiv.appendChild(email);
    memberDiv.appendChild(emailDiv);

    memberDiv.appendChild(portfolio);

    membersDiv.appendChild(memberDiv);
  });
}

// Contact us form
document
  .getElementById("researchCheckbox")
  .addEventListener("change", function () {
    document.getElementById("link").disabled = !this.checked;
  });

document
  .getElementById("contactButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let form = document.getElementById("contactForm");
    if (form.classList.contains("hidden")) {
      form.classList.remove("hidden");
      this.disabled = true;
    } else {
      form.classList.add("hidden");
      this.disabled = false;
    }
  });

// EmailJS
(function () {
  emailjs.init("ySaIap3hTf1eHrMKa");
})();

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Show loader
    document.getElementById("loader").classList.remove("hidden");

    let formData = new FormData(this);
    let username = formData.get("username");
    let email = formData.get("email");
    let title = formData.get("title");
    let link = formData.get("link");
    let description = formData.get("description");
    let captcha_response = grecaptcha.getResponse();

    let templateParams = {
      username: username,
      email: email,
      title: title,
      link: link,
      description: description,
      "g-recaptcha-response": captcha_response,
    };

    emailjs
      .send("lookinlabs_zoho", "lookinlabs_template_id", templateParams)
      .then(
        function () {
          // Hide contact form
          document.getElementById("contactForm").classList.add("hidden");

          // Show success banner
          let successBanner = document.getElementById("success-banner");
          successBanner.classList.remove("hidden");
          successBanner.classList.add("flex");
          setTimeout(function () {
            successBanner.classList.add("hidden");
          }, 5000); // Hide after 5 seconds
        },
        function (error) {
          // Show fail banner
          let failBanner = document.getElementById("fail-banner");
          failBanner.classList.remove("hidden");
          failBanner.classList.add("flex");
          setTimeout(function () {
            failBanner.classList.add("hidden");
          }, 5000); // Hide after 5 seconds
        }
      )
      .finally(function () {
        // Hide loader
        document.getElementById("loader").classList.add("hidden");
      });
  });
