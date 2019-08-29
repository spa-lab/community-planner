
// //
// // ComboBoxMapStory Object.
// //
// var ComboBoxMapStory = new function() {
//   this.aaa = "macintosh";
//   
//   //
//   // The InitialValues property is used to store all values needed initialy by ComboBoxMapStory. 
//   //
//   // var InitialValues = new function() {
//   //   
//   //   //
//   //   // The crs of the map.
//   //   //
//   //   var crs = new L.Proj.CRS('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs', {
//   //     resolutions: [2800, 1400, 700, 350, 175, 84, 42, 21, 11.2, 5.6, 2.8, 1.4, 0.7, 0.35, 0.14, 0.07]
//   //   });  
//   // }
//   // 
//   
//   this.Map = function() {
//     return L.map('map', {
//       //crs: crs,
//       zoomControl: true,
//       minZoom: 10,
//       maxZoom: 28
//     });
//   };
//   
//   //.fitBounds([[54.0574970429, -4.39095577214], [54.7124463981, -2.36672940204]]);
//   
//   
//   
// };



// var crs = new L.Proj.CRS('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs', {
//   resolutions: [2800, 1400, 700, 350, 175, 84, 42, 21, 11.2, 5.6, 2.8, 1.4, 0.7, 0.35, 0.14, 0.07]
// });
   
// Create a map zoomed in the Bootle area.
var map = L.map('map', {
  //crs: crs,
  zoomControl: true,
  minZoom: 10,
  maxZoom: 28
}).fitBounds([[54.0574970429, -4.39095577214], [54.7124463981, -2.36672940204]]);

// Add a sidebar to the right of the map.
var sidebar = L.control.sidebar('sidebar', {position: 'right'}).addTo(map);

// Create the OpenStreetMap baselayer. 
var baseLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors'
});

// // Create a grayscale version of the OpenStreetMap layer.
// var baseLayer = L.tileLayer.grayscale('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors'
// });  

// Create the baseLayers group.
var baseLayers = {
  "OpenStreetMap": baseLayer
};

// Add the baseLayer on to the map.
baseLayer.addTo(map);


// Get a list of layer names.
var layerNames = [
  "bootle-parish",
  "copeland",
  "copeland-oa-2011-data",
  "copeland-oa-population-2001-2011"
];

// ================================================================================

// Set the url of the layer.
var copelandOa2011Url = "http://localhost:8084/api/geolayer-getbyslug/" + layerNames[2];

var copelandOa2011Data = null;
var copelandOa2011Layer = null;

var s2 = "{\"applySymbology\" : \"function applySymbology(feature) { if (feature.properties.workhomepc >= 0.0 && feature.properties.workhomepc <= 2.0) { return { color: '#000000', weight: '1.04', dashArray: '', fillColor: '#ffffb2', opacity: '1.0', fillOpacity: '1.0' }; } if (feature.properties.workhomepc >= 2.0 && feature.properties.workhomepc <= 4.35) { return { color: '#000000', weight: '1.04', dashArray: '', fillColor: '#fed66d', opacity: '1.0', fillOpacity: '1.0' }; } if (feature.properties.workhomepc >= 4.35 && feature.properties.workhomepc <= 8.33) { return { color: '#000000', weight: '1.04', dashArray: '', fillColor: '#fda648', opacity: '1.0', fillOpacity: '1.0' }; } if (feature.properties.workhomepc >= 8.33 && feature.properties.workhomepc <= 13.75) { return { color: '#000000', weight: '1.04', dashArray: '', fillColor: '#f76c30', opacity: '1.0', fillOpacity: '1.0' }; } if (feature.properties.workhomepc >= 13.75 && feature.properties.workhomepc <= 22.5) { return { color: '#000000', weight: '1.04', dashArray: '', fillColor: '#e52f21',opacity: '1.0', fillOpacity: '1.0' }; } if (feature.properties.workhomepc >= 22.5 && feature.properties.workhomepc <= 32.86) { return { color: '#000000', weight: '1.04', dashArray: '', fillColor: '#bd0026', opacity: '1.0', fillOpacity: '1.0', }; } }\"}";

var s = "{  \"applySymbology\" : \"function applySymbology(feature) {    if (feature.properties.workhomepc >= 0.0 && feature.properties.workhomepc <= 2.0) {        return {            color: '#000000',            weight: '1.04',            dashArray: '',            fillColor: '#ffffb2',            opacity: '1.0',            fillOpacity: '1.0'        };    }    if (feature.properties.workhomepc >= 2.0 && feature.properties.workhomepc <= 4.35) {        return {            color: '#000000',            weight: '1.04',            dashArray: '',            fillColor: '#fed66d',            opacity: '1.0',            fillOpacity: '1.0'        };    }    if (feature.properties.workhomepc >= 4.35 && feature.properties.workhomepc <= 8.33) {        return {            color: '#000000',            weight: '1.04',            dashArray: '',            fillColor: '#fda648',            opacity: '1.0',            fillOpacity: '1.0'        };    }    if (feature.properties.workhomepc >= 8.33 && feature.properties.workhomepc <= 13.75) {        return {            color: '#000000',            weight: '1.04',            dashArray: '',            fillColor: '#f76c30',            opacity: '1.0',            fillOpacity: '1.0'        };    }    if (feature.properties.workhomepc >= 13.75 && feature.properties.workhomepc <= 22.5) {        return {            color: '#000000',            weight: '1.04',            dashArray: '',            fillColor: '#e52f21',            opacity: '1.0',            fillOpacity: '1.0'        };    }    if (feature.properties.workhomepc >= 22.5 && feature.properties.workhomepc <= 32.86) {        return {            color: '#000000',            weight: '1.04',            dashArray: '',            fillColor: '#bd0026',            opacity: '1.0',            fillOpacity: '1.0',        };    }}\"}";


