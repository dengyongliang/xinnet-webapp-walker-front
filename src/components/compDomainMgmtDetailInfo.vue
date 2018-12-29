<template lang="pug">
  Form.compDomainMgmtDetailInfo(:label-width="150")
    FormItem(label="域名：")
      span.text {{detailData.domainName}}
    FormItem(label="注册时间：",)
      span.text {{detailData.applyDate}}
    FormItem(label="到期时间：",)
      span.text {{detailData.expireDate}}
        <a href="javascript:;" v-show="detailData.depositFlag===1" @click="showOrder">续费</a>
        <a href="javascript:;" v-show="detailData.depositFlag===0" @click="renewFun">续费</a>
    FormItem(label="域名所有者：",)
      span.text {{detailData.organizeNameCn}}
        <a href="javascript:;" v-show="detailData.depositFlag===1" @click="showOrder">修改</a>
        router-link(to="/domain/change", v-show="detailData.depositFlag===0 && detailData.updateFlag===0") 修改
    FormItem(label="所有者邮箱：",)
      span.text {{detailData.userEmail}}
        <a href="javascript:;" v-show="detailData.depositFlag===1" @click="showOrder">修改</a>
        <a href="javascript:;" v-show="detailData.depositFlag===0 && detailData.updateFlag===0" @click="onTabschange(2)">修改</a>
    FormItem(label="实名认证：")
      span.text {{this.DATAS.REAL_NAME_VERIFY_STATUS[detailData.verifyStatus]}}
    FormItem(label="域名状态：")
      span.text {{this.DATAS.SERVICE_STATE[detailData.serviceStatus]}}
    FormItem(label="DNS服务器：")
      p.text
        span.dns(v-for="(item, index) in detailData.dnsList") {{item.dnsName}}
          <a href="javascript:;" v-show="!index && detailData.depositFlag===1" @click="showOrder">修改</a>
          <a href="javascript:;" v-show="!index && detailData.depositFlag===0 && detailData.updateFlag===0" @click="showDns">修改</a>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'

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
      this.$emit("showWorkOrder")
    },
    showDns () {
      if (this.detailData.importantFlag) {
        this.$emit("showAuthorize")
      } else {
       this.$emit("modifyDns")
      }
    },
    renewFun () {
      var params = {
        param: {
          jsonObj: [{
            domainName: this.detailData.domainName,
            orderGoodsType: 2,
            orderType: 2
          }]
        },
        callback: (response) => {
          this.loadingBtn = false
          if( response.data.code === '1000' ){
            response.data.type = '2_2'
            response.data.jsonObj.map((v) => {
              v.price = v.goodsNumAndPrice[0].price+"_"+v.goodsNumAndPrice[0].unit
              v.num = v.goodsNumAndPrice[0].num
              v.unit = v.goodsNumAndPrice[0].unit
            })
            this.$store.commit(types.SET_PAY_ORDERS, response.data)
            this.$router.push({path: '/payConfirm'})
          } else {
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
        }
      }
      console.log(params.param)
      this.queryOrderConfirm(params)
    },
    ...mapActions({
      queryOrderConfirm: types.QUERY_ORDER_CONFIRM
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
<style scoped>
.compDomainMgmtDetailInfo{
  padding: 30px 0;
}
.compDomainMgmtDetailInfo .ivu-form-item .text a{
  display:inline-block;
  margin-left: 40px;
  color:#2071f6;
}
.compDomainMgmtDetailInfo .ivu-form-item .dns{
  display:block;
}
</style>
