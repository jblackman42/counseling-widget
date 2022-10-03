//CONTENT INFORMATION
const apiKey = 'AIzaSyDnvttkWFiDeIeaWTcU3B-BD0lJ41ef_AU';   // <-------- put api key here in quotes - 'API_KEY'
const cssLink = 'https://phc-widgets.s3.us-west-1.amazonaws.com/counseling-widget-styles.css';
const mapOrigin = { lat: 33.614977, lng: -112.152791 };
const locations = [
    {
        latLng: {lat: 33.614769, lng: -112.112512},
        title: "Pure Heart Church",
        specialties: ['Addiction'],
        phone: '(602) 866-8850',
        email: 'info@pureheart.org',
        addressLine: '14240 N 43rd Ave',
        city: 'Glendale',
        state: 'AZ',
        zip: '85306',
        website: 'https://www.pureheart.org'
    },
    {
        latLng: {lat: 33.624769, lng: -112.152802},
        title: "Pure Heart Church",
        specialties: ['Anxiety/Depression', 'cell phone repair'],
        phone: '(602) 866-8850',
        email: 'info@pureheart.org',
        addressLine: '14240 N 43rd Ave',
        city: 'Phoenix',
        state: 'AZ',
        zip: '85306',
        website: 'https://www.pureheart.org'
    },
    {
        latLng: {lat: 33.644769, lng: -112.112802},
        title: "Pure Heart Church",
        specialties: ['Family'],
        phone: '(602) 866-8850',
        email: 'info@pureheart.org',
        addressLine: '14240 N 43rd Ave',
        city: 'Glendale',
        state: 'AZ',
        zip: '85306',
        website: 'https://www.pureheart.org'
    },
    {
        latLng: {lat: 33.614769, lng: -112.152802},
        title: "Pure Heart Church",
        specialties: ['Family', 'Marriage', 'Trauma'],
        phone: '(602) 866-8850',
        email: 'info@pureheart.org',
        addressLine: '14240 N 43rd Ave',
        city: 'Chandler',
        state: 'AZ',
        zip: '85306',
        website: 'https://www.pureheart.org'
    }
]
//STYLING INFORMATION
const widgetWidth = '1000px';
const widgetPrimaryTextColor = '#000000'; //black
const locationBackgroundColor = '#eee';//light gray
const locationBorderColor = '#ccc'; //gray
const locationsTextColor = '#000000'; //black
const locationsButttonColor = '#13aa52'; //green
const locationsButttonTextColor = '#fff'; //white
const locationsLinkColor = '#3498db' //blue