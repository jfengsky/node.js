/**
 * @Description: get files information
 * @author: jiangfeng (jfengsky@gmail.com)
 * @Date: 2013-08-26 22:01
 */
$(function($){
  /**
   * get file's last name
   * @param file name
   * @returns String
   */
  function setLastName(el){
    var arr = el.split('.');
    return arr[arr.length - 1];
  };

  /**
   * set file size
   * @param num
   */
  function setFileSize(num){
    if(num < 1024){
      return num + 'B';
    } else if( num >= 1024 && num < 1024 * 1024 ){
      return Math.ceil(num / 1024) + 'KB';
    } else {
      return Math.floor(num / (1024 * 1024)) + 'MB';
    }
  };


  /**
   * set full time
   * @param sec
   */
  function setTime(sec){
    var time = new Date(sec);
    return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes();
  };

  function getData(path){
    $.ajax({
      type: 'get',
      url: '/getfileinfo',
      data:{
        path: path,
        t: new Date().getTime()
      },
      dataType: 'json',
      success: function(data){
        splitData(data);
      }
    });
  };

  /**
   * split data to json
   * @param data
   */
  function splitData(data){
    var tempArr = [],
        folderlist = '',
        filelist = '';
    for(var i = 0, dataLength = data.length; i < dataLength; i++){
      tempArr = data[i].split('|');
      if(tempArr[2] === 'true'){
        console.log(tempArr[1]);
        folderlist += '<li><div class="folde"><span class="bord"></span><em>文件夹</em><a href="'+ tempArr[1] +'" class="J_folderlink" data-href="' + tempArr[1] + '">'+ tempArr[0] +'</a></div></li>';
      } else {
        filelist +='<li><div class="filebox"><span class="bord"></span><em>'+ setLastName(tempArr[0]) +'</em><a href="javascript:void(0)" data-href="">' + tempArr[0] + '</a><span class="size"> '+ setFileSize(tempArr[3]) +'</span><span class="time">'+ setTime(tempArr[4] - 0) +'</span></div></li>';
      }
    }
    $('#J_folder').html(folderlist);
    $('#J_files').html(filelist);
  };

//    $('#J_folder').delegate('.J_folderlink', 'click', function(){
//      var path = $(this).attr('data-href');
//      getData(path);
//    });

  getData('./views');
});
