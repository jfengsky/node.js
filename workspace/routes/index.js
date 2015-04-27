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
      "Value": "wudi"
    }, {
      "ColumnName": "姓氏[拼音]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_SURNAME",
      "Value": "dugu"
    }, {
      "ColumnName": "全名[中文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_FULL_NAME_NATIVE",
      "Value": "独孤1无敌是2"
    }, {
      "ColumnName": "全名不适用的",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxAPP_FULL_NAME_NATIVE_NA",
      "Value": "False"
    }, {
      "ColumnName": "曾用名姓氏[拼音]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListAlias_ctl00_tbxSURNAME",
      "Value": "dfg187"
    }, {
      "ColumnName": "曾用名名字[拼音]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListAlias_ctl00_tbxGIVEN_NAME",
      "Value": "dfg287"
    }, {
      "ColumnName": "出生日期-日",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlDOBDay",
      "Value": "3"
    }, {
      "ColumnName": "出生日期-月",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlDOBMonth",
      "Value": "8"
    }, {
      "ColumnName": "出生日期-年",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxDOBYear",
      "Value": "1984"
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
      "Value": "CHIN"
    }, {
      "ColumnName": "婚姻状况",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlAPP_MARITAL_STATUS",
      "Value": "O"
    }, {
      "ColumnName": "性别",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblAPP_GENDER_0",
      "Value": "True"
    }, {
      "ColumnName": "是否拥有曾用名",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblOtherNames_0",
      "Value": "True"
    }, {
      "ColumnName": "您的名字有相应的电码吗?",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblTelecodeQuestion_1",
      "Value": "False"
    }, {
      "ColumnName": "出生地-城市[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_POB_CITY",
      "Value": "Shanghai"
    }, {
      "ColumnName": "婚姻状态其他-解释[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxOtherMaritalStatus",
      "Value": "asdfasdfaf"
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
            "Value": "CHIN"
        }, {
            "ColumnName": "是否拥有其他国籍",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblAPP_OTH_NATL_IND_1",
            "Value": "False"
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
            "Value": "True"
        }, {
            "ColumnName": "美国纳税人身份号码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_TAX_ID",
            "Value": "999999999999999999"
        }, {
            "ColumnName": "是否美国纳税人身份号码不适用",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxAPP_TAX_ID_NA",
            "Value": "True"
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
            "Value": "FuChuan Road NO 99"
        }, {
            "ColumnName": "家庭地址街道地址(第二行)[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_ADDR_LN2",
            "Value": "TianShan Road 111"
        }, {
            "ColumnName": "家庭地址城市[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_ADDR_CITY",
            "Value": "ShangHai"
        }, {
            "ColumnName": "家庭地址州/省份[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_ADDR_STATE",
            "Value": "Shanghai"
        }, {
            "ColumnName": "家庭地址州/省份（不适用）",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxAPP_ADDR_STATE_NA",
            "Value": "True"
        }, {
            "ColumnName": "家庭地址邮政区域/邮政编码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAPP_ADDR_POSTAL_CD",
            "Value": "200231"
        }, {
            "ColumnName": "家庭地址邮政区域/邮政编码（不适用）",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxAPP_ADDR_POSTAL_CD_NA",
            "Value": "False"
        }, {
            "ColumnName": "家庭地址国家/地区[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlCountry",
            "Value": "CHIN"
        }, {
            "ColumnName": "邮寄地址是否同于您的家庭地址",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblMailingAddrSame_0",
            "Value": "True"
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
        "PageName": "第四页 护照信息",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/Passport_Visa_Info.aspx?node=PptVisa",
        "Values": [{
            "ColumnName": "护照/旅行证件种类",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_TYPE",
            "Value": "T"
        }, {
            "ColumnName": "护照种类其他的说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPptOtherExpl",
            "Value": "salkfjowaijroqwjjlasdkjflajsd"
        }, {
            "ColumnName": "护照/旅行证件号码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_NUM",
            "Value": "81909727236"
        }, {
            "ColumnName": "护照本编号",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_BOOK_NUM",
            "Value": "123344556"
        }, {
            "ColumnName": "护照本编号（不适用）",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxPPT_BOOK_NUM_NA",
            "Value": "True"
        }, {
            "ColumnName": "颁发护照/旅行证件的国家/机构[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_ISSUED_CNTRY",
            "Value": "CHIN"
        }, {
            "ColumnName": "护照签发地—城市[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_ISSUED_IN_CITY",
            "Value": "Shanghai"
        }, {
            "ColumnName": "护照签发地—州/省份（如果护照上显示）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_ISSUED_IN_STATE",
            "Value": "shanghai"
        }, {
            "ColumnName": "护照签发地—国家/地区[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_ISSUED_IN_CNTRY",
            "Value": "CHIN"
        }, {
            "ColumnName": "签发日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_ISSUED_DTEDay",
            "Value": "1"
        }, {
            "ColumnName": "签发日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_ISSUED_DTEMonth",
            "Value": "2"
        }, {
            "ColumnName": "签发日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_ISSUEDYear",
            "Value": "2010"
        }, {
            "ColumnName": "失效日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_EXPIRE_DTEDay",
            "Value": "1"
        }, {
            "ColumnName": "失效日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPPT_EXPIRE_DTEMonth",
            "Value": "1"
        }, {
            "ColumnName": "失效日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPPT_EXPIREYear",
            "Value": "2019"
        }, {
            "ColumnName": "失效日期（不适用）",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxPPT_EXPIRE_NA",
            "Value": "False"
        }, {
            "ColumnName": "您的护照是否曾遗失或者被盗？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblLOST_PPT_IND_1",
            "Value": "False"
        }, {
            "ColumnName": "丢失的护照/旅行证件号码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlLostPPT_ctl00_tbxLOST_PPT_NUM",
            "Value": "9998887776655443"
        }, {
            "ColumnName": "丢失的护照/旅行证件号码（忘记）",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlLostPPT_ctl00_cbxLOST_PPT_NUM_UNKN_IND",
            "Value": "False"
        }, {
            "ColumnName": "丢失的颁发护照/旅行证件的国家/机构[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlLostPPT_ctl00_ddlLOST_PPT_NATL",
            "Value": "CHIN"
        }, {
            "ColumnName": "丢失的说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlLostPPT_ctl00_tbxLOST_PPT_EXPL",
            "Value": "asdfasfaewerwerwe"
        }]
    }]
};

