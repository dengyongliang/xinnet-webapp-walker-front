<template lang="pug">
Form.compStaffJurisdiction(:label-width="0")
  .t 选择员工角色：
  FormItem()
    comp-radio(name="roleId",:list="rolesList",ref="roleId",:on-parentmethod="isSuper",)
  .t 请勾选此员工可管理的域名：
  FormItem()
    .scrollList
      vue-scroll(:ops="ops",ref="vs")
        Tree(:data="userAuthGroupsList", show-checkbox, ref="Tree",:render="renderContent")
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
    },
    rolesList: {
      type: Array,
      default: function () {
        return {
          data: []
        }
      }
    },
    userAuthGroupsList: {
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
    isSuper (value) {
      let data = {}
      if (value.indexOf("super")<0) {
        data.data = this.GLOBALS.CONVERT_TREE_CHECKED_FALSE(this.userAuthGroups, 'groups')
      } else {
        data.data = this.GLOBALS.CONVERT_TREE_CHECKED_TRUE(this.userAuthGroups, 'groups')
      }
      this.$store.commit(types.SET_USER_AUTH_GROUPS, data)
    },
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
            roleId: this.$refs.roleId.value.split("_")[0],
            groups: this.getCheckedNodes().slice(1).join(",")
          },
          callback: function (response) {
            vm.loadingBtn = false
            if( response.data.code === '1000' ){
              vm.$Message.success('账号创建成功!')
              vm.$emit("closeDrawer")
            } else {
              if (response.data.code === '100') {
                vm.$Message.error('角色编码错误')
              } else if (response.data.code === '200') {
                vm.$Message.error('用户已存在')
              } else if (response.data.code === '300') {
                vm.$Message.error('企业不存在')
              } else if (response.data.code === '400') {
                vm.$Message.error('超级管理员只允许存在一个')
              } else {
                vm.$Message.error('发送失败')
              }
            }
          }
        }
        Object.assign(params.param, this.baseInfoData)
        console.log(params.param)
        this.addUser(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      addUser: types.ADD_USER
    })
  },
  beforeMount () {
  },
  mounted () {
  },
  computed: {
    ...mapState({
      userAuthGroups (state) {
        return state.user.userAuthGroups
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
  padding:0 0 20px 0;
}
.compStaffJurisdiction .scrollList{
  height:300px;
}
</style>
