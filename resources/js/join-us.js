// EmailJS
(function () {
  emailjs.init("ySaIap3hTf1eHrMKa");
})();

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Check if both checkboxes are checked
    if (document.getElementById("termsCheckbox").checked) {
      // Show loader
      document.getElementById("loader").classList.remove("hidden");

      let formData = new FormData(this);
      let username = formData.get("username");
      let email = formData.get("email");
      let title = formData.get("title");
      let description = formData.get("description");
      let captcha_response = grecaptcha.getResponse();

      let templateParams = {
        username: username,
        email: email,
        title: title,
        description: description,
        "g-recaptcha-response": captcha_response,
      };

      emailjs
        .send("lookinlabs_zoho", "lookinlabs_template_id", templateParams)
        .then(
          function () {
            // Hide contact form
            document.getElementById("contactForm").reset();

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
    } else {
      // One or both checkboxes are not checked, show an error message
      document.getElementById("terms-banner").classList.remove("hidden");
    }
  });

// Translations JSON
const languageButton = document.getElementById("language-button");
const languageOptions = document.getElementById("language-options");
const languageOptionsChildren = Array.from(languageOptions.children);

languageButton.addEventListener("click", function () {
  languageOptions.classList.toggle("hidden");
});

languageOptionsChildren.forEach(function (option) {
  option.addEventListener("click", function () {
    // Get the selected language and flag
    const language = option.dataset.value.toUpperCase();
    const flag = option.querySelector(".flag-icon").className;

    // Update the selected language and flag
    document.getElementById("selected-language").innerHTML =
      language + " <span class='" + flag + " mr-2'></span>";

    // Hide the language options and load the translations
    languageOptions.classList.add("hidden");
    loadTranslations(language);
  });
});

document.addEventListener("click", function (event) {
  let isClickInside = document
    .getElementById("language-changer")
    .contains(event.target);

  if (!isClickInside) {
    // The click was outside the #language-changer element, hide the dropdown
    document.getElementById("language-options").classList.add("hidden");
  }
});

function loadTranslations(language) {
  language = language.toLowerCase();
  document.documentElement.lang = language;

  fetch(`/resources/translations/${language}.json`)
    .then((response) => response.json())
    .then((data) => {
      const translations = data;
      const elements = document.querySelectorAll("[data-translation-key]");

      elements.forEach((element) => {
        const key = element.getAttribute("data-translation-key");
        const keys = key.split(/[\[\]]/);
        let translation;
        if (keys.length > 1) {
          translation = translations[keys[0]][parseInt(keys[1])];
        } else {
          translation = translations[key];
        }

        if (element.hasAttribute("placeholder")) {
          element.setAttribute("placeholder", translation);
        } else {
          element.innerHTML = translation;
        }
      });
    });
}

// Load translations when the page loads
loadTranslations("en"); // Default language