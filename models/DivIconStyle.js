
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            DivIconStyle [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
// 
//  Description:     Used for DivIcon styling.
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the DivIconStyle.
var DivIconStyle = new keystone.List('DivIconStyle', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
});

// Add fields in the model.
DivIconStyle.add({
  
  // The name of the DivIconStyle.
  name: { type: String, required: true },
  
  // The description of the DivIconStyle.
  description: { type: String, required: false },
  
  definition: {
    
    // Size of the icon image in pixels.
    iconSize: { type: String, required: false, label: 'Icon Size (type: x,y)' },
    
    // The coordinates of the "tip" of the icon (relative to its top left corner).
    // The icon will be aligned so that this point is at the marker's geographical location.
    // Centered by default if size is specified, also can be set in CSS with negative margins.
    iconAnchor: { type: String, required: false, label: 'Icon Anchor (type: x,y)' },
    
    // The coordinates of the point from which popups will "open", relative to the icon anchor.
    popupAnchor: { type: String, required: false, label: 'Icon Popup Anchor (type: x,y)' },
    
    // Custom class name set on an element.
    className: { type: String, required: false, default: '', label: 'Class Name' },
    
    // A custom HTML code to put inside the div element, empty by default.
    html: { type: String, required: false, default: '', label: 'HTML' }
    
  }
  
});

// Register the model.
DivIconStyle.defaultColumns = 'name, description|20%, iconsize, iconAnchor, popupAnchor';
DivIconStyle.register();
