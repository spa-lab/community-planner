
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            PlanText [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
// 
//  Description:     The PlanText model stores textual information related to a
//                   planning project.
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the PlanText.
var PlanText = new keystone.List('PlanText', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
});

// Add fields in the model.
PlanText.add({
  
  // The name of the PlanText.
  name: { type: String, required: true },
  
  // The description of the PlanText.
  description: { type: String },
  
  // The order of the text in the planning project.
  order: { type: Number, default: 0 },
  
  // The text in markdown format.
  markdownText: { type: Types.Markdown, height: 500}
  
});

// Define the relationships of the PlanText.
PlanText.relationship({ ref: 'Plan', path: 'planTexts' });

// Register the model.
PlanText.defaultColumns = 'name|30%, description';
PlanText.register();
