
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            PopupFunction [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
// 
//  Description:     The PopupFunction model is used to store an object having
//                   minified javascript functions that can be used to display
//                   a popup message on the map.
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the PopupFunction.
var PopupFunction = new keystone.List('PopupFunction', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
});

// Add fields in the model.
PopupFunction.add({
  
  // The name of the PopupFunction.
  name: { type: String, required: true },
  
  // The description of the PopupFunction.
  description: { type: String },
  
  // The JSON onject storing the function.
  // It needs to be a minified JSON object with a single property
  // which stores the symbology function code. 
  functionJson: { type: Types.Textarea, height: 500 }
  
});

// Define the relationships of the PopupFunction.
PopupFunction.relationship({ ref: 'GeoLayerDefinition', path: 'popupFunction' });

// Register the model.
PopupFunction.defaultColumns = 'name|30%, description';
PopupFunction.register();
