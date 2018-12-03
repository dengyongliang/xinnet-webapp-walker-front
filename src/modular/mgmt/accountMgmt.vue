<template lang="pug">
.contAccountMgmt
  <!-- 标题区 -->
  h1.pageTitle.clear 账号管理
    .tR
      span 搜索
      Input(style="width:200px",placeholder="姓名/用户名/手机/邮箱",name="",ref="",v-model.trim="value")
      Button(type="primary", @click="searchUserData",:loading="loadingBtn") 查询
      Button(@click="addStaff") + 添加员工
  .secMain.clear
    .filter
      Collapse(v-model="colllapseValue")
        Panel(name="1") 按公司筛选
          div(slot="content")
            Tree(:data="userCompanys", show-checkbox, ref="Tree", :render="renderContent",@on-check-change="companyChange")
        Panel(name="2") 按域名管理权限筛选
          div(slot="content")
            Tree(:data="userAuthGroupsOriginal", show-checkbox, ref="Tree2", :render="renderContent", @on-check-change="domainGroupChange")
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>
      <!-- 翻页区 -->
      Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  <!-- 添加员工 抽屉 -->
  Drawer(:closable="true", width="640", v-model="drawerAddStaff", title="添加员工", :mask-closable="maskClosable", @on-visible-change="drawerChange")
    comp-account-add-staff(
      v-if="refresh",
      :on-close="closeDrawer",
      :type = "type",
      :rolesList="rolesList",
      :userAuthGroupsList="userAuthGroupsList"
    )

  <!-- 员工详情 抽屉 -->
  Drawer(:closable="true", width="640", v-model="drawerDetailStaff", title="添加员工", :mask-closable="maskClosable", @on-visible-change="drawerChange", class-name="drawerDetailStaff")
    div(slot="header")
      strong 李雷
        span （dfdfd）
      p 管理员-河北有限公司
    comp-account-detail-staff(
      v-if="refresh",
      :on-close="closeDrawer",
      :rolesList="detailRolesList",
      :userAuthGroupsList="detailUserAuthGroupsList",
      :userBaseInfo="staffData",
      :roleChecked = "roleChecked"
    )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compAccountAddStaff from '@/components/compAccountAddStaff'
import compAccountDetailStaff from '@/components/compAccountDetailStaff'

