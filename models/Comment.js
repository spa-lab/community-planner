
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            Comment [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
// 
//  Description:     The Comment model stores the user comments.
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the Comment.
var Comment = new keystone.List('Comment', {
  //map: { name: 'name' },
  //autokey: { path: 'slug', from: 'name', unique: false }
});

// Add fields in the model.
Comment.add({
  
  // The username of the author of the comment.
  // *** This field needs to be removed ***
  username: { type: String },
  
  // The author of the comment.
  author: { type: Types.Relationship, ref: 'User', index: true, many: false },
  
  // The date and time that the comment was added.
  dateTimeAdded: { type: Types.Datetime, default: Date.now },
  
  // The content of the comment.
  content: { type: Types.Textarea, height: 500},
  
  // The area Of Interest of the comment (if any).
  // The data must be a valid WKT string.
  areaOfInterest: { type: Types.Textarea, height: 500 },
  
  // The plan that this comment is associated with.
  plan: { type: Types.Relationship, ref: 'Plan', many: false }
  
});

// Register the model.
Comment.defaultColumns = 'name|20%, username, dateTimeAdded|30%, plan';
Comment.register();
