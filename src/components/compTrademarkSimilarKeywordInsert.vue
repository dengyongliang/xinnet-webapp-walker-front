<template lang="pug">
  div
    Modal(v-model="modalshow",title="",:footer-hide="true", width="625px", class-name="compTrademarkSimilarKeywordInsert",:mask-closable="maskClosable")
      div.clear(slot="header",)
        strong(v-if="insert") 添加监控关键词
        strong(v-if="!insert") 监控关键词设置
      Form(:label-width="150", v-if="modalshow")
        FormItem(label="监控类型：", :required="true")
          comp-radio(:list="monitorTypeList", ref="monitorType", :defaultValue="monitorType", :isDisabled="!insert")
        FormItem(label="关键词：", :required="true")
          comp-input(name='keyWords',label="关键词",ref="keyWords",:maxLength="50", :defaultValue="keyWords", :disabled="!insert")
          p 1、请填写用于注册商标的关键词，如：百度、baidu、京东、JD等。<br />2、支持填写中文、英文、数字
        FormItem(label="监控条件：", :required="true")
          comp-radio(:list="monitorConditionList", ref="monitorCondition", :defaultValue="monitorCondition", :isDisabled="!insert")
        FormItem(label="监控分类：", :required="true")
          comp-checkbox(:list="intClassesList", ref="intClasses", :showall="true" :defaultValue="intClasses", :disabled="!insert")
        FormItem(label="排除申请主体：", :required="true")
          span(slot="label") <Tooltip max-width="200" content="申请主体提交的商标，不会进入到商标近似监控的统计范围" placement="bottom"><Icon type="ios-alert-outline" /></Tooltip>排除申请主体:
          comp-input(type="textarea", ref="excludeApplicant", :defaultValue="excludeApplicant", placeholder="填写公司或个人主体名称，每行一个")
        FormItem(label="所属品牌：", :required="true")
          comp-radio(:list="brandList", ref="brandId", :defaultValue="brandId",)
        div.ivu-modal-footer
          Button(@click="close") 取消
          Button(type="primary",@click="saveForm",:loading="loadingBtn") 保存
</template>

