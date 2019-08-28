
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            KeyValuePair [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
// 
//  Description:     Used to store generic key value pairs.
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the KeyValuePair.
var KeyValuePair = new keystone.List('KeyValuePair', {
  map: { name: 'key' },
  autokey: { path: 'lckey', from: 'key', unique: true }
});

// Add fields in the model.
KeyValuePair.add({
  
  // The key of the KeyValuePair.
  key: { type: String, required: true, unique: true, default: 'key', index: true },
  
  // The value of the KeyValuePair.
  value: { type: String, required: true, default: 'value' },
  
  // The type that the string value should be casted.
  cast: { type: String, required: false, index: true },
  
  // Indicates the level of access for this keyvalue pair.
  accessedBy: { type: Types.Select, options: 'all, users, admins', default: 'all', label: 'Accessed By' }
  
});

// Register the model.
KeyValuePair.defaultColumns = 'key, value, cast, accessedBy';
KeyValuePair.register();