var Travel5 = {
  "Country": "美国",
  "Pages": [{
    "PageName": "第五页 旅行信息",
    "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_travel.aspx?node=Travel",
    "Values": [{
      "ColumnName": "赴美访问目的",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dlPrincipalAppTravel_ctl00_ddlPurposeOfTrip",
      "Value": "此次访美的目的1-此次访美的目的2-此次访美的目的3-此次访美的目的4-此次访美的目的5"
    }, {
      "ColumnName": "赴美访问目的具体说明",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dlPrincipalAppTravel_ctl00_ddlOtherPurpose",
      "Value": ""
    }, {
      "ColumnName": "您是否已经制定了具体的旅行计划？",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblSpecificTravel_0",
      "Value": "True"
    }, {
      "ColumnName": "到达美国日期-日",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlARRIVAL_US_DTEDay",
      "Value": "1"
    }, {
      "ColumnName": "到达美国日期-月",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlARRIVAL_US_DTEMonth",
      "Value": "2"
    }, {
      "ColumnName": "到达美国日期-年",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxARRIVAL_US_DTEYear",
      "Value": "2003"
    }, {
      "ColumnName": "到达航班",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxArriveFlight",
      "Value": "HZ004"
    }, {
      "ColumnName": "抵达城市[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxArriveCity",
      "Value": "The first station of city"
    }, {
      "ColumnName": "离开美国日期-日",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlDEPARTURE_US_DTEDay",
      "Value": "5"
    }, {
      "ColumnName": "离开美国日期-月",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlDEPARTURE_US_DTEMonth",
      "Value": "6"
    }, {
      "ColumnName": "离开美国日期-年",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxDEPARTURE_US_DTEYear",
      "Value": "2007"
    }, {
      "ColumnName": "离开航班",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxDepartFlight",
      "Value": "MH008"
    }, {
      "ColumnName": "离美城市[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxDepartCity",
      "Value": "At the terminal station of city"
    }, {
      "ColumnName": "请提供您在美期间计划访问的地点名称[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlTravelLoc_ctl00_tbxSPECTRAVEL_LOCATION",
      "Value": "All the city during the beauty you plan after 1"
    }, {
      "ColumnName": "计划到达日期-日",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_DTEDay",
      "Value": "0"
    }, {
      "ColumnName": "计划到达日期-月",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_DTEMonth",
      "Value": "0"
    }, {
      "ColumnName": "计划到达日期-年",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxTRAVEL_DTEYear",
      "Value": "0"
    }, {
      "ColumnName": "计划在美停留时间-数字",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxTRAVEL_LOS",
      "Value": "0"
    }, {
      "ColumnName": "计划在美停留时间-单位",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlTRAVEL_LOS_CD",
      "Value": "D"
    }, {
      "ColumnName": "在美停留期间的住址-街道地址（第一行）[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxStreetAddress1",
      "Value": ""
    }, {
      "ColumnName": "在美停留期间的住址-街道地址（第二行）[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxStreetAddress2",
      "Value": ""
    }, {
      "ColumnName": "在美停留期间的住址-城市[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxCity",
      "Value": ""
    }, {
      "ColumnName": "在美停留期间的住址-州[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlTravelState",
      "Value": ""
    }, {
      "ColumnName": "在美停留期间的住址-邮政编码",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbZIPCode",
      "Value": ""
    }, {
      "ColumnName": "支付您旅行费用的个人或组织名称",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlWhoIsPaying",
      "Value": "O"
    }, {
      "ColumnName": "承担您旅行费用者的姓氏[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPayerSurname",
      "Value": "Her name is 1"
    }, {
      "ColumnName": "承担您旅行费用者的名字[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPayerGivenName",
      "Value": "Her 2"
    }, {
      "ColumnName": "承担您旅行费用者的电话号码",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPayerPhone",
      "Value": "33333333"
    }, {
      "ColumnName": "承担您旅行费用者的电子邮件地址",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPAYER_EMAIL_ADDR",
      "Value": ""
    }, {
      "ColumnName": "承担您旅行费用者与您关系[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPayerRelationship",
      "Value": "C"
    }, {
      "ColumnName": "承担您旅行费用者地址是否与您家庭或右击地址相同",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPayerAddrSameAsInd_1",
      "Value": "False"
    }, {
      "ColumnName": "承担您旅行费用者街道地址（第一行）[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPayerStreetAddress1",
      "Value": "Pay for your trip people street address 1"
    }, {
      "ColumnName": "承担您旅行费用者街道地址（第二行）[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPayerStreetAddress2",
      "Value": ""
    }, {
      "ColumnName": "承担您旅行费用城市[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPayerCity",
      "Value": "Pay for your trip people 2"
    }, {
      "ColumnName": "承担您旅行费用州/省份[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPayerStateProvince",
      "Value": ""
    }, {
      "ColumnName": "承担您旅行费用州/省份不适用的",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxDNAPayerStateProvince",
      "Value": "True"
    }, {
      "ColumnName": "承担您旅行费用邮政编码",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPayerPostalZIPCode",
      "Value": ""
    }, {
      "ColumnName": "承担您旅行费用邮政编码不适用的",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxDNAPayerPostalZIPCode",
      "Value": "True"
    }, {
      "ColumnName": "承担您旅行费用国家[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPayerCountry",
      "Value": "CHIN"
    }, {
      "ColumnName": "承担您旅行费用的公司或组织名称[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPayingCompany",
      "Value": "SDFSDF1"
    }, {
      "ColumnName": "承担您旅行费用的公司或组织名称电话号码",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPayerPhone",
      "Value": "组织的电话号码3"
    }, {
      "ColumnName": "承担您旅行费用的公司或组织名称与您的关系[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxCompanyRelation",
      "Value": "Other"
    }, {
      "ColumnName": "承担您旅行费用的公司或组织名称街道地址（第一行）[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPayerStreetAddress1",
      "Value": "The organization's street address 1"
    }, {
      "ColumnName": "承担您旅行费用的公司或组织名称街道地址（第二行）[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPayerStreetAddress2",
      "Value": ""
    }, {
      "ColumnName": "承担您旅行费用的公司或组织名称城市[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPayerCity",
      "Value": "Organization of the city 2"
    }, {
      "ColumnName": "承担您旅行费用的公司或组织名称州/省份[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPayerStateProvince",
      "Value": "The organization of the state / Province 3"
    }, {
      "ColumnName": "承担您旅行费用的公司或组织名称州/省份不适用的",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxDNAPayerStateProvince",
      "Value": "False"
    }, {
      "ColumnName": "承担您旅行费用的公司或组织名称邮政编码",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPayerPostalZIPCode",
      "Value": "组织的邮政编码5"
    }, {
      "ColumnName": "承担您旅行费用的公司或组织名称邮政编码不适用的",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxDNAPayerPostalZIPCode",
      "Value": "False"
    }, {
      "ColumnName": "承担您旅行费用的公司或组织名称国家[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPayerCountry",
      "Value": "CHIN"
    }, {
      "ColumnName": "承担您旅行费用者的电子邮件地址不适用的",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxDNAPAYER_EMAIL_ADDR_NA",
      "Value": "True"
    }]
  }]
};

// var TravelCompanions6 = {
//     "Country": "美国",
//     "Pages": [{
//         "PageName": "第六页 旅行同伴",
//         "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_travelcompanions.aspx?node=TravelCompanions",
//         "Values": [{
//             "ColumnName": "是否有人与您同行？",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblOtherPersonsTravelingWithYou_0",
//             "Value": "True"
//         }, {
//             "ColumnName": "您是否作为一个团队或者组织的成员去旅行？",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblGroupTravel_1",
//             "Value": "False"
//         }, {
//             "ColumnName": "输入您旅行团队的名称[英文]",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxGroupName",
//             "Value": "ZhongGuoChunQiuLvXingShe"
//         }, {
//             "ColumnName": "随行人员的姓氏[英文]",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl00_tbxSurname",
//             "Value": "li"
//         }, {
//             "ColumnName": "随行人员的名字[英文]",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl00_tbxGivenName",
//             "Value": "si"
//         }, {
//             "ColumnName": "随行人员和您的关系",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl00_ddlTCRelationship",
//             "Value": "F"
//         }]
//     }]
// };

var TravelCompanions6 = {
    "Country": "美国",
    "Pages": [{
        "PageName": "第六页 旅行同伴",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_travelcompanions.aspx?node=TravelCompanions",
        "Values": [{
            "ColumnName": "是否有人与您同行？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblOtherPersonsTravelingWithYou_1",
            "Value": "False"
        }, {
            "ColumnName": "您是否作为一个团队或者组织的成员去旅行？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblGroupTravel_1",
            "Value": "False"
        }, {
            "ColumnName": "输入您旅行团队的名称[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxGroupName",
            "Value": "333"
        }, {
            "ColumnName": "随行人员的姓氏[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl00_tbxSurname",
            "Value": "111"
        }, {
            "ColumnName": "随行人员的名字[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl00_tbxGivenName",
            "Value": "222"
        }, {
            "ColumnName": "随行人员和您的关系",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dlTravelCompanions_ctl01_ddlTCRelationship",
            "Value": "S"
        }]
    }]
};

var PreviousUSTravel7 = {
  "Country": "美国",
  "Pages": [{
    "PageName": "第七页 以前美国之行",
    "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_previousustravel.aspx?node=PreviousUSTravel",
    "Values": [{
      "ColumnName": "您是否曾经在美国停留过？",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_US_TRAVEL_IND_1",
      "Value": "False"
    }, {
      "ColumnName": "以往赴美1抵达日期-日",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl00_ddlPREV_US_VISIT_DTEDay",
      "Value": "6"
    }, {
      "ColumnName": "以往赴美1抵达日期-月",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl00_ddlPREV_US_VISIT_DTEMonth",
      "Value": "5"
    }, {
      "ColumnName": "以往赴美1抵达日期-年",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl00_tbxPREV_US_VISIT_DTEYear",
      "Value": "2004"
    }, {
      "ColumnName": "以往赴美1停留时间单位",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl00_ddlPREV_US_VISIT_LOS_CD",
      "Value": "D"
    }, {
      "ColumnName": "以往赴美1时长",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl00_tbxPREV_US_VISIT_LOS",
      "Value": "4"
    }, {
      "ColumnName": "以往赴美2抵达日期-日",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl01_ddlPREV_US_VISIT_DTEDay",
      "Value": "5"
    }, {
      "ColumnName": "以往赴美2抵达日期-月",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl01_ddlPREV_US_VISIT_DTEMonth",
      "Value": "6"
    }, {
      "ColumnName": "以往赴美2抵达日期-年",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl01_tbxPREV_US_VISIT_DTEYear",
      "Value": "2007"
    }, {
      "ColumnName": "以往赴美2停留时间单位",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl01_ddlPREV_US_VISIT_LOS_CD",
      "Value": "D"
    }, {
      "ColumnName": "以往赴美2时长",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl01_tbxPREV_US_VISIT_LOS",
      "Value": "8"
    }, {
      "ColumnName": "您是否持有或者曾经持有美国驾照？",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_US_DRIVER_LIC_IND_0",
      "Value": "True"
    }, {
      "ColumnName": "上一次获得美国签证的日期-日",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPREV_VISA_ISSUED_DTEDay",
      "Value": "5"
    }, {
      "ColumnName": "上一次获得美国签证的日期-月",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPREV_VISA_ISSUED_DTEMonth",
      "Value": "4"
    }, {
      "ColumnName": "上一次获得美国签证的日期-年",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPREV_VISA_ISSUED_DTEYear",
      "Value": "2003"
    }, {
      "ColumnName": "签证号码",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPREV_VISA_FOIL_NUMBER",
      "Value": ""
    }, {
      "ColumnName": "签证号码（未知）",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxPREV_VISA_FOIL_NUMBER_NA",
      "Value": "True"
    }, {
      "ColumnName": "您此次是否申请同类签证",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_SAME_TYPE_IND_0",
      "Value": "True"
    }, {
      "ColumnName": "您现在申请签证的所在国家或地点同于您上个签证颁发所在国或地点吗? 此国家或地点是您主要居住地吗?",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_SAME_CNTRY_IND_0",
      "Value": "True"
    }, {
      "ColumnName": "您是否留取过十指指纹？",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_TEN_PRINT_IND_0",
      "Value": "True"
    }, {
      "ColumnName": "您的美国签证是否曾经遗失或者被盗？",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_LOST_IND_0",
      "Value": "True"
    }, {
      "ColumnName": "输入您签证遗失或被盗窃的年份",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPREV_VISA_LOST_YEAR",
      "Value": "2001"
    }, {
      "ColumnName": "签证遗失解释[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPREV_VISA_LOST_EXPL",
      "Value": "Stolen 2 reasons"
    }, {
      "ColumnName": "您的美国签证是否曾经被注销或撤销过？",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_CANCELLED_IND_0",
      "Value": "True"
    }, {
      "ColumnName": "注销或撤销解释[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPREV_VISA_CANCELLED_EXPL",
      "Value": "Cancellation reason 1"
    }, {
      "ColumnName": "您被拒签过吗？ 或在入境口岸被拒入境，或被撤销入境申请？",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_REFUSED_IND_0",
      "Value": "True"
    }, {
      "ColumnName": "拒签或撤销入境的解释[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPREV_VISA_REFUSED_EXPL",
      "Value": "Have you ever been refused a visa, been refused entry America, or be revoked visa application"
    }, {
      "ColumnName": "您是， 或者曾经是美国合法永久居民吗？",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPERM_RESIDENT_IND_1",
      "Value": "False"
    }, {
      "ColumnName": "您是， 或者曾经是美国合法永久居民吗解释[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPERM_RESIDENT_EXPL",
      "Value": ""
    }, {
      "ColumnName": "曾有人在公民及移民服务局为您申请过移民吗？",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblIV_PETITION_IND_1",
      "Value": "False"
    }, {
      "ColumnName": "曾有人在公民及移民服务局为您申请过移民吗解释[英文]",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxIV_PETITION_EXPL",
      "Value": "It has been in the citizenship or immigration services for you to apply for immigration 111"
    }, {
      "ColumnName": "驾驶执照的号码",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlUS_DRIVER_LICENSE_ctl00_tbxUS_DRIVER_LICENSE",
      "Value": "JJJ333222111"
    }, {
      "ColumnName": "驾驶执照的号码未知的",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlUS_DRIVER_LICENSE_ctl00_cbxUS_DRIVER_LICENSE_NA",
      "Value": "False"
    }, {
      "ColumnName": "您是否曾经获得过美国签证？",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_IND_0",
      "Value": "True"
    }]
  }]
};

