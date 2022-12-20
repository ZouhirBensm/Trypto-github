// Currently used
// Asks the client for location and centers, else defaults to Ottawa
let map, marker, autocomplete, geocoder

let asyncFunction = function() {
  return new Promise(function(resolve, reject) {
    
    let lat, lng
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude
        lng = position.coords.longitude
        resolve([lat, lng])
      }, (error) => {
        // Defaults to Ottawa
        lat = 45.41
        lng = -75.70
        resolve([lat, lng])
      });
    } else {  
      // Defaults to Ottawa
      lat = 45.41
      lng = -75.70
      resolve([lat, lng])
    };

  });
};


(async ()=>{

  let [lat, lng] = await asyncFunction()

  map = new google.maps.Map(document.getElementById("the-map"), {
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
  };
  
  autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete-select'), options);
  
  geocoder = new google.maps.Geocoder()
  
  
  
  window.map = map
  window.marker = marker
  window.autocomplete = autocomplete
  window.geocoder = geocoder
})();

