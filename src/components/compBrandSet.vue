<template lang="pug">
  div.compBrandSet
    Button(type="default", @click="modal1 = true",) 设置品牌
    Modal(v-model="modal1",title="",:footer-hide="true", width="625px", class-name="modalBrandSet")
      div.clear(slot="header")
        strong 设置品牌
        Button(type="default", @click="toBrandSet('','')",) 添加品牌
      <!-- 列表主体 -->
      .secTable
        <Table :columns="columns" :data="list" :loading="loadingTable"></Table>

    <!-- 添加品牌 -->
    Modal(v-model="modal2",title="",width="625px", class-name="modalBrandSetForm")
      div.clear(slot="header")
        strong 设置品牌
      Form(:label-width="150", v-if="modal2")
        FormItem(label="品牌名称：")
          comp-input(name='brandName',label="品牌名称",ref="brandName", :defaultValue="brandName")
        FormItem(label="监控通知员工：")
          comp-select(:list="usersList", :multiple="true", ref="notifyUsers", :defaultValue="notifyUsers")
        FormItem(label="通知类型：")
          comp-radio(:list="notifyWayList", ref="notifyWay", :defaultValue="notifyWay")
      div(slot="footer")
        Button(type="default", @click="modal2 = false") 取消
        Button(type="primary", @click="submitForm", :loading="loadingBtn") 确定
</template>

<script>
import { mapState } from 'vuex'
import compInput from './compInput'
import compSelect from './compSelect'
import compRadio from './compRadio'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput,
    compSelect,
    compRadio
  },
  name: 'compBrandSet',
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      modal1: false,
      modal2: false,
      brandName: '',
      notifyWay: '',
      notifyUsers: '',
      id: '',
      columns: [
        {
          title: '品牌名称',
          key: 'label',
          className: 'col1'
        },
        {
          title: '域名数量',
          key: 'domainCount',
          className: 'col2'
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
                    this.toBrandSet(this.list[params.index].value, this.list[params.index].label)
                  }
                }
              }, '设置'),
              h('a', {
                props: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => {
                    this.toBrandDel(this.list[params.index].value)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      // list: [],
      notifyUsersList: [],
      notifyWayList: [
        {
          label: '不通知',
          value: '1'
        },
        // {
        //   label: '短信通知',
        //   value: '2'
        // },
        {
          label: '邮件通知',
          value: '3'
        }
        // {
        //   label: '邮件和短信通知',
        //   value: '4'
        // }
      ],
      loadingTable: false,
      loadingBtn: false
    }
  },
  methods: {
    submitForm () {
      this.loadingBtn = true
      // 校验
      let result = validateFormResult([
        this.$refs.brandName,
        this.$refs.notifyUsers,
        this.$refs.notifyWay
      ])
      if (result) {
        let params = {
          brandName: this.$refs.brandName.value,
          notifyUsers: this.$refs.notifyUsers.value.length ? this.$refs.notifyUsers.value.join(',') : '',
          notifyWay: this.$refs.notifyWay.value
        }
        // id为真：更新
        if (this.id) {
          params.id = this.id
          this.$store.dispatch('UPDATE_BRAND', params).then(response => {
            this.loadingBtn = false
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.$Message.success('更新品牌成功')
              // this.getBrandList()
              this.$emit('queryList')
              this.$emit('getBrandList')
              this.modal2 = false
            } else {
              if (response.data.code === '100') {
                this.$Message.error('品牌名称过长')
              } else if (response.data.code === '200') {
                this.$Message.error('通知用户不存在')
              } else if (response.data.code === '300') {
                this.$Message.error('品牌名称重复')
              } else if (response.data.code === '400') {
                this.$Message.error('品牌信息错误')
              }
            }
          }).catch(() => {})
        // id为假：创建
        } else {
          this.$store.dispatch('CREATE_BRAND', params).then(response => {
            this.loadingBtn = false
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.$Message.success('创建品牌成功')
              // this.getBrandList()
              this.$emit('queryList')
              this.$emit('getBrandList')
              this.modal2 = false
            } else {
              if (response.data.code === '100') {
                this.$Message.error('品牌名称过长')
              } else if (response.data.code === '200') {
                this.$Message.error('通知用户不存在')
              } else if (response.data.code === '300') {
                this.$Message.error('品牌名称重复')
              } else if (response.data.code === '400') {
                this.$Message.error('品牌信息错误')
              }
            }
          }).catch(() => {})
        }
      } else {
        this.loadingBtn = false
      }
    },
    cancel () {
      // this.$Message.info('Clicked cancel');
    },
    toBrandSet (id, brandName) {
      this.id = id
      if (id) {
        this.$store.dispatch('QUERY_BRAND', {brandId: id}).then(response => {
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.brandName = brandName
            this.notifyWay = response.data.data.notifyWay + ''
            this.notifyUsers = response.data.data.notifyUsers
            this.modal2 = true
          } else {
            this.$Message.error('设置失败')
          }
        }).catch(() => {})
      } else {
        this.brandName = brandName
        this.notifyWay = ''
        this.notifyUsers = ''
        this.modal2 = true
      }
    },
    toBrandDel (id) {
      this.$Modal.confirm({
        title: '确认',
        content: '<p>删除品牌同时删除品牌下所有关注域名，请确认是否删除？</p>',
        loading: true,
        onOk: () => {
          this.$store.dispatch('DELETE_BRAND', {id: id}).then(response => {
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.$Message.success('删除成功')
              // this.getBrandList()
              this.$emit('queryList')
              this.$emit('getBrandList')
            } else {
              if (response.data.code === '100') {
                this.$Message.error('品牌信息错误')
              } else {
                this.$Message.error('删除失败')
              }
            }
            this.$Modal.remove()
          }).catch(() => {})
        },
        onCancel: () => {
        }
      })
    }
    // getBrandList () {
    //   // 品牌列表
    //   this.$store.dispatch('FOLLOW_BRAND_LIST', {pageNum: -1, pageSize: -1}).then(response => {
    //     this.loadingTable = false
    //     this.loadingBtn = false
    //     if (!response) {
    //       return false
    //     }
    //     if (response.data.code === '1000') {
    //       this.list = response.data.list
    //     } else {
    //     }
    //   }).catch(() => {})
    // }
  },
  beforeMount () {
    // this.getBrandList()
  },
  mounted () {
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
  }
}
</script>
<style>
.compBrandSet{
  display: inline-block;
}

.modalBrandSet .ivu-modal-header,
.modalBrandSetForm .ivu-modal-header{
  height: 100px;
  background: #2271f4;
  text-align: left;
}
.modalBrandSet .ivu-modal-header strong,
.modalBrandSetForm .ivu-modal-header strong{
  font-size: 16px;
  font-weight: 200;
  color: #fff;
}
.modalBrandSet .ivu-modal-header button{
  float: right;
  margin-right: 50px;
}
.modalBrandSet .ivu-modal-close i,
.modalBrandSetForm .ivu-modal-close i{
  color: #fff;
}
.modalBrandSet th{
  background: #f9f9f9;
}
</style>