// var PreviousUSTravel7 = {
//     "Country": "美国",
//     "Pages": [{
//         "PageName": "第七页 以前美国之行",
//         "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_previousustravel.aspx?node=PreviousUSTravel",
//         "Values": [{
//             "ColumnName": "您是否曾经在美国停留过？",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_US_TRAVEL_IND_0",
//             "Value": "True"
//         }, {
//             "ColumnName": "以往赴美1抵达日期-日",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl00_ddlPREV_US_VISIT_DTEDay",
//             "Value": "1"
//         }, {
//             "ColumnName": "以往赴美1抵达日期-月",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl00_ddlPREV_US_VISIT_DTEMonth",
//             "Value": "1"
//         }, {
//             "ColumnName": "以往赴美1抵达日期-年",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl00_tbxPREV_US_VISIT_DTEYear",
//             "Value": "2010"
//         }, {
//             "ColumnName": "以往赴美1停留时间单位",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl00_ddlPREV_US_VISIT_LOS_CD",
//             "Value": "M"
//         }, {
//             "ColumnName": "以往赴美1时长",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl00_tbxPREV_US_VISIT_LOS",
//             "Value": "1"
//         }, {
//             "ColumnName": "以往赴美2抵达日期-日",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl01_ddlPREV_US_VISIT_DTEDay",
//             "Value": "1"
//         }, {
//             "ColumnName": "以往赴美2抵达日期-月",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl01_ddlPREV_US_VISIT_DTEMonth",
//             "Value": "1"
//         }, {
//             "ColumnName": "以往赴美2抵达日期-年",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl01_tbxPREV_US_VISIT_DTEYear",
//             "Value": "2009"
//         }, {
//             "ColumnName": "以往赴美2停留时间单位",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl01_ddlPREV_US_VISIT_LOS_CD",
//             "Value": "M"
//         }, {
//             "ColumnName": "以往赴美2时长",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPREV_US_VISIT_ctl01_tbxPREV_US_VISIT_LOS",
//             "Value": "2"
//         }, {
//             "ColumnName": "您是否持有或者曾经持有美国驾照？",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_IND_0",
//             "Value": "True"
//         }, {
//             "ColumnName": "您是否持有或者曾经持有美国驾驶执照？",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_US_DRIVER_LIC_IND_0",
//             "Value": "True"
//         }, {
//             "ColumnName": "驾驶执照的号码",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlUS_DRIVER_LICENSE_ctl00_tbxUS_DRIVER_LICENSE",
//             "Value": "234523452345"
//         }, {
//             "ColumnName": "不知道驾驶执照的号码",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlUS_DRIVER_LICENSE_ctl00_cbxUS_DRIVER_LICENSE_NA",
//             "Value": "False"
//         }, {
//             "ColumnName": "驾驶执照的州",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlUS_DRIVER_LICENSE_ctl00_ddlUS_DRIVER_LICENSE_STATE",
//             "Value": "CO"
//         }, {
//             "ColumnName": "上一次获得美国签证的日期-日",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPREV_VISA_ISSUED_DTEDay",
//             "Value": "1"
//         }, {
//             "ColumnName": "上一次获得美国签证的日期-月",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPREV_VISA_ISSUED_DTEMonth",
//             "Value": "2"
//         }, {
//             "ColumnName": "上一次获得美国签证的日期-年",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPREV_VISA_ISSUED_DTEYear",
//             "Value": "2008"
//         }, {
//             "ColumnName": "签证号码",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPREV_VISA_FOIL_NUMBER",
//             "Value": "9998877676655"
//         }, {
//             "ColumnName": "签证号码（未知）",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxPREV_VISA_FOIL_NUMBER_NA",
//             "Value": "False"
//         }, {
//             "ColumnName": "您此次是否申请同类签证",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_SAME_TYPE_IND_0",
//             "Value": "True"
//         }, {
//             "ColumnName": "您现在申请签证的所在国家或地点同于您上个签证颁发所在国或地点吗? 此国家或地点是您主要居住地吗?",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_SAME_CNTRY_IND_1",
//             "Value": "False"
//         }, {
//             "ColumnName": "您是否留取过十指指纹？",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_TEN_PRINT_IND_0",
//             "Value": "True"
//         }, {
//             "ColumnName": "您的美国签证是否曾经遗失或者被盗？",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_LOST_IND_0",
//             "Value": "True"
//         }, {
//             "ColumnName": "输入您签证遗失或被盗窃的年份",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPREV_VISA_LOST_YEAR",
//             "Value": "2009"
//         }, {
//             "ColumnName": "签证遗失解释[英文]",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPREV_VISA_LOST_EXPL",
//             "Value": "asdfasdf"
//         }, {
//             "ColumnName": "您的美国签证是否曾经被注销或撤销过？",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_CANCELLED_IND_0",
//             "Value": "True"
//         }, {
//             "ColumnName": "注销或撤销解释[英文]",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPREV_VISA_CANCELLED_EXPL",
//             "Value": "no"
//         }, {
//             "ColumnName": "您被拒签过吗？ 或在入境口岸被拒入境，或被撤销入境申请？",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPREV_VISA_REFUSED_IND_0",
//             "Value": "True"
//         }, {
//             "ColumnName": "拒签或撤销入境的解释[英文]",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPREV_VISA_REFUSED_EXPL",
//             "Value": "sdfasdfa"
//         }, {
//             "ColumnName": "您是， 或者曾经是美国合法永久居民吗？",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPERM_RESIDENT_IND_1",
//             "Value": "False"
//         }, {
//             "ColumnName": "您是， 或者曾经是美国合法永久居民吗解释[英文]",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPERM_RESIDENT_EXPL",
//             "Value": "no"
//         }, {
//             "ColumnName": "曾有人在公民及移民服务局为您申请过移民吗？",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblIV_PETITION_IND_0",
//             "Value": "True"
//         }, {
//             "ColumnName": "曾有人在公民及移民服务局为您申请过移民吗解释[英文]",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxIV_PETITION_EXPL",
//             "Value": "noooo"
//         }]
//     }]
// };

