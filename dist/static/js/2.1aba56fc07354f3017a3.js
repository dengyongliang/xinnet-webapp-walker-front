webpackJsonp([2],{"1IOz":function(t,e){},Cdx3:function(t,e,a){var i=a("sB3e"),s=a("lktj");a("uqUo")("keys",function(){return function(t){return s(i(t))}})},"SEE+":function(t,e){},TmV0:function(t,e,a){a("fZOM"),t.exports=a("FeBl").Object.values},ZV3D:function(t,e){},ax7K:function(t,e){},fZOM:function(t,e,a){var i=a("kM2E"),s=a("mbce")(!1);i(i.S,"Object",{values:function(t){return s(t)}})},fZjL:function(t,e,a){t.exports={default:a("jFbC"),__esModule:!0}},gRE1:function(t,e,a){t.exports={default:a("TmV0"),__esModule:!0}},ipcc:function(t,e){},jFbC:function(t,e,a){a("Cdx3"),t.exports=a("FeBl").Object.keys},mbce:function(t,e,a){var i=a("lktj"),s=a("TcQ7"),n=a("NpIQ").f;t.exports=function(t){return function(e){for(var a,o=s(e),r=i(o),c=r.length,v=0,l=[];c>v;)n.call(o,a=r[v++])&&l.push(t?[a,o[a]]:o[a]);return l}}},nP1T:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Dd8w"),s=a.n(i),n=a("NYxO"),o=a("5reh"),r=a("gRE1"),c=a.n(r),v=a("fZjL"),l=a.n(v),m={name:"compChartOverviewCompany",props:{charData:{type:Object,default:function(){return{data:[]}}}},data:function(){return{}},methods:{drawChart:function(t){this.$echarts.init(document.getElementById("myChart")).setOption({title:{text:"",subtext:"",x:"center"},tooltip:{trigger:"item",formatter:"{b} : {c} ({d}%)"},legend:{orient:"vertical",right:"12%",top:"center",itemWidth:10,itemHeight:10,data:t.company&&l()(t.company).length?l()(t.company):["无"]},series:[{name:"域名所属公司",type:"pie",radius:["50%","85%"],center:["30%","50%"],avoidLabelOverlap:!1,data:t.company&&c()(t.company).length?c()(t.company):[{name:"无",value:0}],label:{normal:{show:!0,position:"inner",formatter:"{d}%（{c}个）"}},labelLine:{normal:{show:!1}},itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]})}},beforeMount:function(){},mounted:function(){this.drawChart(this.charData)},computed:{},watch:{charData:function(t,e){this.drawChart(t)}}},d={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"compChartOverviewCompany"},[e("div",{attrs:{id:"myChart"}})])}]};var u=a("VU/8")(m,d,!1,function(t){a("SEE+")},"data-v-3a44dc65",null).exports,f={name:"compChartOverviewSuffix",props:{charData:{type:Object,default:function(){return{data:[]}}}},data:function(){return{}},methods:{drawChart:function(t){this.$echarts.init(document.getElementById("myChartSuffix")).setOption({title:{text:"",subtext:"",x:"center"},tooltip:{trigger:"item",formatter:"{b} : {c} ({d}%)"},legend:{orient:"vertical",right:"12%",top:"center",itemWidth:10,itemHeight:10,data:l()(t.domainSuffix)},series:[{name:"域名所属公司",type:"pie",radius:["50%","85%"],center:["30%","50%"],avoidLabelOverlap:!1,data:c()(t.domainSuffix),label:{normal:{show:!0,position:"inner",formatter:"{d}%（{c}个）"}},labelLine:{normal:{show:!1}},itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]})}},beforeMount:function(){},mounted:function(){this.drawChart(this.charData)},computed:{},watch:{charData:function(t,e){this.drawChart(t)}}},h={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"compChartOverviewSuffix"},[e("div",{attrs:{id:"myChartSuffix"}})])}]};var C=a("VU/8")(f,h,!1,function(t){a("ax7K")},"data-v-27b68be4",null).exports,p={name:"compChartOverviewExpire",props:{charData:{type:Object,default:function(){return{data:[]}}}},data:function(){return{}},methods:{drawChart:function(t){this.$echarts.init(document.getElementById("myChartExpire")).setOption({title:{text:"",subtext:"",x:"center"},tooltip:{trigger:"item",formatter:"{b} : {c} ({d}%)"},legend:{orient:"vertical",right:"12%",top:"center",itemWidth:10,itemHeight:10,data:l()(t.expireDate)},series:[{name:"域名所属公司",type:"pie",radius:["50%","85%"],center:["30%","50%"],avoidLabelOverlap:!1,data:c()(t.expireDate),label:{normal:{show:!0,position:"inner",formatter:"{d}%（{c}个）"}},labelLine:{normal:{show:!1}},itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]})}},beforeMount:function(){},mounted:function(){this.drawChart(this.charData)},computed:{},watch:{charData:function(t,e){this.drawChart(t)}}},w={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"compChartOverviewExpire"},[e("div",{attrs:{id:"myChartExpire"}})])}]};var _=a("VU/8")(p,w,!1,function(t){a("ipcc")},"data-v-8f77e474",null).exports,x={name:"compNoticeMonitorList",props:{},data:function(){return{list:[]}},methods:s()({queryListParam:function(){var t=this;return{param:{pageNum:1,pageSize:8,createTimeBegin:"",createTimeEnd:"",type:""},callback:function(e){"1000"===e.data.code&&(t.list=e.data.data.list)}}}},Object(n.b)({queryList:o._32})),beforeMount:function(){this.queryList(this.queryListParam())},mounted:function(){},computed:{},watch:{}},D={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"compNoticeMonitorList"},[t.list.length?a("ul",t._l(t.list,function(e){return a("li",{staticClass:"clear"},[a("span",{staticClass:"l"},[t._v(t._s(e.sendTime))]),a("span",{staticClass:"r"},[a("a",[t._v(t._s(e.title))])])])})):a("div",{staticClass:"none"},[t._v("暂无数据")])])},staticRenderFns:[]};var b={components:{compChartOverviewCompany:u,compChartOverviewSuffix:C,compChartOverviewExpire:_,compNoticeMonitorList:a("VU/8")(x,D,!1,function(t){a("ZV3D")},"data-v-ac5d44b0",null).exports},data:function(){return{value:"",time:"",refresh:!1,loadingBtn:!1,tabs:1,overviewDomain:{},overviewDomainCount:{},overviewTemplate:{},overviewBackendLock:{},overviewDomainVerify:{},overviewDomainRenew:{},overviewDomainTransferIn:{},overviewDomainChange:{}}},methods:s()({getOverviewDomainCount:function(){var t=this;this.loadingBtn=!0;var e={param:{days:7},callback:function(e){t.loadingBtn=!1,"1000"===e.data.code&&(console.log(e.data.data),t.overviewDomainCount=e.data.data)}};this.overviewDomainCountStatistics(e)}},Object(n.b)({overviewDomainStatistics:o.S,overviewDomainCountStatistics:o.Q,overviewTemplateStatistics:o.V,overviewBackendLockStatistics:o.O,overviewDomainVerifyStatistics:o.U,overviewDomainRenewStatistics:o.R,overviewDomainTransferInStatistics:o.T,overviewDomainChangeStatistics:o.P})),computed:s()({},Object(n.d)({myUserInfo:function(t){return t.user.myUserInfo},menus:function(t){return t.user.menus}})),beforeMount:function(){var t=this;this.overviewDomainStatistics(function(e){t.overviewDomain=e.data.data}),this.getOverviewDomainCount(),this.overviewTemplateStatistics(function(e){t.overviewTemplate=e.data.data}),this.overviewBackendLockStatistics(function(e){t.overviewBackendLock=e.data.data}),this.overviewDomainVerifyStatistics(function(e){t.overviewDomainVerify=e.data.data}),this.overviewDomainRenewStatistics(function(e){t.overviewDomainRenew=e.data.data}),this.overviewDomainTransferInStatistics(function(e){t.overviewDomainTransferIn=e.data.data}),this.overviewDomainChangeStatistics(function(e){t.overviewDomainChange=e.data.data})},mounted:function(){}},y={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contDomainOverview"},[t._m(0),a("div",{staticClass:"secMain"},[a("Row",{staticClass:"row1"},[a("Col",{attrs:{span:"16"}},[a("div",{staticClass:"secBox secBox1"},[a("h3",{staticClass:"h3T clear"},[a("span",{staticClass:"t"},[t._v("域名统计")])]),a("div",{staticClass:"hd"},[a("a",{class:1===t.tabs?"active":"",attrs:{href:"javascript:;"},on:{click:function(e){t.tabs=1}}},[t._v("域名所属公司")]),a("span",{staticClass:"line"},[t._v("|")]),a("a",{class:2===t.tabs?"active":"",attrs:{href:"javascript:;"},on:{click:function(e){t.tabs=2}}},[t._v("域名后缀")]),a("span",{staticClass:"line"},[t._v("|")]),a("a",{class:3===t.tabs?"active":"",attrs:{href:"javascript:;"},on:{click:function(e){t.tabs=3}}},[t._v("域名到期时间")])]),a("div",{staticClass:"bd"},[a("div",{staticClass:"bd1 clear"},[1===t.tabs?a("comp-chart-overview-company",{attrs:{charData:t.overviewDomain}}):t._e()],1),a("div",{staticClass:"bd2 clear"},[2===t.tabs?a("comp-chart-overview-suffix",{attrs:{charData:t.overviewDomain}}):t._e()],1),a("div",{staticClass:"bd3 clear"},[3===t.tabs?a("comp-chart-overview-expire",{attrs:{charData:t.overviewDomain}}):t._e()],1)])])]),a("Col",{attrs:{span:"8"}},[a("div",{staticClass:"secBox secBox2"},[a("h3",{staticClass:"h3T clear"},[a("span",{staticClass:"t"},[t._v("域名监控")]),a("div",{staticClass:"tR"},[t.myUserInfo.keeperFlag||t.myUserInfo.userRoles&&t.myUserInfo.userRoles[0].roleCode.indexOf("super")>=0||t.menus.indexOf("client_notice_monitor")>=0?a("router-link",{staticClass:"text",attrs:{to:"/notice/monitoring"}},[t._v("查看全部")]):t._e()],1)]),t.myUserInfo.keeperFlag||t.myUserInfo.userRoles&&t.myUserInfo.userRoles[0].roleCode.indexOf("super")>=0||t.menus.indexOf("client_notice_monitor")>=0?a("comp-notice-monitor-list"):a("div",{staticClass:"none"},[t._v("暂无权限")])],1)])],1),a("div",{staticClass:"secBox secBox3 row2"},[a("h3",{staticClass:"h3T clear"},[a("span",{staticClass:"t"},[t._v("数量变化总览")]),a("div",{staticClass:"tR"},[a("span",{staticClass:"text"},[t._v("时间周期")]),a("DatePicker",{attrs:{type:"daterange",placeholder:"",format:"yyyy-MM-dd",placement:"bottom-end"},on:{"on-change":function(e){t.time=e}},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}}),a("Button",{attrs:{type:"primary",loading:t.loadingBtn},on:{click:t.getOverviewDomainCount}},[t._v("查询")])],1)]),a("Row",[a("Col",{attrs:{span:"8"}},[a("strong",[t._v("域名总览")]),a("em",{staticClass:"num"},[t._v(t._s(t.overviewDomainCount.all))]),a("ul",[a("li",{staticClass:"clear"},[a("span",{staticClass:"l"},[t._v("净增减数")]),a("span",{staticClass:"r"},[a("em",{directives:[{name:"show",rawName:"v-show",value:0===t.overviewDomainCount.ad,expression:"overviewDomainCount.ad === 0"}]},[t._v(t._s(t.overviewDomainCount.ad)+"个")]),a("em",{directives:[{name:"show",rawName:"v-show",value:t.overviewDomainCount.ad>0,expression:"overviewDomainCount.ad > 0"}]},[a("Icon",{staticClass:"add",attrs:{type:"ios-arrow-round-up"}}),t._v(" "+t._s(t.overviewDomainCount.ad)+"个")],1),a("em",{directives:[{name:"show",rawName:"v-show",value:t.overviewDomainCount.ad<0,expression:"overviewDomainCount.ad < 0"}]},[a("Icon",{staticClass:"del",attrs:{type:"ios-arrow-round-down"}}),t._v(" "+t._s(t.overviewDomainCount.ad)+"个")],1)])])])]),a("Col",{attrs:{span:"8"}},[a("strong",[t._v("新增域名数")]),a("em",{staticClass:"num"},[t._v(t._s(t.overviewDomainCount.add))]),a("ul",[a("li",{staticClass:"clear"},[a("span",{staticClass:"l"},[t._v("新网新注")]),a("span",{staticClass:"r"},[a("em",[t._v(t._s(t.overviewDomainCount.add_regist)+"个")])])]),a("li",{staticClass:"clear"},[a("span",{staticClass:"l"},[t._v("转入新网")]),a("span",{staticClass:"r"},[a("em",[t._v(t._s(t.overviewDomainCount.add_trans)+"个")])])])])]),a("Col",{attrs:{span:"8"}},[a("strong",[t._v("减少域名数")]),a("em",{staticClass:"num"},[t._v(t._s(t.overviewDomainCount.del))]),a("ul",[a("li",{staticClass:"clear"},[a("span",{staticClass:"l"},[t._v("过期删除")]),a("span",{staticClass:"r"},[a("em",[t._v(t._s(t.overviewDomainCount.del_expired)+"个")])])]),a("li",{staticClass:"clear"},[a("span",{staticClass:"l"},[t._v("其他原因")]),a("span",{staticClass:"r"},[a("em",[t._v(t._s(t.overviewDomainCount.del_other)+"个")])])])])])],1)],1),a("div",{staticClass:"row3 clear"},[a("div",{staticClass:"item"},[a("div",{staticClass:"secBox secBox4"},[a("h3",{staticClass:"h3T clear"},[a("span",{staticClass:"t"},[t._v("实名模板 "),a("b",[t._v(t._s(t.overviewTemplate.all))]),t._v("个")]),a("div",{staticClass:"tR"},[a("router-link",{staticClass:"text",attrs:{to:"/domain/realname"}},[t._v("详情")])],1)]),a("ul",[a("li",[t._v("实名审核中："+t._s(t.overviewTemplate.inVerify)+"个")]),a("li",[t._v("已实名："+t._s(t.overviewTemplate.verifyed)+"个")]),a("li",[t._v("未实名："+t._s(t.overviewTemplate.notVerify)+"个")])])])]),a("div",{staticClass:"item"},[a("div",{staticClass:"secBox secBox5"},[a("h3",{staticClass:"h3T clear"},[a("span",{staticClass:"t"},[t._v("注册局锁")]),a("div",{staticClass:"tR"},[a("router-link",{staticClass:"text",attrs:{to:"/domain/security"}},[t._v("详情")])],1)]),a("ul",[a("li",[t._v("开通注册局锁域名数："+t._s(t.overviewBackendLock.backendLockCount)+"个")]),a("li",[t._v("重点保护域名开通率："+t._s(t.overviewBackendLock.importantRate)+"%")])])])]),a("div",{staticClass:"item"},[a("div",{staticClass:"secBox secBox6"},[a("h3",{staticClass:"h3T clear"},[a("span",{staticClass:"t"},[t._v("实名认证率 "),a("b",[t._v(t._s(t.overviewDomainVerify.domainVerifyRate))]),t._v("%")]),a("div",{staticClass:"tR"},[a("router-link",{staticClass:"text",attrs:{to:"/domain/realnameDomain"}},[t._v("详情")])],1)]),a("ul",[a("li",[t._v("实名审核中："+t._s(t.overviewDomainVerify.domainInVerifyCount)+"个")]),a("li",[t._v("已实名："+t._s(t.overviewDomainVerify.domainVerifyCount)+"个")]),a("li",[t._v("未实名："+t._s(t.overviewDomainVerify.domainNotVerifyCount)+"个")])])])]),a("div",{staticClass:"item"},[a("div",{staticClass:"secBox secBox7"},[a("h3",{staticClass:"h3T clear"},[a("span",{staticClass:"t"},[t._v("需要续费的域名 "),a("b",[t._v(t._s(t.overviewDomainRenew.domainRenewCount))]),t._v("个")]),a("div",{staticClass:"tR"},[a("router-link",{staticClass:"text",attrs:{to:"/domain/mgmt"}},[t._v("详情")])],1)])])]),a("div",{staticClass:"item"},[a("div",{staticClass:"secBox secBox8"},[a("h3",{staticClass:"h3T clear"},[a("span",{staticClass:"t"},[t._v("正在转入的域名 "),a("b",[t._v(t._s(t.overviewDomainTransferIn.domainTransferInCount))]),t._v("个")]),a("div",{staticClass:"tR"},[a("router-link",{staticClass:"text",attrs:{to:"/domain/transferin"}},[t._v("详情")])],1)])])]),a("div",{staticClass:"item"},[a("div",{staticClass:"secBox secBox9"},[a("h3",{staticClass:"h3T clear"},[a("span",{staticClass:"t"},[t._v("正在过户的域名 "),a("b",[t._v(t._s(t.overviewDomainChange.domainChangeCount))]),t._v("个")]),a("div",{staticClass:"tR"},[a("router-link",{staticClass:"text",attrs:{to:"/domain/change"}},[t._v("详情")])],1)])])])])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{staticClass:"pageTitle clear"},[e("span",[this._v("域名总览")])])}]};var g=a("VU/8")(b,y,!1,function(t){a("1IOz")},"data-v-fa9538be",null);e.default=g.exports},uqUo:function(t,e,a){var i=a("kM2E"),s=a("FeBl"),n=a("S82l");t.exports=function(t,e){var a=(s.Object||{})[t]||Object[t],o={};o[t]=e(a),i(i.S+i.F*n(function(){a(1)}),"Object",o)}}});
//# sourceMappingURL=2.1aba56fc07354f3017a3.js.map