var copelandOa2011Style = JSONfn.parse(s);

// $.get(copelandOa2011Url, function(data2) {
//   alert(data2.id);
  
  
//   // copelandOa2011Data = JSON.parse(data2.geoJsonData);
//   // 
//   // copelandOa2011Layer = L.geoJson(copelandOa2011Data, {
//   //   style: copelandOa2011Style.applySymbology 
//   // });
//   // 
//   // copelandOa2011Layer.addTo(map);
// });

// copelandOa2011Layer = L.geoJson(copelandOa2011Data, {
//   style: copelandOa2011Style.applyNaturalBreaksStyle 
// });
//   
// copelandOa2011Layer.addTo(map);

// 
// // ================================================================================
// 
// // Set the url of the Bootle Parish layer.
// var bootleParishUrl = "http://localhost:8084/api/geolayer-getbyslug/" + layerNames[0];
// 
// // Create the style for Bootle Parish.
// var bootleParishStyle = {
//   color: '#000000',
//   weight: '4',
//   dashArray: '',  
//   fillColor: '#40E0D0',
//   opacity: '1.0',
//   fillOpacity: '1.0'
// };
// 
// var bootleParishData = null;
// var bootleParishLayer = null;
// 
// // Get the Bootle Parish data from its REST endpoint and add it on the map. 
// $.get(bootleParishUrl, function(data1) {
//   bootleParishData = JSON.parse(data1.geoJsonData);
//   
//   bootleParishLayer = L.geoJson(bootleParishData, bootleParishStyle);
//   
//   bootleParishLayer.addTo(map);
// });











  
// bootleParishLayer = L.geoJson(bootleParishData, bootleParishStyle);
//   
// bootleParishLayer.addTo(map);


// var overlayLayers = {
//   "Copeland": copelandOa2011Layer
// };
//"BootleParish": bootleParishLayer,


// ================================================================================

// Add the baseLayers group and the overlayLayers group in the layer control.
// var layersControl = L.control.layers(baseLayers, overlayLayers);
// layersControl.addTo(map);


// var layersControl = L.control.layers(baseLayers, overlayLayers, {position: 'bottomleft'});
// layersControl.addTo(map);
















// ================================================================================


// 
// var style1 = {
//   color: '#000000',
//   weight: '1.04',
//   dashArray: '',
//   fillColor: '#bd0026',
//   opacity: '1.0',
//   fillOpacity: '0.6'
// };


// $.get(url, function(data) {
//   geoJsonData = JSON.parse(data.geoJsonData);
//   L.geoJson(geoJsonData, style1).addTo(map);
// });

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


// ========

