webpackJsonp([20],{"4rnL":function(e,t){},BI7l:function(e,t){},ULCL:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("Dd8w"),o=s.n(a),r=s("NYxO"),i=s("5reh"),n=s("XrW5"),l=s("naar"),c={components:{compInput:n.a},props:{defaultValue:{type:String,default:""},onClose:{type:Function},userCode:{type:String,default:""}},data:function(){return{loadingBtn:!1}},methods:o()({close:function(){this.onClose()},updateForm:function(){var e=this;if(this.loadingBtn=!0,Object(l.a)([this.$refs.userTel])){var t={param:{userCode:this.$refs.userCode.value,userTel:this.$refs.userTel.value},callback:function(t){e.loadingBtn=!1,"1000"===t.data.code?(e.$Message.success("座机更新成功"),e.$store.commit(i._94,e.$refs.userTel.value),e.close()):"200"===t.data.code?e.$Message.error("用户不存在"):"300"===t.data.code?e.$Message.error("用户被锁定"):e.$Message.error("更新失败")}};this.updateUserInfo(t)}else this.loadingBtn=!1}},Object(r.b)({updateUserInfo:i._91})),computed:{},beforeMount:function(){},watch:{}},d={render:function(){var e=this.$createElement,t=this._self._c||e;return t("Form",{attrs:{"label-width":150}},[t("FormItem",{attrs:{label:"座机："}},[t("comp-input",{ref:"userTel",attrs:{name:"userTel",label:"座机",defaultValue:this.defaultValue}}),t("input",{ref:"userCode",attrs:{type:"hidden"},domProps:{value:this.userCode}})],1),t("FormItem",{attrs:{label:""}},[t("Button",{attrs:{type:"primary",loading:this.loadingBtn},on:{click:this.updateForm}},[this._v("确定")])],1)],1)},staticRenderFns:[]};var u=s("VU/8")(c,d,!1,function(e){s("BI7l")},"data-v-77d80397",null).exports,f={components:{compInput:n.a},props:{onClose:{type:Function},userMobile:{type:String,default:""},userCode:{type:String,default:""},userName:{type:String,default:""}},data:function(){return{loadingBtn:!1,step:1}},methods:o()({close:function(){this.onClose()},getVerificationCode1:function(){var e=this;this.loadingBtn=!0;var t={param:{},callback:function(t){e.loadingBtn=!1,"1000"===t.data.code?e.$Message.success("发送成功"):"300"===t.data.code?e.$Message.error("短信验证码已发送"):"500"===t.data.code?e.$Message.error("手机号码错误"):e.$Message.error("发送失败")}};this.getOldPhoneCode(t)},getVerificationCode2:function(){var e=this;if(this.loadingBtn=!0,Object(l.a)([this.$refs.userMobile])){var t={param:{userMobile:this.$refs.userMobile.value},callback:function(t){e.loadingBtn=!1,"1000"===t.data.code?e.$Message.success("发送成功"):"300"===t.data.code?e.$Message.error("短信验证码已发送"):"500"===t.data.code?e.$refs.userMobile.showValidateResult({text:"手机号码错误"}):e.$Message.error("发送失败")}};this.getUpdatePhoneCode(t)}else this.loadingBtn=!1},nextForm:function(){var e=this;if(this.loadingBtn=!0,Object(l.a)([this.$refs.verificationCode1])){var t={param:{verificationCode:this.$refs.verificationCode1.value},callback:function(t){e.loadingBtn=!1,"1000"===t.data.code?(e.$Message.success("验证成功"),e.step=2):e.$Message.error("验证失败")}};this.checkOldPhoneCode(t)}else this.loadingBtn=!1},updateForm:function(){var e=this;if(this.loadingBtn=!0,Object(l.a)([this.$refs.userMobile,this.$refs.verificationCode2])){var t={param:{userCode:this.$refs.userCode.value,userMobile:this.$refs.userMobile.value,verificationCode:this.$refs.verificationCode2.value},callback:function(t){e.loadingBtn=!1,"1000"===t.data.code?(e.$Message.success("手机更新成功"),e.$store.commit(i._92,e.$refs.userMobile.value),e.close()):"200"===t.data.code?e.$Message.error("用户不存在"):"300"===t.data.code?e.$Message.error("用户被锁定"):"400"===t.data.code?e.$refs.verificationCode2.showValidateResult({text:"手机验证码错误"}):"600"===t.data.code&&e.$refs.userMobile.showValidateResult({text:"手机号码已存在"})}};this.updateUserInfo(t)}else this.loadingBtn=!1}},Object(r.b)({updateUserInfo:i._91,getOldPhoneCode:i.v,getUpdatePhoneCode:i.w,checkOldPhoneCode:i.e})),computed:{},beforeMount:function(){},watch:{}},m={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("Form",{staticClass:"accountMobileModify",attrs:{"label-width":150}},[s("div",{directives:[{name:"show",rawName:"v-show",value:1===e.step,expression:"step===1"}],staticClass:"step1"},[s("FormItem",{attrs:{label:""}},[s("p",{staticClass:"tips"},[e._v("请使用账号"+e._s(e.userName)+"（"+e._s(e.userCode)+"）绑定手机号"),s("em",[e._v(e._s(e.userMobile))]),e._v(" "),s("br"),e._v("接收短信验证码")])]),s("FormItem",{attrs:{label:""}},[s("comp-input",{ref:"verificationCode1",attrs:{name:"verificationCode",label:"短信验证码",defaultValue:"",placeholder:"短信验证码",styles:"width:118px",maxLength:6}},[s("Button",{staticClass:"verificationCode",attrs:{slot:"right",loading:e.loadingBtn},on:{click:e.getVerificationCode1},slot:"right"},[e._v("获取短信验证码")])],1)],1),s("FormItem",{attrs:{label:""}},[s("Button",{attrs:{type:"primary",loading:e.loadingBtn},on:{click:e.nextForm}},[e._v("下一步")])],1)],1),s("div",{directives:[{name:"show",rawName:"v-show",value:2===e.step,expression:"step===2"}],staticClass:"step2"},[s("FormItem",{attrs:{label:""}},[s("comp-input",{ref:"userMobile",attrs:{name:"userMobile",label:"新手机号码",validate:"mobile",defaultValue:"",placeholder:"请输入新手机号码",maxLength:11}})],1),s("FormItem",{attrs:{label:""}},[s("comp-input",{ref:"verificationCode2",attrs:{name:"verificationCode",label:"短信验证码",defaultValue:"",placeholder:"短信验证码",styles:"width:118px",maxLength:6}},[s("Button",{staticClass:"verificationCode",attrs:{slot:"right",loading:e.loadingBtn},on:{click:e.getVerificationCode2},slot:"right"},[e._v("获取短信验证码")])],1)],1),s("FormItem",{attrs:{label:""}},[s("Button",{attrs:{type:"primary",loading:e.loadingBtn},on:{click:e.updateForm}},[e._v("完成")])],1)],1),s("input",{ref:"userCode",attrs:{type:"hidden"},domProps:{value:e.userCode}})])},staticRenderFns:[]};var p=s("VU/8")(f,m,!1,function(e){s("z41l")},"data-v-21207bfe",null).exports,h=s("973t"),v={components:{compInput:n.a,compRePassword:h.a},props:{onClose:{type:Function},userMobile:{type:String,default:""},userCode:{type:String,default:""},userName:{type:String,default:""}},data:function(){return{loadingBtn:!1,step:1}},methods:o()({close:function(){this.onClose()},getVerificationCode:function(){var e=this;this.loadingBtn=!0;var t={param:{},callback:function(t){e.loadingBtn=!1,"1000"===t.data.code?e.$Message.success("发送成功"):"300"===t.data.code?e.$Message.error("短信验证码已发送"):"500"===t.data.code?e.$Message.error("手机号码错误"):e.$Message.error("发送失败")}};this.getOldPhoneCode(t)},nextForm:function(){var e=this;if(this.loadingBtn=!0,Object(l.a)([this.$refs.verificationCode])){var t={param:{verificationCode:this.$refs.verificationCode.value},callback:function(t){e.loadingBtn=!1,"1000"===t.data.code?(e.$Message.success("验证成功"),e.step=2):e.$Message.error("验证失败")}};this.checkOldPhoneCode(t)}else this.loadingBtn=!1},updateForm:function(){var e=this;if(this.loadingBtn=!0,Object(l.a)([this.$refs.compRePassword])){var t={param:{userCode:this.$refs.userCode.value,newPassword:this.$refs.compRePassword.$refs.password.value},callback:function(t){e.loadingBtn=!1,"1000"===t.data.code?(e.$Message.success("登录密码更新成功"),e.close()):"200"===t.data.code?e.$Message.error("用户不存在"):"300"===t.data.code?e.$Message.error("用户被锁定"):"400"===t.data.code?e.$Message.error("原始密码错误"):e.$Message.error("登录密码更新失败")}};this.updateUserPassword(t)}else this.loadingBtn=!1}},Object(r.b)({updateUserInfo:i._91,getOldPhoneCode:i.v,checkOldPhoneCode:i.e,updateUserPassword:i._93})),computed:{},beforeMount:function(){}},g={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("Form",{attrs:{"label-width":150}},[s("div",{directives:[{name:"show",rawName:"v-show",value:1===e.step,expression:"step===1"}],staticClass:"step1"},[s("FormItem",{attrs:{label:""}},[s("p",{staticClass:"tips"},[e._v("请使用账号"+e._s(e.userName)+"（"+e._s(e.userCode)+"）绑定手机号"),s("em",[e._v(e._s(e.userMobile))]),e._v(" "),s("br"),e._v("接收短信验证码")])]),s("FormItem",{attrs:{label:""}},[s("comp-input",{ref:"verificationCode",attrs:{name:"verificationCode",label:"短信验证码",defaultValue:"",placeholder:"短信验证码",styles:"width:118px",maxLength:6}},[s("Button",{staticClass:"verificationCode",attrs:{slot:"right",loading:e.loadingBtn},on:{click:e.getVerificationCode},slot:"right"},[e._v("获取短信验证码")])],1)],1),s("FormItem",{attrs:{label:""}},[s("Button",{attrs:{type:"primary",loading:e.loadingBtn},on:{click:e.nextForm}},[e._v("下一步")])],1)],1),s("div",{directives:[{name:"show",rawName:"v-show",value:2===e.step,expression:"step===2"}],staticClass:"step2"},[s("comp-re-password",{ref:"compRePassword",attrs:{defaultValue:"",label1:"请输入新密码：",label2:"请重复输入新密码：",type:"rePassword"}}),s("FormItem",{attrs:{label:""}},[s("Button",{attrs:{type:"primary",loading:e.loadingBtn},on:{click:e.updateForm}},[e._v("完成")])],1)],1),s("input",{ref:"userCode",attrs:{type:"hidden"},domProps:{value:e.userCode}})])},staticRenderFns:[]};var C={components:{compAccountTelModify:u,compAccountMobileModify:p,compAccountPasswordModify:s("VU/8")(v,g,!1,function(e){s("4rnL")},"data-v-04e2f861",null).exports},data:function(){return{refresh:!1,loadingBtn:!1,drawerModifyTel:!1,drawerModifyMobile:!1,drawerModifyPw:!1}},methods:{closeDrawer:function(){this.drawerModifyTel=!1,this.drawerModifyMobile=!1,this.drawerModifyPw=!1},drawerChange:function(){}},computed:o()({},Object(r.d)({myUserInfo:function(e){return e.user.myUserInfo},maskClosable:function(e){return e.maskClosable},userAuthGroups:function(e){return e.user.userAuthGroups}})),beforeMount:function(){},watch:{}},b={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"contMyAccount"},[s("h1",{staticClass:"pageTitle clear"},[e._v("我的账号"),s("div",{staticClass:"tR"},[s("Button",{on:{click:function(t){e.drawerModifyPw=!0}}},[e._v("修改登录密码")])],1)]),s("div",{staticClass:"secMain"},[e._m(0),s("table",[s("tr",[s("td",{staticClass:"col1",attrs:{colspan:"2"}},[e._v("姓名："+e._s(e.myUserInfo.userName))])]),s("tr",[s("td",{staticClass:"col1",attrs:{colspan:"2"},domProps:{textContent:e._s("性别："+(e.myUserInfo.userSex?"男":"女"))}})]),s("tr",[s("td",{staticClass:"col1",attrs:{colspan:"2"}},[e._v("用户名："+e._s(e.myUserInfo.userCode))])]),s("tr",[s("td",{staticClass:"col1",attrs:{colspan:"2"}},[e._v(e._s(e.myUserInfo.keeperFlag?"管理企业":"所属企业")+"："+e._s(e.myUserInfo.manageCustomerName))])])]),e._m(1),s("table",[s("tr",[s("td",{staticClass:"col1"},[e._v("手机："+e._s(e.myUserInfo.userMobile))]),s("td",{staticClass:"col2"},[s("a",{attrs:{href:"javascript:;"},on:{click:function(t){e.drawerModifyMobile=!0}}},[e._v("修改")])])]),s("tr",[s("td",{staticClass:"col1"},[e._v("座机："+e._s(e.myUserInfo.userTel))]),s("td",{staticClass:"col2"},[s("a",{attrs:{href:"javascript:;"},on:{click:function(t){e.drawerModifyTel=!0}}},[e._v("修改")])])]),s("tr",[s("td",{staticClass:"col1",attrs:{colspan:"2"}},[e._v("邮箱："+e._s(e.myUserInfo.userEmail))])]),s("tr",[s("td",{staticClass:"col1",attrs:{colspan:"2"}},[e._v("QQ："+e._s(e.myUserInfo.qq))])]),s("tr",[s("td",{staticClass:"col1",attrs:{colspan:"2"}},[e._v("微信："+e._s(e.myUserInfo.wx))])])]),e._m(2),s("table",[s("tr",[s("td",{staticClass:"col1",attrs:{colspan:"2"}},[e._v("员工角色："+e._s(e.myUserInfo.userRoles[0].roleName))]),s("td")]),s("tr",[s("td",{attrs:{colspan:"2"}},[s("span",{staticClass:"n"},[e._v("域名权限：")]),s("div",{staticClass:"v"},e._l(e.userAuthGroups.companys,function(t){return s("p",[e._v(e._s(t.name)),t.groups?s("ul",e._l(t.groups,function(a){return t.groups?s("li",[s("i"),e._v(" "+e._s(a.name))]):e._e()})):e._e()])}))])])])]),s("Drawer",{attrs:{closable:!0,width:"640",title:"修改座机号码","mask-closable":e.maskClosable},on:{"on-visible-change":e.drawerChange},model:{value:e.drawerModifyTel,callback:function(t){e.drawerModifyTel=t},expression:"drawerModifyTel"}},[e.drawerModifyTel?s("comp-account-tel-modify",{attrs:{defaultValue:e.myUserInfo.userTel,"on-close":e.closeDrawer,userCode:e.myUserInfo.userCode}}):e._e()],1),s("Drawer",{attrs:{closable:!0,width:"640",title:"修改绑定手机号码","mask-closable":e.maskClosable},on:{"on-visible-change":e.drawerChange},model:{value:e.drawerModifyMobile,callback:function(t){e.drawerModifyMobile=t},expression:"drawerModifyMobile"}},[e.drawerModifyMobile?s("comp-account-mobile-modify",{attrs:{"on-close":e.closeDrawer,userName:e.myUserInfo.userName,userCode:e.myUserInfo.userCode,userMobile:e.myUserInfo.userMobile}}):e._e()],1),s("Drawer",{attrs:{closable:!0,width:"640",title:"修改登录密码","mask-closable":e.maskClosable},on:{"on-visible-change":e.drawerChange},model:{value:e.drawerModifyPw,callback:function(t){e.drawerModifyPw=t},expression:"drawerModifyPw"}},[e.drawerModifyPw?s("comp-account-password-modify",{attrs:{"on-close":e.closeDrawer,userName:e.myUserInfo.userName,userCode:e.myUserInfo.userCode,userMobile:e.myUserInfo.userMobile}}):e._e()],1)],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("h3",[this._v("基本信息"),t("i")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h3",[this._v("联系人信息"),t("i")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h3",[this._v("管理信息"),t("i")])}]};var M=s("VU/8")(C,b,!1,function(e){s("XBQv")},"data-v-e5cebf54",null);t.default=M.exports},XBQv:function(e,t){},z41l:function(e,t){}});
//# sourceMappingURL=20.69f3867309e7ee2a588f.js.map