
//____________________________________________________________________
// HORSES AND BURRO
//____________________________________________________________________

//COLOR STYLE
function getColor(d) {
  return d > 1000
    ? "#800026"
    : d > 500
    ? "#BD0026"
    : d > 200
    ? "#E31A1C"
    : d > 100
    ? "#FC4E2A"
    : d > 50
    ? "#FD8D3C"
    : d > 20
    ? "#FEB24C"
    : d > 10
    ? "#FED976"
    : "#FFEDA0";
}

function style(feature) {
  return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 0.1,
    color: "black",
    fillOpacity: 0,
  };
}

//HIGHLIGHT FEATURES

var Highlight = L.geoJson(statesData, { style, onEachFeature }).addTo(map);

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
  });

  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  function highlightFeature(e) {
    var StateHighlight = e.target;

    StateHighlight.setStyle({
      weight: 2,
      dashArray: "",
      opacity: 0.4,
    });

    StateHighlight.bringToFront();

    info.update(layer.feature.properties);
  }

  function resetHighlight(e) {
    Highlight.resetStyle(e.target);
    info.update();
  }
}

//CONTROL LAYER HORSES AND BURROS

var info = L.control({ position: "topleft" });

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
  this.update();
  return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  this._div.innerHTML =
    "<h4>State Name</h4>" +
    (props
      ? "<b>" + props.name + "</b><br />"
      : "Hover over a state");
};

info.addTo(map);

var legend = L.control({ position: "topleft", opacity: "0" });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend"),
    grades = [0, 100, 200, 500, 1000, 2000, 5000, 10000],
    labels = [];
  opacity = 0;
};