///#region popup

        // function pop_shareworkingfromhome(feature, layer) {
        //     var popupContent = '<table><tr><th scope="row">OBJECTID</th><td>' + Autolinker.link(String(feature.properties['OBJECTID'])) + '</td></tr><tr><th scope="row">code</th><td>' + Autolinker.link(String(feature.properties['code'])) + '</td></tr><tr><th scope="row">label</th><td>' + Autolinker.link(String(feature.properties['label'])) + '</td></tr><tr><th scope="row">name</th><td>' + Autolinker.link(String(feature.properties['name'])) + '</td></tr><tr><th scope="row">hhtenall</th><td>' + Autolinker.link(String(feature.properties['hhtenall'])) + '</td></tr><tr><th scope="row">hhtenown</th><td>' + Autolinker.link(String(feature.properties['hhtenown'])) + '</td></tr><tr><th scope="row">hhtenownpc</th><td>' + Autolinker.link(String(feature.properties['hhtenownpc'])) + '</td></tr><tr><th scope="row">hhtownor</th><td>' + Autolinker.link(String(feature.properties['hhtownor'])) + '</td></tr><tr><th scope="row">hhtownorpc</th><td>' + Autolinker.link(String(feature.properties['hhtownorpc'])) + '</td></tr><tr><th scope="row">hhtownml</th><td>' + Autolinker.link(String(feature.properties['hhtownml'])) + '</td></tr><tr><th scope="row">hhtownmlpc</th><td>' + Autolinker.link(String(feature.properties['hhtownmlpc'])) + '</td></tr><tr><th scope="row">hhtshown</th><td>' + Autolinker.link(String(feature.properties['hhtshown'])) + '</td></tr><tr><th scope="row">hhtshownpc</th><td>' + Autolinker.link(String(feature.properties['hhtshownpc'])) + '</td></tr><tr><th scope="row">hhtsocr</th><td>' + Autolinker.link(String(feature.properties['hhtsocr'])) + '</td></tr><tr><th scope="row">hhtsocrpc</th><td>' + Autolinker.link(String(feature.properties['hhtsocrpc'])) + '</td></tr><tr><th scope="row">hhtsocrc</th><td>' + Autolinker.link(String(feature.properties['hhtsocrc'])) + '</td></tr><tr><th scope="row">hhtsocrcpc</th><td>' + Autolinker.link(String(feature.properties['hhtsocrcpc'])) + '</td></tr><tr><th scope="row">hhtsocro</th><td>' + Autolinker.link(String(feature.properties['hhtsocro'])) + '</td></tr><tr><th scope="row">hhtsocropc</th><td>' + Autolinker.link(String(feature.properties['hhtsocropc'])) + '</td></tr><tr><th scope="row">hhtpr</th><td>' + Autolinker.link(String(feature.properties['hhtpr'])) + '</td></tr><tr><th scope="row">hhtprpc</th><td>' + Autolinker.link(String(feature.properties['hhtprpc'])) + '</td></tr><tr><th scope="row">hhtpll</th><td>' + Autolinker.link(String(feature.properties['hhtpll'])) + '</td></tr><tr><th scope="row">hhtpllpc</th><td>' + Autolinker.link(String(feature.properties['hhtpllpc'])) + '</td></tr><tr><th scope="row">hhtpro</th><td>' + Autolinker.link(String(feature.properties['hhtpro'])) + '</td></tr><tr><th scope="row">hhtpropc</th><td>' + Autolinker.link(String(feature.properties['hhtpropc'])) + '</td></tr><tr><th scope="row">hhtrf</th><td>' + Autolinker.link(String(feature.properties['hhtrf'])) + '</td></tr><tr><th scope="row">hhtrfpc</th><td>' + Autolinker.link(String(feature.properties['hhtrfpc'])) + '</td></tr><tr><th scope="row">all_res</th><td>' + Autolinker.link(String(feature.properties['all_res'])) + '</td></tr><tr><th scope="row">age0_4</th><td>' + Autolinker.link(String(feature.properties['age0_4'])) + '</td></tr><tr><th scope="row">age0_4_pc</th><td>' + Autolinker.link(String(feature.properties['age0_4_pc'])) + '</td></tr><tr><th scope="row">age5_7</th><td>' + Autolinker.link(String(feature.properties['age5_7'])) + '</td></tr><tr><th scope="row">age5_7_pc</th><td>' + Autolinker.link(String(feature.properties['age5_7_pc'])) + '</td></tr><tr><th scope="row">age8_9</th><td>' + Autolinker.link(String(feature.properties['age8_9'])) + '</td></tr><tr><th scope="row">age8_9_pc</th><td>' + Autolinker.link(String(feature.properties['age8_9_pc'])) + '</td></tr><tr><th scope="row">age10_14</th><td>' + Autolinker.link(String(feature.properties['age10_14'])) + '</td></tr><tr><th scope="row">age10_14pc</th><td>' + Autolinker.link(String(feature.properties['age10_14pc'])) + '</td></tr><tr><th scope="row">age15</th><td>' + Autolinker.link(String(feature.properties['age15'])) + '</td></tr><tr><th scope="row">age15pc</th><td>' + Autolinker.link(String(feature.properties['age15pc'])) + '</td></tr><tr><th scope="row">age16_17</th><td>' + Autolinker.link(String(feature.properties['age16_17'])) + '</td></tr><tr><th scope="row">age16_17pc</th><td>' + Autolinker.link(String(feature.properties['age16_17pc'])) + '</td></tr><tr><th scope="row">age18_19</th><td>' + Autolinker.link(String(feature.properties['age18_19'])) + '</td></tr><tr><th scope="row">age18_19pc</th><td>' + Autolinker.link(String(feature.properties['age18_19pc'])) + '</td></tr><tr><th scope="row">age20_24</th><td>' + Autolinker.link(String(feature.properties['age20_24'])) + '</td></tr><tr><th scope="row">age20_24pc</th><td>' + Autolinker.link(String(feature.properties['age20_24pc'])) + '</td></tr><tr><th scope="row">age25_29</th><td>' + Autolinker.link(String(feature.properties['age25_29'])) + '</td></tr><tr><th scope="row">age25_29pc</th><td>' + Autolinker.link(String(feature.properties['age25_29pc'])) + '</td></tr><tr><th scope="row">age30_44</th><td>' + Autolinker.link(String(feature.properties['age30_44'])) + '</td></tr><tr><th scope="row">age30_44pc</th><td>' + Autolinker.link(String(feature.properties['age30_44pc'])) + '</td></tr><tr><th scope="row">age45_59</th><td>' + Autolinker.link(String(feature.properties['age45_59'])) + '</td></tr><tr><th scope="row">age45_59pc</th><td>' + Autolinker.link(String(feature.properties['age45_59pc'])) + '</td></tr><tr><th scope="row">age60_64</th><td>' + Autolinker.link(String(feature.properties['age60_64'])) + '</td></tr><tr><th scope="row">age60_64pc</th><td>' + Autolinker.link(String(feature.properties['age60_64pc'])) + '</td></tr><tr><th scope="row">age65_74</th><td>' + Autolinker.link(String(feature.properties['age65_74'])) + '</td></tr><tr><th scope="row">age65_74pc</th><td>' + Autolinker.link(String(feature.properties['age65_74pc'])) + '</td></tr><tr><th scope="row">age75_84</th><td>' + Autolinker.link(String(feature.properties['age75_84'])) + '</td></tr><tr><th scope="row">age75_84pc</th><td>' + Autolinker.link(String(feature.properties['age75_84pc'])) + '</td></tr><tr><th scope="row">age85_89</th><td>' + Autolinker.link(String(feature.properties['age85_89'])) + '</td></tr><tr><th scope="row">age85_89pc</th><td>' + Autolinker.link(String(feature.properties['age85_89pc'])) + '</td></tr><tr><th scope="row">age90_ao</th><td>' + Autolinker.link(String(feature.properties['age90_ao'])) + '</td></tr><tr><th scope="row">age90_aopc</th><td>' + Autolinker.link(String(feature.properties['age90_aopc'])) + '</td></tr><tr><th scope="row">mean_age</th><td>' + Autolinker.link(String(feature.properties['mean_age'])) + '</td></tr><tr><th scope="row">median_age</th><td>' + Autolinker.link(String(feature.properties['median_age'])) + '</td></tr><tr><th scope="row">alres16ov</th><td>' + Autolinker.link(String(feature.properties['alres16ov'])) + '</td></tr><tr><th scope="row">No_quali</th><td>' + Autolinker.link(String(feature.properties['No_quali'])) + '</td></tr><tr><th scope="row">Level_1</th><td>' + Autolinker.link(String(feature.properties['Level_1'])) + '</td></tr><tr><th scope="row">Level_2</th><td>' + Autolinker.link(String(feature.properties['Level_2'])) + '</td></tr><tr><th scope="row">Apprentice</th><td>' + Autolinker.link(String(feature.properties['Apprentice'])) + '</td></tr><tr><th scope="row">Level_3</th><td>' + Autolinker.link(String(feature.properties['Level_3'])) + '</td></tr><tr><th scope="row">Level_4</th><td>' + Autolinker.link(String(feature.properties['Level_4'])) + '</td></tr><tr><th scope="row">Other</th><td>' + Autolinker.link(String(feature.properties['Other'])) + '</td></tr><tr><th scope="row">lev_4pc</th><td>' + Autolinker.link(String(feature.properties['lev_4pc'])) + '</td></tr><tr><th scope="row">all_occ</th><td>' + Autolinker.link(String(feature.properties['all_occ'])) + '</td></tr><tr><th scope="row">mndirsen</th><td>' + Autolinker.link(String(feature.properties['mndirsen'])) + '</td></tr><tr><th scope="row">mndirsenpc</th><td>' + Autolinker.link(String(feature.properties['mndirsenpc'])) + '</td></tr><tr><th scope="row">profocc</th><td>' + Autolinker.link(String(feature.properties['profocc'])) + '</td></tr><tr><th scope="row">profoccpc</th><td>' + Autolinker.link(String(feature.properties['profoccpc'])) + '</td></tr><tr><th scope="row">asptec</th><td>' + Autolinker.link(String(feature.properties['asptec'])) + '</td></tr><tr><th scope="row">asptecpc</th><td>' + Autolinker.link(String(feature.properties['asptecpc'])) + '</td></tr><tr><th scope="row">adsecoc</th><td>' + Autolinker.link(String(feature.properties['adsecoc'])) + '</td></tr><tr><th scope="row">adsecocpc</th><td>' + Autolinker.link(String(feature.properties['adsecocpc'])) + '</td></tr><tr><th scope="row">skiltroc</th><td>' + Autolinker.link(String(feature.properties['skiltroc'])) + '</td></tr><tr><th scope="row">skiltrocpc</th><td>' + Autolinker.link(String(feature.properties['skiltrocpc'])) + '</td></tr><tr><th scope="row">closoc</th><td>' + Autolinker.link(String(feature.properties['closoc'])) + '</td></tr><tr><th scope="row">closocpc</th><td>' + Autolinker.link(String(feature.properties['closocpc'])) + '</td></tr><tr><th scope="row">salcsoc</th><td>' + Autolinker.link(String(feature.properties['salcsoc'])) + '</td></tr><tr><th scope="row">salcsocpc</th><td>' + Autolinker.link(String(feature.properties['salcsocpc'])) + '</td></tr><tr><th scope="row">prplmo</th><td>' + Autolinker.link(String(feature.properties['prplmo'])) + '</td></tr><tr><th scope="row">prplmopc</th><td>' + Autolinker.link(String(feature.properties['prplmopc'])) + '</td></tr><tr><th scope="row">elocc</th><td>' + Autolinker.link(String(feature.properties['elocc'])) + '</td></tr><tr><th scope="row">eloccpc</th><td>' + Autolinker.link(String(feature.properties['eloccpc'])) + '</td></tr><tr><th scope="row">allhealth</th><td>' + Autolinker.link(String(feature.properties['allhealth'])) + '</td></tr><tr><th scope="row">vghealth</th><td>' + Autolinker.link(String(feature.properties['vghealth'])) + '</td></tr><tr><th scope="row">ghealth</th><td>' + Autolinker.link(String(feature.properties['ghealth'])) + '</td></tr><tr><th scope="row">fairhealth</th><td>' + Autolinker.link(String(feature.properties['fairhealth'])) + '</td></tr><tr><th scope="row">badhealth</th><td>' + Autolinker.link(String(feature.properties['badhealth'])) + '</td></tr><tr><th scope="row">vbadhealth</th><td>' + Autolinker.link(String(feature.properties['vbadhealth'])) + '</td></tr><tr><th scope="row">dtdalalot</th><td>' + Autolinker.link(String(feature.properties['dtdalalot'])) + '</td></tr><tr><th scope="row">dtdalalit</th><td>' + Autolinker.link(String(feature.properties['dtdalalit'])) + '</td></tr><tr><th scope="row">dtdanl</th><td>' + Autolinker.link(String(feature.properties['dtdanl'])) + '</td></tr><tr><th scope="row">allhhsp</th><td>' + Autolinker.link(String(feature.properties['allhhsp'])) + '</td></tr><tr><th scope="row">nocenth</th><td>' + Autolinker.link(String(feature.properties['nocenth'])) + '</td></tr><tr><th scope="row">gascenth</th><td>' + Autolinker.link(String(feature.properties['gascenth'])) + '</td></tr><tr><th scope="row">elcenth</th><td>' + Autolinker.link(String(feature.properties['elcenth'])) + '</td></tr><tr><th scope="row">oilcenth</th><td>' + Autolinker.link(String(feature.properties['oilcenth'])) + '</td></tr><tr><th scope="row">solfcenth</th><td>' + Autolinker.link(String(feature.properties['solfcenth'])) + '</td></tr><tr><th scope="row">othcenth</th><td>' + Autolinker.link(String(feature.properties['othcenth'])) + '</td></tr><tr><th scope="row">twomcenth</th><td>' + Autolinker.link(String(feature.properties['twomcenth'])) + '</td></tr><tr><th scope="row">alcatdwt</th><td>' + Autolinker.link(String(feature.properties['alcatdwt'])) + '</td></tr><tr><th scope="row">hhspnores</th><td>' + Autolinker.link(String(feature.properties['hhspnores'])) + '</td></tr><tr><th scope="row">alcatactyp</th><td>' + Autolinker.link(String(feature.properties['alcatactyp'])) + '</td></tr><tr><th scope="row">detached</th><td>' + Autolinker.link(String(feature.properties['detached'])) + '</td></tr><tr><th scope="row">semidet</th><td>' + Autolinker.link(String(feature.properties['semidet'])) + '</td></tr><tr><th scope="row">terraced</th><td>' + Autolinker.link(String(feature.properties['terraced'])) + '</td></tr><tr><th scope="row">flat</th><td>' + Autolinker.link(String(feature.properties['flat'])) + '</td></tr><tr><th scope="row">alcatttw</th><td>' + Autolinker.link(String(feature.properties['alcatttw'])) + '</td></tr><tr><th scope="row">allemp</th><td>' + Autolinker.link(String(feature.properties['allemp'])) + '</td></tr><tr><th scope="row">home</th><td>' + Autolinker.link(String(feature.properties['home'])) + '</td></tr><tr><th scope="row">umlrtram</th><td>' + Autolinker.link(String(feature.properties['umlrtram'])) + '</td></tr><tr><th scope="row">train</th><td>' + Autolinker.link(String(feature.properties['train'])) + '</td></tr><tr><th scope="row">bus</th><td>' + Autolinker.link(String(feature.properties['bus'])) + '</td></tr><tr><th scope="row">taxi</th><td>' + Autolinker.link(String(feature.properties['taxi'])) + '</td></tr><tr><th scope="row">motorcycle</th><td>' + Autolinker.link(String(feature.properties['motorcycle'])) + '</td></tr><tr><th scope="row">carvan</th><td>' + Autolinker.link(String(feature.properties['carvan'])) + '</td></tr><tr><th scope="row">passcarvan</th><td>' + Autolinker.link(String(feature.properties['passcarvan'])) + '</td></tr><tr><th scope="row">bicycle</th><td>' + Autolinker.link(String(feature.properties['bicycle'])) + '</td></tr><tr><th scope="row">onfoot</th><td>' + Autolinker.link(String(feature.properties['onfoot'])) + '</td></tr><tr><th scope="row">othertran</th><td>' + Autolinker.link(String(feature.properties['othertran'])) + '</td></tr><tr><th scope="row">notempl</th><td>' + Autolinker.link(String(feature.properties['notempl'])) + '</td></tr><tr><th scope="row">wmaofh</th><td>' + Autolinker.link(String(feature.properties['wmaofh'])) + '</td></tr><tr><th scope="row">avdistkm</th><td>' + Autolinker.link(String(feature.properties['avdistkm'])) + '</td></tr><tr><th scope="row">alcatcvav</th><td>' + Autolinker.link(String(feature.properties['alcatcvav'])) + '</td></tr><tr><th scope="row">nocarvan</th><td>' + Autolinker.link(String(feature.properties['nocarvan'])) + '</td></tr><tr><th scope="row">onecarvan</th><td>' + Autolinker.link(String(feature.properties['onecarvan'])) + '</td></tr><tr><th scope="row">twocarvan</th><td>' + Autolinker.link(String(feature.properties['twocarvan'])) + '</td></tr><tr><th scope="row">threecarva</th><td>' + Autolinker.link(String(feature.properties['threecarva'])) + '</td></tr><tr><th scope="row">fourmorecv</th><td>' + Autolinker.link(String(feature.properties['fourmorecv'])) + '</td></tr><tr><th scope="row">sumcarvan</th><td>' + Autolinker.link(String(feature.properties['sumcarvan'])) + '</td></tr><tr><th scope="row">alcatea</th><td>' + Autolinker.link(String(feature.properties['alcatea'])) + '</td></tr><tr><th scope="row">eatotal</th><td>' + Autolinker.link(String(feature.properties['eatotal'])) + '</td></tr><tr><th scope="row">eiaretired</th><td>' + Autolinker.link(String(feature.properties['eiaretired'])) + '</td></tr><tr><th scope="row">age0_15_pc</th><td>' + Autolinker.link(String(feature.properties['age0_15_pc'])) + '</td></tr><tr><th scope="row">agepl65pc</th><td>' + Autolinker.link(String(feature.properties['agepl65pc'])) + '</td></tr><tr><th scope="row">mdsppc</th><td>' + Autolinker.link(String(feature.properties['mdsppc'])) + '</td></tr><tr><th scope="row">bvbhpc</th><td>' + Autolinker.link(String(feature.properties['bvbhpc'])) + '</td></tr><tr><th scope="row">dtdalpc</th><td>' + Autolinker.link(String(feature.properties['dtdalpc'])) + '</td></tr><tr><th scope="row">detachedpc</th><td>' + Autolinker.link(String(feature.properties['detachedpc'])) + '</td></tr><tr><th scope="row">eiaretpc</th><td>' + Autolinker.link(String(feature.properties['eiaretpc'])) + '</td></tr><tr><th scope="row">flatpc</th><td>' + Autolinker.link(String(feature.properties['flatpc'])) + '</td></tr><tr><th scope="row">nocenthpc</th><td>' + Autolinker.link(String(feature.properties['nocenthpc'])) + '</td></tr><tr><th scope="row">hspnoresp</th><td>' + Autolinker.link(String(feature.properties['hspnoresp'])) + '</td></tr><tr><th scope="row">nocarvanpc</th><td>' + Autolinker.link(String(feature.properties['nocarvanpc'])) + '</td></tr><tr><th scope="row">carvanpc</th><td>' + Autolinker.link(String(feature.properties['carvanpc'])) + '</td></tr><tr><th scope="row">semidetpc</th><td>' + Autolinker.link(String(feature.properties['semidetpc'])) + '</td></tr><tr><th scope="row">terracedpc</th><td>' + Autolinker.link(String(feature.properties['terracedpc'])) + '</td></tr><tr><th scope="row">workhomepc</th><td>' + Autolinker.link(String(feature.properties['workhomepc'])) + '</td></tr><tr><th scope="row">solfcnthpc</th><td>' + Autolinker.link(String(feature.properties['solfcnthpc'])) + '</td></tr><tr><th scope="row">Shape_Leng</th><td>' + Autolinker.link(String(feature.properties['Shape_Leng'])) + '</td></tr><tr><th scope="row">Shape_Area</th><td>' + Autolinker.link(String(feature.properties['Shape_Area'])) + '</td></tr></table>';
        //     layer.bindPopup(popupContent);
        // }
