
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            comments.js [/routes/api]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 04/05/2016.
// 
//  Description:     Defines the functions mapped to the REST API endpoints
//                   to deal with comments. 
// ================================================================================

var async = require('async');
var keystone = require('keystone');
var globals = require('../../globals');

var Comment = keystone.list('Comment');
var Plan = keystone.list('Plan');

// ================================================================================
//  Public Methods

/**
 * List Comments. [ /api/comments ]
 */
exports.list = function(req, res) {

  Comment.model.find(function(error, items) {
    
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
      comments: items
    });
    
  });

}

/**
 * List Comment ids. [ /api/comment-ids ]
 */
exports.getids = function(req, res) {

  Comment.model.find({}, 'username author', function(error, items) {
    
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
      commentIds: items
    });
    
  });

}

/**
 * Get Comment by id. [ /api/comment-getbyid/:id ]
 */
exports.getbyid = function(req, res) {
  
  Comment.model.findOne({ '_id': req.params.id }, 'username author dateTimeAdded areaOfInterest content plan', function (error, item) {
    
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
      comment: item
    });
    
  });
  
}

/**
 * Get Plan's comments by plan id and page index. [ /api/comment-getby-planid-page/:planid/:page ]
 */
exports.getbyplanidpage = function(req, res) {
  
  var planId = req.params.planid;
  var pageNumber = req.params.page;
  
  if (planId == undefined || planId == null || planId == '') {
    return res.apiError(globals.errors.parameterError.code, { message: globals.errors.parameterError.message, internalError: null }, null, globals.httpStatus.badrequest.code);
  }
  
  if (pageNumber == undefined || pageNumber == null || pageNumber == '') {
    return res.apiError(globals.errors.parameterError.code, { message: globals.errors.parameterError.message, internalError: null }, null, globals.httpStatus.badrequest.code);
  }
  
  Comment.paginate({
      page: pageNumber,
      perPage: 10
    })
    .where('plan', planId)
    .populate('author')
    .sort('-dateTimeAdded')
    .exec(function(error, items) {
      
      // Check if an error has occured.
      if (error != null) {
        if (error) {
          var detail = { message: globals.errors.itemsRetrievalError.message, internalError: { name: error.name, message: error.message } };
          
          return res.apiError(globals.errors.itemsRetrievalError.code, detail, error, globals.httpStatus.internalServerError.code);
        }
      }
      
      // Check if items has been found.
      if (!items) {
        return res.apiError(globals.errors.itemsNotFound.code, { message: globals.errors.itemsNotFound.message, internalError: null }, null, globals.httpStatus.notFound.code);
      }
      
      // Make sure sensitive information is ommited.
      for (i = 0; i < items.results.length; i++) {
        items.results[i].author.email = '';
        items.results[i].author.password = '';
      }
      
      // Return the json response.
      res.apiResponse({
        comments: items
      });
      
    });
    
}

/**
 * Create a Comment. [ /api/comment/create ]
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
      
  // Get the plan associated with the comment.
  //Plan.model.findOne({ '_id': data.planId }, 'slug name description state isOfficial areaOfInterest geoLayers geoLayersDefinitions planTexts files author', function (error, item) {
  Plan.model.findOne({ '_id': data.planId }, 'slug', function (error, plan) {
    
    // Check if an error has occured.
    if (error != null) {
      if (error) {
        var detail = { message: globals.errors.itemRetrievalError.message, internalError: { name: error.name, message: error.message } };
        
        return res.apiError(globals.errors.itemRetrievalError.code, detail, error, globals.httpStatus.internalServerError.code);
      }
    }
    
    // Check if a plan has been found.
    if (!plan) {
      return res.apiError(globals.errors.itemNotFound.code, { message: globals.errors.itemNotFound.message, internalError: null }, null, globals.httpStatus.notFound.code);
    }
    
    // A plan has been found. It can be used to associate the comment to this plan.
    var commentToAdd = {
      content: data.comment,
      areaOfInterest: data.commentWkt
    };
    
    // Create a new comment object.
    var comment = new Comment.model(commentToAdd);
    
    // Return an error if the comment object was not created succesfully.
    if (comment == null) {
      return res.apiError(globals.errors.nullData.code, { message: globals.errors.nullData.message, internalError: null }, null, globals.httpStatus.badrequest.code);
    }
    
    // Associate the user to the comment.
    comment.author = req.user;
    comment.username = req.user.name.first + " " + req.user.name.last;
    
    // Associate the plan to the comment.
    comment.plan = plan;
    
    // Save the comment and return it as a response to the requesting client.
    comment.save(function(error) {
      
      // Check if an error has occurred.
      if (error != null) {
        if (error) {
          var detail = { message: globals.errors.itemCreationError.message, internalError: { name: error.name, message: error.message } };
          
          return res.apiError(globals.errors.itemCreationError.code, detail, error, globals.httpStatus.unprocessableEntity.code);
        }
      }
      
      globals.success.commentCreated.item = comment
      res.apiResponse(globals.success.commentCreated);
      
    });
    
  });
  
}

// ================================================================================
