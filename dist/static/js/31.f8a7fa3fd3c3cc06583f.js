webpackJsonp([31],{pqYc:function(t,e){},qlbm:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Dd8w"),i=a.n(s),l=a("NYxO"),n=a("5reh"),r=a("zhkS"),o=a("PJh5"),c=a.n(o),u={components:{},data:function(){var t=this;return{value:"",time:"",levelType:"",exportLink:r.r,typeList:[{value:"",label:"全部"},{value:1,label:"普通"},{value:2,label:"重要"}],columns:[{title:"时间",width:150,key:"createTime",className:"col1"},{title:"员工",width:150,key:"userId",className:"col2",render:function(e,a){return e("div",[e("span",{},t.list[a.index].userName+"("+t.list[a.index].userCode+")")])}},{title:"事件类型",width:200,key:"type",className:"col3",render:function(e,a){return e("div",[e("span",{},t.DATAS.RECORD_USER_EVENT_TYPE[t.list[a.index].type])])}},{title:"日志详情",key:"content",className:"col4"}],list:[],loadingTable:!0,loadingBtn:!1,page:{pageNo:1,pagePages:1,pageItems:1}}},methods:i()({searchListData:function(){this.queryList(this.queryListParam({pageNum:1}))},pageChange:function(t){this.queryList(this.queryListParam({pageNum:t}))},exportOrder:function(){this.$refs.exportForm.submit()},queryListParam:function(t){var e=this;return this.page.pageNo=t.pageNum,this.loadingBtn=!0,this.loadingTable=!0,{param:{pageNum:t.pageNum,pageSize:20,userName:this.value,createTimeBegin:""!==this.time[0]?c()(this.time[0]).format("YYYY-MM-DD")+" 00:00:00":"",createTimeEnd:""!==this.time[1]?c()(this.time[1]).format("YYYY-MM-DD")+" 23:59:59":"",levelType:this.levelType},callback:function(t){if(e.loadingBtn=!1,e.loadingTable=!1,!t)return!1;"1000"===t.data.code&&(e.list=t.data.data.list,e.page.pageItems=t.data.data.totalNum)}}}},Object(l.b)({queryList:n._48,setMailRecordRead:n._63})),computed:{},beforeMount:function(){this.queryList(this.queryListParam({pageNum:1}))}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contRecordDomain"},[a("h1",{staticClass:"pageTitle clear"},[t._v("员工监控日志")]),a("div",{staticClass:"secFilter"},[a("form",{ref:"exportForm",staticClass:"filterWrap",attrs:{target:"_blank",method:"post","accept-charset":"utf-8",action:t.exportLink}},[a("table",[a("tr",{staticClass:"row1"},[a("td",{staticClass:"td1"},[a("span",{staticClass:"n"},[t._v("搜索：")]),a("div",{staticClass:"inputWrap"},[a("Input",{attrs:{placeholder:"请输入员工"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1)]),a("td",{staticClass:"td2"},[a("span",{staticClass:"n"},[t._v("日志记录时间：")]),a("div",{staticClass:"inputWrap"},[a("DatePicker",{staticStyle:{width:"100%"},attrs:{type:"daterange",placeholder:"全部",format:"yyyy-MM-dd"},on:{"on-change":function(e){t.time=e}},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1)]),a("td",{staticClass:"td3"},[a("span",{staticClass:"n"},[t._v("通知类型：")]),a("div",{staticClass:"inputWrap"},[a("Select",{model:{value:t.levelType,callback:function(e){t.levelType=e},expression:"levelType"}},t._l(t.typeList,function(e){return a("Option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])}))],1)]),a("td",{staticClass:"tdBtn",attrs:{colspan:"3"}},[a("Button",{attrs:{type:"primary",loading:t.loadingBtn},on:{click:t.searchListData}},[t._v("查询")]),a("a",{staticClass:"exportOrder",attrs:{href:"javascript:;"},on:{click:t.exportOrder}},[t._v("导出日志")])],1)])])])]),a("div",{staticClass:"secMain"},[a("div",{staticClass:"secTable"},[a("Table",{attrs:{columns:t.columns,data:t.list,loading:t.loadingTable}})],1)]),a("Page",{attrs:{total:t.page.pageItems,current:t.page.pageNo,"show-elevator":"show-elevator","show-total":"show-total","prev-text":"上一页","next-text":"下一页","page-size":20},on:{"on-change":t.pageChange}})],1)},staticRenderFns:[]};var d=a("VU/8")(u,p,!1,function(t){a("pqYc")},null,null);e.default=d.exports}});
//# sourceMappingURL=31.f8a7fa3fd3c3cc06583f.js.map