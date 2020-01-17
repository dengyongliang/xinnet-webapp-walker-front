<template lang="pug">
div.compDomainMgmtDetail
  .domainName
    h2 {{detailData.domainName}}
      Icon(type="md-star", :style="detailData.importantFlag===1?'color:#f00':''")
      span(v-if="detailData.depositFlag") 托管域名

    span.item(v-if="detailData.depositFlag===0") <Icon custom="i-icon i-icon-renew1" size="16" />自动续费：<em :style="detailData.renewFlag===1?'color:#46a405':'color:#aaa'">{{this.DATAS.RENEWFLAG[detailData.renewFlag]}}</em>

    span.item(v-if="detailData.depositFlag===0") <Icon custom="i-icon i-icon-lock" size="16" />注册局锁：<em :style="detailData.backendLockFlag===1?'color:#46a405':'color:#aaa'">{{this.DATAS.BACKENDLOCKFLAG[detailData.backendLockFlag]}}</em>
    //- verifyStatus = 4 不需要实名（隐藏页面实名状态部分）
    span.item(v-if="detailData.depositFlag===0 && detailData.verifyStatus!==4") <Icon custom="i-icon i-icon-test_" size="16" />实名认证：<em :style="detailData.verifyStatus===2?'color:#46a405':'color:#aaa'">{{detailData.verifyStatus?this.DATAS.REAL_NAME_VERIFY_STATUS[detailData.verifyStatus]:'未提交资料'}}</em>

    span.item(v-if="detailData.depositFlag===0") <Icon custom="i-icon i-icon-state" size="16" />服务状态：<em>{{this.DATAS.SERVICE_STATE[detailData.serviceStatus]}}</em>
    p.p1(v-if="detailData.depositFlag") *托管域名信息均为公共whois接口调取，若需获取准确状态请前往域名注册商平台查看。
    Button(type="primary", @click="modifyDns", v-show="detailData.depositFlag===0 && detailData.updateFlag===0") 修改DNS
    //- Button(type="primary", @click="", v-show="detailData.depositFlag===0") 解析设置
    Button(type="primary", @click="drawerWorkOrderSubmit=true", v-show="detailData.depositFlag") 管理域名
    Button(type="primary", @click="toMonitorOwn", v-show="detailData.depositFlag===0") 监控信息
    Button(type="primary", @click="toUpdateInfo", v-show="detailData.depositFlag") 修改信息

  .domainDetail
    .hd
      a(href="javascript:;", :class="tabs===1?'active':''", @click="tabs=1",) 基本信息
      span |
      a(href="javascript:;", :class="tabs===2?'active':''", @click="tabs=2", v-show="detailData.depositFlag!==1") 域名所有者信息
      span(v-show="detailData.depositFlag!==1") |
      a(href="javascript:;", :class="tabs===3?'active':''", @click="tabs=3", v-show="detailData.depositFlag!==1") 域名联系人信息
      span(v-show="detailData.depositFlag!==1") |
      a(href="javascript:;", :class="tabs===4?'active':''", @click="tabs=4",) 管理信息
    .bd
      div.tab1(v-show="tabs===1")
        div.update(v-show="detailData.depositFlag") 信息更新时间：{{detailData.operateTime}}
          a(@click="toRefresh") 立即刷新
        comp-domain-mgmt-detail-info(:detailData="detailData", @showWorkOrder="showWorkOrder",  @modifyDns="modifyDns", :onTabschange="tabsChange", @showAuthorize="showModal")
      div.tab2(v-show="tabs===2 && detailData.depositFlag!==1")
        comp-domain-mgmt-detail-owner(:detailData="detailData", @showWorkOrder="showWorkOrder")
      div.tab3(v-show="tabs===3 && detailData.depositFlag!==1")
        comp-domain-mgmt-detail-contacts(:detailData="detailData", @showWorkOrder="showWorkOrder")
      div.tab4(v-show="tabs===4")
        comp-domain-mgmt-detail-step4(:detailData="detailData", @setDetailFun="setDetailFun2")
  <!-- 提交工单 抽屉 -->
  Drawer(:closable="true", width="640", v-model="drawerWorkOrderSubmit", title="提交工单", :mask-closable="maskClosable", @on-visible-change="drawerChange")
    comp-work-order-submit(
      v-if="drawerWorkOrderSubmit",
      @refreshData="callbackEvent"
    )

  <!-- 授权验证 -->
  Modal(
    v-model="showModals",
    title="授权验证",
    :loading="loadingBtn",
    :footer-hide="true"
  )
    comp-authorize-validate(:onClose="closeModal", @parentEvent="parentEvent", :detailData="detailData",)
  <!-- 修改信息 -->
  Modal(
    v-model="showModalsUpdateInfo",
    title="修改信息",
    :loading="loadingBtn",
    :footer-hide="true"
  )
    comp-update-deposit-domain(
      :domainId="detailData.id",
      :registrarName="detailData.registrarName",
      :applyDate="detailData.applyDate",
      :expireDate="detailData.expireDate",
      :regUserName="detailData.regUserName",
      :regUserEmail="detailData.regUserEmail",
      @toRefresh="toRefresh",
      @closeModal="closeModalUpdateInfo"
    )
