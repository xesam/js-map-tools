function add_stop_marker(map, center) {
  var circleMarker = new AMap.CircleMarker({
    center: center,
    radius: 6,
    strokeColor: "green",
    strokeWeight: 2,
    strokeOpacity: 0.5,
    fillColor: "#109618",
    fillOpacity: 0.5,
    zIndex: 100,
    bubble: true,
    cursor: "pointer",
    clickable: false
  });
  circleMarker.setMap(map);
}

function add_on_marker(map, center) {
  var circleMarker = new AMap.CircleMarker({
    center: center,
    radius: 5,
    strokeColor: "white",
    strokeWeight: 2,
    strokeOpacity: 0.5,
    fillColor: "rgba(255,0,0,1)",
    fillOpacity: 0.8,
    zIndex: 10,
    bubble: true,
    cursor: "pointer",
    clickable: true
  });
  circleMarker.setMap(map);
}

function add_off_marker(map, center) {
  var circleMarker = new AMap.CircleMarker({
    center: center,
    radius: 5,
    strokeColor: "white",
    strokeWeight: 2,
    strokeOpacity: 0.5,
    fillColor: "rgba(0,255,0,1)",
    fillOpacity: 0.8,
    zIndex: 10,
    bubble: true,
    cursor: "pointer",
    clickable: true
  });
  circleMarker.setMap(map);
}

function find_stop_in_route(line, direction, stop_index) {
  var routes = line["routes" + (direction + 1)];
  var stops = line["stations" + (direction + 1)];
  var stop = stops[stop_index];
  var target_index = 0;
  var target_point = routes[target_index];
  routes.slice(1).forEach((point, index) => {
    var dis_1 =
      Math.pow(target_point.lon - stop.lon, 2) +
      Math.pow(target_point.lat - stop.lat, 2);
    var dis_2 =
      Math.pow(point.lon - stop.lon, 2) + Math.pow(point.lat - stop.lat, 2);
    if (dis_1 > dis_2) {
      target_index = index;
      target_point = point;
    }
  });
  return target_index;
}

function line_move(
  map,
  PathSimplifier,
  line,
  direction,
  start_stop_index,
  end_stop_index
) {
  var pathSimplifierIns = new PathSimplifier({
    zIndex: 9999,
    map: map,
    getPath: function(pathData, pathIndex) {
      return pathData.path;
    },
    autoSetFitView: false,
    renderOptions: {
      pathLineStyle: {
        lineWidth: 0,
        dirArrowStyle: false,
        borderWidth: 0
      }
    },
    pathNavigatorStyle: {
      pathLinePassedStyle: {
        strokeStyle: "red"
      }
    }
  });

  var routes = line["routes" + (direction + 1)];
  var start_index = find_stop_in_route(line, direction, start_stop_index);
  var end_index = find_stop_in_route(line, direction, end_stop_index);

  pathSimplifierIns.setData([
    {
      name: "轨迹0",
      path: routes.map(pos => {
        return [pos.lon, pos.lat];
      })
    }
  ]);

  var navg0 = pathSimplifierIns.createPathNavigator(0, {
    loop: false,
    speed: 1000,
    zIndex: 9999,
    range: [start_index, end_index]
  });
  return {
    simplifier: pathSimplifierIns,
    nav: navg0
  };
}

function show_route(map, line, direction, color) {
  var routes = line["routes" + (direction + 1)];
  var lineArr = routes.map(pos => {
    return [pos.lon, pos.lat];
  });
  var polyline = new AMap.Polyline({
    path: lineArr, //设置线覆盖物路径
    strokeColor: color ? color : "#3366FF", //线颜色
    strokeOpacity: 1, //线透明度
    strokeWeight: 6, //线宽
    strokeStyle: "solid", //线样式
    strokeDasharray: [10, 5], //补充线样,
    showDir: true
  });
  polyline.setMap(map);
}

function show_stops(map, line, direction, process) {
  var stops = line["stations" + (direction + 1)];
  stops.forEach((stop, index) => {
    process(line, direction, stop, index + 1);
  });
}

function show_stops_marker(map, line, direction, filter) {
  filter =
    filter ||
    function() {
      return true;
    };
  var stops = line["stations" + (direction + 1)];
  stops.forEach((stop, index) => {
    if (filter(stop, index)) {
      add_stop_marker(map, stop);
    }
  });
}

function show_stops_text(map, line, direction, filter) {
  filter =
    filter ||
    function() {
      return true;
    };
  var stops = line["stations" + (direction + 1)];
  stops.forEach((stop, index) => {
    if (filter(stop, index)) {
      var order = index + 1;
      add_stop_text(map, line, direction, stop, order);
    }
  });
}

function add_stop_marker(map, stop) {
  var circleMarker = new AMap.CircleMarker({
    center: [stop.lon, stop.lat],
    radius: 5,
    strokeColor: "white",
    strokeWeight: 2,
    strokeOpacity: 1,
    fillColor: "rgba(0,255,0,1)",
    fillOpacity: 1,
    zIndex: 100,
    bubble: true,
    cursor: "pointer"
  });
  circleMarker.setMap(map);
}

function add_stop_text(map, line, direction, stop, order, color) {
  var text = new AMap.Text({
    text: `【${line.name}】${order}.${stop.name}`,
    textAlign: "center",
    verticalAlign: "top",
    draggable: false,
    angle: 0,
    offset: new AMap.Pixel(0, 10),
    style: {
      background: color ? color : "none",
      border: "none",
      "box-shadow": "2px 2px 2px #666666",
      "font-size": "12px",
      color: "#000"
    },
    position: [stop.lon, stop.lat]
  });
  text.setMap(map);
}

function get_stop(line, direction, order, stop_name) {
  var stops = line["stations" + (direction + 1)];
  return stops[order - 1];
}

function add_circle(map, stop) {
  var circle = new AMap.Circle({
    center: new AMap.LngLat(stop.lon, stop.lat), // 圆心位置
    radius: 300, //半径
    strokeColor: "#F33", //线颜色
    strokeOpacity: 0.8, //线透明度
    strokeWeight: 1, //线粗细度
    fillColor: "#ee2200", //填充颜色
    fillOpacity: 0.35 //填充透明度
  });
  circle.setMap(map);
}

function visual_route(line, direction) {
  var routes = line["routes" + (direction + 1)];

  let ret = [];
  let start = routes[0];
  routes.forEach(item => {
    ret.push({
      line: [`${start.lon},${start.lat}`, `${item.lon},${item.lat}`]
    });
    start = item;
  });
  return ret;
}

function visual_stop(line, direction, o_start, o_end, d_start, d_end) {
  var stops = line["stations" + (direction + 1)];

  let ret = [];

  for (let i = 0; i < 50; i++) {
    let start = o_start + parseInt((o_end - o_start) * Math.random());
    let end = d_start + parseInt((d_end - d_start) * Math.random());

    let start_stop = stops[start];
    let end_stop = stops[end];

    ret.push({
      line: [
        `${start_stop.lon},${start_stop.lat}`,
        `${end_stop.lon},${end_stop.lat}`
      ]
    });
  }
  return ret;
}
