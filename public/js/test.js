
var Tests = {
  
  /**
   * Tests the /api/kvs REST endpoint.
   */
  listEP : function() {
    var url = "http://localhost:8084/api/kvs";
    
    var jqxhr = $.get(url, function(result, status) {
      alert(
        "INLINE" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result)
      );
    }).done(function(result, status) {
      
      alert(
        "DONE" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result)
      );
      
    }).fail(function(error, status) {
      
      //JSON Properties
      //readyState: number
      //responseText: string (to result pou esteila)
      //responseJSON: json string
      //status: http status code (number)
      //statusText: http status message (string)
      
      alert(
        "FAIL" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(error.responseJSON)
      );
      
    }).always(function(result, status) {
      
      alert(
        "ALWAYS 1" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result) + "\r\n"
      );
      
    });
    
    jqxhr.always(function(result, status) {
      alert(
        "ALWAYS 2" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result) + "\r\n"
      );
    });
    
  },
  
  /**
   * Tests the /api/kv/:key REST endpoint.
   */
  getEP : function() {
    var url = "http://localhost:8084/api/kv/k2";
    
    var jqxhr = $.get(url, function(result, status) {
      alert(
        "INLINE" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result)
      );
    }).done(function(result, status) {
      
      alert(
        "DONE" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result)
      );
      
    }).fail(function(error, status) {
      
      //JSON Properties
      //readyState: number
      //responseText: string (to result pou esteila)
      //responseJSON: json string
      //status: http status code (number)
      //statusText: http status message (string)
      
      alert(
        "FAIL" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(error.responseJSON)
      );
      
    }).always(function(result, status) {
      
      alert(
        "ALWAYS 1" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result) + "\r\n"
      );
      
    });
    
    jqxhr.always(function(result, status) {
      alert(
        "ALWAYS 2" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result) + "\r\n"
      );
    });
    
  },
  
  /**
   * Tests the /api/kvs/create REST endpoint.
   */
  createEP : function() {
    var url = "http://localhost:8084/api/kv/create";
    
    var requestData = { key : "K5", value : "Value 5", cast : "string" }; 
  
    var jqxhr = $.post(url, requestData, function(result, status) {
      alert(
        "INLINE" + "\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result)
      );
    }).done(function(res, stat) {
      
      alert(
        "DONE" + "\r\n" +
        "Status: " + stat + "\r\n" +
        "Result:\r\n" + JSON.stringify(res));
      
    }).fail(function(err, stat2) {
      
      //JSON Properties
      //readyState: number
      //responseText: string (to result pou esteila)
      //responseJSON: json string
      //status: http status code (number)
      //statusText: http status message (string)
      
      alert(
        "FAIL" + "\r\n" +
        "Status: " + stat2 + "\r\n" +
        "Result:\r\n" + JSON.stringify(err.responseJSON)
      );
      
    }).always(function(a1, a2) {
      
      alert(
        "ALWAYS 1\r\n" +
        "Status: " + a2 + "\r\n" +
        "Result:\r\n" + JSON.stringify(a1) + "\r\n"
      );
      
    });
    
    jqxhr.always(function(al1, al2) {
      alert(
        "ALWAYS 2\r\n" +
        "Status: " + al2 + "\r\n" +
        "Result:\r\n" + JSON.stringify(al1) + "\r\n"
      );
    });
    
  },
  
  /**
   * Tests the /api/kvs/update REST endpoint.
   */
  updateEP : function() {
    var url = "http://localhost:8084/api/kv/update";
    
    var requestData = { value : "Value 2a", cast : "string" }; 
  
    var jqxhr = $.post(url, requestData, function(result, status) {
      alert(
        "INLINE" + "\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result)
      );
    })
    
  },
  
  /**
   * Tests the /api/kvs/delete/ REST endpoint.
   */
  deleteEP : function() {
    var url = "http://localhost:8084/api/kv/k2";
    
  },
  
  // ================================================================================
  
  testEvalFunction : function() {
    var func = "function test() { var a = 2; var b = 6; var res = a + b; alert('The result is: ' + res); }; test();";
    eval(func);
  },
  
  testWktToGeoJsonFunction : function() {
    var wkt = "POLYGON ((-3.388142 54.28344, -3.388068 54.285301, -3.386585 54.285354, -3.386403 54.28523, -3.386242 54.285167, -3.386029 54.285101, -3.385813 54.285053, -3.385656 54.285038, -3.385544 54.285056, -3.385014 54.285281, -3.38485 54.285344, -3.384689 54.285372, -3.38452 54.285362, -3.384581 54.285291, -3.384633 54.2852, -3.384624 54.285121, -3.384589 54.285028, -3.384559 54.284937, -3.384568 54.284835, -3.384568 54.284737, -3.384537 54.284635, -3.384529 54.284554, -3.384468 54.28445, -3.384416 54.284324, -3.384411 54.284152, -3.384437 54.284053, -3.384476 54.284007, -3.384576 54.283951, -3.384607 54.283913, -3.384607 54.283865, -3.384576 54.283807, -3.38452 54.283708, -3.384485 54.283607, -3.384867 54.283491, -3.385032 54.28345, -3.38521 54.28343, -3.385548 54.28341, -3.38675 54.283394, -3.387565 54.283421, -3.388142 54.28344))";
    
    var geoJson = Terraformer.WKT.parse(wkt);
    
    var geoJsonString = JSON.stringify(geoJson);
    
    alert(geoJsonString);
  },
  
  testGeoJsonToWktFunction : function() {
    var geoJson = {
      "type": "Polygon",
      "coordinates": [
        [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ],
        [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
      ]
    };
    
    var wkt = Terraformer.WKT.convert(geoJson);
    
    alert(wkt);
  },
  
  // ================================================================================
  
  /**
   * Tests the /api/comments REST endpoint.
   */
  listComments : function() {
    var url = "http://localhost:8084/api/comments";
    
    var jqxhr = $.get(url, function(result, status) {
      alert(
        "INLINE" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result)
      );
    }).done(function(result, status) {
      
      alert(
        "DONE" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result)
      );
      
    }).fail(function(error, status) {
      
      //JSON Properties
      //readyState: number
      //responseText: string (to result pou esteila)
      //responseJSON: json string
      //status: http status code (number)
      //statusText: http status message (string)
      
      alert(
        "FAIL" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(error.responseJSON)
      );
      
    }).always(function(result, status) {
      
      alert(
        "ALWAYS 1" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result) + "\r\n"
      );
      
    });
    
    jqxhr.always(function(result, status) {
      alert(
        "ALWAYS 2" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result) + "\r\n"
      );
    });
    
  },
  
  /**
   * Tests the /api/comment-ids REST endpoint.
   */
  listCommentIds : function() {
    var url = "http://localhost:8084/api/comment-ids";
    
    var jqxhr = $.get(url, function(result, status) {
      alert(
        "INLINE" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result)
      );
    }).done(function(result, status) {
      
      alert(
        "DONE" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result)
      );
      
    }).fail(function(error, status) {
      
      //JSON Properties
      //readyState: number
      //responseText: string (to result pou esteila)
      //responseJSON: json string
      //status: http status code (number)
      //statusText: http status message (string)
      
      alert(
        "FAIL" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(error.responseJSON)
      );
      
    }).always(function(result, status) {
      
      alert(
        "ALWAYS 1" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result) + "\r\n"
      );
      
    });
    
    jqxhr.always(function(result, status) {
      alert(
        "ALWAYS 2" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result) + "\r\n"
      );
    });
    
  },
  
  /**
   * Tests the /api/comment-getbyid/:id REST endpoint.
   */
  getCommenById : function() {
    var url = "http://localhost:8084/api/comment-getbyid/56aa8a1d0778bf6c27530651";
    
    var jqxhr = $.get(url, function(result, status) {
      alert(
        "INLINE" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result)
      );
    }).done(function(result, status) {
      
      alert(
        "DONE" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result)
      );
      
    }).fail(function(error, status) {
      
      //JSON Properties
      //readyState: number
      //responseText: string (to result pou esteila)
      //responseJSON: json string
      //status: http status code (number)
      //statusText: http status message (string)
      
      alert(
        "FAIL" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(error.responseJSON)
      );
      
    }).always(function(result, status) {
      
      alert(
        "ALWAYS 1" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result) + "\r\n"
      );
      
    });
    
    jqxhr.always(function(result, status) {
      alert(
        "ALWAYS 2" + "\r\n--------\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result) + "\r\n"
      );
    });
    
  },
  
  /**
   * Tests the /api/comment/create REST endpoint.
   */
  createComment : function() {
    var url = "http://localhost:8084/api/comment/create";
    
    var requestData = { content : "This is a nice comment" }; 
  
    var jqxhr = $.post(url, requestData, function(result, status) {
      alert(
        "INLINE" + "\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result)
      );
    }).done(function(res, stat) {
      
      alert(
        "DONE" + "\r\n" +
        "Status: " + stat + "\r\n" +
        "Result:\r\n" + JSON.stringify(res));
      
    }).fail(function(err, stat2) {
      
      //JSON Properties
      //readyState: number
      //responseText: string (to result pou esteila)
      //responseJSON: json string
      //status: http status code (number)
      //statusText: http status message (string)
      
      alert(
        "FAIL" + "\r\n" +
        "Status: " + stat2 + "\r\n" +
        "Result:\r\n" + JSON.stringify(err.responseJSON)
      );
      
    }).always(function(a1, a2) {
      
      alert(
        "ALWAYS 1\r\n" +
        "Status: " + a2 + "\r\n" +
        "Result:\r\n" + JSON.stringify(a1) + "\r\n"
      );
      
    });
    
    jqxhr.always(function(al1, al2) {
      alert(
        "ALWAYS 2\r\n" +
        "Status: " + al2 + "\r\n" +
        "Result:\r\n" + JSON.stringify(al1) + "\r\n"
      );
    });
    
  },
  
  // ================================================================================
  
  /**
   * Tests the /api/symbols-getbyslugs REST endpoint.
   */
  getSymbolsBySlugs : function() {
    
    var url = "http://localhost:8084/api/symbols-getbyslugs";
    
    var requestData = {
      lineStyleSlugs : ['comment-polyline-style', 'comment-to-add-polyline-style'],
      simpleFillStyleSlugs : ['comment-polygon-style']
      //simpleFillStyleSlugs : ['comment-polygon-style', 'comment-to-add-polygon-style']
    }; 
  
    var jqxhr = $.post(url, requestData, function(result, status) {
      alert(
        "INLINE" + "\r\n" +
        "Status: " + status + "\r\n" +
        "Result:\r\n" + JSON.stringify(result)
      );
    }).done(function(res, stat) {
      
      alert(
        "DONE" + "\r\n" +
        "Status: " + stat + "\r\n" +
        "Result:\r\n" + JSON.stringify(res));
      
    }).fail(function(err, stat2) {
      
      //JSON Properties
      //readyState: number
      //responseText: string (to result pou esteila)
      //responseJSON: json string
      //status: http status code (number)
      //statusText: http status message (string)
      
      alert(
        "FAIL" + "\r\n" +
        "Status: " + stat2 + "\r\n" +
        "Result:\r\n" + JSON.stringify(err.responseJSON)
      );
      
    }).always(function(a1, a2) {
      
      alert(
        "ALWAYS 1\r\n" +
        "Status: " + a2 + "\r\n" +
        "Result:\r\n" + JSON.stringify(a1) + "\r\n"
      );
      
    });
    
    jqxhr.always(function(al1, al2) {
      alert(
        "ALWAYS 2\r\n" +
        "Status: " + al2 + "\r\n" +
        "Result:\r\n" + JSON.stringify(al1) + "\r\n"
      );
    });
    
  }
    
};

