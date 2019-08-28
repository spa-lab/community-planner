
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            Post [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
// 
//  Description:     The Post model stores a web page post. 
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the Post.
var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

// Add fields in the model.
Post.add({

	// The title of the post.
	title: { type: String, required: true },

	// The current state of the post.
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },

	// The author of the post.
	author: { type: Types.Relationship, ref: 'User', index: true },

	// The date that the post was published.
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },

	// The image of this post.
	image: { type: Types.CloudinaryImage },

	content: {

		// The brief content of this post.
		brief: { type: Types.Html, wysiwyg: true, height: 150 },

		// The extended content of this post.
		extended: { type: Types.Html, wysiwyg: true, height: 400 }

	},

	// The categories of this post.
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true }

});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

// Register the model.
Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
