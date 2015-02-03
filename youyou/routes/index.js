var express = require('express');
var router = express.Router();

// var backData = {
//   "data": {
//     "SQ": 0,
//     "RQT": 1422603159298,
//     "RPT": new Date().getTime(),
//     "SR": [{
//       "RID": 1,
//       "SN": "产品详情",
//       "S": 16.18,
//       "R": "凯莱商务酒店 杭州宝衣商务酒店 杭州缘来商务酒店 杭州祥和北星大酒店 杭州北源快捷酒店"
//     }, {
//       "RID": 2,
//       "SN": "产品详情",
//       "S": 15.18,
//       "R": "茅盾故居"
//     }, {
//       "RID": 3,
//       "SN": "咨询问答",
//       "S": 13.18,
//       "R": "修真观戏台"
//     }],
//     "RQ": [{
//       "SN": "产品详情",
//       "S": 12.98,
//       "Q": "费用包含",
//       "K": "addinfodetail,100,322"
//     }, {
//       "SN": "产品详情2",
//       "S": 11.98,
//       "Q": "费用包含",
//       "K": "addinfodetail,101,324"
//     }, {
//       "SN": "产品详情",
//       "S": 9.98,
//       "Q": "费用包含3",
//       "K": "addinfodetail,102,324"
//     }],
//     "TK": ["第一天", "景点", "杭州"]
//   },
//   "errno": 0,
//   "errmsg": ""
// };

var backData = {"data":{"SQ":1,"RQT":"1422959098","RPT":"1422959107","SR":[{"RID":81,"SN":"","S":13.71,"R":"第1天 景点</br> <a href=\"http://you.fat16.qa.nt.ctripcorp.com/sight/suzhou11/17319.html\" target=\"_blank\">林屋洞</a></br> 特别赠送苏州太湖精美午餐，参考菜单：&lt;br&gt;盐 水 白 虾&lt;br&gt;银 鱼 炒 蛋（或银鱼炖蛋）&lt;br&gt;清 蒸 白 鱼&lt;br&gt; 芹 菜 香 干 &lt;br&gt;肉 末 粉 丝&lt;br&gt;鱼 香 肉 丝&lt;br&gt;农 家 老 豆 腐&lt;br&gt;时 蔬 一 道&lt;br&gt;白 菜 肉 丝&lt;br&gt;太 湖 莼 菜 肉 丝 汤&lt;br&gt;视实际人数安排用餐桌数，每桌10-12人不等（由于部分菜品需当天购买，本菜单仅供参考，实际菜品会略有调整）。&lt;br&gt;儿童需付20元/人。 </br>上海-苏州"}],"RQ":null,"TK":["景点"]},"errno":0,"errmsg":""};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.get('/search', function(req, res, next) {
  var getQuery = req.query,
    callBackName = getQuery.callback,
    tempParam = JSON.parse(req.query.param);
  backData.data.SQ = tempParam.SQ;
  res.jsonp(backData);
  // res.send(callBackName + '(' + JSON.stringify(backData) +')');
});
module.exports = router;