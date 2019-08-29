
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            symbols.js [/routes/api]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 04/05/2016.
// 
//  Description:     Defines the functions mapped to the REST API endpoints
//                   to deal with symbols.
// ================================================================================

var async = require('async');
var keystone = require('keystone');
var globals = require('../../globals');

var LineStyle = keystone.list('LineStyle');
var FillStyle = keystone.list('FillStyle');

// ================================================================================
//  Public Methods

/**
 * Get styles. [ /api/symbols-getbyslugs ]
 */
exports.getsymbolsbyslugs = function(req, res) {

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
  
  // Request Data expected, should have the form:
  // {
  //   lineStyleSlugs: [],
  //   fillStyleSlugs: []
  // }
  
  var responseData = {
    lineStyles : [],
    fillStyles : []
  };
  
  // Check if linestyle slugs have been received.
  if (data.lineStyleSlugs != undefined || data.lineStyleSlugs != null || data.lineStyleSlugs != 0) {
    getLineStylesBySlug(data, responseData, res);
  }
  else {
    // Check if fillstyle slugs have been received.
    if (data.fillStyleSlugs == undefined || data.fillStyleSlugs == null || data.fillStyleSlugs == 0) {
      getFillStylesBySlug(data, responseData, res);
    }
    else {
      
      // Return the json response.
      res.apiResponse({
        symbols: responseData
      });
          
    }
  }
  
}

// ================================================================================

// ================================================================================ 
//  Private functions

/**
 * Gets the linestyles using the slugs provided.
 * 
 * @param  {any} data - The request data.
 * @param  {any} responseData - The response data.
 * @param  {any} res - The response.
 */
function getLineStylesBySlug(data, responseData, res) {
  
  LineStyle.model.find()
    .where('slug').in(data.lineStyleSlugs)
    .exec(function(error, lsItems) {
      
      // Check if an error has occured.
      if (error != null) {
        if (error) {
          var detail = { message: globals.errors.itemsRetrievalError.message, internalError: { name: error.name, message: error.message } };
          
          return res.apiError(globals.errors.itemsRetrievalError.code, detail, error, globals.httpStatus.internalServerError.code);
        }
      }
      
      // Check if items has been found.
      if (!lsItems) {
        lsItems = [];
      }
      
      responseData.lineStyles = lsItems;
      
      getFillStylesBySlug(data, responseData, res);
      
    });
    
}

/**
 * Gets the fillstyles using the slugs provided.
 * 
 * @param  {any} data - The request data.
 * @param  {any} responseData - The response data.
 * @param  {any} res - The response.
 */
function getFillStylesBySlug(data, responseData, res) {
  
  FillStyle.model.find()
    .where('slug').in(data.fillStyleSlugs)
    .exec(function(error, sfsItems) {
      
      // Check if an error has occured.
      if (error != null) {
        if (error) {
          var detail = { message: globals.errors.itemsRetrievalError.message, internalError: { name: error.name, message: error.message } };
          
          return res.apiError(globals.errors.itemsRetrievalError.code, detail, error, globals.httpStatus.internalServerError.code);
        }
      }
      
      // Check if items has been found.
      if (!sfsItems) {
        sfsItems = [];
      }
      
      responseData.fillStyles = sfsItems;
      
      // Return the json response.
      res.apiResponse({
        symbols: responseData
      });
      
    });
    
}

// ================================================================================
