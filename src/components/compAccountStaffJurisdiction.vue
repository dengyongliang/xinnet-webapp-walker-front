<template lang="pug">
div.compStaffJurisdiction()
  .t 选择员工角色：{{baseInfoData.userName}}
  comp-radio(name="roleId",:list="userRoles",ref="roleId")
  .t 请勾选此员工可管理的域名：
  .scrollList
    vue-scroll(:ops="ops",ref="vs")
      Tree(:data="userAuthGroups", show-checkbox, ref="Tree",:render="renderContent",)
  Button(type="primary",@click="saveForm",:loading="loadingBtn") 保存
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compRadio from '@/components/compRadio'
import validateFormResult from '@/global/validateForm'
export default {
  name: 'compAccountStaffJurisdiction',
  components: {
    compRadio
  },
  props: {
    baseInfoData: {
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
      ops: {
        bar: {
          background: 'rgba(0,0,0,0.2)',
          keepShow: true
        }
      },
      loadingBtn: false,
    }
  },
  methods: {
    renderContent(h, { root, node, data }){
      return h(
        'span', {
          style: {
            display: 'inline-block',
            margin: '0 0 0 25px'
          },
          on:{
            click:(e)=>{
            }
          }
        },
        [
          h('span', data.label)
        ]
      )
    },
    getCheckedNodes(){
      let checkedArray = this.$refs.Tree.getCheckedAndIndeterminateNodes().map((val,idx,arr) => {
        return val.title
      })
      if (!checkedArray.length) {
        checkedArray = [0]
      }
      return checkedArray
    },
    saveForm () {
      this.loadingBtn = true
      let vm = this
      let result = validateFormResult([
        this.$refs.roleId
      ])
      if (result) {
        let params = {
          param: {
            roleId: this.$refs.roleId.value,
            groups: this.getCheckedNodes().join(",")
          }
        }
        Object.assign(params.param, this.baseInfoData)
        console.log(params.param)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      payStatisticsHistoryBill: types.PAY_STATISTICS_HISTORY_BILL
    })
  },
  beforeMount () {
  },
  mounted () {
  },
  computed: {
    ...mapState({
      userRoles (state) {
        return this.GLOBALS.CONVERT_ROLES(state.user.userRoles, {
          label: 'roleCode',
          value: 'roleName'
        })
      },
      userAuthGroups (state) {
        let arrGroups = [{
          title: '0',
          label: '全部',
          expand: true,
          checked: false,
          children: []
        }]
        arrGroups[0].children = this.GLOBALS.CONVERT_TREE(state.user.userAuthGroups.splice(1,1), {
          title: 'id',
          label: 'name',
          children: 'groups'
        })
        return arrGroups
      }
    })
  }
}
</script>
<style scoped>
.compStaffJurisdiction .t{
  display:block;
  font-weight:200;
  color:#000;
  padding:20px 0;
}
.compStaffJurisdiction .scrollList{
  height:300px;
}
</style>
