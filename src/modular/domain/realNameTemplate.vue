<template lang="pug">
.contRealNameTemp
  <!-- 标题区 -->
  h1.pageTitle.clear 实名模板管理
    .tR
      span 搜索
      Input(style="width:200px",placeholder="模板名称/域名所有者", name="", v-model.trim="value")
      span.text2 审核状态
      compSelect(styles="width:150px;",:list="verifyStatusList", ref="verifyStatus")
      Button(type="primary", @click="searchListData",:loading="loadingBtn") 查询
      Button(@click="drawerCreateTemplate=true") + 创建模板
  .secMain
    <!-- 列表主体 -->
    .secTable
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>

  <!-- 翻页区 -->
  Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)

  <!-- 创建模板 抽屉 -->
  Drawer(:closable="true", width="800", v-model="drawerCreateTemplate", title="创建模板", :mask-closable="maskClosable", @on-visible-change="drawerChange",)
    .compDomainCreateTemplate
      comp-domain-create-template-step1(
        v-if="drawerCreateTemplate",
        v-show="step===1",
        :on-close="closeDrawer",
        @refreshData="searchListData",
        @showStep2 = "showStep2",
        @setTemplateData = "setTemplateData",
        :templateData="templateData",
        type="create"
      )
      comp-domain-create-template-step2(
        v-if="drawerCreateTemplate",
        v-show="step===2",
        :on-close="closeDrawer",
        @refreshData="searchListData",
        :templateData="templateData",
        status="creat"
      )
  <!-- 修改模板 抽屉 -->
  Drawer(:closable="true", width="800", v-model="drawerModifyTemplate", title="修改模板", :mask-closable="maskClosable", @on-visible-change="drawerChange",)
    .compDomainCreateTemplate
      comp-domain-create-template-step1(
        v-if="drawerModifyTemplate",
        :on-close="closeDrawer",
        @refreshData="searchListData",
        :templateData="templateData",
        type="modify"
      )
  <!-- 查看模板 抽屉 -->
  Drawer(:closable="true", width="800", v-model="drawerDetailTemplate", title="模板详情", :mask-closable="maskClosable", @on-visible-change="drawerChange",)
    .compDomainCreateTemplate
      comp-domain-create-template-step1(
        v-if="drawerDetailTemplate",
        :on-close="closeDrawer",
        @refreshData="searchListData",
        :templateData="templateData",
        type="view",
        :disabled="true"
      )
  <!-- 修改提交资料详情 抽屉 -->
  Drawer(:closable="true", width="800", v-model="drawerModifyMaterial", title="重新提交资料", :mask-closable="maskClosable", @on-visible-change="drawerChange",)
    .compDomainCreateTemplate
      comp-domain-create-template-step2(
        v-if="drawerModifyMaterial",
        :on-close="closeDrawer",
        @refreshData="searchListData",
        :templateData="templateData",
        type="modify",
        status="creat"
      )
  <!-- 提交资料详情 抽屉 -->
  Drawer(:closable="true", width="800", v-model="drawerCreateMaterial", title="提交资料", :mask-closable="maskClosable", @on-visible-change="drawerChange",)
    .compDomainCreateTemplate
      comp-domain-create-template-step2(
        v-if="drawerCreateMaterial",
        :on-close="closeDrawer",
        @refreshData="searchListData",
        :templateData="templateData",
        type="create",
        status="creat"
      )
  <!-- 查看资料详情 抽屉 -->
  Drawer(:closable="true", width="800", v-model="drawerViewMaterial", title="提交资料详情", :mask-closable="maskClosable", @on-visible-change="drawerChange",)
    .compDomainCreateTemplate
      comp-domain-create-template-step2(
        v-if="drawerViewMaterial",
        :on-close="closeDrawer",
        @refreshData="searchListData",
        :templateData="templateData",
        type="view"
      )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compDomainCreateTemplateStep1 from '@/components/compDomainCreateTemplateStep1'
