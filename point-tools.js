var markers = [];
map.addEventListener("click", function(e) {
  var marker = addIndexMarker(map, markers.length, e.point);
  markers.push(marker);
});

$('#getMarkers').click(function(){
    var locations = getOverlayLocations(markers);
    console.log(JSON.stringify(locations));
});