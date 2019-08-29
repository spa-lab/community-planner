
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            simplefillstyles.js [/routes/api]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 04/05/2016.
// 
//  Description:     Defines the functions mapped to the REST API endpoints
//                   to deal with simple fill styles.
// ================================================================================

var async = require('async');
var keystone = require('keystone');
var globals = require('../../globals');

var SimpleFillStyle = keystone.list('SimpleFillStyle');

// ================================================================================
//  Public Methods

/**
 * List SimpleFillStyles. [ /api/simplefillstyles ]
 */
exports.list = function(req, res) {
  
  SimpleFillStyle.model.find(function(error, items) {
    
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
    
    // Return the json response.
    res.apiResponse({
      simpleFillStyles: items
    });
    
  });
  
}

/**
 * List SimpleFillStyle ids. [ /api/simplefillstyle-ids ]
 */
exports.getids = function(req, res) {
  
  SimpleFillStyle.model.find({}, 'slug', function(error, items) {
    
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
      simpleFillStyleIds: items
    });
    
  });
  
}

/**
 * List SimpleFillStyle names. [ /api/simplefillstyle-names ]
 */
exports.getnames = function(req, res) {
  
  SimpleFillStyle.model.find({}, 'slug name description', function(error, items) {
    
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
      simpleFillStyleNames: items
    });
    
  });
  
}

/**
 * Get SimpleFillStyle by id. [ /api/simplefillstyle-getbyid/:id ]
 */
exports.getbyid = function(req, res) {
  
  SimpleFillStyle.model.findOne({ '_id': req.params.id }, 'slug name description definition', function (error, item) {
    
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
    
    // Return the json response.
    res.apiResponse({
      simpleFillStyle: item
    });
    
  });
  
}

/**
 * Get SimpleFillStyle by slug. [ /api/simplefillstyle-getbyslug/:slug ]
 */
exports.getbyslug = function(req, res) {
  
  SimpleFillStyle.model.findOne({ 'slug': req.params.slug }, 'slug name description definition', function (error, item) {
    
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
    
    // Return the json response.
    res.apiResponse({
      simpleFillStyle: item
    });
    
  });
  
}

// ================================================================================