///#endregion


// function applyNaturalBreaksStyle(feature) {
//   if (feature.properties.workhomepc >= 0.0 && feature.properties.workhomepc <= 2.0) {
//     return {
//       color: '#000000',
//       weight: '1.04',
//       dashArray: '',
//       fillColor: '#ffffb2',
//       opacity: '1.0',
//       fillOpacity: '1.0',
//     };
//   }
//   
//   if (feature.properties.workhomepc >= 2.0 && feature.properties.workhomepc <= 4.35) {
//     return {
//       color: '#000000',
//       weight: '1.04',
//       dashArray: '',
//       fillColor: '#fed66d',
//       opacity: '1.0',
//       fillOpacity: '1.0',
//     };
//   }
//   
//   if (feature.properties.workhomepc >= 4.35 && feature.properties.workhomepc <= 8.33) {
//     return {
//       color: '#000000',
//       weight: '1.04',
//       dashArray: '',
//       fillColor: '#fda648',
//       opacity: '1.0',
//       fillOpacity: '1.0',
//     };
//   }
//   if (feature.properties.workhomepc >= 8.33 && feature.properties.workhomepc <= 13.75) {
//     return {
//       color: '#000000',
//       weight: '1.04',
//       dashArray: '',
//       fillColor: '#f76c30',
//       opacity: '1.0',
//       fillOpacity: '1.0',
//     };
//   }
//   
//   if (feature.properties.workhomepc >= 13.75 && feature.properties.workhomepc <= 22.5) {
//     return {
//       color: '#000000',
//       weight: '1.04',
//       dashArray: '',
//       fillColor: '#e52f21',
//       opacity: '1.0',
//       fillOpacity: '1.0',
//     };
//   }
//   
//   if (feature.properties.workhomepc >= 22.5 && feature.properties.workhomepc <= 32.86) {
//     return {
//       color: '#000000',
//       weight: '1.04',
//       dashArray: '',
//       fillColor: '#bd0026',
//       opacity: '1.0',
//       fillOpacity: '1.0',
//     };
//   }
// };
// 
// var testObj = {
//   applyNaturalBreaksStyle : function(feature) {
//     return {
//       color: '#000000',
//       weight: '1.04',
//       dashArray: '',
//       fillColor: '#ffffb2',
//       opacity: '1.0',
//       fillOpacity: '1.0',
//     };
//   }
// };

