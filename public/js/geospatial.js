
var Bootle = {
  'Rest' : {
    /**
     * /api/item - lists all items
     * 
     */  
    listItems : function(url) {
      $.get(url, function(result, status) {
        alert(
          "INLINE" + "\r\n" +
          "Status: " + status + "\r\n" +
          "Result:\r\n" + JSON.stringify(result)
        )
      });
    }, // listItems
  
    /**
     * /api/item/{id} - gets an item 
     */
    getItem : function(url, item) {
      
      
      $.get(url, function(result, status) {
        alert(
          "INLINE" + "\r\n" +
          "Status: " + status + "\r\n" +
          "Result:\r\n" + JSON.stringify(result)
        )
      });
    }, // getItem
    
    /**
     * /api/item/create - creates a new item
     */
    createItem : function(url, item) {
      
      
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
    
    }, // createItem
  
    /**
     * /api/item/{id}/update - updates an item
     */
    updateItem : function(url, item) {
      
    }, // updateItem
    
    /**
     * /api/item/{id}/delete - deletes an item
     */
    deleteItem : function(url, item) {
        
    } // deleteItem
    
  } // Rest
  
}; // Bootle



// ========================================
















