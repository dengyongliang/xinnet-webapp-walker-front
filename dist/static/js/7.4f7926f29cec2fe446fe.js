webpackJsonp([7],{BFzG:function(t,a){},QRt5:function(t,a){},"wt+3":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("Dd8w"),s=e.n(i),n=e("NYxO"),l=e("5reh"),o=e("zhkS"),r=e("PJh5"),d=e.n(r),c={name:"compMonitorOwnDetail",components:{},props:{domainName:{type:String,default:""}},data:function(){var t=this;return{type:"",time:["",""],loadingTable:!1,loadingBtn:!1,detailData:{},exportLink:o.o,columns:[{title:"日志记录时间",width:200,key:"createTime",className:"col1"},{title:"域名",width:200,key:"domainName",className:"col2"},{title:"事件类型",width:180,key:"type",className:"col3",render:function(a,e){return a("div",[a("span",{},t.DATAS.RECORD_DOMAIN_EVENT_TYPE[t.list[e.index].type])])}},{title:"日志详情",key:"title",className:"content",render:function(a,e){return a("div",[a("Icon",{props:{type:"md-alert",size:"17"},style:{color:"#f00",margin:"0 5px 0 0",display:2===t.list[e.index].levelType?"inline-block":"none"}},""),a("span",{},t.list[e.index].content)])}}],list:[],typeList:function(t){var a=[];for(var e in t.DATAS.RECORD_DOMAIN_EVENT_TYPE)a.push({label:t.DATAS.RECORD_DOMAIN_EVENT_TYPE[e],value:e});return a}(this),page:{pageNo:1,pagePages:1,pageItems:1}}},methods:s()({searchListData:function(){this.queryDomainMonitorLog(this.getParamLog({pageNum:1}))},pageChange:function(t){},exportOrder:function(){this.$refs.exportForm.submit()},getParamDetail:function(){var t=this;return{param:{domainName:this.domainName},callback:function(a){if(t.loadingBtn=!1,t.loadingTable=!1,!a)return!1;"1000"===a.data.code&&(t.detailData=a.data.data)}}},getParamLog:function(t){var a=this;return this.page.pageNo=t.pageNum,this.loadingBtn=!0,this.loadingTable=!0,{param:{pageNum:t.pageNum,pageSize:20,domainName:this.domainName,createTimeBegin:""!==this.time[0]?d()(this.time[0]).format("YYYY-MM-DD")+" 00:00:00":"",createTimeEnd:""!==this.time[1]?d()(this.time[1]).format("YYYY-MM-DD")+" 23:59:59":"",type:this.type},callback:function(t){if(a.loadingBtn=!1,a.loadingTable=!1,!t)return!1;"1000"===t.data.code&&(a.list=t.data.data.list)}}}},Object(n.b)({queryDomainMonitorDetail:l._17,queryDomainMonitorLog:l._19})),beforeMount:function(){},mounted:function(){""!==this.domainName&&(this.queryDomainMonitorDetail(this.getParamDetail()),this.queryDomainMonitorLog(this.getParamLog({pageNum:1})))},computed:{},watch:{domainName:function(t,a){""!==t&&(this.time=["",""],this.queryDomainMonitorDetail(this.getParamDetail()),this.queryDomainMonitorLog(this.getParamLog({pageNum:1})))}}},m={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"compMonitorOwnDetail"},[e("div",{staticClass:"domainName"},[e("h2",[t._v(t._s(t.detailData.domain?t.detailData.domain.domainName:"")),e("Icon",{staticStyle:{color:"#f00"},attrs:{type:"md-star"}}),e("div",{staticClass:"time"},[t._v("更新时间："+t._s(t.detailData.domain?t.detailData.domain.modifyDate:""))])],1)]),e("div",{staticClass:"secBox secBox1"},[t._m(0),e("div",{staticClass:"c"},[e("table",[e("tr",[e("td",{staticClass:"td1"},[t._v("注册商信息")]),e("td",{staticClass:"td2"},[t._v("注册商："+t._s(t.detailData.domain?t.detailData.domain.modifyDate:""))]),e("td",{staticClass:"td3"}),e("td",{staticClass:"td4"})]),e("tr",[e("td",{staticClass:"td1"},[t._v("域名所有人信息")]),e("td",{staticClass:"td2"},[t._v("域名所有人："+t._s(t.detailData.domainUser?t.detailData.domainUser.organizeNameCn:""))]),e("td",{staticClass:"td3"},[t._v("注册邮箱："+t._s(t.detailData.domainUser?t.detailData.domainUser.userEmail:""))]),e("td",{staticClass:"td4"})]),e("tr",[e("td",{staticClass:"td1"},[t._v("时间信息")]),e("td",{staticClass:"td2"},[t._v("注册时间："+t._s(t.detailData.domain?t.detailData.domain.applyDate:""))]),e("td",{staticClass:"td3"},[t._v("到期时间："+t._s(t.detailData.domain?t.detailData.domain.expireDate:""))]),e("td",{staticClass:"td4"},[t._v("更新日期："+t._s(t.detailData.domain?t.detailData.domain.modifyDate:""))])]),e("tr",[e("td",{staticClass:"td1"},[t._v("域名状态")]),e("td",{staticClass:"td2"},[t._v(t._s(t.detailData.domain?t.detailData.domain.domainStatus:"")),e("Tooltip",{attrs:{placement:"top-start"}},[e("span",{staticStyle:{color:"#fff"},attrs:{slot:"content"},slot:"content"},[t._v("解析监控列表仅记录3个月内解析修改情况，"),e("br"),t._v("详细域名解析监控日志，"),e("br"),t._v("请查看下方全部域名监控日志。")]),e("Icon",{attrs:{custom:"i-icon i-icon-tips",size:"16"}})],1)],1),e("td",{staticClass:"td3"}),e("td",{staticClass:"td4"})]),e("tr",[e("td",{staticClass:"td1"},[t._v("DNS服务器")]),e("td",{staticClass:"td2",attrs:{colspan:"3"}},t._l(t.detailData.domainDnsList,function(a){return e("span",{staticClass:"dns"},[t._v(t._s(a.dnsName))])}))])])])]),t._m(1),e("div",{staticClass:"secBox secBox3"},[t._m(2),e("div",{staticClass:"secFilter"},[e("form",{ref:"exportForm",staticClass:"filterWrap",attrs:{target:"_blank",method:"post","accept-charset":"utf-8",action:t.exportLink}},[e("table",[e("tr",{staticClass:"row1"},[e("td",{staticClass:"td1"},[e("span",{staticClass:"n"},[t._v("日志记录时间：")]),e("div",{staticClass:"inputWrap"},[e("DatePicker",{staticStyle:{width:"100%"},attrs:{type:"daterange",placeholder:"全部",format:"yyyy-MM-dd"},on:{"on-change":function(a){t.time=a}},model:{value:t.time,callback:function(a){t.time=a},expression:"time"}})],1),e("span",{staticClass:"n"},[t._v("事件类型：")]),e("div",{staticClass:"inputWrap"},[e("Select",{model:{value:t.type,callback:function(a){t.type=a},expression:"type"}},t._l(t.typeList,function(a){return e("Option",{key:a.value,attrs:{value:a.value}},[t._v(t._s(a.label))])}))],1),e("Button",{attrs:{type:"primary",loading:t.loadingBtn},on:{click:t.searchListData}},[t._v("查询")]),e("input",{attrs:{type:"hidden",name:"domainName"},domProps:{value:t.domainName}}),e("input",{attrs:{type:"hidden",name:"createTimeBegin"},domProps:{value:""!==t.time[0]?t.moment(t.time[0]).format("YYYY-MM-DD")+" 00:00:00":""}}),e("input",{attrs:{type:"hidden",name:"createTimeEnd"},domProps:{value:""!==t.time[1]?t.moment(t.time[1]).format("YYYY-MM-DD")+" 23:59:59":""}})],1),e("td",{staticClass:"tdBtn"},[e("a",{attrs:{href:"javascript:;"},on:{click:t.exportOrder}},[t._v("导出日志")])])])])])]),e("div",{staticClass:"secTable secTable2"},[e("Table",{attrs:{columns:t.columns,data:t.list,loading:t.loadingTable}})],1),e("Page",{attrs:{total:t.page.pageItems,current:t.page.pageNo,"show-elevator":"show-elevator","show-total":"show-total","prev-text":"上一页","next-text":"下一页","page-size":20},on:{"on-change":t.pageChange}})],1)])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("h3",{staticClass:"h3T clear"},[a("span",{staticClass:"t"},[this._v("域名信息")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"secBox secBox2",staticStyle:{display:"none"}},[a("h3",{staticClass:"h3T clear"},[a("span",{staticClass:"t"},[this._v("解析监控")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h3",{staticClass:"h3T clear"},[a("span",{staticClass:"t"},[this._v("监控日志")])])}]};var u={components:{compMonitorOwnDetail:e("VU/8")(c,m,!1,function(t){e("QRt5")},null,null).exports,compAsideFilter:e("3OAA").a},data:function(){var t=this;return{value:"",filterTitle:"域名",userCompanys:[],showDetail:!1,domainName:"",columnsTop:[{title:"时间",width:200,key:"sendTime",className:"col1",render:function(a,e){return a("div",[a("i",{class:1===t.listTop[e.index].readFlag?"unRead":""},"●"),a("span",{},t.listTop[e.index].sendTime)])}},{title:"通知内容",key:"title",className:"col2",render:function(a,e){return a("div",[a("Icon",{props:{type:"md-alert",size:"17"},style:{color:"#f00",margin:"0 5px 0 0",display:2===t.listTop[e.index].sendType?"inline-block":"none"}},""),a("a",{style:{}},t.listTop[e.index].title)])}}],listTop:[],columns:[{title:"域名",width:150,key:"domainName",className:"col1",render:function(a,e){return a("div",[a("span",{style:{display:"inline-block","font-size":"16px","line-height":"18px","vertical-align":"top"}},t.list[e.index].domainName),a("Icon",{props:{type:"md-star",size:"18"},style:{margin:"0 5px 0 0",color:"#f00",display:2===t.list[e.index].levelType?"inline-block":"none"}})])}},{title:"域名所有人",width:150,key:"organizeNameCn",className:"col2",render:function(a,e){return a("div",[a("p",{},t.list[e.index].organizeNameCn),a("p",{},t.list[e.index].userEmail)])}},{title:"到期时间",width:150,key:"expireDate",className:"col2"},{title:"监控日志",width:200,key:"type",className:"col3",render:function(a,e){return a("div",[a("Icon",{props:{type:"md-alert",size:"17"},style:{color:"#f00",margin:"0 5px 0 0",display:2===t.list[e.index].levelType?"inline-block":"none"}},""),a("span",{},t.DATAS.RECORD_DOMAIN_EVENT_TYPE[t.list[e.index].type])])}},{title:"操作",key:"operate",className:"operate",render:function(a,e){return a("div",[a("a",{props:{href:"javascript:;"},on:{click:function(){t.showDetailFun(t.list[e.index].domainName)}}},"详情")])}}],list:[{}],loadingTable:!0,loadingBtn:!1,page:{pageNo:1,pagePages:1,pageItems:1}}},methods:s()({searchListData:function(){this.queryList(this.queryListParam({pageNum:1}))},pageChange:function(t){this.queryList(this.queryListParam({pageNum:t}))},showDetailFun:function(t){this.domainName=t,this.showDetail=!0},asideFilterSubmit:function(t){console.log(t),this.asideFilterResult.allSuffix=t.dataDomainSuffix.checkAll?1:"",this.asideFilterResult.otherSuffix=!t.dataDomainSuffix.checkAll&&t.dataDomainSuffix.value.indexOf("otherSuffix")>=0?1:"",this.asideFilterResult.domainSuffixs=!t.dataDomainSuffix.checkAll&&t.dataDomainSuffix.value.indexOf("otherSuffix")<0?t.dataDomainSuffix.value.join(","):"",this.asideFilterResult.groupIds=t.dataMgmtCompany.reduce(function(t,a){return t.concat(a)},[]).join(","),this.asideFilterResult.importantFlag=t.dataSafe[0].join(","),this.asideFilterResult.renewFlag=t.dataSafe[1].join(","),this.asideFilterResult.backendLockFlag=t.dataSafe[2].join(","),this.asideFilterResult.updateFlag=t.dataSafe[3].join(","),console.log(this.asideFilterResult),this.queryList(this.queryListParam({pageNum:1}))},asideFilterReset:function(){this.asideFilterResult.domainSuffixs="",this.asideFilterResult.otherSuffix="",this.asideFilterResult.allSuffix="",this.asideFilterResult.groupIds="",this.asideFilterResult.importantFlag="",this.asideFilterResult.renewFlag="",this.asideFilterResult.updateFlag="",this.asideFilterResult.backendLockFlag="",this.queryList(this.queryListParam({pageNum:1}))},queryListParam:function(t){var a=this;return this.page.pageNo=t.pageNum,this.loadingBtn=!0,this.loadingTable=!0,{param:{pageNum:t.pageNum,pageSize:20},callback:function(t){if(a.loadingBtn=!1,a.loadingTable=!1,!t)return!1;"1000"===t.data.code&&(a.list=t.data.data.list,a.page.pageItems=t.data.data.totalNum)}}}},Object(n.b)({queryList:l._15,queryListTop:l._33})),computed:{},beforeMount:function(){var t=this,a={param:{},callback:function(a){if(t.loadingTable=!1,t.loadingBtn=!1,!a)return!1;"1000"===a.data.code&&(t.listTop=a.data.data.list)}};this.queryListTop(a),this.queryList(this.queryListParam({pageNum:1}))}},p={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"contMonitorOwn"},[e("h1",{staticClass:"pageTitle clear"},[e("span",{staticClass:"backlist",on:{click:function(a){t.showDetail=!1}}},[t._v("自有域名监控")]),t._v(" "),e("span",{directives:[{name:"show",rawName:"v-show",value:t.showDetail,expression:"showDetail"}]},[t._v(" > 域名监控详情")]),e("div",{staticClass:"tR"},[e("router-link",{attrs:{to:"/report/own"}},[e("Button",{attrs:{type:"primary"}},[t._v("自有域名监控报告")])],1)],1)]),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.showDetail,expression:"!showDetail"}],staticClass:"secMain"},[e("h2",{staticClass:"h2T clear"},[t._v("监控通知"),e("div",{staticClass:"tR"},[e("router-link",{attrs:{to:"/notice/monitoring"}},[t._v("查看全部监控通知")])],1)]),e("div",{staticClass:"secTable secTable1"},[e("Table",{ref:"",staticClass:"table1",attrs:{columns:t.columnsTop,data:t.listTop,loading:t.loadingTable,"show-header":!1}})],1),e("h2",{staticClass:"h2T clear"},[t._v("监控域名列表"),e("div",{staticClass:"tR"},[e("span",{staticClass:"text"},[t._v("搜索")]),e("Input",{attrs:{placeholder:"请输入域名"},model:{value:t.value,callback:function(a){t.value=a},expression:"value"}}),e("Button",{attrs:{type:"primary",loading:t.loadingBtn},on:{click:function(t){}}},[t._v("查询")])],1)]),e("div",{staticClass:"filter"},[e("comp-aside-filter",{attrs:{show:[3,4,5],total:t.page.pageItems,filterTitle:t.filterTitle},on:{asideFilterSubmit:t.asideFilterSubmit,asideFilterReset:t.asideFilterReset}})],1),e("div",{staticClass:"secTable secTable2"},[e("Table",{attrs:{columns:t.columns,data:t.list,loading:t.loadingTable}})],1)]),e("Page",{directives:[{name:"show",rawName:"v-show",value:!t.showDetail,expression:"!showDetail"}],attrs:{total:t.page.pageItems,current:t.page.pageNo,"show-elevator":"show-elevator","show-total":"show-total","prev-text":"上一页","next-text":"下一页","page-size":20},on:{"on-change":t.pageChange}}),e("div",{directives:[{name:"show",rawName:"v-show",value:t.showDetail,expression:"showDetail"}],staticClass:"pageDetail"},[e("comp-monitor-own-detail",{attrs:{domainName:t.domainName}})],1)],1)},staticRenderFns:[]};var h=e("VU/8")(u,p,!1,function(t){e("BFzG")},null,null);a.default=h.exports}});
//# sourceMappingURL=7.4f7926f29cec2fe446fe.js.map