// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
script.async = true;

let map;
// Attach your callback function to the `window` object
window.initMap = function(filteredLocations) {
  // JS API is loaded and available
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 33.614977, lng: -112.152791 },
    zoom: 10,
    mapTypeControl: false,
    streetViewControl: false
  });

  //if filtered locations are passed in use those for pins instead of the list of all locations
  const mapLocations = filteredLocations ? filteredLocations : locations;

  const infoWindow = new google.maps.InfoWindow();
  //load all pins on the map
  for (let i = 0; i < mapLocations.length; i ++) {
    const {latLng, title, specialties} = mapLocations[i];

    const titleElem = `
        <div class="marker-title">
            <h1>${title}</h1>
            <div class="marker-info">
                <p class="marker-info-label">Specialties:</p>
                <p>${specialties.map(specialty => specialty).join(', ')}</p>
            </div>
        </div>
    `

    const marker = new google.maps.Marker({
        position: latLng,
        map,
        title: titleElem,
        label: `${i + 1}`
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

//funcion which zooms the map on the point of the location when you use the 'veiw on map' button
const zoomOnPoint = (lat, lng) => {
    map.setCenter({lat: lat, lng: lng})
    map.setZoom(18)
    // map.setCenter(new GLatLng(lat, lon), );
}

//function to list all the locations so it can be updated by running the function
const locationsListDOM = document.getElementById('locations-list');
const loadLocationsList = (locations) => {

    locationsListDOM.innerHTML = locations.map((location, i) => {
        const {latLng, title, specialties, phone, email, addressLine, city, state, zip, website} = location;
        return `
            <li class="location-container">
                <div class="header">
                    <h1>${i + 1}. ${title}</h1>
                    <button class="btn" onclick="zoomOnPoint(${latLng.lat}, ${latLng.lng})">View On Map</button>
                </div>
                <div class="info-container">
                    <p class="label">Specialties</p>
                    <p>${specialties.map(specialty => specialty).join(', ')}</p>
                </div>
                <div class="info-container">
                    <p class="label">Contact Phone</p>
                    <a class="link" href="tel:${phone}">${phone}</a>
                </div>
                <div class="info-container">
                    <p class="label">Contact Email</p>
                    <a class="link" href="mailto:${email}">${email}</a>
                </div>
                <div class="info-container">
                    <p class="label">Address</p>
                    <p>${addressLine}</p>
                    <p>${city}, ${state} ${zip}</p>
                </div>
                <div class="info-container">
                    <p class="label">Website</p>
                    <a class="link" href="${website}">${website}</a>
                </div>
            </li>
        `
    }).join('')
}
loadLocationsList(locations);

//get cities and specialties from locations and make them filter options in the select dropdown menu
const citySelectDOM = document.getElementById('city-select');
const specialtySelectDOM = document.getElementById('specialty-select');

const allCities = [...new Set(locations.map(location => location.city))]
let allSpecialties = [];
locations.forEach(location => allSpecialties = [... new Set(allSpecialties.concat(location.specialties))])

const citySelectHTML = allCities.map(city => {
    return `
<option value="${city}">${city}</option>
    `
})
citySelectHTML.unshift(`<option value="0">All</option>`)
citySelectDOM.innerHTML = citySelectHTML.join('')

const specialtySelectHTML = allSpecialties.map(specialty => {
    return `
<option value="${specialty}">${specialty}</option>
    `
})
specialtySelectHTML.unshift(`<option value="0">All</option>`)
specialtySelectDOM.innerHTML = specialtySelectHTML.join('')

//runs on the change of the select inputs
//edits the list of locations, changes the pins on the map to match the list below
const setFilter = () => {
    const city = citySelectDOM.value;
    const specialty = specialtySelectDOM.value;
    
    let filteredLocations;

    if (city == 0 && specialty == 0) {
        //no filters
        filteredLocations = locations;
    } else if (city == 0 && specialty) {
        //only specialty filter
        filteredLocations = locations.filter(location => location.specialties.includes(specialty));
    } else if (city && specialty == 0) {
        //only city filter
        filteredLocations = locations.filter(location => location.city == city);
    } else {
        //both city and specialty filter
        filteredLocations = locations.filter(location => location.city == city && location.specialties.includes(specialty));
    }

    loadLocationsList(filteredLocations)
    initMap(filteredLocations)
}

//SETTING COLORS FROM credentials.js
const counselingWidget = document.getElementById('counseling-widget');
counselingWidget.style.width = widgetWidth;
counselingWidget.style.color = widgetPrimaryTextColor;

const locationsDOM = document.querySelectorAll('.location-container');
locationsDOM.forEach(elem => {
    elem.style.backgroundColor = locationBackgroundColor;
    elem.style.borderColor = locationBorderColor;
    elem.style.color = locationsTextColor;
})

const locationsLinksDOM = document.querySelectorAll('.link');
locationsLinksDOM.forEach(elem => {
    elem.style.color = locationsLinkColor;
})

const locationsButtonsDOM = document.querySelectorAll('.btn');
locationsButtonsDOM.forEach(elem => {
    elem.style.backgroundColor = locationsButttonColor;
    elem.style.borderColor = locationsButttonColor;
    elem.style.color = locationsButttonTextColor;
})