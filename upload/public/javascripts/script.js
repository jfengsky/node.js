// 参考 http://www.cnblogs.com/kenshincui/archive/2011/11/30/2269782.html

var imgIndex = 1;

function render(_id, _data){
  var tpl = '';
  $.map(_data.data, function(_item){
    tpl += '<span class="img"><img src="' + _item.ImageUrl + '" /></span>'
  })
  $(_id).append(tpl);
}

$('#J_updata').bind('change', function(ev) {
  var formData = new window.FormData(),
    filelist = ev.target.files;
  $.map(filelist, function(_item) {
    formData.append("Filedata", _item);
    formData.append("TempID", imgIndex);
    imgIndex++;
  });

  $.ajax({
    url: '/uploadImage',
    type: 'post',
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function(_data) {
      render('#J_h5showblock', _data);
    },
    error: function() {
      console.log(tempData);
    }
  });
});



SWFUpload.prototype.setPostParams = function(paramsObject) {
  this.settings.post_params = paramsObject;
  this.callFlash("SetPostParams", [paramsObject]);
};

var setting = {
  flash_url: '/javascripts/swfupload/swfupload.swf',
  // flash9_url: this.flash_url9,
  upload_url: '/uploadImage',
  file_size_limit: '5 MB',
  file_upload_limit: 10,
  file_types: "*.jpg;*.gif;*.png;*.jpeg;*.doc",
  file_types_description: "All Files",
  file_queue_limit: 10,
  debug: true,
  button_width: 200,
  button_height: 40,
  button_placeholder_id: 'J_swfbutton',
  button_window_mode: "transparent",
  swfupload_loaded_handler: function(){
    // 该事件函数是内部事件，因此不能被重写。当SWFupload实例化，加载的FLASH完成所有初始化操作时触发此事件。
    console.log('swfupload_loaded_handler')
  },
  file_dialog_start_handler: function(){
    // 此事件在selectFile或者selectFiles调用后，文件选择对话框显示之前触发。只能同时存在一个文件对话框。

    console.log('file_dialog_start_handler')
  },
  file_queued_handler: function(file) {
    // 当文件选择对话框关闭消失时，如果选择的文件成功加入上传队列，那么针对每个成功加入的文件都会触发一次该事件（N个文件成功加入队列，就触发N次此事件）
    
    console.log('file_queued_handler');
    console.log(file);
  },
  file_queue_error_handler: function(_file, _error, _msg){
    // 当选择文件对话框关闭消失时，如果选择的文件加入到上传队列中失败，那么针对每个出错的文件都会触发一次该事件(此事件和fileQueued事件是二选一触发，文件添加到队列只有两种可能，成功和失败)。
    // 文件添加队列出错的原因可能有：超过了上传大小限制，文件为零字节，超过文件队列数量限制，设置之外的无效文件类型。
    // 如果选择入队的文件数量超出了设置中的数量限制，那么所有文件都不入队，此事件只触发一次。如果没有超出数目限制，那么会对每个文件进行文件类型和大小的检测，对于不通过的文件触发此事件，通过的文件成功入队。
    console.log('file_queue_error_handler')
  },
  file_dialog_complete_handler: function(_selectNumber, _queueNumber) {
    // 当选择文件对话框关闭，并且所有选择文件已经处理完成（加入上传队列成功或者失败）时，此事件被触发，number of files selected是选择的文件数目，number of files queued是此次选择的文件中成功加入队列的文件数目。
    // 如果你希望文件在选择以后自动上传，那么在这个事件中调用this.startUpload() 是一个不错的选择。如果需要更严格的判断，在调用上传之前，可以对入队文件的个数做一个判断，如果大于0，那么可以开始上传。
    console.log('file_dialog_complete_handler');
    console.log(_selectNumber);
    console.log(_queueNumber);
    // if( _queueNumber > 0 ){
    //   this.startUpload();
    // }
    this.startUpload();
  },
  upload_start_handler: function(_file) {
    // 在文件往服务端上传之前触发此事件，可以在这里完成上传前的最后验证以及其他你需要的操作，例如添加、修改、删除post数据等。
    // 在完成最后的操作以后，如果函数返回false，那么这个上传不会被启动，并且触发uploadError事件（code为ERROR_CODE_FILE_VALIDATION_FAILED），如果返回true或者无返回，那么将正式启动上传。
    this.setPostParams({
      'TempID': 1
    });
    console.log('upload_start_handler');
  },
  upload_progress_handler: function(_file, _hasup, _total) {
    // 该事件由flash定时触发，提供三个参数分别访问上传文件对象、已上传的字节数，总共的字节数。因此可以在这个事件中来定时更新页面中的UI元素，以达到及时显示上传进度的效果。
    // 注意: 在Linux下，Flash Player只在所有文件上传完毕以后才触发一次该事件，官方指出这是Linux Flash Player的一个bug，目前SWFpload库无法解决（我没有测试过）。
    // 此时文件上传的周期还没有结束，不能在这里开始下一个文件的上传。
    console.log('upload_progress_handler');
    console.log(_hasup);
    console.log(_total);

    var percent = Math.ceil( (_hasup/ _file.size) * 100 );
    console.log(percent + '%');

  },
  upload_success_handler: function(_file, _data) {
    // 当文件上传的处理已经完成（这里的完成只是指向目标处理程序发送了Files信息，只管发，不管是否成功接收），并且服务端返回了200的HTTP状态时，触发此事件。
    // 在window平台下，那么服务端的处理程序在处理完文件存储以后，必须返回一个非空值，否则此事件不会被触发，随后的uploadComplete事件也无法执行。
    console.log('upload_success_handler');
    console.log(_file);
    console.log(_data);
    render('#J_swfshowblock', $.parseJSON(_data))
  },
  upload_complete_handler: function(_file) {
    console.log('upload_complete_handler');
    // 当上传队列中的一个文件完成了一个上传周期，无论是成功(uoloadSuccess触发)还是失败(uploadError触发)，此事件都会被触发，这也标志着一个文件的上传完成，可以进行下一个文件的上传了。
    // 如果要进行多文件自动上传，那么在这个时候调用this.startUpload()来启动下一个文件的上传是不错的选择。
    // 当在进行多文件上传的时候，中途用cancelUpload取消了正在上传的文件，或者用stopUpload停止了正在上传的文件，那么在uploadComplete中就要很小心的使用this. startUpload()，因为在上述情况下，uploadError和uploadComplete会顺序执行，因此虽然停止了当前文件的上传，但会立即进行下一个文件的上传，你可能会觉得这很奇怪，但事实上程序并没有错。如果你希望终止整个队列的自动上传，那么你需要做额外的程序处理了。
    console.log(_file);
    console.log(this.getStats());
    this.startUpload();
  }
}


SWFUPING = new SWFUpload(setting);