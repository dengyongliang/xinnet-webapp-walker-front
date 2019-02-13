webpackJsonp([27],{Clla:function(e,t){},VW9M:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("Dd8w"),r=a.n(s),i=a("NYxO"),o=a("5reh"),n=a("8D3A"),d={components:{},props:{orderData:{type:Object,default:function(){return{data:[]}}},onClose:{type:Function},refresh:{type:Boolean,default:!1}},data:function(){return{}},methods:{showType:function(e){this.qaType=e,1===e?(this.tips=1,this.showOrderCode=!1,this.showMoney=!1,this.showUpdateType=!1,this.showSafeType=!1,this.domainNameRequired=!0,this.descriptionRequired=!1):2===e?(this.tips=1,this.showOrderCode=!1,this.showMoney=!0,this.showUpdateType=!1,this.showSafeType=!1,this.domainNameRequired=!0,this.descriptionRequired=!1):3===e?(this.tips=4,this.showOrderCode=!1,this.showMoney=!1,this.showUpdateType=!1,this.showSafeType=!0,this.domainNameRequired=!0,this.descriptionRequired=!1):4===e?(this.tips=2,this.showOrderCode=!0,this.showMoney=!1,this.showUpdateType=!1,this.showSafeType=!1,this.domainNameRequired=!0,this.descriptionRequired=!0):5===e?(this.tips=5,this.showOrderCode=!1,this.showMoney=!1,this.showUpdateType=!0,this.showSafeType=!1,this.domainNameRequired=!0,this.descriptionRequired=!1):6===e?(this.tips=5,this.showOrderCode=!1,this.showMoney=!1,this.showUpdateType=!1,this.showSafeType=!1,this.domainNameRequired=!0,this.descriptionRequired=!1):7===e?(this.tips=3,this.showOrderCode=!1,this.showMoney=!1,this.showUpdateType=!1,this.showSafeType=!1,this.domainNameRequired=!0,this.descriptionRequired=!1):8===e&&(this.tips=0,this.showOrderCode=!1,this.showMoney=!1,this.showUpdateType=!1,this.showSafeType=!1,this.domainNameRequired=!1,this.descriptionRequired=!0)}},computed:{},beforeMount:function(){},watch:{orderData:function(e,t){}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("Form",{staticClass:"workOrderForm",attrs:{"label-width":120}},[a("FormItem",{attrs:{label:"状态："}},[a("span",{directives:[{name:"show",rawName:"v-show",value:1===e.orderData.status,expression:"orderData.status===1"}],staticClass:"text"},[e._v("待处理")]),a("span",{directives:[{name:"show",rawName:"v-show",value:2===e.orderData.status,expression:"orderData.status===2"}],staticClass:"text"},[e._v("处理中")]),a("span",{directives:[{name:"show",rawName:"v-show",value:3===e.orderData.status,expression:"orderData.status===3"}],staticClass:"text"},[e._v("已完成")])]),a("FormItem",{attrs:{label:"问题类型："}},[a("span",{staticClass:"text"},[e._v(e._s(this.DATAS.QUESTION_TYPE[e.orderData.questionType]))]),a("p",{directives:[{name:"show",rawName:"v-show",value:1===e.orderData.questionType,expression:"orderData.questionType===1"}]},[a("Icon",{attrs:{custom:"i-icon i-icon-tips",size:"16"}}),e._v("可委托管家注册并管理行者平台暂不支持注册的域名。")],1),a("p",{directives:[{name:"show",rawName:"v-show",value:2===e.orderData.questionType,expression:"orderData.questionType===2"}]},[a("Icon",{attrs:{custom:"i-icon i-icon-tips",size:"16"}}),e._v("可委托管家尝试回购已被他人注册的域名。")],1),a("p",{directives:[{name:"show",rawName:"v-show",value:3===e.orderData.questionType,expression:"orderData.questionType===3"}]},[a("Icon",{attrs:{custom:"i-icon i-icon-tips",size:"16"}}),e._v("若遇到域名解析疑似被篡改或其他安全问题，请联系管家。")],1),a("p",{directives:[{name:"show",rawName:"v-show",value:4===e.orderData.questionType,expression:"orderData.questionType===4"}]},[a("Icon",{attrs:{custom:"i-icon i-icon-tips",size:"16"}}),e._v("关于订单、预付款、信用额度、账单等问题。")],1),a("p",{directives:[{name:"show",rawName:"v-show",value:5===e.orderData.questionType,expression:"orderData.questionType===5"}]},[a("Icon",{attrs:{custom:"i-icon i-icon-tips",size:"16"}}),e._v("托管域名的信息修改、解析、续费等需联系管家进行操作。")],1),a("p",{directives:[{name:"show",rawName:"v-show",value:7===e.orderData.questionType,expression:"orderData.questionType===7"}]},[a("Icon",{attrs:{custom:"i-icon i-icon-tips",size:"16"}}),e._v("已购买注册局锁服务的域名，若需开启或关闭注册局锁，请提交工单。")],1)]),a("FormItem",{attrs:{label:"域名："}},[a("pre",{staticClass:"text"},[e._v(e._s(e.orderData.domainName?e.orderData.domainName.replace(/[,，]/g,"\r\n"):"-"))])]),a("FormItem",{directives:[{name:"show",rawName:"v-show",value:4===e.orderData.questionType,expression:"orderData.questionType===4"}],attrs:{label:"订单编号："}},[a("span",{staticClass:"text"},[e._v(e._s(e.orderData.orderCode))])]),a("FormItem",{directives:[{name:"show",rawName:"v-show",value:2===e.orderData.questionType,expression:"orderData.questionType===2"}],attrs:{label:"预算："}},[a("span",{staticClass:"text"},[e._v(e._s(e.orderData.money)+" 元")])]),a("FormItem",{directives:[{name:"show",rawName:"v-show",value:5===e.orderData.questionType,expression:"orderData.questionType===5"}],attrs:{label:"修改类型："}},[a("span",{staticClass:"text"},[e._v(e._s(this.DATAS.QUESTION_MODIFY_TYPE[e.orderData.updateType]))])]),a("FormItem",{directives:[{name:"show",rawName:"v-show",value:3===e.orderData.questionType,expression:"orderData.questionType===3"}],attrs:{label:"安全问题类型："}},[a("span",{staticClass:"text"},[e._v(e._s(this.DATAS.SECURITY_TYPE[e.orderData.securityType]))])]),a("FormItem",{attrs:{label:"问题描述："}},[a("div",{staticClass:"text"},[e._v(e._s(e.orderData.description))])])],1)},staticRenderFns:[]};var c=a("VU/8")(d,l,!1,function(e){a("Clla")},"data-v-79583820",null).exports,h={components:{compWorkOrderSubmit:n.a,compWorkOrderDetail:c},data:function(){var e=this;return{columns:[{title:"提交时间",key:"createTime",className:"col1"},{title:"姓名",key:"userName",className:"col2"},{title:"用户ID",key:"userId",className:"col3"},{title:"问题类型",key:"questionType",className:"col4",render:function(t,a){return t("div",[t("span",{},e.DATAS.QUESTION_TYPE[e.list[a.index].questionType])])}},{title:"域名",key:"domainName",className:"col5"},{title:"状态",key:"status",className:"col6",render:function(t,a){return 1===e.list[a.index].status?t("div",[t("span",{},"待处理")]):2===e.list[a.index].status?t("div",[t("span",{},"处理中")]):3===e.list[a.index].status?t("div",[t("span",{},"已完成")]):void 0}},{title:"操作",key:"operate",className:"operate",render:function(t,a){return t("div",[t("a",{props:{href:"javascript:;"},on:{click:function(){e.showDetail(e.list[a.index].id)}}},"查看详情")])}}],refresh:!1,drawerWorkOrderSubmit:!1,drawerWorkOrderDetail:!1,list:[],loadingTable:!0,loadingBtn:!1,orderDetailInfo:{},page:{pageNo:1,pagePages:1,pageItems:1}}},methods:r()({searchListData:function(){this.queryWorkOrderManageList(this.queryOrderListParam({pageNum:1}))},pageChange:function(e){this.queryWorkOrderManageList(this.queryOrderListParam({pageNum:e}))},closeDrawer:function(){this.drawerWorkOrderSubmit=!1},drawerChange:function(){},showDetail:function(e){var t=this,a={param:{id:e},callback:function(e){if(!e)return!1;"1000"===e.data.code?t.orderDetailInfo=e.data.data:t.$Message.error("查询失败")}};this.queryWorkOrderDetail(a),this.drawerWorkOrderDetail=!0},queryOrderListParam:function(e){var t=this;return this.page.pageNo=e.pageNum,this.loadingBtn=!0,this.loadingTable=!0,{param:{pageNum:e.pageNum,pageSize:20},callback:function(e){if(t.loadingBtn=!1,t.loadingTable=!1,!e)return!1;"1000"===e.data.code?(t.list=e.data.data.list,t.page.pageItems=e.data.data.totalNum):"900"===e.data.code&&t.$Message.error("查询失败")}}}},Object(i.b)({queryWorkOrderManageList:o._51,queryWorkOrderDetail:o._50})),computed:r()({},Object(i.d)({maskClosable:function(e){return e.maskClosable}})),beforeMount:function(){this.queryWorkOrderManageList(this.queryOrderListParam({pageNum:1}))}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"contOrderMgmt"},[a("h1",{staticClass:"pageTitle clear"},[e._v("工单管理"),a("div",{staticClass:"tR"},[a("Button",{on:{click:function(t){e.drawerWorkOrderSubmit=!0}}},[e._v("+ 提交工单")])],1)]),a("div",{staticClass:"secMain"},[a("div",{staticClass:"secTable"},[a("Table",{attrs:{columns:e.columns,data:e.list,loading:e.loadingTable}})],1)]),a("Page",{attrs:{total:e.page.pageItems,current:e.page.pageNo,"show-elevator":"show-elevator","show-total":"show-total","prev-text":"上一页","next-text":"下一页","page-size":20},on:{"on-change":e.pageChange}}),a("Drawer",{attrs:{closable:!0,width:"640",title:"提交工单","mask-closable":e.maskClosable},on:{"on-visible-change":e.drawerChange},model:{value:e.drawerWorkOrderSubmit,callback:function(t){e.drawerWorkOrderSubmit=t},expression:"drawerWorkOrderSubmit"}},[e.drawerWorkOrderSubmit?a("comp-work-order-submit",{attrs:{"on-close":e.closeDrawer},on:{refreshData:e.searchListData}}):e._e()],1),a("Drawer",{attrs:{closable:!0,width:"640",title:"工单详情","mask-closable":e.maskClosable},on:{"on-visible-change":e.drawerChange},model:{value:e.drawerWorkOrderDetail,callback:function(t){e.drawerWorkOrderDetail=t},expression:"drawerWorkOrderDetail"}},[e.drawerWorkOrderDetail?a("comp-work-order-detail",{attrs:{"on-close":e.closeDrawer,orderData:e.orderDetailInfo}}):e._e()],1)],1)},staticRenderFns:[]};var p=a("VU/8")(h,u,!1,function(e){a("u+w5")},"data-v-2eb5357d",null);t.default=p.exports},"u+w5":function(e,t){}});
//# sourceMappingURL=27.ff4d6c3f57ce75ddb1ab.js.map