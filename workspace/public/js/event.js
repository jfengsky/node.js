$(function(){
  $('#J_test').bind('click',function(){
    $.ajax({
        url: 'cmd',
        type: 'post',
        data: {
          command: 'git'
        },
        success: function (_data) {
          console.log(_data);
          $('#output').html(_data);
        }
      });
  });
});