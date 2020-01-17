<template lang="pug">
div(class="userGroupsPop",slot="content")
  .scroll
    Tree(:data="groupsData", ref="Tree")
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
    },
    groupsData: {
      type: Array,
      default: function () {
        return {
          data: []
        }
      }
    },
    type: {
      type: String,
      default: 'list'
    }
  },
  data () {
    return {
      loadingBtn: false
    }
  },
  methods: {
    // 保存
    saveForm () {
      if (!this.domainIds) {
        this.$Message.error('请选择域名!')
        this.loadingBtn = false
        return false
      }
      this.loadingBtn = true
      let result = this.getSelected()
      if (result) {
        let params = {
          groupId: result.label,
          domainIds: this.domainIds
        }
        this.$store.dispatch('SET_DOMAIN_GROUP', params).then(response => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.loadingBtn = false
            this.$Message.success('分组设置成功')
            if (this.type === 'list') {
              this.close()
              this.$emit('refreshData')
            } else {
              this.close()
              // 设置 新分组 名字
              // 域名管理 > 域名详情 > 管理信息
              this.$emit('refreshData', this.getSelectedAndParent())
              // this.$store.dispatch('DOMAIN_MANAGE', {domainId: this.domainIds}).then(response => {
              //   if (response.data.code === '1000') {
              //     this.$emit('refreshData', response.data.data)
              //   } else {

              //   }
              // }).catch(() => {})
            }
          } else {
            if (response.data.code === '100') {
              this.$Message.error('分组不存在')
            }
          }
        }).catch(() => {})
      } else {
        this.$Message.error('请选择分组名称!')
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
    // 获取已选分组id的中文名及父节点中文名
    getSelectedAndParent () {
      let result = this.getSelected()
      let parent = ''
      console.log(this.groupsData)
      for (let index = 0; index < this.groupsData.length; index++) {
        if (this.groupsData[index].children && this.groupsData[index].children.length) {
          for (let groups = 0; groups < this.groupsData[index].children.length; groups++) {
            // console.log(this.groupsData[index].children[groups].id + "===" + result.id)
            if (this.groupsData[index].children[groups].id === result.id) {
              parent = this.groupsData[index].title
              return `${parent}-${result.title}`
            }
          }
        }
      }
      return ''
    },
    close () {
      if (this.onParentmethod && typeof this.onParentmethod === 'function') {
        this.onParentmethod()
      }
    }
  },
  computed: {
  },
  beforeMount () {

  }
}
</script>
<style scoped>
.userGroupsPop{
  padding: 20px 10px;
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
