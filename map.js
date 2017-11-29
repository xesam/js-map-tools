function initMap() {
  var map = new BMap.Map("map_container"); // 创建Map实例
  map.centerAndZoom(new BMap.Point(117.27655869759884, 39.06165123919057), 11); // 初始化地图,设置中心点坐标和地图级别
  //添加地图类型控件
  map.addControl(
    new BMap.MapTypeControl({
      mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
    })
  );
  map.setCurrentCity("天津"); // 设置地图显示的城市 此项是必须设置的
  map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  return map;
}

function addIndexMarker(map, opts) {
  var pt;
  if(opts['point']){
    pt = opts['point'];
  }else if(opts['lng'] && opts['lat']){
    pt = new BMap.Point(opts['lng'], opts['lat']);
  }
  var index = opts['index'] || 0;

  var marker = new BMap.Marker(pt);
  map.addOverlay(marker);

  var label = new BMap.Label(index + "", {
    position: pt
  }); 
  label.setStyle({
    color: "red",
    fontSize: "12px",
    height: "20px",
    lineHeight: "20px"
  });
  map.addOverlay(label);
  return marker;
}

function getLocation(overlay){
  if(overlay["getPosition"]){
    var position = overlay.getPosition();
    return {
      lng:position.lng,
      lat:position.lat
    }
  }else{
    throw new Error('no getPosition');
  }
}

function getLocations(overlays){
  var ret = [];
  overlays.forEach(function(item, index){
    var location = getLocation(item);
    ret.push(location);
  });
  return ret;
}

function toMapPoint(location){
  return new BMap.Point(location['lng'], location['lat']);
}

function toMapPoints(locations){
  var ret = [];
  locations.forEach(function(item, index){
    ret.push(toMapPoint(item));
  });
  return ret;
}

var map = initMap();



