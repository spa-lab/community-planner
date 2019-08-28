
// Planning Project AOIs
function applySymbology(feature) {
  if (feature.properties.state === 'proposed') {
    return { color: '#DC143C', weight: '2.8', dashArray: '', opacity: '1.0', fillOpacity: '0.0', fieldNames: 'state', displayFieldNames: 'Plan State', fieldValues: 'proposed', displayFieldValues: 'Proposed' };
  }
  else if (feature.properties.state === 'accepted') {
    return { color: '#FF8C00', weight: '4', dashArray: '', opacity: '1.0', fillOpacity: '0.0', fieldNames: 'state', displayFieldNames: 'Plan State', fieldValues: 'accepted', displayFieldValues: 'Accepted' };
  }
  else if (feature.properties.state === 'implementation') {
    return { color: '#008000', weight: '2.8', dashArray: '', opacity: '1.0', fillOpacity: '0.0', fieldNames: 'state', displayFieldNames: 'Plan State', fieldValues: 'implementation', displayFieldValues: 'Implementation' };
  }
}

// Terraces
function applySymbology(feature) {
  return { weight: 1.04, color: '#6e6e6e', fillColor: '#e1e1e1', dashArray: '', opacity: 1.0, fillOpacity: 1.0 };
}

function applyPopup(feature, layer) {
  var popupContent = '<table class="table table-condensed table-striped table-bordered table-hover table-popup"><thead><tr class="info"><th>Field</th><th>Value</th></tr></thead><tbody><tr><th>Id</th><td>' + Autolinker.link(String(feature.properties['OBJECTID'])) + '</td></tr><tr><th>Perimeter</th><td>' + Autolinker.link(String(feature.properties['SHAPE_Leng'])) + '</td></tr><tr><th>Area</th><td>' + Autolinker.link(String(feature.properties['SHAPE_Area'])) + '</td></tr></tbody></table>';layer.bindPopup(popupContent);
}

function applyPopup(layer) {
  var popupContent = '<table class="table table-condensed table-striped table-bordered table-hover table-popup"><thead><tr class="info"><th>Field</th><th>Value</th></tr></thead><tbody><tr><th>Id</th><td>' + Autolinker.link(String(layer.feature.properties['OBJECTID'])) + '</td></tr><tr><th>Perimeter</th><td>' + Autolinker.link(String(layer.feature.properties['SHAPE_Leng'])) + '</td></tr><tr><th>Area</th><td>' + Autolinker.link(String(layer.feature.properties['SHAPE_Area'])) + '</td></tr></tbody></table>';layer.bindPopup(popupContent);
}

// Buildings
function applySymbology(feature) {
  switch (feature.properties.FunctionTy) {
    case 'Bed Hotel':
      return { weight: '1.04', fillColor: '#cccccc', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'FunctionTy', displayFieldNames: 'Function Type', fieldValues: 'Bed Hotel', displayFieldValues: 'Bed Hotel' };
    case 'Bungalow (3-4 Bed)':
      return { weight: '1.04', fillColor: '#e9ffbe', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'FunctionTy', displayFieldNames: 'Function Type', fieldValues: 'Bungalow (3-4 Bed)', displayFieldValues: 'Bungalow (3-4 Bed)' };
    case 'Business Centre':
      return { weight: '1.04', fillColor: '#ffbebe', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'FunctionTy', displayFieldNames: 'Function Type', fieldValues: 'Business Centre', displayFieldValues: 'Business Centre' };
    case 'Business Units':
      return { weight: '1.04', fillColor: '#d7b09e', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'FunctionTy', displayFieldNames: 'Function Type', fieldValues: 'Business Units', displayFieldValues: 'Business Units' };
    case 'Camping Pods':
      return { weight: '1.04', fillColor: '#ffffbe', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'FunctionTy', displayFieldNames: 'Function Type', fieldValues: 'Camping Pods', displayFieldValues: 'Camping Pods' };
    case 'Function Room':
      return { weight: '1.04', fillColor: '#d7c29e', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'FunctionTy', displayFieldNames: 'Function Type', fieldValues: 'Function Room', displayFieldValues: 'Function Room' };
    case 'Large Detached Unit (3-5 Bed)':
      return { weight: '1.04', fillColor: '#c29ed7', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'FunctionTy', displayFieldNames: 'Function Type', fieldValues: 'Large Detached Unit (3-5 Bed)', displayFieldValues: 'Large Detached Unit (3-5 Bed)' };
    case 'Semi Detached (2-4 Bed)':
      return { weight: '1.04', fillColor: '#ffebbe', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'FunctionTy', displayFieldNames: 'Function Type', fieldValues: 'Semi Detached (2-4 Bed)', displayFieldValues: 'Semi Detached (2-4 Bed)' };
    case 'Terraced (2-3 Bed)':
      return { weight: '1.04', fillColor: '#9ebbd7', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'FunctionTy', displayFieldNames: 'Function Type', fieldValues: 'Terraced (2-3 Bed)', displayFieldValues: 'Terraced (2-3 Bed)' };
    case 'Theatre':
      return { weight: '1.04', fillColor: '#9eaad7', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'FunctionTy', displayFieldNames: 'Function Type', fieldValues: 'Theatre', displayFieldValues: 'Theatre' };
    default:
      return { weight: '1.04', fillColor: '#ffff00', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'FunctionTy', displayFieldNames: 'Function Type', fieldValues: '[All other values]', displayFieldValues: '[All other values]' };
  }
}

