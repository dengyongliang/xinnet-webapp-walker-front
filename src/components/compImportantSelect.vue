<template lang="pug">
div(class="importantPop",slot="content")
  comp-radio(name="protectLevel",:list="importantList",ref="protectLevel")
  .popBtn
    Button(type="primary", @click="saveForm",:loading="loadingBtn") 保存
    Button(@click="close") 取消
</template>
<script>
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
          protectLevel: this.$refs.protectLevel.value,
          domainIds: this.domainIds
        }
        this.$store.dispatch('SET_PROTECT_LEVEL', params).then(response => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.loadingBtn = false
            this.$Message.success('设置保护等级成功')
            this.close()
            this.$emit('refreshData')
          } else {
            if (response.data.code === '800') {
              this.$Message.error('委托管理域名无法进行此操作')
            }
          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
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
.importantPop{
  padding: 20px;
}
.importantPop .popBtn{
  padding: 20px 0 0 0;
}
</style>
