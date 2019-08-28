
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            Tuple [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
// 
//  Description:     Used to store a tuple of generic values related to each other
//                   as strings.
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the Tuple.
var Tuple = new keystone.List('Tuple', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
});

// Add fields in the model.
Tuple.add({
  
  // The name of the Tuple.
  name: { type: String, required: true },
  
  // Tuple values.
  t1: { type: String, required: false, index: true },
  t2: { type: String, required: false, index: true },
  t3: { type: String, required: false, index: true },
  t4: { type: String, required: false, index: true },
  t5: { type: String, required: false, index: true },
  t6: { type: String, required: false, index: true },
  t7: { type: String, required: false, index: true },
  t8: { type: String, required: false, index: true },
  
  // The type that the string values should be casted.
  c1: { type: String, required: false, index: true },
  c2: { type: String, required: false, index: true },
  c3: { type: String, required: false, index: true },
  c4: { type: String, required: false, index: true },
  c5: { type: String, required: false, index: true },
  c6: { type: String, required: false, index: true },
  c7: { type: String, required: false, index: true },
  c8: { type: String, required: false, index: true },
  
  // Indicates the level of access for this tuple.
  accessedBy: { type: Types.Select, options: 'all, users, admins', default: 'all', label: 'Accessed By' }
  
});

// Register the model.
Tuple.defaultColumns = 'name, accessedBy';
Tuple.register();
