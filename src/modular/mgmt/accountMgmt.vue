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
            p.none(v-show="!userAuthGroupsOriginal.length")
              router-link.text(to="/mgmt/enterprise") 创建分组
            Tree(v-show="userAuthGroupsOriginal.length",:data="userAuthGroupsOriginal", show-checkbox, ref="Tree2", :render="renderContent", @on-check-change="domainGroupChange")
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>
      <!-- 翻页区 -->
      Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  <!-- 添加员工 抽屉 -->
  Drawer(:closable="true", width="640", v-model="drawerAddStaff", title="添加员工", :mask-closable="maskClosable", @on-visible-change="drawerChange")
    comp-account-add-staff(
      v-if="drawerAddStaff",
      :on-close="closeDrawer"
    )

  <!-- 员工详情 抽屉 -->
  Drawer(:closable="true", width="640", v-model="drawerDetailStaff", title="添加员工", :mask-closable="maskClosable", @on-visible-change="drawerChange", class-name="drawerDetailStaff")
    div(slot="header")
      strong {{staffData.userName}}
        span （{{staffData.userCode}}）
      p {{staffData.userTitle}}
    comp-account-detail-staff(
      v-if="drawerDetailStaff",
      :on-close="closeDrawer",
      :staffData="staffData"
    )
</template>

<script>
import { mapState } from 'vuex'
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
      userCompanys: [],
      roleChecked: '',
      companySelected: '',
      staffData: {},
      columns: [
        {
          title: '姓名',
          key: 'userName',
          className: 'col1',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, this.list[params.index].userName + '(' + this.list[params.index].userCode + ')')
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
      this.queryUserList(this.queryParam({pageNum: 1}))
    },
    addStaff () {
      this.drawerAddStaff = true
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryUserList(this.queryParam({pageNum: curPage}))
    },
    getCheckedNodes ($tree) {
      let checkedArray = $tree.getCheckedAndIndeterminateNodes().map((val, idx, arr) => {
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
      if (!this.drawerAddStaff && !this.drawerDetailStaff) {
        this.searchUserData()
      }
    },
    companyChange () {
      let companyId = this.getCheckedNodes(this.$refs.Tree).slice(1).join(',')
      this.queryUserList(this.queryParamCompany({pageNum: 1, companyId: companyId}))
    },
    domainGroupChange () {
      let domainCompanyId = []
      let domainGroupId = []
      this.getCheckedNodes(this.$refs.Tree2).slice(1).forEach((item, index, array) => {
        if (item.split('_')[1] === 'domainCompanyId') {
          domainCompanyId.push(item.split('_')[0])
        } else {
          domainGroupId.push(item.split('_')[0])
        }
      })
      this.queryUserList(this.queryParamDomainGroup({pageNum: 1, domainCompanyId: domainCompanyId.join(','), domainGroupId: domainGroupId.join(',')}))
    },
    queryParam (obj) {
      this.page.pageNo = obj.pageNum
      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        userCode: this.value
      }
      return params
    },
    queryParamCompany (obj) {
      this.page.pageNo = obj.pageNum
      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        companyId: obj.companyId
      }
      return params
    },
    queryParamDomainGroup (obj) {
      this.page.pageNo = obj.pageNum
      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        domainCompanyId: obj.domainCompanyId,
        domainGroupId: obj.domainGroupId
      }
      return params
    },
    renderContent (h, { root, node, data }) {
      return h(
        'span', {
          style: {
            display: 'inline-block',
            margin: '0 0 0 25px',
            'line-height': '14px'
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
      this.$store.dispatch('USER_INFO', {userCode: userCode}).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.staffData = response.data.data
          this.drawerDetailStaff = true
        } else {
          if (response.data.code === '100') {
            this.$Message.error('用户不存在')
          } else {
            this.$Message.error('操作失败')
          }
        }
      }).catch(() => {})
    },
    showDelAccount (userCode) {
      // console.log(userCode)
      this.$Modal.confirm({
        title: '确认',
        content: '<p>请确认是否要删除此员工！</p>',
        loading: true,
        onOk: () => {
          this.$store.dispatch('DELETE_USER_INFO', {userCode: userCode}).then(response => {
            this.$Modal.remove()
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.$Message.success('删除成功')
              // 删除成功，重新加载用户列表数据
              this.searchUserData()
            } else {
              if (response.data.code === '200') {
                this.$Message.error('用户不存在')
              } else if (response.data.code === '300') {
                this.$Message.error('用户被锁定')
              } else {
                this.$Message.error('操作失败')
              }
            }
          }).catch(() => {})
        },
        onCancel: () => {
        }
      })
    },
    queryUserList (paramsCallback) {
      this.$store.dispatch('USER_LIST', paramsCallback).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.list = response.data.data.list
          this.page.pageItems = response.data.data.totalNum
        } else {
          if (response.data.code === '900') {
            this.$Message.error('查询失败')
          }
        }
      }).catch(() => {})
    }
  },
  computed: {
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      },
      maskClosable (state) {
        return state.maskClosable
      },
      userAuthGroupsOriginal (state) {
        let array = [{
          title: '0',
          label: '全部',
          expand: true,
          checked: false,
          userCount: state.user.userAuthGroupsOriginal.userCount,
          children: []
        }]
        let array2 = []
        let len = 0
        if (state.user.userAuthGroupsOriginal.companys) {
          array[0].children = this.convertTree(state.user.userAuthGroupsOriginal.companys, {
            title: 'id',
            label: 'name',
            children: 'groups',
            userCount: 'userCount'
          })
          len = array[0].children.length
          // 查找存在分组数据
          for (var i = 0; i < len; i++) {
            let v = array[0].children[i]
            if (v.children.length) {
              array2.push(v)
            }
          }
          if (array2.length > 0) {
            array[0].children = array2
          } else {
            array = []
          }
        }
        return array
      }
    })
  },
  beforeMount () {
    this.queryUserList(this.queryParam({pageNum: 1}))

    this.$store.dispatch('USER_COMPANYS').then(response => {
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.userCompanys.push({
          title: response.data.data.id,
          label: response.data.data.name,
          expand: true,
          checked: false,
          userCount: response.data.data.userCount,
          children: []
        })
        if (response.data.data.companys && response.data.data.companys.length) {
          response.data.data.companys.forEach((item, index, array) => {
            this.userCompanys[0].children.push({
              title: item.id,
              label: item.name,
              expand: true,
              checked: false,
              userCount: item.userCount,
              children: []
            })
          })
        }
      } else {
        this.$Message.error('查询失败')
      }
    }).catch(() => {})
  },
  watch: {
  }
}
</script>

<style>
.contAccountMgmt .secMain{
  background:none;
}
.contAccountMgmt .filter{
  float:left;
  width:220px;
  background:#fff;
  margin-right:20px;
}
.contAccountMgmt .filter p.none a{
  display:inline-block;
  color:#2d8cf0;
}
.contAccountMgmt .secTable{
  overflow:hidden;
  background:none;
}
.contAccountMgmt .ivu-page{
  padding-top:20px;
}
.drawerDetailStaff .ivu-drawer-header{
  line-height:30px;
}
.drawerDetailStaff .ivu-drawer-header strong{
  font-weight:200;
  font-size: 18px;
  color: #fff;
  display: block;
  padding-top: 20px;
}
.drawerDetailStaff .ivu-drawer-header strong span{
  font-size: 12px;
  color: #fff;
}
.drawerDetailStaff .ivu-drawer-header p{
  font-size: 12px;
  color: #fff;
  font-weight:200;
}

</style>
