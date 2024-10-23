document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS
  emailjs.init("ySaIap3hTf1eHrMKa");

  const contactForm = document.getElementById("contactForm");
  const loader = document.getElementById("loader");
  const successBanner = document.getElementById("success-banner");
  const failBanner = document.getElementById("fail-banner");
  const termsBanner = document.getElementById("terms-banner");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const termsCheckbox = document.getElementById("termsCheckbox");
      if (termsCheckbox && termsCheckbox.checked) {
        if (loader) loader.classList.remove("hidden");

        const formData = new FormData(this);
        const templateParams = {
          username: formData.get("username"),
          email: formData.get("email"),
          title: formData.get("title"),
          description: formData.get("description"),
          "g-recaptcha-response": grecaptcha.getResponse(),
        };

        emailjs.send("lookinlabs_zoho", "lookinlabs_template_id", templateParams)
          .then(() => {
            contactForm.reset();
            showBanner(successBanner);
          })
          .catch(() => {
            showBanner(failBanner);
          })
          .finally(() => {
            if (loader) loader.classList.add("hidden");
          });
      } else {
        showBanner(termsBanner);
      }
    });
  }

  function showBanner(banner) {
    if (banner) {
      banner.classList.remove("hidden");
      banner.classList.add("flex");
      setTimeout(() => {
        banner.classList.add("hidden");
        banner.classList.remove("flex");
      }, 5000);
    }
  }

  document.querySelectorAll(".banner-close").forEach(button => {
    button.addEventListener("click", function () {
      const banner = this.closest("div");
      if (banner) {
        banner.classList.add("hidden");
        banner.classList.remove("flex");
      }
    });
  });

  document.querySelector("#navbar-toggler").addEventListener("click", () => {
    const navLinks = document.querySelector("#navbar-default");
    navLinks.classList.toggle("hidden");
  });

  document.querySelectorAll("#navbar-default ul li a").forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        if (window.innerWidth < 768) {
          document.querySelector("#navbar-default").classList.add("hidden");
        }
      } else {
        window.location.href = link.getAttribute("href");
      }
    });
  });

  // Static members data
  const members = [
    {
      name: "Christofher Köst",
      profession: "CEO, Site Reliability Engineer",
      portfolio: "https://kostlinux.github.io/Portfolio",
      picture: "./resources/img/members/christofher.webp"
    },
    {
      name: "Martin Sidorov",
      profession: "Co-Founder, Software Engineer",
      portfolio: "https://martinsidorov.com/",
      picture: "./resources/img/members/martin.webp"
    },
    {
      name: "Daniel Laks",
      profession: "Co-Founder, Software Engineer",
      portfolio: "https://www.linkedin.com/in/daniel-luxx/",
      picture: "./resources/img/members/daniel.webp"
    }
  ];

  // Populate members
  populateMembers(members);

  function populateMembers(members) {
    const ceoIndex = members.findIndex(member => member.profession.includes("CEO"));
    const ceoMember = members.splice(ceoIndex, 1)[0];
    const centerIndex = Math.floor(members.length / 2);
    members.splice(centerIndex, 0, ceoMember);

    const membersDiv = document.getElementById("team-members");
    membersDiv.style.display = "flex";
    membersDiv.style.flexWrap = "wrap";
    membersDiv.style.justifyContent = "space-around";

    members.forEach(member => {
      const memberDiv = document.createElement("div");
      memberDiv.className = "w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 flex flex-col items-center text-center";
      memberDiv.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2)";
      memberDiv.style.transition = "0.3s";
      memberDiv.style.borderRadius = "5px";
      memberDiv.style.margin = "0 20px";

      const img = document.createElement("img");
      img.className = "w-32 h-32 rounded-full mb-4 object-cover";
      img.src = member.picture;
      img.alt = `${member.name}'s picture`;
      img.style.width = "150px";
      img.style.height = "150px";

      const name = document.createElement("h2");
      name.className = "text-xl font-bold mb-2";
      name.textContent = member.name;

      const profession = document.createElement("p");
      profession.className = "mb-2";
      profession.textContent = member.profession;

      const portfolio = document.createElement("a");
      portfolio.className = "block";
      portfolio.href = member.portfolio;
      portfolio.innerHTML = '<i class="fas fa-briefcase"></i> Portfolio';
      portfolio.style.color = "#ffffff";

      memberDiv.append(img, name, profession, portfolio);
      membersDiv.appendChild(memberDiv);
    });
  }

  window.addEventListener('load', function() {
    setTimeout(() => {
      document.getElementById('refreshLoader').classList.add('hide-loader');
    });
  });

  const languageButton = document.getElementById("language-button");
  const languageOptions = document.getElementById("language-options");
  const languageOptionsChildren = Array.from(languageOptions.children);

  languageButton.addEventListener("click", function () {
    languageOptions.classList.toggle("hidden");
  });

  languageOptionsChildren.forEach(option => {
    option.addEventListener("click", function () {
      const language = option.dataset.value.toUpperCase();
      document.getElementById("selected-language").innerHTML = language;
      languageOptions.classList.add("hidden");
      loadTranslations(language);
    });
  });

  document.addEventListener("click", function (event) {
    if (!document.getElementById("language-changer").contains(event.target)) {
      languageOptions.classList.add("hidden");
    }
  });

  function loadTranslations(language) {
    language = language.toLowerCase();
    document.documentElement.lang = language;

    fetch(`resources/translations/${language}.json`)
      .then(response => response.json())
      .then(data => {
        const elements = document.querySelectorAll("[data-translation-key]");
        elements.forEach(element => {
          const key = element.getAttribute("data-translation-key");
          const keys = key.split(/[\[\]]/);
          const translation = keys.length > 1 ? data[keys[0]][parseInt(keys[1])] : data[key];
          if (element.hasAttribute("placeholder")) {
            element.setAttribute("placeholder", translation);
          } else {
            element.innerHTML = translation;
          }
        });
      });
  }

  loadTranslations("en");
});