var map, mob = false,
  desktop_device = true,
  fieldLookup = {};
$(window).on("resize", function() {
  if ($(window).width() <= 750) {
    mob = true;
    $("#logoCO > span").hide()
  }
  $(
    ".leaflet-control-layers.leaflet-control.leaflet-control-layers-expanded"
  ).css("max-height", $("#map").height() - 50);
  if ($("html.desktop").length === 0) {
    desktop_device = false
  }
}).resize();

function initMap() {
  map = L.map("map", {
    collapseLists: true
  }).fitBounds([
    [53.71, -1.91],
    [53.33, -2.76]
  ]);
  var E = new Date().getFullYear(),
    f =
    "<a href=\"javascript:window.alert('Mapping Data:\\n Contains OS data &copy; Crown copyright and database right (" +
    E + ")')\">Map data &copy; " + E + "</a>";
  map.attributionControl.addAttribution(f);
  var j = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zIndex: 1,
      opacity: 0.7
    }).addTo(map),
    p = new L.StamenTileLayer("toner-hybrid", {
      opacity: 0.3
    }),
    b = new L.TileLayer.WMS("http://www.salford.gov.uk/geoserver/NE/wms", {
      layers: "gm_border",
      format: "image/png",
      transparent: true,
      tiled: true,
      queryable: false,
      zIndex: 2
    }).addTo(map),
    l = new L.TileLayer.WMS("http://www.salford.gov.uk/geoserver/data/wms", {
      layers: "data:GM_BOUNDARIES",
      format: "image/png",
      transparent: true,
      tiled: true,
      styles: "Unfilled_Polygon",
      zIndex: 3
    });
  fieldLookup.GM_BOUNDARIES = {
    _layerName: "Local authorities",
    _titleField: "NAME",
    _NAME: ""
  };
  var h = new L.TileLayer.WMS("http://www.salford.gov.uk/geoserver/data/wms", {
    layers: "data:GM_WARDS",
    format: "image/png",
    transparent: true,
    tiled: true,
    styles: "Unfilled_Polygon_2",
    zIndex: 4
  });
  fieldLookup.GM_WARDS = {
    _layerName: "Wards",
    _titleField: "WARD_NAME",
    _WARD_NAME: "",
    DISTRICT_NAME: "<strong>Authority: </strong>"
  };
  var y = new L.TileLayer.WMS("http://www.salford.gov.uk/geoserver/wms", {
    layers: "NE:ons_msoa_gm",
    format: "image/png",
    transparent: true,
    tiled: true,
    zIndex: 5
  });
  fieldLookup.ons_msoa_gm = {
    _layerName: "Middle layer super output areas (MSOA)",
    _titleField: "msoa11nm",
    _msoa11nm: "MSOA name: ",
    msoa11cd: "<strong>MSOA code: </strong>"
  };
  var B = new L.TileLayer.WMS("http://www.salford.gov.uk/geoserver/wms", {
    layers: "NE:ons_lsoa_gm",
    format: "image/png",
    transparent: true,
    tiled: true,
    zIndex: 6
  });
  fieldLookup.ons_lsoa_gm = {
    _layerName: "Lower layer super output areas (LSOA)",
    _titleField: "lsoa11nm",
    _lsoa11nm: "LSOA name: ",
    lsoa11cd: "<strong>LSOA code: </strong>"
  };
  var e = L.tileLayer.wms("http://www.salford.gov.uk/geoserver/wms", {
    layers: "basemaps:os_open_roads",
    format: "image/png",
    tiled: true,
    transparent: true,
    continuousWorld: true,
    zIndex: 6
  });
  fieldLookup.os_open_roads = {
    _layerName: "Road network",
    _titleField: "class",
    _class: "Class: ",
    roadnumber: "<strong>Road number: </strong>",
    name1: "<strong>Road name: </strong>",
    formofway: "<strong>Form of way: </strong>",
    strategic: "<strong>Strategic: </strong>"
  };
  var d = L.tileLayer.wms("http://www.salford.gov.uk/geoserver/basemaps/wms", {
    layers: "basemaps:os_open_rivers",
    format: "image/png",
    tiled: true,
    transparent: true,
    continuousWorld: true,
    zIndex: 5
  });
  fieldLookup.os_open_rivers = {
    _layerName: "Water network",
    _titleField: "name",
    _name: "Name: ",
    form: "<strong>Form: </strong>"
  };
  var t = L.tileLayer.wms("http://www.salford.gov.uk/geoserver/NE/wms", {
    layers: "rail_network",
    format: "image/png",
    tiled: true,
    transparent: true,
    continuousWorld: true,
    queryable: false,
    zIndex: 10
  });
  var A = L.tileLayer.wms("http://www.salford.gov.uk/geoserver/NE/wms", {
    layers: "tfgm_metrolink_stops",
    format: "image/png",
    tiled: true,
    transparent: true,
    continuousWorld: true,
    zIndex: 50
  });
  fieldLookup.tfgm_metrolink_stops = {
    _layerName: "Metrolink stops",
    _titleField: "rstnam",
    _rstnam: ""
  };
  var a = L.tileLayer.wms("http://www.salford.gov.uk/geoserver/NE/wms", {
      layers: "gmsf_housing_land",
      format: "image/png",
      tiled: true,
      transparent: true,
      continuousWorld: true,
      queryable: true,
      zIndex: 20,
      cql_filter: "net_additions_2014_2019 > 0",
      propertyName: "(address,planning_status,construction_status,site_ref,local_authority,net_additions_2014_2019,net_addition_houses_2014_2019,net_addition_apartments_2014_2019)"
    }),
    i = L.tileLayer.wms("http://www.salford.gov.uk/geoserver/NE/wms", {
      layers: "gmsf_housing_land",
      format: "image/png",
      tiled: true,
      transparent: true,
      continuousWorld: true,
      queryable: true,
      zIndex: 20,
      cql_filter: "net_additions_2019_2024 > 0",
      propertyName: "(address,planning_status,construction_status,site_ref,local_authority,net_additions_2019_2024,net_addition_houses_2019_2024,net_addition_apartments_2019_2024)"
    }),
    n = L.tileLayer.wms("http://www.salford.gov.uk/geoserver/NE/wms", {
      layers: "gmsf_housing_land",
      format: "image/png",
      tiled: true,
      transparent: true,
      continuousWorld: true,
      queryable: true,
      zIndex: 20,
      cql_filter: "net_additions_2024_2035 > 0",
      propertyName: "(address,planning_status,construction_status,site_ref,local_authority,net_additions_2024_2035,net_addition_houses_2024_2035,net_addition_apartments_2024_2035)"
    }),
    w = L.tileLayer.wms("http://www.salford.gov.uk/geoserver/NE/wms", {
      layers: "gmsf_housing_land",
      format: "image/png",
      tiled: true,
      transparent: true,
      continuousWorld: true,
      queryable: true,
      zIndex: 20,
      propertyName: "(address,planning_status,construction_status,site_ref,local_authority,net_additions_2014_2035,net_addition_houses_2014_2035,net_addition_apartments_2014_2035)"
    });
  fieldLookup.gmsf_housing_land = {
    _layerName: "Future housing land supply",
    _titleField: "address",
    _address: "",
    net_additions_2014_2035: "<strong>Total net additions 2014-2035: </strong>",
    net_addition_houses_2014_2035: "<strong>Total net additions of houses 2014-2035: </strong>",
    net_addition_apartments_2014_2035: "<strong>Total net additions of apartments 2014-2035: </strong>",
    net_additions_2014_2019: "<strong>Total net additions 2014-2019: </strong>",
    net_addition_houses_2014_2019: "<strong>Total net additions of houses 2014-2019: </strong>",
    net_addition_apartments_2014_2019: "<strong>Total net additions of apartments 2014-2019: </strong>",
    net_additions_2019_2024: "<strong>Total net additions 2019-2024: </strong>",
    net_addition_houses_2019_2024: "<strong>Total net additions of houses 2019-2024: </strong>",
    net_addition_apartments_2019_2024: "<strong>Total net additions of apartments 2019-2024: </strong>",
    net_additions_2024_2035: "<strong>Total net additions 2024-2035: </strong>",
    net_addition_houses_2024_2035: "<strong>Total net additions of houses 2024-2035: </strong>",
    net_addition_apartments_2024_2035: "<strong>Total net additions of apartments 2024-2035: </strong>",
    planning_status: "<strong>Planning status: </strong>",
    construction_status: "<strong>Construction status: </strong>",
    site_ref: "<strong>Site reference: </strong>",
    local_authority: "<strong>Local authority: </strong>",
    _NULL: "<a class='commentAnchor' href='#' onclick='mailFunction($(this)); return false;'>Comment on this site</a>"
  };
  var v = L.tileLayer.wms("http://www.salford.gov.uk/geoserver/NE/wms", {
      layers: "gmsf_industry_land",
      format: "image/png",
      tiled: true,
      transparent: true,
      continuousWorld: true,
      queryable: true,
      zIndex: 20,
      cql_filter: "gross_floorspace_gain_2014_2019 > 0",
      propertyName: "(address,planning_status,construction_status,site_ref,local_authority,gross_floorspace_gain_2014_2019)"
    }),
    D = L.tileLayer.wms("http://www.salford.gov.uk/geoserver/NE/wms", {
      layers: "gmsf_industry_land",
      format: "image/png",
      tiled: true,
      transparent: true,
      continuousWorld: true,
      queryable: true,
      zIndex: 20,
      cql_filter: "gross_floorspace_gain_2019_2024 > 0",
      propertyName: "(address,planning_status,construction_status,site_ref,local_authority,gross_floorspace_gain_2019_2024)"
    }),
    g = L.tileLayer.wms("http://www.salford.gov.uk/geoserver/NE/wms", {
      layers: "gmsf_industry_land",
      format: "image/png",
      tiled: true,
      transparent: true,
      continuousWorld: true,
      queryable: true,
      zIndex: 20,
      cql_filter: "gross_floorspace_gain_2024_2035 > 0",
      propertyName: "(address,planning_status,construction_status,site_ref,local_authority,gross_floorspace_gain_2024_2035)"
    }),
    r = L.tileLayer.wms("http://www.salford.gov.uk/geoserver/NE/wms", {
      layers: "gmsf_industry_land",
      format: "image/png",
      tiled: true,
      transparent: true,
      continuousWorld: true,
      queryable: true,
      zIndex: 20,
      propertyName: "(address,planning_status,construction_status,site_ref,local_authority,gross_floorspace_gain_2014_2035)"
    });
  fieldLookup.gmsf_industry_land = {
    _layerName: "Future industry and warehousing land supply",
    _titleField: "address",
    _address: "",
    gross_floorspace_gain_2014_2035: "<strong>Gross floorspace gain (m&#178;) anticipated 2014-2035: </strong>",
    gross_floorspace_gain_2014_2019: "<strong>Gross floorspace gain (m&#178;) anticipated 2014-2019: </strong>",
    gross_floorspace_gain_2019_2024: "<strong>Gross floorspace gain (m&#178;) anticipated 2019-2024: </strong>",
    gross_floorspace_gain_2024_2035: "<strong>Gross floorspace gain (m&#178;) anticipated 2024-2035: </strong>",
    planning_status: "<strong>Planning status: </strong>",
    construction_status: "<strong>Construction status: </strong>",
    site_ref: "<strong>Site reference: </strong>",
    local_authority: "<strong>Local authority: </strong>",
    _NULL: "<a class='commentAnchor' href='#' onclick='mailFunction($(this)); return false;'>Comment on this site</a>"
  };
  var s = L.tileLayer.wms("http://www.salford.gov.uk/geoserver/NE/wms", {
      layers: "gmsf_office_land",
      format: "image/png",
      tiled: true,
      transparent: true,
      continuousWorld: true,
      queryable: true,
      zIndex: 20,
      cql_filter: "gross_floorspace_gain_2014_2019 > 0",
      propertyName: "(address,planning_status,construction_status,site_ref,local_authority,gross_floorspace_gain_2014_2019)"
    }),
    u = L.tileLayer.wms("http://www.salford.gov.uk/geoserver/NE/wms", {
      layers: "gmsf_office_land",
      format: "image/png",
      tiled: true,
      transparent: true,
      continuousWorld: true,
      queryable: true,
      zIndex: 20,
      cql_filter: "gross_floorspace_gain_2019_2024 > 0",
      propertyName: "(address,planning_status,construction_status,site_ref,local_authority,gross_floorspace_gain_2019_2024)"
    }),
    C = L.tileLayer.wms("http://www.salford.gov.uk/geoserver/NE/wms", {
      layers: "gmsf_office_land",
      format: "image/png",
      tiled: true,
      transparent: true,
      continuousWorld: true,
      queryable: true,
      zIndex: 20,
      cql_filter: "gross_floorspace_gain_2024_2035 > 0",
      propertyName: "(address,planning_status,construction_status,site_ref,local_authority,gross_floorspace_gain_2024_2035)"
    }),
    m = L.tileLayer.wms("http://www.salford.gov.uk/geoserver/NE/wms", {
      layers: "gmsf_office_land",
      format: "image/png",
      tiled: true,
      transparent: true,
      continuousWorld: true,
      queryable: true,
      zIndex: 20,
      propertyName: "(address,planning_status,construction_status,site_ref,local_authority,gross_floorspace_gain_2014_2035)"
    });
  fieldLookup.gmsf_office_land = {
    _layerName: "Future office land supply",
    _titleField: "address",
    _address: "",
    gross_floorspace_gain_2014_2035: "<strong>Gross floorspace gain (m&#178;) anticipated 2014-2035: </strong>",
    gross_floorspace_gain_2014_2019: "<strong>Gross floorspace gain (m&#178;) anticipated 2014-2019: </strong>",
    gross_floorspace_gain_2019_2024: "<strong>Gross floorspace gain (m&#178;) anticipated 2019-2024: </strong>",
    gross_floorspace_gain_2024_2035: "<strong>Gross floorspace gain (m&#178;) anticipated 2024-2035: </strong>",
    planning_status: "<strong>Planning status: </strong>",
    construction_status: "<strong>Construction status: </strong>",
    site_ref: "<strong>Site reference: </strong>",
    local_authority: "<strong>Local authority: </strong>",
    _NULL: "<a class='commentAnchor' href='#' onclick='mailFunction($(this)); return false;'>Comment on this site</a>"
  };
  var o = L.tileLayer.canvas();
  var z = {
      "Colour basemap": j,
      "Black &amp; white basemap": p,
      "No base map": o
    },
    x = {
      "Boundaries <div class='layerCount'></div>": {
        "<img class='legend' data-legend='SCALE=10&LAYER=gm_border' /> Greater Manchester": b,
        "<img class='legend' data-legend='SCALE=10&LAYER=GM_BOUNDARIES' /> Local authorities": l,
        "<img class='legend' data-legend='SCALE=10&LAYER=GM_WARDS' /> Wards": h,
        "<img class='legend' data-legend='SCALE=10&LAYER=ons_msoa_gm' /> Middle layer super output areas (MSOA)": y,
        "<img class='legend' data-legend='SCALE=10&LAYER=ons_lsoa_gm' /> Lower layer super output areas (LSOA)": B
      },
      "Road, rail and water networks&nbsp;<div class='layerCount'></div>": {
        "<img class='legend' data-legend='HEIGHT=40&WIDTH=40&SCALE=10&LAYER=tfgm_metrolink_stops' /> Metrolink stops&nbsp;<i class='legendMetadata' id='tfgm_metrolink_stops'></i>": A,
        "<img class='legend' data-legend='HEIGHT=40&WIDTH=40&SCALE=10&LAYER=rail_network' /> Rail network&nbsp;<i class='legendMetadata' id='rail_network'></i>": t,
        "<img class='legend' data-legend='HEIGHT=40&WIDTH=40&LAYER=os_open_roads&RULE=Motorway-9.5k_and_below'/> <img class='legend' data-legend='HEIGHT=40&WIDTH=40&LAYER=os_open_roads&RULE=A_roads-9.5k_and_below' /> <img class='legend' data-legend='HEIGHT=40&WIDTH=40&LAYER=os_open_roads&RULE=B_roads-9.5k_and_below' /> <img class='legend' data-legend='HEIGHT=40&WIDTH=40&LAYER=os_open_roads&RULE=Unclassified_roads-9.5k_and_below' />  Road network&nbsp;<i class='legendMetadata' id='os_open_roads'></i>": e,
        "<img class='legend' data-legend='HEIGHT=40&WIDTH=40&SCALE=10&LAYER=os_open_rivers' /> Water network&nbsp;<i class='legendMetadata' id='os_open_rivers'></i>": d
      },
      "Future housing land supply&nbsp;<i class='legendMetadata' id='gmsf_housing_land'></i>": {
        "Switch off future housing land supply": L.tileLayer(""),
        "<img class='legend' data-legend='HEIGHT=40&WIDTH=40&LAYER=gmsf_housing_land' /> 2014 to 2019": a,
        "<img class='legend' data-legend='HEIGHT=40&WIDTH=40&LAYER=gmsf_housing_land' /> 2019 to 2024": i,
        "<img class='legend' data-legend='HEIGHT=40&WIDTH=40&LAYER=gmsf_housing_land' /> 2024 to 2035": n,
        "<img class='legend' data-legend='HEIGHT=40&WIDTH=40&LAYER=gmsf_housing_land' /> 2014 to 2035": w
      },
      "Future industry and warehousing land supply&nbsp;<i class='legendMetadata' id='gmsf_industry_land'></i>": {
        "Switch off future industry and warehousing land supply": L.tileLayer(
          ""),
        "<img class='legend' data-legend='HEIGHT=40&WIDTH=40&LAYER=gmsf_industry_land' /> 2014 to 2019": v,
        "<img class='legend' data-legend='HEIGHT=40&WIDTH=40&LAYER=gmsf_industry_land' /> 2019 to 2024": D,
        "<img class='legend' data-legend='HEIGHT=40&WIDTH=40&LAYER=gmsf_industry_land' /> 2024 to 2035": g,
        "<img class='legend' data-legend='HEIGHT=40&WIDTH=40&LAYER=gmsf_industry_land' /> 2014 to 2035": r
      },
      "Future office land supply&nbsp;<i class='legendMetadata' id='gmsf_office_land'></i>": {
        "Switch off future office land supply": L.tileLayer(""),
        "<img class='legend' data-legend='HEIGHT=40&WIDTH=40&LAYER=gmsf_office_land' /> 2014 to 2019": s,
        "<img class='legend' data-legend='HEIGHT=40&WIDTH=40&LAYER=gmsf_office_land' /> 2019 to 2024": u,
        "<img class='legend' data-legend='HEIGHT=40&WIDTH=40&LAYER=gmsf_office_land' /> 2024 to 2035": C,
        "<img class='legend' data-legend='HEIGHT=40&WIDTH=40&LAYER=gmsf_office_land' /> 2014 to 2035": m
      }
    },
    k = L.control.groupedLayers(z, x, {
      autoZIndex: false,
      collapsed: true,
      exclusiveGroups: [
        "Future housing land supply&nbsp;<i class='legendMetadata' id='gmsf_housing_land'></i>",
        "Future industry and warehousing land supply&nbsp;<i class='legendMetadata' id='gmsf_industry_land'></i>",
        "Future office land supply&nbsp;<i class='legendMetadata' id='gmsf_office_land'></i>"
      ]
    }).addTo(map);
  if (!L.Browser.touch) {
    L.DomEvent.disableClickPropagation(k._container).disableScrollPropagation(
      k._container)
  } else {
    L.DomEvent.disableClickPropagation(k._container)
  }
  $("i.legendMetadata").each(function() {
    var G = $(this),
      H = $(this).closest("div").children().first().text().split(" [")[0],
      F = $.trim(H);
    G.attr({
      "class": "legendMetadata fa fa-info-circle fa-lg",
      title: "Click for more information on this dataset",
      "data-theme": F
    })
  });
  $("i.legendMetadata").click(function(F) {
    try {
      F.preventDefault();
      var P, M = this.id,
        K = $(this).data().theme,
        J = "90%",
        G = '<dl class="metaDL">',
        O = "Metadata: " + metadata[K][M].Title;
      if (window.innerWidth > 830) {
        J = 750
      }
      for (P in metadata[K][M]) {
        var H;
        if (metadata[K][M][P].substring(0, 7) === "http://" || metadata[K]
          [M][P].substring(0, 8) === "https://") {
          H = '<a target="_blank" href="' + metadata[K][M][P] + '">' +
            metadata[K][M][P] + "</a>"
        } else {
          H = metadata[K][M][P]
        }
        G += "<dt>" + P + ":</dt><dd>" + H + "</dd>"
      }
      G += "<dt>Theme:</dt><dd>" + K + "</dd>";
      G += "</dl>";
      $.colorbox({
        html: G,
        title: O,
        maxWidth: J,
        maxHeight: "95%"
      });
      return false
    } catch (I) {
      var N =
        '<p>There seems to have been a problem fetching this metadata, sorry about that.</p><p>Please contact <a href="mailto:mapping@neweconomymanchester.com">mapping@neweconomymanchester.com</a> should this continue.</p>';
      $.colorbox({
        html: N,
        title: "Error",
        maxWidth: "400px",
        maxHeight: "95%"
      })
    }
  });
  $("img.legend").each(function() {
    var G = $(this);
    var F =
      "//www.salford.gov.uk/geoserver/ows?service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&";
    G.attr("src", F + G.data("legend"))
  });
  $("img.legend.restrictedZoom").each(function() {
    $(this).parent().parent().addClass("restrictedZoom");
    $(this).removeClass("restrictedZoom")
  });
  map.on("zoomend", function() {
    if (map.getZoom() > 15) {
      $("label.restrictedZoom").addClass("restrictedZoomOn").attr("title",
        "Not visible at this zoom level, please zoom out");
      $("label.restrictedZoom").parent().addClass("restrictedZoomTheme");
      if ($("i.restrictedThemeWarning").length === 0) {
        $(".restrictedZoomTheme>.leaflet-control-layers-group-name").after(
          '<i class="fa fa-lg fa-exclamation-circle restrictedThemeWarning"></i>'
        )
      }
      $("i.restrictedThemeWarning").click(function() {
        var G = "90%",
          F =
          '<div class="warningDiv"><p>Some layers are not visible at this zoom level, please zoom out to view them again.</p><button onclick="$.colorbox.close()"><i class="fa fa-check-circle-o fa-lg"></i>&nbsp;Ok, got it.</button><button onclick="$.colorbox.close();map.setZoom(15)"><i class="fa fa-search-minus fa-lg"></i>&nbsp;Ok, zoom me out again.</button></div>';
        if (window.innerWidth > 550) {
          G = 500
        }
        $.colorbox({
          html: F,
          title: "Warning!",
          maxWidth: G,
          maxHeight: "95%"
        })
      })
    } else {
      $("label.restrictedZoom").removeClass("restrictedZoomOn").attr(
        "title", "");
      $("label.restrictedZoom").parent().removeClass(
        "restrictedZoomTheme");
      $("i.restrictedThemeWarning").remove()
    }
  });
  $(".leaflet-control-layers-list").prepend(
    "<span class='close-span'><i class='close-button fa fa-2x fa-sign-out' title='Minimise this box'></i></span>"
  );
  $(".close-button").click(function(F) {
    F.preventDefault();
    $("#map .leaflet-control-layers").removeClass(
      "leaflet-control-layers-expanded");
    return false
  });
  $("#map .leaflet-control-layers").addClass(
    "leaflet-control-layers-expanded");
  L.Control.geocoder({
    position: "topleft",
    collapsed: true
  }).addTo(map);
  collapseLayerGroups();
  updateLayerCount();
  $(".layerCount").click(function(F) {
    countDiv = $(this), layersInCount = countDiv.parents(
      ".leaflet-control-layers-group").find(
      ".leaflet-control-layers-selector");
    if (countDiv.text() === "[0]") {
      layersInCount.click()
    } else {
      $(layersInCount).each(function() {
        if ($(this).prop("checked") === true) {
          $(this).click()
        }
      })
    }
    return false
  });
  if (!mob && desktop_device) {
    L.control.zoomBox({
      modal: false
    }).addTo(map)
  }
  map.on("click", onMapClick);
  map.on("draw:drawstart draw:editstart draw:deletestart", function(F) {
    map.off("click", onMapClick);
    map.drawing = true;
    map.closePopup()
  });
  map.on("draw:drawstop draw:editstop draw:deletestop", function(F) {
    map.on("click", onMapClick);
    map.drawing = false
  });
  map.on("zoomstart", function(F) {
    map.off("click", onMapClick)
  });
  map.on("zoomend", function(F) {
    if (!map.drawing) {
      map.on("click", onMapClick)
    }
  });
  map.on("overlayadd", function(F) {
    map.closePopup();
    updateLayerCount();
    countLayersSwitchedOn()
  });
  map.on("overlayremove", function(F) {
    map.closePopup();
    updateLayerCount()
  });
  L.printSimple().addTo(map);
  map.recalledSiteLayerGroup = new L.FeatureGroup().addTo(map);
  var c = L.easyButton({
    states: [{
      stateName: "recall-site",
      icon: "fa-external-link-square fa-flip-vertical fa-flip-horizontal",
      title: "Recall a previously submitted site",
      onClick: function() {
        map.recalledSiteLayerGroup.clearLayers();
        var F = prompt(
          "What is the Submission ID of the site you'd like to recall?\n (can be comma separated list)",
          "1446124213855");
        if (F) {
          ajaxForRecallingSite(F)
        }
      }
    }]
  }).addTo(map);
  L.drawLocal.draw.toolbar.buttons = {
    polygon: "Draw a new site boundary"
  };
  L.drawLocal.draw.handlers.polygon = {
    tooltip: {
      start: "Click to start drawing boundary.",
      cont: "Click to continue drawing boundary.",
      end: "Click first point to close this boundary."
    }
  };
  L.drawLocal.edit = {
    toolbar: {
      buttons: {
        edit: "Edit drawn boundaries.",
        editDisabled: "No boundaries to edit.",
        remove: "Delete drawn boundaries",
        removeDisabled: "No boundaries to delete"
      },
      actions: {
        save: {
          title: "Finished editing drawn boundaries",
          text: "Done"
        },
        cancel: {
          title: "Cancel editing, discards all changes",
          text: "Cancel"
        }
      }
    },
    handlers: {
      edit: {
        tooltip: {
          text: "Drag handles to edit boundaries.",
          subtext: "Click cancel to undo changes."
        }
      },
      remove: {
        tooltip: {
          text: "Click on a boundary to remove"
        }
      }
    }
  };
  map.siteSubmissionLayer = new L.WFST({
    url: "http://www.salford.gov.uk/geoserver/NE_open/ows/",
    typeNS: "NE_open",
    typeName: "suggested_sites",
    geometryField: "the_geom",
    crs: L.CRS.EPSG4326,
    style: {
      color: "blue",
      weight: 2
    },
    showExisting: false
  }).addTo(map).once("load", function() {});
  map.siteSubmissionLayer.on("save:error", function(G) {
    var F =
      '<p>There seems to have been a problem submitting your site, sorry about that.</p><p>Please contact <a href="mailto:mapping@neweconomymanchester.com">mapping@neweconomymanchester.com</a> should this continue.</p>';
    $.colorbox({
      html: F,
      title: "Error",
      maxWidth: "400px",
      maxHeight: "95%"
    })
  });
  map.drawControlAddOnly = new L.Control.Draw({
    draw: {
      position: "topleft",
      polygon: {
        allowIntersection: false,
        showArea: true,
        drawError: {
          color: "#ffff00",
          timeout: 1000
        },
        shapeOptions: {
          color: "#ff0000"
        }
      },
      polyline: false,
      circle: false,
      rectangle: false,
      marker: false
    },
    edit: {
      edit: false,
      remove: false,
      featureGroup: map.siteSubmissionLayer
    }
  });
  map.addControl(map.drawControlAddOnly);
  map.drawControlEditOnly = new L.Control.Draw({
    edit: {
      featureGroup: map.siteSubmissionLayer
    },
    draw: false
  });
  map.on("draw:deleted", function(G) {
    var F = Object.keys(map.siteSubmissionLayer._layers).length;
    if (F === 0) {
      map.drawControlEditOnly.removeFrom(map);
      map.drawControlAddOnly.addTo(map);
      return false
    }
  });
  map.on("draw:created", function(H) {
    map.drawControlAddOnly.removeFrom(map);
    map.drawControlEditOnly.addTo(map);
    var G = H.layerType,
      F = H.layer;
    F.feature = {
      properties: {
        subid: new Date().getTime().toString()
      }
    };
    map.siteSubmissionLayer.addLayer(F);
    F.bindPopup(
      'Submission ID:<br><input type="text" placeholder="description of the site" name="subid" id="inputSubid" disabled value="' +
      F.feature.properties.subid +
      '"><br><br><button onclick="openForm(' + F._leaflet_id +
      ');"><i class="fa fa-plus-circle fa-lg"></i>&nbsp;&nbsp;Add site detail</button>'
    );
    F.openPopup()
  });
  $("#site_interest").change(function() {
    toggle_site_interest()
  });
  $("#planning_history, #legal_constraints, #ownership").change(function() {
    toggle_selectbox(this)
  });
  $("#site-uses>label>input").change(function() {
    toggle_site_uses(this)
  });
  $("#site-suitability select").change(function() {
    toggle_site_suitability()
  });
  $("#supporting_information").change(function() {
    toggle_supporting_information(this)
  });
  var q = getURLParameter("recall");
  if (q !== null) {
    ajaxForRecallingSite(q)
  }
  $(window).resize()
}