// var USContact8 = {
//     "Country": "美国",
//     "Pages": [{
//         "PageName": "第八页 美国联系人信息",
//         "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_uscontact.aspx?node=USContact",
//         "Values": [{
//             "ColumnName": "在美国的联系人—姓氏[英文]",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_SURNAME",
//             "Value": "Wang"
//         }, {
//             "ColumnName": "在美国的联系人—名字[英文]",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_GIVEN_NAME",
//             "Value": "Wu"
//         }, {
//             "ColumnName": "无在美联系人",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxUS_POC_NAME_NA",
//             "Value": "False"
//         }, {
//             "ColumnName": "在美国的联系组织名称[英文]",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ORGANIZATION",
//             "Value": "New York University"
//         }, {
//             "ColumnName": "无在美国的联系组织",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxUS_POC_ORG_NA_IND",
//             "Value": "True"
//         }, {
//             "ColumnName": "在美国的联系组织与您的关系",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlUS_POC_REL_TO_APP",
//             "Value": "R"
//         }, {
//             "ColumnName": "美国街道地址（第一行）[英文]",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_LN1",
//             "Value": "Room 15670,Diyi No.,Niuyuejie Boulevard"
//         }, {
//             "ColumnName": "美国街道地址（第二行）[英文]",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_LN2",
//             "Value": "Asadefashedianfa"
//         }, {
//             "ColumnName": "美国城市[英文]",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_CITY",
//             "Value": "Niuyue"
//         }, {
//             "ColumnName": "美国州[英文]",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlUS_POC_ADDR_STATE",
//             "Value": "MA"
//         }, {
//             "ColumnName": "美国邮政编码（如果知道的话）",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_POSTAL_CD",
//             "Value": "23456"
//         }, {
//             "ColumnName": "美国电话号码",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_HOME_TEL",
//             "Value": "123456789"
//         }, {
//             "ColumnName": "美国电子邮件地址",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_EMAIL_ADDR",
//             "Value": "zhang.chui@qq.com"
//         }, {
//             "ColumnName": "美国电子邮件地址（不适用的）",
//             "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxUS_POC_EMAIL_ADDR_NA",
//             "Value": "True"
//         }]
//     }]
// };
var USContact8 = {
    "Country": "美国",
    "Pages": [{
        "PageName": "第八页 美国联系人信息",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_uscontact.aspx?node=USContact",
        "Values": [{
            "ColumnName": "在美国的联系人—姓氏[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_SURNAME",
            "Value": "Maritza"
        }, {
            "ColumnName": "在美国的联系人—名字[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_GIVEN_NAME",
            "Value": "Smith"
        }, {
            "ColumnName": "无在美联系人",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxUS_POC_NAME_NA",
            "Value": "False"
        }, {
            "ColumnName": "在美国的联系组织名称[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ORGANIZATION",
            "Value": ""
        }, {
            "ColumnName": "无在美国的联系组织",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxUS_POC_ORG_NA_IND",
            "Value": "True"
        }, {
            "ColumnName": "在美国的联系组织与您的关系",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlUS_POC_REL_TO_APP",
            "Value": "H"
        }, {
            "ColumnName": "美国街道地址（第一行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_LN1",
            "Value": "196 Charles Kelley Rd"
        }, {
            "ColumnName": "美国街道地址（第二行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_LN2",
            "Value": ""
        }, {
            "ColumnName": "美国城市[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_CITY",
            "Value": "Oxford"
        }, {
            "ColumnName": "美国州[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlUS_POC_ADDR_STATE",
            "Value": "NY"
        }, {
            "ColumnName": "美国邮政编码（如果知道的话）",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_ADDR_POSTAL_CD",
            "Value": "13830"
        }, {
            "ColumnName": "美国电话号码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_HOME_TEL",
            "Value": "(386) 860-6163"
        }, {
            "ColumnName": "美国电子邮件地址",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxUS_POC_EMAIL_ADDR",
            "Value": ""
        }, {
            "ColumnName": "美国电子邮件地址（不适用的）",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxUS_POC_EMAIL_ADDR_NA",
            "Value": "True"
        }]
    }]
};
var Relatives9 = {
    "Country": "美国",
    "Pages": [{
        "PageName": "第九页 家庭信息-亲属",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_family1.aspx?node=Relatives",
        "Values": [{
            "ColumnName": "父亲姓氏[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxFATHER_SURNAME",
            "Value": "Fuqindexing"
        }, {
            "ColumnName": "父亲姓氏不知道",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxFATHER_SURNAME_UNK_IND",
            "Value": "False"
        }, {
            "ColumnName": "父亲名字[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxFATHER_GIVEN_NAME",
            "Value": "Fuqindeming"
        }, {
            "ColumnName": "父亲名字不知道",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxFATHER_GIVEN_NAME_UNK_IND",
            "Value": "False"
        }, {
            "ColumnName": "父亲出生日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlFathersDOBDay",
            "Value": "1"
        }, {
            "ColumnName": "父亲出生日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlFathersDOBMonth",
            "Value": "2"
        }, {
            "ColumnName": "父亲出生日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxFathersDOBYear",
            "Value": "2003"
        }, {
            "ColumnName": "父亲出生日期不知道",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxFATHER_DOB_UNK_IND",
            "Value": "False"
        }, {
            "ColumnName": "您父亲是否在美国？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblFATHER_LIVE_IN_US_IND_0",
            "Value": "True"
        }, {
            "ColumnName": "父亲在美国的移民或非移民身份",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlFATHER_US_STATUS",
            "Value": "O"
        }, {
            "ColumnName": "母亲姓氏[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxMOTHER_SURNAME",
            "Value": "Muqindexing"
        }, {
            "ColumnName": "母亲名字[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxMOTHER_GIVEN_NAME",
            "Value": "Muqindeming"
        }, {
            "ColumnName": "母亲名字不知道",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxMOTHER_GIVEN_NAME_UNK_IND",
            "Value": "False"
        }, {
            "ColumnName": "母亲出生日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlMothersDOBDay",
            "Value": "4"
        }, {
            "ColumnName": "母亲出生日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlMothersDOBMonth",
            "Value": "5"
        }, {
            "ColumnName": "母亲出生日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlMothersDOBYear",
            "Value": "2006"
        }, {
            "ColumnName": "母亲出生日期不知道",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxMOTHER_DOB_UNK_IND",
            "Value": "False"
        }, {
            "ColumnName": "您母亲是否在美国？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblMOTHER_LIVE_IN_US_IND_1",
            "Value": "False"
        }, {
            "ColumnName": "母亲在美国的移民或非移民身份",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlMOTHER_US_STATUS",
            "Value": "S"
        }, {
            "ColumnName": "除父母以外，您在美国是否还有其他直系亲属?",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblUS_IMMED_RELATIVE_IND_0",
            "Value": "True"
        }, {
            "ColumnName": "亲属姓氏[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dlUSRelatives_ctl00_tbxUS_REL_SURNAME",
            "Value": "Qinshuxing1"
        }, {
            "ColumnName": "亲属名字[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dlUSRelatives_ctl00_tbxUS_REL_GIVEN_NAME",
            "Value": "Qinshuming2"
        }, {
            "ColumnName": "亲属与您的关系",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dlUSRelatives_ctl00_ddlUS_REL_TYPE",
            "Value": "S"
        }, {
            "ColumnName": "亲属在美国的移民或非移民身份",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dlUSRelatives_ctl00_ddlUS_REL_STATUS",
            "Value": "S"
        }, {
            "ColumnName": "您在美国是否还有其他亲属？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblUS_OTHER_RELATIVE_IND_1",
            "Value": "False"
        }, {
            "ColumnName": "母亲姓氏不知道",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxMOTHER_SURNAME_UNK_IND",
            "Value": "True"
        }]
    }]
};

var Spouse9 = {
    "Country": "美国",
    "Pages": [{
        "PageName": "第九页 家庭信息-配偶信息",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_family2.aspx?node=Spouse",
        "Values": [{
            "ColumnName": "配偶的姓氏[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxSpouseSurname",
            "Value": "Fu"
        }, {
            "ColumnName": "配偶的名字[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxSpouseGivenName",
            "Value": "Nannan"
        }, {
            "ColumnName": "配偶的出生日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlDOBDay",
            "Value": "19"
        }, {
            "ColumnName": "配偶的出生日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlDOBMonth",
            "Value": "2"
        }, {
            "ColumnName": "配偶的出生日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxDOBYear",
            "Value": "1988"
        }, {
            "ColumnName": "配偶所属国籍[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlSpouseNatDropDownList",
            "Value": "CHIN"
        }, {
            "ColumnName": "配偶出生城市[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxSpousePOBCity",
            "Value": "Zhoukou"
        }, {
            "ColumnName": "配偶出生城市未知的",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxSPOUSE_POB_CITY_NA",
            "Value": "False"
        }, {
            "ColumnName": "配偶出生国家[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlSpousePOBCountry",
            "Value": "CHIN"
        }, {
            "ColumnName": "配偶的联系地址",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlSpouseAddressType",
            "Value": "O"
        }, {
            "ColumnName": "配偶的联系地址街道地址（第一行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxSPOUSE_ADDR_LN1",
            "Value": "Lanzhouqu105 Lane,Zhoukou"
        }, {
            "ColumnName": "配偶的联系地址街道地址（第二行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxSPOUSE_ADDR_LN2",
            "Value": "wwww"
        }, {
            "ColumnName": "配偶的联系地址城市[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxSPOUSE_ADDR_CITY",
            "Value": "Zhoukou"
        }, {
            "ColumnName": "配偶的联系地址省份[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxSPOUSE_ADDR_STATE",
            "Value": "Henan"
        }, {
            "ColumnName": "配偶的联系地址省份未知的",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxSPOUSE_ADDR_STATE_NA",
            "Value": "False"
        }, {
            "ColumnName": "配偶的联系地址邮编",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxSPOUSE_ADDR_POSTAL_CD",
            "Value": "230045"
        }, {
            "ColumnName": "配偶的联系地址邮编未知的",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxSPOUSE_ADDR_POSTAL_CD_NA",
            "Value": "True"
        }, {
            "ColumnName": "配偶的联系地址国家[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlSPOUSE_ADDR_CNTRY",
            "Value": "CHIN"
        }]
    }]
};

