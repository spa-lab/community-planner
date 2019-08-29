
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            File [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
//                   Vasilis Vlastaras (@gisvlasta), 29/08/2019.
//                     Corrected File.relationship definition
// 
//  Description:     The File model stores information related to a file.
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the file.
var File = new keystone.List('File', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
});

// Add fields in the model.
File.add({
  
  // The name of the File.
  name: { type: String, required: true },
  
  // The description of the File.
  description: { type: String },
  
  // The datetime that the plan was created in the system.
  addedDateTime: { type: Types.Datetime, index: true, default: Date.now, required: true },
  
  // The url of the file (if any).
  url: { type: Types.Url},
  
  // The file extension of the file.
  extension: { type: String },
  
  // The size of the file. This is a text and should include MB or KB etc.
  size: { type: String, default: 'Unknown' },
  
  // The local file.
  //localFile: { tpe: Types.LocalFile },
  
  // The user that created this project.
  user: { type: Types.Relationship, ref: 'User', many: false }
  
});

// Define the relationships of the Plan.
File.relationship({ ref: 'Plan', path: 'plans', refPath: 'files' });

// Register the model.
File.defaultColumns = 'name|20%, description|30%, localFile';
File.register();
