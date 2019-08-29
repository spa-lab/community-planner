
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            plans.js [/routes/api]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 13/05/2016.
// 
//  Description:     Defines the functions mapped to the REST API endpoints
//                   to deal with plans.
// ================================================================================

var async = require('async');
var keystone = require('keystone');
var globals = require('../../globals');

var Plan = keystone.list('Plan');

var GeoLayerDefinition = keystone.list('GeoLayerDefinition');
var File = keystone.list('File');
var PlanText = keystone.list('PlanText');

// ================================================================================
//  Public Methods

/**
 * List Plans. [ /api/plans ]
 */
exports.list = function(req, res) {
  
  // Check if a user has been logged in.
  // if (!req.user) {
  //   return res.apiError(globals.errors.userHasNotLoggedIn.code, { message: globals.errors.userHasNotLoggedIn.message, internalError: null }, null, globals.httpStatus.unauthorized.code);
  // }
  
  Plan.model.find(function(error, items) {
    
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
      plans: items
    });
    
  });
  
}

/**
 * List Plan ids. [ /api/plan-ids ]
 */
exports.getids = function(req, res) {
  
  // Check if a user has been logged in.
  // if (!req.user) {
  //   return res.apiError(globals.errors.userHasNotLoggedIn.code, { message: globals.errors.userHasNotLoggedIn.message, internalError: null }, null, globals.httpStatus.unauthorized.code);
  // }
  
  Plan.model.find({}, 'slug', function(error, items) {
    
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
      planIds: items
    });
    
  });
  
}

/**
 * List Plan names. [ /api/plan-names ]
 */
exports.getnames = function(req, res) {
  
  // Check if a user has been logged in.
  // if (!req.user) {
  //   return res.apiError(globals.errors.userHasNotLoggedIn.code, { message: globals.errors.userHasNotLoggedIn.message, internalError: null }, null, globals.httpStatus.unauthorized.code); globals.httpStatus.unauthorized.code);
  // }
  
  Plan.model.find({}, 'slug name description', function(error, items) {
    
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
      planNames: items
    });
    
  });
  
}

/**
 * Get Plan by id. [ /api/plan-getbyid/:id ]
 */
exports.getbyid = function(req, res) {
  
  // Check if a user has been logged in.
  // if (!req.user) {
  //   return res.apiError(globals.errors.userHasNotLoggedIn.code, { message: globals.errors.userHasNotLoggedIn.message, internalError: null }, null, globals.httpStatus.unauthorized.code);
  // }
  
  Plan.model.findOne({ '_id': req.params.id }, 'slug name description state isOfficial areaOfInterest geoLayers geoLayersDefinitions planTexts files author', function (error, item) {
    
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
      plan: item
    });
    
  });
  
}

/**
 * Get Plan by slug. [ /api/plan-getbyslug/:slug ]
 */
exports.getbyslug = function(req, res) {
  
  // Check if a user has been logged in.
  // if (!req.user) {
  //   return res.apiError(globals.errors.userHasNotLoggedIn.code, { message: globals.errors.userHasNotLoggedIn.message, internalError: null }, null, globals.httpStatus.unauthorized.code);
  // }
  
  Plan.model.findOne({ 'slug': req.params.slug }, 'slug name description state isOfficial dates areaOfInterest geoLayers geoLayersDefinitions planTexts files author', function (error, item) {
    
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
      plan: item
    });
    
  });
  
}

/**
 * Get Area of Interests. [ /api/plan-getaois ]
 */
exports.getaois = function(req, res) {
  
  // Check if a user has been logged in.
  // if (!req.user) {
  //   return res.apiError(globals.errors.userHasNotLoggedIn.code, { message: globals.errors.userHasNotLoggedIn.message, internalError: null }, null, globals.httpStatus.unauthorized.code);
  // }
  
  Plan.model.find({}, 'slug name description state areaOfInterest', function(error, items) {
    
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
      plans: items
    });
    
  });
  
}

/**
 * Get Plan graph by slug. [ /api/plan-getgraph-byslug/:slug ]
 */
