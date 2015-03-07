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
  file_queued_handler: function(file) {
    console.log('file_queued_handler');
    console.log(file);
  },
  file_dialog_complete_handler: function(_selectNumber, _queueNumber) {
    console.log('file_dialog_complete_handler');
    console.log(_selectNumber);
    console.log(_queueNumber);
    this.startUpload();
  },
  upload_start_handler: function(_file) {
    this.setPostParams({
      'TempID': 1
    });
    console.log('upload_start_handler');
  },
  upload_progress_handler: function(_file, _hasup, _total) {
    console.log('upload_progress_handler');
    console.log(_hasup);
    console.log(_total);
  },
  upload_success_handler: function(_file, _data) {
    console.log('upload_success_handler');
    console.log(_file);
    console.log(_data);
    render('#J_swfshowblock', $.parseJSON(_data))
  },
  upload_complete_handler: function(_file) {
    console.log(_file);
    this.startUpload();
  }
}


SWFUPING = new SWFUpload(setting);