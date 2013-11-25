/**
 * @descript: 多语言逻辑模块
 * @author: terry(terry.jiang@bertelsmann.com.cn)
 * @Date：2013-11-19 13:50
 * @Modified By:
 * @Modified Date:
 *
 */


define(function(require, exports, module) {
  // "use strict";
  var Language, idb;
  idb = require('../idb/idb');


  /**
   * 语言对象
   */
  Language = function() {
    // 用来存储资源集
    var STORENAME_GROUP = 'resource_group',
    // 用来存储资源及对应的数据
      STORENAME_ITEM = 'resource_item',
      groupDB, itemDB,
      _this = this;

    groupDB = new idb(STORENAME_GROUP, 1);
    itemDB = new idb(STORENAME_ITEM, 2);

    /**
     * [渲染页面模板]
     * @param  {jsonObj}  data   [语言数据]
     * @param  {Array}    group  [对应的模板]
     * @return 
     */
    this._render = function() {
      // 用angularjs库渲染数据模板
      var languageApp = angular.module('langApp', []);
      languageApp.controller('langControl', function($scope) {
        var rendData = {},
          data_key;
        $.each(data.resources, function(res_index, res_item) {
          data_key = rendData[res_item.key] = {};
          $.each(res_item.items, function(item_index, result_item) {
            rendData[res_item.key[result_item.key]];
            data_key[result_item.key] = result_item.value;
          });
        });

        $.each(group, function(index, item) {
          $scope[item] = rendData[item];
        });
      });

      angular.bootstrap($('#test'), ['langApp']);
    };

    /**
     * [语言对象初始化]
     * @param  {Array}   group   [需要请求的语言资源]
     * @return
     */
    this.init = function(group) {

      itemDB.loadFromeCache('language', _this._render, 0.01, null, function() {
        _this._getdata(group, 0.02, null, function() {

        })
      });

    };

    /**
     * 从服务器获取数据
     * @param  {Array}   group [请求的资源]
     * @param  {Function} fn    [回调函数]
     * @return
     */
    this._getdata = function(group, fn) {
      console.log('get data from server');
      var groupString;
      groupString = group.join(',');
      // TODO 请求接口和参数约定
      $.ajax({
        type: 'post',
        url: 'http://localhost:3001/common/language',
        catche: false,
        data: {
          type: 'zhcn',
          group: groupString
        },
        success: function(d) {
          _this._render(d.resource, group);

          _this._saveItems(group);

        }
      });
    };

    /**
     * [checkUpdate description]
     * @param  {[type]} versions [description]
     * @return {[type]}          [description]
     */
    this.checkUpdate = function(versions) {
      var keys = [];
      var temp = versions.concat();
      for (var i = 0; i < versions.length; i++) {
        var ver = versions[i];
        groupDB.loadFromeCache(ver.key, function(_, _, _, state) {
          temp.splice(temp.indexOf(state), 1);
          if (temp.length <= 0) {
            _this._loadResources(keys);
          }
        }, ver.version, ver, function(k, _, _, fn) {
          keys.push(k);
          fn(null, true);
        });
      }
    };

    /**
     * [_loadResources description]
     * @param  {[type]} keys [description]
     * @return {[type]}      [description]
     */
    this._loadResources = function(keys) {
      // flatten keys
      // invoke resources api
      var res = {};
      var temp = res.resourses.concat();
      for (var i = 0; i < res.resouces.length; i++) {
        var r = res.resouces[i];
        _this._saveItems(r.items, function() {
          groupDB.saveToCache(r.key, r.version, null, function(_, _, _, state) {
            temp.splice(temp.indexOf(state), 1);
            if (temp.length <= 0) {
              _this._render();
            }
          });
        });
      }
    };

    /**
     * [_saveItems description]
     * @param  {[type]}   items    [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    this._saveItems = function(items, callback) {
      var temp = items.concat();
      console.log('save Items');

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        itemDB.saveToCache(item.key, item.value, item, function(_, _, _, state) {
          temp.splice(temp.indexOf(state), 1);
          if (temp.length <= 0) {
            if (callback) {
              callback();
            }
          }
        });
      };

    };
  };

  module.exports = Language;
});