function sortLayers() {
  $(".leaflet-control-layers-group").each(function() {
    var a = $(this).children("label");
    a.sort(function(d, c) {
      return $(d).text().localeCompare($(c).text())
    });
    $(this).children("label").remove();
    $(this).append(a)
  })
}

function updateLayerCount() {
  $(".leaflet-control-layers-group").each(function() {
    var b = $(this).find("input:checkbox:checked").length,
      a = $(this).find("div");
    a.text("[" + b + "]");
    a.attr("title", b + (b === 1 ? " layer is " : " layers are ") +
      "switched on in this group\nClick here to switch them all " + (b ===
        0 ? "on" : "off"));
    if (b === 0) {
      a.addClass("allOff")
    } else {
      a.removeClass("allOff")
    }
  })
}

function countLayersSwitchedOn() {
  var b = $(".layerCount").text().replace(/\]\[/g, ",").replace(/\[|\]/g, "")
    .split(","),
    d = 0;
  $.each(b, function() {
    d += parseInt(this, 10)
  });
  if (d > 15) {
    var c = "90%",
      a =
      '<div class="warningDiv"><p>You seem to have switched on quite a few layers (' +
      d +
      "), so things might start to slow down.</p><p>Do you want to switch all the layers off and get a speedy map back?</p>";
    a +=
      '<button onclick="clearMap()"><i class="fa fa-check-circle-o fa-lg"></i>&nbsp;Yes please!</button><button onclick="$.colorbox.close()"><i class="fa fa-times-circle-o fa-lg"></i>&nbsp;No thanks.</button><button onclick="map.removeEventListener(&apos;overlayadd&apos;, updateLayerCount()) && $.colorbox.close()"><i class="fa fa-exclamation-circle fa-lg"></i>&nbsp;No thanks and stop asking me!</button></div>';
    if (window.innerWidth > 830) {
      c = 750
    }
    $.colorbox({
      html: a,
      title: "Warning!",
      maxWidth: c,
      maxHeight: "95%"
    })
  }
}

