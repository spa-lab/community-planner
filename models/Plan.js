
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            Plan [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 11/05/2016.
// 
//  Description:     The Plan model stores information related to a
//                   planning project.
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the Plan.
var Plan = new keystone.List('Plan', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
});

// Add fields in the model.
Plan.add({
  
  // The name of the Plan.
  name: { type: String, required: true },
  
  // The description of the Plan.
  description: { type: String },
  
  // The state of the plan.
  state: { type: Types.Select, options: 'proposed, accepted, implementation', default: 'proposed', label: 'State', index: true },
  
  // Indicates whether the plan is official.
  isOfficial: { type: Boolean, default: false },
  
  // The dates that the state of the plan has changed.
  dates: {
    
    // The datetime that the plan was created in the system.
    addedDateTime: { type: Types.Datetime, index: true, default: Date.now },
    
    // The datetime that the plan was changed in the system.
    changedDateTime: { type: Types.Datetime, index: true },
    
    // The date that the plan was proposed.
    proposedDate: { type: Types.Date, index: true, dependsOn: {state: 'proposed'} },
    
    // The date that the plan has been accepted.
    acceptedDate: { type: Types.Date, index: true, dependsOn: {state: 'accepted'} },
    
    // The date that the plan has entered the implementation phase.
    implementationDate: { type: Types.Date, index: true, dependsOn: { state: 'implementation' } }
    
  },
  
  // The area Of Interest of the planning project.
  // The data must be a valid WKT string.
  areaOfInterest: { type: Types.Textarea, height: 500 },
  
  // The GeoLayers associated with this planning project.  
  geoLayers: { type: Types.Relationship, ref: 'GeoLayer', many: true },
  
  // The definition of the geolayers.
  // This is a Tuple having the slugs of the geolayer and geolayer definition.
  geoLayersDefinitions: { type: Types.Relationship, ref: 'GeoLayerDefinition', many: true },
  
  // The texts in markdown format describing the planning project.
  planTexts: { type: Types.Relationship, ref: 'PlanText', many: true },
  
  // The files related to the planning project.
  files: { type: Types.Relationship, ref: 'File', many: true },
  
  // The comments associated with the project.
  comments: { type: Types.Relationship, ref: 'Comment', many: true },
  
  // The user that created this project.
  author: { type: Types.Relationship, ref: 'User', many: false }
  
});

// Define the relationships of the Plan.
Plan.relationship({ ref: 'Comment', path: 'plan' });

// Register the model.
Plan.defaultColumns = 'name|30%, description|40%, state|15%, isOfficial|15%';
Plan.register();
