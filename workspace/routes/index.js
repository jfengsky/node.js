var express = require('express');
var router = express.Router();

var exec = require('child_process').exec;

var folderList = require('./folderlist');


function getQuery(_href, _name) {
    var sReg = "(?:\\?|&){1}" + _name + "=([^&]*)"
    var re = new RegExp(sReg, "gi");
    re.exec(_href);
    return RegExp.$1;
};

var Personal1Data = {
    "Country": "美国",
    "Pages": [{
        "PageName": "第一页，个人信息页面",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_personal.aspx?node=Personal1",
        "Values": [{
            "ColumnName": "名字[拼音]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_GIVEN_NAME",
            "Value": "CHUI"
        }, {
            "ColumnName": "姓氏[拼音]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_SURNAME",
            "Value": "ZHANG"
        }, {
            "ColumnName": "全名[中文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_FULL_NAME_NATIVE",
            "Value": "张锤"
        }, {
            "ColumnName": "全名不适用的",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxAPP_FULL_NAME_NATIVE_NA",
            "Value": ""
        }, {
            "ColumnName": "是否拥有曾用名",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblOtherNames_0",
            "Value": "True"
        }, {
            "ColumnName": "曾用名姓氏[拼音]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListAlias_ctl00_tbxSURNAME",
            "Value": "ZHANG"
        }, {
            "ColumnName": "曾用名名字[拼音]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListAlias_ctl00_tbxGIVEN_NAME",
            "Value": "SHUN"
        }, {
            "ColumnName": "是否拥有电码名",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblTelecodeQuestion_1",
            "Value": "False"
        }, {
            "ColumnName": "电码名来源",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_TelecodeSURNAME",
            "Value": "telcode sum"
        }, {
            "ColumnName": "电码名",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_TelecodeGIVEN_NAME",
            "Value": "telcode name"
        }, {
            "ColumnName": "性别",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblAPP_GENDER_0",
            "Value": "True"
        }, {
            "ColumnName": "出生日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlDOBDay",
            "Value": "1"
        }, {
            "ColumnName": "出生日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlDOBMonth",
            "Value": "10"
        }, {
            "ColumnName": "出生日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxDOBYear",
            "Value": "1983"
        }, {
            "ColumnName": "出生地-城市",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_POB_CITY",
            "Value": "wuhan"
        }, {
            "ColumnName": "出生地-州省[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_POB_ST_PROVINCE",
            "Value": ""
        }, {
            "ColumnName": "出生地-州省不适用的",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxAPP_POB_ST_PROVINCE_NA",
            "Value": "True"
        }, {
            "ColumnName": "出生地-国家[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlAPP_POB_CNTRY",
            "Value": "CHINA"
        }, {
            "ColumnName": "婚姻状况",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlAPP_MARITAL_STATUS",
            "Value": "M"
        }]
    }]
};

var Personal2Data = {
    "Country": "美国",
    "Pages": [{
        "PageName": "个人信息-部分二",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_personalcont.aspx?node=Personal2",
        "Values": [{
            "ColumnName": "所属国籍[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlAPP_NATL",
            "Value": "China"
        }, {
            "ColumnName": "是否拥有其他国籍",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblAPP_OTH_NATL_IND_0",
            "Value": "True"
        }, {
            "ColumnName": "其他国籍[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlOTHER_NATL_ctl00_ddlOTHER_NATL",
            "Value": "USA"
        }, {
            "ColumnName": "是否拥有其他国籍护照",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlOTHER_NATL_ctl00_rblOTHER_PPT_IND_0",
            "Value": "True"
        }, {
            "ColumnName": "其他国籍护照号码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlOTHER_NATL_ctl00_tbxOTHER_PPT_NUM",
            "Value": "1234567878990677656"
        }, {
            "ColumnName": "身份证号码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_NATIONAL_ID",
            "Value": "340311198310300233"
        }, {
            "ColumnName": "是否身份证不适用",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxAPP_NATIONAL_ID_NA",
            "Value": "True"
        }, {
            "ColumnName": "美国社会安全号部分1",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_SSN1",
            "Value": "111"
        }, {
            "ColumnName": "美国社会安全号部分2",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_SSN2",
            "Value": "222"
        }, {
            "ColumnName": "美国社会安全号部分3",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_SSN3",
            "Value": "333"
        }, {
            "ColumnName": "是否美国社会安全号不适用",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxAPP_SSN_NA",
            "Value": "False"
        }, {
            "ColumnName": "美国纳税人身份号码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_TAX_ID",
            "Value": "999999999999999999"
        }, {
            "ColumnName": "是否美国纳税人身份号码不适用",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxAPP_TAX_ID_NA",
            "Value": "False"
        }]
    }]
};