function clearMap() {
  $(".layerCount").each(function(c) {
    var b = $(this),
      a = b.parents(".leaflet-control-layers-group").find(
        ".leaflet-control-layers-selector");
    if (b.text() !== "[0]") {
      $(a).each(function() {
        if ($(this).prop("checked") === true) {
          $(this).click()
        }
      })
    }
  });
  $.colorbox.close()
}

function collapseLayerGroups() {
  $(".leaflet-control-layers-group label").hide();
  $(".leaflet-control-layers-group>span").each(function() {
    var c = $("&nbsp;<i></i>");
    c.addClass("handle fa fa-plus-square fa-lg");
    c.prependTo(this);
    c.addClass("collapsed")
  });
  $(".leaflet-control-layers-group>span").click(function() {
    var c = $(this.children).first();
    c.toggleClass("collapsed expanded fa-plus-square fa-minus-square");
    var d = $(this);
    d.siblings("label").toggle("slow")
  });
  var a = 400,
    b = 300;
  if ($(window).width() <= 450) {
    a = $(window).width() * 0.6
  }
  if ($(window).height() <= 380) {
    b = $(window).height() * 0.6
  }
  popup = new L.Popup({
    maxWidth: a,
    maxHeight: b,
    autoPanPadding: [20, 5]
  })
}