<script>
import { mapState } from 'vuex'
import compInput from './compInput'
import compRadio from './compRadio'
import compCheckbox from './compCheckbox'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput,
    compRadio,
    compCheckbox
  },
  name: 'compBrandSet',
  props: {
    insert: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: '0'
    },
    brandList: {
      type: Array,
      default: function () {
        return {
          data: []
        }
      }
    },
    monitorType: {
      type: String,
      default: ''
    },
    keyWords: {
      type: String,
      default: ''
    },
    monitorCondition: {
      type: String,
      default: ''
    },
    intClasses: {
      type: Array,
      default: function () {
        return {
          data: [2]
        }
      }
    },
    excludeApplicant: {
      type: String,
      default: ''
    },
    brandId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      modalshow: false,
      monitorTypeList: [
        {
          label: '汉字',
          value: '1'
        },
        {
          label: '英文',
          value: '4'
        },
        {
          label: '数字',
          value: '5'
        },
        {
          label: '字头',
          value: '6'
        }
      ],
      monitorConditionList: [
        {
          label: '部分相同',
          value: '0'
        },
        {
          label: '完全相同',
          value: '1'
        }
      ],
      intClassesList: [],
      loadingTable: false,
      loadingBtn: false
    }
  },
  methods: {
    saveForm () {
      this.loadingBtn = true
      // 校验
      let result = validateFormResult([
        this.$refs.monitorType,
        this.$refs.keyWords,
        this.$refs.monitorCondition,
        this.$refs.intClasses,
        this.$refs.brandId,
        this.$refs.excludeApplicant
      ])
      if (this.$refs.keyWords.value.length) {
        let keyWords = this.GLOBALS.TRIM_ALL(this.$refs.keyWords.value)
        if (!this.GLOBALS.REG_CH_EN_NUM(keyWords)) {
          result = false
          this.$refs.keyWords.showValidateResult({text: '格式错误！'})
        }
      }
      if (this.$refs.excludeApplicant.value.length) {
        // 清除空项
        var excludeApplicant = this.GLOBALS.TRIM_ALL(this.$refs.excludeApplicant.value.replace(/[\n\r]/g, ',')).split(',').filter((v) => {
          return v.length > 0
        })
        console.log(excludeApplicant)
        this.$refs.excludeApplicant.value = excludeApplicant.join(',').replace(/,/gm, '\n')
        if (!excludeApplicant.length) {
          result = false
          this.$refs.excludeApplicant.showValidateResult({text: '请输入！'})
        }
      }
      if (result) {
        if (this.insert) {
          let params = {
            monitorType: this.$refs.monitorType.value,
            keyWords: this.$refs.keyWords.value,
            monitorCondition: this.$refs.monitorCondition.value,
            intClasses: this.$refs.intClasses.value.join(','),
            brandId: this.$refs.brandId.value,
            excludeApplicant: excludeApplicant.join(',')
          }
          console.log(params)
          this.$store.dispatch('SIMILAR_TRADEMARK_INSERT', params).then(response => {
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
        } else {
          let params = {
            id: this.id,
            brandId: this.$refs.brandId.value,
            excludeApplicant: this.$refs.excludeApplicant.value
          }
          console.log(params)
          this.$store.dispatch('SIMILAR_TRADEMARK_UPDATE', params).then(response => {
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
      this.modalshow = false
    },
    handleShowModal () {
      this.modalshow = !this.modalshow
    },
    convert_checkbox (data, map) {
      const result = []
      data.forEach((item) => {
        const label = item[ map.label ]
        const value = item[ map.label ] + '-' + item[ map.value ]
        const checked = item[ map.checked ]

        result.push({
          label,
          value,
          checked
        })
      })
      return result
    },
    getIntClsList () {
      // 品牌列表
      this.$store.dispatch('TRADEMARK_SORT').then(response => {
        this.loadingTable = false
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.intClassesList = this.convert_checkbox(response.data.data, {
            label: 'code',
            value: 'codeName',
            checked: 'checked'
          })
        } else {
        }
      }).catch(() => {})
    }
  },
  beforeMount () {
    this.getIntClsList()
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
      },
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  watch: { 
    // insert (val) {
    //   this.isDisabled = !val
    // }
    // monitorType (val) {
    //   this.monitorType = val
    // },
    // keyWords (val) {
    //   this.keyWords = val
    // },
    // monitorCondition (val) {
    //   this.monitorCondition = val
    // },
    // intClasses (val) {
    //   this.intClasses = val
    // },
    // brandId (val) {
    //   this.brandId = val
    // },
    // excludeApplicant (val) {
    //   this.excludeApplicant = val
    // },
    // id (val) {
    //   this.id = val
    // }
  }
}
</script>
<style>
.compTrademarkSimilarKeywordInsert .ivu-modal-header{
  height: 100px;
  background: #2271f4;
  text-align: left;
}
.compTrademarkSimilarKeywordInsert .ivu-modal-header strong{
  font-size: 16px;
  font-weight: 200;
  color: #fff;
}
.compTrademarkSimilarKeywordInsert .ivu-modal-header button{
  float: right;
  margin-right: 50px;
}
.compTrademarkSimilarKeywordInsert .ivu-modal-close i{
  color: #fff;
}
.compTrademarkSimilarKeywordInsert th{
  background: #f9f9f9;
}
.compTrademarkSimilarKeywordInsert form{
  padding-top: 20px;
}
.compTrademarkSimilarKeywordInsert .ivu-modal-footer{
  padding-bottom: 20px!important;
}
.compTrademarkSimilarKeywordInsert form p{
  line-height: 16px;
  padding-top: 10px;
  font-size: 12px;
  color: #aaa;
}
.compTrademarkSimilarKeywordInsert form .ivu-icon{
  font-size: 17px;
  color: #4db1ff;
  font-weight: 600;
  margin-top: -2px;
}
</style>
