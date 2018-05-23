var Map = {
    init: function (container, cbk) {
        var map = new AMap.Map(container, {
            resizeEnable: true,
            zoom: 14,
            center: [117.259588, 39.0537],
            mapStyle: "amap://styles/aaadd24c5d8483a20ded5cea742dcecc"
        });
        cbk && cbk(map);
        return map;
    }
};