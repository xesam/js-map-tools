function LocationEmitter() {}

function LocationPlayer(points) {
  this.points = points || [];
  this.playIndex = 0;
  this._timerFlag = 0;
  this.fps = 10;

  this._isPlaying = false;
  this._isPaused = false;
}

LocationPlayer.prototype.onPlay = function(playCbk) {
  this._onPlayCbk = playCbk;
  return this;
};

LocationPlayer.prototype.onPause = function(pauseCbk) {
  this._onPauseCbk = pauseCbk;
  return this;
};

LocationPlayer.prototype.onResume = function(resumeCbk) {
  this._onResumeCbk = resumeCbk;
  return this;
};

LocationPlayer.prototype.onStop = function(stopCbk) {
  this._onStopCbk = stopCbk;
  return this;
};

LocationPlayer.prototype.onFinish = function(noMoreCbk) {
  this._onFinishCbk = noMoreCbk;
  return this;
};

LocationPlayer.prototype.inspect = function() {
  console.log(this.playIndex, this._isPlaying, this._isPaused);
};

LocationPlayer.prototype._clearFlags = function() {
  this._isPlaying = false;
  this._isPaused = false;
};

LocationPlayer.prototype._clearTimer = function() {
  clearInterval(this._timerFlag);
};

LocationPlayer.prototype.reset = function() {
  this._clearTimer();
  this._clearFlags();
  this.playIndex = 0;
};

LocationPlayer.prototype.play = function(playCbk, finishCbk) {
  if (this._isPlaying) {
    return;
  }
  if (this._isPaused) {
    //resume
    this._clearTimer();
    this._clearFlags();
  } else {
    //play
    this.reset();
  }
  this._isPlaying = true;
  this.next(playCbk, finishCbk);
  var _this = this;
  this._timerFlag = setInterval(function() {
    _this.next(playCbk, finishCbk);
  }, 1000 / this.fps);
};

LocationPlayer.prototype.next = function(playCbk, finishCbk) {
  if (this.playIndex >= this.points.length) {
    this.reset();
    this._onFinishCbk && this._onFinishCbk();
    finishCbk && finishCbk();
  } else {
    var playPoint = this.points[this.playIndex];
    this._onPlayCbk &&
      this._onPlayCbk(playPoint, this.playIndex, this.points.length);
    playCbk && playCbk(playPoint, this.playIndex, this.points.length);
    this.playIndex++;
  }
};

LocationPlayer.prototype.replay = function(playCbk, noMoreCbk) {
  this.reset();
  this.play(playCbk, noMoreCbk);
};

LocationPlayer.prototype.stop = function(onStopCbk) {
  if (!this._isPlaying) {
    return;
  }
  this._isPlaying = false;
  this._onStopCbk(this.playIndex, this.points.length);
  onStopCbk && onStopCbk(this.playIndex, this.points.length);
  this.reset();
};

LocationPlayer.prototype.pause = function(onPauseCbk) {
  if (this._isPaused) {
    return;
  }
  this._isPaused = true;
  this._isPlaying = false;
  this._onPauseCbk && this._onPauseCbk(this.playIndex, this.points.length);
  onPauseCbk && onPauseCbk(this.playIndex, this.points.length);
  this._clearTimer();
};

LocationPlayer.prototype.resume = function(onResumeCbk) {
  if (!this._isPaused) {
    return;
  }
  this._onResumeCbk && this._onResumeCbk(this.playIndex, this.points.length);
  onResumeCbk && onResumeCbk(this.playIndex, this.points.length);
  this.play();
};

LocationPlayer.prototype.addPoints = function(points) {
  this.points = this.points.concat(points);
};

LocationPlayer.prototype.updatePoints = function(points) {
  this.reset();
  this.points = points;
};
