<template lang="pug">
Collapse.compAsideFilter(v-model="colllapseValue",accordion, @on-change="colllapseChange")
  .collapseT
    strong(v-show="status===1") 筛选
    .btn(v-show="status===2")
      Button(@click="filterCancle") 取消
      Button(type="primary", @click="filterSubmit") 确认筛选
    .reset(v-show="status===3")
      span 共筛选出<b>4</b>个域名
      Button(@click="filterReset") 重置

  Panel(name="3", v-if="show.indexOf(3) >= 0") 服务状态
    div(slot="content")
      comp-aside-filter1(:filterData="dataServiceState", ref="dataServiceState")
  Panel(name="4", v-if="show.indexOf(4) >= 0") 管理公司
    div(slot="content")
      comp-aside-filter3(:filterData="dataMgmtCompany", ref="dataMgmtCompany", @showLv2="showLv2", from="dataMgmtCompany", @changeData="changeData")
  Panel(name="5", v-if="show.indexOf(5) >= 0") 监控日志
    div(slot="content")
      comp-aside-filter1(:filterData="dataMonitorLog", ref="dataMonitorLog",)
  Panel(name="6", v-if="show.indexOf(6) >= 0") 注册时间
    div(slot="content")
      comp-aside-filter2(:filterData="dataTimeReg", ref="dataTimeReg",)
  Panel(name="7", v-if="show.indexOf(7) >= 0") 到期时间
    div(slot="content")
      comp-aside-filter2(:filterData="dataTimeExpire", ref="dataTimeExpire",)
  Panel(name="8", v-if="show.indexOf(8) >= 0") 域名后缀
    div(slot="content")
      comp-aside-filter1(:filterData="dataDomainSuffix", ref="dataDomainSuffix",)
  Panel(name="9", v-if="show.indexOf(9) >= 0") 安全服务
    div(slot="content")
      comp-aside-filter3(:filterData="dataSafe", ref="dataSafe", @showLv2="showLv2", from="dataSafe", @changeData="changeData")
  Panel(name="10", v-if="show.indexOf(10) >= 0") 管理方式
    div(slot="content")
      comp-aside-filter1(:filterData="dataMgmtMethod", ref="dataMgmtMethod",)
  Panel(name="11", v-if="show.indexOf(11) >= 0") 实名状态
    div(slot="content")
      comp-aside-filter1(:filterData="dataRealName", ref="dataRealName",)
  Panel(name="12", v-if="show.indexOf(12) >= 0") 命名状态
    div(slot="content")
      comp-aside-filter1(:filterData="dataNamingState", ref="dataNamingState",)
  Panel(name="13", v-if="show.indexOf(13) >= 0") 提交时间
    div(slot="content")
      comp-aside-filter2(:filterData="dataTimeSubmit", ref="dataTimeSubmit",)

  Drawer(title="", width="220", :closable="false", v-model="showDrawer", :inner="true", :transfer="false", :mask="false", :scrollable="true")
    h3.h3T
      a.back(@click="hideLv2") < 完成
    .lv2
      Checkbox.checkBoxAll(
        :indeterminate="indeterminate",
        :value="checkAll",
        @click.prevent.native="handleCheckAll"
      ) 全选
      CheckboxGroup(v-model="valueLv2", @on-change="checkboxChange")
        Checkbox(v-for="item in dataLv2", :label="item.label",)
          span {{item.value}}
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compCheckbox from '@/components/compCheckbox'
import compRadio from '@/components/compRadio'
import compTag from '@/components/compTag'
import compAsideFilter1 from '@/components/compAsideFilter1'
import compAsideFilter2 from '@/components/compAsideFilter2'
import compAsideFilter3 from '@/components/compAsideFilter3'
export default {
  components: {
    compCheckbox,
    compRadio,
    compTag,
    compAsideFilter1,
    compAsideFilter2,
    compAsideFilter3
  },
  name: 'compAsideFilter',
  props: {
    show: {
      type: Array,
      default: function () {
        return {
          data: []
        }
      }
    }
  },
  data () {
    return {
      status: 1,
      valueLv2: [],
      from: '',
      index: 0,
      indeterminate: false,
      checkAll: false,
      timeData: [
        {
          label: '',
          checked: false,
          value: '全部'
        },
        {
          label: 30,
          checked: false,
          value: '近30天'
        },
        {
          label: 60,
          checked: false,
          value: '近60天'
        },
        {
          label: 'custom',
          checked: false,
          value: '自定义'
        }
      ],
      dataMgmtCompany: [
        {
          label: 'box1',
          value: '盒子1',
          groups: [
            {
              "label": 11,
              "checked": false,
              "value": "分组11"
            },
            {
              "label": 12,
              "checked": true,
              "value": "分组122"
            },
            {
              "label": 13,
              "checked": false,
              "value": "分组13"
            }
          ]
        },
        {
          label: 'box2',
          value: '盒子2',
          checked: false,
          groups: [
            {
              "label": 11,
              "checked": false,
              "value": "分组11"
            },
            {
              "label": 12,
              "checked": true,
              "value": "分组12"
            }
          ]
        }
      ],
      dataSafe: [
        {
          label: '1',
          value: '保护级别',
          groups: [
            {
              "label": '',
              "checked": false,
              "value": "全部"
            },
            {
              "label": 'normal',
              "checked": false,
              "value": "普通域名"
            },
            {
              "label": 'important',
              "checked": false,
              "value": "重点域名"
            }
          ]
        },
        {
          label: '2',
          value: '自动续费',
          checked: false,
          groups: [
            {
              "label": '',
              "checked": false,
              "value": "全部"
            },
            {
              "label": '1',
              "checked": false,
              "value": "已开启"
            },
            {
              "label": '0',
              "checked": false,
              "value": "已关闭"
            }
          ]
        },
        {
          label: '3',
          value: '注册局锁',
          checked: false,
          groups: [
            {
              "label": '',
              "checked": false,
              "value": "全部"
            },
            {
              "label": '1',
              "checked": false,
              "value": "已开启"
            },
            {
              "label": '0',
              "checked": false,
              "value": "已关闭"
            },
            {
              "label": '2',
              "checked": false,
              "value": "未开启"
            },
            {
              "label": '3',
              "checked": false,
              "value": "不支持"
            }
          ]
        },
        {
          label: '4',
          value: '禁止更新',
          checked: false,
          groups: [
            {
              "label": '',
              "checked": false,
              "value": "全部"
            },
            {
              "label": '1',
              "checked": false,
              "value": "已开启"
            },
            {
              "label": '0',
              "checked": false,
              "value": "已关闭"
            }
          ]
        }
      ],
      dataServiceState: function (vm) {
        let array = []
        for (var i in vm.DATAS.SERVICE_STATE) {
          array.push({
            label: i,
            checked: false,
            value: vm.DATAS.SERVICE_STATE[i]
          })
        }
        return array
      }(this),
      dataMonitorLog: function (vm) {
        let array = []
        for (var i in vm.DATAS.MONITOR_LOG) {
          array.push({
            label: i,
            checked: false,
            value: vm.DATAS.MONITOR_LOG[i]
          })
        }
        return array
      }(this),
      dataDomainSuffix: function (vm) {
        let array = []
        for (var i in vm.DATAS.DOMAIN_SUFFIX) {
          array.push({
            label: i,
            checked: false,
            value: vm.DATAS.DOMAIN_SUFFIX[i]
          })
        }
        return array
      }(this),
      dataMgmtMethod: function (vm) {
        let array = []
        for (var i in vm.DATAS.MGMT_TYPE) {
          array.push({
            label: i,
            checked: false,
            value: vm.DATAS.MGMT_TYPE[i]
          })
        }
        return array
      }(this),
      dataRealName: function (vm) {
        let array = []
        for (var i in vm.DATAS.REAL_NAME_VERIFY_STATUS) {
          array.push({
            label: i,
            checked: false,
            value: vm.DATAS.REAL_NAME_VERIFY_STATUS[i]
          })
        }
        return array
      }(this),
      dataNamingState: function (vm) {
        let array = []
        for (var i in vm.DATAS.DOMAIN_NAME_VERIFY_STATUS) {
          array.push({
            label: i,
            checked: false,
            value: vm.DATAS.DOMAIN_NAME_VERIFY_STATUS[i]
          })
        }
        return array
      }(this),
      dataTimeReg: [],
      dataTimeExpire: [],
      dataTimeSubmit: [],
      value: ['box1'],
      showDrawer: false,
      colllapseValue: '',
      drawerInner1: false,
      from: '',
      index: 0,
      dataLv2: [],
      len: 0
    }
  },
  methods: {
    filterCancle () {
      this.status = 1
      this.colllapseValue = ''
    },
    filterSubmit () {
      this.status = 3
      let result = {}
      if (this.$refs.dataServiceState) {
        result.dataServiceState = this.$refs.dataServiceState.value
      }
      if (this.$refs.dataMonitorLog) {
        result.dataMonitorLog = this.$refs.dataMonitorLog.value
      }
      if (this.$refs.dataDomainSuffix) {
        result.dataDomainSuffix = this.$refs.dataDomainSuffix.value
      }
      if (this.$refs.dataMgmtMethod) {
        result.dataMgmtMethod = this.$refs.dataMgmtMethod.value
      }
      if (this.$refs.dataRealName) {
        result.dataRealName = this.$refs.dataRealName.value
      }
      if (this.$refs.dataNamingState) {
        result.dataNamingState = this.$refs.dataNamingState.value
      }
      if (this.$refs.dataTimeReg) {
        result.dataTimeReg = this.$refs.dataTimeReg.value2
      }
      if (this.$refs.dataTimeExpire) {
        result.dataTimeExpire = this.$refs.dataTimeExpire.value2
      }
      if (this.$refs.dataTimeSubmit) {
        result.dataTimeSubmit = this.$refs.dataTimeSubmit.value2
      }
      if (this.$refs.dataMgmtCompany) {
        result.dataMgmtCompany = this.$refs.dataMgmtCompany.value
      }

      console.log(result)
      this.colllapseValue = ''
    },
    filterReset () {
      this.status = 1
      this.colllapseValue = ''
    },
    colllapseChange () {
      this.status = 2
    },
    checkboxChange (data) {
      if (data.length === this.len) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
      this.dataLv2.map((v, i)=>{
        if (this.valueLv2.indexOf(v.label) >= 0) {
          this.$set(v, 'checked', true)
        } else {
          this.$set(v, 'checked', false)
        }
      })
    },
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.valueLv2 = this.dataLv2.map((v)=>{
          return v.label
        })
        this.dataLv2.map((v, i)=>{
          this.$set(v, 'checked', true)
        })
      } else {
        this.valueLv2 = []
        this.dataLv2.map((v, i)=>{
          this.$set(v, 'checked', false)
        })
      }
    },
    changeData(obj) {
      console.log(obj.from)
      this[obj.from] = obj.data

      if (obj.len > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else if (obj.len === 0) {
        this.indeterminate = false
        this.checkAll = false
      }
    },
    hideLv2 () {
      console.log(this[this.from])
      this.$set(this[this.from][this.index], 'groups', this.dataLv2)
       console.log(this[this.from])
      this.showDrawer = false
    },
    showLv2 (obj) {
      this.from = obj.from
      this.index = obj.index
      this.showDrawer = true
      this.dataLv2 = this[obj.from][obj.index].groups
      let arr = []
      let groups = this[obj.from][obj.index].groups
      this.len = groups.length
      for (var i=0; i<this.len; i++) {
        if (groups[i].checked) {
          arr.push(groups[i].label)
        }
      }
      this.valueLv2 = arr
    },
    getDefault (list) {
      return list.map((v)=>{
        if (v.checked) {
          return v
        }
      })
    }
  },
  beforeMount () {
    this.dataTimeReg = this.timeData
    this.dataTimeExpire = this.timeData
    this.dataTimeSubmit = this.timeData
  },
  computed: {

  },
}
</script>

