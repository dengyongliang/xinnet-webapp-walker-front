webpackJsonp([16],{"7or1":function(a,e){},NXUq:function(a,e){},"XwY+":function(a,e){},mWpW:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=t("Dd8w"),i=t.n(s),n=t("NYxO"),l=t("5reh"),r=t("5GVD"),o={name:"compDomainChangeDetail",components:{},props:{detailData:{type:Object,default:function(){return{data:[]}}}},data:function(){return{}},methods:{},beforeMount:function(){},mounted:function(){},computed:{}},c={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"changeDetail"},[t("div",{staticClass:"domainName"},[t("h2",[a._v(a._s(a.detailData.domainName))]),t("strong",[a._v("过户状态："),3===a.detailData.changeStatus?t("em",{staticStyle:{color:"#f00"}},[a._v("过户失败")]):a._e(),1===a.detailData.changeStatus?t("em",{staticStyle:{color:"#44a500"}},[a._v("审核中")]):a._e(),2===a.detailData.changeStatus?t("em",{staticStyle:{color:"#44a500"}},[a._v("过户完成")]):a._e(),0===a.detailData.changeStatus?t("em",{staticStyle:{color:"#aaa"}},[a._v("待过户")]):a._e()]),3===a.detailData.changeStatus?t("p",[a._v("失败原因 ："+a._s(a.detailData.changeFaildReason))]):a._e()]),t("div",{staticClass:"domainInfo"},[t("Row",[t("Col",{attrs:{span:"12"}},[t("strong",[a._v("变更后域名所有者信息")]),3===a.detailData.changeStatus?t("div",{staticClass:"realname"},[t("p",{staticClass:"reason"},[a._v("失败原因 ："+a._s(a.detailData.changeFaildReason))])]):a._e(),t("ul",[t("li",[a._v("域名持有者名称（中文）："+a._s(a.detailData.newOrganizeNameCn))]),t("li",[a._v("域名持有者名称（英文）："+a._s(a.detailData.newOrganizeNameUk))]),t("li",[a._v("域名联系人（中文）："+a._s(a.detailData.newUserNameCn))]),t("li",[a._v("域名联系人（英文）："+a._s(a.detailData.newUserNameUk))]),t("li",[a._v("所属区域："+a._s(a.detailData.newPublicCountryCn+"-"+a.detailData.newPublicCityCn+"-"+a.detailData.newPublicProvinceCn))]),t("li",[a._v("通讯地址（中文）："+a._s(a.detailData.newPublicStreetCn))]),t("li",[a._v("通讯地址（英文）："+a._s(a.detailData.newPublicStreetUk))]),t("li",[a._v("邮政编码："+a._s(a.detailData.newPublicZipCode))]),t("li",[a._v("电子邮件："+a._s(a.detailData.newUserEmail))]),t("li",[a._v("电话："+a._s((a.detailData.newUserPhoneInter&&a.detailData.newUserPhoneInter.length>0?a.detailData.newUserPhoneInter+"-":"")+(a.detailData.newUserPhoneArea&&a.detailData.newUserPhoneArea.length>0?a.detailData.newUserPhoneArea+"-":"")+a.detailData.newUserPhoneNumber))]),t("li",[a._v("传真："+a._s((a.detailData.newUserFaxInter&&a.detailData.newUserFaxInter.length>0?a.detailData.newUserFaxInter+"-":"")+(a.detailData.newUserFaxArea&&a.detailData.newUserFaxArea.length>0?a.detailData.newUserFaxArea+"-":"")+a.detailData.newUserFaxNumber))])])]),t("Col",{attrs:{span:"12"}},[t("strong",[a._v("原域名所有者信息")]),t("ul",[t("li",[a._v("域名持有者名称（中文）："+a._s(a.detailData.oldOrganizeNameCn))]),t("li",[a._v("域名持有者名称（英文）："+a._s(a.detailData.oldOrganizeNameUk))]),t("li",[a._v("域名联系人（中文）："+a._s(a.detailData.oldUserNameCn))]),t("li",[a._v("域名联系人（英文）："+a._s(a.detailData.oldUserNameUk))]),t("li",[a._v("所属区域："+a._s(a.detailData.oldPublicCountryCn+"-"+a.detailData.oldPublicCityCn+"-"+a.detailData.oldPublicProvinceCn))]),t("li",[a._v("通讯地址（中文）："+a._s(a.detailData.oldPublicStreetCn))]),t("li",[a._v("通讯地址（英文）："+a._s(a.detailData.oldPublicStreetUk))]),t("li",[a._v("邮政编码："+a._s(a.detailData.oldPublicZipCode))]),t("li",[a._v("电子邮件："+a._s(a.detailData.oldUserEmail))]),t("li",[a._v("电话："+a._s((a.detailData.oldUserPhoneInter&&a.detailData.oldUserPhoneInter.length>0?a.detailData.oldUserPhoneInter+"-":"")+(a.detailData.oldUserPhoneArea&&a.detailData.oldUserPhoneArea.length>0?a.detailData.oldUserPhoneArea+"-":"")+a.detailData.oldUserPhoneNumber))]),t("li",[a._v("传真："+a._s((a.detailData.oldUserFaxInter&&a.detailData.oldUserFaxInter.length>0?a.detailData.oldUserFaxInter+"-":"")+(a.detailData.oldUserFaxArea&&a.detailData.oldUserFaxArea.length>0?a.detailData.oldUserFaxArea+"-":"")+a.detailData.oldUserFaxNumber))])])])],1)],1)])},staticRenderFns:[]};var d=t("VU/8")(o,c,!1,function(a){t("7or1")},"data-v-29974d5c",null).exports,u=t("xMVD"),m=t("PJh5"),h=t.n(m),p={components:{compSelect:r.a,compDomainChange:u.a,compDomainChangeDetail:d},data:function(){var a=this;return{value:"",refresh:!1,showDetail:!1,drawerDomainChange:!1,times:[],statusList:[],detailData:{},columns:[{title:"域名",key:"domainName",className:"col1"},{title:"提交时间",key:"createTime",className:"col2"},{title:"过户时间",key:"changeTime",className:"col3"},{title:"过户状态",key:"changeStatus",className:"col4",render:function(e,t){return e("div",[e("span",{},a.DATAS.DOMAIN_CHANGE_TYPE[a.list[t.index].changeStatus])])}},{title:"操作",key:"operate",className:"operate",render:function(e,t){return e("div",[e("a",{props:{href:"javascript:;"},on:{click:function(){a.showDomainDetail(a.list[t.index].id)}}},"详情")])}}],list:[],loadingTable:!0,loadingBtn:!1,page:{pageNo:1,pagePages:1,pageItems:1}}},methods:i()({searchListData:function(){this.closeDrawer(),this.queryChangeList(this.queryListParam({pageNum:1}))},showDomainDetail:function(a){var e=this,t={param:{changeId:a},callback:function(a){if(!a)return!1;"1000"===a.data.code&&(e.detailData=a.data.data)}};this.queryChangeInfo(t),this.showDetail=!0},closeDrawer:function(){this.drawerDomainChange=!1},drawerChange:function(){},toBackList:function(){this.showDetail=!1},pageChange:function(a){this.queryChangeList(this.queryListParam({pageNum:a}))},queryListParam:function(a){var e=this;return this.page.pageNo=a.pageNum,this.loadingBtn=!0,this.loadingTable=!0,{param:{pageNum:a.pageNum,pageSize:20,domainName:this.value,changeStatus:this.$refs.changeStatus.value,createTimeBegin:""!==this.times[0]?h()(this.times[0]).format("YYYY-MM-DD")+" 00:00:00":"",createTimeEnd:""!==this.times[1]?h()(this.times[1]).format("YYYY-MM-DD")+" 23:59:59":""},callback:function(a){if(e.loadingBtn=!1,e.loadingTable=!1,!a)return!1;"1000"===a.data.code&&(e.list=a.data.data.list,e.page.pageItems=a.data.data.totalNum)}}}},Object(n.b)({queryChangeList:l.Z,queryChangeInfo:l.Y})),computed:i()({},Object(n.d)({maskClosable:function(a){return a.maskClosable}})),beforeMount:function(){},mounted:function(){this.statusList=function(a){var e=[{label:"全部",value:""}];for(var t in a.DATAS.DOMAIN_CHANGE_TYPE)e.push({label:a.DATAS.DOMAIN_CHANGE_TYPE[t],value:parseInt(t)});return e}(this),this.queryChangeList(this.queryListParam({pageNum:1}))}},D={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"contDomainChange"},[t("h1",{staticClass:"pageTitle clear"},[t("span",{staticClass:"backlist",on:{click:a.toBackList}},[a._v("域名过户")]),a._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:a.showDetail,expression:"showDetail"}]},[a._v(" > 过户详情")])]),t("div",{directives:[{name:"show",rawName:"v-show",value:!a.showDetail,expression:"!showDetail"}],staticClass:"secFilter"},[t("form",{ref:"exportForm",staticClass:"filterWrap"},[t("table",[t("tr",{staticClass:"row1"},[t("td",{staticClass:"td1"},[t("span",{staticClass:"n"},[a._v("搜索：")]),t("div",{staticClass:"inputWrap"},[t("Input",{attrs:{placeholder:"请输入域名"},model:{value:a.value,callback:function(e){a.value=e},expression:"value"}})],1)]),t("td",{staticClass:"td2"},[t("span",{staticClass:"n"},[a._v("提交时间：")]),t("div",{staticClass:"inputWrap"},[t("DatePicker",{staticStyle:{width:"100%"},attrs:{type:"daterange",placeholder:"全部",format:"yyyy-MM-dd"},on:{"on-change":function(e){a.time=e}},model:{value:a.times,callback:function(e){a.times=e},expression:"times"}})],1)]),t("td",{staticClass:"td3"},[t("span",{staticClass:"n"},[a._v("过户状态：")]),t("div",{staticClass:"inputWrap"},[t("comp-select",{ref:"changeStatus",attrs:{list:a.statusList,styles:"width:100%"}})],1)]),t("td",{staticClass:"tdBtn"},[t("Button",{attrs:{type:"primary",loading:a.loadingBtn},on:{click:a.searchListData}},[a._v("查询")]),t("Button",{attrs:{type:"primary",loading:a.loadingBtn},on:{click:function(e){a.drawerDomainChange=!0}}},[a._v("批量过户")])],1)])])])]),t("div",{directives:[{name:"show",rawName:"v-show",value:!a.showDetail,expression:"!showDetail"}],staticClass:"secMain"},[t("div",{staticClass:"secTable"},[t("Table",{attrs:{columns:a.columns,data:a.list,loading:a.loadingTable}})],1)]),t("Page",{directives:[{name:"show",rawName:"v-show",value:!a.showDetail,expression:"!showDetail"}],attrs:{total:a.page.pageItems,current:a.page.pageNo,"show-elevator":"show-elevator","show-total":"show-total","prev-text":"上一页","next-text":"下一页","page-size":20},on:{"on-change":a.pageChange}}),t("comp-domain-change-detail",{directives:[{name:"show",rawName:"v-show",value:a.showDetail,expression:"showDetail"}],attrs:{detailData:a.detailData}}),t("Drawer",{attrs:{closable:!0,width:"650",title:"提交过户","mask-closable":a.maskClosable},on:{"on-visible-change":a.drawerChange},model:{value:a.drawerDomainChange,callback:function(e){a.drawerDomainChange=e},expression:"drawerDomainChange"}},[a.drawerDomainChange?t("comp-domain-change",{attrs:{"on-close":a.closeDrawer},on:{refreshData:a.searchListData}}):a._e()],1)],1)},staticRenderFns:[]};var v=t("VU/8")(p,D,!1,function(a){t("XwY+")},"data-v-7d8927cb",null);e.default=v.exports},xMVD:function(a,e,t){"use strict";var s=t("Dd8w"),i=t.n(s),n=t("NYxO"),l=t("5reh"),r=t("XrW5"),o=t("5GVD"),c=t("naar"),d={components:{compInput:r.a,compSelect:o.a},props:{defaultValue:{type:String,default:""},onClose:{type:Function}},data:function(){return{loadingBtn:!1,templateList:[]}},methods:i()({close:function(){this.onClose()},submitForm:function(){var a=this;this.loadingBtn=!0;var e=Object(c.a)([this.$refs.domain,this.$refs.templateId]),t=this.$refs.domain.value.replace(/[\n\r]/g,",").split(",");if(t.length>100)this.$refs.domain.showValidateResult({text:"最多允许一次提交100个域名！"}),e=!1;else for(var s=0;s<t.length;s++)if(!this.GLOBALS.IS_DOMAIN_AVAILABLE(t[s])){e=!1,this.$refs.domain.showValidateResult({text:"域名格式错误！"});break}if(e){var i={param:{templateId:this.$refs.templateId.value,domainNames:this.$refs.domain.value.replace(/[\n\r]/g,",")},callback:function(e){if(a.loadingBtn=!1,!e)return!1;"1000"===e.data.code?(a.$Message.success("提交过户成功："+e.data.countSuccess+"个，失败："+e.data.countFaild+"个"),a.$emit("refreshData")):"100"===e.data.code&&a.$Message.error("模板不存在")}};this.submitChange(i)}else this.loadingBtn=!1}},Object(n.b)({submitChange:l._78,queryTemplates:l._40})),computed:{defaultValueFormat:function(){return this.defaultValue.replace(/[,，]/g,"\r\n")}},beforeMount:function(){var a=this,e={param:{},callback:function(e){if(!e)return!1;"1000"===e.data.code&&(a.templateList=a.GLOBALS.CONVERT_SELECT(e.data.data,{label:"templateName",value:"id"}))}};this.queryTemplates(e)},watch:{}},u={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"compDomainTransferIn"},[t("Alert",{staticClass:"alert1",attrs:{type:"warning","show-icon":"show-icon"}},[a._v("温馨提示："),t("Icon",{attrs:{slot:"icon",custom:"i-icon i-icon-notice_",size:"16"},slot:"icon"}),t("template",{slot:"desc"},[a._v("请将域名与转移密码用空格隔开，每行一个域名，最多可同时过户100个域名。")])],2),t("Form",[t("FormItem",{attrs:{label:""}},[t("comp-input",{ref:"domain",attrs:{name:"domain",label:"域名",type:"textarea",styles:"width:100%;",placeholder:"域名",defaultValue:a.defaultValueFormat}})],1),t("FormItem",{attrs:{label:""}},[t("span",{staticClass:"text"},[a._v("模板：")]),t("comp-select",{ref:"templateId",attrs:{name:"templateId",label:"模板",list:a.templateList}})],1),t("FormItem",{attrs:{label:""}},[t("Button",{attrs:{type:"primary",loading:a.loadingBtn},on:{click:a.submitForm}},[a._v("提交过户")])],1)],1)],1)},staticRenderFns:[]};var m=t("VU/8")(d,u,!1,function(a){t("NXUq")},null,null);e.a=m.exports}});
//# sourceMappingURL=16.1bb3db1243de615ac57c.js.map