/**
 * 主导航交互
 * @author: terry(terry.jiang@bertelsmann.com.cn)
 * @Date: 2013-11-25 15:45
 */

define(function(require) {

  function Nav(id){
    var _this = this;
    /**
     * 清除高亮, 隐藏所有浮层
     * @return
     */
    this._clear = function(){
      $(id + ' li').removeClass('cur').attr('data-tag', '0');
      $(id + ' .menu_info').hide();
      $(id + ' dl').hide();
    };

    /**
     * 初始化
     * @return
     */
    this.init = function(){
      $(id + ' li').click(function(){
        var index = $(this).index();
        if( $(this).attr('data-tag') === '1'){
          _this._clear();
        } else {
          _this._clear();
          $(this).addClass('cur');
          $(id + ' .menu_info').show();
          $($(id + ' dl')[index]).show();
          $(this).attr('data-tag','1');
        }
        
      });
    }
  }

  new Nav('#J_menu').init();
});