export default {
  components: {
    compAccountAddStaff,
    compAccountDetailStaff
  },
  data () {
    return {
      refresh: false,
      type: 'new',
      value: '',
      colllapseValue: '',
      loadingBtn: false,
      drawerAddStaff: false,
      drawerDetailStaff: false,
      rolesList: [],
      userAuthGroupsList: [],
      detailRolesList: [],
      detailUserAuthGroupsList: [],
      userCompanys: [],
      roleChecked: '',
      staffData: {},
      columns: [
        {
          title: '姓名',
          key: 'userName',
          className: 'col1',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.list[params.index].userName + '(' + this.list[params.index].userCode + ')' )
            ])
          }
        },
        {
          title: '角色',
          key: 'roleName',
          className: 'col2'
        },
        {
          title: '所属公司',
          key: 'companyName',
          className: 'col3'
        },
        {
          title: '状态',
          key: 'status',
          className: 'col4',
          render: (h, params) => {
            if (this.list[params.index].status === 0) {
              return h('div', [
                h('span', {}, '未激活')
              ])
            }
            if (this.list[params.index].status === 1) {
              return h('div', [
                h('span', {}, '已激活')
              ])
            }
            if (this.list[params.index].status === 2) {
              return h('div', [
                h('span', {}, '已停用')
              ])
            }
          }
        },
        {
          title: '操作',
          key: 'operate',
          className: 'operate',
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {
                    this.showAccountDetail(this.list[params.index].userCode)
                  }
                }
              }, '详情'),
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {
                    this.showDelAccount(this.list[params.index].userCode)
                  }
                }
              }, '删除员工')
            ])
          }
        }
      ],
      list: [],
      loadingTable: false,
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    searchUserData () {
      this.queryUserList(this.queryParam({pageNum:1}))
    },
    addStaff () {
      console.log(this.userAuthGroups)
      this.type = 'new'
      this.rolesList = this.userRoles
      this.userAuthGroupsList = this.userAuthGroups
      this.drawerAddStaff = true
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryUserList(this.queryParam({pageNum:curPage}))
    },
    getCheckedNodes($tree){
      let checkedArray = $tree.getCheckedAndIndeterminateNodes().map((val,idx,arr) => {
        return val.title
      })
      if (!checkedArray.length) {
        checkedArray = [0]
      }
      return checkedArray
    },
    closeDrawer () {
      this.drawerAddStaff = false
    },
    drawerChange () {
      this.searchUserData()
      this.refresh = (this.drawerAddStaff || this.drawerDetailStaff) ? true : false
    },
    companyChange () {
      let companyId = this.getCheckedNodes(this.$refs.Tree).slice(1).join(",")
      this.queryUserList( this.queryParamCompany({pageNum:1,companyId:companyId}) )
    },
    domainGroupChange () {
      let domainCompanyId = []
      let domainGroupId = []
      this.getCheckedNodes(this.$refs.Tree2).slice(1).forEach((item, index, array) => {
        if (item.split("_")[1] === 'domainCompanyId') {
          domainCompanyId.push(item.split("_")[0])
        } else {
          domainGroupId.push(item.split("_")[0])
        }
      })
      this.queryUserList( this.queryParamDomainGroup({pageNum:1, domainCompanyId:domainCompanyId.join(","), domainGroupId:domainGroupId.join(",")}) )
    },
    queryParam (obj) {
      this.page.pageNo = obj.pageNum
      let vm = this
      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20,
          userCode: this.value
        },
        callback: function(response){
          if (response.data.code === '1000'){
            vm.list = response.data.data.list
            vm.page.pageItems = response.data.data.totalNum
          } else {
            if (response.data.code === '900') {
              vm.$Message.error('查询失败')
            }
          }
        }
      }
      return params
    },
    queryParamCompany (obj) {
      this.page.pageNo = obj.pageNum
      let vm = this
      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20,
          companyId: obj.companyId
        },
        callback: function(response){
          if (response.data.code === '1000'){
            vm.list = response.data.data.list
            vm.page.pageItems = response.data.data.totalNum
          } else {
            vm.$Message.error('查询失败')
          }
        }
      }
      return params
    },
    queryParamDomainGroup (obj) {
      this.page.pageNo = obj.pageNum
      let vm = this
      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20,
          domainCompanyId: obj.domainCompanyId,
          domainGroupId: obj.domainGroupId
        },
        callback: function(response){
          if (response.data.code === '1000'){
            vm.list = response.data.data.list
            vm.page.pageItems = response.data.data.totalNum
          } else {
            vm.$Message.error('查询失败')
          }
        }
      }
      return params
    },
    renderContent(h, { root, node, data }){
      return h(
        'span', {
          style: {
            display: 'inline-block',
            margin: '0 0 0 25px',
            'line-height': '14px'
          },
          on:{
            click:(e)=>{
            }
          }
        },
        [
          h('span', data.label + '(' + data.userCount + ')')
        ]
      )
    },
    convertTree (tree, map) {
      const result = []
      // 遍历 tree
      tree.forEach((item) => {
        var title = item[ map.title ]
        const label = item[ map.label ]
        const checked = false
        const userCount = item[ map.userCount ]
        let children = item[ map.children ]
        // 如果有子节点，递归
        if (children) {
          children = this.convertTree(children, map)
          title += '_domainCompanyId'
        } else {
          title += '_domainGroupId'
        }
        result.push({
          title,
          label,
          expand: true,
          checked,
          children,
          userCount
        })
      })
      return result
    },
    showAccountDetail (userCode) {
      let params = {
        param: {
          userCode: userCode
        },
        callback: (response) => {
          if( response.data.code === '1000' ){
            this.staffData = response.data.data
            this.detailRolesList = this.GLOBALS.CONVERT_ROLES(response.data.data.roles, {
              label: 'id',
              code: 'roleCode',
              value: 'roleName',
              checked: 'checked'
            })
            this.detailUserAuthGroupsList = this.GLOBALS.CONVERT_TREE(response.data.data.domainAuths, {
              title: 'id',
              label: 'name',
              checked: 'checked',
              children: 'groups'
            })
            // 查找角色checked
            this.detailRolesList.forEach((v) => {
              if (v.checked) {
                this.roleChecked = v.label
              } else {
              }
            })
            this.drawerDetailStaff = true
          } else {
            if (response.data.code === '100') {
              this.$Message.error('用户不存在')
            } else {
              this.$Message.error('操作失败')
            }
          }
        }
      }
      this.queryUserInfo(params)
    },
    showDelAccount (userCode) {
      // console.log(userCode)
      this.$Modal.confirm({
        title: '确认',
        content: '<p>请确认是否要删除此员工！</p>',
        loading: true,
        onOk: () => {
          let vm = this
          let params = {
            param: {
              userCode: userCode
            },
            callback: function (response) {
              vm.$Modal.remove()
              if( response.data.code === '1000' ){
                vm.$Message.success('删除成功')
                // 删除成功，重新加载用户列表数据
                vm.searchUserData()
              } else {
                if (response.data.code === '200') {
                  vm.$Message.error('用户不存在')
                } else if (response.data.code === '300') {
                  vm.$Message.error('用户被锁定')
                } else {
                  vm.$Message.error('操作失败')
                }
              }
            }
          }
          this.deleteUserInfo(params)
        },
        onCancel: () => {
        }
      })
    },
    ...mapActions({
      queryUserList: types.QUERY_USER_LIST,
      queryUserCompanys: types.QUERY_USER_COMPANYS,
      deleteUserInfo: types.DELETE_USER_INFO,
      queryUserInfo: types.QUERY_USER_INFO
    })
  },
  computed: {
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      },
      maskClosable (state) {
        return state.maskClosable
      },
      userRoles (state) {
        return this.GLOBALS.CONVERT_ROLES(state.user.userRoles, {
          label: 'id',
          code: 'roleCode',
          value: 'roleName',
          checked: 'checked'
        })
      },
      userAuthGroupsOriginal (state) {
        var array = [{
          title: '0',
          label: '全部',
          expand: true,
          checked: false,
          userCount: state.user.userAuthGroupsOriginal.length ? state.user.userAuthGroupsOriginal[0].userCount : 0,
          children: []
        }]
        array[0].children = this.convertTree(state.user.userAuthGroupsOriginal.slice(1), {
          title: 'id',
          label: 'name',
          children: 'groups',
          userCount: 'userCount'
        })
        return array
      },
      userAuthGroups (state) {
        let arrGroups = [{
          title: '0',
          label: '全部',
          expand: true,
          checked: false,
          children: []
        }]
        arrGroups[0].children = this.GLOBALS.CONVERT_TREE(state.user.userAuthGroups.slice(1), {
          title: 'id',
          label: 'name',
          checked: 'checked',
          children: 'groups'
        })
        return arrGroups
      }
    })
  },
  beforeMount () {
    this.queryUserList(this.queryParam({pageNum:1}))
    let vm = this
    let params = {
      param: {},
      callback: (response) => {
        if (response.data.code === '1000'){
          this.userCompanys.push({
            title: response.data.data.id,
            label: response.data.data.name,
            expand: true,
            checked: false,
            userCount: response.data.data.userCount,
            children:[]
          })
          response.data.data.companys.forEach((item, index, array) => {
            this.userCompanys[0].children.push({
              title: item.id,
              label: item.name,
              expand: true,
              checked: false,
              userCount: item.userCount,
              children:[]
            })
          })
        } else {
          this.$Message.error('查询失败')
        }
      }
    }
    this.queryUserCompanys(params)
  },
  watch: {
    userAuthGroups: {
      handler (newValue, oldValue) {
        this.userAuthGroupsList = newValue
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.contAccountMgmt .secMain{
  background:none;
}
.contAccountMgmt .filter{
  float:left;
  width:220px;
  background:#fff;
  margin-right:20px;
}

.contAccountMgmt .secTable{
  overflow:hidden;
  background:none;
}
.contAccountMgmt .ivu-page{
  padding-top:20px;
}

</style>
