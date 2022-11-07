let map, marker, autocomplete, geocoder
let lat = 45.41, lng = -75.70

// map = 5
map = new google.maps.Map(document.getElementById("the-map"), {
  // Ottawa
  center: { lat: lat, lng: lng },
  zoom: 8,
});

marker = new google.maps.Marker({
  position: { lat: lat, lng: lng },
  map,
  title: "Hello World!",
  draggable: true,
});


let options = {
  componentRestrictions: { country: ["us", "ca"] },
  fields: ["geometry"],
  strictBounds: false,
  types: ["address"],
  position: { lat: lat, lng: lng },
};

autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete-select'), options);


geocoder = new google.maps.Geocoder()



window.map = map
window.marker = marker
window.autocomplete = autocomplete
window.geocoder = geocoder