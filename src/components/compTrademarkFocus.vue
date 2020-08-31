<template lang="pug">
  div
    Modal(v-model="modalshow",title="",:footer-hide="true", width="625px", class-name="compTrademarkFocus",:mask-closable="maskClosable")
      div.clear(slot="header")
        strong 关注商标
      Form(:label-width="150",)
        p 请设置关注商标所属品牌
        FormItem(label="所属品牌：")
          comp-radio(:list="brandList", ref="brandId")
        div.ivu-modal-footer
          Button(@click="close") 取消
          Button(type="primary",@click="saveForm",:loading="loadingBtn") 保存
</template>

<script>
import { mapState } from 'vuex'
import compSelect from './compSelect'
import compRadio from './compRadio'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compSelect,
    compRadio
  },
  name: 'compBrandSet',
  props: {
    type: {
      type: String,
      default: ''
    },
    regNo: {
      type: String,
      default: ''
    },
    intCls: {
      type: String,
      default: ''
    },
    ids: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      modalshow: false,
      loadingTable: false,
      loadingBtn: false,
      brandList: []
    }
  },
  methods: {
    saveForm () {
      this.loadingBtn = true
      // 校验
      let result = validateFormResult([
        this.$refs.brandId
      ])
      if (result) {
        let params = {}
        if (this.type === 'similar') {
          params = {
            ids: this.ids,
            brandId: this.$refs.brandId.value
          }
          this.$store.dispatch('FOLLOW_TRADEMARK_SIMILAR_FOLLOW', params).then(response => {
            this.loadingBtn = false
            if (!response) {
              return false
            }
            if (response.data[0].code === '1000') {
              this.$Message.success('操作成功')
              this.$emit('queryList')
              this.modalshow = false
            } else {
              this.$Message.error(response.data[0].msg)
            }
          }).catch(() => {})
        } else {
          params = {
            regNo: this.regNo,
            intCls: this.intCls,
            brandId: this.$refs.brandId.value
          }
          this.$store.dispatch('FOLLOW_TRADEMARK_BODY_FOLLOW', params).then(response => {
            this.loadingBtn = false
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.$Message.success('操作成功')
              this.$emit('queryList')
              this.modalshow = false
            } else {
              this.$Message.error(response.data.msg)
            }
          }).catch(() => {})
        }
      } else {
        this.loadingBtn = false
      }
    },
    close () {
      this.modalshow = !this.modalshow
    },
    handleShowModal () {
      this.modalshow = !this.modalshow
    },
    getBrandList () {
      this.$store.dispatch('FOLLOW_BRAND_LIST', {pageNum: -1, pageSize: -1}).then(response => {
        this.loadingTable = false
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.brandList = []
          response.data.data.list.map((v) => {
            this.brandList.push({
              label: v.brandName,
              domainCount: v.domainCount,
              value: v.id
            })
          })
        } else {
        }
      }).catch(() => {})
    }
  },
  beforeMount () {
    this.getBrandList()
  },
  mounted () {
  },
  computed: {
    ...mapState({
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  watch: {
  }
}
</script>
<style>
.compTrademarkFocus form p{
  text-align: center;
  margin-bottom: 20px;
}
.compTrademarkFocus .ivu-modal-header{
  height: 100px;
  background: #2271f4;
  text-align: left;
}
.compTrademarkFocus .ivu-modal-header strong{
  font-size: 16px;
  font-weight: 200;
  color: #fff;
}
.compTrademarkFocus .ivu-modal-header button{
  float: right;
  margin-right: 50px;
}
.compTrademarkFocus .ivu-modal-close i{
  color: #fff;
}
.compTrademarkFocus th{
  background: #f9f9f9;
}
.compTrademarkFocus form{
  padding-top: 20px;
}
.compTrademarkFocus .ivu-modal-footer{
  padding-bottom: 20px!important;
}
</style>
