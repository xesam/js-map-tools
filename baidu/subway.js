function Subway(cityName) {
    var _this = this;
    this.cityName = cityName;
    this.searchEngine = new BMap.BusLineSearch(cityName, {
        onGetBusListComplete: function (lines) {
            if (lines) {
                console.log(lines.city, lines.keyword);
                if (_this.onGetBusListComplete) {
                    _this.onGetBusListComplete(lines);
                }
                for (var i = 0, n = lines.getNumBusList(); i < n; i++) {
                    var firstLine = lines.getBusListItem(i);
                    _this.searchEngine.getBusLine(firstLine);
                }
            }
        },
        onGetBusLineComplete: function (line) {
            if (_this.onGetBusLineComplete) {
                _this.onGetBusLineComplete(line);
            }
        }
    });
};

Subway.prototype.onGetBusListComplete = function (cbk) {
    this.onGetBusListComplete = cbk;
    return this;
};

Subway.prototype.onGetBusLineComplete = function (cbk) {
    this.onGetBusLineComplete = cbk;
    return this;
};

Subway.prototype.search = function (keyword) {
    this.searchEngine.getBusList(keyword);
};