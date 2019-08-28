
var map = L.map('map', {
  zoomControl: true, maxZoom: 28, minZoom: 1
}).fitBounds([[54.0574970429, -4.39095577214], [54.7124463981, -2.36672940204]]);

var basemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 28
});

basemap.addTo(map);

var style1 = {
  color: '#000000',
  weight: '1.04',
  dashArray: '',
  fillColor: '#bd0026',
  opacity: '1.0',
  fillOpacity: '0.6'
};

var layerNames = [
  "bootle-parish",
  "copeland",
  "copeland-oa-2011-data",
  "copeland-oa-population-2001-2011"
];

//
// Get data from mongodb
//
var url = "http://localhost:8084/api/geolayer-getbyslug/" + layerNames[3];

var geoJsonData = null;

$.get(url, function(data) {
  geoJsonData = JSON.parse(data.geoJsonData);
  L.geoJson(geoJsonData, style1).addTo(map);
});


//
// Get data from geoserver
//
// var url = "http://maps.humanities.manchester.ac.uk:8090/geoserver/bootle/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=bootle:epsg-27700-bootle-parish&maxFeatures=50&outputFormat=application%2Fjson"; 
// 
// $.get(url, function(data) {
//   L.geoJson(data, style1).addTo(map);
// });



// 
// // Assign handlers immediately after making the request,
// // and remember the jqxhr object for this request
// var jqxhr = $.get( "example.php", function() {
//   alert( "success" );
// })
//   .done(function() {
//     alert( "second success" );
//   })
//   .fail(function() {
//     alert( "error" );
//   })
//   .always(function() {
//     alert( "finished" );
//   });
//  
// // Perform other work here ...
//  
// // Set another completion function for the request above
// jqxhr.always(function() {
//   alert( "second finished" );
// });



//layer.addData(geoJsonData);
//layer.addData(ggg, style1);

// L.geoJson(ggg, {
//     style: style1
// }).addTo(map);

// var geoJson = new L.geoJson(geoJsonData, {
//   onEachFeature: pop_populationchange0111,
//   style: doStylepopulationchange0111
// });
//layerOrder[layerOrder.length] = json_populationchange0111JSON;
//bounds_group.addLayer(json_populationchange0111JSON);




