
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            SymbologyFunction [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
// 
//  Description:     The SymbologyFunction model is used to store an object
//                   having minified javascript functions that can be used to
//                   render a layer according to the symbology specified in
//                   the function.
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the SymbologyFunction.
var SymbologyFunction = new keystone.List('SymbologyFunction', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
});

// Add fields in the model.
SymbologyFunction.add({
  
  // The name of the SymbologyFunction.
  name: { type: String, required: true },
  
  // The description of the SymbologyFunction.
  description: { type: String },
  
  // Indicates if the function is used for points.
  isForPoints: { type: Boolean, default: false },
  
  // The method used to symbolize the features. 
  method: { type: Types.Select, options: 'Single, Categories, Quantiles, Charts, MultipleAttributes, Other', default: 'Single', index: true },
  
  // The classification used to symbolize the features.
  classification: { type: Types.Select, options: 'NoClassification, Manual, EqualInterval, DefinedInterval, Quantile, NaturalBreaks, GeometricalInterval, StandardDeviation', default: 'NoClassification', index: true },
  
  // The JSON object storing the function.
  // It needs to be a minified JSON object with a single property
  // which stores the symbology function code. 
  functionJson: { type: Types.Textarea, height: 500 }
  
});

// Define the relationships of the SymbologyFunction.
SymbologyFunction.relationship({ ref: 'GeoLayerDefinition', path: 'symbologyFunction' });

// Register the model.
SymbologyFunction.defaultColumns = 'name|30%, description, method|15%, classification|15%';
SymbologyFunction.register();
