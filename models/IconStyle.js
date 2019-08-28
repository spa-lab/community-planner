
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            IconStyle [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
// 
//  Description:     Used for icon styling.
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the IconStyle.
var IconStyle = new keystone.List('IconStyle', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
});

// Add fields in the model.
IconStyle.add({
  
  // The name of the IconStyle.
  name: { type: String, required: true },
  
  // The description of the IconStyle.
  description: { type: String, required: false },
  
  definition: {
    
    // The URL to the icon image (absolute or relative to your script path).
    iconUrl: { type: String, required: true, default: 'https://placehold.it/24', label: 'Icon URL' },
    
    // The URL to a retina sized version of the icon image (absolute or relative to your script path).
    // Used for Retina screen devices.
    iconRetinaUrl: { type: String, required: false, label: 'Icon Retina URL' },
    
    // Size of the icon image in pixels.
    iconSize: { type: String, required: false, label: 'Icon Size (type: x,y)' },
    
    // The coordinates of the "tip" of the icon (relative to its top left corner).
    // The icon will be aligned so that this point is at the marker's geographical location.
    // Centered by default if size is specified, also can be set in CSS with negative margins.
    iconAnchor: { type: String, required: false, label: 'Icon Anchor (type: x,y)' },
    
    // The coordinates of the point from which popups will "open", relative to the icon anchor.
    popupAnchor: { type: String, required: false, label: 'Icon Popup Anchor (type: x,y)' },
    
    // The URL to the icon shadow image. If not specified, no shadow image will be created.
    shadowUrl: { type: String, required: false, label: 'Shadow URL' },
    
    // The URL to the retina sized version of the icon shadow image.
    // If not specified, no shadow image will be created. Used for Retina screen devices.
    shadowRetinaUrl: { type: String, required: false, label: 'Shadow Retina URL' },
    
    // Size of the shadow image in pixels.
    shadowSize: { type: String, required: false, label: 'Shadow Size (type: x,y)' },
    
    // The coordinates of the "tip" of the shadow (relative to its top left corner) (the same as iconAnchor if not specified).
    shadowAnchor: { type: String, required: false, label: 'Shadow Anchor (type: x,y)' },
    
    // Custom class name set on an element.
    className: { type: String, required: false, default: '', label: 'Class Name' }
    
  }
  
});

// Register the model.
IconStyle.defaultColumns = 'name, description|20%';
IconStyle.register();
