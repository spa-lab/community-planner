
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
//  
//  Name:            plan.js [/public/js]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 10/05/2016.
// 
//  Description:     The client side script of the plan page which provides the
//                   functionality for a user to deal with planning projects.
// 
//  WARNING:         Make sure you change the value of the host property of the
//                   object API. Should be maps.humanities.manchester.ac.uk
// ================================================================================


// ================================================================================
//   Singleton Objects

/**
 * 
 * The models used by the web page. 
 */
var PlanningModels = {
  
  /**
   * The device type used to access the web page.
   */
  deviceType : null,
  
  /**
   * The currently logged in user.
   */
  loggedInUser : null,
  
  /**
   * The preferred language used when locale is needed.
   * The default value is null, but it will be loaded once the document is ready.
   */
  language: null,
  
  /**
   * The preferred options used to format a date. (Usually for page rendering). 
   */
  dateFormatOptions: {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  },
  
  /**
   * The preferred options used to format a datetime. (Usually for page rendering).
   */
  dateTimeFormatOptions: {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit' 
  },
  
  /**
   * The list of planning project names (plus id, slug and description).
   */
  projectNamesListModel : null,
  
  /**
   * The list of areas of interest of the planning projects.
   */
  projectAOIsListModel : null,
  
  /**
   * The list of areas of interest in a GeoJSON feature collection.
   */
  projectAOIsFcModel : {
    type : "FeatureCollection",
    features : []
  },
  
  /**
   * The GeoLayer definition of planning projects areas of interest. 
   */
  projectAOIsDefinitionModel : null,
  
  /**
   * The current project model.
   */
  currentProjectModel : null,
  
  /**
   * The slug of the currently selected planning project in the list of available projects. 
   */
  currentProjectSlug : null,
  
  /**
   * The sorted geolayers is used to hold the geolayers in the order that are rendered on the map.
   */
  sortedGeoLayers : [],
  
  /**
   * The current set of comments displayed in the web page.
   */
  currentProjectPlanCommentsModel : null,
  
  /**
   * The list of comments' areas of interest in a GeoJSON feature collection.
   */
  commentsAOIsFcModel: {
    type : "FeatureCollection",
    features : []
  },
    
  /**
   * The comment to be posted.
   */
  commentToPost: null,
  
  /**
   * The GeoJSON object associated with the comment to be posted.
   */
  commentJsonToPost: null,
  
  /**
   * The comment that has been created.
   */
  commentCreated: null,
  
  /**
   * The maximum length of a comment.
   */
  maxCommentLength: 5000, // Change the postCommentTextArea maxlength in templates/views/plan.hbs
  
  /**
   * The maximum length of the planning proposal's markdown content.
   */
  maxProposalMarkdownLength: 50000
  
};

/**
 * The planning project proposal of a user.
 */
var PlanningProposal = {
  
  /**
   * The name of the planning proposal.
   */
  name : null,
  
  /**
   * The description of the planning propsoal.
   */
  description : null,
  
  /**
   * The are of interest of the planning proposal.
   */
  areaOfInterest : null,
  
  /**
   * The files of the planning proposal.
   */
  files : [],
  
  /**
   * The planning text of the planning proposal.
   */
  markdownText : null
  
};

/**
 * Holds all the objects related to spatial operations.
 */
