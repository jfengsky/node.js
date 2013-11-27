define(function( require, exports, module ){

  // var $ = require('jquery');
  function $(id){
    return document.getElementById(id);
  };

  function Lang(){
    $("J_btn").addEventListener('click', function(){
      alert(111);
    }, false);
  }
  module.exports = Lang;
});