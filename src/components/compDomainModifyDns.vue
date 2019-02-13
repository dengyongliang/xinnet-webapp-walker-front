<template lang="pug">
.compDomainModifyDns
  h2
    strong {{detailData.domainName}}
    span 修改DNS
  comp-radio(name="xinnet",:list="dnsList",ref="xinnet", :onParentmethod="changeRadio", defaultValue="1")
  div.radio1(v-show="dns==='1'")
    Button(type="primary",@click="submitXinnet",:loading="loadingBtn") 提交
  div.radio2(v-show="dns==='0'")
    Form(:label-width="200")
      FormItem(label="主DNS：",)
        comp-input(name='dns1',label="主DNS：",ref="dns1", :maxLength="50")
      FormItem(label="副DNS：",)
        comp-input(name='dns2',label="联系人",ref="dns2", :maxLength="50")
      FormItem(label="DNS3：",)
        comp-input(name='dns3',label="DNS3",ref="dns3", :maxLength="50")
      FormItem(label="DNS4：",)
        comp-input(name='dns4',label="DNS4",ref="dns4", :maxLength="50")
      FormItem(label="DNS5：")
        comp-input(name='dns5',label="DNS5",ref="dns5", :maxLength="50")
      FormItem(label="DNS6：")
        comp-input(name='dns6',label="DNS6",ref="dns6", :maxLength="50")
      FormItem(label="")
        Button(type="primary",@click="submitNotXinnet",:loading="loadingBtn") 提交

  Alert.alert1(type="warning", show-icon) 温馨提示：
    Icon(custom="i-icon i-icon-notice_", size="16", slot="icon")
    template(slot="desc") 1、本功能用于更换执行域名解析和配置的服务器。建议您首先通过新的域名服务器配置好所需的域名解析记录，再进行此项操作；否则将有可能导致您的网站无法被访问。<br />2、如果您选择“使用新网的域名服务器进行解析”，那么您就可以使用新网域名解析功能，在线自助进行A记录、MX记录、CNAME等相关解析记录的操作。<br />3、建议每天修改一次DNS，每次修改需24-48小时才能生效，请耐心等待。<br />4、为保护.gov.cn域名持有者权益，如需修改域名下DNS服务器，请您登录新网会员平台，通过“在线提问”功能提交具体需求，谢谢！
</template>

<script>
import {mapActions} from 'vuex'
import * as types from '@/store/types'
import compRadio from './compRadio'
import compInput from './compInput'
export default {
  name: 'compDomainMgmtDetailStep4',
  components: {
    compRadio,
    compInput
  },
  props: {
    verificationCode: {
      type: String,
      default: ''
    },
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
      dns: '1',
      loadingBtn: false,
      dnsList: [
        {
          label: '1',
          value: '使用新网DNS提供解析服务（注：新网每组DNS服务器都具有同等效能）'
        },
        {
          label: '0',
          value: '使用非新网DNS（注：最少配置两个DNS服务器名称以保证域名能够正常解气，DNS服务器名称不分先后，请输入有效的DNS服务器名称）'
        }
      ]
    }
  },
  methods: {
    changeRadio (obj) {
      this.dns = obj.value
    },
    submitXinnet () {
      this.loadingBtn = true
      let params = {
        param: {
          domainId: this.detailData.id,
          xinnet: 1,
          verificationCode: this.verificationCode,
          dns: ''
        },
        callback: (response) => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.$Message.success('DNS修改成功')
            let params = {
              param: {
                domainId: this.detailData.id
              },
              callback: (response) => {
                if (response.data.code === '1000') {
                  this.$emit('setDetailFun', response.data.data)
                } else {

                }
              }
            }
            this.queryDomainManageDetail(params)
          } else {
            if (response.data.code === '100') {
              this.$Message.error('域名不存在')
            } else if (response.data.code === '200') {
              this.$Message.error('域名禁止更新')
            } else if (response.data.code === '300') {
              this.$Message.error('域名被锁定')
            } else if (response.data.code === '400') {
              this.$Message.error('验证码错误')
            } else {

            }
          }
        }
      }
      console.log(params.param)
      this.setDomainDns(params)
    },
    submitNotXinnet () {
      this.loadingBtn = true
      console.log(this.$refs)
      let arr = []
      for (var i = 1; i <= 6; i++) {
        if (this.$refs['dns' + i].value.length) {
          arr.push(this.$refs['dns' + i].value)
        }
      }
      if (arr.length < 2) {
        this.$Message.error('最少配置两个DNS服务器')
        this.loadingBtn = false
      } else {
        let params = {
          param: {
            domainId: this.detailData.id,
            xinnet: 0,
            verificationCode: this.verificationCode,
            dns: arr.join(',')
          },
          callback: (response) => {
            this.loadingBtn = false
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.$Message.success('DNS修改成功')

              let params = {
                param: {
                  domainId: this.detailData.id
                },
                callback: (response) => {
                  if (response.data.code === '1000') {
                    this.$emit('setDetailFun', response.data.data)
                  } else {

                  }
                }
              }
              this.queryDomainManageDetail(params)
            } else {
              if (response.data.code === '100') {
                this.$Message.error('域名不存在')
              } else if (response.data.code === '200') {
                this.$Message.error('域名禁止更新')
              } else if (response.data.code === '300') {
                this.$Message.error('域名被锁定')
              } else if (response.data.code === '400') {
                this.$Message.error('验证码错误')
              } else {

              }
            }
          }
        }
        console.log(params.param)
        this.setDomainDns(params)
      }
    },
    ...mapActions({
      setDomainDns: types.SET_DOMAIN_DNS,
      queryDomainManageDetail: types.QUERY_DOMAIN_MANAGE_DETAIL
    })
  },
  beforeMount () {
  },
  mounted () {

  },
  computed: {

  }
}
</script>
<style>
.compDomainModifyDns{
  margin: 0 20px;
  background: #fff;
}
.compDomainModifyDns h2{
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  border-bottom: 1px solid #f0f0f0;
  font-weight: normal;
  padding: 0 20px;
}
.compDomainModifyDns h2 strong{
  color: #2071f6;
}
.compDomainModifyDns .compRadio{
  padding: 30px 20px;
}
.compDomainModifyDns .compRadio .ivu-radio-group-item{
  display: block;
}
.compDomainModifyDns .alert1{
  padding: 10px 10px 10px 32px;
  margin-bottom: 30px;
}
.compDomainModifyDns .alert1 .ivu-alert-icon{
  top: -3px;
  left: 10px;
  margin:0px;
}
.compDomainModifyDns .alert1 .ivu-alert-icon i{
  color: #ffad02;
}
.compDomainModifyDns .alert1 .ivu-alert-message{
  float: left;
  font-size: 12px;
  font-weight: 600;
  color: #666;
}
.compDomainModifyDns .alert1 .ivu-alert-desc{
  overflow: hidden;
}
.compDomainModifyDns .radio1{
  padding: 20px 0 20px 200px;
  border-bottom: 20px solid #fafafa;
}
.compDomainModifyDns .radio2{
  padding: 20px 0;
  border-bottom: 20px solid #fafafa;
}
</style>
