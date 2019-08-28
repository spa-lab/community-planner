
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            LineStyle [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
// 
//  Description:     Used for polyline styling.
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the LineStyle.
var LineStyle = new keystone.List('LineStyle', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
});

// Add fields in the model.
LineStyle.add({
  
  // The name of the LineStyle.
  name: { type: String, required: true },
  
  // The description of the LineStyle.
  description: { type: String, required: false },
  
  definition: {
    
    // Line color.
    color: { type: Types.Color, required: true, default: '#2F2F2F', label: 'Colour' },
    
    // Line width in pixels.
    weight: { type: Number, required: true, default: 1.0, label: 'Weight' },
    
    // Line opacity.
    opacity: { type: Number, required: true, default: 1.0, label: 'Opacity' },
    
    // A string that defines the line dash pattern. Doesn't work on canvas-powered layers (e.g. Android 2).
    dashArray: { type: String, default: '', label: 'Line Dash Array (pixels)' },
    
    // A string that defines shape to be used at the end of the line.
    lineCap: { type: Types.Select, options: ', butt, round, square, inherit', default: '', label: 'Line Cap' },
    
    // A string that defines shape to be used at the corners of the line.
    lineJoin: { type: Types.Select, options: ', miter, round, bevel, inherit', default: '', label: 'Line Join' },
    
    // How much to simplify the line on each zoom level.
    // More means better performance and smoother look, and less means more accurate representation.
    smoothFactor: { type: Number, required: false, default: 1.0, label: 'Smooth Factor' },
    
    // Disabled line clipping.
    noClip: { type: Boolean, required: false, default: false, label: 'Is Clipping Disabled' },
    
    // If false, the vector will not emit mouse events and will act as a part of the underlying map.
    clickable: { type: Boolean, required: true, default: true, label: 'Is Clickable' },
    
    // Custom class name set on an element.
    className: { type: String, required: false, default: '', label: 'Class Name' }
    
  }
  
});

// Register the model.
LineStyle.defaultColumns = 'name, description, definition.color, definition.weight, definition.opacity, definition.lineCap, definition.lineJoin, definition.smoothFactor, definition.noClip';
LineStyle.register();