import compDomainCreateTemplateStep2 from '@/components/compDomainCreateTemplateStep2'
import compSelect from '@/components/compSelect'
export default {
  components: {
    compDomainCreateTemplateStep1,
    compDomainCreateTemplateStep2,
    compSelect
  },
  data () {
    return {
      value: '',
      refresh: false,
      list: [],
      step: 1,
      loadingTable: true,
      loadingBtn: false,
      drawerCreateTemplate: false,
      drawerModifyTemplate: false,
      drawerDetailTemplate: false,
      drawerModifyMaterial: false,
      drawerCreateMaterial: false,
      drawerViewMaterial: false,
      verifyStatusList: [],
      templateData: {},
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      },
      columns: [
        {
          title: '模板名称',
          key: 'templateName',
          className: 'col1'
        },
        {
          title: '域名所有者',
          key: 'organizeNameCn',
          className: 'col3'
        },
        {
          title: '域名联系人',
          key: 'userNameCn',
          className: 'col4'
        },
        {
          title: '联系邮箱',
          key: 'userEmail',
          className: 'col5'
        },
        {
          title: '审核状态',
          key: 'verifyStatus',
          className: 'col6',
          render: (h, params) => {
            if (this.list[params.index].verifyStatus === 0) {
              return h('div', [
                h('a', {
                  props: {
                    href: 'javascript:;'
                  },
                  on: {
                    click: () => {
                      this.queryMaterialInfo(this.list[params.index].id, 'createMaterial')
                    }
                  }
                }, '未提交资料')
              ])
            }
            if (this.list[params.index].verifyStatus === 1) {
              return h('div', [
                h('a', {
                  props: {
                    href: 'javascript:;'
                  },
                  on: {
                    click: () => {
                      this.queryMaterialInfo(this.list[params.index].id, 'viewMaterial')
                    }
                  }
                }, '审核中')
              ])
            }
            if (this.list[params.index].verifyStatus === 2) {
              return h('div', [
                h('a', {
                  props: {
                    href: 'javascript:;'
                  },
                  on: {
                    click: () => {
                      this.queryMaterialInfo(this.list[params.index].id, 'viewMaterial')
                    }
                  }
                }, '审核通过')
              ])
            }
            if (this.list[params.index].verifyStatus === 3) {
              return h('div', [
                h('a', {
                  props: {
                    href: 'javascript:;'
                  },
                  on: {
                    click: () => {
                      this.queryMaterialInfo(this.list[params.index].id, 'modifyMaterial')
                    }
                  }
                }, '审核拒绝')
              ])
            }
          }
        },
        {
          title: '操作',
          key: 'operate',
          className: 'operate',
          render: (h, params) => {
            if (this.list[params.index].verifyStatus === 1) {
              return h('div', [
                h('a', {
                  props: {
                    href: 'javascript:;'
                  },
                  on: {
                    click: () => {
                      this.queryInfo(this.list[params.index].id, 'viewTemplate')
                    }
                  }
                }, '查看')
              ])
            }
            if (this.list[params.index].verifyStatus !== 1) {
              return h('div', [
                h('a', {
                  props: {
                    href: 'javascript:;'
                  },
                  on: {
                    click: () => {
                      this.queryInfo(this.list[params.index].id, 'modifyTemplate')
                    }
                  }
                }, '修改'),
                h('a', {
                  props: {
                    href: 'javascript:;'
                  },
                  on: {
                    click: () => {
                      this.delTemplate(this.list[params.index].id)
                    }
                  }
                }, '删除')
              ])
            }
          }
        }
      ]
    }
  },
  methods: {
    searchListData () {
      this.closeDrawer()
      this.queryTemplateList(this.queryTemplateListParam({pageNum: 1}))
    },
    pageChange: function (curPage) {
      // 根据当前页获取数据
      this.queryTemplateList(this.queryTemplateListParam({pageNum: curPage}))
    },
    closeDrawer () {
      this.drawerCreateTemplate = false
      this.drawerModifyTemplate = false
      this.drawerDetailTemplate = false
      this.drawerModifyMaterial = false
      this.drawerCreateMaterial = false
      this.drawerViewMaterial = false
    },
    drawerChange () {
    },
    showStep2 () {
      this.step = 2
    },
    setTemplateData (obj) {
      this.templateData = obj
    },
    queryInfo (id, type) {
      let params = {
        param: {
          templateId: id
        },
        callback: (response) => {
          if (response.data.code === '1000') {
            this.templateData = response.data.data
          } else {
            if (response.data.code === '100') {
              this.$Message.error('模板不存在')
            }
          }
        }
      }
      if (type === 'modifyTemplate') {
        this.drawerModifyTemplate = true
      } else if (type === 'viewTemplate') {
        this.drawerDetailTemplate = true
      }
      this.queryTemplateInfo(params)
    },
    queryMaterialInfo (id, type) {
      let params = {
        param: {
          templateId: id
        },
        callback: (response) => {
          if (response.data.code === '1000') {
            this.templateData = response.data.data
          } else {
            if (response.data.code === '100') {
              this.$Message.error('模板不存在')
            }
          }
        }
      }
      if (type === 'modifyMaterial') {
        this.drawerModifyMaterial = true
      } else if (type === 'createMaterial') {
        this.drawerCreateMaterial = true
      } else if (type === 'viewMaterial') {
        this.drawerViewMaterial = true
      }
      this.queryVerifyInfo(params)
    },
    delTemplate (id) {
      this.$Modal.confirm({
        title: '确认',
        content: '<p>请确认是否删除此模板</p>',
        loading: true,
        onOk: () => {
          let params = {
            param: {
              templateId: id
            },
            callback: (response) => {
              this.$Modal.remove()
              if (response.data.code === '1000') {
                this.$Message.success('删除成功')
                this.searchListData()
              } else {
                if (response.data.code === '100') {
                  this.$Message.error('模板不存在')
                } else {
                  this.$Message.error('删除失败')
                }
              }
            }
          }
          this.deleteTemplate(params)
        },
        onCancel: () => {
        }
      })
    },
    queryTemplateListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        param: {
          pageNum: obj.pageNum,
          pageSize: 20,
          templateName: this.value,
          verifyStatus: this.$refs.verifyStatus.value
        },
        callback: (response) => {
          this.loadingBtn = false
          this.loadingTable = false
          if (response.data.code === '1000') {
            this.list = response.data.data.list
            this.page.pageItems = response.data.data.totalNum
          } else {
            if (response.data.code === '900') {
              this.$Message.error('查询失败')
            }
          }
        }
      }
      return params
    },
    ...mapActions({
      queryTemplateList: types.QUERY_TEMPLATE_LIST,
      deleteTemplate: types.DELETE_TEMPLATE,
      queryTemplateInfo: types.QUERY_TEMPLATE_INFO,
      queryVerifyInfo: types.QUERY_VERIFY_INFO
    })
  },
  computed: {
    ...mapState({
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  beforeMount () {
    this.verifyStatusList = (function (vm) {
      let array = [
        {
          label: '全部',
          value: ''
        }
      ]
      for (var i in vm.DATAS.REAL_NAME_VERIFY_STATUS) {
        array.push({
          label: vm.DATAS.REAL_NAME_VERIFY_STATUS[i],
          value: i
        })
      }
      return array
    })(this)
  },
  mounted () {
    this.queryTemplateList(this.queryTemplateListParam({pageNum: 1}))
  }
}
</script>

<style scoped>
.contRealNameTemp h1 .text2{
  padding: 0 10px;
}
</style>
