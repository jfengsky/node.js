/**
 * swf 上传
 * Created by jiangfeng on 14-6-1.
 */

define(function(require, exports, module) {
  "use strict";
  var $ = require('jquery');
  SWFUpload.prototype.setPostParams = function(paramsObject) {
    this.settings.post_params = paramsObject;
    this.callFlash("SetPostParams", [paramsObject]);
  };
  /**
   * swf上传组件
   */
  function SwfUpload() {
    var self = this,
        SWFUPING;
    // flash组件地址
    this.flash_url = GV.app.detail.swfurl;
    this.flash_url9 = GV.app.detail.swfurl9;

    // 上传接口
    this.upload_url = GV.app.detail.api.MaterialOperateUrl;

    // 大小限制
    this.file_size_limit = "5 MB";
    this.file_upload_limit = 5;
    
    // 上传文件类型限制
    this.file_types = "*.jpg;*.gif;*.png;*.jpeg;*.doc";
    this.file_types_description = "All Files";

    // 允许排队的文件总数
    this.file_queue_limit = 1;

    this.debug = false;
    this.button_width = 200;
    this.button_height = 130;

    // this.swfUploadPreLoad = function(){
    //   var self = this;
    //   var loading = function () {

    //     var longLoad = function () {
    //     };
    //     this.customSettings.loadingTimeout = setTimeout(function () {
    //         longLoad.call(self);
    //         alert(32323);
    //       },
    //       15 * 1000
    //     );
    //   };
      
    //   this.customSettings.loadingTimeout = setTimeout(function () {
    //       loading.call(self);
    //     },
    //     1*1000
    //   );
    // }

    // this.swfupLoadHandler = function() {
    //   alert('ready');
    //   clearTimeout(this.customSettings.loadingTimeout);
    // };

    this.fileDialogComplete = function() {
      this.startUpload();
    };

    this.uploadComplete = function(file) {
      // console.log('complete');
    };
    
    // this.swfUploadLoaded = function() {
    //   clearTimeout(this.customSettings.loadingTimeout);
    // };
    this._setting = function(_args) {
      return {
        flash_url: this.flash_url,
        flash9_url: this.flash_url9,
        upload_url: this.upload_url,
        file_size_limit: this.file_size_limit,
        file_upload_limit: _args.maxsize,
        file_types: _args.type,
        file_types_description: this.file_types_description,
        file_queue_limit: this.file_queue_limit,
        debug: this.debug,
        button_width: this.button_width,
        button_height: this.button_height,
        button_placeholder_id: _args.id,
        // button_text: '<span class="theFont">Hello</span>',
        // button_text_style: ".theFont { font-size: 16; }",
        button_window_mode: "transparent",

        // swfupload_pre_load_handler : this.swfUploadPreLoad,
        // swfupload_load_failed_handler : function(){
        //   alert('load false')
        // },
        // swfupload_loaded_handler: this.swfupLoadHandler,
        // file_queued_handler: function(_file){
        //   console.log('correct');
        //   console.log(_file);
        // },
        // file_queue_error_handler: function(_file, _error, _msg){
        //   console.log('error');
        //   console.log(_file);
        // },
        // file_dialog_complete_handler: function(_a, _b){
        //   console.log('close');
        //   console.log(_a);
        // },
        upload_start_handler: function(_file){
          var self = this,
          upParam = {},
          upLoad = '<li id="J_uping" style="text-align: center"><img src="http://pic.c-ctrip.com/myctripv2/loading_animation_20.gif" style="width:24px;height:24px;margin:40px 0 0 0" /><br />上传中...</li>';
          upParam = $.parseJSON($('#J_visjmp').attr('data-tag'));
          upParam.type = _file.type.split('.')[1];
          upParam.filefullname = escape(_file.name);
          var qbo = '';
          if (GV.app.detail.data.qb_o) {
              qbo = GV.app.detail.data.qb_o;
          };
          upParam.qb_o = qbo;
          if ( !/(jpg|jpeg|png|gif)/ig.test(_file.type) ){
            upParam.isimg = false;
            // upParam.imgwidth = '';
            // upParam.imgheight = '';
          } else {
            upParam.isimg = _args.isimg;
            // upParam.imgwidth = _args.imgwidth;
            // upParam.imgheight = _args.imgheight;
          };
          this.setPostParams(upParam);
          $('#J_visa_idcard').prepend(upLoad);
        },
        // file_queued_handler: function(_file){
        //   console.log('file queued handle');
        // },
        file_dialog_complete_handler: this.fileDialogComplete,
        upload_success_handler: function(file,serverData,response){
          if(_args.callback){
            _args.callback(serverData);
          };
          // var upParam = {};
          // this.setPostParams(upParam);
        },
        upload_complete_handler: this.uploadComplete
        // swfupload_pre_load_handler : this.swfUploadPreLoad
      }
    };

    this.init = function(_id, _args) {
      var self = this,
          tempType = [];
      _args.id = (_id.split('#'))[1];

      $.each(_args.types, function(_i, _key){
        tempType.push('*.' + _key);
      });
      _args.type = tempType.join(';');
      _args.data = _args.data;

      SWFUPING = new SWFUpload( self._setting(_args) );
      return SWFUPING;
    }
  }

  module.exports = SwfUpload;
});