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

function line_move(map, line, start_stop_index, end_stop_index) {
  AMapUI.load(["ui/misc/PathSimplifier"], function(PathSimplifier) {
    if (!PathSimplifier.supportCanvas) {
      console.warn("当前环境不支持 Canvas！");
      return;
    }

    line.stations1.forEach(stop => {
      add_stop_marker(map, [stop.lon, stop.lat]);
    });

    var pathSimplifierIns = new PathSimplifier({
      zIndex: 100,
      map: map,
      getPath: function(pathData, pathIndex) {
        return pathData.path;
      },
      getHoverTitle: function(pathData, pathIndex, pointIndex) {
        if (pointIndex >= 0) {
          return (
            pathData.name + "，点:" + pointIndex + "/" + pathData.path.length
          );
        }
        return pathData.name + "，点数量" + pathData.path.length;
      },
      renderOptions: {
        pathLineStyle: {
          strokeStyle: "red",
          lineWidth: 6,
          dirArrowStyle: true
        }
      }
    });

    pathSimplifierIns.setData([
      {
        name: "轨迹0",
        path: line.routes1.map(pos => {
          return [pos.lon, pos.lat];
        })
      }
    ]);

    var navg0 = pathSimplifierIns.createPathNavigator(0, {
      loop: false,
      speed: 3000
    });

    navg0.start();
  });
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
    showDir:true
  });
  polyline.setMap(map);
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
    fillOpacity: 0.8,
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
      background: "none",
      border: "none",
      "box-shadow": "3px 3px 3px #888888",
      "font-size": "12px",
      color: color ? color : "#000"
    },
    position: [stop.lon, stop.lat]
  });
  text.setMap(map);
}

function get_stop(line, direction, order, stop_name) {
  var stops = line["stations" + (direction + 1)];
  return stops[order - 1];
}
