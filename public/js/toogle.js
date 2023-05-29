// console.log("TOOOOGGGLLLEEEE!")

// TODO #102 Add touch event to slide main left nav bar
function toogleSideNav() {
  let sideNav = document.getElementsByClassName("sidebar-container")[0]
  
  sideNav.style.display==''? sideNav.style.display = "none": null
  
  console.log("toogle!", sideNav.style.display, sideNav.style.display=='')

  console.log(sideNav)
  if (sideNav.style.display === "none") {
    sideNav.style.display = "flex";
  } else {
    sideNav.style.display = "none";
  }


  let reactDiv = document.getElementById("react-div")
  let erroBox = document.getElementsByClassName("error-box")[0]

  // Work with errorBox if present else reactDiv
  // errorBox is sometimes the main wrapper to disable sometimes
  let elementToDisableEnable = erroBox || reactDiv

  console.log(reactDiv, erroBox, elementToDisableEnable)

  if(sideNav.style.display == "flex") {
    console.log("disable all")
    elementToDisableEnable.classList.add("disable");

  } else {
    console.log("enable all")
    elementToDisableEnable.classList.remove("disable");
  }
}