
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            geolayers.js [/routes/api]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 04/05/2016.
// 
//  Description:     Defines the functions mapped to the REST API endpoints
//                   to deal with geolayers.
// ================================================================================

var async = require('async');
var keystone = require('keystone');
var globals = require('../../globals');

var GeoLayer = keystone.list('GeoLayer');

// ================================================================================
//  Public Methods

/**
 * List GeoLayers. [ /api/geolayers ]
 */
exports.list = function(req, res) {

  GeoLayer.model.find(function(error, items) {
    
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
      geoLayers: items
    });
    
  });

}

/**
 * List GeoLayer ids. [ /api/geolayer-ids ]
 */
exports.getids = function(req, res) {

  GeoLayer.model.find({}, 'slug', function(error, items) {
    
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
      geoLayerIds: items
    });
    
  });

}

/**
 * List GeoLayer names. [ /api/geolayer-names ]
 */
exports.getnames = function(req, res) {

  GeoLayer.model.find({}, 'slug name description', function(error, items) {
    
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
      geoLayerNames: items
    });
    
  });
  
}

/**
 * Get GeoLayer by id. [ /api/geolayer-getbyid/:id ]
 */
exports.getbyid = function(req, res) {
  
  GeoLayer.model.findOne({ '_id': req.params.id }, 'slug name description dataType geoJsonData definitions', function (error, item) {
    
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
      geoLayer: item
    });
    
  });
  
}

/**
 * Get GeoLayer by slug. [ /api/geolayer-getbyslug/:slug ]
 */
exports.getbyslug = function(req, res) {
  
  GeoLayer.model.findOne({ 'slug': req.params.slug }, 'slug name description dataType geoJsonData definitions', function (error, item) {
    
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
      geoLayer: item
    });
    
  });
  
}

// ================================================================================