var WorkEducation10 = {
    "Country": "美国",
    "Pages": [{
        "PageName": "当前工作/教育/培训",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_workeducation1.aspx?node=WorkEducation1",
        "Values": [{
            "ColumnName": "当前主要职业",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlPresentOccupation",
            "Value": "B"
        }, {
            "ColumnName": "未就业说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxExplainOtherPresentOccupation",
            "Value": "Akesu Casa Sacco stimulate thinking"
        }, {
            "ColumnName": "当前工作单位或学校的名称[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxEmpSchName",
            "Value": "Assad left Lhasa to the section that made"
        }, {
            "ColumnName": "当前工作单位或学校的街道地址（第一行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxEmpSchAddr1",
            "Value": "Oh run Roewe"
        }, {
            "ColumnName": "当前工作单位或学校的街道地址（第二行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxEmpSchAddr2",
            "Value": ""
        }, {
            "ColumnName": "当前工作单位或学校的城市[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxEmpSchCity",
            "Value": "Shanghai"
        }, {
            "ColumnName": "当前工作单位或学校的州/省份[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxWORK_EDUC_ADDR_STATE",
            "Value": "Anhui"
        }, {
            "ColumnName": "当前工作单位或学校的州/省份不适用",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxWORK_EDUC_ADDR_STATE_NA",
            "Value": "True"
        }, {
            "ColumnName": "当前工作单位或学校的邮政区域/邮政编码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxWORK_EDUC_ADDR_POSTAL_CD",
            "Value": "2384729387"
        }, {
            "ColumnName": "当前工作单位或学校的邮政区域/邮政编码不适用",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxWORK_EDUC_ADDR_POSTAL_CD_NA",
            "Value": "True"
        }, {
            "ColumnName": "当前工作单位或学校的电话号码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxWORK_EDUC_TEL",
            "Value": "1212312312"
        }, {
            "ColumnName": "当前工作单位或学校的国家/地区[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlEmpSchCountry",
            "Value": "BRDO"
        }, {
            "ColumnName": "当前的月收入（如有工作，当地货币）",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxCURR_MONTHLY_SALARY",
            "Value": "10000"
        }, {
            "ColumnName": "当前的月收入不适用",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxCURR_MONTHLY_SALARY_NA",
            "Value": "True"
        }, {
            "ColumnName": "请简要描述您当前的工作职责：[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxDescribeDuties",
            "Value": "Ah I I amount roewire oh"
        }]
    }]
};

