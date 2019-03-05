var Map = {
    init: function(container, cbk) {
        var map = new AMap.Map(container, {
            resizeEnable: true,
            zoom: 17,
            center: [113.033712, 23.079352],
            // mapStyle: "amap://styles/aaadd24c5d8483a20ded5cea742dcecc"
        });
        cbk && cbk(map);
        return map;
    }
};
