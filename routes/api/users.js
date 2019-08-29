
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            users.js [/routes/api]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 05/05/2016.
// 
//  Description:     Defines the functions mapped to the REST API endpoints
//                   to deal with users.
// ================================================================================

var async = require('async');
var keystone = require('keystone');
var globals = require('../../globals');

var User = keystone.list('User');

// ================================================================================
//  Public Methods

/**
 * Check if a user is logged in. [ /api/user-isloggedin ]
 */
exports.isuserloggedin = function(req, res) {
  
  // Check if a user has been logged in.
  var isLoggedIn = false;
  
  if (req.user) {
    isLoggedIn = true;
  }
  
  // Return the json response.
  res.apiResponse({
    isLoggedIn: isLoggedIn
  });
  
}

/**
 * Get the currently logged in user. [ /api/user-getloggedin ]
 */
exports.getloggedinuser = function(req, res) {
  
  var loggedInUser = null;
  
  // Check if a user has been logged in.
  if (req.user) {
    
    // Make sure sensitive information is ommited.
    loggedInUser = {
      name: {
        first: req.user.name.first,
        last: req.user.name.last
      },
      isAdmin: req.user.isAdmin
    };
      
  }
  
  // Return the json response.
  res.apiResponse({
    user: loggedInUser
  });
  
}

// ================================================================================
