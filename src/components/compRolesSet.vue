<template lang="pug">
  Form(:label-width="150")
    FormItem(label="角色名称：")
      comp-input(name='roleName',label="角色名称",ref="roleName",:defaultValue="roleData.roleName")
      input(type="hidden",ref="roleId",:value="roleData.roleId")
    FormItem(label="页面权限勾选：")
      .roleList
        Tree(:data="roleData.list", show-checkbox, ref="Tree",:render="renderContent",)
    FormItem(label="")
      Button(type="primary",@click="formUpdate",:loading="loadingBtn") 确定
</template>

<script>
import {mapActions} from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput
  },
  props: {
    roleData: {
      type: Object,
      default: function () {
        return {
          data: {}
        }
      }
    },
    defaultValue: {
      type: String,
      default: ''
    },
    onClose: {
      type: Function
    }
  },
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    formUpdate () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.roleName
      ])
      if (result) {
        let text = ''
        if (this.roleData.type === 'new') {
          text = '新建'
        } else {
          text = '修改'
        }
        let params = {
          param: {
            menuIds: this.getCheckedNodes().join(',')
          },
          callback: (response) => {
            this.loadingBtn = false
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.$Message.success(text + '成功！')
              this.$emit('refreshData')
            } else {
              if (response.data.code === '100') {
                this.$Message.error('角色名称已存在')
              } else {
                this.$Message.error('操作失败')
              }
            }
          }
        }
        if (this.roleData.type === 'new') {
          params.param.roleName = this.$refs.roleName.value
          this.roleCreate(params)
        } else {
          if (this.roleData.roleName !== this.$refs.roleName.value) {
            params.param.roleName = this.$refs.roleName.value
          }
          params.param.roleId = this.$refs.roleId.value
          this.roleUpdate(params)
        }
      } else {
        this.loadingBtn = false
      }
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
    close () {
      this.onClose()
    },
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
    updateForm () {
    },
    ...mapActions({
      roleCreate: types.ROLE_CREATE,
      roleUpdate: types.ROLE_UPDATE
    })
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
  }
}
</script>
<style scoped>
form{
  padding:50px 0 0 0;
}
.roleList{
  width:300px;
  height:400px;
  border:1px solid #dcdee2;
  padding-left:10px;
  overflow: auto;
}
.ivu-tree{
  position: relative;
}
</style>
