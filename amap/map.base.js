var Map = {
  init: function(container, cbk) {
    var map = new AMap.Map(container, {
      resizeEnable: true,
      zoom: 13,
      center: [116.405467, 39.907761],
      mapStyle: "amap://styles/aaadd24c5d8483a20ded5cea742dcecc"
    });
    cbk && cbk(map);
    return map;
  }
};
