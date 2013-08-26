/**
 * @Description: get files information
 * @author: jiangfeng (jfengsky@gmail.com)
 * @Date: 2013-08-26 22:01
 */
$(function($){
  $.ajax({
    type: 'get',
    url: '/getfileinfo',
    data:{
      path: '/abc',
      t: new Date().getTime()
    },
    dataType: 'json',
    success: function(data){
      console.log(data);
    }
  });
});