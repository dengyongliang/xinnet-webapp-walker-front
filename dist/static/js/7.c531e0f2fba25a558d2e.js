webpackJsonp([7],{dcP8:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Dd8w"),l=a.n(i),n=a("NYxO"),s=a("5reh"),r=a("vyg+"),o=a("5GVD"),c={components:{compRadio:r.a,compSelect:o.a},props:{},data:function(){return{loadingBtn:!1,notifyDetail:[],rangeList:[{value:"仅通知域名所在分组负责人",label:"1"},{value:"通知域名所在分组全部管理人员",label:"2"}],wayList:[{label:"不通知",value:"1"},{label:"短信通知",value:"2"},{label:"邮件通知",value:"3"},{label:"短信和邮件通知",value:"4"}]}},methods:l()({saveForm:function(){var t=this,e={param:{notifyInfo:function(t){for(var e=[],a=1;a<=9;a++)5===a?e.push({type:a,way:1*t.$refs.way4.value,range:1*t.$refs.way4.value}):7===a?e.push({type:a,way:1*t.$refs.way6.value,range:1*t.$refs.way6.value}):e.push({type:a,way:1*t.$refs["way"+a].value,range:1*t.$refs["range"+a].value});return e}(this)},callback:function(e){t.loadingBtn=!1,"1000"===e.data.code&&(t.$Message.success("保存成功"),t.$emit("refreshData"))}};console.log(e.param),this.setNotify(e)},getIdxItem:function(t){return this.notifyDetail.findIndex(function(e){return e.notifyType===t})}},Object(n.b)({setNotify:s._65,queryNotifyDetail:s._34})),computed:{},beforeMount:function(){var t=this,e={param:{},callback:function(e){t.loadingBtn=!1,"1000"===e.data.code&&(t.notifyDetail=e.data.data.list)}};this.queryNotifyDetail(e)},watch:{}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"compNoticeSet"},[a("Form",{ref:"type3",attrs:{"label-width":120}},[a("h3",[a("span",[t._v("域名信息修改")])]),a("FormItem",{attrs:{label:"通知范围："}},[a("comp-radio",{ref:"range3",staticClass:"radioRange",attrs:{name:"range",list:t.rangeList,defaultValue:t.notifyDetail.length>0?t.notifyDetail[t.getIdxItem(3)].notifyRange.toString():"1"}})],1),a("FormItem",{attrs:{label:"通知方式："}},[a("comp-select",{ref:"way3",staticClass:"radioWay",attrs:{name:"way",list:t.wayList,defaultValue:t.notifyDetail.length>0?t.notifyDetail[t.getIdxItem(3)].notifyWay.toString():"3"}})],1)],1),a("Form",{ref:"type4",attrs:{"label-width":120}},[a("h3",[a("span",[t._v("域名过户/实名认证")])]),a("FormItem",{attrs:{label:"通知范围："}},[a("comp-radio",{ref:"range4",staticClass:"radioRange",attrs:{name:"range",list:t.rangeList,defaultValue:t.notifyDetail.length>0?t.notifyDetail[t.getIdxItem(4)].notifyRange.toString():"1"}})],1),a("FormItem",{attrs:{label:"通知方式："}},[a("comp-select",{ref:"way4",staticClass:"radioWay",attrs:{name:"way",list:t.wayList,defaultValue:t.notifyDetail.length>0?t.notifyDetail[t.getIdxItem(4)].notifyWay.toString():"3"}})],1)],1),a("Form",{ref:"type8",attrs:{"label-width":120}},[a("h3",[a("span",[t._v("域名安全设置")])]),a("FormItem",{attrs:{label:"通知范围："}},[a("comp-radio",{ref:"range8",staticClass:"radioRange",attrs:{name:"range",list:t.rangeList,defaultValue:t.notifyDetail.length>0?t.notifyDetail[t.getIdxItem(8)].notifyRange.toString():"1"}})],1),a("FormItem",{attrs:{label:"通知方式："}},[a("comp-select",{ref:"way8",staticClass:"radioWay",attrs:{name:"way",list:t.wayList,defaultValue:t.notifyDetail.length>0?t.notifyDetail[t.getIdxItem(8)].notifyWay.toString():"3"}})],1)],1),a("Form",{ref:"type2",attrs:{"label-width":120}},[a("h3",[a("span",[t._v("域名状态变化")])]),a("FormItem",{attrs:{label:"通知范围："}},[a("comp-radio",{ref:"range2",staticClass:"radioRange",attrs:{name:"range",list:t.rangeList,defaultValue:t.notifyDetail.length>0?t.notifyDetail[t.getIdxItem(2)].notifyRange.toString():"1"}})],1),a("FormItem",{attrs:{label:"通知方式："}},[a("comp-select",{ref:"way2",staticClass:"radioWay",attrs:{name:"way",list:t.wayList,defaultValue:t.notifyDetail.length>0?t.notifyDetail[t.getIdxItem(2)].notifyWay.toString():"3"}})],1)],1),a("Form",{ref:"type6",attrs:{"label-width":120}},[a("h3",[a("span",[t._v("域名解析/DNS服务器修改")])]),a("FormItem",{attrs:{label:"通知范围："}},[a("comp-radio",{ref:"range6",staticClass:"radioRange",attrs:{name:"range",list:t.rangeList,defaultValue:t.notifyDetail.length>0?t.notifyDetail[t.getIdxItem(6)].notifyRange.toString():"1"}})],1),a("FormItem",{attrs:{label:"通知方式："}},[a("comp-select",{ref:"way6",staticClass:"radioWay",attrs:{name:"way",list:t.wayList,defaultValue:t.notifyDetail.length>0?t.notifyDetail[t.getIdxItem(6)].notifyWay.toString():"3"}})],1)],1),a("Form",{ref:"type1",attrs:{"label-width":120}},[a("h3",[a("span",[t._v("域名到期时间通知")])]),a("FormItem",{attrs:{label:"通知范围："}},[a("comp-radio",{ref:"range1",staticClass:"radioRange",attrs:{name:"range",list:t.rangeList,defaultValue:t.notifyDetail.length>0?t.notifyDetail[t.getIdxItem(1)].notifyRange.toString():"1"}})],1),a("FormItem",{attrs:{label:"通知方式："}},[a("comp-select",{ref:"way1",staticClass:"radioWay",attrs:{name:"way",list:t.wayList,defaultValue:t.notifyDetail.length>0?t.notifyDetail[t.getIdxItem(1)].notifyWay.toString():"3"}})],1)],1),a("Form",{ref:"type9",attrs:{"label-width":120}},[a("h3",[a("span",[t._v("域名转入")])]),a("FormItem",{attrs:{label:"通知范围："}},[a("comp-radio",{ref:"range9",staticClass:"radioRange",attrs:{name:"range",list:t.rangeList,defaultValue:t.notifyDetail.length>0?t.notifyDetail[t.getIdxItem(9)].notifyRange.toString():"1"}})],1),a("FormItem",{attrs:{label:"通知方式："}},[a("comp-select",{ref:"way9",staticClass:"radioWay",attrs:{name:"way",list:t.wayList,defaultValue:t.notifyDetail.length>0?t.notifyDetail[t.getIdxItem(9)].notifyWay.toString():"3"}})],1)],1),a("div",{staticClass:"btn"},[a("Button",{attrs:{type:"primary",loading:t.loadingBtn},on:{click:t.saveForm}},[t._v("保存")])],1)],1)},staticRenderFns:[]};var f=a("VU/8")(c,d,!1,function(t){a("rSMA")},null,null).exports,m=a("PJh5"),g=a.n(m),u={components:{compNoticeSet:f},data:function(){var t=this;return{value:"",time:"",type:"",refresh:!1,drawerNoticeSet:!1,setReadDisabled:!0,selectData:[],typeList:[{value:"",label:"全部"},{value:1,label:"普通"},{value:2,label:"重要"}],columns:[{type:"selection",width:60,align:"center"},{title:"时间",width:200,key:"sendTime",className:"col1",render:function(e,a){return e("div",[e("i",{class:1===t.list[a.index].readFlag?"unRead":""},"●"),e("span",{},t.list[a.index].sendTime)])}},{title:"通知内容",key:"title",className:"col2",render:function(e,a){return e("div",[e("Icon",{props:{type:"md-alert",size:"17"},style:{color:"#f00",margin:"0 5px 0 0",display:2===t.list[a.index].sendType?"inline-block":"none"}},t.list[a.index].title),e("a",{style:{color:"#2271f4"}},t.list[a.index].title)])}}],list:[],loadingTable:!0,loadingBtn:!1,page:{pageNo:1,pagePages:1,pageItems:1}}},methods:l()({searchListData:function(){this.drawerNoticeSet=!1,this.queryList(this.queryListParam({pageNum:1}))},pageChange:function(t){this.queryList(this.queryListParam({pageNum:t}))},closeDrawer:function(){this.drawerNoticeSet=!1},drawerChange:function(){},handleSelectAll:function(t){this.$refs.selection.selectAll(t)},tableSelectChange:function(t){this.selectData=t,this.setReadDisabled=!t.length},setRead:function(){var t=this;this.getDomainId.map(function(e){var a={param:{id:e},callback:function(a){if("1000"===a.data.code){var i=t.list.findIndex(function(t){return t.id===e});t.list[i].readFlag=2}}};t.setMailRecordRead(a)})},queryListParam:function(t){var e=this;return this.page.pageNo=t.pageNum,this.loadingBtn=!0,this.loadingTable=!0,{param:{pageNum:t.pageNum,pageSize:20,createTimeBegin:""!==this.time[0]?g()(this.time[0]).format("YYYY-MM-DD")+" 00:00:00":"",createTimeEnd:""!==this.time[1]?g()(this.time[1]).format("YYYY-MM-DD")+" 23:59:59":"",type:this.type},callback:function(t){e.loadingBtn=!1,e.loadingTable=!1,"1000"===t.data.code&&(e.list=t.data.data.list,e.page.pageItems=t.data.data.totalNum)}}}},Object(n.b)({queryList:s._32,setMailRecordRead:s._63})),computed:l()({getDomainId:function(){return this.selectData.map(function(t){return t.id})}},Object(n.d)({maskClosable:function(t){return t.maskClosable}})),beforeMount:function(){this.queryList(this.queryListParam({pageNum:1}))}},y={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"contNoticeMonitoring"},[a("h1",{staticClass:"pageTitle clear"},[t._v("监控通知"),a("div",{staticClass:"tR"},[a("a",{staticClass:"btnSet",attrs:{href:"javascript:;"},on:{click:function(e){t.drawerNoticeSet=!0}}},[t._v("通知设置")])])]),a("div",{staticClass:"secFilter"},[a("form",{staticClass:"filterWrap"},[a("table",[a("tr",{staticClass:"row1"},[a("td",{staticClass:"td1"},[a("Button",{attrs:{loading:t.loadingBtn,disabled:t.setReadDisabled},on:{click:t.setRead}},[t._v("设为已读")])],1),a("td",{staticClass:"tdBtn",attrs:{colspan:"3"}},[a("span",{staticClass:"n"},[t._v("通知时间：")]),a("div",{staticClass:"inputWrap"},[a("DatePicker",{staticStyle:{width:"100%"},attrs:{type:"daterange",placeholder:"全部",format:"yyyy-MM-dd"},on:{"on-change":function(e){t.time=e}},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1),a("span",{staticClass:"n"},[t._v("通知类型：")]),a("div",{staticClass:"inputWrap"},[a("Select",{model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},t._l(t.typeList,function(e){return a("Option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])}))],1),a("Button",{attrs:{type:"primary",loading:t.loadingBtn},on:{click:t.searchListData}},[t._v("查询")])],1)])])])]),a("div",{staticClass:"secMain"},[a("div",{staticClass:"secTable"},[a("Table",{ref:"selection",attrs:{columns:t.columns,data:t.list,loading:t.loadingTable},on:{"on-select":t.tableSelectChange,"on-select-cancel":t.tableSelectChange,"on-select-all":t.tableSelectChange,"on-select-all-cancel":t.tableSelectChange}}),a("div",{staticClass:"tableTool"},[a("a",{attrs:{href:"javascript:;"},on:{click:function(e){t.handleSelectAll(!0)}}},[t._v("全选")]),a("a",{attrs:{href:"javascript:;"},on:{click:function(e){t.handleSelectAll(!1)}}},[t._v("取消全选")])])],1)]),a("Page",{attrs:{total:t.page.pageItems,current:t.page.pageNo,"show-elevator":"show-elevator","show-total":"show-total","prev-text":"上一页","next-text":"下一页","page-size":20},on:{"on-change":t.pageChange}}),a("Drawer",{attrs:{closable:!0,width:"640",title:"通知设置","mask-closable":t.maskClosable},on:{"on-visible-change":t.drawerChange},model:{value:t.drawerNoticeSet,callback:function(e){t.drawerNoticeSet=e},expression:"drawerNoticeSet"}},[t.drawerNoticeSet?a("comp-notice-set",{attrs:{"on-close":t.closeDrawer},on:{refreshData:t.searchListData}}):t._e()],1)],1)},staticRenderFns:[]};var p=a("VU/8")(u,y,!1,function(t){a("fmUs")},null,null);e.default=p.exports},fmUs:function(t,e){},rSMA:function(t,e){}});
//# sourceMappingURL=7.c531e0f2fba25a558d2e.js.map