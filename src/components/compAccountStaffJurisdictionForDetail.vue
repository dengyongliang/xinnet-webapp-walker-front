<template lang="pug">
Form.compStaffJurisdiction(:label-width="0")
  .t 选择员工角色：
  FormItem()
    comp-radio(name="roleId",:list="rolesList",ref="roleId",:defaultValue="roleChecked")
  .t 请勾选此员工可管理的域名：
  FormItem()
    .scrollList
      p.none(v-show="!userAuthGroupsList.length") 暂无分组
        router-link.text(to="/mgmt/enterprise") 创建分组
      Tree(v-show="userAuthGroupsList.length",:data="userAuthGroupsList", show-checkbox, ref="Tree",:render="renderContent")
  input(type="hidden", :value="baseInfoData.userCode", ref="userCode")
  Button(type="primary",@click="saveForm",:loading="loadingBtn", v-show="!isSuper") 保存
</template>

<script>
import {mapActions} from 'vuex'
import * as types from '@/store/types'
import compRadio from '@/components/compRadio'
import validateFormResult from '@/global/validateForm'
export default {
  name: 'compAccountStaffJurisdictionForDetail',
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
    },
    roleChecked: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    renderContent (h, {root, node, data}) {
      return h(
        'span', {
          style: {
            display: 'inline-block',
            margin: '0 0 0 25px'
          },
          on: {
            click: (e) => {
            }
          }
        },
        [
          h('span', data.label)
        ]
      )
    },
    getCheckedNodes () {
      let checkedArray = this.$refs.Tree.getCheckedAndIndeterminateNodes().map((val, idx, arr) => {
        return val.title
      })
      if (!checkedArray.length) {
        checkedArray = [0]
      }
      return checkedArray
    },
    saveForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.roleId
      ])
      if (result) {
        let params = {
          param: {
            userCode: this.$refs.userCode.value,
            roleId: this.$refs.roleId.value,
            groups: this.getCheckedNodes().slice(1).join(',')
          },
          callback: (response) => {
            this.loadingBtn = false
            if (response.data.code === '1000') {
              this.$Message.success('修改成功!')
              this.$emit('closeDrawer')
            } else {
              if (response.data.code === '100') {
                this.$Message.error('角色编码错误')
              } else if (response.data.code === '200') {
                this.$Message.error('用户已存在')
              } else if (response.data.code === '300') {
                this.$Message.error('企业不存在')
              } else if (response.data.code === '400') {
                this.$Message.error('超级管理员只允许存在一个')
              }
            }
          }
        }
        console.log(params.param)
        this.updateUserAuth(params)
      } else {
        this.loadingBtn = false
      }
    },
    ...mapActions({
      updateUserAuth: types.UPDATE_USER_AUTH
    })
  },
  beforeMount () {
  },
  mounted () {
  },
  computed: {
    isSuper () {
      return this.baseInfoData.defaultRoleId.indexOf('super') >= 0
    }
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
  overflow:auto;
}
.compStaffJurisdiction .none a{
  display:inline-block;
  margin-left: 10px;
  color:#2d8cf0;
}
.compStaffJurisdiction .ivu-tree{
  position:relative;
}
</style>