var WorkEducation11 = {
    "Country": "美国",
    "Pages": [{
        "PageName": "以往工作/教育/培训",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_workeducation2.aspx?node=WorkEducation2",
        "Values": [{
            "ColumnName": "您之前有工作吗？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPreviouslyEmployed_0",
            "Value": "True"
        }, {
            "ColumnName": "以往单位1名称[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbEmployerName",
            "Value": "TaoBao"
        }, {
            "ColumnName": "以往单位1街道地址（第一行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbEmployerStreetAddress1",
            "Value": "WenYi Road"
        }, {
            "ColumnName": "以往单位1街道地址（第二行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbEmployerStreetAddress2",
            "Value": "XiHu area"
        }, {
            "ColumnName": "以往单位1城市[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbEmployerCity",
            "Value": "Hangzhou"
        }, {
            "ColumnName": "以往单位1州/省份[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbxPREV_EMPL_ADDR_STATE",
            "Value": "ZheJiang"
        }, {
            "ColumnName": "以往单位1州/省份不适用",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_cbxPREV_EMPL_ADDR_STATE_NA",
            "Value": "False"
        }, {
            "ColumnName": "以往单位1邮政区域/邮政编码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbxPREV_EMPL_ADDR_POSTAL_CD",
            "Value": "300316"
        }, {
            "ColumnName": "以往单位1邮政区域/邮政编码不适用",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_cbxPREV_EMPL_ADDR_POSTAL_CD_NA",
            "Value": "false"
        }, {
            "ColumnName": "以往单位1国家/地区[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_DropDownList2",
            "Value": "CHIN"
        }, {
            "ColumnName": "以往单位1电话号码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbEmployerPhone",
            "Value": 645382
        }, {
            "ColumnName": "以往单位1职务名称[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbJobTitle",
            "Value": "Developer"
        }, {
            "ColumnName": "以往单位1主管姓氏[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbSupervisorSurname",
            "Value": "Zhao"
        }, {
            "ColumnName": "以往单位1主管姓氏未知的",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_cbxSupervisorSurname_NA",
            "Value": "False"
        }, {
            "ColumnName": "以往单位1主管名字[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbSupervisorGivenName",
            "Value": "Ma"
        }, {
            "ColumnName": "以往单位1主管名字未知",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_cbxSupervisorGivenName_NA",
            "Value": "False"
        }, {
            "ColumnName": "以往单位1工作开始日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_ddlEmpDateFromDay",
            "Value": "6"
        }, {
            "ColumnName": "以往单位1工作开始日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_ddlEmpDateFromMonth",
            "Value": "8"
        }, {
            "ColumnName": "以往单位1工作开始日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbxEmpDateFromYear",
            "Value": "2008"
        }, {
            "ColumnName": "以往单位1工作结束日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_ddlEmpDateToDay",
            "Value": "2"
        }, {
            "ColumnName": "以往单位1工作结束日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_ddlEmpDateToMonth",
            "Value": "3"
        }, {
            "ColumnName": "以往单位1工作结束日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbxEmpDateToYear",
            "Value": "2011"
        }, {
            "ColumnName": "以往单位1请简要描述您的工作职责：[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl00_tbDescribeDuties",
            "Value": "Green Olympic I me mobile phone spam of large number of bargain Alonso saw me ah uro"
        }, {
            "ColumnName": "以往单位2名称[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_tbEmployerName",
            "Value": "Ctrip"
        }, {
            "ColumnName": "以往单位2街道地址（第一行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_tbEmployerStreetAddress1",
            "Value": "FuChuan Road"
        }, {
            "ColumnName": "以往单位2街道地址（第二行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_tbEmployerStreetAddress2",
            "Value": "ChangNing area"
        }, {
            "ColumnName": "以往单位2城市[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_tbEmployerCity",
            "Value": "ShangHai"
        }, {
            "ColumnName": "以往单位2州/省份[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_tbxPREV_EMPL_ADDR_STATE",
            "Value": "ShangHai"
        }, {
            "ColumnName": "以往单位2州/省份不适用",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_cbxPREV_EMPL_ADDR_STATE_NA",
            "Value": "False"
        }, {
            "ColumnName": "以往单位2邮政区域/邮政编码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_tbxPREV_EMPL_ADDR_POSTAL_CD",
            "Value": "200231"
        }, {
            "ColumnName": "以往单位2邮政区域/邮政编码不适用",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_cbxPREV_EMPL_ADDR_POSTAL_CD_NA",
            "Value": "False"
        }, {
            "ColumnName": "以往单位2国家/地区[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_DropDownList2",
            "Value": "CHIN"
        }, {
            "ColumnName": "以往单位2电话号码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_tbEmployerPhone",
            "Value": "377334"
        }, {
            "ColumnName": "以往单位2职务名称[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_tbJobTitle",
            "Value": "Technical director"
        }, {
            "ColumnName": "以往单位2主管姓氏[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_tbSupervisorSurname",
            "Value": "Zhou"
        }, {
            "ColumnName": "以往单位2主管姓氏未知的",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_cbxSupervisorSurname_NA",
            "Value": "False"
        }, {
            "ColumnName": "以往单位2主管名字[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_tbSupervisorGivenName",
            "Value": "Sansan"
        }, {
            "ColumnName": "以往单位2主管名字未知",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_cbxSupervisorGivenName_NA",
            "Value": "False"
        }, {
            "ColumnName": "以往单位2工作开始日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_ddlEmpDateFromDay",
            "Value": "3"
        }, {
            "ColumnName": "以往单位2工作开始日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_ddlEmpDateFromMonth",
            "Value": "6"
        }, {
            "ColumnName": "以往单位2工作开始日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_tbxEmpDateFromYear",
            "Value": "2011"
        }, {
            "ColumnName": "以往单位2工作结束日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_ddlEmpDateToDay",
            "Value": "2"
        }, {
            "ColumnName": "以往单位2工作结束日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_ddlEmpDateToMonth",
            "Value": "3"
        }, {
            "ColumnName": "以往单位2工作结束日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_tbxEmpDateToYear",
            "Value": "2014"
        }, {
            "ColumnName": "以往单位2请简要描述您的工作职责：[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEmpl_ctl01_tbDescribeDuties",
            "Value": "May be appropriate to forget I and I uiosdjfoisj the amount of Ascoli Jiefang Road"
        }, {
            "ColumnName": "您是否在任何相当于中学水平或以上的教育机构里学习过？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblOtherEduc_0",
            "Value": "True"
        }, {
            "ColumnName": "以往教育机构1名称[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_tbxSchoolName",
            "Value": "CJ UN"
        }, {
            "ColumnName": "以往教育机构1街道地址（第一行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_tbxSchoolAddr1",
            "Value": "XiMen Road"
        }, {
            "ColumnName": "以往教育机构1街道地址（第二行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_tbxSchoolAddr2",
            "Value": ""
        }, {
            "ColumnName": "以往教育机构1城市[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_tbxSchoolCity",
            "Value": "Hangzhou"
        }, {
            "ColumnName": "以往教育机构1州/省份[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_tbxEDUC_INST_ADDR_STATE",
            "Value": "Zhejiang"
        }, {
            "ColumnName": "以往教育机构1州/省份不适用",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_cbxEDUC_INST_ADDR_STATE_NA",
            "Value": "False"
        }, {
            "ColumnName": "以往教育机构1邮政区域/邮政编码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_tbxEDUC_INST_POSTAL_CD",
            "Value": "200234"
        }, {
            "ColumnName": "以往教育机构1邮政区域/邮政编码不适用",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_cbxEDUC_INST_POSTAL_CD_NA",
            "Value": "False"
        }, {
            "ColumnName": "以往教育机构1国家/地区[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_ddlSchoolCountry",
            "Value": "CHIN"
        }, {
            "ColumnName": "以往教育机构1课程[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_tbxSchoolCourseOfStudy",
            "Value": "Computer"
        }, {
            "ColumnName": "以往教育机构1就读开始日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_ddlSchoolFromDay",
            "Value": "1"
        }, {
            "ColumnName": "以往教育机构1就读开始日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_ddlSchoolFromMonth",
            "Value": "9"
        }, {
            "ColumnName": "以往教育机构1就读开始日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_tbxSchoolFromYear",
            "Value": "2000"
        }, {
            "ColumnName": "以往教育机构1就读结束日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_ddlSchoolToDay",
            "Value": "1"
        }, {
            "ColumnName": "以往教育机构1就读结束日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_ddlSchoolToMonth",
            "Value": "7"
        }, {
            "ColumnName": "以往教育机构1就读结束日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_tbxSchoolToYear",
            "Value": "2004"
        }, {
            "ColumnName": "以往教育机构2名称[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl01_tbxSchoolName",
            "Value": "Hangzhou University"
        }, {
            "ColumnName": "以往教育机构2街道地址（第一行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl01_tbxSchoolAddr1",
            "Value": "Zhdin Road"
        }, {
            "ColumnName": "以往教育机构2街道地址（第二行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl01_tbxSchoolAddr2",
            "Value": "XiHu"
        }, {
            "ColumnName": "以往教育机构2城市[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl01_tbxSchoolCity",
            "Value": "Hangzhou"
        }, {
            "ColumnName": "以往教育机构2州/省份[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl01_tbxEDUC_INST_ADDR_STATE",
            "Value": "Zhejiang"
        }, {
            "ColumnName": "以往教育机构2州/省份不适用",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl01_cbxEDUC_INST_ADDR_STATE_NA",
            "Value": "False"
        }, {
            "ColumnName": "以往教育机构2邮政区域/邮政编码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl01_tbxEDUC_INST_POSTAL_CD",
            "Value": "300316"
        }, {
            "ColumnName": "以往教育机构2邮政区域/邮政编码不适用",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl01_cbxEDUC_INST_POSTAL_CD_NA",
            "Value": "False"
        }, {
            "ColumnName": "以往教育机构2国家/地区[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl01_ddlSchoolCountry",
            "Value": "CHIN"
        }, {
            "ColumnName": "以往教育机构2课程[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl01_tbxSchoolCourseOfStudy",
            "Value": "Mathematics"
        }, {
            "ColumnName": "以往教育机构2就读开始日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl01_ddlSchoolFromDay",
            "Value": "1"
        }, {
            "ColumnName": "以往教育机构2就读开始日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl01_ddlSchoolFromMonth",
            "Value": "9"
        }, {
            "ColumnName": "以往教育机构2就读开始日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl01_tbxSchoolFromYear",
            "Value": "2005"
        }, {
            "ColumnName": "以往教育机构2就读结束日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl01_ddlSchoolToDay",
            "Value": "1"
        }, {
            "ColumnName": "以往教育机构2就读结束日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl01_ddlSchoolToMonth",
            "Value": "7"
        }, {
            "ColumnName": "以往教育机构2就读结束日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl01_tbxSchoolToYear",
            "Value": "2008"
        }, {
            "ColumnName": "以往教育机构3名称[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl02_tbxSchoolName",
            "Value": ""
        }, {
            "ColumnName": "以往教育机构3街道地址（第一行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl02_tbxSchoolAddr1",
            "Value": ""
        }, {
            "ColumnName": "以往教育机构3街道地址（第二行）[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl02_tbxSchoolAddr2",
            "Value": ""
        }, {
            "ColumnName": "以往教育机构3城市[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl02_tbxSchoolCity",
            "Value": ""
        }, {
            "ColumnName": "以往教育机构3州/省份[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl02_tbxEDUC_INST_ADDR_STATE",
            "Value": ""
        }, {
            "ColumnName": "以往教育机构3州/省份不适用",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl02_cbxEDUC_INST_ADDR_STATE_NA",
            "Value": "False"
        }, {
            "ColumnName": "以往教育机构3邮政区域/邮政编码",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl02_tbxEDUC_INST_POSTAL_CD",
            "Value": ""
        }, {
            "ColumnName": "以往教育机构3邮政区域/邮政编码不适用",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl02_cbxEDUC_INST_POSTAL_CD_NA",
            "Value": "False"
        }, {
            "ColumnName": "以往教育机构3国家/地区[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl02_ddlSchoolCountry",
            "Value": ""
        }, {
            "ColumnName": "以往教育机构3课程[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl02_tbxSchoolCourseOfStudy",
            "Value": ""
        }, {
            "ColumnName": "以往教育机构3就读开始日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl02_ddlSchoolFromDay",
            "Value": "1"
        }, {
            "ColumnName": "以往教育机构3就读开始日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl02_ddlSchoolFromMonth",
            "Value": "1"
        }, {
            "ColumnName": "以往教育机构3就读开始日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl02_tbxSchoolFromYear",
            "Value": "1"
        }, {
            "ColumnName": "以往教育机构3就读结束日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl02_ddlSchoolToDay",
            "Value": "1"
        }, {
            "ColumnName": "以往教育机构3就读结束日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl02_ddlSchoolToMonth",
            "Value": "1"
        }, {
            "ColumnName": "以往教育机构3就读结束日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl02_tbxSchoolToYear",
            "Value": "2005"
        }, {
            "ColumnName": "添加按钮",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlPrevEduc_ctl00_InsertButtonPrevEduc",
            "Value": ""
        }]
    }]
};
var WorkEducation12 = {
    "Country": "美国",
    "Pages": [{
        "PageName": "其他工作/教育/培训",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_workeducation3.aspx?node=WorkEducation3",
        "Values": [{
            "ColumnName": "您是否属于一个宗族或者部落？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblCLAN_TRIBE_IND_0",
            "Value": "True"
        }, {
            "ColumnName": "宗族或者部落名称[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxCLAN_TRIBE_NAME",
            "Value": "Clan or tribe name"
        }, {
            "ColumnName": "语言名字[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlLANGUAGES_ctl00_tbxLANGUAGE_NAME",
            "Value": "Mastery of the language"
        }, {
            "ColumnName": "最近五年里您是否去过其他国家？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblCOUNTRIES_VISITED_IND_1",
            "Value": "False"
        }, {
            "ColumnName": "请列出您访问过的国家[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlCountriesVisited_ctl00_ddlCOUNTRIES_VISITED",
            "Value": "In the past five years, have you been to other countries"
        }, {
            "ColumnName": "您是否从属于任何一个专业的、社会或慈善组织？并为其做过贡献、或为其工作过？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblORGANIZATION_IND_1",
            "Value": "False"
        }, {
            "ColumnName": "机构名称[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlORGANIZATIONS_ctl00_tbxORGANIZATION_NAME",
            "Value": "Whether you from any part of a professional, social or charitable organization? And for its made a contribution, or for the work"
        }, {
            "ColumnName": "您是否具有特殊技能或接受过特殊培训，例如有关枪械、炸药、 核装置、 生物或化学方面的经验？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblSPECIALIZED_SKILLS_IND_0",
            "Value": "True"
        }, {
            "ColumnName": "您是否具有特殊技能或接受过特殊培训，例如有关枪械、炸药、 核装置、 生物或化学方面的经验？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxSPECIALIZED_SKILLS_EXPL",
            "Value": "Chemical experience"
        }, {
            "ColumnName": "您是否曾经在军队服役？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblMILITARY_SERVICE_IND_0",
            "Value": "True"
        }, {
            "ColumnName": "服役国家/地区名称[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_SERVICE_ctl00_ddlMILITARY_SVC_CNTRY",
            "Value": "CHIN"
        }, {
            "ColumnName": "服役军种[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_SERVICE_ctl00_tbxMILITARY_SVC_BRANCH",
            "Value": "Service service 2"
        }, {
            "ColumnName": "服役级别/职位[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_SERVICE_ctl00_tbxMILITARY_SVC_RANK",
            "Value": "Rank / position 3"
        }, {
            "ColumnName": "服役军事特长[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_SERVICE_ctl00_tbxMILITARY_SVC_SPECIALTY",
            "Value": "Military skills 4"
        }, {
            "ColumnName": "服役开始日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_SERVICE_ctl00_ddlMILITARY_SVC_FROMDay",
            "Value": "2"
        }, {
            "ColumnName": "服役开始日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_SERVICE_ctl00_ddlMILITARY_SVC_FROMMonth",
            "Value": "1"
        }, {
            "ColumnName": "服役开始日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_SERVICE_ctl00_tbxMILITARY_SVC_FROMYear",
            "Value": "2000"
        }, {
            "ColumnName": "服役结束日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_SERVICE_ctl00_ddlMILITARY_SVC_TODay",
            "Value": "5"
        }, {
            "ColumnName": "服役结束日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_SERVICE_ctl00_ddlMILITARY_SVC_TOMonth",
            "Value": "4"
        }, {
            "ColumnName": "服役结束日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_dtlMILITARY_SERVICE_ctl00_tbxMILITARY_SVC_TOYear",
            "Value": "2003"
        }, {
            "ColumnName": "你是否曾经服务于或参与过准军事性单位、治安团体、造反组织、游击队或暴动组织，或曾经是其成员之一？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblINSURGENT_ORG_IND_0",
            "Value": "True"
        }, {
            "ColumnName": "你是否曾经服务于或参与过准军事性单位、治安团体、造反组织、游击队或暴动组织，或曾经是其成员之一？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxINSURGENT_ORG_EXPL",
            "Value": "The testing organization 0"
        }]
    }]
};