</template>

<script>
import {mapState} from 'vuex'
import compWorkOrderSubmit from '@/components/compWorkOrderSubmit'
import compDomainMgmtDetailInfo from './compDomainMgmtDetailInfo'
import compDomainMgmtDetailOwner from './compDomainMgmtDetailOwner'
import compDomainMgmtDetailContacts from './compDomainMgmtDetailContacts'
import compDomainMgmtDetailStep4 from './compDomainMgmtDetailStep4'
import compAuthorizeValidate from './compAuthorizeValidate'
import compUpdateDepositDomain from './compUpdateDepositDomain'
export default {
  name: '',
  components: {
    compWorkOrderSubmit,
    compDomainMgmtDetailInfo,
    compDomainMgmtDetailOwner,
    compDomainMgmtDetailContacts,
    compDomainMgmtDetailStep4,
    compAuthorizeValidate,
    compUpdateDepositDomain
  },
  props: {
    detailData: {
      type: Object,
      default: function () {
        return {
          data: []
        }
      }
    }
  },
  data () {
    return {
      refresh: false,
      loadingBtn: false,
      drawerWorkOrderSubmit: false,
      tabs: 1,
      showModals: false,
      showModalsUpdateInfo: false
    }
  },
  methods: {
    parentEvent (v = '') {
      this.$emit('showDnsFun')
      this.$emit('setVerificationCode', v)
    },
    callbackEvent () {

    },
    tabsChange (v) {
      this.tabs = v * 1
    },
    setDetailFun2 (obj) {
      this.$emit('setDetailFun', obj)
    },
    closeModal () {
      this.showModals = false
    },
    showModal () {
      this.showModals = true
    },
    closeModalUpdateInfo () {
      this.showModalsUpdateInfo = false
    },
    drawerChange () {
    },
    showWorkOrder () {
      this.drawerWorkOrderSubmit = true
    },
    modifyDns () {
      if (this.detailData.importantFlag) {
        this.showModal()
      } else {
        this.$emit('showDnsFun')
      }
    },
    toMonitorOwn () {
      this.$router.push({name: 'monitor_own', params: {domainName: this.detailData.domainName}})
    },
    toRefresh () {
      this.$store.dispatch('SYNC_DEPOSIT_DOMAIN', {domainId: this.detailData.id}).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.$emit('refreshDomainDetail', {id: this.detailData.id})
        } else {
        }
      }).catch(() => {})
    },
    toUpdateInfo () {
      this.showModalsUpdateInfo = true
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  computed: {
    ...mapState({
      maskClosable (state) {
        return state.maskClosable
      }
    })
  }
}
</script>
<style scoped>
.compDomainMgmtDetail{
  padding: 0 20px;
}
.compDomainMgmtDetail .domainName{
  background:#fff;
  padding: 20px 20px 30px 20px;
  border-radius: 20px;
  margin-bottom:20px;
  position:relative;
}
.compDomainMgmtDetail .domainName .ivu-btn{
  float:right;
  position:relative;
  top:-30px;
  right: 20px;
  margin-left:10px;
}
.compDomainMgmtDetail .domainName h2{
  font-size: 40px;
  margin-bottom:20px;
}
.compDomainMgmtDetail .domainName h2 span{
  font-size: 12px;
  color: #999;
  font-weight: normal;
  display: inline-block;
  margin: 0 20px;
}
.compDomainMgmtDetail .domainName .ivu-icon{
  font-size: 24px;
}
.compDomainMgmtDetail .domainName .item{
  display:inline-block;
  margin-right:30px;
  font-size:12px;
}
.compDomainMgmtDetail .domainName .item .ivu-icon{
  color:#aaa;
  margin-right:5px;
}
.compDomainMgmtDetail .domainName .p1{
  font-size: 12px;
  color: #999;
}
.compDomainMgmtDetail .domainDetail{
  background:#fff;
}
.compDomainMgmtDetail .domainDetail .hd{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e2e2e2;
  padding: 0 10px;
}
.compDomainMgmtDetail .domainDetail .hd a{
  padding: 0 10px;
  display:inline-block;
}
.compDomainMgmtDetail .domainDetail .hd a.active{
  color:#2271f4;
  height: 49px;
  border-bottom: 3px solid #2271f4;
  position:relative;
  top: 1px;
}
.compDomainMgmtDetail .domainDetail .hd span{
  color:#e2e2e2;
  display:inline-block;
  margin: 0 10px;
}
.compDomainMgmtDetail .domainDetail .bd .tab1{
  position: relative;
}
.compDomainMgmtDetail .domainDetail .bd .update{
  font-size: 12px;
  color: #999;
  position: absolute;
  right: 20px;
  top: 40px;
  z-index: 1;
}
.compDomainMgmtDetail .domainDetail .bd .update a{
  color: #2369fc;
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
}
</style>
