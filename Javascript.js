
var map = L.map("map").setView([39.41253731856159, -111.73726997020877], 6);

//Esri tileLayer
var Esri_WorldGrayCanvas = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
    maxZoom: 16,
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

var forest = L.geoJson(forest, {
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
  "Goat Data": goatData,
  "Horse Data": horseData,
  "National Forest Data": forest,
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
    "<h4>LAND USE: Wild horse land vs Goat Land</h4>" +
    (props
      ? "<b>" +
        props.name +
        "</b><br />" +
        props.density +
        " people / mi<sup>2</sup>"
      : "Horse or Goat");
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
  div.innerHTML += "<h4>Tegnforklaring</h4>";
  div.innerHTML +=
    '<i style="background: #477AC2"></i><span>Wild Horse Land</span><br>';
  div.innerHTML +=
    '<i style="background: #448D40"></i><span>Goat Land</span><br>';
  div.innerHTML +=
    '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
  return div;
};

legend.addTo(map);

L.control
  .scale({ imperial: false, maxWidth: 200, position: "topright" })
  .addTo(map);
