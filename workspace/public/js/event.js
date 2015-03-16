var data = [{
  label: 'node1',
  children: [{
    label: 'child1'
  }, {
    label: 'child2'
  }]
}, {
  label: 'node2',
  children: [{
    label: 'child3'
  }]
}];

$(function() {
  var command = {
    ignore: '.git|.gitignore|.idea',
    srcDir: '/Volumes/SSD/Users/jiangfeng/www/git/Tour/Front/Front.PC.Online',
    // workSpace: "cd '/Volumes/SSD/Users/jiangfeng/www/git/Tour/Front/Front.PC.Online'"
  };

  $('#tree1').tree({
    data: data,
    closedIcon: '+'
  });

  var Vacation = {

    /**
     * 发送数据
     * @param  {Object} _options  参数
     * @return
     */
    _sendData: function(_options) {
      $.ajax({
        url: _options.url,
        type: _options.type || 'post',
        data: _options.params,
        success: function(_data) {
          if (_data && _options.callback) {
            _options.callback(_data);
          }
        }
      });
    },

    /**
     * 获取工作目录下的文件夹及文件
     *
     */
    _getFileList: function() {
      var self = this;
      self._sendData({
        url: '/filelist',
        params: {
          dir: command.srcDir,
          ignore: command.ignore
        },
        callback: function(_data) {
          console.log(_data['ignore']);
        }
      });
    },

    init: function() {
      var self = this;

      // 获取工作目录下的文件夹及文件
      self._getFileList();
    }
  };


  Vacation.init();
});