
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
//  
//  Name:            middleware.js [/routes]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
//  Updated:         Vasilis Vlastaras (@gisvlasta), 30/08/2019.
// 
//  Description:     Defines the REST API endpoints (route) bindings.
// ================================================================================

/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');


/**
  Initialises the standard view locals
  
  The included layout depends on the navLinks array to generate
  the navigation in the header, you may wish to change this array
  or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
  
  var locals = res.locals;
  
  locals.navLinks = [
    { label: 'Home', key: 'home', href: '/community-planner' },
    { label: 'Blog', key: 'blog', href: '/community-planner/blog' },
    { label: 'Gallery', key: 'gallery', href: '/community-planner/gallery' },
    // {
    //   label: 'Maps',
    //   key: 'maps',
    //   href: '/map',
    //   nestedNavLinks: [
    //     { label: 'Census 2011', key: 'census2011', href: '/maps/census2011' },
    //     { label: 'TestMap 1', key: 'testmap1', href: '/maps/testmap1' },
    //     { label: 'TestMap 2', key: 'testmap2', href: '/maps/testmap2' },
    //     { label: 'TestMap 3', key: 'testmap3', href: '/maps/testmap3' }
    //   ]
    // },
    { label: 'Plans', key: 'plans', href: '/community-planner/plans' },
    { label: 'Contact', key: 'contact', href: '/community-planner/contact' }
  ];
  
  locals.user = req.user;
  
  next();
  
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/community-planner/keystone/signin');
	} else {
		next();
	}
};
