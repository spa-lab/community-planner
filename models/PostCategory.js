
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            PostCategory [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
// 
//  Description:     The PostCategory model stores the category of a web page post. 
// ================================================================================


var keystone = require('keystone');

// Create the PostCategory.
var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

// Add fields in the model.
PostCategory.add({

  // The name of the PostCategory.
	name: { type: String, required: true }

});

// Define the relationships of the PostCategory.
PostCategory.relationship({ ref: 'Post', path: 'posts', refPath: 'categories' });

// Register the model.
PostCategory.register();