<style>
.compAsideFilter{
  position:relative;
  background: #fff;
}
.compAsideFilter .collapseT{
  height: 54px;
  line-height: 54px;
  padding: 0 17px;
}
.compAsideFilter .collapseT strong{
  font-weight: normal;
  display:block;
}

.compAsideFilter .collapseT .ivu-btn{
  margin: 0 5px;
}
.compAsideFilter .collapseT .reset b{
  color: #2073f7;
}
.compAsideFilter .ivu-drawer-body{
  padding: 0px;
}
.compAsideFilter .ivu-drawer-body .h3T{
  height: 53px;
  line-height: 53px;
  border-bottom: 1px solid #e2e2e2;
  font-weight: normal;
  padding: 0 20px;
}
.compAsideFilter .ivu-drawer-body .h3T a{
  color: #2271f2;
}
.compAsideFilter .ivu-drawer-body .lv2{
  padding: 20px;
}
.compAsideFilter .ivu-checkbox-group-item,
.compAsideFilter .ivu-radio-group-item{
  display: block!important;
  padding: 5px 0;
}
.compAsideFilter .checkBoxAll{
  padding: 5px 0;
}
.compAsideFilter .ulLv1 li{
  padding: 5px 0;
  font-size: 12px;
}
.compAsideFilter .ulLv1 li .tag{
  padding: 5px 0;
}
</style>
