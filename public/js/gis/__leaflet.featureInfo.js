function onMapClick(j) {
  var h = j,
    g = [],
    l = "",
    f, m = false;
  if ($("#introToggle").hasClass("toggleMinus")) {
    toggleIntro()
  }
  $("#map").css("cursor", "progress");
  if (map.getZoom() < 9) {
    map.setView(h.latlng, 9)
  }
  for (f in map._layers) {
    if (typeof map._layers[f].wmsParams !== "undefined" && map._layers[f].options
      .queryable !== false) {
      var a = map._layers[f].wmsParams.layers,
        n = a;
      if ($.inArray(":", n) !== -1) {
        n = a.split(":", 2)[1]
      }
      g.push(a);
      if (typeof map._layers[f].options.propertyName !== "undefined" && l !==
        false) {
        l += (map._layers[f].options.propertyName)
      } else {
        var k = fieldLookup[n],
          c = [k._titleField];
        for (propt in k) {
          if (propt.substring(0, 1) !== "_") {
            c.push(propt)
          } else {
            if (propt.substring(0, 5) == "_URL_") {
              c.push(propt.substring(5))
            } else {
              if (propt.substring(0, 7) == "_EMAIL_") {
                c.push(propt.substring(7))
              }
            }
          }
        }
        l += "(" + c + ")"
      } if (map._layers[f].options.secure || m) {
        m = true
      }
    }
  }
  if (g.length === 0) {
    popup.setLatLng(h.latlng);
    popup.setContent(
      "<strong>No querable layers are switched on</strong><br />Try turning some on using the layer switcher<br />in the top right hand corner of the map."
    );
    map.openPopup(popup);
    map.autoClosePopup = setTimeout(function() {
      map.closePopup()
    }, 7000);
    shakeElement(".leaflet-control-layers.leaflet-control", 0, 5);
    $("#map").css("cursor", "auto");
    return
  }
  var p = map.getBounds()._southWest.lng + "," + map.getBounds()._southWest.lat +
    "," + map.getBounds()._northEast.lng + "," + map.getBounds()._northEast.lat,
    o = map.getSize().x,
    i = map.getSize().y,
    d = map.layerPointToContainerPoint(j.layerPoint).x.toFixed(),
    b = map.layerPointToContainerPoint(j.layerPoint).y.toFixed(),
    q =
    "http://www.salford.gov.uk/geoserver/ows?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&LAYERS=";
  if (m) {
    q =
      "http://www.salford.gov.uk/geoserver/OL4JSFProxy/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&LAYERS="
  }
  $.ajax({
    url: q + g + "&QUERY_LAYERS=" + g + "&propertyName=" + l + "&BBOX=" +
      p + "&FEATURE_COUNT=50&HEIGHT=" + i + "&WIDTH=" + o +
      "&SRS=EPSG%3A4326&X=" + d + "&Y=" + b +
      "&buffer=15&info_format=text/javascript",
    dataType: "jsonp",
    jsonp: false,
    jsonpCallback: "parseResponse"
  }).fail(function(v, r, t) {
    var u = "maps@salford.gov.uk",
      w = encodeURIComponent("Error on " + document.title),
      e = "%0A%0A" + encodeURIComponent("Error: GetFeatureInfo AJAX:") +
      "%0A--xhr.status:%20" + encodeURIComponent(v.status) +
      "%0A--status:%20" + encodeURIComponent(r) + "%0A--errorText:%20" +
      encodeURIComponent(t.toString()),
      s = "mailto:" + u + "?subject=" + w + "&body=" + e;
    $.colorbox({
      html: "<div class='error'><h2>An error has occurred</h2><p>Sorry for any inconvenience that this may cause.</p><p>Should this persist please contact <a href=" +
        s + ">" + u + "</a></p></div>",
      width: "40%"
    })
  }).always(function() {
    $("#map").css("cursor", "auto")
  }).done(function(r) {
    var z = r;
    clearTimeout(map.autoClosePopup);
    var H = "",
      A = "";
    if (z.features.length === 0) {
      H = "<h4>No features found at this location</h4>"
    } else {
      H =
        '<h4><strong>Features found at this location:</strong></h4><ul id="collapseList" class="overlays">'
    } if (z.features.length === 0) {
      map.autoClosePopup = setTimeout(function() {
        map.closePopup()
      }, 5000)
    } else {
      for (var G = 0; G < z.features.length; G++) {
        var B = z.features[G].id,
          t = z.features[G].id.split(".", 1),
          J = '<ul class="featureInfo">',
          v;
        if (typeof fieldLookup[t] == "undefined") {
          if (t[0] !== A) {
            var x = "maps@salford.gov.uk",
              w = encodeURIComponent("Error on " + document.title),
              C = "%0A%0AError:%0A" + encodeURIComponent(
                "Lookup Object not defined for: " + t),
              F = "mailto:" + x + "?subject=" + w + "&body=" + C;
            $.colorbox({
              html: "<div class='error'><h2>An error has occurred</h2><p>Sorry for any inconvenience that this may cause.</p><p>Should this persist please contact <a href=" +
                F + ">" + x + "</a></p></div>",
              width: "40%"
            });
            A = t[0];
            H += "<li>" + t[0] + '<ul class="feature">'
          }
          for (v in z.features[G].properties) {
            J += "<li>" + v + ": " + z.features[G].properties[v] +
              "</li>"
          }
          J += "</ul>";
          H += "<li>Found feature number " + (G + 1) + J + "</li>"
        } else {
          var I = fieldLookup[t],
            K = I._layerName,
            s = I._titleField,
            E = "_" + s,
            e, y;
          if (K !== A) {
            A = K;
            H += '<li><span class="handleTitle">' + K + "</span>"
          }
          H += '<ul class="feature"><li><span class="handleTitle">' + I[E] +
            z.features[G].properties[s] + "</span>";
          for (v in I) {
            if (v.substring(0, 1) !== "_") {
              e = I[v];
              y = z.features[G].properties[v];
              if (y !== null && typeof y != "undefined") {
                J += "<li>" + e + y + "</li>"
              }
            } else {
              if (v.substring(0, 5) == "_URL_") {
                var D = v.substring(5);
                if (I[v] === "_titleField") {
                  e = z.features[G].properties[s]
                } else {
                  e = I[v]
                } if (!I._URLPREFIX) {
                  y = z.features[G].properties[D]
                } else {
                  y = I._URLPREFIX + z.features[G].properties[D]
                } if (y !== null && typeof y != "undefined") {
                  J += '<li><a target="_blank" href="' + y + '">' + e +
                    " (opens in a new window)</a></li>"
                }
              } else {
                if (v.substring(0, 7) == "_EMAIL_") {
                  var u = v.substring(7);
                  e = I[v];
                  y = z.features[G].properties[u];
                  if (y !== null && typeof y != "undefined") {
                    J += "<li>" + e + ' <a href="mailto:' + y + '">' + y +
                      "</a></li>"
                  }
                } else {
                  if (v === "_NULL") {
                    J += "<li>" + I[v] + "</li>"
                  }
                }
              }
            }
          }
          J += "</ul>";
          if (J === '<ul class="featureInfo"></ul>') {
            J = ""
          }
          H += J += "</ul>"
        }
      }
    }
    H += "</ul>";
    popup.setLatLng(h.latlng);
    popup.setContent(H);
    map.openPopup(popup);
    if (map.options.collapseLists === true) {
      collapsableLists();
      $(".leaflet-popup-content").width($(".leaflet-popup-content").width() +
        22);
      if ($(".leaflet-popup-content").height() === 300) {
        $(".leaflet-popup-content").css("height", "auto");
        $(".leaflet-popup-content").css("max-height", "300px");
        $(".leaflet-popup-content").css("overflow-y", "scroll")
      }
    }
  })
}

function collapsableLists() {
  $("#collapseList ul").hide();
  $("#collapseList li").each(function() {
    var a = $("<span></span>");
    a.addClass("handle");
    a.prependTo(this);
    if ($(this).has("ul").size() > 0) {
      a.addClass("collapsed");
      a.click(function() {
        var b = $(this);
        b.toggleClass("collapsed expanded");
        b.siblings("ul").toggle("slow");
        $(".leaflet-popup-content").animate({
          scrollTop: $(".leaflet-popup-content").scrollTop() + $(
            this).position().top - 20
        }, "slow")
      })
    }
    if ($(this).children("ul").size() === 1 && !$(this).parent().hasClass(
      "feature")) {
      a.toggleClass("collapsed expanded");
      a.siblings("ul").toggle()
    }
  });
  $(".handleTitle").click(function() {
    $(this).prev().click()
  })
}

function parseResponse() {}

function shakeElement(d, c, a) {
  var b = $(d);
  b.animate({
    marginRight: "+=3px"
  }, 100, function() {
    b.animate({
      marginRight: "-=3px"
    }, 100, function() {
      if (c < a) {
        shakeElement(d, c, a)
      }
    });
    c++
  })
};