var SecurityandBackground1 = {
    "Country": "美国",
    "Pages": [{
        "PageName": "安全和背景 PART1",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_securityandbackground1.aspx?node=SecurityandBackground1",
        "Values": [{
            "ColumnName": "您是否患有涉及公共卫生的传染病？（按照美国卫生和公众服务部界定，涉及公共卫生的传染病包括软下疳、淋病、腹股沟肉芽肿、传染性麻风病、性病性淋巴肉芽肿，传染期梅毒，活动性肺结核等。）",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblDisease_0",
            "Value": "True"
        }, {
            "ColumnName": "您是否患有涉及公共卫生的传染病？（按照美国卫生和公众服务部界定，涉及公共卫生的传染病包括软下疳、淋病、腹股沟肉芽肿、传染性麻风病、性病性淋巴肉芽肿，传染期梅毒，活动性肺结核等。）说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxDisease",
            "Value": "If you have related to public health infectious disease"
        }, {
            "ColumnName": "您是否患有对其他人的人身安全及利益造成威胁的精神或身体疾病？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblDisorder_0",
            "Value": "True"
        }, {
            "ColumnName": "您是否患有对其他人的人身安全及利益造成威胁的精神或身体疾病？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxDisorder",
            "Value": "Do you have a safety and interests of other people who pose a threat of mental or physical disease"
        }, {
            "ColumnName": "您是否或曾经滥用药物并上瘾？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblDruguser_0",
            "Value": "True"
        }, {
            "ColumnName": "您是否或曾经滥用药物并上瘾？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxDruguser",
            "Value": "If you are or have substance abuse and addiction"
        }]
    }]
};

var SecurityandBackground2 = {
    "Country": "美国",
    "Pages": [{
        "PageName": "安全和背景PART2",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_securityandbackground2.aspx?node=SecurityandBackground2",
        "Values": [{
            "ColumnName": "您是否曾经因违法或犯罪被捕或被判刑，即使后来您受到了宽恕、赦免或其它类似的裁决？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblArrested_0",
            "Value": "True"
        }, {
            "ColumnName": "您是否曾经因违法或犯罪被捕或被判刑，即使后来您受到了宽恕、赦免或其它类似的裁决？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxArrested",
            "Value": "Have you ever due to illegal or criminal arrested or convicted, even if later you have forgiveness, forgiveness or other similar action? English explanation []"
        }, {
            "ColumnName": "您是否曾经违反或密谋违反有关管控物资方面的法律？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblControlledSubstances_0",
            "Value": "True"
        }, {
            "ColumnName": "您是否曾经违反或密谋违反有关管控物资方面的法律？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxControlledSubstances",
            "Value": "Have you ever violate or plotting in violation of the relevant control material aspects of the law"
        }, {
            "ColumnName": "您是来美国从事卖淫或非法商业性交易吗？在过去十年中，您是否从事过卖淫或组织介绍过卖淫？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblProstitution_0",
            "Value": "True"
        }, {
            "ColumnName": "您是来美国从事卖淫或非法商业性交易吗？在过去十年中，您是否从事过卖淫或组织介绍过卖淫？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxProstitution",
            "Value": "Are you engaged in prostitution or illegal business transactions USA? In the past ten years, whether or not you engaged in prostitution or presents organized prostitution"
        }, {
            "ColumnName": "您是否曾经参与或意图从事洗钱活动？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblMoneyLaundering_0",
            "Value": "True"
        }, {
            "ColumnName": "您是否曾经参与或意图从事洗钱活动？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxMoneyLaundering",
            "Value": "Have you ever participated in or intent to engage in money laundering activities"
        }, {
            "ColumnName": "您曾在美国或美国以外的地方犯有或密谋人口走私罪吗？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblHumanTrafficking_0",
            "Value": "True"
        }, {
            "ColumnName": "您曾在美国或美国以外的地方犯有或密谋人口走私罪吗？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxHumanTrafficking",
            "Value": "You have committed the crime of smuggling or plotting population American or USA outside it"
        }, {
            "ColumnName": "你有没有故意资助，教唆，协助或勾结某个人，而这个人在美国或美国以外的地方曾犯有、或密谋了一严重的人口走私案？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblAssistedSevereTrafficking_0",
            "Value": "True"
        }, {
            "ColumnName": "你有没有故意资助，教唆，协助或勾结某个人，而这个人在美国或美国以外的地方曾犯有、或密谋了一严重的人口走私案？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxAssistedSevereTrafficking",
            "Value": "Did you deliberately abetting, assisting or funding, collusion with someone, and this person has been guilty of, in America or American outside or plotting a severe population smuggling case"
        }, {
            "ColumnName": "您是一曾在美国或美国以外犯有或密谋人口走私案犯的配偶或儿女吗？您在最近5年里是否从走私活动中获得过好处？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblHumanTraffickingRelated_0",
            "Value": "True"
        }, {
            "ColumnName": "您是一曾在美国或美国以外犯有或密谋人口走私案犯的配偶或儿女吗？您在最近5年里是否从走私活动中获得过好处？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxHumanTraffickingRelated",
            "Value": "You are a once in America or America outside or people smuggling criminal guilty of plotting a spouse or children? Whether you are in the last 5 years from smuggling activities benefited"
        }]
    }]
};

var SecurityandBackground3 = {
    "Country": "美国",
    "Pages": [{
        "PageName": "安全和背景 PART3",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_securityandbackground3.aspx?node=SecurityandBackground3",
        "Values": [{
            "ColumnName": "在美国期间，您是否意图从事间谍活动、阴谋破坏、违反出口管制条例或其他任何非法活动？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblIllegalActivity_0",
            "Value": "True"
        }, {
            "ColumnName": "在美国期间，您是否意图从事间谍活动、阴谋破坏、违反出口管制条例或其他任何非法活动？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxIllegalActivity",
            "Value": "In American period, do you seek to engage in espionage, sabotage, export control violations or any other illegal activity"
        }, {
            "ColumnName": "在美国期间，您是否意图从事恐怖活动？或您是否曾经从事过恐怖活动？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblTerroristActivity_0",
            "Value": "True"
        }, {
            "ColumnName": "在美国期间，您是否意图从事恐怖活动？或您是否曾经从事过恐怖活动？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxTerroristActivity",
            "Value": "In American period, do you seek to engage in terrorist activities? Or have you ever engaged in terrorist activities"
        }, {
            "ColumnName": "您是否曾经或计划为恐怖分子或恐怖组织提供经济或其它方面的支持？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblTerroristSupport_0",
            "Value": "True"
        }, {
            "ColumnName": "您是否曾经或计划为恐怖分子或恐怖组织提供经济或其它方面的支持？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxTerroristSupport",
            "Value": "Whether you have or plan to provide economic or other support to terrorists or terrorist organizations"
        }, {
            "ColumnName": "您是否是一恐怖组织的成员或代表？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblTerroristOrg_0",
            "Value": "True"
        }, {
            "ColumnName": "您是否是一恐怖组织的成员或代表？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxTerroristOrg",
            "Value": "Whether you are a member or representative of a terrorist organization."
        }, {
            "ColumnName": "您是否曾经指使、煽动、从事、协助或参与了过种族灭绝大屠杀？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblGenocide_0",
            "Value": "True"
        }, {
            "ColumnName": "您是否曾经指使、煽动、从事、协助或参与了过种族灭绝大屠杀？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxGenocide",
            "Value": "Have you ever ordered, incited, engaged in, assist or participated in over genocide"
        }, {
            "ColumnName": "您是否曾经从事、指使、煽动、协助或以其他方式参与了刑讯？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblTorture_0",
            "Value": "True"
        }, {
            "ColumnName": "您是否曾经从事、指使、煽动、协助或以其他方式参与了刑讯？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxTorture",
            "Value": "Have you ever engaged in, ordered, incited, assist or otherwise participated in torture"
        }, {
            "ColumnName": "您是否曾经从事、指使、煽动、协助或参与了法庭外的杀戮、政治谋杀或者其他暴力行为？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblExViolence_0",
            "Value": "True"
        }, {
            "ColumnName": "您是否曾经从事、指使、煽动、协助或参与了法庭外的杀戮、政治谋杀或者其他暴力行为？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxExViolence",
            "Value": "Have you ever engaged in, incite, instigate, help or participate in the killings, political killings out of court or other acts of violence"
        }, {
            "ColumnName": "你曾经从事过招募士兵或利用儿童士兵吗？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblChildSoldier_0",
            "Value": "True"
        }, {
            "ColumnName": "你曾经从事过招募士兵或利用儿童士兵吗？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxChildSoldier",
            "Value": "You have engaged in the recruitment of soldiers or the use of child soldiers do"
        }, {
            "ColumnName": "在担任政府官员期间，您是否曾经负责或直接执行过严重违反宗教自由的行动？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblReligiousFreedom_0",
            "Value": "True"
        }, {
            "ColumnName": "在担任政府官员期间，您是否曾经负责或直接执行过严重违反宗教自由的行动？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxReligiousFreedom",
            "Value": "While serving as a government official, whether or not you been responsible for or directly carried out severe violations of religious freedom"
        }, {
            "ColumnName": "您曾经直接参与过制定或执行人口控制的规定,强迫妇女或男士违愿进行人流或绝育吗?",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblPopulationControls_0",
            "Value": "True"
        }, {
            "ColumnName": "您曾经直接参与过制定或执行人口控制的规定,强迫妇女或男士违愿进行人流或绝育吗?说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxPopulationControls",
            "Value": "You have directly participated in the formulation or implementation of provisions of population control, forcing women or men wish abortion or sterilization:"
        }, {
            "ColumnName": "您是否直接参与过强迫人体器官及人体组织的移植？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblTransplant_0",
            "Value": "True"
        }, {
            "ColumnName": "您是否直接参与过强迫人体器官及人体组织的移植？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxTransplant",
            "Value": "Whether you are directly involved in the human organ and forced human tissue transplantation"
        }]
    }]
};

