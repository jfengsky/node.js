var express = require('express');
var router = express.Router();

var exec = require('child_process').exec;

var folderList = require('./folderlist');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/visa', function(req, res, next) {
  res.render('visa', { title: 'Express' });
});

router.get('/VisaAutoCompleteApi', function(req, res, next) {
  res.send({
    "Country": "美国",
    "Pages": [
        {
            "PageName": "第一页，个人信息页面",
            "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_personal.aspx?node=Personal1",
            "Values": [
                {
                    "ColumnName": "名字[拼音]",
                    "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_GIVEN_NAME",
                    "Value": "CHUI"
                },
                {
                    "ColumnName": "姓氏[拼音]",
                    "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_SURNAME",
                    "Value": "ZHANG"
                },
                {
                    "ColumnName": "全名[中文]",
                    "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_FULL_NAME_NATIVE",
                    "Value": "张锤"
                },
                {
                    "ColumnName": "全名不适用的",
                    "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxAPP_FULL_NAME_NATIVE_NA",
                    "Value": ""
                },
                {
                    "ColumnName": "是否拥有曾用名",
                    "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblOtherNames_0",
                    "Value": "True"
                },
                {
                    "ColumnName": "曾用名姓氏[拼音]",
                    "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListAlias_ctl00_tbxSURNAME",
                    "Value": "ZHANG"
                },
                {
                    "ColumnName": "曾用名名字[拼音]",
                    "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListAlias_ctl00_tbxGIVEN_NAME",
                    "Value": "SHUN"
                },
                {
                    "ColumnName": "性别",
                    "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblAPP_GENDER_0",
                    "Value": "True"
                },
                {
                    "ColumnName": "出生日期-日",
                    "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlDOBDay",
                    "Value": "1"
                },
                {
                    "ColumnName": "出生日期-月",
                    "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlDOBMonth",
                    "Value": "10"
                },
                {
                    "ColumnName": "出生日期-年",
                    "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxDOBYear",
                    "Value": "1983"
                },
                {
                    "ColumnName": "出生地-州省[英文]",
                    "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_POB_ST_PROVINCE",
                    "Value": ""
                },
                {
                    "ColumnName": "出生地-州省不适用的",
                    "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxAPP_POB_ST_PROVINCE_NA",
                    "Value": "True"
                },
                {
                    "ColumnName": "出生地-国家[英文]",
                    "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlAPP_POB_CNTRY",
                    "Value": "CHINA"
                },
                {
                    "ColumnName": "婚姻状况",
                    "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlAPP_MARITAL_STATUS",
                    "Value": "M"
                }
            ]
        }
    ]
});
});

router.post('/filelist', function(req, res, next) {
  folderList.init({
    params: req.body,
    callback: function( _data ){
      res.send(_data);
    }
  });
});

router.post('/cmd', function(req, res) {
  // res.send(req.body.command);
  // childProcess.exec('ls', function(error, stdout, stderr){
  //  console.log(stderr);
  //  // res.send( stderr )
  // });
  var child = exec(req.body.command);
  var sendData = '';
  child.stdout.on('data', function(data){
   sendData = data;
   res.send(sendData);
  });
  // res.send(sendData);

});

module.exports = router;