var addressphone3 = {
    "Country": "美国",
    "Pages": [{
        "PageName": "第三页地址和电话",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_contact.aspx?node=AddressPhone",
        "Values": [{
            "ColumnName": "家庭地址街道地址(第一行)[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_ADDR_LN1",
            "Value": "mignhangqushenbinglu1051non"
        }, {
            "ColumnName": "家庭地址街道地址(第二行)[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_ADDR_LN2",
            "Value": ""
        }, {
            "ColumnName": "家庭地址城市[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_ADDR_CITY",
            "Value": "ShangHai"
        }, {
            "ColumnName": "家庭地址州/省份[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_ADDR_STATE",
            "Value": ""
        }, {
            "ColumnName": "家庭地址州/省份（不适用）",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxAPP_ADDR_STATE_NA",
            "Value": "True"
        }, {
            "ColumnName": "家庭地址邮政区域/邮政编码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_ADDR_POSTAL_CD",
            "Value": "200000"
        }, {
            "ColumnName": "家庭地址邮政区域/邮政编码（不适用）",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxAPP_ADDR_POSTAL_CD_NA",
            "Value": "False"
        }, {
            "ColumnName": "家庭地址国家/地区[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlCountry",
            "Value": "China"
        }, {
            "ColumnName": "邮寄地址是否同于您的家庭地址",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblMailingAddrSame_1",
            "Value": "False"
        }, {
            "ColumnName": "邮寄地址街道地址（第一行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxMAILING_ADDR_LN1",
            "Value": "huaishangquguoyuanshequ"
        }, {
            "ColumnName": "邮寄地址街道地址（第二行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxMAILING_ADDR_LN2",
            "Value": ""
        }, {
            "ColumnName": "邮寄地址城市[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxMAILING_ADDR_CITY",
            "Value": "zhengzhou"
        }, {
            "ColumnName": "邮寄地址州/省份[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxMAILING_ADDR_STATE",
            "Value": "henan"
        }, {
            "ColumnName": "邮寄地址州/省份(不适用)",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxMAILING_ADDR_STATE_NA",
            "Value": "False"
        }, {
            "ColumnName": "邮寄地址邮政区域/邮政编码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxMAILING_ADDR_POSTAL_CD",
            "Value": "201010"
        }, {
            "ColumnName": "邮政区域/邮政编码(不适用)",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxMAILING_ADDR_POSTAL_CD_NA",
            "Value": "False"
        }, {
            "ColumnName": "邮寄地址国家/地区[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlMailCountry",
            "Value": "China"
        }, {
            "ColumnName": "主要电话号码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_HOME_TEL",
            "Value": "08602154845877"
        }, {
            "ColumnName": "备用电话号码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_MOBILE_TEL",
            "Value": "086181548455"
        }, {
            "ColumnName": "备用电话号码(不适用)",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxAPP_MOBILE_TEL_NA",
            "Value": "False"
        }, {
            "ColumnName": "工作电话号码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_BUS_TEL",
            "Value": "086021212121"
        }, {
            "ColumnName": "工作电话号码(不适用)",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxAPP_BUS_TEL_NA",
            "Value": "False"
        }, {
            "ColumnName": "电子邮件地址",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_EMAIL_ADDR",
            "Value": "zhang.chui@qq.com"
        }, {
            "ColumnName": "电子邮件地址(不适用)",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxAPP_EMAIL_ADDR_NA",
            "Value": "False"
        }]
    }]
};
var PptVisa4 = {
    "Country": "美国",
    "Pages": [{
        "PageName": "第四页，护照信息页面",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/Passport_Visa_Info.aspx?node=PptVisa",
        "Values": [{
            "ColumnName": "护照类型",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_TYPE",
            "Value": "O"
        }, {
            "ColumnName": "护照号码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_NUM",
            "Value": "323232323"
        }, {
            "ColumnName": "护照本号码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_BOOK_NUM",
            "Value": "45454545"
        }, {
            "ColumnName": "护照本号码不适用的",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxPPT_BOOK_NUM_NA",
            "Value": "True"
        }, {
            "ColumnName": "发放护照的国家",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_ISSUED_CNTRY",
            "Value": "ASMO"
        }, {
            "ColumnName": "发放护照的城市",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_ISSUED_IN_CITY",
            "Value": "ShangHai"
        }, {
            "ColumnName": "发放护照的省/州",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_ISSUED_IN_STATE",
            "Value": "ZheJiang"
        }, {
            "ColumnName": "发放护照的地带",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_lblPPT_ISSUED_IN_CNTRY",
            "Value": "ASMO"
        }, {
            "ColumnName": "发放日期[日]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_ISSUED_DTEDay",
            "Value": "3"
        }, {
            "ColumnName": "发放日期[月]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_ISSUED_DTEMonth",
            "Value": "6"
        }, {
            "ColumnName": "发放日期[年]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_ISSUEDYear",
            "Value": "2004"
        }, {
            "ColumnName": "过期日期[日]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_EXPIRE_DTEDay",
            "Value": "4"
        }, {
            "ColumnName": "过期日期[月]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_EXPIRE_DTEMonth",
            "Value": "9"
        }, {
            "ColumnName": "过期日期[年]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_EXPIREYear",
            "Value": "2040"
        }, {
            "ColumnName": "过期不适用的",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxPPT_EXPIRE_NA",
            "Value": "False"
        }, {
            "ColumnName": "是否遗失过护照",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblLOST_PPT_IND_0",
            "Value": "True"
        }, {
            "ColumnName": "遗失护照号",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlLostPPT_ctl00_tbxLOST_PPT_NUM",
            "Value": "333333"
        }, {
            "ColumnName": "遗失护照号不适用的",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlLostPPT_ctl00_cbxLOST_PPT_NUM_UNKN_IND",
            "Value": "False"
        }, {
            "ColumnName": "遗失护照发放国家",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlLostPPT_ctl00_ddlLOST_PPT_NATL",
            "Value": "ASMO"
        }, {
            "ColumnName": "遗失护照说明",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlLostPPT_ctl00_tbxLOST_PPT_EXPL",
            "Value": "explain explain explain"
        }]
    }]
};

