var Map = {
  init: function(cbk) {
    var map = new BMap.Map("map_container"); // 创建Map实例
    map.centerAndZoom(
      new BMap.Point(117.27655869759884, 39.06165123919057),
      14
    ); // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(
      new BMap.MapTypeControl({
        mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
      })
    );
    map.enableScrollWheelZoom(true);
    cbk && cbk(map);
    return map;
  },
  clearOverlays: function(map, force) {
    if (force) {
      for (var overlay in map.getOverlays()) {
        overlay.enableMassClear(); //restore?
      }
    }
    map.clearOverlays();
  },
  inspect: function(map) {
    var info = {
      bounds: (function() {
        var b = map.getBounds();
        return {
          center: b.getCenter(),
          southWest: b.getSouthWest(),
          northEast: b.getNorthEast()
        };
      })(),
      center: map.getCenter(),
      zoom: map.getZoom(),
      mapType: map.getMapType().getName(),
      size: map.getSize()
    };
    console.log(info);
  }
};