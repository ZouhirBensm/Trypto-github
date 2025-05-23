// import ROLE from '../../full-stack-libs/Types/Role'
// const ROLE = require("../../full-stack-libs/Types/Role")
// console.log(ROLE)


// console.log("--->", userId)

// Currently used
// Asks the client for location and centers, else defaults to Ottawa
let map, marker, autocomplete, geocoder








let getLatLng = function () {
  return new Promise(async function (resolve, reject) {

    // Setting defaults locality
    let lat, lng
    // Defaults to Ottawa
    lat = 45.4
    lng = -75.7

    switch (URL_) {
      case "/marketplace/makesell":
        // Overwrite default if User has a associated locality
        let response
        response = await getUsersAssociatedLocality()

        if (response.status == 200) {
          let json = await response.json()
          console.log(json)
          lat = json.lat
          lng = json.lng
        }
        break;
      case '/settings':
      case `/settings/${caseSettingsPage}`:
        if (selectedUser?.userassociatedlocalityID) {
          lat = selectedUser?.userassociatedlocalityID.geometry.lat
          lng = selectedUser?.userassociatedlocalityID.geometry.lng
        }
        break;
      default:
        break;
    }

    resolve([lat, lng])

  });
};

// async function initMap() {
// }


// Note: If any issues with the loaded locality, I might need to revert to deleting this &callback=initMap, and placing it's content in the IIFE
(async () => {
  let [lat, lng] = await getLatLng()
  
  window.lat = lat
  window.lng = lng
  
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




async function getUsersAssociatedLocality() {
  let response = await fetch(`/marketplace/associated-user-locality/${userId}`)
  console.log(response)

  if (response.status != 200) {
    let text = await response.text()
    console.error(text)
  }

  return response
}


// Client Locality Determination
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition((position) => {
//     lat = position.coords.latitude
//     lng = position.coords.longitude
//     resolve([lat, lng])
//   }, (error) => {
//     resolve([lat, lng])
//   });
// } else {
//   resolve([lat, lng])
// };