<template lang="pug">
vue-scroll.menuBody(:ops="ops")
  .menuBox
    h3.menuT.lv1
      Icon.fontL(custom="i-icon i-icon-home" size="16")
      router-link(to="/account/my") 首页
  .menuBox
    h3.menuT.lv1
      Icon.fontL(custom="i-icon i-icon-manage" size="16")
      router-link(to="/account/my") 域名注册
  .menuBox
    h3.menuT.lv1
      Icon.fontL(custom="i-icon i-icon-manage" size="16")
      router-link(to="/account/my") 域名推荐
  .menuBox
    h3.menuT.lv1
      Icon.fontL(custom="i-icon i-icon-manage" size="16")
      span 域名管理
    ul.menuList
      li.menuItem.lv2
        router-link(to="/account/my") 域名总览
      li.menuItem.lv2
        router-link(to="/account/mgmt") 域名管理
      li.menuItem.lv2
        router-link(to="/account/my") 域名安全服务
      li.menuItem.lv2
        router-link(to="/account/mgmt") 域名转入管理
      li.menuItem.lv2
        router-link(to="/account/my") 域名过户
      li.menuItem.lv2
        router-link(to="/account/mgmt") 域名实名制管理
      li.menuItem.lv2
        router-link(to="/account/mgmt") 实名模板管理
  .menuBox
    h3.menuT.lv1
      Icon.fontL(custom="i-icon i-icon-finance" size="16")
      span 域名监控
    ul.menuList
      li.menuItem.lv2
        router-link(to="/client/client") 自有域名监控
      li.menuItem.lv2
        router-link(to="/client/clientAccount") 关注域名监控

  .menuBox
    h3.menuT.lv1
      Icon.fontL(custom="i-icon i-icon-bill" size="16")
      span 财务
    ul.menuList
      li.menuItem.lv2
        router-link(to="/finance/overview") 财务总览
      li.menuItem.lv2
        router-link(to="/order/entry") 账单管理

  .menuBox
    h3.menuT.lv1
      Icon.fontL(custom="i-icon i-icon-admin" size="16")
      span 管理
    ul.menuList
      li.menuItem.lv2
        router-link(to="/mgmt/myAccount") 我的账号
      li.menuItem.lv2
        router-link(to="/mgmt/accountMgmt") 账号管理
      li.menuItem.lv2
        router-link(to="/mgmt/enterprise") 企业管理
      li.menuItem.lv2
        router-link(to="/mgmt/roles") 角色管理
      li.menuItem.lv2
        router-link(to="/mgmt/add") 工单管理
  .menuBox
    h3.menuT.lv1
      Icon.fontL(custom="i-icon i-icon-diary" size="16")
      span 监控日志
    ul.menuList
      li.menuItem.lv2
        router-link(to="/service/butler") 域名监控日志
      li.menuItem.lv2
        router-link(to="/service/worklist") 员工监控日志
  .menuBox
    h3.menuT.lv1
      Icon.fontL(custom="i-icon i-icon-notice" size="16")
      span 通知中心
    ul.menuList
      li.menuItem.lv2
        router-link(to="/service/butler") 监控通知
      li.menuItem.lv2
        router-link(to="/service/worklist") 系统通知
  .menuBox
    h3.menuT.lv1
      Icon.fontL(custom="i-icon i-icon-manage" size="16")
      span 管家功能
    ul.menuList
      li.menuItem.lv2
        router-link(to="/service/butler") 域名转入
      li.menuItem.lv2
        router-link(to="/service/worklist") 批量创建员工
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      ops: {
        bar: {
          background: 'rgba(0,0,0,0.2)',
          keepShow: true
        }
      }
    }
  },
  computed: {
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      }
    })
  },
  methods: {

  },
  beforeMount () {
  }
}
</script>
<style scoped>
.menuBody{
  padding:50px 20px 20px 20px;
}
.menuBody .menuBox{
  line-height: 46px;
  vertical-align: middle;
  padding-left:20px;
}
.menuBody .menuT:hover{
  text-decoration: none;
}
.menuBody .menuT{
    display: block;
    height: 42px;
    line-height: 42px;
    position: relative;
    cursor: pointer;
}
.menuBody .menuT.lv1.on{
    border-left: solid 3px #e50112;
    background: #f7f7f7;
}
.menuBody .menuT:hover span,
.menuBody .menuT:hover a,
.menuBody .menuT:hover .font{
    color: #e50012;
}
.menuBody .menuT span,
.menuBody .menuT a{
    font-size: 14px;
    font-weight: normal;
    color: #333333;
}
.menuBody .menuT .fontL{
    color: #666;
    font-size: 14px;
    padding-right: 10px;
}
.menuBody .menuItem{
    line-height: 40px;
    vertical-align: middle;
    font-size: 12px;
    cursor: pointer;
}
.menuBody .lv2{
    padding-left: 30px;
}
.menuBody .menuItem a{
    color: #666;
    display:block;
}
.menuBody .menuItem:hover a{
    color: #e50012;
}
.menuBody .menuItem .router-link-active{
  color:#2271f4;
}
</style>
