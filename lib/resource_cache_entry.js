// Generated by CoffeeScript 1.7.1
var Cache, ResourceCacheEntry;

Cache = require('./cache');

ResourceCacheEntry = (function() {
  ResourceCacheEntry.prototype.defaultValue = {};

  function ResourceCacheEntry(resourceKey, params) {
    var param, paramKeys, _ref;
    this.setKey(resourceKey);
    paramKeys = angular.isObject(params) ? Object.keys(params).sort() : [];
    if (paramKeys.length) {
      this.key += '?' + ((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = paramKeys.length; _i < _len; _i++) {
          param = paramKeys[_i];
          _results.push("" + param + "=" + params[param]);
        }
        return _results;
      })()).join('&');
    }
    _ref = Cache.getItem(this.key, this.defaultValue), this.value = _ref.value, this.dirty = _ref.dirty;
  }

  ResourceCacheEntry.prototype.setKey = function(key) {
    this.key = key;
  };

  ResourceCacheEntry.prototype.set = function(value, dirty) {
    this.value = value;
    this.dirty = dirty;
    return this._update();
  };

  ResourceCacheEntry.prototype.setClean = function() {
    this.dirty = false;
    return this._update();
  };

  ResourceCacheEntry.prototype._update = function() {
    return Cache.setItem(this.key, {
      value: this.value,
      dirty: this.dirty
    });
  };

  return ResourceCacheEntry;

})();

module.exports = ResourceCacheEntry;