function checkForm(a) {
  if ($("#wrongPass").css("display") === "block") {
    $("#wrongPass").css("display", "none")
  }
  if (!$("#terms").is(":checked")) {
    $("#wrongPass").show("slow");
    a.terms.focus()
  } else {
    $("body").append($("#logoGMSF-map"));
    $("#headerWrapper, #bodyWrapper").remove();
    $("#map, #logoGMSF-map").css("display", "block");
    $("#logoGMSF-map").css("position", "absolute");
    initMap()
  }
}

function submitSiteForm(b, a) {
  map._layers[a].feature.properties.description = $("#inputDescription").val();
  map._layers[a].feature.properties.email = $("#inputEmail").val();
  map._layers[a].setStyle({
    color: "#00ff00"
  });
  refreshPopup(map._layers[a])
}

function toggle_site_interest() {
  if ($("#site_interest").val() === "Other") {
    $("#div-site_interest_other").slideDown();
    $("#site_interest_other").prop("required", true);
    $("#behalf-details").slideUp();
    $(".behalf-required").prop("required", false)
  } else {
    if ($("#site_interest").val() ===
      "Agent acting on behalf of landowner/developer") {
      $("#behalf-details").slideDown();
      $(".behalf-required").prop("required", true);
      $("#div-site_interest_other").slideUp();
      $("#site_interest_other").prop("required", false)
    } else {
      $("#div-site_interest_other, #behalf-details").slideUp();
      $(".behalf-required, #site_interest_other").prop("required", false)
    }
  }
}

