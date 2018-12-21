<template lang="pug">
div(class="userGroupsPop",slot="content")
  .scroll
    Tree(:data="groupsData")
  .popBtn
    Button(type="primary", @click="saveForm",:loading="loadingBtn") 保存
    Button(@click="close") 取消
</template>
<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import validateFormResult from '@/global/validateForm'
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
      let result = validateFormResult([
        this.$refs.protectLevel
      ])
      if (result) {
        let params = {
          param: {
            protectLevel: this.$refs.protectLevel.value,
            domainIds: this.domainIds
          },
          callback: (response) => {
            this.loadingBtn = false
            if (response.data.code === '1000'){
              this.loadingBtn = false
              this.$Message.success('设置保护等级成功')
              this.close()
              this.$emit('refreshData')
            } else {
              // this.$Message.error('设置保护等级失败')
            }
          }
        }
        console.log(params.param)
        this.setProtectLevel(params)
      } else {
        this.loadingBtn = false
      }
    },
    close () {
      if (this.onParentmethod && typeof this.onParentmethod === 'function') {
        this.onParentmethod()
      }
    },
    ...mapActions({
      setProtectLevel: types.SET_PROTECT_LEVEL
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
}
</style>
