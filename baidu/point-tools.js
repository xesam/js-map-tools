Map.init(function(map){
  var markers = [];
  map.addEventListener("click", function(e) {
    var marker = Overlays.addIndexMarker(map, markers.length, e.point);
    markers.push(marker);
  });
  
  $('#getMarkers').click(function(){
      var locations = Overlays.getPositions(markers);
      console.log(JSON.stringify(locations));
  });
});
