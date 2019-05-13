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
      this.loadingBtn = true
      let result = this.getSelected()
      if (result) {
        let params = {
          groupId: result,
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
              this.$store.dispatch('DOMAIN_MANAGE', {domainId: this.domainIds}).then(response => {
                if (response.data.code === '1000') {
                  this.$emit('refreshData', response.data.data)
                } else {

                }
              }).catch(() => {})
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
        return this.$refs.Tree.getSelectedNodes().map((v) => {
          return v.label
        }).join(',')
      } else {
        return ''
      }
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