function toggle_selectbox(a) {
  if ($(a).val() === "Yes" || $(a).val() === "Multiple") {
    $(a).next("div").slideDown()
  } else {
    $(a).next("div").slideUp()
  }
}

function toggle_site_uses(a) {
  if (a.checked) {
    $(a).parent().next("div").slideDown()
  } else {
    $(a).parent().next("div").slideUp()
  } if ($("#site-uses>label>input:checked").length > 0) {
    $("#div-use_justification").slideDown()
  } else {
    $("#div-use_justification").slideUp()
  }
}

function toggle_site_suitability() {
  if ($(".optTrue:selected").length > 0) {
    $("#div-constraint_detail").slideDown()
  } else {
    $("#div-constraint_detail").slideUp()
  }
}

function toggle_supporting_information(a) {
  if (a.checked) {
    $(a).next("div").slideDown()
  } else {
    $(a).next("div").slideUp()
  }
}

function submitForm() {
  if (typeof document.forms["site-form"].checkValidity === "function") {
    $("#site-form").find(":submit").click()
  } else {
    $("[required='']").each(function(a) {
      if (this.value.length === 0) {
        $(this).addClass("error")
      } else {
        $(this).removeClass("error")
      }
    });
    $("#site-form small").removeClass("error");
    if ($("#site-form .error").length > 0) {
      $("#site-form small").addClass("error");
      $("#cboxLoadedContent").scrollTop(0)
    } else {
      $("#site-form small").removeClass("error");
      $("#site-form").find(":submit").click()
    }
  }
}

