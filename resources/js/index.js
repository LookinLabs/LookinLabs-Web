// Some carousel script here

document.getElementById("nav-toggle").addEventListener("click", function () {
  var navMenu = document.getElementById("nav-menu");
  if (navMenu.style.display === "none") {
    navMenu.style.display = "flex";
  } else {
    navMenu.style.display = "none";
  }
});
