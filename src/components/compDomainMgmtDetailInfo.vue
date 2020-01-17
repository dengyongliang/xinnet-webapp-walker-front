<template lang="pug">
  Form.compDomainMgmtDetailInfo(:label-width="150")
    FormItem(label="域名：")
      span.text {{detailData.domainName}}
    FormItem(label="域名注册商：", v-if="detailData.depositFlag")
      span.text {{detailData.registrarName}}
    FormItem(label="注册时间：",)
      span.text {{detailData.applyDate}}
    FormItem(label="到期时间：",)
      span.text {{detailData.expireDate}}
        <a href="javascript:;" v-show="detailData.depositFlag===1" @click="showOrder">续费</a>
        <a href="javascript:;" v-show="detailData.depositFlag===0" @click="renewFun">续费</a>
    FormItem(label="域名所有者：",)
      span.text {{detailData.organizeNameCn}}
        <a href="javascript:;" v-show="detailData.depositFlag===1" @click="showOrder">修改</a>
        <a href="javascript:;" v-show="detailData.depositFlag===0" @click="updateOrganizeNameCn">修改</a>
        //- router-link(to="/domain/change", v-show="detailData.depositFlag===0 && detailData.updateFlag===0") 修改
    FormItem(label="所有者邮箱：",)
      span.text {{detailData.userEmail}}
        <a href="javascript:;" v-show="detailData.depositFlag===1" @click="showOrder">修改</a>
        <a href="javascript:;" v-show="detailData.depositFlag===0" @click="updateEmail">修改</a>
        //- <a href="javascript:;" v-show="detailData.depositFlag===0 && detailData.updateFlag===0" @click="onTabschange(2)">修改</a>
    FormItem(label="实名认证：")
      span.text {{detailData.verifyStatus ? this.DATAS.REAL_NAME_VERIFY_STATUS[detailData.verifyStatus] : '未实名'}}
    FormItem(label="域名状态：")
      p.text
        span.status(v-for="item in detailData.statusList") {{item.statusName}}
    FormItem(label="DNS服务器：")
      p.text
        span.dns(v-for="(item, index) in detailData.dnsList") {{item.dnsName}}
          <a href="javascript:;" v-show="!index && detailData.depositFlag===1" @click="showOrder">修改</a>
          <a href="javascript:;" v-show="!index && detailData.depositFlag===0" @click="showDns">修改</a>
          //- <a href="javascript:;" v-show="!index && detailData.depositFlag===0 && detailData.updateFlag===0" @click="showDns">修改</a>

</template>

<script>
export default {
  name: 'compDomainMgmtDetailInfo',
  components: {
  },
  props: {
    detailData: {
      type: Object,
      default: function () {
        return {
          data: []
        }
      }
    },
    onTabschange: {
      type: Function
    }
  },
  data () {
    return {
    }
  },
  methods: {
    showOrder () {
      this.$emit('showWorkOrder')
    },
    updateEmail () {
      if (this.detailData.updateFlag !== 0) {
        this.$Message.error('域名安全服务禁止更新开通不允许修改域名所有者信息，请关闭后再提交修改！')
        return false
      }
      this.onTabschange(2)
    },
    updateOrganizeNameCn () {
      if (this.detailData.updateFlag !== 0) {
        this.$Message.error('域名安全服务禁止更新开通不允许修改域名所有者信息，请关闭后再提交修改！')
        return false
      }
      this.$router.push('/domain/change')
    },
    showDns () {
      if (this.detailData.updateFlag !== 0) {
        this.$Message.error('域名安全服务禁止更新开通不允许修改域名所有者信息，请关闭后再提交修改！')
        return false
      }
      if (this.detailData.importantFlag) {
        this.$emit('showAuthorize')
      } else {
        this.$emit('modifyDns')
      }
    },
    renewFun () {
      var newWin = window.open('')
      var params = {
        jsonObj: [{
          domainName: this.detailData.domainName,
          orderGoodsType: 2,
          orderType: 2
        }]
      }
      this.$store.dispatch('ORDER_CONFIRM', params).then(response => {
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          response.data.type = '2_2'
          response.data.jsonObj.map((v) => {
            if (v.goodsNumAndPrice.length) {
              v.price = v.goodsNumAndPrice[0].price + '_' + v.goodsNumAndPrice[0].unit
              v.num = v.goodsNumAndPrice[0].num
              v.unit = v.goodsNumAndPrice[0].unit
            } else {
              v.price = '0_null'
              v.num = null
              v.unit = null
            }
          })
          // this.$store.commit('SET_PAY_ORDERS', response.data)
          // this.$router.push({path: '/payConfirm'})
          localStorage.setItem('data_pay_confirm', JSON.stringify(response.data))
          newWin.location.href = '/payConfirm'
        } else {
          newWin.close()
          if (response.data.code === '100') {
            this.$Message.error('模板不存在')
          } else if (response.data.code === '200') {
            this.$Message.error('分组不存在')
          } else if (response.data.code === '300') {
            this.$Message.error('账户错误')
          } else if (response.data.code === '400') {
            this.$Message.error('json数据错误')
          } else {
          }
        }
      }).catch(() => {})
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  computed: {

  }
}
</script>
<style scoped>
.compDomainMgmtDetailInfo{
  padding: 30px 0;
}
.compDomainMgmtDetailInfo .ivu-form-item .text a{
  display:inline-block;
  margin-left: 40px;
  color:#2071f6;
}
.compDomainMgmtDetailInfo .ivu-form-item .status{
  display: inline-block;
  margin-right: 20px;
}
.compDomainMgmtDetailInfo .ivu-form-item .dns{
  display:block;
}
</style>
