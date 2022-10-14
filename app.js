
let parsedData = [];
let data = {
    max: 10,
    data: []
}
const cfg = {
    
    "radius": 2,
    "maxOpacity": 0.8,
    "scaleRadius": true,
    "useLocalExtrema": false,
    "blur": 0.75
 
};

const heatmapLayer = new HeatmapOverlay(cfg);

async function populate() {

    const requestURL = 'https://alyssa-quinney.com/pchop/flightData.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const flightData = await response.json();

    parseData(flightData);
    data.data = parsedData;
    heatmapLayer.setData(data);
}



function parseData(data){
    data.forEach(d => {
        let dataPoint = {};
        let lat = d.lat ? d.lat : 0;
        let lng = d.lon ? d.lon : 0;
        
        dataPoint.lat = parseFloat(lat);
        dataPoint.lng = parseFloat(lng);
       
        dataPoint.value = 5;
       
        parsedData.push(dataPoint);
        
    });
    
}

populate();

const baseLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

const map = new L.map('map', {
    center: new L.LatLng(51.03617562175083, -114.06174784673107),
    zoom: 11,
    layers: [baseLayer, heatmapLayer]
});






