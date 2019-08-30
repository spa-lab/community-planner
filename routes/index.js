
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
//  
//  Name:            index.js [/routes]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
//  Updated:         Vasilis Vlastaras (@gisvlasta), 30/08/2019.
// 
//  Description:     Defines the REST API endpoints (route) bindings.
// ================================================================================

/**
 * This file is where you define your application routes and controllers.
 * 
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 * 
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 * 
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 * 
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
  views: importRoutes('./views'),
  api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function (app) {
  
  // Views
  app.get('/', routes.views.index);
  app.get('/blog/:category?', routes.views.blog);
  app.get('/blog/post/:post', routes.views.post);
  app.get('/gallery', routes.views.gallery);
  // app.get('/map', routes.views.map);
  // app.get('/maps/census2011', routes.views.comboboxmapstory);
  // app.get('/maps/testmap1', routes.views.comboboxmapstory);
  // app.get('/maps/testmap2', routes.views.comboboxmapstory);
  // app.get('/maps/testmap3', routes.views.comboboxmapstory);
  app.get('/plans', routes.views.plans);
  app.all('/contact', routes.views.contact);
  
  // API
  // app.get('/api/model(s)/list', keystone.middleware.api, routes.api.model(s).list);
  // app.all('/api/model(s)/create', keystone.middleware.api, routes.api.model(s).create);
  // app.get('/api/model(s)/:id', keystone.middleware.api, routes.api.model(s).get);
  // app.all('/api/model(s)/:id/update', keystone.middleware.api, routes.api.model(s).update);
  // app.get('/api/model(s)/:id/remove', keystone.middleware.api, routes.api.model(s).remove);
  
  // Comment endpoints.
  app.get('/api/comments', keystone.middleware.api, routes.api.comments.list);
  app.get('/api/comment-ids/', keystone.middleware.api, routes.api.comments.getids);
  app.all('/api/comment/create', keystone.middleware.api, routes.api.comments.create);
  app.get('/api/comment-getbyid/:id', keystone.middleware.api, routes.api.comments.getbyid);
  app.get('/api/comment-getby-planid-page/:planid/:page', keystone.middleware.api, routes.api.comments.getbyplanidpage);
  //app.all('/api/comment/update', keystone.middleware.api, routes.api.comments.update);
  //app.all('/api/comment/delete', keystone.middleware.api, routes.api.comments.delete);
  
  // File endpoints.
  app.get('/api/files', keystone.middleware.api, routes.api.files.list);
  app.get('/api/file-ids/', keystone.middleware.api, routes.api.files.getids);
  app.get('/api/file-names/', keystone.middleware.api, routes.api.files.getnames);
  //app.all('/api/file/create', keystone.middleware.api, routes.api.files.create);
  app.get('/api/file-getbyid/:id', keystone.middleware.api, routes.api.files.getbyid);
  app.get('/api/file-getbyslug/:slug', keystone.middleware.api, routes.api.files.getbyslug);
  //app.all('/api/file/update', keystone.middleware.api, routes.api.files.update);
  //app.all('/api/file/delete', keystone.middleware.api, routes.api.files.delete);
  
  // FillStyle endpoints.
  app.get('/api/fillstyles', keystone.middleware.api, routes.api.fillstyles.list);
  app.get('/api/fillstyle-ids/', keystone.middleware.api, routes.api.fillstyles.getids);
  app.get('/api/fillstyle-names/', keystone.middleware.api, routes.api.fillstyles.getnames);
  //app.all('/api/fillstyle/create', keystone.middleware.api, routes.api.fillstyles.create);
  app.get('/api/fillstyle-getbyid/:id', keystone.middleware.api, routes.api.fillstyles.getbyid);
  app.get('/api/fillstyle-getbyslug/:slug', keystone.middleware.api, routes.api.fillstyles.getbyslug);
  //app.all('/api/fillstyle/update', keystone.middleware.api, routes.api.fillstyles.update);
  //app.all('/api/fillstyle/delete', keystone.middleware.api, routes.api.fillstyles.delete);
  
  // GeoLayerDefinition endpoints.
  app.get('/api/geolayerdefinitions', keystone.middleware.api, routes.api.geolayerdefinitions.list);
  app.get('/api/geolayerdefinition-ids/', keystone.middleware.api, routes.api.geolayerdefinitions.getids);
  app.get('/api/geolayerdefinition-names/', keystone.middleware.api, routes.api.geolayerdefinitions.getnames);
  //app.all('/api/geolayerdefinition/create', keystone.middleware.api, routes.api.geolayerdefinitions.create);
  app.get('/api/geolayerdefinition-getbyid/:id', keystone.middleware.api, routes.api.geolayerdefinitions.getbyid);
  app.get('/api/geolayerdefinition-getbyslug/:slug', keystone.middleware.api, routes.api.geolayerdefinitions.getbyslug);
  //app.all('/api/geolayerdefinition/update', keystone.middleware.api, routes.api.geolayerdefinitions.update);
  //app.all('/api/geolayerdefinition/delete', keystone.middleware.api, routes.api.geolayerdefinitions.delete);
  app.get('/api/geolayerdefinition-getgraph-byslug/:slug', keystone.middleware.api, routes.api.geolayerdefinitions.getgraphbyslug);
  
  // GeoLayer endpoints.
  app.get('/api/geolayers', keystone.middleware.api, routes.api.geolayers.list);
  app.get('/api/geolayer-ids/', keystone.middleware.api, routes.api.geolayers.getids);
  app.get('/api/geolayer-names/', keystone.middleware.api, routes.api.geolayers.getnames);
  //app.all('/api/geolayer/create', keystone.middleware.api, routes.api.geolayers.create);
  app.get('/api/geolayer-getbyid/:id', keystone.middleware.api, routes.api.geolayers.getbyid);
  app.get('/api/geolayer-getbyslug/:slug', keystone.middleware.api, routes.api.geolayers.getbyslug);
  //app.all('/api/geolayer/update', keystone.middleware.api, routes.api.geolayers.update);
  //app.all('/api/geolayer/delete', keystone.middleware.api, routes.api.geolayers.delete);
  
  // KeyValuePair endpoints.
  app.get('/api/kvs', keystone.middleware.api, routes.api.keyvaluepairs.list);
  app.get('/api/kv/:key', keystone.middleware.api, routes.api.keyvaluepairs.get);
  app.all('/api/kv/create', keystone.middleware.api, routes.api.keyvaluepairs.create);
  //app.all('/api/kvs/update', keystone.middleware.api, routes.api.keyvaluepairs.update);
  //app.all('/api/kvs/delete', keystone.middleware.api, routes.api.keyvaluepairs.delete);
  
  // LineStyle endpoints.
  app.get('/api/linestyles', keystone.middleware.api, routes.api.linestyles.list);
  app.get('/api/linestyle-ids/', keystone.middleware.api, routes.api.linestyles.getids);
  app.get('/api/linestyle-names/', keystone.middleware.api, routes.api.linestyles.getnames);
  //app.all('/api/linestyle/create', keystone.middleware.api, routes.api.linestyles.create);
  app.get('/api/linestyle-getbyid/:id', keystone.middleware.api, routes.api.linestyles.getbyid);
  app.get('/api/linestyle-getbyslug/:slug', keystone.middleware.api, routes.api.linestyles.getbyslug);
  //app.all('/api/linestyle/update', keystone.middleware.api, routes.api.linestyles.update);
  //app.all('/api/linestyle/delete', keystone.middleware.api, routes.api.linestyles.delete);
  
  // Plan endpoints.
  app.get('/api/plans', keystone.middleware.api, routes.api.plans.list);
  app.get('/api/plan-ids/', keystone.middleware.api, routes.api.plans.getids);
  app.get('/api/plan-names/', keystone.middleware.api, routes.api.plans.getnames);
  app.all('/api/plan/create', keystone.middleware.api, routes.api.plans.create);
  app.get('/api/plan-getbyid/:id', keystone.middleware.api, routes.api.plans.getbyid);
  app.get('/api/plan-getbyslug/:slug', keystone.middleware.api, routes.api.plans.getbyslug);
  //app.all('/api/plan/update', keystone.middleware.api, routes.api.plans.update);
  //app.all('/api/plan/delete', keystone.middleware.api, routes.api.plans.delete);
  app.get('/api/plan-getaois', keystone.middleware.api, routes.api.plans.getaois);
  app.get('/api/plan-getgraph-byslug/:slug', keystone.middleware.api, routes.api.plans.getgraphbyslug);
  
  // PlanText endpoints.
  app.get('/api/plantexts', keystone.middleware.api, routes.api.plantexts.list);
  app.get('/api/plantext-ids/', keystone.middleware.api, routes.api.plantexts.getids);
  app.get('/api/plantext-names/', keystone.middleware.api, routes.api.plantexts.getnames);
  //app.all('/api/plantext/create', keystone.middleware.api, routes.api.plantexts.create);
  app.get('/api/plantext-getbyid/:id', keystone.middleware.api, routes.api.plantexts.getbyid);
  app.get('/api/plantext-getbyslug/:slug', keystone.middleware.api, routes.api.plantexts.getbyslug);
  //app.all('/api/plantext/update', keystone.middleware.api, routes.api.plantexts.update);
  //app.all('/api/plantext/delete', keystone.middleware.api, routes.api.plantexts.delete);
  
  // PopupFunction endpoints.
  app.get('/api/popupfunctions', keystone.middleware.api, routes.api.popupfunctions.list);
  app.get('/api/popupfunction-ids/', keystone.middleware.api, routes.api.popupfunctions.getids);
  app.get('/api/popupfunction-names/', keystone.middleware.api, routes.api.popupfunctions.getnames);
  //app.all('/api/popupfunction/create', keystone.middleware.api, routes.api.popupfunctions.create);
  app.get('/api/popupfunction-getbyid/:id', keystone.middleware.api, routes.api.popupfunctions.getbyid);
  app.get('/api/popupfunction-getbyslug/:slug', keystone.middleware.api, routes.api.popupfunctions.getbyslug);
  //app.all('/api/popupfunction/update', keystone.middleware.api, routes.api.popupfunctions.update);
  //app.all('/api/popupfunction/delete', keystone.middleware.api, routes.api.popupfunctions.delete);
  
  // SimpleFillStyle endpoints.
  app.get('/api/simplefillstyles', keystone.middleware.api, routes.api.simplefillstyles.list);
  app.get('/api/simplefillstyle-ids/', keystone.middleware.api, routes.api.simplefillstyles.getids);
  app.get('/api/simplefillstyle-names/', keystone.middleware.api, routes.api.simplefillstyles.getnames);
  //app.all('/api/simplefillstyle/create', keystone.middleware.api, routes.api.simplefillstyles.create);
  app.get('/api/simplefillstyle-getbyid/:id', keystone.middleware.api, routes.api.simplefillstyles.getbyid);
  app.get('/api/simplefillstyle-getbyslug/:slug', keystone.middleware.api, routes.api.simplefillstyles.getbyslug);
  //app.all('/api/simplefillstyle/update', keystone.middleware.api, routes.api.simplefillstyles.update);
  //app.all('/api/simplefillstyle/delete', keystone.middleware.api, routes.api.simplefillstyles.delete);
  
  // SymbologyFunction endpoints.
  app.get('/api/symbologyfunctions', keystone.middleware.api, routes.api.symbologyfunctions.list);
  app.get('/api/symbologyfunction-ids/', keystone.middleware.api, routes.api.symbologyfunctions.getids);
  app.get('/api/symbologyfunction-names/', keystone.middleware.api, routes.api.symbologyfunctions.getnames);
  //app.all('/api/symbologyfunction/create', keystone.middleware.api, routes.api.symbologyfunctions.create);
  app.get('/api/symbologyfunction-getbyid/:id', keystone.middleware.api, routes.api.symbologyfunctions.getbyid);
  app.get('/api/symbologyfunction-getbyslug/:slug', keystone.middleware.api, routes.api.symbologyfunctions.getbyslug);
  //app.all('/api/symbologyfunction/update', keystone.middleware.api, routes.api.symbologyfunctions.update);
  //app.all('/api/symbologyfunction/delete', keystone.middleware.api, routes.api.symbologyfunctions.delete);
  
  // Symbols endpoints. Attention! There is no Symbol model. The symbols.js file is just
  // a container which provides query functionality for all types of symbols in the application.
  app.all('/api/symbols-getbyslugs', keystone.middleware.api, routes.api.symbols.getsymbolsbyslugs);
  
  // Tuple endpoints.
  app.get('/api/tuples', keystone.middleware.api, routes.api.tuples.list);
  app.get('/api/tuple-ids/', keystone.middleware.api, routes.api.tuples.getids);
  app.get('/api/tuple-names/', keystone.middleware.api, routes.api.tuples.getnames);
  //app.all('/api/tuple/create', keystone.middleware.api, routes.api.tuples.create);
  app.get('/api/tuple-getbyid/:id', keystone.middleware.api, routes.api.tuples.getbyid);
  app.get('/api/tuple-getbyslug/:slug', keystone.middleware.api, routes.api.tuples.getbyslug);
  //app.all('/api/tuple/update', keystone.middleware.api, routes.api.tuples.update);
  //app.all('/api/tuple/delete', keystone.middleware.api, routes.api.tuples.delete);
  
  // User endpoints.
  //app.get('/api/users', keystone.middleware.api, routes.api.users.list);
  //app.get('/api/user-ids/', keystone.middleware.api, routes.api.users.getids);
  //app.get('/api/user-names/', keystone.middleware.api, routes.api.users.getnames);
  //app.all('/api/user/create', keystone.middleware.api, routes.api.users.create);
  //app.get('/api/user-getbyid/:id', keystone.middleware.api, routes.api.users.getbyid);
  //app.get('/api/user-getbyslug/:slug', keystone.middleware.api, routes.api.users.getbyslug);
  //app.all('/api/user/update', keystone.middleware.api, routes.api.users.update);
  //app.all('/api/user/delete', keystone.middleware.api, routes.api.users.delete);
  app.get('/api/user-isloggedin', keystone.middleware.api, routes.api.users.isuserloggedin);
  app.get('/api/user-getloggedin', keystone.middleware.api, routes.api.users.getloggedinuser);
  
  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
   // app.get('/protected', middleware.requireUser, routes.views.protected);
  
};
