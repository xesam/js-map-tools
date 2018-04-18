var Map = {
  init: function(container, cbk) {
    var map = new AMap.Map(container, {
      resizeEnable: true,
      zoom: 14,
      center: [113.220007, 22.879622],
      mapStyle: "amap://styles/aaadd24c5d8483a20ded5cea742dcecc"
    });
    cbk && cbk(map);
    return map;
  }
};