var Spatial = {
  
  /**
   * The member variables of thsi application.
   */
  Members: {
    
    /**
     * The coordinate reference system of the map. 
     */ 
    //crs:
    
    /**
     * The minimum zoom of the map.
     */
    minZoom: 10,
    
    /**
     * The maximum zoom of the map.
     */
    maxZoom: 28,
    
    /**
     * The initial southwest corner of the map.
     */
    initialSouthWest: L.latLng(54.0574970429, -4.39095577214),
    
    /**
     * The initial northeast corner of the map.
     */
    initialNorthEast: L.latLng(54.7124463981, -2.36672940204),
    
    /**
     * The web page sidebar name.
     */
    sidebarName: 'sidebar',
    
    /**
     * The webpage sidebar position.
     */
    sidebarPosition: 'right',
    
    /**
     * The openstreetmap base layer url for getting tiles.
     */
    openStreetMapBaseLayerUrl: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    
    /**
     * The openstreetmap attribution.
     */
    openStreetMapAttribution: 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors'
    
  },
  
  /**
   * Leaflet related properties.
   */
  Leaflet: {
    
    /**
     * The map control of the web page.
     */
    map: null,
    
    /**
     * The sidebar of the map.
     */
    sidebar: null,
    
    /**
     * The baselayer of the map.
     */
    baseLayer: null,
    
    /**
     * The GeoJSON layer used to store the areas of interest of the planning projects.
     */
    planningProjectsAOIsLayer: null,
    
    /**
     * The container for holding geolayers of the currently opened planning project. 
     */
    planningProjectGeoLayersFeatureGroup: null,
    
    /**
     * The GeoJSON layer used to store the areas of interest of comments.
     */ 
    commentsAOIsLayer: null,
    
    /**
     * The LayerGroup used to store the currently edited area of interest of comment.
     */
    commentAOIEditingLayerGroup: null,
    
    /**
     * The LayerGroup used to store the currently edited area of interest of the planning proposal.
     */
    planningProposalAOIEditingLayerGroup: null,
    
    /**
     * The symbols used by the application.
     */
    symbols: { lineStyles : [], fillStyles : [] },
    
    /**
     * The layers control used to display a legend on the web page.
     */
    legendControl: null
    
  },
  
  /**
   * Initializes the map.
   */
  initializeMap: function() {
    
    // Create the map.
    Spatial.Leaflet.map = L.map('map', {
      //crs: crs,
      editable: true,
      //editOptions: { featuresLayer: Spatial.Leaflet.commentAOIEditingLayerGroup },
      zoomControl: true,
      minZoom: Spatial.Members.minZoom,
      maxZoom: Spatial.Members.maxZoom
    });
    
    // Zoom in the Bootle area.
    var initialBounds = L.latLngBounds(Spatial.Members.initialSouthWest, Spatial.Members.initialNorthEast); 
    Spatial.Leaflet.map.fitBounds(initialBounds);
    
    // Create the sidebar and add it on the map.
    Spatial.Leaflet.sidebar = L.control.sidebar(Spatial.Members.sidebarName, {position: Spatial.Members.sidebarPosition});
    Spatial.Leaflet.sidebar.addTo(Spatial.Leaflet.map);
    
    // Add a base layer on the map.
    Spatial.Leaflet.baseLayer = L.tileLayer(this.Members.openStreetMapBaseLayerUrl, {
      attribution: this.Members.openStreetMapAttribution
    }); 
    Spatial.Leaflet.baseLayer.addTo(Spatial.Leaflet.map);
    
    // Add the GeoJSON layer used to draw the areas of interest of the planning projects.
    Spatial.Leaflet.planningProjectsAOIsLayer = L.geoJson(PlanningModels.projectAOIsFcModel);
    Spatial.Leaflet.planningProjectsAOIsLayer.addTo(Spatial.Leaflet.map);
    
    // Add the container for holding geolayers of the currently opened planning project.
    // TODO: Make sure that this is needed. That deepends on if the container is used or not.
    Spatial.Leaflet.planningProjectGeoLayersFeatureGroup = new L.FeatureGroup();
    Spatial.Leaflet.planningProjectGeoLayersFeatureGroup.addTo(Spatial.Leaflet.map);
    
    // Add the group layer used to draw the area of interest of the planning project proposal.
    Spatial.Leaflet.planningProposalAOIEditingLayerGroup = new L.LayerGroup();
    Spatial.Leaflet.map.addLayer(Spatial.Leaflet.planningProposalAOIEditingLayerGroup);
    
    // Add the GeoJSON layer used to draw the areas of interest of comments.
    Spatial.Leaflet.commentsAOIsLayer = L.geoJson(PlanningModels.commentsAOIsFcModel);
    Spatial.Leaflet.commentsAOIsLayer.addTo(Spatial.Leaflet.map);
    
    // Add the group layer used to draw the area of interest of the currently edited comment.
    Spatial.Leaflet.commentAOIEditingLayerGroup = new L.LayerGroup();
    Spatial.Leaflet.map.addLayer(Spatial.Leaflet.commentAOIEditingLayerGroup);
    
    // Add a legend control on the web page.
    Spatial.addLegendControl();
    
    // Subscribe to the 'editable:drawing:end' which is raised once the drawing on the editable layer has been finished.
    Spatial.Leaflet.map.on('editable:drawing:end', function(e) {
      
      // A feature has just been added on the edittools features layer. 
      // Get this feature so as to move it on to the commentAOIEditingLayerGroup.
      var fLayers = e.layer.options.editOptions.editTools.featuresLayer.getLayers();
      
      if (fLayers != undefined || fLayers != null || fLayers.length != 0) {
        if (e.editTools.featureType == 'comment') {
          PlanningModels.commentJsonToPost = fLayers[0].toGeoJSON(); 
          
          // Clear the editable features layer and the commentAOIEditingLayerGroup.
          // TODO: This needs to be changed because it causes an error when multiple editing buttons have been pressed
          e.layer.options.editOptions.editTools.featuresLayer.clearLayers();
          Spatial.Leaflet.commentAOIEditingLayerGroup.clearLayers();
          
          Spatial.addCommentAOI();
        }
        else if (e.editTools.featureType == 'proposal') {
          var planningProposalJson = fLayers[0].toGeoJSON(); 
          
          // Clear the editable features layer and the planningProposalAOIEditingLayerGroup.
          // TODO: This needs to be changed because it causes an error when multiple editing buttons have been pressed
          e.layer.options.editOptions.editTools.featuresLayer.clearLayers();
          Spatial.Leaflet.planningProposalAOIEditingLayerGroup.clearLayers();
          
          Spatial.addPlanningProposalAOI(planningProposalJson);
        }
      }
      
      if (UserAgent.device.type == 'Mobile' || UserAgent.device.type == 'Tablet') {
        if (e.editTools.featureType == 'comment') {
          $('#commentsButton').addClass('active');
        }
        else if (e.editTools.featureType == 'proposal') {
          $('#newProposalButton').addClass('active');
        }
        $('#sidebar').removeClass('collapsed');
      }
      
    });
    
  },
  
  /**
   * Zooms in to the selected planning project's area of interest.
   */
  zoomToSelectedPlan: function () {
    
    // Loop through the features of the planning projects and try to find the one
    // that is currently selected in the optionsbox on the web page. 
    for (i = 0; i < PlanningModels.projectAOIsFcModel.features.length; i++) {
      if (PlanningModels.projectAOIsFcModel.features[i].properties.slug === PlanningModels.currentProjectSlug) {
        
        // The currently selected project has been found. Get its bounding box.
        var bbox = PlanningModels.projectAOIsFcModel.features[i].geometry.bbox();
        
        // Extract the southwest and northeast locations of the bounding box and create a Leaflet bounding box.
        var southWest = L.latLng(bbox[1], bbox[0]);
        var northEast = L.latLng(bbox[3], bbox[2]);
        var planningProjectBounds = L.latLngBounds(southWest, northEast);
        
        // Zoom the map in to the selected planning project.
        Spatial.Leaflet.map.fitBounds(planningProjectBounds);
        
        break;
        
      }
    }
    
  },
  
  /**
   * Adds a legend control on the web page.
   */
  addLegendControl: function() {
    
    // Create the legend.
    Spatial.Leaflet.legendControl = L.control.layers({
        "OpenStreetMap": Spatial.Leaflet.baseLayer
      }, {
        //"Projects": Spatial.Leaflet.planningProjectsAOIsLayer,
        //"Current Layer": Spatial.Leaflet.planningProjectGeoLayersFeatureGroup,
        //"Comments": Spatial.Leaflet.commentsAOIsLayer
      }, {
        collapsed: false,
        autoZIndex: true
      });
    
    // Set the map of the legend.
    Spatial.Leaflet.legendControl._map = Spatial.Leaflet.map;
    
    // Get the legend 's div.
    var legendControlDiv = Spatial.Leaflet.legendControl.onAdd(Spatial.Leaflet.map);
    
    // Append the legend 's div in to the placeholder for the 
    document.getElementById('mapLegendDiv').appendChild(legendControlDiv);
    
    // Workaround to force the legend control to render itself.
    $('#legend').addClass('hidden');
    $('#legend').removeClass('hidden');
    
  },
  
  /**
   * Adds the associated planning project geolayers on the map. 
   */
  addPlanningProjectGeoLayers: function() {
    
    var geoLayers = PlanningModels.currentProjectModel.plan.geoLayers;
    var geoLayersDefinitions = PlanningModels.currentProjectModel.plan.geoLayersDefinitions;
    
    // Sort the geolayers definitions based on their order property. 
    geoLayersDefinitions.sort(function(a, b) {
      return parseInt(a.order) - parseInt(b.order);
      // if (parseInt(a.order) < parseInt(b.order)) {
      //   return -1;
      // }
      // if (parseInt(a.order) > parseInt(b.order)) {
      //   return 1
      // }
      // return 0;
    });
    
    PlanningModels.sortedGeoLayers = [];
    
    // Loop through the geolayers definitions.
    for (i = 0; i < geoLayersDefinitions.length; i++) {
      var definition = geoLayersDefinitions[i];
      
      // Find out which geolayer is rendered by the current definition.
      for (j = 0; j < geoLayers.length; j++) {
        var results = geoLayers[j].definitions.filter(gd => gd == definition._id);
        
        if (results != undefined && results && null || results.length == 1) {
          // The geolayer having the tested definition has been found.
          // Get the geolayer's features.
          var features = JSON.parse(geoLayers[j].geoJsonData);
          
          // Get the symbology and popup functions json.
          var symbologyFunctionJson = String(definition.symbologyFunction.functionJson);
          var popupFunctionJson = definition.popupFunction.functionJson;
          
          // Parse the json.
          var styleObject = JSONfn.parse(symbologyFunctionJson);
          var popupObject = JSONfn.parse(popupFunctionJson);
          
          // TODO: Decide if the layers will be added inside a FeatureGroup layer container or they will be added directly on the map.
          // If they will be added directly on the map, then make sure that comments layer and temporary comments layer move to the top.
          // The following adds the layers in the container.
          
          var geoJsonLayer = null;
          
          // Add the layer in the planningProjectGeoLayersFeatureGroup.
          if (!definition.symbologyFunction.isForPoints) {
            geoJsonLayer = L.geoJson(features, {
              style: styleObject.symbologyFunction,
              onEachFeature: popupObject.onEachFeaturePopupFunction
            });
          }
          else {
            geoJsonLayer = L.geoJson(features, {
              pointToLayer: styleObject.symbologyFunction,
              onEachFeature: popupObject.onEachFeaturePopupFunction
            });
          }
          
          Spatial.Leaflet.planningProjectGeoLayersFeatureGroup.addLayer(geoJsonLayer);
          
          var geometryType = '';
          
          if (features != undefined || features != null || features.length > 0) {
            geometryType = features.features[0].geometry.type;
          }
          
          PlanningModels.sortedGeoLayers.push({
            geometryType: geometryType,
            symbologyFunction: definition.symbologyFunction,
            style: styleObject,
            geoLayer: geoLayers[j],
            geoJsonLayer: geoJsonLayer
          });
          
          
          // TODO: The following add the layers on the map.
          
          // // Check the type of symbology function and then create the GeoJSON layer and add it on the map.
          // if (!definition.symbologyFunction.isForPoints) {
          //   L.geoJson(features, {
          //     style: styleObject.symbologyFunction,
          //     onEachFeature: popupObject.onEachFeaturePopupFunction
          //   }).addTo(Spatial.Leaflet.map);
          // }
          // else {
          //   L.geoJson(features, {
          //     pointToLayer: styleObject.symbologyFunction,
          //     onEachFeature: popupObject.onEachLayerPopupFunction
          //   }).addTo(Spatial.Leaflet.map);  
          // } 
          
          break;
        }
      }
    }
    
  },
  
  /**
   * Gets a legend entry.
   * 
   * @param  {any} sortedGeoLayer - The geolayer that is used to produce a legend entry.
   */
  getLegendEntry: function(sortedGeoLayer) {
    
    if (sortedGeoLayer.symbologyFunction.method == 'Single') {
      return Spatial.getSingleSymbolLegendEntry(sortedGeoLayer);
    }
    else if (sortedGeoLayer.symbologyFunction.method == 'Categories') {
      return Spatial.getCategoriesLegendEntry(sortedGeoLayer);
    }
    else if (sortedGeoLayers.symbologyFunction.method == 'Quantiles') {
      return sortedGeoLayer.geoLayer.name;
    }
    else if (sortedGeoLayers.symbologyFunction.method == 'Charts') {
      return sortedGeoLayer.geoLayer.name;
    }
    else if (sortedGeoLayers.symbologyFunction.method == 'MultipleAttributes') {
      return sortedGeoLayer.geoLayer.name;
    }
    else if (sortedGeoLayer.symbologyFunction.method == 'Other') {
      return sortedGeoLayer.geoLayer.name;
    }
    // TODO: Maybe an else is needed here ???
    
  },
  
  /**
   * Get the legend entry for a single symbol layer.
   * 
   * @param  {any} sortedGeoLayer - The geolayer that is used to produce a legend entry.
   */
  getSingleSymbolLegendEntry: function(sortedGeoLayer) {
    
    // Create the span holding the name of the layer.
    var entry = '<span style="line-height: 18px;">' + sortedGeoLayer.geoLayer.name + '</span>';
    
    if (sortedGeoLayer.geoJsonLayer._layers != undefined || sortedGeoLayer.geoJsonLayer._layers != null || sortedGeoLayer.geoJsonLayer._layers.length > 0) {
      
      var layer = null;
      
      // Just get the first internal layer of the GeoJson layer.
      for (var property in sortedGeoLayer.geoJsonLayer._layers) {
        layer = sortedGeoLayer.geoJsonLayer._layers[property];
        break;
      }
      
      var options = layer.options;
      
      if (sortedGeoLayer.geometryType == 'Point') {
        return sortedGeoLayer.geoLayer.name;
      }
      else if (sortedGeoLayer.geometryType == 'LineString') {
        return sortedGeoLayer.geoLayer.name;
      }
      else if (sortedGeoLayer.geometryType == 'Polygon') {
        
        var cssStyle = 'clear: both; width: 18px; height: 18px; margin-left: 20px; margin-right: 8px;';
        
        cssStyle = Spatial.getPolygonCSSStyle(options, cssStyle);
        
        entry += '<div id="' + sortedGeoLayer.geoLayer.slug + '-div' + '" style="' + cssStyle + '"></div>';
        
        return entry;
        
      }
      else {
        return entry;
      }
      
    }
    else {
      return entry;
    }
    
  },
  
  /**
   * Get the legend entry for a layer having a symbol for each category.
   * 
   * @param  {any} sortedGeoLayer - The geolayer that is used to produce a legend entry.
   */
  getCategoriesLegendEntry: function(sortedGeoLayer) {
    
    // Create the span holding the name of the layer.
    var entry = '<span style="line-height: 18px;">' + sortedGeoLayer.geoLayer.name + '</span>';
    
    if (sortedGeoLayer.geoJsonLayer._layers != undefined || sortedGeoLayer.geoJsonLayer._layers != null || sortedGeoLayer.geoJsonLayer._layers.length > 0) {
      
      // Get the style.
      var style = sortedGeoLayer.style;
      
      // Get the feature collection.
      var featureCollection = JSON.parse(sortedGeoLayer.geoLayer.geoJsonData);
      
      // Get the symbols dictionary
      var symbolsDictionary = Spatial.getSymbolsDictionary(featureCollection, style);
      
      if (sortedGeoLayer.geometryType == 'Point') {
        return sortedGeoLayer.geoLayer.name;
      }
      else if (sortedGeoLayer.geometryType == 'LineString') {
        return sortedGeoLayer.geoLayer.name;
      }
      else if (sortedGeoLayer.geometryType == 'Polygon') {
        
        if (symbolsDictionary != undefined || symbolsDictionary != null || symbolsDictionary.length > 0) {
          entry += '<br><span style="clear: both; float: left; line-height: 18px; margin-left: 20px;">Categories: [ ' + symbolsDictionary[0].value.displayFieldNames + ' ]</span><br>';
        }
        
        // Loop through the symbols in the dictionary so as to create the legend entry.
        for (i = 0; i < symbolsDictionary.length; i++) {
          entry = Spatial.addPolygonLegendEntryRow(symbolsDictionary, i, entry);
        }
        
        return entry;
        
      }
      else {
        return entry;
      }
      
    }
    else {
      return entry;
    }
    
  },
  
  /**
   * Get the legend entry for the areas of interest of the planning projects.
   * 
   * @param  {any} style - The style used to get all the symbols used to render the features.
   */
  getProjectAOIsLegendEntry: function(style) {
    
    // Create the span holding the name of the layer.
    var entry = '<span style="line-height: 18px;">Projects</span>';
    
    if (Spatial.Leaflet.planningProjectsAOIsLayer._layers != undefined || Spatial.Leaflet.planningProjectsAOIsLayer._layers != null || Spatial.Leaflet.planningProjectsAOIsLayer._layers.length > 0) {
      
      // Get the feature collection.
      var featureCollection = PlanningModels.projectAOIsFcModel;
      
      // Get the symbols dictionary.
      var symbolsDictionary = Spatial.getSymbolsDictionary(featureCollection, style);
      
      if (symbolsDictionary != undefined || symbolsDictionary != null || symbolsDictionary.length > 0) {
        entry += '<br><span style="clear: both; float: left; line-height: 18px; margin-left: 20px;">Categories: [ ' + symbolsDictionary[0].value.displayFieldNames + ' ]</span><br>';
      }
      
      // Loop through the symbols in the dictionary so as to create the legend entry.
      for (i = 0; i < symbolsDictionary.length; i++) {
        entry = Spatial.addPolygonLegendEntryRow(symbolsDictionary, i, entry);
      }
      
      return entry;
      
    }
    else {
      return entry;
    }
    
  },
  
  /**
   * Gets the legend entry for the areas of interest of the users' comments.
   */
  getCommentsLegendEntry: function() {
    
    // Create the span holding the name of the layer.
    var entry = '<span style="line-height: 18px;">Comments</span>';
    
    if (Spatial.Leaflet.commentsAOIsLayer._layers != undefined || Spatial.Leaflet.commentsAOIsLayer._layers != null || Spatial.Leaflet.commentsAOIsLayer._layers.length > 0) {
      
      var commentSymbolsDictionary = []; 
      
      commentSymbolsDictionary.push({
        key: 'Marker Comments',
        value: L.Icon.Default
      });
      
      commentSymbolsDictionary.push({
        key: 'Polyline Comments',
        value: Spatial.Leaflet.symbols.lineStyles.filter(ls => ls.slug == 'comment-polyline-style')[0].definition
      });
      
      commentSymbolsDictionary.push({
        key: 'Polygon Comments',
        value: Spatial.Leaflet.symbols.fillStyles.filter(fs => fs.slug == 'comment-polygon-style')[0].definition
      });
      
      // TODO: Check out what's going on with the marker and polyline entries.
      // Get the entry for the marker comments.
      //entry = Spatial.addPolygonLegendEntryRow(commentSymbolsDictionary, 0, entry);
      
      // Get the entry for the polyline comments.
      //entry = Spatial.addPolylineLegendEntryRow(commentSymbolsDictionary, 1, entry);
      
      // Get the entry for the polygon comments.
      entry = Spatial.addPolygonLegendEntryRow(commentSymbolsDictionary, 2, entry);
      
      return entry;
      
    }
    else {
      return entry;
    }
    
  },
  
  /**
   * Gets the symbol dictionary for a layer.
   * 
   * @param  {any} featureCollection - The feature collection that the symbols will be used for.
   * @param  {any} style - A style object having a symbology function.
   */
  getSymbolsDictionary: function(featureCollection, style) {
    
    var symbolsDictionary = [];
    
    // Loop through the features of the feature collection and get all unique symbols.
    for (i = 0; i < featureCollection.features.length; i++) {
      var symbol = style.symbologyFunction(featureCollection.features[i]);
      
      // Check out if the symbol already exists in the dictionary.
      var result = symbolsDictionary.filter(s => s.key == symbol.displayFieldValues);
      
      if (result == undefined || result == null || result.length == 0) {
        // The symbol does not exist in the dictionary, add it.
        symbolsDictionary.push({
          key: symbol.displayFieldValues,
          value: symbol
        });
      }
    }
    
    // Sort the symbols in the dictionary.
    symbolsDictionary.sort(function(a, b) {
      if (a.key < b.key) {
        return -1;
      }
      if (a.key > b.key) {
        return 1;
      }
      return 0;
    });
    
    return symbolsDictionary;
    
  },
  
  /**
   * Adds a row of a legend entry for a polygon layer.
   * 
   * @param  {any} symbolsDictionary - The dictionary of symbols used to render a specific polygon layer.
   * @param  {any} dictionaryIndex - The current dictionary index.
   * @param  {any} entry - The legend entry.
   */
  addPolygonLegendEntryRow: function(symbolsDictionary, dictionaryIndex, entry) {
    
    var options = symbolsDictionary[dictionaryIndex].value;
    var cssStyle = 'clear: both; width: 18px; height: 18px; margin: 2px 8px 2px 20px;';
    
    cssStyle = Spatial.getPolygonCSSStyle(options, cssStyle);
    
    entry += '<div style="' + cssStyle + '"></div>';
    entry += '<div style="float: left; margin-top: -20px"><span style="clear: both; margin-left: 50px; opacity: 1; width: 400px;">' + symbolsDictionary[dictionaryIndex].key + '</span></div>';
    
    return entry;
    
  },
  
  /**
   * Gets the css style that will be used to render a symbol used in a polygon layer.
   * 
   * @param  {any} options - The options of the symbol used to render a polygon.
   * @param  {any} cssStyle - The css style.
   */
  getPolygonCSSStyle: function(options, cssStyle) {
    
    var opacity = 1;
    
    // Check out what is the opacity.
    if (options.fill != undefined || options.fill != null) {
      if (options.fill == false) {
        // The polygon is transparent. Don't care about fillOpacity.
        opacity = 0;
      }
      else {
        // The polygon is filled somehow. Check if a fillOpacity exists.
        if (options.fillOpacity != undefined || options.fillOpacity != null) {
          opacity = options.fillOpacity;
        }
      }
    }
    else {
      // No fill option found. Assume the polygon is not transparent.
      if (options.fillOpacity != undefined || options.fillOpacity != null) {
        opacity = options.fillOpacity;
      }
    }
    
    cssStyle += (options.fillColor != undefined || options.fillColor != null || opacity != 0 ) ? ' background: ' + options.fillColor.toString() + ';' : ' background: transparent;';
    cssStyle += (options.dashArray == undefined || options.dashArray == null || options.dashArray == '') ? ' border-style: solid;' : ' border-style: dashed;';
    
    // Border opacity % is controled by the options.opacity. Don't deal with it.
    // The border will be either opaque or transparent controlled only by options.stroke.
    
    // Check out if the polygon has a border.
    if (options.stroke != undefined || options.stroke != null) {
      if (options.stroke) {
        // It has a border.
        cssStyle += (options.color != undefined || options.color != null) ? ' border-color: ' + options.color.toString() + ';' : ' border-color: #03f;';
        
        if (opacity == 0) {
          opacity = 1;
        }
      }
      else {
        // It has no border.
        cssStyle += ' border-color: transparent;';
      }
    }
    else {
      // Assume it has a border.
      cssStyle += (options.color != undefined || options.color != null) ? ' border-color: ' + options.color.toString() + ';' : ' border-color: #03f;';
      
      if (opacity == 0) {
        opacity = 1;
      }
    }
    
    cssStyle += ' opacity: ' + opacity + ';';
    cssStyle += (options.weight != undefined || options.weight != null) ? ' border-width: ' + Math.round(options.weight) + 'px;' : ' border-width: 5px;';
    
    return cssStyle;
    
  },
  
  /**
   * Adds the layers in the legend control.
   */
  addLegendLayers: function() {
    
    Spatial.Leaflet.legendControl.removeLayer(Spatial.Leaflet.commentsAOIsLayer);
    
    // // Loop through the sorted geolayers and get a legend entry for each one of them.
    // for (sgl = 0; sgl < PlanningModels.sortedGeoLayers.length; sgl++) {
    //   var legendEntry = Spatial.getLegendEntry(PlanningModels.sortedGeoLayers[sgl]);
      
    //   Spatial.Leaflet.legendControl.addOverlay(PlanningModels.sortedGeoLayers[sgl].geoJsonLayer, legendEntry);
    // }
    
    //let i = 0;
    //TODO: ERROR !!! - This does not work in firefox (31.1.1) !!!
    for (let i = 0; i < PlanningModels.sortedGeoLayers.length; i++) {
      var legendEntry = Spatial.getLegendEntry(PlanningModels.sortedGeoLayers[i]);
      
      Spatial.Leaflet.legendControl.addOverlay(PlanningModels.sortedGeoLayers[i].geoJsonLayer, legendEntry);
    }
    
    // for (sgl = PlanningModels.sortedGeoLayers.length - 1; sgl > -1; sgl--) {
    //   var sortedGeoLayer = PlanningModels.sortedGeoLayers[sgl];
    //   var legendEntry = Spatial.getLegendEntry(sortedGeoLayer);
      
    //   Spatial.Leaflet.legendControl.addOverlay(sortedGeoLayer.geoJsonLayer, legendEntry);
    // }
    
    Spatial.Leaflet.legendControl.addOverlay(Spatial.Leaflet.commentsAOIsLayer, Spatial.getCommentsLegendEntry());
    
  },
  
  /**
   * Removes the layers from the legend control.
   */
  removeLegendLayers: function() {
    for (i = 0; i < PlanningModels.sortedGeoLayers.length; i++) {
      Spatial.Leaflet.legendControl.removeLayer(PlanningModels.sortedGeoLayers[i].geoJsonLayer);
    }
    
    Spatial.Leaflet.legendControl.removeLayer(Spatial.Leaflet.commentsAOIsLayer);
  },
  
  /**
   * Adds a newly created comment AOI on the relevant map layer and
   * sets the GeoJSON that will be used for posting the comment.
   */
  addCommentAOI: function() {
    
    // Check the type of the feature created and add a clone of it on the commentAOIEditingLayerGroup.
    if (PlanningModels.commentJsonToPost.geometry.type == 'Point') {
      // Create a new marker.
      var marker = new L.marker(
        [
          PlanningModels.commentJsonToPost.geometry.coordinates[1],
          PlanningModels.commentJsonToPost.geometry.coordinates[0]
        ]
      );
      
      // Add the marker on the temporary layer.
      Spatial.Leaflet.commentAOIEditingLayerGroup.addLayer(marker);
    }
    else if (PlanningModels.commentJsonToPost.geometry.type == 'LineString') {
      var latLngs = [];
      
      // Loop through the coordiantes of the comment and push them in a LatLon array.
      for (i = 0; i < PlanningModels.commentJsonToPost.geometry.coordinates.length; i++) {
        latLngs.push(
          [
            PlanningModels.commentJsonToPost.geometry.coordinates[i][1],
            PlanningModels.commentJsonToPost.geometry.coordinates[i][0]
          ]
        );
      }
      
      // Get the linestyle for the comment and create a new polyline.
      var lineStyle = Spatial.Leaflet.symbols.lineStyles.filter(ls => ls.slug == 'comment-to-add-polyline-style')[0];
      var polyline = new L.polyline(latLngs, lineStyle.definition);
      
      // Add the polyline on the temporary layer. 
      Spatial.Leaflet.commentAOIEditingLayerGroup.addLayer(polyline);
    }
    else if (PlanningModels.commentJsonToPost.geometry.type == 'Polygon') {
      var latLngs = [];
      
      // Polygons with holes are not supported by the system. Thus the polygon has an array of shell with only one item.
      // Get this item so as to have the array of out shell coordinates.
      var coords = PlanningModels.commentJsonToPost.geometry.coordinates[0];
      
      // Loop through the coordinates and push them in a LatLon array.
      for (i = 0; i < coords.length; i++) {
        latLngs.push([coords[i][1], coords[i][0]]);
      }
      
      // Get the polygon style for the comment and create a new polygon. 
      var fillStyle = Spatial.Leaflet.symbols.fillStyles.filter(sfs => sfs.slug == 'comment-to-add-polygon-style')[0];
      var polygon = new L.polygon(latLngs, fillStyle.definition);
      
      // Add the polygon on the temporary layer.
      Spatial.Leaflet.commentAOIEditingLayerGroup.addLayer(polygon);
    }
    
  },
  
  /**
   * Adds the comment area of interest and comment's contents in the comments' feature collection.
   */
  addCommentAOIToFeatureCollection: function(comment) {
    // Add the area of interest for this comment in the feature collection.
    var geometry = Terraformer.WKT.parse(comment.areaOfInterest);
    
    var feature = {
      type : "Feature",
      properties : {
        id : comment._id,
        author : comment.author,
        dateTimeAdded : comment.dateTimeAdded,
        content : comment.content
      },
      geometry : geometry
    };
    
    PlanningModels.commentsAOIsFcModel.features.push(feature);
  },
  
  /**
   * Zooms in to the area of interest of the specified comment.
   * 
   * @param  {any} id - The id of the comment.
   */
  zoomToCommentAOI: function(id) {
    
    Spatial.Leaflet.commentsAOIsLayer.eachLayer(function(layer) {
      if (layer.feature.properties.id == id) {
        if (layer._latlngs !=  undefined) {
          var bounds = L.latLngBounds(layer._latlngs);
          Spatial.Leaflet.map.fitBounds(bounds);
        }
        else {
          if (layer._latlng != undefined) {
            Spatial.Leaflet.map.panTo(layer._latlng)  
          }
        }
      }
    })
    
  },
  
  /**
   * Populates the planning projects' areas of interest in a feature collection.
   */
  populateProjectAOIsFeatureCollection: function() {
    var plans = PlanningModels.projectAOIsListModel.plans;
    
    if (plans != null) {
      if (plans.length > 0) {
        PlanningModels.projectAOIsFcModel.features = [];
        
        for (i = 0; i < plans.length; i++) {
          var wkt = plans[i].areaOfInterest;
          var polygon = Terraformer.WKT.parse(wkt);
          
          var feature = {
            type : "Feature",
            properties : {
              slug : plans[i].slug,
              name : plans[i].name,
              description : plans[i].description,
              state : plans[i].state
            },
            geometry : polygon
          };
          
          PlanningModels.projectAOIsFcModel.features.push(feature);
        }
      }
    }
  },
  
  /**
   * Adds a newly created planning proposal AOI on the relevant map layer. 
   */
  addPlanningProposalAOI: function(planningProposalJson) {
    
    if (planningProposalJson != undefined || planningProposalJson || null) {
      if (planningProposalJson.geometry.type == 'Polygon') {
        
        // Populate the area of interest with the geometry in WKT format. 
        PlanningProposal.areaOfInterest = Terraformer.WKT.convert(planningProposalJson.geometry);
        
        var latLngs = [];
        
        // Polygons with holes are not supported by the system. Thus the polygon has an array of shell with only one item.
        // Get this item so as to have the array of out shell coordinates.
        var coords = planningProposalJson.geometry.coordinates[0];
        
        // Loop through the coordinates and push them in a LatLon array.
        for (i = 0; i < coords.length; i++) {
          latLngs.push([coords[i][1], coords[i][0]]);
        }
        
        // Get the polygon style for the planning proposal and create a new polygon. 
        var fillStyle = Spatial.Leaflet.symbols.fillStyles.filter(sfs => sfs.slug == 'proposal-to-add-polygon-style')[0];
        var polygon = new L.polygon(latLngs, fillStyle.definition);
        
        // Add the polygon on the temporary layer.
        Spatial.Leaflet.planningProposalAOIEditingLayerGroup.addLayer(polygon);
        
        // Update the UI.
        PlanPage.updateNewProjectTabUI();
        
      }
    }
    
  }
  
};