// var str = JSONfn.stringify(testObj);
// console.log(str);

// var s = "{\"applyNaturalBreaksStyle\" : \"function applyNaturalBreaksStyle(feature) {   if (feature.properties.workhomepc >= 0.0 && feature.properties.workhomepc <= 2.0) {     return {       color: '#000000',       weight: '1.04',       dashArray: '',       fillColor: '#ffffb2',       opacity: '1.0',       fillOpacity: '1.0',     };   }      if (feature.properties.workhomepc >= 2.0 && feature.properties.workhomepc <= 4.35) {     return {       color: '#000000',       weight: '1.04',       dashArray: '',       fillColor: '#fed66d',       opacity: '1.0',       fillOpacity: '1.0',     };   }      if (feature.properties.workhomepc >= 4.35 && feature.properties.workhomepc <= 8.33) {     return {       color: '#000000',       weight: '1.04',       dashArray: '',       fillColor: '#fda648',       opacity: '1.0',       fillOpacity: '1.0',     };   }   if (feature.properties.workhomepc >= 8.33 && feature.properties.workhomepc <= 13.75) {     return {       color: '#000000',       weight: '1.04',       dashArray: '',       fillColor: '#f76c30',       opacity: '1.0',       fillOpacity: '1.0',     };   }      if (feature.properties.workhomepc >= 13.75 && feature.properties.workhomepc <= 22.5) {     return {       color: '#000000',       weight: '1.04',       dashArray: '',       fillColor: '#e52f21',       opacity: '1.0',       fillOpacity: '1.0',     };   }      if (feature.properties.workhomepc >= 22.5 && feature.properties.workhomepc <= 32.86) {     return {       color: '#000000',       weight: '1.04',       dashArray: '',       fillColor: '#bd0026',       opacity: '1.0',       fillOpacity: '1.0',     };   } }\"}";

