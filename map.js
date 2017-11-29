function initMap() {
  var map = new BMap.Map("map_container"); // 创建Map实例
  map.centerAndZoom(new BMap.Point(117.27655869759884, 39.06165123919057), 14); // 初始化地图,设置中心点坐标和地图级别
  //添加地图类型控件
  map.addControl(
    new BMap.MapTypeControl({
      mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
    })
  );
  map.enableScrollWheelZoom(true);
  return map;
}

function getOverlayLocation(overlay) {
  if (overlay["getPosition"]) {
    var position = overlay.getPosition();
    return {
      lng: position.lng,
      lat: position.lat
    };
  } else {
    throw new Error("no getPosition");
  }
}

function getOverlayLocations(overlays) {
  var ret = [];
  overlays.forEach(function(item, index) {
    var location = getOverlayLocation(item);
    ret.push(location);
  });
  return ret;
}

function toLocation(lng, lat, reverse) {
  return reverse
    ? {
        lng: lat,
        lat: lng
      }
    : {
        lng: lng,
        lat: lat
      };
}

function toLocations(locs) {
  var ret = [];
  var pairCount = Math.floor(locs.length / 2);
  for (var index = 0; index < pairCount; index++) {
    var loc = toLocation(locs[index * 2], locs[index * 2 + 1]);
    ret.push(loc);
  }
  return ret;
}

function toMapPoint(location) {
  if(location.constructor == Array){
    return new BMap.Point(location[0], location[1]);
  }
  return new BMap.Point(location["lng"], location["lat"]);
}

function toMapPoints(locations) {
  var ret = [];
  locations.forEach(function(item, index) {
    ret.push(toMapPoint(item));
  });
  return ret;
}

function addMarker(map, point) {
  var mapPoint = toMapPoint(point);
  var marker = new BMap.Marker(mapPoint);
  map.addOverlay(marker);
  return marker;
}

function addIndexMarker(map, index, point) {
  var mapPoint = toMapPoint(point);
  var marker = addMarker(map, mapPoint);

  var label = new BMap.Label(index + "", {
    position: mapPoint
  });

  map.addOverlay(label);
  return marker;
}

var map = initMap();
