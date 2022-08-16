console.log("TOOOOGGGLLLEEEE!")

// TODO #102 Add touch event to slide main left nav bar
function toogleSideNav() {
  let sideNav = document.getElementsByClassName("sidebar-container")[0]
  console.log("toogle!", sideNav.style.display, sideNav.style.display=='')
  
  sideNav.style.display==''? sideNav.style.display = "none": null
  
  console.log(sideNav)
  if (sideNav.style.display === "none") {
    sideNav.style.display = "flex";
  } else {
    sideNav.style.display = "none";
  }

  let reactDiv = document.getElementById("react-div")

  console.log(reactDiv)

  if(sideNav.style.display == "flex") {
    console.log("disable all")
    reactDiv.classList.add("disable");

  } else {
    console.log("enable all")
    reactDiv.classList.remove("disable");
  }
}