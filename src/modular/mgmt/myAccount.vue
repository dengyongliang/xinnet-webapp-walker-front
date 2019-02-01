<template lang="pug">
.contMyAccount
  <!-- 标题区 -->
  h1.pageTitle.clear 我的账号
    .tR
      Button(@click="drawerModifyPw=true") 修改登录密码
  .secMain
    h3 基本信息
      i
    table
      tr
        td.col1(colspan="2") 姓名：{{myUserInfo.userName}}
      tr
        td.col1(colspan="2", v-text="'性别：' + (myUserInfo.userSex ? '男' : '女')")
      tr
        td.col1(colspan="2") 用户名：{{myUserInfo.userCode}}
      tr
        td.col1(colspan="2",) {{myUserInfo.keeperFlag?'管理企业':'所属企业'}}：{{myUserInfo.manageCustomerName}}
    h3 联系人信息
      i
    table
      tr
        td.col1 手机：{{myUserInfo.userMobile}}
        td.col2
          a(href="javascript:;", @click="drawerModifyMobile=true") 修改
      tr
        td.col1 座机：{{myUserInfo.userTel}}
        td.col2
          a(href="javascript:;", @click="drawerModifyTel=true") 修改
      tr
        td.col1(colspan="2") 邮箱：{{myUserInfo.userEmail}}
      tr
        td.col1(colspan="2") QQ：{{myUserInfo.qq}}
      tr
        td.col1(colspan="2") 微信：{{myUserInfo.wx}}
    h3 管理信息
      i
    table
      tr
        td.col1(colspan="2") 员工角色：{{myUserInfo.userRoles[0].roleName}}
        td
      tr
        td(colspan="2")
          span.n 域名权限：
          .v
            p(v-for="item in userAuthGroups.companys") {{item.name}}
              ul(v-if="item.groups")
                li(v-if="item.groups", v-for="group in item.groups") <i></i> {{group.name}}

  <!-- 修改座机 抽屉 -->
  Drawer(:closable="true", width="640", v-model="drawerModifyTel", title="修改座机号码", :mask-closable="maskClosable", @on-visible-change="drawerChange")
    comp-account-tel-modify(
      v-if="drawerModifyTel",
      :defaultValue="myUserInfo.userTel",
      :on-close="closeDrawer",
      :userCode="myUserInfo.userCode"
    )
  <!-- 修改手机 抽屉 -->
  Drawer(:closable="true", width="640", v-model="drawerModifyMobile", title="修改绑定手机号码", :mask-closable="maskClosable", @on-visible-change="drawerChange")
    comp-account-mobile-modify(
      v-if="drawerModifyMobile",
      :on-close="closeDrawer",
      :userName = "myUserInfo.userName",
      :userCode = "myUserInfo.userCode",
      :userMobile = "myUserInfo.userMobile"
    )
  <!-- 修改登录密码 抽屉 -->
  Drawer(:closable="true", width="640", v-model="drawerModifyPw", title="修改登录密码", :mask-closable="maskClosable", @on-visible-change="drawerChange")
    comp-account-password-modify(
      v-if="drawerModifyPw",
      :on-close="closeDrawer",
      :userName = "myUserInfo.userName",
      :userCode = "myUserInfo.userCode",
      :userMobile = "myUserInfo.userMobile"
    )
</template>

<script>
import {mapState} from 'vuex'
import compAccountTelModify from '@/components/compAccountTelModify'
import compAccountMobileModify from '@/components/compAccountMobileModify'
import compAccountPasswordModify from '@/components/compAccountPasswordModify'
export default {
  components: {
    compAccountTelModify,
    compAccountMobileModify,
    compAccountPasswordModify
  },
  data () {
    return {
      refresh: false,
      loadingBtn: false,
      drawerModifyTel: false,
      drawerModifyMobile: false,
      drawerModifyPw: false
    }
  },
  methods: {
    closeDrawer () {
      this.drawerModifyTel = false
      this.drawerModifyMobile = false
      this.drawerModifyPw = false
    },
    drawerChange () {
    }
  },
  computed: {
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      },
      maskClosable (state) {
        return state.maskClosable
      },
      userAuthGroups (state) {
        return state.user.userAuthGroups
      }
    })
  },
  beforeMount () {
  },
  watch: {
  }
}
</script>

<style scoped>
.contMyAccount .secMain{
  padding: 20px 60px;
}
.contMyAccount .secMain h3{
  font-size:16px;
  padding: 20px 0;
  border-bottom:1px solid #f0f0f0;
  font-weight:200;
  position:relative;
  color:#000;
}
.contMyAccount .secMain h3 i{
  display:block;
  height:1px;
  background:#145ddd;
  width:30px;
  position:absolute;
  left:0px;
  bottom:-1px;
}
.contMyAccount .secMain table{
  margin-bottom:20px;
}
.contMyAccount .secMain td{
  height:49px;
  line-height:49px;
  border-bottom:1px solid #f0f0f0;
  color:#666;
}
.contMyAccount .secMain td.col2{
  text-align:right;
}
.contMyAccount .secMain td a{
  color:#145ddd;
}
.contMyAccount .secMain td .n{
  float:left;
}
.contMyAccount .secMain td .v{
  overflow:hidden;
}
.contMyAccount .secMain td li{
  line-height:14px;
  font-size:12px;
  padding-bottom:8px;
}
.contMyAccount .secMain td li i{
  display:inline-block;
  width:8px;
  height:8px;
  background:#1999fe;
  border-radius:100%;
  margin-right:8px;
}
</style>