var SecurityandBackground4 = {
    "Country": "美国",
    "Pages": [{
        "PageName": "安全和背景PART4",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_securityandbackground4.aspx?node=SecurityandBackground4",
        "Values": [{
            "ColumnName": "您是否曾经试图以欺骗或故意造假及其他非法手段为自己，或帮助他人获取美国签证，入境美国或获取任何其他移民福利？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblImmigrationFraud_0",
            "Value": "True"
        }, {
            "ColumnName": "您是否曾经试图以欺骗或故意造假及其他非法手段为自己，或帮助他人获取美国签证，入境美国或获取任何其他移民福利？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxImmigrationFraud",
            "Value": "Have you ever tried to deceive or willful misrepresentation or other unlawful means for yourself, or help others get American visa, immigration USA or obtain any other immigration benefits"
        }]
    }]
};

var SecurityandBackground5 = {
    "Country": "美国",
    "Pages": [{
        "PageName": "安全和背景 PART5",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_securityandbackground5.aspx?node=SecurityandBackground5",
        "Values": [{
            "ColumnName": "您是否曾经拒绝将一在美国境外的美籍儿童的监护权移交给一被美国法庭批准享有法定监护权的人？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblChildCustody_0",
            "Value": "True"
        }, {
            "ColumnName": "您是否曾经拒绝将一在美国境外的美籍儿童的监护权移交给一被美国法庭批准享有法定监护权的人？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxChildCustody",
            "Value": "Have you ever been refused to hand over guardianship in USA overseas American children to be USA a court approved enjoy legal custody of the people"
        }, {
            "ColumnName": "您是否违反了法律或规定在美国进行过投票选举？",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblVotingViolation_0",
            "Value": "True"
        }, {
            "ColumnName": "您是否违反了法律或规定在美国进行过投票选举？说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxVotingViolation",
            "Value": "If you violate the law or the provisions of a vote in elections in USA"
        }, {
            "ColumnName": "您是否曾为逃避交税而声明放弃美国公民身份?",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_rblRenounceExp_0",
            "Value": "True"
        }, {
            "ColumnName": "您是否曾为逃避交税而声明放弃美国公民身份?说明[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxRenounceExp",
            "Value": "Have you ever for tax evasion and renounce America citizenship"
        }]
    }]
};

var DeceasedSpouse10 = {
    "Country": "美国",
    "Pages": [{
        "PageName": "家庭信息-已故配偶信息",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_family5.aspx?node=DeceasedSpouse",
        "Values": [{
            "ColumnName": "已故配偶姓氏[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxSURNAME",
            "Value": "li"
        }, {
            "ColumnName": "已故配偶名字[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxGIVEN_NAME",
            "Value": "mochou"
        }, {
            "ColumnName": "已故配偶出生日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlDOBDay",
            "Value": "3"
        }, {
            "ColumnName": "已故配偶出生日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlDOBMonth",
            "Value": "4"
        }, {
            "ColumnName": "已故配偶出生日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxDOBYear",
            "Value": "1984"
        }, {
            "ColumnName": "已故配偶所属国家[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlSpouseNatDropDownList",
            "Value": "CHIN"
        }, {
            "ColumnName": "已故配偶出生城市[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxSpousePOBCity",
            "Value": "BeiJing"
        }, {
            "ColumnName": "已故配偶出生城市未知的",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_cbxSPOUSE_POB_CITY_NA",
            "Value": "True"
        }, {
            "ColumnName": "已故配偶出生国家[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_ddlSpousePOBCountry",
            "Value": "CHIN"
        }]
    }]
};

var PrevSpouse10 = {
    "Country": "美国",
    "Pages": [{
        "PageName": "家庭信息-前配偶信息",
        "PageUrl": "https://ceac.state.gov/GenNIV/General/complete/complete_family4.aspx?node=PrevSpouse",
        "Values": [{
            "ColumnName": "前配偶数量",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_tbxNumberOfPrevSpouses",
            "Value": "1"
        }, {
            "ColumnName": "前配偶姓氏[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_tbxSURNAME",
            "Value": "Qian"
        }, {
            "ColumnName": "前配偶名字[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_tbxGIVEN_NAME",
            "Value": "yigupei"
        }, {
            "ColumnName": "前配偶出生日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_ddlDOBDay",
            "Value": "4"
        }, {
            "ColumnName": "前配偶出生日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_ddlDOBMonth",
            "Value": "6"
        }, {
            "ColumnName": "前配偶出生日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_tbxDOBYear",
            "Value": "1983"
        }, {
            "ColumnName": "前配偶所属国家[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_ddlSpouseNatDropDownList",
            "Value": "CHIN"
        }, {
            "ColumnName": "前配偶出生城市[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_tbxSpousePOBCity",
            "Value": "Shanghai"
        }, {
            "ColumnName": "前配偶出生城市未知的",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_cbxSPOUSE_POB_CITY_NA",
            "Value": "False"
        }, {
            "ColumnName": "前配偶出生国家[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_ddlSpousePOBCountry",
            "Value": "CHIN"
        }, {
            "ColumnName": "前配偶结婚日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_ddlDomDay",
            "Value": "7"
        }, {
            "ColumnName": "前配偶结婚日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_ddlDomMonth",
            "Value": "8"
        }, {
            "ColumnName": "前配偶结婚日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_txtDomYear",
            "Value": "2003"
        }, {
            "ColumnName": "前配偶婚姻终止日期-日",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_ddlDomEndDay",
            "Value": "9"
        }, {
            "ColumnName": "前配偶婚姻终止日期-月",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_ddlDomEndMonth",
            "Value": "11"
        }, {
            "ColumnName": "前配偶婚姻终止日期-年",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_txtDomEndYear",
            "Value": "2010"
        }, {
            "ColumnName": "前配偶婚姻怎样终止的[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_tbxHowMarriageEnded",
            "Value": "The divorce reasons"
        }, {
            "ColumnName": "前配偶-婚姻终止-所在的国家[英文]",
            "FormId": "ctl00_SiteContentPlaceHolder_FormView1_DListSpouse_ctl00_ddlMarriageEnded_CNTRY",
            "Value": "IOT"
        }]
    }]
};

var SignCertify14 = {
  "Country": "美国",
  "Pages": [{
    "PageName": "SignCertify",
    "PageUrl": "https://ceac.state.gov/GenNIV/General/esign/signtheapplication.aspx?node=SignCertify",
    "Values": [{
      "ColumnName": "是否有任何人协助您填写申请？",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView3_rblPREP_IND_0",
      "Value": "True"
    }, {
      "ColumnName": "姓氏",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView3_tbxPREP_SURNAME",
      "Value": "zhang"
    }, {
      "ColumnName": "名字",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView3_tbxPREP_GIVEN_NAME",
      "Value": "ding"
    }, {
      "ColumnName": "姓名是否不适用",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView3_cbxPREP_NAME_NA",
      "Value": "True"
    }, {
      "ColumnName": "机构名称",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView3_tbxPREP_ORGANIZATION",
      "Value": "SH CTRIP INTL TRAVEL SERVICE CO"
    }, {
      "ColumnName": "机构名称不适用的",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView3_cbxPREP_ORG_NA",
      "Value": "False"
    }, {
      "ColumnName": "街道地址（第一行）",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView3_tbxPREP_ADDR_LN1",
      "Value": "NO 99 FUQUAN RD"
    }, {
      "ColumnName": "街道地址（第二行）",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView3_tbxPREP_ADDR_LN2",
      "Value": "NO 99 FUQUAN RD 222"
    }, {
      "ColumnName": "城市",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView3_tbxPREP_ADDR_CITY",
      "Value": "SHANGHAI"
    }, {
      "ColumnName": "州/省份",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView3_tbxPREP_ADDR_STATE",
      "Value": "SHANGHAI"
    }, {
      "ColumnName": "州/省份 不适用的",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView3_cbxPREP_ADDR_STATE_NA",
      "Value": "True"
    }, {
      "ColumnName": "邮政区域/邮政编码",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView3_tbxPREP_ADDR_POSTAL_CD",
      "Value": "200335"
    }, {
      "ColumnName": "邮政区域/邮政编码 不适用的",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView3_cbxPREP_ADDR_POSTAL_CD_NA",
      "Value": "True"
    }, {
      "ColumnName": "国家/地区",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView3_ddlCountry",
      "Value": "CHIN"
    }, {
      "ColumnName": "与您的关系",
      "FormId": "ctl00_SiteContentPlaceHolder_FormView3_tbxPREP_REL_TO_APP",
      "Value": "AGENT"
    }, {
      "ColumnName": "输入您护照/旅行证件的号码",
      "FormId": "ctl00_SiteContentPlaceHolder_PPTNumTbx",
      "Value": "88888888888888"
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
        case 'TravelCompanions':
            sendData = TravelCompanions6;
            break;
        case 'PreviousUSTravel':
            sendData = PreviousUSTravel7;
            break;
        case 'USContact':
            sendData = USContact8;
            break;
        case 'Relatives':
            sendData = Relatives9;
            break;
        case 'Spouse':
            sendData = Spouse9;
            break;
        case 'DeceasedSpouse':
            sendData = DeceasedSpouse10;
            break;
        case 'PrevSpouse':
            sendData = PrevSpouse10;
            break;
        case 'WorkEducation1':
            sendData = WorkEducation10;
            break;
        case 'WorkEducation2':
            sendData = WorkEducation11;
            break;
        case 'WorkEducation3':
            sendData = WorkEducation12;
            break;
        case 'SecurityandBackground1':
            sendData = SecurityandBackground1;
            break;
        case 'SecurityandBackground2':
            sendData = SecurityandBackground2;
            break;
        case 'SecurityandBackground3':
            sendData = SecurityandBackground3;
            break;
        case 'SecurityandBackground4':
            sendData = SecurityandBackground4;
            break;
        case 'SecurityandBackground5':
            sendData = SecurityandBackground5;
            break;
        case 'SignCertify':
            sendData = SignCertify14;
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