<template lang="pug">
.compDomainSafeDetail
  .domainName
    h2 {{detailData.domainName}}
      Icon(type="md-star", v-show="detailData.importantFlag===1", :style="detailData.importantFlag===1?'color:#f00':''")

    span.item(v-if="!showLock") <Icon custom="i-icon i-icon-renew1" size="16" />自动续费：<em :style="list[0].status===1?'color:#46a405':'color:#aaa'">{{this.DATAS.RENEWFLAG[list[0].status]}}</em>

    span.item(v-if="!showLock") <Icon custom="i-icon i-icon-prohibit" size="16" />禁止更新：<em style="color:#aaa" :style="list[1].status===1?'color:#46a405':'color:#aaa'">{{this.DATAS.UPDATEFLAG[list[1].status]}}</em>

    span.item <Icon custom="i-icon i-icon-lock" size="16" />注册局锁：<em :style="list[2].status===1?'color:#46a405':'color:#aaa'">{{this.DATAS.BACKENDLOCKFLAG[list[2].status]}}</em>

    Button(type="primary", @click="drawerWorkOrderSubmit=true", v-show="list[2].status===0 && showLock") 开启注册局锁
    Button(type="primary", @click="drawerWorkOrderSubmit=true", v-show="list[2].status===1 && showLock") 关闭注册局锁
    Button(type="primary", @click="buyFun('new')",:loading="loadingBtn", v-show="list[2].status===3 && showLock") 购买服务
    Button(type="primary", @click="buyFun('renew')",:loading="loadingBtn", v-show="list[2].status!==2 && list[2].status!==3 && showLock") 续费服务

  <!-- 列表主体 -->
  .secTable(v-if="!showLock")
    Table(
      :columns="columns",
      :data="list",
      :loading="loadingTable"
    )
  <!-- 服务流程 -->
  .process(v-if="showLock")
    h3 服务流程
    p.text 1、购买注册局服务后，域名管家会主动与域名所在组负责人联系，验证身份无误后，开通注册局锁。注册局锁开通后将禁止此域名的修改、转移和删除。<br />2、若需对域名进行修改，需要联系管家进行身份确认，确认无误后管家会联系注册局暂时关闭注册局锁定，待修改完成后再次开启。

    div.img
      img(src="../../static/img/img_safe.png")

  <!-- 提交工单 抽屉 -->
  Drawer(:closable="true", width="640", v-model="drawerWorkOrderSubmit", title="提交工单", :mask-closable="maskClosable", @on-visible-change="drawerChange")
    comp-work-order-submit(
      v-if="drawerWorkOrderSubmit",
      :on-close="closeDrawer",
      qaTypeDefaultValue="7"
    )
</template>

