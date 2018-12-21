<template lang="pug">
div(class="importantPop",slot="content")
  comp-radio(name="protectLevel",:list="importantList",ref="protectLevel")
  .popBtn
    Button(type="primary", @click="saveForm",:loading="loadingBtn") 保存
    Button(@click="close") 取消
</template>
<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compRadio from '@/components/compRadio'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compRadio
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
      importantList: [
        {
          value: '一般保护',
          label: '0'
        },
        {
          value: '重点保护',
          label: '1'
        }
      ]
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
.importantPop{
  padding: 20px;
}
.importantPop .popBtn{
  padding: 20px 0 0 0;
}
</style>
