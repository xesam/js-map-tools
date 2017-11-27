function MoveMarker(marker) {
    this.marker = marker;
    this.speed = 100000;
    this.fps = 60;
    this.path = [];
    this.point_index = 0;
    this._interval_flag = null;
}

MoveMarker.prototype.moveTo = function (to, running_cbk, finish_cbk) {
    var map = this.marker.getMap();
    var _projection = map.getMapType().getProjection();
    var from = _projection.lngLatToPoint(marker.getPosition());
    this._interval_flag = move_tick(
        from,
        to,
        this.speed,
        this.fps,
        function (running, index) {
            var nextPixel = new BMap.Pixel(running.x, running.y);
            var nextPos = _projection.pointToLngLat(nextPixel);
            marker.setPosition(nextPos);
            running_cbk && running_cbk();
        },
        function (running, index) {
            console.log('point-finished');
            var nextPixel = new BMap.Pixel(running.x, running.y);
            var nextPos = _projection.pointToLngLat(nextPixel);
            marker.setPosition(nextPos);
            finish_cbk && finish_cbk();
        });
}

MoveMarker.prototype._moveNext = function () {
    if (this.point_index >= this.path.length) {
        console.log('point-finished');
        return;
    }
    var _this = this;
    var next_point = _this.path[_this.point_index];
    this.moveTo(next_point, null, function () {
        _this.point_index++;
        _this._moveNext();
    });
}

MoveMarker.prototype.start = function () {
    if (this.path.length == 0) {
        console.log('no path');
        return;
    }
    this.point_index = 0;
    this._moveNext();
}

MoveMarker.prototype.addPath = function (points) {
    this.path = this.path.concat(points);
}

MoveMarker.prototype.updatePath = function (points, includeCurrent) {
    this.stop();
}

MoveMarker.prototype.stop = function () {
    clearInterval(this._interval_flag);
}

function move_tick(from, to, speed, fps, running_cbk, finish_cbk) {
    var frame_duration = 1000 / fps;
    var delta_x = to.x - from.x;
    var delta_y = to.y - from.y;
    var total_distance = Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2));
    var seconds = total_distance / speed;
    var real_frames = seconds * fps;
    var final_frames = Math.floor(real_frames);
    var need_fill = real_frames > final_frames;
    var step_x = delta_x / final_frames;
    var step_y = delta_y / final_frames;

    var frame_index = 0;
    // console.log(total_distance, seconds, step_x, real_frames, final_frames, need_fill);
    var interval_flag = setInterval(function () {
        if (frame_index >= final_frames) {
            clearInterval(interval_flag);
            if (need_fill && finish_cbk) {
                finish_cbk({
                    x: to.x,
                    y: to.y
                }, frame_index);
            }
            return;
        }

        var running = {};
        running.x = from.x + frame_index * step_x;
        running.y = from.y + frame_index * step_y;
        if (running_cbk) {
            running_cbk(running, frame_index);
        }
        frame_index++;
    }, frame_duration);
    return interval_flag;
}
