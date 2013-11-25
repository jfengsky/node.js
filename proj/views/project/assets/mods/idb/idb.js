/**
 * @descript: indexedDB本地存储模块
 * @author: terry(terry.jiang@bertelsmann.com.cn)
 * @Date：2013-11-19 13:50
 * @Modified By:
 * @Modified Date:
 *
 */


define(function(require, exports, module) {
  "use strict";
  var Idb;
  /**
   * indexedDB对象
   * @param {String} store_name [表名字]
   */
  Idb = function(store_name, DB_ver) {
    var _this = this;

    $.indexedDB('ix', {
      'version': DB_ver,
      'upgrade': function(trans) {
        trans.createObjectStore(store_name);
      }
    });


    /**
     * 把数据存入indexedDB
     * @param  {String} version [数据版本]
     * @param  {String} type    [附加数据，语言类型]
     * @param  {jsonObject} d   [需要存储数据]
     * @return
     */
    this.saveToCache = function(key, version, data, state, callback) {

      var db = $.indexedDB('ix').objectStore(store_name).put({
        'version': version,
        'data': data
      }, key);
      if (callback) {
        db.done(callback(key, version, data, state));
      }
    };

    /**
     * 对外接口，根据参数获取indexedDB数据，存在的话回调函数，没有的话去服务器获取
     * @param  {String}   key         [数据键值]
     * @param  {Function} callback    [回调函数，function(key, version，data, state, skip)。异步给出结果，供后续操作。]
     * @param  {Object}   version     [期望的数据版本。省略则无视版本获取当前信息。]
     * @param  {String}   state       []
     * @param  {Function} obtainData  [回调函数，function(key, version, state，callback(data, skip))。从外部获取数据，当发现指定的数据不存在或者版本不一致时调用。]
     * @return
     */
    this.loadFromeCache = function(key, callback, version, state, obtainData) {

      var getStoreVersion = $.indexedDB('ix').objectStore(store_name).get(key);
      getStoreVersion.done(function(result) {

        if (version && (!result || result.version != version)) {

          obtainData(key, version, state, function(data, skip) {
            if (skip) {

              if (callback) {
                callback(key, version, d, state, true);
              }
            } else {

              _this.saveToCache(key, version, data, state, function(k, v, d, s) {
                if (callback) {
                  callback(k, v, d, s);
                }
              });
            }
          });
        } else {

          if (callback) {
            callback(key, version, result == null ? null : result.data, state);
          }
        }
      });
    };

    /**
     * [删除数据表]
     * @param  {String}   key      [数据表名]
     * @param  {Function} callback [description]
     * @return
     */
    this.deleteFromeCache = function(key, callback) {
      $.indexedDB("ix").objectStore(store_name).delete(key).done(callback);
    };
  };
  module.exports = Idb;
});