var Travel5 = {
    "Country": "美国",
    "Pages": [{
        "PageName": "第五页，旅行信息",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_travel.aspx?node=Travel",
        "Values": [{
            "ColumnName": "去美国的目的",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dlPrincipalAppTravel_ctl00_ddlPurposeOfTrip",
            "Value": "TD/TN"
        }, {
            "ColumnName": "具体说明",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_NUM",
            "Value": "323232323"
        }, {
            "ColumnName": "是否制定了具体的旅行计划",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblSpecificTravel_0",
            "Value": "True"
        }, {
            "ColumnName": "到达美国日期[日]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlARRIVAL_US_DTEDay",
            "Value": "3"
        }, {
            "ColumnName": "到达美国日期[月]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlARRIVAL_US_DTEMonth",
            "Value": "5"
        }, {
            "ColumnName": "到达美国日期[年]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxARRIVAL_US_DTEYear",
            "Value": "2015"
        }, {
            "ColumnName": "到达航班",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxArriveFlight",
            "Value": "TFT101"
        }, {
            "ColumnName": "抵达城市",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxArriveCity",
            "Value": "Washton"
        }, {
            "ColumnName": "离开美国日期[日]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlDEPARTURE_US_DTEDay",
            "Value": "23"
        }, {
            "ColumnName": "离开美国日期[月]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlDEPARTURE_US_DTEMonth",
            "Value": "3"
        }, {
            "ColumnName": "离开美国日期[年]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxDEPARTURE_US_DTEYear",
            "Value": "2016"
        }, {
            "ColumnName": "离开航班",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxDepartFlight",
            "Value": "WD201"
        }, {
            "ColumnName": "离美城市",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxDepartCity",
            "Value": "Lost"
        }, {
            "ColumnName": "计划在美国访问的城市",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlTravelLoc_ctl00_tbxSPECTRAVEL_LOCATION",
            "Value": "BDSDS"
        }, {
            "ColumnName": "住在美国的街道1",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxStreetAddress1",
            "Value": "FuChuan road 99"
        }, {
            "ColumnName": "住在美国的街道2",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxStreetAddress2",
            "Value": "ChangNing"
        }, {
            "ColumnName": "住在美国的城市",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxCity",
            "Value": "aasbcd"
        }, {
            "ColumnName": "住在美国的州",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlTravelState",
            "Value": "AR"
        }, {
            "ColumnName": "州的编码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbZIPCode",
            "Value": "200231"
        }, {
            "ColumnName": "付费",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlWhoIsPaying",
            "Value": "H"
        }]
    }]
};
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/visa', function(req, res, next) {
    res.render('visa', {
        title: 'Express'
    });
});

router.get('/VisaAutoCompleteApi', function(req, res, next) {
    var pageName = getQuery(req.query.pageurl, 'node');
    var sendData = null;
    switch (pageName) {

        // 第一页
        case 'Personal1':
            sendData = Personal1Data;
            break;

            // 第二页
        case 'Personal2':
            sendData = Personal2Data;
            break;
        case 'AddressPhone':
            sendData = addressphone3;
            break;
        case 'PptVisa':
            sendData = PptVisa4;
            break;
        case 'Travel':
            sendData = Travel5;
            break;
    };
    res.send(sendData);
});

router.post('/filelist', function(req, res, next) {
    folderList.init({
        params: req.body,
        callback: function(_data) {
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
    child.stdout.on('data', function(data) {
        sendData = data;
        res.send(sendData);
    });
    // res.send(sendData);

});

module.exports = router;