function submitSite() {
  var a = Object.keys(map.siteSubmissionLayer._layers),
    b = map.siteSubmissionLayer._layers[a].feature.properties;
  $("#site-form input, #site-form textarea, #site-form select").each(function(
    c) {
    if ($(this).is(":checkbox")) {
      if (this.checked) {
        b[this.id] = "true"
      } else {
        b[this.id] = "false"
      }
    } else {
      b[this.id] = $(this).val()
    }
  });
  map.siteSubmissionLayer.save();
  map.siteSubmissionLayer.clearLayers();
  map.drawControlEditOnly.removeFrom(map);
  map.drawControlAddOnly.addTo(map);
  document.forms["site-form"].reset()
}

function resetForm() {
  document.forms["site-form"].reset();
  $.colorbox.close()
}

function getTheForm() {
  formObj = {};
  $("#site-form input, #site-form textarea, #site-form select").each(function(
    a) {
    if ($(this).is(":checkbox")) {
      $(this).after("<span class='required'>#</span>");
      formObj[this.id] = this.checked
    } else {
      $(this).css("background-color", "green");
      formObj[this.id] = $(this).val()
    }
  })
}

function openForm(a) {
  document.forms["site-form"].subid.value = map._layers[a].feature.properties
    .subid;
  document.forms["site-form"].site_area.value = L.GeometryUtil.readableArea(
    map._layers[a].options.measurement, true).replace("&sup2;", "²");
  $.colorbox({
    href: "#site-form",
    inline: true,
    className: "site-sub-form",
    height: "99%",
    overlayClose: false,
    escKey: false,
    closeButton: false,
    title: "<strong>Site Submission</strong><br>      <button class='submissionBtn' onclick='submitForm();' type='button'><i class='fa fa-check-circle-o fa-lg'></i>&nbsp;Submit this site</button>      <button class='clearBtn' onclick='resetForm();' type='button'><i class='fa fa-exclamation-circle fa-lg'></i>&nbsp;Clear this form and return to the map</button>"
  })
}

