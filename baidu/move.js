function Movable(){

}

Movable.prototype.start = function(){
    
}

Movable.prototype.stop = function(){

}

Movable.prototype.pause = function(){

}

Movable.prototype.move_tick = function(from, to, speed, fps, first_cbk, tick_cbk, last_cbk) {
    var frame_duration = 1000 / fps;
    var delta_x = to.x - from.x;
    var delta_y = to.y - from.y;
    var total_distance = Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2));
    var seconds = total_distance / speed;
    var actual_frames = seconds * fps;
    var normal_frames = Math.floor(actual_frames);
    var final_frames = Math.ceil(actual_frames);
    var need_fill = final_frames > normal_frames;
    var step_x = delta_x / final_frames;
    var step_y = delta_y / final_frames;

    var frame_index = 0;
    var current_pos = {
        x: from.x,
        y: from.y
    };
    first_cbk && first_cbk(current_pos, frame_index);
    var interval_flag = setInterval(function () {
        if (frame_index >= normal_frames) {
            clearInterval(interval_flag);
            if (need_fill && last_cbk) {
                last_cbk({
                    x: to.x,
                    y: to.y
                }, frame_index);
            }
        }else{
            current_pos.x += step_x;
            current_pos.y += step_y;
            var running = {
                x : current_pos.x,
                y : current_pos.y
            };
            tick_cbk && tick_cbk(running, frame_index);
            frame_index++;
        }
    }, frame_duration);
    return interval_flag;
};