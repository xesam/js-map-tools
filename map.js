var Map = {
  init: function(cbk){
    var map = new BMap.Map("map_container"); // 创建Map实例
    map.centerAndZoom(new BMap.Point(117.27655869759884, 39.06165123919057), 14); // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(
      new BMap.MapTypeControl({
        mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
      })
    );
    map.enableScrollWheelZoom(true);
    cbk && cbk(map);
    return map;
  }
}

var Converter = {
  fromLngLat: function(lng, lat, reverse) {
    return reverse
      ? {
          lng: lat,
          lat: lng
        }
      : {
          lng: lng,
          lat: lat
        };
  },
  fromLngLatPair: function(pair, reverse) {
    return fromLngLat(pair[0], pair[1], reverse);
  },
  fromLngLatArray: function(lngLats, reverse) {
    var ret = [];
    var pairCount = Math.floor(lngLats.length / 2);
    for (var index = 0; index < pairCount; index++) {
      var lngIndex = index * 2;
      var loc = this.fromLngLat(lngLats[lngIndex], lngLats[lngIndex + 1]);
      ret.push(loc);
    }
    return ret;
  },
  toMapPoint: function(location) {
    if (location.constructor == Array) {
      return new BMap.Point(location[0], location[1]);
    }
    return new BMap.Point(location["lng"], location["lat"]);
  },
  toMapPoints: function(locations) {
    var _this = this;
    var ret = [];
    locations.forEach(function(item, index) {
      ret.push(_this.toMapPoint(item));
    });
    return ret;
  }
};

var Overlays = {
  getPosition: function(overlay) {
    if (overlay["getPosition"]) {
      var position = overlay.getPosition();
      return {
        lng: position.lng,
        lat: position.lat
      };
    } else {
      throw new Error("no getPosition");
    }
  },
  getPositions: function(overlays) {
    var _this = this;
    var ret = [];
    overlays.forEach(function(item, index) {
      var location = _this.getPosition(item);
      ret.push(location);
    });
    return ret;
  },
  addMarker: function(map, point) {
    var mapPoint = Converter.toMapPoint(point);
    var marker = new BMap.Marker(mapPoint);
    map.addOverlay(marker);
    return marker;
  },  
  addIndexMarker: function(map, index, point) {
    var mapPoint = Converter.toMapPoint(point);
    var marker = this.addMarker(map, mapPoint);
  
    var label = new BMap.Label(index + "", {
      position: mapPoint
    });
  
    map.addOverlay(label);
    return marker;
  }
};