<script>
import { mapState } from 'vuex'
import compWorkOrderSubmit from '@/components/compWorkOrderSubmit'
import moment from 'moment'
export default {
  components: {
    compWorkOrderSubmit
  },
  props: {
    onClose: {
      type: Function
    },
    onParentmethod: {
      type: Function
    },
    showLock: {
      type: Boolean,
      default: false
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
      refresh: false,
      loadingBtn: false,
      loadingTable: false,
      lock: false,
      drawerWorkOrderSubmit: false,
      columns: [
        {
          title: '安全服务',
          key: 'name',
          className: 'col1',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.DATAS.SERVICE_TYPE[this.list[params.index].name])
            ])
          }
        },
        {
          title: '服务到期时间',
          key: 'time',
          className: 'col2',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, (this.list[params.index].time ? moment(this.list[params.index].time).format('YYYY-MM-DD HH:mm:ss') : '-'))
            ])
          }
        },
        {
          title: '服务状态',
          key: 'status',
          className: 'col3',
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  color: (function (vm) {
                    if (vm.list[params.index].status === 0 || vm.list[params.index].status === 2) {
                      return '#aaa'
                    }
                    if (vm.list[params.index].status === 1) {
                      return '#46a405'
                    }
                  })(this)
                }
              }, this.DATAS[this.list[params.index].name.toUpperCase()][this.list[params.index].status])
            ])
          }
        },
        {
          title: '操作',
          key: 'operate',
          className: 'operate',
          render: (h, params) => {
            if (this.list[params.index].name === 'renewFlag') {
              if (this.list[params.index].status === 0) {
                return h('div', [
                  h('a', {
                    props: {
                      href: 'javascript:;'
                    },
                    on: {
                      click: () => {
                        this.renewFun(this.list[params.index].id, 1)
                      }
                    }
                  }, '开启')
                ])
              }
              if (this.list[params.index].status === 1) {
                return h('div', [
                  h('a', {
                    props: {
                      href: 'javascript:;'
                    },
                    on: {
                      click: () => {
                        this.renewFun(this.list[params.index].id, 0)
                      }
                    }
                  }, '关闭')
                ])
              }
            }
            if (this.list[params.index].name === 'updateFlag') {
              if (this.list[params.index].status === 0) {
                return h('div', [
                  h('a', {
                    props: {
                      href: 'javascript:;'
                    },
                    on: {
                      click: () => {
                        this.updateFun(this.list[params.index].id, 1)
                      }
                    }
                  }, '开启')
                ])
              }
              if (this.list[params.index].status === 1) {
                return h('div', [
                  h('a', {
                    props: {
                      href: 'javascript:;'
                    },
                    on: {
                      click: () => {
                        this.updateFun(this.list[params.index].id, 0)
                      }
                    }
                  }, '关闭')
                ])
              }
            }
            if (this.list[params.index].name === 'backendLockFlag' && this.list[params.index].status !== 2) {
              return h('div', [
                h('a', {
                  props: {
                    href: 'javascript:;'
                  },
                  on: {
                    click: () => {
                      this.showLockFun()
                    }
                  }
                }, '详情')
              ])
            }
          }
        }
      ],
      list: [
        {
          id: 0,
          name: 'renewFlag',
          time: '',
          status: 1
        },
        {
          id: 0,
          name: 'updateFlag',
          time: '',
          status: 1
        },
        {
          id: 0,
          name: 'backendLockFlag',
          time: '2018-8-21',
          status: 1
        }
      ]
    }
  },
  methods: {
    closeDrawer () {
      this.drawerWorkOrderSubmit = false
    },
    drawerChange () {
    },
    buyFun (type) {
      var newWin = window.open('')
      var params = {
        jsonObj: [{
          domainName: this.detailData.domainName,
          orderGoodsType: 4,
          orderType: type === 'new' ? 1 : 2
        }]
      }
      this.$store.dispatch('ORDER_CONFIRM', params).then(response => {
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          response.data.type = '4_' + (type === 'new' ? 1 : 2)
          response.data.jsonObj.map((v) => {
            v.price = v.goodsNumAndPrice[0].price + '_' + v.goodsNumAndPrice[0].unit
            v.num = v.goodsNumAndPrice[0].num
            v.unit = v.goodsNumAndPrice[0].unit
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
    },
    renewFun (id, flag) {
      let params = {
        autoRenewFlag: flag,
        domainId: id
      }
      this.$store.dispatch('SET_AUTO_RENEW', params).then(response => {
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.loadingBtn = false
          this.$Message.success(`自动续费${flag === 1 ? '开启' : '关闭'}成功`)
          this.list[0].status = flag
        } else {
          if (response.data.code === '100') {
            this.$Message.error('域名不存在')
          } else if (response.data.code === '200') {
            this.$Message.error('商品不存在')
          } else if (response.data.code === '300') {
            this.$Message.error('价格错误')
          } else if (response.data.code === '400') {
            this.$Message.error('客户账号异常')
          } else if (response.data.code === '600') {
            this.$Message.error('信用额度不足')
          } else if (response.data.code === '700') {
            this.$Message.error('域名到期时间小于20天不允许设置自动续费！')
          } else if (response.data.code === '800') {
            this.$Message.error('委托管理域名无法进行此操作')
          }
          // this.$Message.error(`自动续费${flag === 1 ? '开启' : '关闭'}失败`)
        }
      }).catch(() => {})
    },
    updateFun (id, flag) {
      let params = {
        prohibitUpdate: flag,
        domainId: id
      }
      this.$store.dispatch('SET_PROHIBIT_UPDATE', params).then(response => {
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.loadingBtn = false
          this.$Message.success(`禁止更新${flag === 1 ? '开启' : '关闭'}成功`)
          this.list[1].status = flag
        } else {
          if (response.data.code === '800') {
            this.$Message.error('委托管理域名无法进行此操作')
          }
          // this.$Message.error(`禁止更新${flag === 1 ? '开启' : '关闭'}失败`)
        }
      }).catch(() => {})
    },
    showLockFun () {
      this.onParentmethod()
    }
  },
  computed: {
    ...mapState({
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  beforeMount () {
    this.list[0].id = this.detailData.id
    this.list[1].id = this.detailData.id
    this.list[2].id = this.detailData.id
    this.list[0].status = this.detailData.renewFlag
    this.list[1].status = this.detailData.updateFlag
    this.list[2].status = this.detailData.backendLockFlag
    this.list[2].time = this.detailData.backendExpireDate
  },
  watch: {
  }
}
</script>
<style>
.compDomainSafeDetail{
  padding: 0 20px;
}
.compDomainSafeDetail .domainName{
  background:#fff;
  padding: 20px 20px 30px 20px;
  border-radius: 20px;
  margin-bottom:20px;
  position:relative;
}
.compDomainSafeDetail .domainName .ivu-btn{
  float:right;
  position:relative;
  top:-30px;
  right: 50px;
  margin-left:15px;
}
.compDomainSafeDetail .domainName h2{
  font-size: 40px;
  margin-bottom:20px;
}
.compDomainSafeDetail .domainName .ivu-icon{
  font-size: 24px;
}
.compDomainSafeDetail .domainName .item{
  display:inline-block;
  margin-right:30px;
  font-size:12px;
}
.compDomainSafeDetail .domainName .item .ivu-icon{
  color:#aaa;
  margin-right:5px;
}
.compDomainSafeDetail .process{
  background:#fff;
  padding: 25px 0;
}
.compDomainSafeDetail .process h3{
  font-size: 16px;
  border-left:3px solid #1c71ee;
  font-weight: normal;
  padding-left: 17px;
  margin-bottom: 20px;
}
.compDomainSafeDetail .process p{
  padding-left:20px;
  font-size: 12px;
  line-height: 23px;
  color: #666;
}
.compDomainSafeDetail .process .img{
  padding: 40px 30px;
}
</style>