/**
 * Used to deal with controls and processed on the page level.
 */
var PlanPage = {
  
  /**
   * Indicates whether the comments warning is visible or not;
   */
  isCommentsWarningVisible: false,
  
  /**
   * Indicates whether the post comment button is enabled or not.
   */
  isPostCommentButtonEnabled: false,
  
  /**
   * The icons used to render the files that are to the currently planning project.
   */
  fileIcons : [
    { extension : 'zip',  iconKey : 'file-archive-o' },
    { extension : 'tar',  iconKey : 'file-archive-o' },
    { extension : 'tgz',  iconKey : 'file-archive-o' },
    { extension : 'rar',  iconKey : 'file-archive-o' },
    { extension : 'arc',  iconKey : 'file-archive-o' },
    { extension : 'gz',   iconKey : 'file-archive-o' },
    { extension : '7z',   iconKey : 'file-archive-o' },
    { extension : 'z',    iconKey : 'file-archive-o' },
    
    { extension : 'pdf',  iconKey : 'file-pdf-o' },
    { extension : 'doc',  iconKey : 'file-word-o' },
    { extension : 'docx', iconKey : 'file-word-o' },
    { extension : 'xls',  iconKey : 'file-excel-o' },
    { extension : 'xlsx', iconKey : 'file-excel-o' },
    { extension : 'ppt',  iconKey : 'file-powerpoint-o' },
    { extension : 'pttx', iconKey : 'file-powerpoint-o' },
    { extension : 'ppsx', iconKey : 'file-powerpoint-o' },
    
    { extension : 'mp3',  iconKey : 'file-audio-o' },
    { extension : 'mp4',  iconKey : 'file-audio-o' },
    { extension : 'm4a',  iconKey : 'file-audio-o' },
    { extension : 'wav',  iconKey : 'file-audio-o' },
    { extension : 'ram',  iconKey : 'file-audio-o' },
    { extension : 'asx',  iconKey : 'file-audio-o' },
    { extension : 'wma',  iconKey : 'file-audio-o' },
    { extension : 'ogg',  iconKey : 'file-audio-o' },
    
    { extension : 'avi',  iconKey : 'file-video-o' },
    { extension : 'wmv',  iconKey : 'file-video-o' },
    { extension : 'mkv',  iconKey : 'file-video-o' },
    { extension : 'mov',  iconKey : 'file-video-o' },
    { extension : 'swf',  iconKey : 'file-video-o' },
    { extension : 'h64',  iconKey : 'file-video-o' },
    { extension : 'asx',  iconKey : 'file-video-o' },
    { extension : '3gpp', iconKey : 'file-video-o' },
    { extension : 'mpg',  iconKey : 'file-video-o' },
    { extension : 'flv',  iconKey : 'file-video-o' },
    { extension : 'rm',   iconKey : 'file-video-o' },
    
    { extension : 'bmp',  iconKey : 'file-image-o' },
    { extension : 'jpg',  iconKey : 'file-image-o' },
    { extension : 'jpeg', iconKey : 'file-image-o' },
    { extension : 'png',  iconKey : 'file-image-o' },
    { extension : 'psd',  iconKey : 'file-image-o' },
    { extension : 'tif',  iconKey : 'file-image-o' },
    { extension : 'tiff', iconKey : 'file-image-o' },
    { extension : 'jp2',  iconKey : 'file-image-o' },
    
    { extension : 'txt',  iconKey : 'file-text-o' },
    { extension : 'html', iconKey : 'file-code-o' },
    { extension : 'htm',  iconKey : 'file-code-o' }
  ],
  
  /**
   * Gets the a preferred language to be used in locale operations.
   */
  getLanguage: function() {
    if (navigator.languages != undefined) {
      return navigator.languages[0];
    }
    else {
      return navigator.language;
    }
  },
  
  /**
   * Formats an ISO date using the language and the date format options specified in PlanningModels.
   * 
   * @param  {string} isoDate - A string representing a date in ISO format.
   */
  formatISODate: function(isoDate) {
    var date = new Date(isoDate);
    
    return date.toLocaleString(PlanningModels.language, PlanningModels.dateFormatOptions);
  },
  
  /**
   * Formats an ISO datetime using the language and the datetime format options specified in PlanningModels.
   * 
   * @param  {string} isoDateTime - A string representing a datetime in ISO format.
   */
  formatISODateTime: function(isoDateTime) {
    var dateTime = new Date(isoDateTime);
    
    return dateTime.toLocaleString(PlanningModels.language, PlanningModels.dateTimeFormatOptions);
  },
  
  /**
   * Initializes the markdown editor for the texts of a planning proposal.
   */
  initializePlanningProposalMarkdownEditor: function() {
    
    $('#planningProposalMarkdownEditor').markdown({
      
      hiddenButtons: ['cmdImage', 'cmdCode', 'cmdPreview'],
      fullscreen: { enable: false },
      footer: '<p><b>Preview:</b><p><div id="planningProposalMarkdownEditorFooter" style="display: none; background: white; height: 200px; overflow-y: auto;"></div><small id="characterCounter" class="text-primary">' + PlanningModels.maxProposalMarkdownLength + ' characters left</small>',
      
      onChange: function(e) {
        var content = e.parseContent();
        var contentLength = (content.match(/\n/g)||[]).length + content.length

        if (content == '') {
          $('#planningProposalMarkdownEditorFooter').hide()
        }
        else {
          $('#planningProposalMarkdownEditorFooter').show().html(content)
        }

        if (contentLength > PlanningModels.maxProposalMarkdownLength) {
          $('#characterCounter').removeClass('text-primary').addClass('text-danger').html(contentLength - PlanningModels.maxProposalMarkdownLength + ' characters exceed the maximum of ' + PlanningModels.maxProposalMarkdownLength + '.');
        }
        else {
          $('#characterCounter').removeClass('text-danger').addClass('text-primary').html(PlanningModels.maxProposalMarkdownLength - contentLength + ' characters left.');
        }
        
        // if (e.$textarea.context.value == undefined || e.$textarea.context.value == null) {
        //   PlanningProposal.markdownText == null;
        // }
        
        //PlanningProposal.markdownText = e.$textarea.context.value;
      }
      
    });
    
  },
  
  /**
   * Enables the specified control.
   * 
   * @param  {string} controlId - The control id to be enabled.
   */
  enableControl: function(controlId) {
    $('#' + controlId).removeClass('disabled');
  },
  
  /**
   * Disables the specified control.
   * 
   * @param  {string} controlId - The control id to be disabled.
   */
  disableControl: function(controlId) {
    $('#' + controlId).removeClass('disabled');
    $('#' + controlId).addClass('disabled');
  },
  
  /**
   * Shows the specified control.
   * 
   * @param  {string} controlId - The control id to be shown.
   */
  showControl: function(controlId) {
    $('#' + controlId).removeClass('hidden');
  },
  
  /**
   * Hide the specified control.
   * 
   * @param  {string} controlId - The control id to be hidden.
   */
  hideControl: function(controlId) {
    $('#' + controlId).removeClass('hidden');
    $('#' + controlId).addClass('hidden');
  },
  
  /**
   * Show web page controls associated with planning project.
   */
  showProjectControls: function() {
    $('#textsButton').removeClass('hidden');
    $('#texts').removeClass('hidden');
    $('#filesButton').removeClass('hidden');
    $('#files').removeClass('hidden');
    $('#commentsButton').removeClass('hidden');
    $('#comments').removeClass('hidden');
    
    if (UserAgent.device.type == 'Mobile' || UserAgent.device.type == 'Tablet') {
      $('#mobilePlanGroup').removeClass('hidden');
      $('#closePlanButton').removeClass('hidden');
      $('#closePlanButton').addClass('hidden');
    }
    else {
      $('#mobilePlanGroup').removeClass('hidden');
      $('#mobilePlanGroup').addClass('hidden');
      $('#closePlanButton').removeClass('hidden');
    }
    
    $('#projectsInfoDiv').addClass('hidden');
    $('#projectInfoDiv').removeClass('hidden');
  },
  
  /**
   * Hide web page controls associated with planning project.
   */
  hideProjectControls: function() {
    $('#textsButton').addClass('hidden');
    $('#texts').addClass('hidden');
    $('#filesButton').addClass('hidden');
    $('#files').addClass('hidden');
    $('#commentsButton').addClass('hidden');
    $('#comments').addClass('hidden');
    
    $('#projectsInfoDiv').removeClass('hidden');
    $('#projectInfoDiv').addClass('hidden');
  },
  
  /**
   * Show web page controls associated with new planning project.
   */
  showNewProjectControls: function() {
    $('#infoButton').addClass('hidden');
    $('#infoButton').removeClass('active');
    $('#info').addClass('hidden');
    $('#info').removeClass('active');
    $('#newProposalButton').removeClass('hidden');
    $('#newProposalButton').addClass('active');
    $('#newProposal').removeClass('hidden');
    $('#newProposal').addClass('active');
  },
  
  /**
   * Hide web page controls associated with new planning project.
   */
  hideNewProjectControls: function() {
    $('#infoButton').removeClass('hidden');
    $('#infoButton').addClass('active');
    $('#info').removeClass('hidden');
    $('#info').addClass('active');
    $('#newProposalButton').addClass('hidden');
    $('#newProposalButton').removeClass('active');
    $('#newProposal').addClass('hidden');
    $('#newProposal').removeClass('active');
  },
  
  /**
   * Updates the planning projects info div UI.
   */
  updateProjectsInfoUI: function() {
    
    // Deal with the information alert for the user to log in.
    (PlanningModels.loggedInUser != null) ? PlanPage.hideControl('newPlanningProposalInfoNotLoggedIn') : PlanPage.showControl('newPlanningProposalInfoNotLoggedIn');
    
    // Deal with the newPlanbutton.
    (PlanningModels.loggedInUser != null) ? PlanPage.enableControl('newPlanButton') : PlanPage.disableControl('newPlanButton');
    
  },
  
  /**
   * Updates the new planning project tab UI. 
   */
  updateNewProjectTabUI: function() {
    
    // 'Add Polygon' Button.
    PlanningModels.loggedInUser != null &&
    PlanningProposal.areaOfInterest != null ?
      PlanPage.disableControl('addProposalPolygonButton') : PlanPage.enableControl('addProposalPolygonButton'); 
    
    // 'Clear Polygon' Button.
    PlanningModels.loggedInUser != null &&
    PlanningProposal.areaOfInterest != null ?
      PlanPage.enableControl('clearProposalPolygonButton') : PlanPage.disableControl('clearProposalPolygonButton'); 
    
    // 'Save Polygon' Button.
    PlanningModels.loggedInUser != null &&
    PlanningProposal.name != null &&
    PlanningProposal.name != '' &&
    PlanningProposal.description != null &&
    PlanningProposal.description != '' &&
    PlanningProposal.areaOfInterest != null ?
      PlanPage.enableControl('saveProposalButton') : PlanPage.disableControl('saveProposalButton');  
    
    // PlanningProposal.areaOfInterest != null ?
    //   PlanPage.enableControl('saveProposalButton') : PlanPage.disableControl('saveProposalButton');
    
  },
  
  /**
   * Updates the comments tab UI.
   */
  updateCommentsTabUI: function() {
    
    if (PlanningModels.loggedInUser != null) {
      // Hide the comments warning.
      $('#commentsWarning').empty();
      $('#commentsWarning').removeClass('hidden');
      $('#commentsWarning').addClass('hidden');
      PlanPage.isCommentsWarningVisible = false;
      
      // Enable the post comment text area.
      $('#postCommentTextArea').removeClass('disabled');
      
      // Enable all buttons related to posting a comment. 
      $('#addMarkerCommentButton').removeClass('disabled');
      $('#addPolylineCommentButton').removeClass('disabled');
      $('#addPolygonCommentButton').removeClass('disabled');
      $('#clearCommentButton').removeClass('disabled');
      
      //$('#postCommentButton').removeClass('disabled');
    }
    else {
      // Display the message to the user that comments can be posted only if logged in.
      $('#commentsWarning').empty();
      $('#commentsWarning').append('Please log in to the system to post comments. ')
      $('#commentsWarning').removeClass('hidden');
      PlanPage.isCommentsWarningVisible = true;
      
      // Disable the post comment text area.
      $('#postCommentTextArea').removeClass('disabled');
      $('#postCommentTextArea').addClass('disabled');
      
      // Disable all buttons related to posting a comment.
      $('#addMarkerCommentButton').removeClass('disabled');
      $('#addMarkerCommentButton').addClass('disabled');
      $('#addPolylineCommentButton').removeClass('disabled');
      $('#addPolylineCommentButton').addClass('disabled');
      $('#addPolygonCommentButton').removeClass('disabled');
      $('#addPolygonCommentButton').addClass('disabled');
      $('#clearCommentButton').removeClass('disabled');
      $('#clearCommentButton').addClass('disabled');
      
      //$('#postCommentButton').removeClass('disabled');
      //$('#postCommentButton').addClass('disabled');
    }
    
  },
  
  /**
   * Clears the planning proposal.
   */
  clearPlanningProposal: function() {
    
    Spatial.Leaflet.planningProposalAOIEditingLayerGroup.clearLayers();
    
    PlanningProposal.areaOfInterest = null;
    PlanningProposal.description = null;
    PlanningProposal.files = [];
    PlanningProposal.name = null;
    PlanningProposal.markdownText = null;
    
    $('#planningProposalNameTextBox').val('');
    $('#planningProposalDescriptionTextBox').val('');
    $('#planningProposalMarkdownEditor').val('');
    
  },
  
  /**
   * Populates a select control with data.
   */
  populateSelectControl: function(selectId, data, valueField, valueLabel) {
    var select = document.getElementById(selectId);
    
    for (var i = 0; i < data.length; i++) {
      var option = document.createElement('option');
      
      option.value = data[i][valueField];
      option.text = data[i][valueLabel];
      select.appendChild(option);
    }
  },
  
  /**
   * Opens a planning project.
   */
  openPlan: function () {
    
    // Loop through the features of the planning projects and try to find the one
    // that is currently selected in the optionsbox on the web page. 
    for (i = 0; i < PlanningModels.projectAOIsFcModel.features.length; i++) {
      if (PlanningModels.projectAOIsFcModel.features[i].properties.slug === PlanningModels.currentProjectSlug) {
        
        // The currently selected project has been found. Get its bounding box.
        var bbox = PlanningModels.projectAOIsFcModel.features[i].geometry.bbox();
        
        // Extract the southwest and northeast locations of the bounding box and create a Leaflet bounding box.
        var southWest = L.latLng(bbox[1], bbox[0]);
        var northEast = L.latLng(bbox[3], bbox[2]);
        var planningProjectBounds = L.latLngBounds(southWest, northEast);
        
        // Zoom the map in to the selected planning project.
        Spatial.Leaflet.map.fitBounds(planningProjectBounds);
        
        // Open the planning project.
        
        // Get the core planning project document.
        API.getPlanningProjectBySlug(PlanningModels.currentProjectSlug);
        
        // Show all the relevant project controls.
        PlanPage.showProjectControls();
        
        break;
        
      }
    }
    
  },
  
  /**
   * Closes the planning project.
   */
  closePlan: function () {
    
    // Remove the legend layers and empty the sorted geolayers array.
    Spatial.removeLegendLayers();
    PlanningModels.sortedGeoLayers = [];
    
    // Hide all the relevant project controls.
    PlanPage.hideProjectControls();
    
    // Clear comments related layers.
    Spatial.Leaflet.commentAOIEditingLayerGroup.clearLayers();
    Spatial.Leaflet.commentsAOIsLayer.clearLayers();
    
    // Clear geolayers.
    Spatial.Leaflet.planningProjectGeoLayersFeatureGroup.clearLayers();
    
  },
  
  /**
   * Adds the planning project description in the web page.
   */
  addPlanningProjectDescription: function() {
    
    $('#selectedPlanningProjectDescription').empty();
    
    var currentPP = PlanningModels.projectNamesListModel.planNames.filter(pn => pn.slug == PlanningModels.currentProjectSlug)[0];
    
    $('#selectedPlanningProjectDescription').append(currentPP.description);
    
  },
  
  /**
   * Adds the planning project names in the relevant list.
   */
  addPlanningProjectNames: function() {
    
    $('#planNamesListBox').empty();
    
    PlanPage.populateSelectControl('planNamesListBox', PlanningModels.projectNamesListModel.planNames, 'slug', 'name');
    PlanPage.addPlanningProjectDescription();
    
  },
  
  /**
   * Adds the core information associated with the currently opened planning project in the web page. 
   */
  addPlanningProjectInfo: function() {
    
    // Add the name of the planning project.
    $('#planningProjectName').empty();
    $('#planningProjectName').append(PlanningModels.currentProjectModel.plan.name);
    
    // Add the description of the planning project.
    $('#planningProjectDescription').empty();
    $('#planningProjectDescription').append(PlanningModels.currentProjectModel.plan.description);
    
    // Add the author of the planning project.
    $('#planningProjectAuthor').empty();
    $('#planningProjectAuthor').append(PlanningModels.currentProjectModel.plan.author.name.first + ' ' + PlanningModels.currentProjectModel.plan.author.name.last);
    
    // Add the state of the planning project.
    $('#planningProjectState').empty();
    $('#planningProjectState').append(PlanningModels.currentProjectModel.plan.state);
    
    // Toggle the checkbox according to of the planning project is official or not.
    $('#planningProjectIsOfficial').prop('checked', PlanningModels.currentProjectModel.plan.isOfficial);
    
    // Add the dates associated with the planning project.
    $('#planningProjectAddedDateTime').empty();
    if (PlanningModels.currentProjectModel.plan.dates.addedDateTime != undefined || PlanningModels.currentProjectModel.plan.dates.addedDateTime != null){
      $('#planningProjectAddedDateTime').append(PlanPage.formatISODateTime(PlanningModels.currentProjectModel.plan.dates.addedDateTime));  
    }
    
    $('#planningProjectChangedDateTime').empty();
    if (PlanningModels.currentProjectModel.plan.dates.changedDateTime != undefined || PlanningModels.currentProjectModel.plan.dates.changedDateTime != null){
      $('#planningProjectChangedDateTime').append(PlanPage.formatISODateTime(PlanningModels.currentProjectModel.plan.dates.changedDateTime));
    }
    
    $('#planningProjectProposedDate').empty();
    if (PlanningModels.currentProjectModel.plan.dates.proposedDate != undefined || PlanningModels.currentProjectModel.plan.dates.proposedDate != null){
      $('#planningProjectProposedDate').append(PlanPage.formatISODate(PlanningModels.currentProjectModel.plan.dates.proposedDate));
    }
    
    $('#planningProjectAcceptedDate').empty();
    if (PlanningModels.currentProjectModel.plan.dates.acceptedDate != undefined || PlanningModels.currentProjectModel.plan.dates.acceptedDate != null){
      $('#planningProjectAcceptedDate').append(PlanPage.formatISODate(PlanningModels.currentProjectModel.plan.dates.acceptedDate));
    }
    
    $('#planningProjectImplementationDate').empty();
    if (PlanningModels.currentProjectModel.plan.dates.implementationDate != undefined || PlanningModels.currentProjectModel.plan.dates.implementationDate != null){
      $('#planningProjectImplementationDate').append(PlanPage.formatISODate(PlanningModels.currentProjectModel.plan.dates.implementationDate));
    }
    
  },
  
  /**
   * Adds the texts associated with the planning project in the web page.
   */
  addPlanningProjectTexts: function() {
    
    // Clear all previous content.
    $('#projectTextsDiv').empty();
    
    // Get the plan texts.
    var planTexts = PlanningModels.currentProjectModel.plan.planTexts;
    
    if (planTexts != undefined || planTexts != null) {
      if (planTexts.length > 0) {
        
        // Sort the plan texts so as to be able to show them in the html page in order. 
        planTexts.sort(function(a, b) {
          return parseInt(a.order) - parseInt(b.order);
        });
        
        // Create the content that is going to be added in the page.
        var htmlContent = '<div>';
        
        for (i = 0; i < planTexts.length; i++) {
          htmlContent += '<p>' + planTexts[i].markdownText.html + '</p>'
        }
        
        htmlContent += '</div>';
        
        // Append the content in the related div.
        $('#projectTextsDiv').append(htmlContent);        
        
      }
    }
    
  },
  
  /**
   * Adds the files associated with the planning project in the web page.
   */
  addPlanningProjectFiles: function() {
    
    // Clear all previous content.
    $('#projectFilesDiv').empty();
    
    // Get the files.
    var files = PlanningModels.currentProjectModel.plan.files;
    
    if (files != undefined || files != null) {
      if (files.length > 0) {
        
        // Sort the files based on their name before adding them in the html page.
        files.sort(function(a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        
        // Create the content that is going to be added in the page.
        var htmlContent = '';
        
        for (i = 0; i < files.length; i++) {
          var file = files[i];
          htmlContent += PlanPage.createHtmlFileCard(file);               
        }
        
        // Append the contents in the related div.
        $('#projectFilesDiv').append(htmlContent);
        
      }
    }
    
  },
  
  /**
   * Add the comments associated with the planning project in the web page.
   */
  addPlanningProjectComments: function() {
    
    $('#projectCommentsDiv').empty();
    
    /*
    <nav>
      <ul class="pagination">
        <li class="disabled"><a href="#" aria-label="First"><span aria-hidden="true">««</span></a></li>
        <li class="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
        <li class="active"><a href="#">1 <span class="sr-only">(current)</span></a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a href="#">5</a></li>
        <li><a href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li>
        <li><a href="#" aria-label="Last"><span aria-hidden="true">»»</span></a></li>
      </ul>
    </nav>
    */
    
    // Enable or disable Buttons depending on whether a user is logged in or not.
    PlanPage.updateCommentsTabUI();
    
    // Check if the current project has pages with comments.
    if (PlanningModels.currentProjectPlanCommentsModel.comments.pages.length > 0) {
      
      // Create the htmlContents variable and open a pagination control.
      // The contents will have a pagination control at the top of the page,
      // a list of comments and pagination control at the end of the comments.
      var htmlContents = '<nav><ul class="pagination">';
      
      // Pagination controls depend on the number of pages with comments.
      // Up to 5 pages of comments result in a pagination control having up to 5 buttons with the number of each page on them.
      // More than 5 pages of comments result in a pagination control having 5 buttons displaying
      // pages around the current one, plus buttons to move to the first/last pages and buttons
      // to move in previous and next page.
      if (PlanningModels.currentProjectPlanCommentsModel.comments.pages.length < 11) { // TODO: Check out if this number will be 5, 10 or 20 - Make sure this will be a variable i nthe Members section.
        if (PlanningModels.currentProjectPlanCommentsModel.comments.currentPage == 1) {
          // Make this button the current button.
          htmlContents += '<li class="active"><a href="#" onclick="PlanPage.getComments(1)">1 <span class="sr-only">(current)</span></a></li>';
        }
        else {
          htmlContents += '<li><a href="#" onclick="PlanPage.getComments(1)">1</a></li>';
        }
        
        // If more than one pages of comments exist, proceed to add them on the pagination control.
        if (PlanningModels.currentProjectPlanCommentsModel.comments.pages.length > 1) {
          
          // Loop through the pages of comments and add the buttons.
          for (i = 1; i < PlanningModels.currentProjectPlanCommentsModel.comments.pages.length; i++) {
            if (PlanningModels.currentProjectPlanCommentsModel.comments.currentPage == (i + 1)) {
              // Make this button the current button.
              htmlContents += '<li class="active"><a href="#" onclick="PlanPage.getComments(' + (i + 1) + ')">' + (i + 1) + ' <span class="sr-only">(current)</span></a></li>';
            }
            else {
              htmlContents += '<li><a href="#" onclick="PlanPage.getComments(' + (i + 1) + ')">' + (i + 1) + '</a></li>';  
            }
          }
          
        }
        
        // Close the pagination and open the comments div.
        htmlContents += '</ul></nav><div>'; // '</ul></nav><br><div>';
        
        // Empty all comment GeoJSON features.
        PlanningModels.commentsAOIsFcModel.features = [];
        
        // Add the comments.
        for (i = 0; i < PlanningModels.currentProjectPlanCommentsModel.comments.results.length; i++) {
          var c = PlanningModels.currentProjectPlanCommentsModel.comments.results[i];
          
          if (c.areaOfInterest == undefined || c.areaOfInterest == null || c.areaOfInterest == '') {
            htmlContents += '<div class="bs-callout bs-callout-danger"><h4><a href="#">' + c.author.name.first + ' ' + c.author.name.last + '</a> - ' + PlanPage.formatISODateTime(c.dateTimeAdded) + '</h4>' + c.content + '</div>';
          }
          else {
            // An area of interest associated with this comment has been found. Add a zoom button to deal with it.
            htmlContents += '<div class="bs-callout bs-callout-danger">' +
                              '<h4><a href="#">' + c.author.name.first + ' ' + c.author.name.last + '</a> - ' + PlanPage.formatISODateTime(c.dateTimeAdded) + '</h4>' +
                              '<button type="button" class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="bottom" ' + 
                                       'title="Zoom in to the area of interest of the comment" ' +
                                       'onclick="Spatial.zoomToCommentAOI(' + "'" + c._id + "'" + ')"><i class="fa fa-search"><span style="font-family: Arial"> Zoom In<span></i></button><br>' +
                              c.content +
                            '</div>';
            
            // Add the area of interest of the comment and its contents in the relevant feature collection.
            Spatial.addCommentAOIToFeatureCollection(c);
          }
        }
        
        // Close the comments div and open a new pagination control.
        htmlContents += '</div><nav><ul class="pagination">'; // '</div><br><nav><ul class="pagination">';
        
        if (PlanningModels.currentProjectPlanCommentsModel.comments.currentPage == 1) {
          // Make this button the current button.
          htmlContents += '<li class="active"><a href="#" onclick="PlanPage.getComments(1)">1 <span class="sr-only">(current)</span></a></li>';
        }
        else {
          htmlContents += '<li><a href="#" onclick="PlanPage.getComments(1)">1</a></li>';
        }
        
        // If more than one pages of comments exist, proceed to add them on the pagination control.
        if (PlanningModels.currentProjectPlanCommentsModel.comments.pages.length > 1) {
          
          // Loop through the pages of comments and add the buttons.
          for (i = 1; i < PlanningModels.currentProjectPlanCommentsModel.comments.pages.length; i++) {
            if (PlanningModels.currentProjectPlanCommentsModel.comments.currentPage == (i + 1)) {
              // Make this button the current button.
              htmlContents += '<li class="active"><a href="#" onclick="PlanPage.getComments(' + (i + 1) + ')">' + (i + 1) + ' <span class="sr-only">(current)</span></a></li>';
            }
            else {
              htmlContents += '<li><a href="#" onclick="PlanPage.getComments(' + (i + 1) + ')">' + (i + 1) + '</a></li>';  
            }
          }
          
        }
      }
      else {
        
        // TODO: In case of more than 10 pages of comments the pagination control needs to be different.
        
      }
      
      // Close the pagination control.
      htmlContents += '</ul></nav><br>';
      
      $('#projectCommentsDiv').append(htmlContents);
      
      // Add the comments on the map.
      
      // Clear the internal layers of the commentsAOIsLayer. 
      Spatial.Leaflet.commentsAOIsLayer.clearLayers();
      
      // Add new data in the commentsAOIsLayer. (this is the featurecollection with the comments AOIs).
      Spatial.Leaflet.commentsAOIsLayer.addData(PlanningModels.commentsAOIsFcModel);
      
      // Set the style of the comments layer.
      Spatial.Leaflet.commentsAOIsLayer.setStyle(function(feature) {
        if (feature.geometry.type == 'LineString') {
          var lineStyle =Spatial.Leaflet.symbols.lineStyles.filter(s => s.slug == 'comment-polyline-style')[0]; 
          return lineStyle.definition;
        }
        else if (feature.geometry.type == 'Polygon') {
          var fillStyle = Spatial.Leaflet.symbols.fillStyles.filter(s => s.slug == 'comment-polygon-style')[0];
          return fillStyle.definition;
        }
      });
      
      // Bind a popup to each comment feature of the layer.
      Spatial.Leaflet.commentsAOIsLayer.eachLayer(function(layer) {
        var popupContent = '<table class="table table-condensed table-bordered table-popup">' +
                             '<thead><tr class="info"><th>Field</th><th>Value</th></tr></thead>' +
                             '<tbody>' +
                               '<tr><th>User:</th><td>' + Autolinker.link(String(layer.feature.properties.author.name.first)) + ' ' +
                                 Autolinker.link(String(layer.feature.properties.author.name.last)) + '</td></tr>' +
                               '<tr><th>Added on:</th><td>' + Autolinker.link(PlanPage.formatISODateTime(layer.feature.properties.dateTimeAdded)) + '</td></tr>' +
                               '<tr><td colspan="2" class="active"><div style="height:190px; overflow-y: auto;">' + Autolinker.link(String(layer.feature.properties.content)) + '</div></td></tr>' +
                             '</tbody' +
                           '</table>'; // +
                           //'<p>' + Autolinker.link(String(layer.feature.properties.content)) + '</p>';
        layer.bindPopup(popupContent)
      });
      
      // Zoom to the planning project AOIs.
      //Spatial.Leaflet.map.fitBounds(Spatial.Leaflet.planningProjectsAOIsLayer.getBounds());
      
    }
    
  },
  
  /**
   * Opens the webpage specified in the link in a new window.
   * 
   * @param  {string} url - The url of the page to be opened in a new window.
   */
  openNewWindow: function(url) {
    // Open the url in a new tab. It seems that does not work on all browsers in a consistent way.
    // var frm = $('<form   method="get" action="' + url + '" target="_blank"></form>');
    // $("body").append(frm);
    // frm.submit().remove();
    
    // Open the url in a new window.
    // (This will be a new tab if the user has setup the browser in such a way that new windows open in new tabs). 
    var win = window.open(url, '_blank');
    win.focus();
  },
  
  /**
   * Gets the specified page of comments associated with the current planning project.
   * 
   * @param  {any} page - The index of the page of comments to retrieve. 
   */
  getComments : function(page) {
    API.getPlanningProjectCommentsByPlanId(PlanningModels.currentProjectModel.plan._id, page);
  },
  
  /**
   * Clears the comment text area.
   */
  clearCommentToPostData : function() {
    
    PlanningModels.commentJsonToPost = null;
    PlanningModels.commentsAOIsFcModel.features = [];
    PlanningModels.commentToPost = null;
    
    $('#postCommentTextArea').val('');
    
    PlanPage.disableControl('postCommentButton');
    PlanPage.isPostCommentButtonEnabled = false;
    
    $('#commentsWarning').empty();
    PlanPage.hideControl('commentsWarning');
    PlanPage.isCommentsWarningVisible = false;
    
  },
  
  /**
   * The file that will be used to generate the html file card.
   * 
   * @param  {any} file - The file that will be used to generate the html file card.
   */
  createHtmlFileCard: function(file) {
    
    var result = PlanPage.fileIcons.filter(f => f.extension.toLocaleLowerCase() == file.extension);
    var iconClass = 'fa fa-file-o';
    
    if (result != undefined || result != null || result.length > 0) {
      iconClass = 'fa fa-' + result[0].iconKey;          
    }
    
    var userInfo = 'unknown';
    if (file.user != undefined || file.user != null) {
      if (file.user.name.first != undefined || file.user.name.first || null) {
        userInfo = file.user.name.first;
      }
      if (file.user.name.first != undefined || file.user.name.first || null) {
        userInfo += ' ' + file.user.name.last;
      }
    };
    
    let htmlContent = '<div class="panel panel-default bootcards-file">' +
                        '<div class="panel-heading">' +
                          '<h3 class="panel-title">File No: ' + (i + 1).toString() + '</h3>' +
                        '</div>' +
                        '<div class="list-group">' +
                          '<div class="list-group-item">' +
                            '<a href="#" onclick="PlanPage.openNewWindow(' + "'" + file.url + "'" + ')">' +
                              '<i class="' + iconClass + '"></i>' +
                            '</a>' +
                            '<h4 class="list-group-item-heading">' +
                              '<a href="#" onclick="PlanPage.openNewWindow(' + "'" + file.url + "'" + ')">' +
                                file.name +
                              '</a>' +
                            '</h4>' +
                            '<p class="list-group-item-text"><strong>' + file.extension.toUpperCase() + '</strong></p>' +
                            '<p class="list-group-item-text"><strong>Size: ' + file.size + '</strong></p>' +
                          '</div>' +
                          '<div class="list-group-item">' +
                            '<p class="list-group-item-text"><strong>Added by ' + userInfo + ' on ' + PlanPage.formatISODateTime(file.addedDateTime) + '</strong></p>' +
                          '</div>' +
                          '<div class="list-group-item">' +
                            '<p class="list-group-item-text">' + file.description + '.</p>' +
                          '</div>' +
                        '</div>' +
                        '<div class="panel-footer">' +
                          '<div class="btn-group btn-group-justified">' +
                            '<div class="btn-group">' +
                              '<button class="btn btn-primary" onclick="PlanPage.openNewWindow(' + "'" + file.url + "'" + ')">' +
                                '<i class="fa fa-arrow-down"></i>' +
                                ' Get File' +
                              '</button>' +
                            '</div>' +
                          '</div>' +
                        '</div>' +
                      '</div>';
                      
    return htmlContent;
    
  }
  
}

/**
 * API provides functions related to API calls.
 */
var API = {
  
  /**
   * The host url part. (eg: http://localhost:8084/).
   */
  host: "http://localhost:8084/", /* TODO: CHANGE host url to your domain */
  //host: "http://maps.humanities.manchester.ac.uk:8084/",
  
  /**
   * Gets the logged in user.
   * 
   * @param  {any} functionToCallAfter - A function that will be called after getting the logged in user. 
   */
  getLoggedInUser: function(functionToCallAfterwards) {
    
    var url = API.host + "api/user-getloggedin/";
    
    $.get(url, function(result, status) {
      
      PlanningModels.loggedInUser = result.user;
      
      PlanPage.updateProjectsInfoUI();
      
      if (functionToCallAfterwards != undefined || functionToCallAfterwards != null) {
        functionToCallAfterwards();
      }
      
    }).fail(function(error, status) {
      
      Popup.showError(error, status, 'An error has occured while getting the logged in user');
            
      PlanningModels.loggedInUser = null;
      
      PlanPage.updateProjectsInfoUI();
      
      if (functionToCallAfterwards != undefined || functionToCallAfterwards != null) {
        functionToCallAfterwards();
      }
      
    });
    
  },
  
  /**
   * Gets the symbols that will be used by the application.
   */
  getSymbols : function() {
    
    var url = API.host + "api/symbols-getbyslugs";
    
    var requestData = {
      lineStyleSlugs : ['comment-polyline-style', 'comment-to-add-polyline-style'],
      fillStyleSlugs : ['comment-polygon-style', 'comment-to-add-polygon-style', 'proposal-to-add-polygon-style']
    };
    
    $.post(url, requestData, function(result, status) {
      
      Spatial.Leaflet.symbols = result.symbols;
      
    }).fail(function(error, status) {
      
      Popup.showError(error, status, 'An error has occured while getting the symbols used by the application');
      
    });
    
  },
  
  /**
   * Gets the planning project names.
   */
  getPlanningProjectNames : function() {
    
    var url = API.host + "api/plan-names";
    
    $.get(url, function(result, status) {
      
      PlanningModels.projectNamesListModel = result;
      
      // Sort the plan names based on their name before adding them in the html page.
      PlanningModels.projectNamesListModel.planNames.sort(function(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      
      // Set the currentProjectSlug.
      PlanningModels.currentProjectSlug = PlanningModels.projectNamesListModel.planNames[0].slug;
      
      // Add the planning project names in the relevant listbox.
      PlanPage.addPlanningProjectNames();
      
    }).fail(function(error, status) {
      
      Popup.showError(error, status, 'An error has occured while getting the planning project names');
      
      PlanningModels.projectNamesListModel = null;
      
    });
    
  },
  
  /**
   * Gets the areas of interest for all planning projects.
   */
  getPlanningProjectAOIs : function() {
    
    var url = API.host + "api/plan-getaois";
    
    // Call the API endpoint to get the planning projects AOIs.
    $.get(url, function(result, status) {
      
      PlanningModels.projectAOIsListModel = result;
      
      var defUrl = API.host + "api/geolayerdefinition-getgraph-byslug/planning-project-aois-definition";
      
      // Get the planning project AOIs definition.
      $.get(defUrl, function(defResult, defStatus) {
        
        PlanningModels.projectAOIsDefinitionModel = defResult;
        
        var symbologyFunctionJson = String(PlanningModels.projectAOIsDefinitionModel.geoLayerDefinition.symbologyFunction.functionJson);
        var popupFunctionJson = PlanningModels.projectAOIsDefinitionModel.geoLayerDefinition.popupFunction.functionJson;
        
        var styleObject = JSONfn.parse(symbologyFunctionJson);
        var popupObject = JSONfn.parse(popupFunctionJson);
        
        Spatial.populateProjectAOIsFeatureCollection();
        
        // Clear the internal layers of the planningProjectsAOIsLayer. 
        Spatial.Leaflet.planningProjectsAOIsLayer.clearLayers();
        
        // Add new data in the planningProjectsAOIsLayer. (This is the featurecollection with the planning project AOIs).
        Spatial.Leaflet.planningProjectsAOIsLayer.addData(PlanningModels.projectAOIsFcModel);
        
        // Set the style of the layer.
        Spatial.Leaflet.planningProjectsAOIsLayer.setStyle(styleObject.symbologyFunction);
        
        // Bind a popup to each feature of the layer.
        Spatial.Leaflet.planningProjectsAOIsLayer.eachLayer(popupObject.onEachLayerPopupFunction);
        
        // Add an entry in the legend control.
        Spatial.Leaflet.legendControl.addOverlay(Spatial.Leaflet.planningProjectsAOIsLayer, Spatial.getProjectAOIsLegendEntry(styleObject));
        
        // Zoom to the planning project AOIs.
        Spatial.Leaflet.map.fitBounds(Spatial.Leaflet.planningProjectsAOIsLayer.getBounds());
        
      }).fail(function(defError, defStatus) {
        
        Popup.showError(error, status, 'An error has occured while getting the planning project areas of interest layer definition');
        
        PlanningModels.projectAOIsDefinitionModel = null;
        
      });
      
    }).fail(function(error, status) {
      
      Popup.showError(error, status, 'An error has occured while getting the planning projects areas of interest');
      
      PlanningModels.projectAOIsListModel = null;
      
    });
    
  },
  
  /**
   * Gets the plan specified by the slug.
   * 
   * @param  {string} slug - The slug of the planning project to be retrieved.
   */
  getPlanningProjectBySlug : function(slug) {
    
    var url = API.host + "api/plan-getgraph-byslug/" + slug;
    
    $.get(url, function(result, status) {
      
      PlanningModels.currentProjectModel = result;
      
      //alert(JSON.stringify(PlanningModels.currentProjectModel));
      
      // Add the core project information in the html page.
      PlanPage.addPlanningProjectInfo();
      
      // Add the associated planning project texts in the html page.
      PlanPage.addPlanningProjectTexts();
      
      // Add the associated planning project files in the html page.
      PlanPage.addPlanningProjectFiles();
      
      // Add the associated planning project geolayers on the map.
      Spatial.addPlanningProjectGeoLayers();
      
      // Get the associated planning project comments.
      API.getPlanningProjectCommentsByPlanId(PlanningModels.currentProjectModel.plan._id, 1);
      
      // Add the legend layers.
      Spatial.addLegendLayers();
      
    }).fail(function(error, status) {
      
      Popup.showError(error, status, 'An error has occured while getting the planning project');
      
      PlanningModels.currentProjectModel = null;
      
    });
    
  },
  
  /**
   * Gets the planning project AOIs definition.
   * 
   * @param  {string} slug - The slug of the planning project used to retrieve its geolayers definitions.
   */
  getPlanningProjectAOIsDefinitionBySlug : function(slug) {
    
    var url = API.host + "api/geolayerdefinition-getgraph-byslug/" + slug;
    
    $.get(url, function(result, status) {
      
      PlanningModels.projectAOIsDefinitionModel = result;
      
    }).fail(function(error, status) {
      
      alert(
        'An error has occured while getting the planning project AOIs definition' + '\r\n\r\n' +
        'Status: ' + status + ' ' + error.status + ' ' + error.statusText + '\r\n' +
        'Result:\r\n' + JSON.stringify(error.responseJSON)
      );
      
      PlanningModels.projectAOIsDefinitionModel = null;
      
    });
    
  },
  
  /**
   * Gets the comments associated with the current planning project.
   * 
   * @param  {string} planId - The id of the planning project to retrieve.
   * @param  {number} page - The index number of the page comments to retrieve.
   */
  getPlanningProjectCommentsByPlanId : function(planId, page) {
    
    var url = API.host + "api/comment-getby-planid-page/" + planId + '/' + page;
    
    $.get(url, function(result, status) {
      
      PlanningModels.currentProjectPlanCommentsModel = result;
      
      // Get the logged in user and then add the planning project comments on the web page.
      var addPlanningProjectComments = PlanPage.addPlanningProjectComments;
      addPlanningProjectComments();
      //API.getLoggedInUser(addPlanningProjectComments);
      
    }).fail(function(error, status) {
      
      Popup.showError(error, status, 'An error has occured while getting the plan comments');
      
      PlanningModels.currentProjectPlanCommentsModel = null;
      
    });
    
  },
  
  /**
   * Posts a comment to the system.
   */
  postComment : function() {
    
    var url = API.host + "api/comment/create";
    
    var commentWktToPost = null;
    if (PlanningModels.commentJsonToPost != null) {
      commentWktToPost = Terraformer.WKT.convert(PlanningModels.commentJsonToPost.geometry);
    }
    
    var data = {
      planId: PlanningModels.currentProjectModel.plan._id,
      comment: PlanningModels.commentToPost,
      commentWkt: commentWktToPost
    };
    
    $.post(url, data, function(result, status) {
      
      PlanningModels.commentCreated = result.item;
      
      // A comment has been created, get the comments again.
      API.getPlanningProjectCommentsByPlanId(PlanningModels.currentProjectModel.plan._id, 0);
      
      // Clear the comment data.
      PlanPage.clearCommentToPostData();
      
    }).fail(function(error, status) {
      
      Popup.showError(error, status, 'An error has occured while posting the comment');
      
      PlanningModels.commentCreated = null;
      
    });
    
  },
  
  /**
   * Posts a planning proposal to the system.
   */
  postPlanningProposal : function() {
    
    var url = API.host + "api/plan/create";
    
    $.post(url, PlanningProposal, function(result, status) {
      
      var planCreated = result.item;
      
      // Clear the planning proposal and hide the relevant controls.
      PlanPage.clearPlanningProposal();
      PlanPage.updateNewProjectTabUI();
      PlanPage.hideNewProjectControls();
      
      // TODO: Make sure a new request is been done !!!
      // A plan has been created, get the plans again.
      //API.getPlanningProjectCommentsByPlanId(PlanningModels.currentProjectModel.plan._id, 0);
      
      API.getPlanningProjectNames();
      API.getPlanningProjectAOIs();
      
    }).fail(function(error, status) {
      
      Popup.showError(error, status, 'An error has occured while posting the planning proposal');
      
    });
    
  }
  
};

// ================================================================================

// ================================================================================
//   Webpage Events.

/**
 * Raised once the web page is ready.
 * 
 * @param  {any} function() - The function to be executed once the document is ready.
 */
$(document).ready(function() {
  
  PlanningModels.language = PlanPage.getLanguage();
  
  API.getLoggedInUser();
  API.getSymbols();
  
  Spatial.initializeMap();
  
  API.getPlanningProjectNames();
  API.getPlanningProjectAOIs();
  
  PlanPage.initializePlanningProposalMarkdownEditor();
  
});

/**
 * The click event of the showMapButton used to show the map to a user of a mobile device.
 * 
 * @param  {any} function() - The function to be executed once the click event is fired.
 */
$('#showMapButton').click(function () {
  
  if (UserAgent.device.type == 'Mobile' || UserAgent.device.type == 'Tablet') {
    $('#infoButton').removeClass('active');
    $('#sidebar').addClass('collapsed');
  }
  
});

/**
 * The click event of the openPlanButton used to open a planning project.
 * 
 * @param  {any} function() - The function to be executed once the click event is fired.
 */
$('#openPlanButton').click(function () {

  PlanPage.openPlan();
  
});

/**
 * The click event of the closePlanButton used to close a planning project.
 * 
 * @param  {any} function() - The function to be executed once the click event is fired.
 */
$('#closePlanButton').click(function () {
  
  PlanPage.closePlan();
  
});

/**
 * The click event of the closePlanMobileButton used to close a planning project.
 * 
 * @param  {any} function() - The function to be executed once the click event is fired.
 */
$('#closePlanMobileButton').click(function() {
  
  PlanPage.closePlan();
  
});

/**
 * The click event of the zoomPlanButton used to zoom in to the currently selected planning project.
 * 
 * @param  {any} function() - The function to be executed once the click event is fired.
 */
$('#zoomPlanButton').click(function() {
  
  Spatial.zoomToSelectedPlan();
  
});

/**
 * The click event of the newPlanButton used to create a new planning project.
 * 
 * @param  {any} function() - The function to be executed once the click event is fired.
 */
$('#newPlanButton').click(function() {
  
  PlanPage.showNewProjectControls();
  
});

/**
 * The click event of the saveProposalButton used to save a planning project proposal.
 * 
 * @param  {any} function() - The function to be executed once the click event is fired.
 */
$('#saveProposalButton').click(function() {
  
  PlanningProposal.markdownText = null;
  
  var markdownContent = $('#planningProposalMarkdownEditor').val();
  
  if (markdownContent != undefined || markdownContent != null) {
    PlanningProposal.markdownText = markdownContent;
  }
  
  API.postPlanningProposal();
  
});

/**
 * The click event of the cancelProposalButton used to cancel the process of creating a new planning project.
 * 
 * @param  {any} function() - The function to be executed once the click event is fired.
 */
$('#cancelProposalButton').click(function() {
  
  // Clear the planning proposal and hide the relevant controls.
  PlanPage.clearPlanningProposal();
  PlanPage.updateNewProjectTabUI();
  PlanPage.hideNewProjectControls();
  
});

/**
 * The click event of the addProposalPolygonButton used to add the polygon
 * of the area of interest of a new planning project proposal.
 * 
 * @param  {any} function() - The function to be executed once the click event is fired.
 */
$('#addProposalPolygonButton').click(function () {
  
  if (UserAgent.device.type == 'Mobile' || UserAgent.device.type == 'Tablet') {
    $('#newProposalButton').removeClass('active');
    $('#sidebar').addClass('collapsed');
  }
  
  if (Spatial.Leaflet.map.editTools.drawing) {
    Spatial.Leaflet.map.editTools.stopDrawing();  
  }
  
  Spatial.Leaflet.map.editTools.featureType = 'proposal';
  Spatial.Leaflet.map.editTools.startPolygon();
  
});

/**
 * The click event of the clearProposalPolygonButton used to clear the polygon
 * of the area of interest of a new planning project proposal.
 * 
 * @param  {any} function() - The function to be executed once the click event is fired.
 */
$('#clearProposalPolygonButton').click(function() {
  
  // Clear the planning proposal AOI from the map and from the PlanningProposal object. 
  Spatial.Leaflet.planningProposalAOIEditingLayerGroup.clearLayers();
  PlanningProposal.areaOfInterest = null;
  
  // Update the UI.
  PlanPage.updateNewProjectTabUI();
  
});

/**
 * Raised once the text of the postCommentTextArea has been changed.
 * 
 * @param  {any} function() - The function to be executed once the input event is fired.
 */
$('#postCommentTextArea').on('input', function() {
  
  var commentString = $('#postCommentTextArea').val();
  
  if (commentString != undefined || commentString != null) {
    if (commentString.length != 0) {
      
      // A comment exist.
      if (commentString.length == PlanningModels.maxCommentLength) {
        
        // The comment has reached its maximum length.
        
        // Show a warning that the maximum length of the comment has been reached.
        $('#commentsWarning').empty();
        $('#commentsWarning').append('Maximum comment length has been reached.');
        PlanPage.showControl('commentsWarning');
        PlanPage.isCommentsWarningVisible = true;
        
      }
      else {
        
        // The comment has not reached the maximum length yet.
        if (PlanPage.isCommentsWarningVisible) {
          // Hide the comments warning.
          $('#commentsWarning').empty();
          PlanPage.hideControl('commentsWarning');
          PlanPage.isCommentsWarningVisible = false;
        }
        
      }
      
      // Eanble the post comment button.
      if (!PlanPage.isPostCommentButtonEnabled) {
        PlanPage.enableControl('postCommentButton');
        PlanPage.isPostCommentButtonEnabled = true;
      }
        
    }
    else {
      
      // No comment exist. 
      
      // Hide the comments warning.
      $('#commentsWarning').empty();
      PlanPage.hideControl('commentsWarning');
      PlanPage.isCommentsWarningVisible = false;
      
      // Disable the post comment button.
      if (PlanPage.isPostCommentButtonEnabled) {
        PlanPage.disableControl('postCommentButton');
        PlanPage.isPostCommentButtonEnabled = false;
      }
      
    }
  }
  
});

/**
 * The click event of the postCommentButton used to post a user's comment in to the remote server.
 * 
 * @param  {any} function() - The function to be executed once the click event is fired.
 */
$('#postCommentButton').click(function() {
  
  var commentString = $('#postCommentTextArea').val();
  
  if (commentString == undefined || commentString == null || commentString.length == 5) {
    Popup.showWarning('Error posting comment', 'No comment has been provided by user.');
    return;
  }
  
  PlanningModels.commentToPost = commentString; 
  API.postComment();
  
});

/**
 * The change event of the planNamesListBox used to set the PlanningModels.currentProjectSlug value
 * and to update the planning project description in the web page.
 * 
 * @param  {any} function() - The function to be executed once the click event is fired. 
 */
$('#planNamesListBox').change(function() {
  
  PlanningModels.currentProjectSlug = $('#planNamesListBox option:selected').val();
  
  PlanPage.addPlanningProjectDescription();
  
});

/**
 * Add a marker comment on the map.
 * 
 * @param  {any} function() - The function to be executed once the click event is fired.
 */
$('#addMarkerCommentButton').click(function () {
  
  if (UserAgent.device.type == 'Mobile' || UserAgent.device.type == 'Tablet') {
    $('#commentsButton').removeClass('active');
    $('#sidebar').addClass('collapsed');
  }
  
  if (Spatial.Leaflet.map.editTools.drawing) {
    Spatial.Leaflet.map.editTools.stopDrawing();
  }
  
  Spatial.Leaflet.map.editTools.featureType = 'comment';
  Spatial.Leaflet.map.editTools.startMarker();
  
});

/**
 * Add a polyline comment on the map.
 * 
 * @param  {any} function() - The function to be executed once the click event is fired.
 */
$('#addPolylineCommentButton').click(function () {
  
  if (UserAgent.device.type == 'Mobile' || UserAgent.device.type == 'Tablet') {
    $('#commentsButton').removeClass('active');
    $('#sidebar').addClass('collapsed');
  }
  
  if (Spatial.Leaflet.map.editTools.drawing) {
    Spatial.Leaflet.map.editTools.stopDrawing();
  }
  
  Spatial.Leaflet.map.editTools.featureType = 'comment';
  Spatial.Leaflet.map.editTools.startPolyline();
  
});

/**
 * Add a polygon comment on the map.
 * 
 * @param  {any} function() - The function to be executed once the click event is fired.
 */
$('#addPolygonCommentButton').click(function () {
  
  if (UserAgent.device.type == 'Mobile' || UserAgent.device.type == 'Tablet') {
    $('#commentsButton').removeClass('active');
    $('#sidebar').addClass('collapsed');
  }
  
  if (Spatial.Leaflet.map.editTools.drawing) {
    Spatial.Leaflet.map.editTools.stopDrawing();  
  }
  
  Spatial.Leaflet.map.editTools.featureType = 'comment';
  Spatial.Leaflet.map.editTools.startPolygon();
  
});

/**
 * Clears the comment from the map.
 * 
 * @param  {any} function() - The function to be executed once the click event is fired.
 */
$('#clearCommentButton').click(function () {
  
  Spatial.Leaflet.commentAOIEditingLayerGroup.clearLayers();
  PlanningModels.commentJsonToPost = null;
  
  if (UserAgent.device.type == 'Mobile' || UserAgent.device.type == 'Tablet') {
    Popup.showInfo('Information', '<br>The comment\'s \'area of interest\' has been removed from the map.<br><br>');
  }
  
});

/**
 * Raised once the text of the planningProposalNameTextBox has been changed.
 * 
 * @param  {any} function() - The function to be executed once the input event is fired.
 */
$('#planningProposalNameTextBox').on('input', function() {
  PlanningProposal.name = $('#planningProposalNameTextBox').val(); 
  PlanPage.updateNewProjectTabUI();
});

/**
 * Raised once the text of the planningProposalDescriptionTextBox has been changed.
 * 
 * @param  {any} function() - The function to be executed once the input event is fired.
 */
$('#planningProposalDescriptionTextBox').on('input', function() {
  PlanningProposal.description = $('#planningProposalDescriptionTextBox').val();
  PlanPage.updateNewProjectTabUI();
});

// ================================================================================
