// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", createMarkers);

function createMap(USGS) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> tributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "USGS All Earthquakes": USGS
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [lightmap,USGS]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

______________________________________________________________________________________
  // Pull the "stations" property off of response.data
  var features = response.data.features;

  // Initialize an array to hold bike markers
  var geometry = [];

  // Loop through the stations array
  for (var index = 0; index < features.length; index++) {
    var features = features[index];

    // For each station, create a marker and bind a popup with the station's name
    var geometry = L.marker([features.lat, features.lon])
      .bindPopup("<h3>" + features.name + "<h3><h3>Capacity: " + features.capacity + "<h3>");

    // Add the marker to the bikeMarkers array
    geometry.push(geometry);
  }

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(geometry));
}