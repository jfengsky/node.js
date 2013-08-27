/**
 * @Description: get files information
 * @author: jiangfeng (jfengsky@gmail.com)
 * @Date: 2013-08-26 22:01
 */
$(function($){

  /**
   * split data to json
   * @param data
   */
  function splitData(data){
    var tempObj = {},
        tempArr = [];
    for(var i = 0, dataLength = data.length; i < dataLength; i++){
      tempArr = data[i].split('|');
      for(var j = 0, tempArrLength = tempArr.length; j < tempArrLength; j++){

//        tempObj.name = tempArr[0];
//        tempObj.isdir = tempArr[1];
//        tempObj.size = tempArr[2];
//        tempObj.mtime = tempArr[3];
//        console.log(tempArr[j]);
      }
//      console.log(tempArr);
    }
//    console.log(fileArr);
  }

  $.ajax({
    type: 'get',
    url: '/getfileinfo',
    data:{
      path: './views',
      t: new Date().getTime()
    },
    dataType: 'json',
    success: function(data){
      splitData(data);
    }
  });
});
