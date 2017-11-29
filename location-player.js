//start
//stop
//pause
//resume
//restart

function LocationPlayer(points){
    this.points = points || [];
    this.playIndex = 0;
}

LocationPlayer.prototype.reset = function(cbk){
    this.playIndex = 0;
}

LocationPlayer.prototype.addPoints = function(points){
    this.points = this.points.concat(points);
}

LocationPlayer.prototype.updatePoints = function(points){
    this.reset();
    this.points = points;
}

LocationPlayer.prototype.next = function(playCbk, noMoreCbk){
    if(this.playIndex >= this.points.length){
        if(noMoreCbk){
            noMoreCbk();
        }
        return;
    }
    if(playCbk){
        var playPoint = this.points[this.playIndex];
        playCbk(playPoint, this.playIndex, this.points.length);
    }
    this.playIndex++;
}