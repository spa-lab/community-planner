
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            User [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
// 
//  Description:     The User model stores information related to a user.
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the User.
var User = new keystone.List('User');

// Add the fields in the model.
User.add({

  // the name of the user.
	name: { type: Types.Name, required: true, index: true },

  // The email of the user.
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },

  // The password of the user.
	password: { type: Types.Password, initial: true, required: true },

  // The string used to confirm that the person that has created this account is real.
  // Once the user confirms identity the string becomes null. 
  confirmString: { type: String },
  
  // The string used to reset the account of the user. 
  resetString: { type: String }
  
}, 'Permissions', {

  // Indicates whether the user is an administrator or not.
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }

});

// Provide access to Keystone.
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});

// Define the relationships of the User.
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.relationship({ ref: 'Comment', path: 'comments', refPath: 'author' });
User.relationship({ ref: 'File', path: 'files', refPath: 'user' });
User.relationship({ ref: 'Plan', path: 'plans', refPath: 'author' });

// Register the model.
User.defaultColumns = 'name, email, isAdmin';
User.register();
