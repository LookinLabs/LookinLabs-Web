// EmailJS
(function () {
  emailjs.init("ySaIap3hTf1eHrMKa");
})();

// Navbar Toggler
document.getElementById('navbar-toggler').addEventListener('click', function () {
  var menu = document.getElementById('mobile-menu');
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
});

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
    } else {
      // One or both checkboxes are not checked, show an error message
      document.getElementById("terms-banner").classList.remove("hidden");
    }
  });