// Landparcels
function applySymbology(feature) {
  return { weight: 1.04, color: '#6e6e6e', fillColor: '#d2b48c', dashArray: '', opacity: 1.0, fillOpacity: 1.0 };
}

// Landcover
function applySymbology(feature) {
  switch (feature.properties.Type) {
    case 'Pedestrian':
      return { weight: '1.04', fillColor: '#ffebaf', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'Type', displayFieldNames: 'Landcover Type', fieldValues: 'Pedestrian', displayFieldValues: 'Pedestrian' };
    case 'Green':
      return { weight: '1.04', fillColor: '#abcd66', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'Type', displayFieldNames: 'Landcover Type', fieldValues: 'Green', displayFieldValues: 'Green' };
    case 'Parking Space':
      return { weight: '1.04', fillColor: '#73b2ff', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'Type', displayFieldNames: 'Landcover Type', fieldValues: 'Parking Space', displayFieldValues: 'Parking Space' };
    case 'Road':
      return { weight: '1.04', fillColor: '#e64c00', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'Type', displayFieldNames: 'Landcover Type', fieldValues: 'Road', displayFieldValues: 'Road' };
    case 'Parking Road':
      return { weight: '1.04', fillColor: '#828282', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'Type', displayFieldNames: 'Landcover Type', fieldValues: 'Parking Road', displayFieldValues: 'Parking Road' };
    case 'Coach Layby':
      return { weight: '1.04', fillColor: '#ffaa00', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'Type', displayFieldNames: 'Landcover Type', fieldValues: 'Coach Layby', displayFieldValues: 'Coach Layby' };
    case 'Lake':
      return { weight: '1.04', fillColor: '#00c5ff', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'Type', displayFieldNames: 'Landcover Type', fieldValues: 'Lake', displayFieldValues: 'Lake' };
    case 'Waterfall':
      return { weight: '1.04', fillColor: '#bee8ff', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'Type', displayFieldNames: 'Landcover Type', fieldValues: 'Waterfall', displayFieldValues: 'Waterfall' };
    case 'Terraced Gardens':
      return { weight: '1.04', fillColor: '#00a884', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'Type', displayFieldNames: 'Landcover Type', fieldValues: 'Terraced Gardens', displayFieldValues: 'Terraced Gardens' };
    default:
      return { weight: '1.04', fillColor: '#ffff00', color: '#6e6e6e', dashArray: '', opacity: '1.0', fillOpacity: '1.0', fieldNames: 'Type', displayFieldNames: 'Landcover Type', fieldValues: '[All other values]', displayFieldValues: '[All other values]' };
  }
}
