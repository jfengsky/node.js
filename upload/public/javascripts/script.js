var imgIndex = 1;

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

      console.log(tempData);
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
  button_placeholder_id: 'J_swfbutton'
  // button_window_mode: "transparent",
}


SWFUPING = new SWFUpload(setting);