
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            GeoLayerDefinition [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
// 
//  Description:     The GeoLayerDefinition model is used to describe the
//                   rendering of a GeoLayer.
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the GeoLayerDefinition.
var GeoLayerDefinition = new keystone.List('GeoLayerDefinition', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
});

// Add fields in the model.
GeoLayerDefinition.add({
  
  // The name of the GeoLayerDefinition.
  name: { type: String, required: true },
  
  // The description of the GeoLayerDefinition.
  description: { type: String },
  
  // The order of the GeoLayers.
  order: { type: Number, default: 0 },
  
  // The symbology function.
  symbologyFunction: { type: Types.Relationship, ref: 'SymbologyFunction', many: false },
  
  // The popup function.
  popupFunction: { type: Types.Relationship, ref: 'PopupFunction', many: false }
  
});

// Define the relationships of the GeoLayerDefinition.
GeoLayerDefinition.relationship({ ref: 'GeoLayer', path: 'definitions' });
GeoLayerDefinition.relationship({ ref: 'Plan', path: 'geoLayersDefinitions' });

// Register the model.
GeoLayerDefinition.defaultColumns = 'name|30%, description, order';
GeoLayerDefinition.register();
