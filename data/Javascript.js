// map initialization
var map = L.map("map").setView([39.41253731856159, -111.73726997020877], 6);

//Esri tileLayer
var Esri_WorldGrayCanvas = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
    maxZoom: 16,
  }
);

// osm tileLayer
var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//Stamen tileLayer
var Stamen = L.tileLayer(
  "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}",
  {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: "abcd",
    minZoom: 0,
    maxZoom: 20,
    ext: "png",
  }
);

// Geo tileLayer
var GeoLayer = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  }
);

Esri_WorldGrayCanvas.addTo(map);

// marker
var myIcon = L.icon({
  iconUrl: "img/Cross.png",
  iconSize: [30, 30],
});

var myIcon2 = L.icon({
  iconUrl: "img/Flag.png",
  iconSize: [60, 60],
});

// GeoJSON Layer

var goatData = L.geoJson(goat, {
  onEachFeatures: function (feature, layer) {
    layer.bindPopup(goat);
  },
  style: {
    fillColor: "#7a1330",
    fillOpacity: "0.5",
    stroke: 0,
  },
}).addTo(map);

var horseData = L.geoJson(horse, {
  onEachFeatures: function (feature, layer) {
    layer.bindPopup(goat);
  },
  style: {
    fillColor: "#213e68",
    fillOpacity: 0.5,
    stroke: 0,
  },
}).addTo(map);

var forestData = L.geoJson(forest, {
  onEachFeatures: function (feature, layer) {
    layer.bindPopup(feature.propreties.type);
  },
  style: {
    fillColor: "#3f783b",
    fillOpacity: 0.3,
    stroke: 0,
  },
}).addTo(map);

// Layer control

var baseMaps = {
  Light: Esri_WorldGrayCanvas,
  GeoLayer: GeoLayer,
};

var overlayMaps = {
  "Goat and Sheep Data": goatData,
  "Wild Horse and Burro Data": horseData,
  Forest: forestData,
};
//Highlights

var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
  this.update();
  return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  this._div.innerHTML =
    "<h4>LAND USE in Western United States</h4>" +
    (props
      ? "<b>" +
        props.name +
        "</b><br />" +
        props.density +
        " people / mi<sup>2</sup>"
      : "Wild Horse/Burro Land compared to Goat/Sheep Land compared to National Forest Land");
};

info.addTo(map);

/*Legend specific*/
var legend = L.control({ position: "bottomleft" });

L.control
  .layers(baseMaps, overlayMaps, {
    position: "bottomright",
    collapsed: false,
  })
  .addTo(map);

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Land Use - USA</h4>";
  div.innerHTML +=
    '<i style="background: #b78390"></i><span>Wild Horse and Burro Land</span><br>';
  div.innerHTML +=
    '<i style="background: #8996ab"></i><span>Goat and Sheep Land</span><br>';
  div.innerHTML +=
    '<i style="background: #6d617c"></i><span>Overlay of Both Land</span><br>';
  div.innerHTML +=
    '<i style="background: #bccbba"></i><span>National Forest</span><br>';
  //div.innerHTML +=
  //'<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';

  return div;
};

legend.addTo(map);

L.control
  .scale({ imperial: false, maxWidth: 200, position: "topright" })
  .addTo(map);
