// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
script.async = true;

let map;
// Attach your callback function to the `window` object
window.initMap = function() {
  // JS API is loaded and available
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.614977, lng: -112.152791 },
    zoom: 10,
  });

  const infoWindow = new google.maps.InfoWindow();
  //load all 
  for (let i = 0; i < locations.length; i ++) {
    const {latLng, title} = locations[i];

    const marker = new google.maps.Marker({
        position: latLng,
        map,
        title: title,
        label: `${i + 1}`,
        animation: google.maps.Animation.DROP
    })
    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(marker.getTitle());
        infoWindow.open(marker.getMap(), marker);
    });
  }
};

// Append the 'script' element to 'head'
document.head.appendChild(script);

const locationsListDOM = document.getElementById('locations-list');
locationsListDOM.innerHTML = locations.map(location => {
    const {title, specialties, phone, email, addressLine, city, state, zip, website} = location;
    return `
        <li>
            <h1>${title}</h1>
            <div class="info-container">
                <p class="label">Specialties</p>
                <p>${specialties.map(specialty => specialty).join(', ')}</p>
            </div>
            <div class="info-container">
                <p class="label">Contact Phone</p>
                <a href="tel:${phone}">${phone}</a>
            </div>
            <div class="info-container">
                <p class="label">Contact Email</p>
                <a href="mailto:${email}">${email}</a>
            </div>
            <div class="info-container">
                <p class="label">Address</p>
                <p>${addressLine}</p>
                <p>${city}, ${state} ${zip}</p>
            </div>
            <div class="info-container">
                <p class="label">Website</p>
                <a href="${website}">${website}</a>
            </div>
        </li>
    `
}).join('')