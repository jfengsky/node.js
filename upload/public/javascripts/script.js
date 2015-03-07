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