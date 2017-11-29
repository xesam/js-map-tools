var markers = [];
map.addEventListener("click", function(e) {
  var marker = addIndexMarker(map, {
    index : markers.length,
    point: e.point
  });
  markers.push(marker);
});

$('#getMarkers').click(function(){
    var locations = getLocations(markers);
    console.log(JSON.stringify(locations));
});