// var s = "{\"applyNaturalBreaksStyle\" : \"function applyNaturalBreaksStyle(feature) { if (feature.properties.workhomepc >= 0.0 && feature.properties.workhomepc <= 2.0) { return { color: '#000000', weight: '1.04', dashArray: '', fillColor: '#ffffb2', opacity: '1.0', fillOpacity: '0.6' }; } if (feature.properties.workhomepc >= 2.0 && feature.properties.workhomepc <= 4.35) { return { color: '#000000', weight: '1.04', dashArray: '', fillColor: '#fed66d', opacity: '1.0', fillOpacity: '0.6' }; } if (feature.properties.workhomepc >= 4.35 && feature.properties.workhomepc <= 8.33) { return { color: '#000000', weight: '1.04', dashArray: '', fillColor: '#fda648', opacity: '1.0', fillOpacity: '0.6' }; } if (feature.properties.workhomepc >= 8.33 && feature.properties.workhomepc <= 13.75) { return { color: '#000000', weight: '1.04', dashArray: '', fillColor: '#f76c30', opacity: '1.0', fillOpacity: '0.6' }; } if (feature.properties.workhomepc >= 13.75 && feature.properties.workhomepc <= 22.5) { return { color: '#000000', weight: '1.04', dashArray: '', fillColor: '#e52f21',opacity: '1.0', fillOpacity: '0.6' }; } if (feature.properties.workhomepc >= 22.5 && feature.properties.workhomepc <= 32.86) { return { color: '#000000', weight: '1.04', dashArray: '', fillColor: '#bd0026', opacity: '1.0', fillOpacity: '0.6', }; } }\"}";
// 
// var testObj = JSONfn.parse(s);
// 
// $.get(url, function(data) {
//   geoJsonData = JSON.parse(data.geoJsonData);
//   L.geoJson(geoJsonData, {
//     style: testObj.applyNaturalBreaksStyle 
//   }).addTo(map);
// });


