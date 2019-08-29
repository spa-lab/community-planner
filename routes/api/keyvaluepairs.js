
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            keyvaluepairs.js [/routes/api]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 04/05/2016.
// 
//  Description:     Defines the functions mapped to the REST API endpoints
//                   to deal with keyvale pairs.
// ================================================================================

var async = require('async');
var keystone = require('keystone');
var globals = require('../../globals');

var KeyValuePair = keystone.list('KeyValuePair');

// ================================================================================
//  Public Methods

/**
 * List KeyValuePairs. [ /api/kvs ]
 */
exports.list = function(req, res) {
  
  // Check if a user has been logged in.
  if (!req.user) {
    return res.apiError(globals.errors.userHasNotLoggedIn.code, { message: globals.errors.userHasNotLoggedIn.message, internalError: null }, null, globals.httpStatus.unauthorized.code);
  }
  
  // Check if the user is an administrator.
  if (!req.user.isAdmin) {
    return res.apiError(globals.errors.userIsNotAnAdministrator.code, { message: globals.errors.userIsNotAnAdministrator.message, internalError: null } , null, globals.httpStatus.forbidden.code);
  }
  
  KeyValuePair.model.find(function(error, items) {
    
    // Check if an error has occured.
    if (error != null) {
      if (error) {
        var detail = { message: globals.errors.itemsRetrievalError.message, internalError: { name: error.name, message: error.message } };
        
        return res.apiError(globals.errors.itemsRetrievalError.code, detail, error, globals.httpStatus.internalServerError.code);
      }
    }
    
    // Check if items have been found.
    if (!items) {
      return res.apiError(globals.errors.itemsNotFound.code, { message: globals.errors.itemsNotFound.message, internalError: null }, null, globals.httpStatus.notFound.code);
    }
    if (items.length == 0) {
      return res.apiError(globals.errors.itemsNotFound.code, { message: globals.errors.itemsNotFound.message, internalError: null }, null, globals.httpStatus.notFound.code);
    }
    
    res.apiResponse({
      keyValuePairs: items
    });
    
  });
}

/**
 * Get KeyValuePair by key. [ /api/kv/:key ]
 */
exports.get = function(req, res) {
  
  // Check if a user has been logged in.
  if (!req.user) {
    return res.apiError(globals.errors.userHasNotLoggedIn.code, { message: globals.errors.userHasNotLoggedIn.message, internalError: null }, null, globals.httpStatus.unauthorized.code);
  }
  
  // Check if the user is an administrator.
  if (!req.user.isAdmin) {
    return res.apiError(globals.errors.userIsNotAnAdministrator.code, { message: globals.errors.userIsNotAnAdministrator.message, internalError: null } , null, globals.httpStatus.forbidden.code);
  }
  
  KeyValuePair.model.findOne({ 'lckey': req.params.key }, 'key value cast', function (error, item) {
    
    // Check if an error has occured.
    if (error != null) {
      if (error) {
        var detail = { message: globals.errors.itemRetrievalError.message, internalError: { name: error.name, message: error.message } };
        
        return res.apiError(globals.errors.itemRetrievalError.code, detail, error, globals.httpStatus.internalServerError.code);
      }
    }
    
    // Check if an item has been found.
    if (!item) {
      return res.apiError(globals.errors.itemNotFound.code, { message: globals.errors.itemNotFound.message, internalError: null }, null, globals.httpStatus.notFound.code);
    }
    
    res.apiResponse({
      keyValuePair: item
    });
    
  });
  
}

/**
 * Create a KeyValuePair. [ /api/kv/create ]
 */