function getURLParameter(a) {
  return decodeURIComponent((new RegExp("[?|&]" + a + "=([^&;]+?)(&|#|;|$)").exec(
    location.search) || ["", ""])[1].replace(/\+/g, "%20")) || null
}

function ajaxForRecallingSite(a) {
  $.ajax({
    dataType: "json",
    url: "http://www.salford.gov.uk/geoserver/NE_open/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=NE_open:suggested_sites&outputFormat=application/json&propertyName=subid,the_geom&CQL_FILTER=subid%20IN(" +
      a + ")",
    success: function(d) {
      if (d.totalFeatures !== 0) {
        function c(f, e) {
          e.bindPopup("Submission ID: " + f.properties.subid)
        }
        var b = new L.geoJson(d.features, {
          onEachFeature: c
        });
        map.recalledSiteLayerGroup.addLayer(b);
        map.fitBounds(map.recalledSiteLayerGroup.getBounds())
      } else {
        $.colorbox({
          html: "No records found with matching submission ID(s)",
          title: "<strong>Error</strong>",
          width: "410px",
          maxWidth: "90%",
          maxHeight: "95%"
        });
        map.fitBounds([
          [53.71, -1.91],
          [53.33, -2.76]
        ])
      }
    }
  }).error(function() {
    $.colorbox({
      html: "No records found with matching submission ID(s)",
      title: "<strong>Error</strong>",
      maxWidth: "90%",
      maxHeight: "95%"
    });
    map.fitBounds([
      [53.71, -1.91],
      [53.33, -2.76]
    ])
  })
}

