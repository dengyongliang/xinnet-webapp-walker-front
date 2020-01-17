<template lang="pug">
div(class="userGroupsPop",slot="content")
  p.p1 请选择域名所属品牌
  .scroll
    Tree(:data="brandList", ref="Tree")
  .popBtn
    Button(type="primary", @click="saveForm",:loading="loadingBtn") 保存
    Button(@click="close") 取消
</template>
<script>
export default {
  components: {
  },
  props: {
    onParentmethod: {
      type: Function
    },
    domainIds: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loadingBtn: false,
      brandList: []
    }
  },
  methods: {
    // 保存
    saveForm () {
      this.loadingBtn = true
      let result = this.getSelected()
      if (!this.domainIds) {
        this.$Message.error('请选择域名!')
        this.loadingBtn = false
        return false
      }
      if (result) {
        let params = {
          brandId: result.label,
          domainIds: this.domainIds
        }
        console.log(params)
        this.$store.dispatch('SET_DOMAIN_BRAND', params).then(response => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.loadingBtn = false
            this.$Message.success('品牌设置成功')
            this.close()
            this.$emit('refreshData')
          } else {
            this.$Message.error('品牌设置失败')
          }
        }).catch(() => {})
      } else {
        this.$Message.error('请选择域名!')
        this.loadingBtn = false
      }
    },
    // 获取已选分组id
    getSelected () {
      let nodes = this.$refs.Tree.getSelectedNodes()
      if (nodes.length) {
        return nodes[0]
      } else {
        return ''
      }
    },
    close () {
      if (this.onParentmethod && typeof this.onParentmethod === 'function') {
        this.onParentmethod()
      }
    },
    getBrandList () {
      // 品牌列表
      this.$store.dispatch('FOLLOW_BRAND_LIST', {pageNum: -1, pageSize: -1}).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.brandList = this.GLOBALS.CONVERT_TREE(response.data.data.list, {
            title: 'brandName',
            label: 'id',
            checked: 'checked',
            // children: 'groups',
            disabled_lv1: false,
            disabled_lv2: false
          })
        } else {
        }
      }).catch(() => {})
    }
  },
  computed: {
  },
  beforeMount () {
    this.getBrandList()
  }
}
</script>
<style scoped>
.userGroupsPop{
  padding: 20px 10px;
}
.userGroupsPop .p1{
  text-align: center;
}
.userGroupsPop .scroll{
  height: 220px;
  position:relative;
  overflow:auto;
  border:1px solid #ededed;
  padding: 0 10px;
}
.userGroupsPop .popBtn{
  padding: 20px 0 0 0;
  text-align:center;
}
.userGroupsPop .popBtn .ivu-btn{
  margin:0 10px;
}
</style>
