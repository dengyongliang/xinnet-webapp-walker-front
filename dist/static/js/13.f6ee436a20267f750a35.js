webpackJsonp([13],{"+3KQ":function(t,e){},"+xRr":function(t,e){},W46n:function(t,e){},YpLx:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("Dd8w"),n=a.n(r),i=a("NYxO"),o=a("5reh"),s={name:"compChartDomainDueTime",props:{charData:{type:Object,default:function(){return{data:[]}}}},data:function(){return{}},methods:{drawChart:function(t){this.$echarts.init(document.getElementById("myChart")).setOption({title:{text:"",subtext:"",x:"center"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{x:"center",y:"280",itemWidth:10,itemHeight:10,data:t.map(function(t){return t.companyName})},grid:{left:"3%",right:"4%",bottom:"20%",containLabel:!0},xAxis:{type:"value"},yAxis:{type:"category",data:[" "]},series:t.map(function(t){return{name:t.companyName,type:"bar",stack:"总量",label:{normal:{show:!0,position:"insideRight"}},data:[t.domainNumber]}})})}},beforeMount:function(){},mounted:function(){this.charData.domainInfo&&this.charData.domainInfo.length&&this.drawChart(this.charData.domainInfo)},computed:{},watch:{charData:function(t,e){this.drawChart(t.domainInfo)}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"compChartReportAssetsCompany"},[a("div",{staticStyle:{width:"688px",height:"328px"},attrs:{id:"myChart"}}),a("p",[t._v(t._s(t.charData.companyName)+"管理域名数量最多共计"),a("em",[t._v(t._s(t.charData.mainDomainNumber))]),t._v("个，占域名总数的"),a("em",[t._v(t._s(t.charData.mainDomainRate))]),t._v("，其余公司管理其余"),a("em",[t._v(t._s(t.charData.otherDomainNumber))]),t._v("个域名。")])])},staticRenderFns:[]};var m=a("VU/8")(s,c,!1,function(t){a("rmbP")},"data-v-1bf706ae",null).exports,u={name:"compChartDomainDueTime",props:{charData:{type:Object,default:function(){return{data:[]}}}},data:function(){return{}},methods:{drawChart:function(t){this.$echarts.init(document.getElementById("myChart2")).setOption({title:{text:"",subtext:"",x:"center"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{x:"center",y:"280",itemWidth:10,itemHeight:10,data:t.map(function(t){return t.suffixName})},grid:{left:"3%",right:"4%",bottom:"20%",containLabel:!0},xAxis:{type:"value"},yAxis:{type:"category",data:[""]},series:t.map(function(t){return{name:t.suffixName,type:"bar",stack:"总量",label:{normal:{show:!0,position:"insideRight"}},data:[t.domainNumber]}})})}},beforeMount:function(){},mounted:function(){this.charData.domainInfo&&this.charData.domainInfo.length&&this.drawChart(this.charData.domainInfo)},computed:{},watch:{charData:function(t,e){this.drawChart(t.domainInfo)}}},p={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"compChartDomainDueTime"},[e("div",{staticStyle:{width:"688px",height:"328px"},attrs:{id:"myChart2"}}),e("p",[this._v("主流域名后缀.com、.cn、.com.cn，占域名总数的"+this._s(this.charData.mainSuffixRate)+"，共计"+this._s(this.charData.mainSuffixNumber)+"个，其余域名后缀类型，共计"+this._s(this.charData.otherSuffixNumber)+"个域名。")])])},staticRenderFns:[]};var h=a("VU/8")(u,p,!1,function(t){a("+xRr")},"data-v-0f9db100",null).exports,d=a("eQVj"),f={name:"compChartDomainDueTime",props:{charData:{type:Object,default:function(){return{data:[]}}}},data:function(){return{}},methods:{drawChart:function(t){var e={normal:{show:!0,rotate:90,align:"left",verticalAlign:"middle",position:"insideBottom",distance:15,formatter:"{c}",fontSize:12,rich:{name:{textBorderColor:"#fff"}}}};this.$echarts.init(document.getElementById("myChart4")).setOption({color:["#003366","#aaaaaa"],title:{text:"",subtext:"",x:"center"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{x:"center",y:"90%",itemWidth:10,itemHeight:10,data:["已开通","未开通"]},calculable:!0,xAxis:{type:"category",axisTick:{show:!1},data:["注册局锁","自动续费","禁止更新"]},yAxis:{type:"value"},series:[{name:"已开通",type:"bar",barGap:0,label:e,data:[t.backEndLockOpenNumber,t.autoRenewOpenNumber,t.updateProhibitedOpenNumber]},{name:"未开通",type:"bar",label:e,data:[t.backEndLockNumber,t.autoRenewNumber,t.updateProhibitedNumber]}]})}},beforeMount:function(){},mounted:function(){this.drawChart(this.charData)},computed:{},watch:{charData:function(t,e){this.drawChart(t)}}},l={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"compChartDomainDueTime"},[e("div",{staticStyle:{width:"450px",height:"328px"},attrs:{id:"myChart4"}})])}]};var _=a("VU/8")(f,l,!1,function(t){a("W46n")},"data-v-9d3a5a6e",null).exports,x={name:"compChartDomainDueTime",props:{charData:{type:Object,default:function(){return{data:[]}}}},data:function(){return{}},methods:{drawChart:function(t){var e={normal:{show:!0,rotate:90,align:"left",verticalAlign:"middle",position:"insideBottom",distance:15,formatter:"{c}",fontSize:12,rich:{name:{textBorderColor:"#fff"}}}};this.$echarts.init(document.getElementById("myChart5")).setOption({color:["#006699","#aaaaaa"],title:{text:"",subtext:"",x:"center"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{x:"center",y:"90%",itemWidth:10,itemHeight:10,data:["已开通","未开通"]},calculable:!0,xAxis:{type:"category",axisTick:{show:!1},data:["注册局锁","自动续费","禁止更新"]},yAxis:{type:"value"},series:[{name:"已开通",type:"bar",barGap:0,label:e,data:[t.backEndLockOpenNumber,t.autoRenewOpenNumber,t.updateProhibitedOpenNumber]},{name:"未开通",type:"bar",label:e,data:[t.backEndLockNumber,t.autoRenewNumber,t.updateProhibitedNumber]}]})}},beforeMount:function(){},mounted:function(){this.drawChart(this.charData)},computed:{},watch:{charData:function(t,e){this.drawChart(t)}}},v={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"compChartDomainDueTime"},[e("div",{staticStyle:{width:"450px",height:"328px"},attrs:{id:"myChart5"}})])}]};var y=a("VU/8")(x,v,!1,function(t){a("wG9t")},"data-v-cddd9cf0",null).exports,b={components:{compChartReportAssetsCompany:m,compChartReportAssetsSuffix:h,compChartReportOwnDueTime:d.a,compChartReportAssetsSafeNormal:_,compChartReportAssetsSafeImportant:y},data:function(){return{reportAssets:{},reportcompany:{},reportSuffix:{},reportExpire:{},reportSafeNormal:{},reportSafeImportant:{},reportSafeRate:{}}},methods:n()({},Object(i.b)({queryDomainAssetsViewReport:o._2,queryDomainCompanyViewReport:o._5,queryDomainSuffixViewReport:o._29,queryDomainSafeNormalReport:o._27,queryDomainSafeImportantReport:o._25,queryDomainSafeRateReport:o._28,queryDomainMonitorExpireReport:o._18})),computed:{},beforeMount:function(){var t=this;this.queryDomainAssetsViewReport(function(e){if(!e)return!1;"1000"===e.data.code&&(t.reportAssets=e.data.data)}),this.queryDomainCompanyViewReport(function(e){if(!e)return!1;"1000"===e.data.code&&(t.reportcompany=e.data.data)}),this.queryDomainSuffixViewReport(function(e){if(!e)return!1;"1000"===e.data.code&&(t.reportSuffix=e.data.data)}),this.queryDomainSafeNormalReport(function(e){if(!e)return!1;"1000"===e.data.code&&(t.reportSafeNormal=e.data.data)}),this.queryDomainSafeImportantReport(function(e){if(!e)return!1;"1000"===e.data.code&&(t.reportSafeImportant=e.data.data)}),this.queryDomainSafeRateReport(function(e){if(!e)return!1;"1000"===e.data.code&&(t.reportSafeRate=e.data.data)}),this.queryDomainMonitorExpireReport(function(e){if(!e)return!1;"1000"===e.data.code&&(t.reportExpire=e.data.data)})},mounted:function(){},watch:{}},C={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contAssetsDomain"},[a("h3",{staticClass:"h3T"},[t._v("域名资产总览")]),a("div",{staticClass:"secBox secBox1"},[t._m(0),a("Row",[a("Col",{attrs:{span:"8"}},[a("strong",[t._v("域名总数")]),a("em",{staticClass:"num"},[t._v(t._s(t.reportAssets.domainNumber))])]),a("Col",{attrs:{span:"8"}},[a("strong",[t._v("管理公司数量")]),a("em",{staticClass:"num"},[t._v(t._s(t.reportAssets.companyCount))])]),a("Col",{attrs:{span:"8"}},[a("strong",[t._v("管理人员")]),a("em",{staticClass:"num"},[t._v(t._s(t.reportAssets.userCount))])])],1),a("p",[t._v("截止2018-12-13 21：30，天翼实业集团有限公司共拥有域名数量"+t._s(t.reportAssets.domainNumber)+"个，管理公司"+t._s(t.reportAssets.companyCount)+"个，管理人员"+t._s(t.reportAssets.userCount)+"人。域名监控时长1112天，域名安全问题产生次数0次。")])],1),a("div",{staticClass:"secBox secBox2"},[t._m(1),a("comp-chart-report-assets-company",{attrs:{charData:t.reportcompany}})],1),a("div",{staticClass:"secBox secBox3"},[t._m(2),a("comp-chart-report-assets-suffix",{attrs:{charData:t.reportSuffix}})],1),a("div",{staticClass:"secBox secBox4"},[t._m(3),a("comp-chart-report-own-due-time",{attrs:{charData:t.reportExpire}})],1),a("div",{staticClass:"secBox secBox5"},[t._m(4),a("Row",[a("Col",{attrs:{span:"12"}},[a("strong",[t._v("一般保护域名安全服务开通情况")]),a("comp-chart-report-assets-safe-normal",{attrs:{charData:t.reportSafeNormal}})],1),a("Col",{attrs:{span:"12"}},[a("strong",[t._v("重点保护域名安全服务开通情况")]),a("comp-chart-report-assets-safe-important",{attrs:{charData:t.reportSafeImportant}})],1)],1),a("p",[t._v("重点保护域名"),a("em",[t._v(t._s(t.reportSafeRate.safeNumber))]),t._v("个，占域名总数的"),a("em",[t._v(t._s(t.reportSafeRate.importantRate))]),t._v("；重点保护域名注册局锁开通率"),a("em",[t._v(t._s(t.reportSafeRate.backEndLockRate))]),t._v("，"),a("em",[t._v(t._s(t.reportSafeRate.backEndLockNotOpenNumber))]),t._v("个重点保护域名未开通注册局锁；"),a("br"),t._v("自动续费域名"),a("em",[t._v(t._s(t.reportSafeRate.autoRenewOpenNumber))]),t._v("，自动续费开通率"),a("em",[t._v(t._s(t.reportSafeRate.autoRenewRate))]),t._v("；禁止更新域名"),a("em",[t._v(t._s(t.reportSafeRate.updateProhibitedOpenNumber))]),t._v("个，禁止更新开通率"),a("em",[t._v(t._s(t.reportSafeRate.updateProhibitedRate))]),t._v("。")])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{staticClass:"h4T clear"},[e("span",{staticClass:"t"},[this._v("资产概况")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{staticClass:"h4T clear"},[e("span",{staticClass:"t"},[this._v("域名所属公司")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{staticClass:"h4T clear"},[e("span",{staticClass:"t"},[this._v("域名后缀分布")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{staticClass:"h4T clear"},[e("span",{staticClass:"t"},[this._v("域名到期时间")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{staticClass:"h4T clear"},[e("span",{staticClass:"t"},[this._v("域名安全保护")])])}]};var D=a("VU/8")(b,C,!1,function(t){a("eStX")},null,null);e.default=D.exports},eQVj:function(t,e,a){"use strict";var r={name:"compChartReportOwnDueTime",props:{charData:{type:Object,default:function(){return{data:[]}}}},data:function(){return{}},methods:{getIdxItem:function(t){return this.charData.expireReportInfo.findIndex(function(e){return e.serviceStatus===t})},drawChart:function(t){var e=this;this.$echarts.init(document.getElementById("myChart")).setOption({title:{text:"",subtext:"",x:"center"},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{x:"center",y:"280",itemWidth:10,itemHeight:10,data:t.map(function(t){return e.DATAS.SERVICE_STATE[t.serviceStatus]})},grid:{top:"10%",left:"3%",right:"4%",bottom:"20%",containLabel:!0},xAxis:{type:"value"},yAxis:{type:"category",data:[""]},series:t.map(function(t){return{name:e.DATAS.SERVICE_STATE[t.serviceStatus],type:"bar",stack:"总量",label:{normal:{show:!0,position:"insideRight"}},data:[t.domainCount]}})})}},beforeMount:function(){},mounted:function(){this.charData.expireReportInfo&&this.charData.expireReportInfo.length&&this.drawChart(this.charData.expireReportInfo)},computed:{},watch:{charData:function(t,e){this.drawChart(t.expireReportInfo)}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"compChartReportOwnDueTime"},[a("div",{staticStyle:{width:"688px",height:"328px"},attrs:{id:"myChart"}}),a("p",[t._v("服务期域名为"),a("em",[t._v(t._s(t.charData.expireReportInfo?t.charData.expireReportInfo[t.getIdxItem(0)].domainCount:0))]),t._v("个，急需续费的域名"),a("em",[t._v(t._s(t.charData.expireReportInfo?t.charData.expireReportInfo[t.getIdxItem(1)].domainCount:0))]),t._v("个，赎回期域名"),a("em",[t._v(t._s(t.charData.expireReportInfo?t.charData.expireReportInfo[t.getIdxItem(2)].domainCount:0))]),t._v("个。")])])},staticRenderFns:[]};var i=a("VU/8")(r,n,!1,function(t){a("+3KQ")},"data-v-ebfafc3a",null);e.a=i.exports},eStX:function(t,e){},rmbP:function(t,e){},wG9t:function(t,e){}});
//# sourceMappingURL=13.f6ee436a20267f750a35.js.map