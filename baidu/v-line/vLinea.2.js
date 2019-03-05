var vLine = function(options) {
    this.options = options || {};
    this.show();
};

vLine.prototype = new BMap.Overlay();

vLine.prototype.initialize = function(map) {
    this._map = map;
    return null;
};

vLine.prototype.draw = function() {};
