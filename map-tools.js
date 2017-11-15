//中国的经纬度范围大约为：纬度3.86~53.55，经度73.66~135.05
let China = {
    SOUTH: 3.86,
    NORTH: 53.55,
    WEST: 73.66,
    EAST: 135.05
};

var defaultSteps = [0.1, 0.01, 0.001, 0.0001, 0.00001];

function getDistance(map, sLng, sLat, eLng, eLat) {
    var sPoint = new BMap.Point(sLng, sLat);
    var ePoint = new BMap.Point(eLng, eLat);
    return map.getDistance(sPoint, ePoint);
}

function stepLng(map, lat, lngStep) {
    var ret = [];
    for (var i = 1; i <= 9; i++) {
        var dis = lngStep * i;
        ret.push([dis, getDistance(map, 1, lat, 1 + dis, lat)]);
    }
    return ret;
}

function stepLat(map, lng, latStep) {
    var ret = [];
    for (var i = 1; i <= 9; i++) {
        var dis = latStep * i;
        ret.push([dis, getDistance(map, lng, 1, lng, 1 + dis)]);
    }
    return ret;
}

function stepLngMapper(map, lat, steps = defaultSteps){
    var lngMapper = [];
    steps.forEach(function (step) {
        var stepValues = stepLng(map, lat, step);
        lngMapper = lngMapper.concat(stepValues);
    });
    return lngMapper;
}

function stepLatMapper(map, lng, steps = defaultSteps){
    var latMapper = [];
    steps.forEach(function (step) {
        var stepValues = stepLat(map, lng, step);
        latMapper = latMapper.concat(stepValues);
    });
    return latMapper;
}