exports.create = function(req, res) {
  
  // Check if a user has been logged in.
  if (!req.user) {
    return res.apiError(globals.errors.userHasNotLoggedIn.code, { message: globals.errors.userHasNotLoggedIn.message, internalError: null }, null, globals.httpStatus.unauthorized.code);
  }
  
  // Check if the user is an administrator.
  if (!req.user.isAdmin) {
    return res.apiError(globals.errors.userIsNotAnAdministrator.code, { message: globals.errors.userIsNotAnAdministrator.message, internalError: null } , null, globals.httpStatus.forbidden.code);
  }

  // Return an error if method is not post.
  if (req.method != globals.httpVerbs.post) {
    return res.apiError(globals.errors.httpVerbNotAllowed.code, { message: globals.errors.httpVerbNotAllowed.message, internalError: null }, null, globals.httpStatus.methodNotAllowed.code);
  };
  
  // Get the data sent through the request body.
  var data = req.body;
  
  // Return an error if data is undefined.
  if (data == undefined) {
    return res.apiError(globals.errors.undefinedData.code, { message: globals.errors.undefinedData.message, internalError: null }, null, globals.httpStatus.badrequest.code);
  };
  
  // Return an error if data is null.
  if (data == null) {
    return res.apiError(globals.errors.nullData.code, { message: globals.errors.nullData.message, internalError: null }, null, globals.httpStatus.badrequest.code);
  };
  
  var item = new KeyValuePair.model(data);
  
  item.save(function(error) {
    res.apiResponse(globals.success.keyValuePairCreated);
  });
   
}

/**
 * Update KeyValuePair. [ /api/kv/update ]
 */
exports.update = function(req, res) {
  
  // Check if a user has been logged in.
  if (!req.user) {
    return res.apiError(globals.errors.userHasNotLoggedIn.code, globals.errors.userHasNotLoggedIn.message, null, globals.httpStatus.unauthorized.code);
  }
  
  // Check if the user is an administrator.
  if (!req.user.isAdmin) {
    return res.apiError(globals.errors.userIsNotAnAdministrator.code, globals.errors.userIsNotAnAdministrator.message, null, globals.httpStatus.forbidden.code);
  }
  
  // KeyValuePair.model.findById(req.params.id).exec(function(err, item) {
  //   
  //   if (err) return res.apiError('database error', err);
  //   if (!item) return res.apiError('not found');
  //   
  //   var data = (req.method == 'POST') ? req.body : req.query;
  //   
  //   item.getUpdateHandler(req).process(data, function(err) {
  //     
  //     if (err) return res.apiError('create error', err);
  //     
  //     res.apiResponse({
  //       keyvaluepair: item
  //     });
  //     
  //   });
  //   
  // });
  
  // TODO: Needs implementation !!!

  res.apiResponse({
    keyvaluepair: 'k2'
  });
  
}

/**
 * Delete KeyValuePair. [ /api/kv/delete ]
 */
exports.delete = function(req, res) {
  
  // Check if a user has been logged in.
  if (!req.user) {
    return res.apiError(globals.errors.userHasNotLoggedIn.code, { message: globals.errors.userHasNotLoggedIn.message, internalError: null }, null, globals.httpStatus.unauthorized.code);
  }
  
  // Check if the user is an administrator.
  if (!req.user.isAdmin) {
    return res.apiError(globals.errors.userIsNotAnAdministrator.code, { message: globals.errors.userIsNotAnAdministrator.message, internalError: null } , null, globals.httpStatus.forbidden.code);
  }
  
  KeyValuePair.model.findById(req.params.id).exec(function (error, item) {
    
    // Check if an error has occured.
    if (error != null) {
      if (error) {
        var detail = { message: globals.errors.itemRetrievalError.message, internalError: { name: error.name, message: error.message } };
        
        return res.apiError(globals.errors.itemRetrievalError.code, detail, error, globals.httpStatus.internalServerError.code);
      }
    }
    
    // Check if an item has been found.
    if (!item) {
      return res.apiError(globals.errors.itemNotFound.code, { message: globals.errors.itemNotFound.message, internalError: null }, null, globals.httpStatus.notFound.code);
    }
    
    item.remove(function (error) {
      // Check if an error has occured.
      if (error != null) {
        if (error) {
          var detail = { message: globals.errors.itemDeletionError.message, internalError: { name: error.name, message: error.message } };
          
          return res.apiError(globals.errors.itemDeletionError.code, detail, error, globals.httpStatus.internalServerError.code);
        }
      }
      
      
      // TODO: Check if this is better to be: { successCode, id that has been deleted }
      return res.apiResponse({
        success: true
      });
    });
    
  });
  
}

// ================================================================================
