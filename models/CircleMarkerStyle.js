
// ================================================================================
//  University of Manchester. UK.
//  School of Environment, Education, and Development.
//  Centre for Urban Policy Studies.
// 
//  Name:            CircleMarkerStyle [/models]
//  Original coding: Vasilis Vlastaras (@gisvlasta), 25/04/2016.
// 
//  Description:     Used for CircleMarkers styling.
// ================================================================================


var keystone = require('keystone');
var Types = keystone.Field.Types;

// Create the CircleMarkerStyle.
var CircleMarkerStyle = new keystone.List('CircleMarkerStyle', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true }
});

// Add fields in the model.
CircleMarkerStyle.add({
  
  // The name of the CircleMarkerStyle.
  name: { type: String, required: true },
  
  // The description of the CircleMarkerStyle.
  description: { type: String, required: false },
  
  definition: {
    
    // The radius of the circle marker in pixels.
    radius: { type: Number, required: true, default: 10 },
    
    // Whether to draw stroke along the path. Set it to false to disable borders on polygons or circles.
    stroke: { type: Boolean, required: false, default: true, label: 'Has Border' },
    
    // Stroke color.
    color: { type: Types.Color, required: true, default: '#2F2F2F', label: 'Border Colour' },
    
    // Stroke width in pixels.
    weight: { type: Number, required: true, default: 1.0, label: 'Border Weight' },
    
    // Stroke opacity.
    opacity: { type: Number, required: true, default: 1.0, label: 'Border Opacity' },
    
    // A string that defines the stroke dash pattern. Doesn't work on canvas-powered layers (e.g. Android 2).
    dashArray: { type: String, default: '', label: 'Border Dash Array (pixels)' },
    
    // A string that defines shape to be used at the end of the stroke.
    lineCap: { type: Types.Select, options: ', butt, round, square, inherit', default: '', label: 'Border Line Cap' },
    
    // A string that defines shape to be used at the corners of the stroke.
    lineJoin: { type: Types.Select, options: ', miter, round, bevel, inherit', default: '', label: 'Border Line Join' },
    
    // Whether to fill the path with color. Set it to false to disable filling on polygons or circles.
    fill: { type: Boolean, required: true, default: true, label: 'Is Filled' },
    
    // Fill color.
    fillColor: { type: Types.Color, required: true, default: '#EFEFEF', label: 'Fill Colour' },
    
    // Fill opacity.
    fillOpacity: { type: Number, required: true, default: 1.0, label: 'Fill Opacity' },
    
    // A string that defines how the inside of a shape is determined. 
    fillRule: { type: Types.Select, options: 'nonzero, evenodd, inherit', default: 'evenodd', label: 'Fill Rule' },
    
    // If false, the vector will not emit mouse events and will act as a part of the underlying map.
    clickable: { type: Boolean, required: true, default: true, label: 'Is Clickable' },
    
    // Custom class name set on an element.
    className: { type: String, required: false, default: '', label: 'Class Name' }
    
  }
  
});

// Register the model.
CircleMarkerStyle.defaultColumns = 'name, description|20%, definition.radius, definition.stroke, definition.color, definition.weight, definition.opacity, definition.fill, definition.fillColor, definition.fillOpacity';
CircleMarkerStyle.register();
