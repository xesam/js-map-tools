//start
//stop
//pause
//resume
//restart

function LocationPlay(){
    this.points = [];
    this.playIndex = 0;
}

LocationPlay.prototype.reset = function(cbk){
    this.playIndex = 0;
}

LocationPlay.prototype.next = function(nextCbk){
    if(this.playIndex >= this.points.length){
        return;
    }
    this.playIndex++;
    if(nextCbk){
        var nextPoint = this.points[this.playIndex];
        nextCbk(nextPoint);
    }
}