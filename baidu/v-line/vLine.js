var vLine = {
    init: function(data) {
        this.line = data.line;
        this.routes = data.routes;
        this.stops = data.stops;
    },
    addToMap: function(map) {
        var routes = this.routes.map(point => {
            return new BMap.Point(point[0], point[1]);
        });
        var route_polyline = new BMap.Polyline(routes, {
            strokeColor: "blue",
            strokeWeight: 2,
            strokeOpacity: 0.5
        });

        var stop_labels = this.stops.map(stop => {
            new BMap.Label(stop.name, { offset: new BMap.Size(0, 0) });
        });

        var stop_markers = this.stops.map((stop, index) => {
            var point = new BMap.Point(point[0], point[1]);
            var marker = new BMap.Marker(point);
            marker.setLabel(stop_labels[index]);
            return marker;
        });

        this.route_polyline = route_polyline;
        this.stop_markers = stop_markers;

        map.addOverlay(polyline);
    },
    showRoute: function() {},
    showStops: function() {},
    showStopLabel: function() {}
};
