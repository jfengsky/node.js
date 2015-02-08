$(function(){
  var command = {
    "workSpace": "cd ~/www/git/Tour/Front/Front.PC.Online"
  };

  $('#controlTab').tab('show');

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