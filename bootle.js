var bootle = {
  'httpVerbs' : {
    'options' : 'OPTIONS',
    'get' : 'GET',
    'head' : 'HEAD',
    'post' : 'POST',
    'put' : 'PUT',
    'delete' : 'DELETE',
    'trace' : 'TRACE'
  },
  'success' : {
    'keyValuePairCreated' : { 'code' : '201', 'message' : 'KeyValuePair has been created succesfully.' },
    'commentCreated' : { 'code' : '201', 'message' : 'Comment has been created succesfully.', 'item' : null },
    'planCreated' : { 'code' : '201', 'message' : 'Plan has been created succesfully.', 'item' : null },
    
    'posted' : { 'code' : '1099', 'message' : 'Posted.' }
  },
  'errors' : {
    'userHasNotLoggedIn' : { 'code' : '1001', 'message' : 'User has not logged in.' },
    'userIsNotAnAdministrator' : { 'code' : '1002', 'message' : 'User is not an administrator.' },
    'databaseError' : { 'code' : '1003', 'message' : 'Database not found.' },
    'itemNotFound' : { 'code' : '1004', 'message' : 'Item not found.' },
    'itemsNotFound' : { 'code' : '1005', 'message' : 'Items not found.' },
    'undefinedData' : { 'code' : '1006', 'message' : 'Undefined data was encountered.' },
    'nullData' : { 'code' : '1007', 'message' : 'Null data was encountered.' },
    'httpVerbNotAllowed' : { 'code' : '1008', 'message' : 'The HTTP verb used was not allowed.' },
    'itemCreationError' : { 'code' : '1009', 'message' : 'The item could not be created.' },
    'queryError' : { 'code' : '1010', 'message' : 'An error has occured while executing a database query.' },
    'parameterError' : { 'code' : '1011', 'message' : 'The parameter submitted was invalid.' },
    'itemRetrievalError' : { 'code' : '1012', 'message' : 'The item could not be retrieved.' },
    'itemsRetrievalError' : { 'code' : '1013', 'message' : 'The items could not be retrieved.' },
    'itemDeletionError' : { 'code' : '1014', 'message' : 'The item could not be deleted.' },

    'unknown' : { 'code' : '1099', 'message' : 'An unknown error has occured.' }
  },
  'httpStatus' : {
    'ok' : { 'code' : '200', 'message' : 'The request was a success.' },
    'created' : { 'code' : '201', 'message' : 'The request has been fulfilled, resulting in the creation of a new resource.' },
    
    'badrequest' : { 'code' : '400', 'message' : 'The server cannot or will not process the request due to an apparent client error.' },
    'unauthorized' : { 'code' : '401', 'message' : 'Unauthorized to access the resource.' },
    'forbidden' : { 'code' : '403', 'message' : 'The request was a valid request, but the server is refusing to respond to it.' },
    'notFound' : { 'code' : '404', 'message' : 'The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.' },
    'methodNotAllowed' : { 'code' : '405', 'message' : 'A request method is not supported for the requested resource.' },
    'unprocessableEntity' : { 'code' : '422', 'message' : 'The request was well-formed but was unable to be followed due to semantic errors.' },
    
    'internalServerError' : { 'code' : '500', 'message' : 'An unexpected condition was encountered.' }
  }
};

module.exports = bootle;
