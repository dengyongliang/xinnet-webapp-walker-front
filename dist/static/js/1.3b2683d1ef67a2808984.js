webpackJsonp([1],{"6UM6":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("Dd8w"),n=s.n(i),a=s("NYxO"),r={data:function(){return{}},computed:n()({super:function(){return this.myUserInfo.userRoles&&this.myUserInfo.userRoles[0].roleCode.indexOf("super")>=0},keeper:function(){return this.myUserInfo.keeperFlag}},Object(a.d)({myUserInfo:function(e){return e.user.myUserInfo},menus:function(e){return e.user.menus?e.user.menus:[]}})),methods:{},beforeMount:function(){}},o={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"menuBody"},[this.keeper||this.super||e.menus.indexOf("client_index")>=0?s("div",{staticClass:"menuBox"},[s("h3",{staticClass:"menuT lv1"},[s("Icon",{staticClass:"fontL",attrs:{custom:"i-icon i-icon-home",size:"16"}}),s("router-link",{attrs:{to:"/home"}},[e._v("首页")])],1)]):e._e(),s("div",{staticClass:"menuBox",staticStyle:{display:"none"}},[s("h3",{staticClass:"menuT lv1"},[s("Icon",{staticClass:"fontL",attrs:{custom:"i-icon i-icon-state",size:"16"}}),s("router-link",{attrs:{to:"/account/my"}},[e._v("域名注册")])],1)]),s("div",{staticClass:"menuBox",staticStyle:{display:"none"}},[s("h3",{staticClass:"menuT lv1"},[s("Icon",{staticClass:"fontL",attrs:{custom:"i-icon i-icon-recommend",size:"16"}}),s("router-link",{attrs:{to:"/account/my"}},[e._v("域名推荐")])],1)]),this.keeper||this.super||e.menus.indexOf("client_domain")>=0?s("div",{staticClass:"menuBox"},[s("h3",{staticClass:"menuT lv1"},[s("Icon",{staticClass:"fontL",attrs:{custom:"i-icon i-icon-manage",size:"16"}}),s("span",[e._v("域名管理")])],1),s("ul",{staticClass:"menuList"},[this.keeper||this.super||e.menus.indexOf("client_domain_overview")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/domain/overview"}},[e._v("域名总览")])],1):e._e(),this.keeper||this.super||e.menus.indexOf("client_domain_manage")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/domain/mgmt"}},[e._v("域名管理")])],1):e._e(),this.keeper||this.super||e.menus.indexOf("client_domain_safe")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/domain/security"}},[e._v("域名安全服务")])],1):e._e(),this.keeper||this.super||e.menus.indexOf("client_domain_transferin")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/domain/transferin"}},[e._v("域名转入管理")])],1):e._e(),this.keeper||this.super||e.menus.indexOf("client_domain_change")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/domain/change"}},[e._v("域名过户")])],1):e._e(),this.keeper||this.super||e.menus.indexOf("client_domain_realname")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/domain/realnameDomain"}},[e._v("域名实名制管理")])],1):e._e(),this.keeper||this.super||e.menus.indexOf("client_domain_template")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/domain/realname"}},[e._v("实名模板管理")])],1):e._e()])]):e._e(),this.keeper||this.super||e.menus.indexOf("client_monitor")>=0?s("div",{staticClass:"menuBox"},[s("h3",{staticClass:"menuT lv1"},[s("Icon",{staticClass:"fontL",attrs:{custom:"i-icon i-icon-finance",size:"16"}}),s("span",[e._v("域名监控")])],1),s("ul",{staticClass:"menuList"},[this.keeper||this.super||e.menus.indexOf("client_monitor_own")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/monitor/own"}},[e._v("自有域名监控")])],1):e._e(),s("li",{staticClass:"menuItem lv2",staticStyle:{display:"none"}},[s("router-link",{attrs:{to:"/monitor/focus"}},[e._v("关注域名监控")])],1)])]):e._e(),this.keeper||this.super||e.menus.indexOf("client_finance")>=0?s("div",{staticClass:"menuBox"},[s("h3",{staticClass:"menuT lv1"},[s("Icon",{staticClass:"fontL",attrs:{custom:"i-icon i-icon-bill",size:"16"}}),s("span",[e._v("财务")])],1),s("ul",{staticClass:"menuList"},[this.keeper||this.super||e.menus.indexOf("client_finance_overview")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/finance/overview"}},[e._v("财务总览")])],1):e._e(),this.keeper||this.super||e.menus.indexOf("client_finance_bill")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/finance/billMgmt"}},[e._v("账单管理")])],1):e._e()])]):e._e(),this.keeper||this.super||e.menus.indexOf("client_order")>=0?s("div",{staticClass:"menuBox"},[s("h3",{staticClass:"menuT lv1"},[s("Icon",{staticClass:"fontL",attrs:{custom:"i-icon i-icon-file",size:"16"}}),s("span",[e._v("订单")])],1),s("ul",{staticClass:"menuList"},[this.keeper||this.super||e.menus.indexOf("client_order_manage")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/order/orderMgmt"}},[e._v("订单管理")])],1):e._e()])]):e._e(),this.keeper||this.super||e.menus.indexOf("client_user")>=0?s("div",{staticClass:"menuBox"},[s("h3",{staticClass:"menuT lv1"},[s("Icon",{staticClass:"fontL",attrs:{custom:"i-icon i-icon-admin",size:"16"}}),s("span",[e._v("管理")])],1),s("ul",{staticClass:"menuList"},[this.keeper||this.super||e.menus.indexOf("client_user_myUserInfo")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/mgmt/myAccount"}},[e._v("我的账号")])],1):e._e(),this.keeper||this.super||e.menus.indexOf("client_user_userManage")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/mgmt/accountMgmt"}},[e._v("账号管理")])],1):e._e(),this.keeper||this.super||e.menus.indexOf("client_user_companyManage")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/mgmt/enterprise"}},[e._v("企业管理")])],1):e._e(),this.keeper||this.super||e.menus.indexOf("client_user_roleManage")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/mgmt/roles"}},[e._v("角色管理")])],1):e._e(),this.keeper||this.super||e.menus.indexOf("client_user_workOrderManage")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/mgmt/workorder"}},[e._v("工单管理")])],1):e._e()])]):e._e(),this.keeper||this.super||e.menus.indexOf("client_log")>=0?s("div",{staticClass:"menuBox"},[s("h3",{staticClass:"menuT lv1"},[s("Icon",{staticClass:"fontL",attrs:{custom:"i-icon i-icon-diary",size:"16"}}),s("span",[e._v("监控日志")])],1),s("ul",{staticClass:"menuList"},[this.keeper||this.super||e.menus.indexOf("client_log_domain")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/record/domain"}},[e._v("域名监控日志")])],1):e._e(),this.keeper||this.super||e.menus.indexOf("client_log_user")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/record/staff"}},[e._v("员工监控日志")])],1):e._e()])]):e._e(),this.keeper||this.super||e.menus.indexOf("client_notice")>=0?s("div",{staticClass:"menuBox"},[s("h3",{staticClass:"menuT lv1"},[s("Icon",{staticClass:"fontL",attrs:{custom:"i-icon i-icon-notice",size:"16"}}),s("span",[e._v("通知中心")])],1),s("ul",{staticClass:"menuList"},[this.keeper||this.super||e.menus.indexOf("client_notice_monitor")>=0?s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/notice/monitoring"}},[e._v("监控通知")])],1):e._e()])]):e._e(),s("div",{staticClass:"menuBox",staticStyle:{display:"none"}},[s("h3",{staticClass:"menuT lv1"},[s("Icon",{staticClass:"fontL",attrs:{custom:"i-icon i-icon-housekeeper2",size:"16"}}),s("span",[e._v("管家功能")])],1),s("ul",{staticClass:"menuList"},[s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/service/butler"}},[e._v("域名转入")])],1),s("li",{staticClass:"menuItem lv2"},[s("router-link",{attrs:{to:"/service/worklist"}},[e._v("批量创建员工")])],1)])])])},staticRenderFns:[]};var l={name:"MAIN_BODY",components:{menuBody:s("VU/8")(r,o,!1,function(e){s("eH/X")},"data-v-7fb1130e",null).exports,headerBody:s("HRgV").a},data:function(){return{}},mounted:function(){},beforeMount:function(){},methods:{},computed:n()({},Object(a.d)(["islogin"]))},u={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"pageMain"},[t("header-body"),t("div",{staticClass:"frameBottom"},[t("div",{staticClass:"frameMenu"},[t("menu-body")],1),t("div",{staticClass:"frameBody"},[this.islogin?t("router-view"):this._e()],1)])],1)},staticRenderFns:[]};var c=s("VU/8")(l,u,!1,function(e){s("TlmC")},null,null);t.default=c.exports},TlmC:function(e,t){},"eH/X":function(e,t){}});
//# sourceMappingURL=1.3b2683d1ef67a2808984.js.map