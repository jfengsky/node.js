define(function(require, exports, module){

  var $ = require('jquery');
  var angular = require('angularjs');
  require('indexeddb');

  function getData(fn){
    $.ajax({
      type: "post",
      url: "getlanguage.php",
      data: {
        language: "zh-cn",
        care_resources: ""
      },
      dataType: "json",
      success: function(data){
        fn(data);
      }
    });
  }

  function upUI(data){
    var languageApp = angular.module('langApp', []);

    languageApp.controller('langControl', function($scope){
      var page = {};
      page = data;
      page.item = data.items[0]
      $scope.page = page;
    });
    angular.bootstrap(document, ['langApp']);
  }

  function Idb(storename){
    var self = this;
    
    this.loadFromCache = function(keyname, keyversion, data, fn){
      // open data
      var dbOpen = $.indexedDB("ix", {
        "version": 1,
        "schema": {
          1: function(trans){
            var objectStore = trans.createObjectStore(storename, {
              "keyPath": storename
            });
            // objectStore.createIndex(storename);
          }
        }
      }).done(function(db, event){
        // get version
        $.indexedDB("ix").objectStore(storename).get(keyname).done(function(result, event){

          if(!result) {
            console.log('db empty');
            getData(function(d){
              
              $.indexedDB("ix").objectStore(storename).put(d.resource);
            });
          } else {
            var lastVersion = result.version;
            if(keyversion === lastVersion){
              console.log('same version and result:');
              $.indexedDB("ix").objectStore(storename).each(function(item){

                
                upUI(item.value);
                
                return item.value;
              })
              // TODO 版本相同，直接渲染数据
            } else {
              console.log('different version');
              // 版本不同，api获取新版本，然后渲染模版，写入缓存
              getData(function(d){
                // upUI(item.value);

                upUI(d.resource);
                $.indexedDB("ix").objectStore(storename).put(d.resource);
              });
            }
          }
        });
      });

      
    };

    this.deleteFromCache = function(){
      var deletePromise = $.indexedDB("ix").deleteDatabase();
    };
  
    
  };

  module.exports = Idb;
});