/**
 * Tests the /api/kvs REST endpoint.
 * @param  {any} '#testListButton'
 */
$('#testListButton').click(function() {
  Tests.listEP();
});

/**
 * Tests the /api/kvs/:key REST endpoint.
 * @param  {any} '#testGetButton'
 */
$('#testGetButton').click(function() {
  Tests.getEP();
});

/**
 * Tests the /api/kvs/create REST endpoint.
 * @param  {any} '#testCreateButton'
 */
$('#testCreateButton').click(function() {
  Tests.createEP();
});

/**
 * Tests the /api/kvs/update/:key REST endpoint.
 * @param  {any} '#testUpdateButton'
 */
$('#testUpdateButton').click(function() {
  Tests.updateEP();
});

/**
 * Tests the /api/kvs/delete/:key REST endpoint.
 * @param  {any} '#testDeleteButton'
 */
$('#testDeleteButton').click(function() {
  Tests.deleteEP();
});

// ================================================================================

/**
 * Tests the eval function.
 * @param  {any} '#testDeleteButton'
 */
$('#testEvalFunctionButton').click(function() {
  Tests.testEvalFunction();
});

/**
 * Tests the WKT to GeoJSON function.
 * @param  {any} '#testWktToGeoJsonButton'
 */
$('#testWktToGeoJsonButton').click(function() {
  Tests.testWktToGeoJsonFunction();
});

