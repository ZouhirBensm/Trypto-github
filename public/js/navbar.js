var navbar = document.getElementById("bidblock-navbar");
var toggler = document.getElementById("navbar-toggler");
var reactDiv = document.getElementById("react-div");


// Function to handle navbar style based on scroll position
function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add("white");
  } else {
    navbar.classList.remove("white");
  }
}

// Apply the initial scroll position check when the page loads
window.addEventListener("load", function () {
  if (isHomePage()) {
    console.log("Is home page")
    handleNavbarScroll();
  } else {
    console.log("Is not home page")
    navbar.classList.add("white");
  }
});

// Toggle navbar on click
toggler.addEventListener("click", function (e) {
  e.preventDefault();
  navbar.classList.toggle("show");
});

// Adjust navbar class on scroll
if (isHomePage()) {
  window.addEventListener("scroll", handleNavbarScroll);
}

// Check if current page is homepage
function isHomePage() {
  return window.location.pathname === "/";
}