exports.getgraphbyslug = function(req, res) {
  
  // Check if a user has been logged in.
  // if (!req.user) {
  //   return res.apiError(globals.errors.userHasNotLoggedIn.code, { message: globals.errors.userHasNotLoggedIn.message, internalError: null }, null, globals.httpStatus.unauthorized.code);
  // }
  
  Plan.model.findOne()
    .where('slug', req.params.slug)
    .populate('files planTexts geoLayersDefinitions geoLayers author')
    .exec(function(error, item) {
      
      // Check if an error has occurred.
      if (error != null) {
        if (error) {
          var detail = { message: globals.errors.itemRetrievalError.message, internalError: { name: error.name, message: error.message } };
        
          return res.apiError(globals.errors.itemRetrievalError.code, detail, error, globals.httpStatus.internalServerError.code);
        }
      }
      
      // Check if an item has been found.
      if (!item) {
        return res.apiError(globals.errors.itemNotFound.code, { message: globals.errors.itemsNotFound.message, internalError: null }, null, globals.httpStatus.notFound.code);
      }
      
      // Make sure the sensitive information is omitted.
      if (item.author != undefined || item.author != null) {
        item.author.email = '';
        item.author.password = '';
      }
      
      if (item.geoLayersDefinitions == undefined || item.geoLayersDefinitions == null || item.geoLayersDefinitions.length == 0) {
        if (item.files == undefined || item.files == null || item.files.length == 0) {
          // No GeoLayerDefinition or File objects have been found, return the json response.
          res.apiResponse({
            plan: item
          });
        }
        else {
          // Process the Files so as to replace the related object id references with the actual objects.
          processFiles(req, res, item, 0);
        }
      }
      else {
        // Process the GeoLayerDefinitions so as to replace the related object id references with the actual objects.
        processGeoLayerDefinitions(req, res, item, 0);
      }
      
    });
  
}

/**
 * Create a planning proposal. [ /api/plan/create ]
 */
