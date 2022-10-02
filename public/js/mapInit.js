let map;

// map = 5
map = new google.maps.Map(document.getElementById("the-map"), {
  // Ottawa
  center: { lat: 45.41, lng: -75.70 },
  zoom: 8,
});

window.map = map

console.log("Hello")