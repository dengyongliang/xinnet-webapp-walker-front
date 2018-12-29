<template lang="pug">
  .compDomainMgmtDetailStep4
    table
      tr
        td.td1 管理单位
        td.td2 {{detailData.groupName}}
          Poptip(placement="bottom", width="350", v-model="visible")
            <a href="javascript:;" v-show="detailData.updateFlag===0">修改</a>
            comp-user-auth-groups(slot="content", :on-parentmethod="hidePop", :domainIds="(detailData.id+'')", @refreshData = "setDetailFun2", :groupsData="userAuthGroups",type="step4")
      tr
        td.td1 管理单位联系人
        td.td2
          span.item 联系人：{{detailData.contactorName}}
          span.item 手机：{{detailData.contactorMobile}}
          span.item 邮箱：{{detailData.contactorEmail}}
      tr
        td.td1
          Tooltip(placement="top-start")
            span(slot="content", style="color:#fff") 有权限管理该域名的员工
            Icon(custom="i-icon i-icon-tips", size="16")
          span 管理员工
        td.td2
          span.item(v-for="item in detailData.manageUsers") {{item}}
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compUserAuthGroups from '@/components/compUserAuthGroups'
export default {
  name: 'compDomainMgmtDetailStep4',
  components: {
    compUserAuthGroups
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
      visible: false
    }
  },
  methods: {
    hidePop () {
      this.visible = false
    },
    setDetailFun2 (obj) {
      this.$emit("setDetailFun", obj)
    },
  },
  beforeMount () {
  },
  mounted () {
  },
  computed: {
    ...mapState({
      userAuthGroups (state) {
        let arrGroups = []
        if (state.user.userAuthGroups.companys) {
          arrGroups = this.GLOBALS.CONVERT_TREE(state.user.userAuthGroups.companys, {
            title: 'name',
            label: 'id',
            checked: 'checked',
            children: 'groups',
            disabled_lv1: true,
            disabled_lv2: false
          })
        }
        return arrGroups
      }
    })
  }
}
</script>
<style scoped>
.compDomainMgmtDetailStep4 table{
  width: 100%;
}
.compDomainMgmtDetailStep4 table .td1{
  width: 15%;
}
.compDomainMgmtDetailStep4 table .td2{
  width: 85%;
}
.compDomainMgmtDetailStep4 table td{
  border-bottom: 1px solid #f0f0f0;
  padding: 20px;
  font-size: 12px;
}
.compDomainMgmtDetailStep4 table .td1{
  border-right: 1px solid #f0f0f0;
  text-align:right;
}
.compDomainMgmtDetailStep4 table .td1 .ivu-tooltip .ivu-icon{
  color: #4aafff;
  margin-right: 5px;
}
.compDomainMgmtDetailStep4 table .td2 .item{
  display:inline-block;
  width: 24%;
}
.compDomainMgmtDetailStep4 table a{
  display:inline-block;
  margin-left: 40px;
  color:#2071f6;
}
</style>