exports.create = function(req, res) {
  
  // Check if a user has been logged in.
  if (!req.user) {
    return res.apiError(globals.errors.userHasNotLoggedIn.code, { message: globals.errors.userHasNotLoggedIn.message, internalError: null }, null, globals.httpStatus.unauthorized.code);
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
  
  var planText = null;
  
  // Check if a plan text has been provided.
  if (data.markdownText != undefined || data.markdownText != null) {
    var newPlanText = {
      name: data.name + ' Plan Text',
      order: 1,
      markdownText: {
        md: data.markdownText
      }
    }
    
    planText = new PlanText.model(newPlanText);
    
    // Return an error if the plantext object was not created succesfully.
    if (planText == null) {
      return res.apiError(globals.errors.nullData.code, { message: globals.errors.nullData.message, internalError: null }, null, globals.httpStatus.badrequest.code);
    }
    
    planText.save(function(error) {
      
      // Check if an error has occurred.
      if (error != null) {
        if (error) {
          var detail = { message: globals.errors.itemCreationError.message, internalError: { name: error.name, message: error.message } };
          
          return res.apiError(globals.errors.itemCreationError.code, detail, error, globals.httpStatus.unprocessableEntity.code);
        }
      }
      
      var newPlan = {
        name : data.name,
        description : data.description,
        areaOfInterest : data.areaOfInterest,
        //files : [],
      };
      
      // Create a new planning project object.
      var plan = new Plan.model(newPlan);
      
      // Return an error if the plan object was not created succesfully.
      if (plan == null) {
        return res.apiError(globals.errors.nullData.code, { message: globals.errors.nullData.message, internalError: null }, null, globals.httpStatus.badrequest.code);
      }
      
      // Associate the user to the plan.
      plan.author = req.user;

      plan.dates.proposedDate = Date.now();
      
      plan.planTexts = [];
      plan.planTexts[0] = planText;
      
      // Save the planning proposal and return it as a response to the requesting client.
      plan.save(function(error) {
        
        // Check if an error has occurred.
        if (error != null) {
          if (error) {
            var detail = { message: globals.errors.itemCreationError.message, internalError: { name: error.name, message: error.message } };
            
            return res.apiError(globals.errors.itemCreationError.code, detail, error, globals.httpStatus.unprocessableEntity.code);
          }
        }
        
        globals.success.planCreated.item = plan
        res.apiResponse(globals.success.planCreated);
        
      });
      
    });
    
  }
  
}

// ================================================================================

// ================================================================================
//  Private functions

/**
 * The function processes a GeoLayerDefinition object and replaces the referenced related object ids with the actual objects.
 * The function is recursive and is used to deal with all the GeoLayersDefinitons.
 * Once this happens the processFiles() function is called to continue with doing the same for File objects.
 * 
 * @param  {any} req - The http request.
 * @param  {any} res - The http response.
 * @param  {any} item - The plan item retrieved from the database.
 * @param  {number} gldCounter - Keeps track of how many GeoLayerDefinitions have been processed.
 */
function processGeoLayerDefinitions(req, res, item, gldCounter) {
  
  GeoLayerDefinition.model.findOne()
    .where('slug', item.geoLayersDefinitions[gldCounter].slug)
    .populate('popupFunction symbologyFunction')
    .exec(function(error, gld) {
      
      // Check if an error has occurred.
      if (error != null) {
        if (error) {
          var detail = { message: globals.errors.itemRetrievalError.message, internalError: { name: error.name, message: error.message } };
        
          return res.apiError(globals.errors.itemRetrievalError.code, detail, error, globals.httpStatus.internalServerError.code);
        }
      }
      
      // Check if a GeoLayerDefinition has been found.
      if (!gld) {
        return res.apiError(globals.errors.itemNotFound.code, { message: globals.errors.itemNotFound.message, internalError: null }, null, globals.httpStatus.notFound.code);
      }
      
      item.geoLayersDefinitions[gldCounter] = gld;
      
      if (gldCounter == item.geoLayersDefinitions.length - 1) {
        
        // All the GeoLayerDefinition objects have been processed, do the same with File objects.
        processFiles(req, res, item, 0);
        
      }
      else {
        // Call itself to deal with the next GeoLayerDefinition object.
        processGeoLayerDefinitions(req, res, item, ++gldCounter);
      }
      
    });
  
}

/**
 * The function processes a File object and replaces its referenced related object ids with the actual objects.
 * The function is recursive and is used to deal with all the Files.
 * Once this happens the plan item is returned to the caller as an http response. 
 * 
 * @param  {any} req - The http request.
 * @param  {any} res - The http response.
 * @param  {any} item - The plan item retrieved from the database.
 * @param  {number} fCounter - Keeps track of how many Files have been processed.
 */
function processFiles(req, res, item, fCounter) {
  
  File.model.findOne()
    .where('_id', item.files[fCounter].id)
    .populate('user')
    .exec(function(error, file) {
      
      // Check if an error has occurred.
      if (error != null) {
        if (error) {
          var detail = { message: globals.errors.itemRetrievalError.message, internalError: { name: error.name, message: error.message } };
        
          return res.apiError(globals.errors.itemRetrievalError.code, detail, error, globals.httpStatus.internalServerError.code);
        }
      }
      
      // Check if a File has been found.
      if (!file) {
        return res.apiError(globals.errors.itemNotFound.code, { message: globals.errors.itemNotFound.message, internalError: null }, null, globals.httpStatus.notFound.code);
      }
      
      // Make sure the sensitive information is omitted.
      if (file.user != undefined || file.user != null) {
        file.user.email = '';
        file.user.password = '';
      }
      
      item.files[fCounter] = file;
      
      if (fCounter == item.files.length - 1) {
        
        // All the File objects have been processed, return the json response.
        res.apiResponse({
          plan: item
        });
        
      }
      else {
        // Call itself to deal with the next GeoLayerDefinition object.
        processFiles(req, res, item, ++fCounter);
      }
      
    });
  
}

//
// ================================================================================
