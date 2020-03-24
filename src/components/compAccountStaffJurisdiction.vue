<template lang="pug">
Form.compStaffJurisdiction(:label-width="0")
  .t 选择员工角色：
  FormItem(class="roleList")
    comp-radio(name="roleId",:list="userRoles",ref="roleId",:defaultValue="defaultValue.toString()")
  .t 请勾选此员工可管理的域名：
    Alert(type="warning") 此权限设置只可修改非域名分组负责人以外的域名管理权限，若为域名分组负责人请通过修改分组负责人进行修改域名管理权限。
  FormItem()
    .scrollList
      p.none(v-show="!userAuthGroups.length") 暂无分组
        router-link.text(to="/mgmt/enterprise") 创建分组
      Tree(v-show="userAuthGroups.length", :data="userAuthGroups", show-checkbox, ref="Tree",:render="renderContent")
  Button(type="primary",@click="saveForm",:loading="loadingBtn") 保存
  Modal(v-model="modal", title="提示", :mask-closable="maskClosable")
    <p style="text-align:center;">请先在 <a style="color: #2d8cf0" @click="toRolesMgmt">角色管理</a> 中创建角色！</p>
</template>

<script>
import { mapState } from 'vuex'
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
      loadingBtn: false,
      super: false,
      defaultValue: '',
      modal: false
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
    // updateUsers () {
    //   this.$store.dispatch('USERS').then(() => {}).catch(() => {})
    // },
    saveForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.roleId
      ])
      if (result) {
        let params = {
          roleId: this.$refs.roleId.value,
          groups: this.getCheckedNodes().slice(1).join(',')
        }
        console.log(params)
        Object.assign(params, this.baseInfoData)
        this.$store.dispatch('ADD_USER', params).then(response => {
          this.loadingBtn = false
          if (response) {
            if (response.data.code === '1000') {
              this.$Message.success('账号创建成功!')
              // this.updateUsers()
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
              } else if (response.data.code === '700') {
                this.$Message.error('邮箱已存在')
              }
            }
          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
        // 账号管理"添加员工"时，
        // 若没有选择用户角色，弹出提示内容错误，需要修改为"请选择员工角色"
        // 只有在没有创建员工角色时才提示去创建员工角色
        if (this.userRoles.length === 1) {
          this.modal = true
        } else {
          this.$Message.error('请选择员工角色')
        }
      }
    },
    toRolesMgmt () {
      this.$router.push({path: '/mgmt/roles'})
    }
  },
  beforeMount () {
    // this.getUserRoles()
    // this.getUserAuthGroups()
  },
  mounted () {
  },
  computed: {
    ...mapState({
      userRoles (state) {
        // is super?
        state.user.userRoles.map((v) => {
          if (v.roleCode.indexOf('super') >= 0 && v.disabled) {
            this.super = true
            this.defaultValue = v.id
          }
        })
        return this.GLOBALS.CONVERT_RADIO(state.user.userRoles, {
          label: 'roleName',
          code: 'roleCode',
          value: 'id',
          disabled: 'disabled'
        })
      },
      userAuthGroups (state) {
        let arr = this.GLOBALS.CONVERT_TREE(state.user.userAuthGroups.companys, {
          title: 'id',
          label: 'name',
          checked: 'checked',
          children: 'groups',
          disabled_lv1: true,
          disabled_lv2: this.super
        })
        let len = arr.length
        let arr2 = []
        console.log(arr)
        for (var i = 0; i < len; i++) {
          if (arr[i].children.length) {
            arr2.push(arr[i])
          }
        }
        if (arr2.length) {
          if (this.super) {
            return [{title: 0, label: '全部', checked: false, expand: true, disabled: true, children: this.GLOBALS.CONVERT_TREE_CHECKED_TRUE(arr2, 'children')}]
          } else {
            return [{title: 0, label: '全部', checked: false, expand: true, children: arr2}]
          }
        } else {
          return []
        }
      },
      maskClosable (state) {
        return state.maskClosable
      }
    })
  }
}
</script>
<style scoped>
.compStaffJurisdiction .t{
  display:block;
  font-weight:normal;
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
