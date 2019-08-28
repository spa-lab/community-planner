
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            GeoLayer [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
// 
//  Description:     The Geolayer model is used to store GeoJSON data.
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the GeoLayer.
var GeoLayer = new keystone.List('GeoLayer', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
});

// Add fields in the model.
GeoLayer.add({
  
  // The name of the GeoLayer.
  name: { type: String, required: true },
  
  // The description of the GeoLayer.
  description: { type: String },
  
  // The GeoJSON datatype that is stored in the GeoLayer model. 
  dataType: { type: Types.Select, options: 'FeatureCollection, Feature, GeometryCollection, Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon', default: 'FeatureCollection', index: true },
  
  // The GeoJSON data. The data needs to be a valid minified and escaped JSON object.
  geoJsonData: { type: Types.Code, height: 500, language: 'json' },
  
  // The associated definitions used to render the GeoLayer.
  definitions: { type: Types.Relationship, ref: 'GeoLayerDefinition', many: true }
  
});

// Define the relationships of the GeoLayer.
GeoLayer.relationship({ ref: 'Plan', path: 'geoLayers' });

// Register the model.
GeoLayer.defaultColumns = 'name|30%, description, dataType|20%';
GeoLayer.register();
