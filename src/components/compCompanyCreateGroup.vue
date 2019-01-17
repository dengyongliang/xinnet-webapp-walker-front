<template lang="pug">
  .compCompanyCreateGroup
    input(type="hidden", ref="companyId", :value="baseInfoData.companyId")
    Alert(type="warning", show-icon) 温馨提示：
      Icon(custom="i-icon i-icon-notice_", size="16", slot="icon")
      template(slot="desc") 每个域名都会关联至企业的分组，用户可为不同分组的域名设置不同的管理人员，实现域名分权管理。

    .companyName {{baseInfoData.name}}
      span ( 域名总数：<em>0</em> 个 )
    ul.groupList(ref="group")
      li.gItem(v-for="(item, index) in formDynamic.items", :key="index")
        div.line
          div.lineT
          div.lineB
        div(v-if="item.status==='create'")
          input(:ref="'groupId'+index", :value="item.id", type="hidden")
          comp-input(name='name',label="请输入组名",:ref="'name'+index",:maxLength="30",styles="width:208px")
          Button(@click="handleMgmt", v-show="showMgmtBtn") + 添加负责人
            Tooltip(placement="top-end")
              span(slot="content", style="color:#fff") 重点保护域名设置解析<br />及修改DNS需分组负责人授权。<br />重要域名监控消息将通知分组负责人。
              Icon(custom="i-icon i-icon-tips", size="16")
          compSelect(styles="width:150px;",:filterable="true",:list="usersList", v-show="showMgmtSelect", :ref="'select'+index", :labelInValue="true")
          a.btnSave(href="javascript:;",  @click="handleSave(index, 'create')",) 保存
          a.btnDel(href="javascript:;", :ref="index", @click="handleRemove(index, 'create')", v-show="showDelBtn2") 删除
        div(v-if="item.status==='modify'")
          input(:ref="'groupId'+index", :value="item.id", type="hidden")
          comp-input(name='name',label="请输入组名",:ref="'name'+index",:maxLength="30",styles="width:208px",:defaultValue="item.name")
          Button(@click="handleMgmt", v-show="showMgmtBtn") + 添加负责人
            Tooltip(placement="top-end")
              span(slot="content", style="color:#fff") 重点保护域名设置解析<br />及修改DNS需分组负责人授权。<br />重要域名监控消息将通知分组负责人。
              Icon(custom="i-icon i-icon-tips", size="16")
          compSelect(styles="width:150px;",:filterable="true",:list="usersList", v-show="showMgmtSelect", :ref="'select'+index", :defaultValue="item.manageId", :defaultLabel="item.manage_name",:defaultCode="item.manage_code",:labelInValue="true")
          a.btnSave(href="javascript:;",  @click="handleSave(index, 'modify')",) 保存
          a.btnCancle(href="javascript:;", @click="handleCancle(index)") 取消
          a.btnDel(href="javascript:;", :ref="index", @click="handleRemove(index, 'modify')", v-show="showDelBtn2") 删除
        div(v-if="item.status==='view'",)
          input(:ref="'groupId'+index", :value="item.id", type="hidden")
          div.groupName
            span.name {{item.name}}
            em.num {{item.domainCount}}个
          div.manager 负责人：{{item.manage_name}}（{{item.manage_code}}）
            Tooltip(placement="top-end")
              span(slot="content", style="color:#fff") 重点保护域名设置解析<br />及修改DNS需分组负责人授权。<br />重要域名监控消息将通知分组负责人。
              Icon(custom="i-icon i-icon-tips", size="16")
          a.btnModify(href="javascript:;", @click="handleModify(index)", v-show="showModifyBtn") 修改
          a.btnDel(href="javascript:;", :ref="index", @click="handleRemove(index, 'modify')", v-show="showDelBtn") 删除

    Button( @click="handleAdd", v-show="showAddBtn", :disabled="disabledBtn") + 添加分组
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from '@/components/compInput'
import compSelect from '@/components/compSelect'
import validateFormResult from '@/global/validateForm'
export default {
  name: 'compAccountStaffInfo',
  components: {
    compInput,
    compSelect
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
      showAddBtn: false,
      disabledBtn: true,
      showDelBtn: false,
      showDelBtn2: false,
      showModifyBtn: true,
      showMgmtBtn: true,
      showMgmtSelect: false,
      status: 'edit',
      index: 0,
      formDynamic: {
        items: [
        ]
      }
    }
  },
  methods: {
    handleMgmt () {
      this.showMgmtBtn = false
      this.showMgmtSelect = true
    },
    handleCancle (index) {
      let current = this.formDynamic.items[index]
      current.status = "view"
      this.status = 'view'
      this.$set(this.formDynamic.items, index, current)
    },
    handleSave (index, type) {
      this.loadingBtn = true
      this.status = 'view'
      var resulte = true
      var text = type==='create' ? '创建' : '修改'
      let name = this.$refs['name'+index][0].$refs.input.value
      let manageId = this.$refs['select'+index][0].value
      if (name === '') {
        this.$Message.error('请填写分组名称！')
        resulte = false
      } else if (manageId === '') {
        this.$Message.error('请选择负责人！')
        resulte = false
      }
      if (resulte) {
        let params = {
          param: {
            manageId: this.$refs['select'+index][0].value,
            name: this.$refs['name'+index][0].$refs.input.value
          },
          callback: (response) => {
            this.loadingBtn = false
            if( response.data.code === '1000' ){
              this.showMgmtBtn = false
              this.$Message.success('分组'+text+'成功')
              this.$set(this.formDynamic.items, index, {
                id: type==='create' ? response.data.id : this.$refs['groupId'+index][0].value,
                name: this.$refs['name'+index][0].$refs.input.value,
                domainCount: 0,
                manageId: this.$refs['select'+index][0].value,
                manage_name: this.$refs['select'+index][0].param.label,
                manage_code: this.$refs['select'+index][0].param.code,
                status: 'view'
              })
            } else {
              if (response.data.code === '100') {
                this.$Message.error('企业不存在')
              } else if (response.data.code === '200') {
                this.$Message.error('分组名称重复')
              } else if (response.data.code === '300') {
                this.$Message.error('负责人不存在')
              } else {
                this.$Message.error('分组'+text+'失败')
              }
            }
          }
        }

        if (type==='create') {
          params.param.companyId = this.$refs.companyId.value
          this.createGroup(params)
        } else {
          params.param.groupId = this.$refs['groupId'+index][0].value
          this.updateGroup(params)
        }
        console.log('----------------------')
        console.log(params.param)
      } else {
        this.loadingBtn = false
      }

    },
    handleAdd () {
      this.status = 'edit'
      this.showModifyBtn = false
      this.showMgmtBtn = true
      this.showDelBtn = false
      this.formDynamic.items.push({
        id: 0,
        name: "",
        domainCount: 0,
        status: 'create'
      })
    },
    handleModify (index) {
      this.status = 'edit'
      this.showMgmtBtn = false
      this.showMgmtSelect = true
      this.$set(this.formDynamic.items[index], 'status', 'modify')
    },
    handleRemove (index, type) {
      this.loadingBtn = true
      this.status = 'view'
      if (type==='create') {
        this.showMgmtBtn = false
        this.formDynamic.items.splice(index, 1)
        this.loadingBtn = false
      } else {
        let params= {
          param: {
            groupId: this.$refs['groupId'+index][0].value
          },
          callback: (response) => {
            this.loadingBtn = false
            if( response.data.code === '1000' ){
              this.showMgmtBtn = false
              this.$Message.success('删除分组成功')
              this.formDynamic.items.splice(index, 1)
            } else {
              if (response.data.code === '100') {
                this.$Message.error('企业不存在')
              } else if (response.data.code === '200') {
                this.$Message.error('分组内有域名，不允许删除')
              } else if (response.data.code === '300') {
                this.$Message.error('用户有分组负责人权限，不允许删除')
              }
            }
          }
        }
        this.deleteGroup(params)
      }
      //console.log(this.$refs['name'+index][0].$refs.input.value)
    },
    ...mapActions({
      createGroup: types.CREATE_GROUP,
      updateGroup: types.UPDATE_GROUP,
      deleteGroup: types.DELETE_GROUP
    })
  },
  beforeMount () {
  },
  mounted () {
    // 加载完毕
    // 立即创建一个分组
    this.handleAdd()
    // this.showAddBtn = true
  },
  computed: {
    ...mapState({
      usersList (state) {
        return this.GLOBALS.CONVERT_SELECT(state.user.users, {
          label: 'userName',
          value: 'id',
          code: 'userCode'
        })
      }
    })
  },
  watch: {
    formDynamic: {
      handler (newV, oldV) {
        if (newV.items.length===1) {
          if (this.status==='edit') {
            this.showDelBtn = false
            this.disabledBtn = true
            this.showDelBtn2 = false
            // this.showMgmtBtn = true
          } else {
            this.showDelBtn = false
            this.disabledBtn = false
            this.showModifyBtn = true
            this.showMgmtSelect = false
          }
          this.showAddBtn = true
        } else {
          this.showDelBtn2 = true
          if (newV.items.length===50) {
            this.showAddBtn = false
          } else {
            this.showAddBtn = true
          }
          if (this.status==='edit') {
            this.showDelBtn = false
            this.showModifyBtn = false
            this.disabledBtn = true
            // this.showMgmtBtn = true
          } else {
            this.showDelBtn = true
            this.showModifyBtn = true
            this.disabledBtn = false
            this.showMgmtSelect = false
          }
        }
      },
      deep: true
    }
  }
}
</script>
<style scoped>

</style>
