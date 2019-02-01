<template lang="pug">
div(class="userGroupsPop",slot="content")
  .scroll
    Tree(:data="groupsData", ref="Tree")
  .popBtn
    Button(type="primary", @click="saveForm",:loading="loadingBtn") 保存
    Button(@click="close") 取消
</template>
<script>
import {mapActions} from 'vuex'
import * as types from '@/store/types'
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
    saveForm () {
      this.loadingBtn = true
      let result = true
      if (result) {
        let params = {
          param: {
            groupId: this.getSelected(),
            domainIds: this.domainIds
          },
          callback: (response) => {
            this.loadingBtn = false
            if (response.data.code === '1000') {
              this.loadingBtn = false
              this.$Message.success('分组设置成功')
              if (this.type === 'list') {
                this.close()
                this.$emit('refreshData')
              } else {
                this.close()
                let params = {
                  param: {
                    domainId: this.domainIds
                  },
                  callback: (response) => {
                    if (response.data.code === '1000') {
                      this.$emit('refreshData', response.data.data)
                    } else {

                    }
                  }
                }
                this.queryDomainManageDetail(params)
              }
            } else {
              if (response.data.code === '100') {
                this.$Message.error('分组不存在')
              }
            }
          }
        }
        console.log(params.param)
        this.setDomainGroup(params)
      } else {
        this.loadingBtn = false
      }
    },
    getSelected () {
      return this.$refs.Tree.getSelectedNodes().map((v) => {
        return v.label
      }).join(',')
    },
    close () {
      if (this.onParentmethod && typeof this.onParentmethod === 'function') {
        this.onParentmethod()
      }
    },
    ...mapActions({
      setDomainGroup: types.SET_DOMAIN_GROUP,
      queryDomainManageDetail: types.QUERY_DOMAIN_MANAGE_DETAIL
    })
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
