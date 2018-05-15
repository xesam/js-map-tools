//中国的经纬度范围大约为：纬度3.86~53.55，经度73.66~135.05
let China = {
  SOUTH: 3.86,
  NORTH: 53.55,
  WEST: 73.66,
  EAST: 135.05
};

let Distance = (function() {
  var defaultSteps = [0.1, 0.01, 0.001, 0.0001, 0.00001];

  function getDistance(map, start, end) {
    var sPoint = new BMap.Point(start[0], start[1]);
    var ePoint = new BMap.Point(end[0], end[1]);
    return map.getDistance(sPoint, ePoint);
  }

  function next_step(map, step, gen_start, gen_end) {
    var ret = [];
    for (var i = 1; i <= 9; i++) {
      var delta = step * i;
      var distance = getDistance(map, gen_start(i, delta), gen_end(i, delta));
      ret.push([delta, distance]);
    }
    return ret;
  }

  function step_lng(map, lat, steps = defaultSteps) {
    var ret = [];
    steps.forEach(function(step) {
      var stepValues = next_step(
        map,
        step,
        function(index, delta) {
          return [1, lat];
        },
        function(index, delta) {
          return [1 + delta, lat];
        }
      );
      ret = ret.concat(stepValues);
    });
    return ret;
  }

  function step_lat(map, lng, steps = defaultSteps) {
    var ret = [];
    steps.forEach(function(step) {
      var stepValues = next_step(
        map,
        step,
        function(index, delta) {
          return [lng, 1];
        },
        function(index, delta) {
          return [lng, 1 + delta];
        }
      );
      ret = ret.concat(stepValues);
    });
    return ret;
  }
  return {
    step_lng: step_lng,
    step_lat: step_lat
  };
})();
