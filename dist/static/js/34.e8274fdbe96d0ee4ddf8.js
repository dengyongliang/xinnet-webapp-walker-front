webpackJsonp([34],{IDZs:function(e,t){},zUuh:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("Dd8w"),r=s.n(n),a=s("NYxO"),o={components:{headerBody:s("HRgV").a},data:function(){return{value:"",loadingTable:!1,loadingBtn:!1,start:"",end:"",type:"center"}},methods:{},computed:r()({},Object(a.d)({myUserInfo:function(e){return e.user.myUserInfo}})),beforeMount:function(){this.$route.query.type&&(this.type=this.$route.query.type),this.start=this.$route.query.start,this.end=this.$route.query.end},mounted:function(){},watch:{}},i={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"pageReport"},[s("header-body"),s("div",{staticClass:"mainBody"},[s("div",{staticClass:"img"},[s("p",[e._v(e._s(e.myUserInfo.manageCustomerName))]),s("strong",{directives:[{name:"show",rawName:"v-show",value:"center"===e.type,expression:"type==='center'"}]},[e._v("报告中心")]),s("strong",{directives:[{name:"show",rawName:"v-show",value:"assets"===e.type,expression:"type==='assets'"}]},[e._v("域名资产报告")]),s("strong",{directives:[{name:"show",rawName:"v-show",value:"own"===e.type,expression:"type==='own'"}]},[e._v("自有域名监控报告")]),s("strong",{directives:[{name:"show",rawName:"v-show",value:"budget"===e.type,expression:"type==='budget'"}]},[e._v(e._s(e._f("dateformat")(e.start))+" ~ "+e._s(e._f("dateformat")(e.end))+" 域名预算报告")]),s("strong",{directives:[{name:"show",rawName:"v-show",value:"spending"===e.type,expression:"type==='spending'"}]},[e._v(e._s(e._f("dateformat")(e.start))+" ~ "+e._s(e._f("dateformat")(e.end))+" 域名消费报告")])]),s("router-view")],1)],1)},staticRenderFns:[]};var u=s("VU/8")(o,i,!1,function(e){s("IDZs")},null,null);t.default=u.exports}});
//# sourceMappingURL=34.e8274fdbe96d0ee4ddf8.js.map