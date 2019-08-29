
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            geolayerdefinitions.js [/routes/api]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 04/05/2016.
// 
//  Description:     Defines the functions mapped to the REST API endpoints
//                   to deal with geolayer definitions.
// ================================================================================

var async = require('async');
var keystone = require('keystone');
var globals = require('../../globals');

var GeoLayerDefinition = keystone.list('GeoLayerDefinition');

// ================================================================================
//  Public Methods

/**
 * List GeoLayerDefinitions. [ /api/geolayerdefinitions ]
 */
exports.list = function(req, res) {

  GeoLayerDefinition.model.find(function(error, items) {
    
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
      geoLayerDefinitions: items
    });
    
  });

}

/**
 * List GeoLayerDefinition ids. [ /api/geolayerdefinition-ids ]
 */
exports.getids = function(req, res) {

  GeoLayerDefinition.model.find({}, 'slug', function(error, items) {
    
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
      geoLayerDefinitionIds: items
    });
    
  });

}

/**
 * List GeoLayerDefinition names. [ /api/geolayerdefinition-names ]
 */
exports.getnames = function(req, res) {

  GeoLayerDefinition.model.find({}, 'slug name description', function(error, items) {
    
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
      geoLayerDefinitionNames: items
    });
    
  });

}

/**
 * Get GeoLayerDefinition by id. [ /api/geolayerdefinition-getbyid/:id ]
 */
exports.getbyid = function(req, res) {
  
  GeoLayerDefinition.model.findOne({ '_id': req.params.id }, 'slug name description order symbologyFunction popupFunction', function (error, item) {
    
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
      geoLayerDefinition: item
    });
    
  });
  
}

/**
 * Get GeoLayerDefinition by slug. [ /api/geolayerdefinition-getbyslug/:slug ]
 */
exports.getbyslug = function(req, res) {
  
  GeoLayerDefinition.model.findOne({ 'slug': req.params.slug }, 'slug name description order symbologyFunction popupFunction', function (error, item) {
    
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
      geoLayerDefinition: item
    });
    
  });
  
}

/**
 * Get GeoLayerDefinition graph by slug. [ /api/geolayerdefinition-getgraph-byslug/:slug ]
 */
exports.getgraphbyslug = function(req, res) {
  
  GeoLayerDefinition.model.findOne()
    .where('slug', req.params.slug)
    .populate('popupFunction symbologyFunction')
    .exec(function(error, item) {
      
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
        geoLayerDefinition: item
      });
      
    });
    
}

// ================================================================================
