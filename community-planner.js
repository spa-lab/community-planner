// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'community-planner',
	'brand': 'community-planner',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '.hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'emails': 'templates/emails',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
  'port': 8084,
  'signin url': '/signin',
  'signin redirect': '/',
  'signout url': '/signout',
  'signout redirect': '/',
  //'signin logo': ['/images/logos/bootle-2020-logo.svg', 200, 200]
  'signin logo': ['/images/key.svg', 200, 200],
  //'signin logo': ['/images/key3.svg', 200, 200],
  //'signin logo': ['/images/user3.svg', 200, 200],
  //'signin logo': ['/images/users2.svg', 200, 200],
  //'signin logo': ['/images/users4.svg', 200, 200]
  
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	enquiries: 'enquiries',
  galleries: 'galleries',
  geolayers: ['geo-layers', 'geo-layer-definitions', 'popup-functions', 'symbology-functions'],
  plans: ['comments', 'files', 'plans', 'plan-texts'],
  posts: ['posts', 'post-categories'],
  styles: ['base-icon-styles', 'circle-marker-styles', 'div-icon-styles', 'fill-styles', 'icon-styles', 'line-styles', 'simple-fill-styles'],
	users: 'users'
});

// Start Keystone to connect to your database and initialise the web server


if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	console.log('----------------------------------------'
	+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
	+ '\n----------------------------------------'
	+ '\nYou have opted into email sending but have not provided'
	+ '\nmailgun credentials. Attempts to send will fail.'
	+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
	+ '\nset up your mailgun integration');
}


keystone.start();
// Use JavaScript source maps (if they exist).// Use JavaScript source maps (if they exist).