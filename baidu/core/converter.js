var Converter = {
    fromLngLat: function (lng, lat, reverse) {
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
    fromLngLatPair: function (pair, reverse) {
        return fromLngLat(pair[0], pair[1], reverse);
    },
    fromLngLatArray: function (lngLats, reverse) {
        var ret = [];
        var pairCount = Math.floor(lngLats.length / 2);
        for (var index = 0; index < pairCount; index++) {
            var lngIndex = index * 2;
            var loc = this.fromLngLat(lngLats[lngIndex], lngLats[lngIndex + 1]);
            ret.push(loc);
        }
        return ret;
    },
    toMapPoint: function (location) {
        if (location.constructor == Array) {
            return new BMap.Point(location[0], location[1]);
        }
        return new BMap.Point(location["lng"], location["lat"]);
    },
    toMapPoints: function (locations) {
        var _this = this;
        var ret = [];
        locations.forEach(function (item, index) {
            ret.push(_this.toMapPoint(item));
        });
        return ret;
    }
};
