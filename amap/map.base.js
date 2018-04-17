var Map = {
  init: function(container, cbk) {
    var map = new AMap.Map(container, {
      resizeEnable: true,
      zoom: 13,
      center: [113.159649, 22.995836],
      mapStyle: "amap://styles/aaadd24c5d8483a20ded5cea742dcecc"
    });
    cbk && cbk(map);
    return map;
  }
};
