var express = require('express');
var router = express.Router();

var backData = {
  "data": {
    "SQ": 0,
    "RQT": 1422603159298,
    "RPT": new Date().getTime(),
    "SR": [{
      "RID": 1,
      "SN": "产品详情",
      "S": 16.18,
      "R": "凯莱商务酒店 杭州宝衣商务酒店 杭州缘来商务酒店 杭州祥和北星大酒店 杭州北源快捷酒店"
    }, {
      "RID": 2,
      "SN": "产品详情",
      "S": 15.18,
      "R": "茅盾故居"
    }, {
      "RID": 3,
      "SN": "咨询问答",
      "S": 13.18,
      "R": "修真观戏台"
    }],
    "RQ": [{
      "SN": "产品详情",
      "S": 12.98,
      "Q": "费用包含",
      "K": "addinfodetail,100,322"
    }, {
      "SN": "产品详情2",
      "S": 11.98,
      "Q": "费用包含",
      "K": "addinfodetail,101,324"
    }, {
      "SN": "产品详情",
      "S": 9.98,
      "Q": "费用包含3",
      "K": "addinfodetail,102,324"
    }],
    "TK": ["第一天", "景点"]
  },
  "errno": 0,
  "errmsg": ""
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/search', function(req, res, next) {
  var getQuery = req.query,
      callBackName = getQuery.callback;
  backData.data.SQ = req.query.param.SQ;
  res.jsonp(backData);
  // res.send(callBackName + '(' + JSON.stringify(backData) +')');
});
module.exports = router;