function wfstSuccess(d) {
  var b = L.XmlUtil.parseXml(d),
    c = b.documentElement.getElementsByTagName("ogc:FeatureId")[0];
  if (!c || c == null) {
    c = b.documentElement.getElementsByTagName("FeatureId")[0]
  }
  if (!c || c == null) {
    c = b.documentElement.getElementsByTagNameNS("http://www.opengis.net/ogc",
      "FeatureId")[0]
  }
  var a = c.getAttribute("fid");
  $.ajax({
    dataType: "json",
    url: "http://www.salford.gov.uk/geoserver/NE_open/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=NE_open:suggested_sites&outputFormat=application/json&propertyName=subid&featureID=" +
      a,
    success: function(g) {
      var f = g.features[0].properties.subid,
        h = location.protocol + "//" + location.host + location.pathname +
        "?recall=" + f,
        e = location.protocol + "//" + location.host +
        "/call-for-sites/up.jsp?subid=" + f,
        i =
        "<p>Thanks for submitting a site, you'll receive an email confirming all the details of your submission. If you want to view the boundary on the map use the &ldquo;Recall a previously submitted site&rdquo; button [<i class='fa fa-external-link-square fa-flip-vertical fa-flip-horizontal'></i>] on the left hand side and use your submission id: <input value='" +
        f + "' readonly></input></p>";
      i +=
        "<p>If you'd like to upload any supporting documents now please use: <a id='upload-link' href='" +
        e + "'>this link</a></p>";
      $.colorbox({
        html: i,
        title: "<strong>Site submitted successfully</strong>",
        maxWidth: "800px",
        maxHeight: "95%"
      });
      $("#upload-link").colorbox({
        iframe: true,
        maxWidth: "90%",
        maxWidth: "90%",
        innerWidth: 550,
        height: 400
      })
    }
  }).error(function(e) {
    console.log(e)
  })
}

function mailFunction(e) {
  var f = e.parent().prev().text().split(": ")[1],
    b = e.parent().prev().prev().text().split(": ")[1],
    g = e.closest(".feature").find(".handleTitle").text(),
    a = e.closest(".feature").parent().children(".handleTitle").text(),
    d = encodeURIComponent("GMSF Existing Site - " + f + " - " + a + " - " +
      b + " - " + g),
    c = encodeURIComponent(
      "** Please do not alter the subject line of this email **") +
    "%0D%0A%0D%0A" + encodeURIComponent(
      "Please provide your contact details and also comments on our assumptions for this site relating to the type, scale and phasing of development. Note that our assessment is a snapshot as of 1 April 2014."
    ) + "%0D%0A%0D%0A";
  window.location.href = "mailto:gmsfcallforsites@agma.gov.uk?subject=" + d +
    "&body=" + c
};