// var kvJson = "{\"name\" : \"houses\", \"f\" : \"function applyNaturalBreaksStyle(feature) {  if (feature.properties.workhomepc >= 0.0 && feature.properties.workhomepc <= 2.0) {    return {      color: '#000000',      weight: '1.04',      dashArray: '',      fillColor: '#ffffb2',      opacity: '1.0',      fillOpacity: '1.0',    };  }    if (feature.properties.workhomepc >= 2.0 && feature.properties.workhomepc <= 4.35) {    return {      color: '#000000',      weight: '1.04',      dashArray: '',      fillColor: '#fed66d',      opacity: '1.0',      fillOpacity: '1.0',    };  }    if (feature.properties.workhomepc >= 4.35 && feature.properties.workhomepc <= 8.33) {    return {      color: '#000000',      weight: '1.04',      dashArray: '',      fillColor: '#fda648',      opacity: '1.0',      fillOpacity: '1.0',    };  }  if (feature.properties.workhomepc >= 8.33 && feature.properties.workhomepc <= 13.75) {    return {      color: '#000000',      weight: '1.04',      dashArray: '',      fillColor: '#f76c30',      opacity: '1.0',      fillOpacity: '1.0',    };  }    if (feature.properties.workhomepc >= 13.75 && feature.properties.workhomepc <= 22.5) {    return {      color: '#000000',      weight: '1.04',      dashArray: '',      fillColor: '#e52f21',      opacity: '1.0',      fillOpacity: '1.0',    };  }    if (feature.properties.workhomepc >= 22.5 && feature.properties.workhomepc <= 32.86) {    return {      color: '#000000',      weight: '1.04',      dashArray: '',      fillColor: '#bd0026',      opacity: '1.0',      fillOpacity: '1.0',    };  }};\"}";
// 
// var fString = "function applyNaturalBreaksStyle(feature) {  if (feature.properties.workhomepc >= 0.0 && feature.properties.workhomepc <= 2.0) {    return {      color: '#000000',      weight: '1.04',      dashArray: '',      fillColor: '#ffffb2',      opacity: '1.0',      fillOpacity: '1.0',    };  }    if (feature.properties.workhomepc >= 2.0 && feature.properties.workhomepc <= 4.35) {    return {      color: '#000000',      weight: '1.04',      dashArray: '',      fillColor: '#fed66d',      opacity: '1.0',      fillOpacity: '1.0',    };  }    if (feature.properties.workhomepc >= 4.35 && feature.properties.workhomepc <= 8.33) {    return {      color: '#000000',      weight: '1.04',      dashArray: '',      fillColor: '#fda648',      opacity: '1.0',      fillOpacity: '1.0',    };  }  if (feature.properties.workhomepc >= 8.33 && feature.properties.workhomepc <= 13.75) {    return {      color: '#000000',      weight: '1.04',      dashArray: '',      fillColor: '#f76c30',      opacity: '1.0',      fillOpacity: '1.0',    };  }    if (feature.properties.workhomepc >= 13.75 && feature.properties.workhomepc <= 22.5) {    return {      color: '#000000',      weight: '1.04',      dashArray: '',      fillColor: '#e52f21',      opacity: '1.0',      fillOpacity: '1.0',    };  }    if (feature.properties.workhomepc >= 22.5 && feature.properties.workhomepc <= 32.86) {    return {      color: '#000000',      weight: '1.04',      dashArray: '',      fillColor: '#bd0026',      opacity: '1.0',      fillOpacity: '1.0',    };  }};";

// 
// var fString = "function applyStyle(feature) { return {color: '#000000', weight: '1.04', dashArray: '', fillColor: '#ffffb2', opacity: '1.0', fillOpacity: '1.0'}; }; applyStyle(feature)";




// var StyleFunctions = {
//   applyNaturalBreaksStyle : function(feature) {
//     var func = "function applyStyle(feature) { return {color: '#000000', weight: '1.04', dashArray: '', fillColor: '#ffffb2', opacity: '1.0', fillOpacity: '1.0'}; }; applyStyle(feature)";
//     eval(func);
//   }
// };
// 
// $.get(url, function(data) {
//   geoJsonData = JSON.parse(data.geoJsonData);
//   L.geoJson(geoJsonData, {
//     style: StyleFunctions.applyNaturalBreaksStyle
//   }).addTo(map);
// });



// var json_shareworkingfromhomeJSON = new L.geoJson(json_shareworkingfromhome, {
//   onEachFeature: pop_shareworkingfromhome,
//   style: doStyleshareworkingfromhome
// });
// 
// layerOrder[layerOrder.length] = json_shareworkingfromhomeJSON;
// bounds_group.addLayer(json_shareworkingfromhomeJSON);






