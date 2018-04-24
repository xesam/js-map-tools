var Overlays = {
    getPosition: function (overlay) {
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
    getPositions: function (overlays) {
        var _this = this;
        var ret = [];
        overlays.forEach(function (item, index) {
            var location = _this.getPosition(item);
            ret.push(location);
        });
        return ret;
    },
    getPath: function (overlay) { },
    addMarker: function (map, point) {
        var mapPoint = Converter.toMapPoint(point);
        var marker = new BMap.Marker(mapPoint);
        map.addOverlay(marker);
        return marker;
    },
    addIndexMarker: function (map, index, point) {
        var mapPoint = Converter.toMapPoint(point);
        var marker = this.addMarker(map, mapPoint);

        var label = new BMap.Label(index + "", {
            position: mapPoint
        });

        map.addOverlay(label);
        return marker;
    }
};