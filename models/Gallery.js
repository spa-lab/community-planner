
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            Gallery [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
// 
//  Description:     The Gallery model stores information related to a gallery.
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the Gallery.
var Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key', unique: true },
});

// Add fields in the model.
Gallery.add({

  // The name of the Gallery.
	name: { type: String, required: true },

  // The date that this gallery was created.
	publishedDate: { type: Date, default: Date.now },

  // The hero image of the gallery.
	heroImage: { type: Types.CloudinaryImage },

  // The images of the gallery.
	images: { type: Types.CloudinaryImages }

});

// Register the model.
Gallery.register();
