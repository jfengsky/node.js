/**
 * html5 上传
 * Created by jiangfeng on 14-6-1.
 */

define(function (require, exports, module) {
  "use strict";
  var $ = require('jquery');
  var qbo = '';
  if (GV.app.detail.data.qb_o) {
      qbo = GV.app.detail.data.qb_o;
  };

  function HtmlUpload() {

  };

  HtmlUpload.prototype = {
    /**
     * 检测文件大小
     * @param {Object}  _files        文件信息数组
     * @param {Number}  _maxsize      上传文件大小限制
     * @return {Object} maxsize = 1   超过大小, 0 未超过大小
     *                  upType = 0    格式正确, 1 格式不正确
     */
    _checkSizeType: function(_files, _maxsize, _fileType){
      var boolSize = true,
          boolType = false,
          boolImg = false,
          fileType;
      $.each(_files, function(index, item){
        var fileTypeArr = item.name.split('.'),
            tempfileType = fileTypeArr[fileTypeArr.length - 1];
        fileType = item.type.split('/')[1];
        // 检查文件大小
        if(item.size / 1048576 > _maxsize){
          item.maxsize = 1;
          boolSize = false;
        };

        // 检查文件类型
        $.each(_fileType, function(idx, key){
          if( tempfileType.indexOf(key.toLowerCase()) > -1 && item.type ){
            boolType = true;
          }
        });

        // 检查是否图片
        if( /image/ig.test(item.type) ){
          boolImg = true;
        }
      });
      return {
        // result: boolSize && boolType,
        isimg: boolImg,
        type: fileType,
        resultSize: boolSize,
        resultType: boolType
      }
    },

    

    /**
     * 初始化上传按钮
     * @param {String} _id  按钮id
     * @param {Object} _args 配置参数
     *    @param  {Number}  maxsize     最大大小(MB)
     *    @param  {Array}   types       可上传文件类型['jpg','jpeg','png','gif']
     *    @param  {String}  data        附加参数
     *    @param
     */
    init: function(_id, _args){
      var self = this,
          upLoad = '<li id="J_uping" style="text-align: center"><img src="http://pic.c-ctrip.com/myctripv2/loading_animation_20.gif" style="width:24px;height:24px;margin:40px 0 0 0" /><br />上传中...</li>';
      $('#J_upbutton').remove();
      $('.visa_newadd a').append('<input type="file" class="J_upbuttonh5" id="J_upbutton" >');


      $(_id).change(function(ev){
        var filelist = ev.target.files,
        upfiles = self._checkSizeType(filelist, _args.maxsize, _args.types),
        filefullname = '';
        _args.data = $('#J_visjmp').attr('data-tag');
        if( upfiles.resultSize && upfiles.resultType ){

          // ajax 上传
          var formData = new window.FormData();
          for(var i = 0; i < filelist.length; i++){
            filefullname = escape(filelist[i].name);
            // filelist[i].name = escape(filelist[i].name);
            formData.append("Filedata", filelist[i]);
          };

          if(upfiles.isimg){
            formData.append('isimg', true);
            // formData.append('imgwidth', _args.imgwidth);
            // formData.append('imgheight', _args.imgheight);
            formData.append('type', upfiles.type);
          } else {
            formData.append('isimg', false);
            // formData.append('imgwidth', '');
            // formData.append('imgheight', '');
          };

          // 添加附加参数
          var upParam = $.parseJSON(_args.data);
          // formData.append("form-data", upParam);

          for(var key in upParam){
            formData.append(key, upParam[key]);
          };
          // 另外添加文件名
          formData.append('filefullname', filefullname);
          formData.append('qb_o', qbo);
          $('#J_visa_idcard').prepend(upLoad);
          $.ajax({
            url: GV.app.detail.api.MaterialOperateUrl,
            type: 'POST',
            data: formData,
            cache: false,
            contentType:false,
            processData:false,
            // dataType: 'json',
            success: function (_data) {
              if(_args.callback){
                _args.callback(_data);
              }
              // if(_data.errno === 0){
              //   if(_args.callback){
              //     _args.callback(_data);
              //   }
              // } else {
              //   alert(_data.errmsg)
              // }
            },
            error: function(){
              // 上传失败，请检查网络
            }
          });
        } else if ( !upfiles.resultType) {
          alert('文件格式不正确！')
        } else if ( !upfiles.resultSize ){
          alert('文件大小超过5M！');
        }
      });
    }
  };

  module.exports = HtmlUpload;
});