/**
 * Tests the GeoJSON to WKT function.
 * @param  {any} '#testGeoJsonToWktButton'
 */
$('#testGeoJsonToWktButton').click(function() {
  Tests.testGeoJsonToWktFunction();
});

// ================================================================================

/**
 * Tests the /api/comments REST endpoint.
 * @param  {any} '#testListCommentsButton'
 */
$('#testListCommentsButton').click(function() {
  Tests.listComments();
});

/**
 * Tests the /api/comment-ids REST endpoint.
 * @param  {any} '#testListCommentIdsButton'
 */
$('#testListCommentIdsButton').click(function() {
  Tests.listCommentIds();
});

/**
 * Tests the /api/comment/create REST endpoint.
 * @param  {any} '#testCreateCommentButton'
 */
$('#testCreateCommentButton').click(function() {
  Tests.createComment();
});

/**
 * Tests the /api/comment-getbyid/:id REST endpoint.
 * @param  {any} '#testUpdateButton'
 */
$('#testGetCommentByIdButton').click(function() {
  Tests.getCommenById();
});

/**
 * Tests the /api/symbols-getbyslugs REST endpoint.
 * @param  {any} '#testUpdateButton'
 */
$('#testGetSymbolsBySlugs').click(function() {
  Tests.getSymbolsBySlugs();
});






















