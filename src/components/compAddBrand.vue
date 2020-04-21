<template lang="pug">
  div
    div.step1(v-if="step===1")
      Form(:label-width="150",)
        FormItem(label="添加方式：", :required="true")
          RadioGroup(v-model="methodGroup")
              Radio(label="1") 按注册号添加
              Radio(label="2") 按申请主体添加
        FormItem(label="注册号：", :required="true", v-if="methodGroup==='1'")
          comp-input(type="textarea", ref="regNos", styles="width:80%",placeholder="每行一个")
        FormItem(label="申请主体：", :required="true", v-if="methodGroup==='2'")
          comp-input(ref="keyWords", styles="width:80%",placeholder="")
        FormItem(label="所属品牌：", :required="true",)
          comp-radio(:list="brandList", ref="brandIds")

      div(class="ivu-modal-footer")
        Button(type="primary", @click="submitStep1", :loading="loadingBtn") 下一步
    div.step2(v-if="step===2")
      p(style="text-align:center;padding: 50px 0;") 查询中，请稍候
    <!-- 添加品牌 -->
    div.step3(v-if="step===3")
      <!-- 列表主体 -->
      .secTable()
        <Table :columns="columns" :data="list" :loading="loadingTable"></Table>
      div.tips 查询到该主体申请商标 {{totalNum}} 个，最多可添加1000个，超出限制请联系管家。
      div(class="ivu-modal-footer", v-if="regNos.length")
        Button(type="primary", @click="submitDomain", :loading="loadingBtn") 确定添加
</template>

<script>
import compInput from './compInput'
import compRadio from './compRadio'
import compCheckbox from './compCheckbox'
import validateFormResult from '@/global/validateForm'
import { mapState } from 'vuex'
export default {
  components: {
    compInput,
    compRadio,
    compCheckbox
  },
  name: 'compAddBrand',
  props: {
    // brandList: {
    //   type: Array,
    //   default: function () {
    //     return []
    //   }
    // }
  },
  data () {
    return {
      step: 1,
      methodGroup: '1',
      brandId: '',
      regNos: [],
      totalNum: '0',
      columns: [
        {
          title: '商标名称',
          key: 'tmName',
          className: 'col1'
        },
        {
          title: '类别',
          key: 'intCls',
          className: 'col2',
          render: (h, params) => {
            return h('div', [
              h('span', {
              }, `第${this.list[params.index].intCls}类`)
            ])
          }
        },
        {
          title: '注册号',
          key: 'regNo',
          className: 'col3'
        }
      ],
      list: [],
      params: {},
      brandList: [],
      loading: true,
      loadingTable: false,
      loadingBtn: false
    }
  },
  methods: {
    submitStep1 () {
      let result = true
      let regNos = []
      this.list = []
      if (this.methodGroup === '1') {
        result = validateFormResult([
          this.$refs.regNos,
          this.$refs.brandIds
        ])
        regNos = this.GLOBALS.TRIM_ALL(this.$refs.regNos.value.replace(/[\n\r]/g, ',').replace(/www\./g, '')).split(',')
        // 清除空项
        regNos = regNos.filter((v) => {
          return v.length > 0
        })
        console.log('================================')
        console.log(regNos)
        console.log('================================')
        this.$refs.regNos.value = regNos.join(',').replace(/,/gm, '\n')
        if (regNos.length) {
          if (regNos.length > 200) {
            this.$refs.regNos.showValidateResult({text: '最多允许一次提交200个！'})
            result = false
          } else {
            for (var i = 0; i < regNos.length; i++) {
              if (regNos[i].length < 2) {
                result = false
                this.$refs.regNos.showValidateResult({text: '输入至少2个字符，且只允许输入数字！'})
                break
              }
            }
          }
        }
        this.$set(this.params, 'regNos', regNos.join(','))
        this.$set(this.params, 'keyWords', '')
      } else {
        // 校验
        result = validateFormResult([
          this.$refs.keyWords,
          this.$refs.brandIds
        ])
        this.$set(this.params, 'regNos', '')
        this.$set(this.params, 'keyWords', this.$refs.keyWords.value)
      }
      if (result) {
        this.step = 2
        this.brandId = this.$refs.brandIds.value
        this.$store.dispatch('TRADEMARK_CHECK', this.params).then(response => {
          this.loadingTable = false
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.step = 3
            this.list = response.data.list
            this.totalNum = response.data.totalNum
            this.regNos = response.data.list.map((v) => {
              return (v.regNo + ':' + v.intCls)
            })
            // this.$emit('queryList')
          } else {
            if (response.data.code === '100') {
              this.$Message.error('错误')
            }
          }
        }).catch(() => {})
      }
    },
    submitDomain () {
      this.loadingBtn = true
      let param = {
        brandId: this.brandId,
        regNos: this.regNos.join(',')
      }
      this.$store.dispatch('CREATE_TRADEMARK', param).then(response => {
        this.loadingTable = false
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.$emit('closeModal')
          this.$Modal.info({
            title: '提示',
            content: `<p>添加成功：${response.data.countSuccess}个</p><p>添加失败：${response.data.countFaild}个</p>`
          })
          this.$emit('queryList')
        } else {
          if (response.data.code === '100') {
            this.$Message.error('错误')
          }
        }
      }).catch(() => {})
    },
    getBrandList () {
      // 品牌列表
      this.$store.dispatch('FOLLOW_BRAND_LIST', {pageNum: -1, pageSize: -1}).then(response => {
        this.loadingTable = false
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.brandList = response.data.data.list.map((v) => {
            return {
              label: v.brandName,
              value: v.id
            }
          })
        } else {
        }
      }).catch(() => {})
    }
  },
  beforeMount () {
  },
  mounted () {
    this.getBrandList()
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

.compAddBrand .ivu-modal-header{
  height: 100px;
  background: #2271f4;
  text-align: left;
}
.compAddBrand .ivu-modal-header-inner{
  font-size: 16px;
  font-weight: 200;
  color: #fff;
}
.compAddBrand .ivu-modal-close i{
  color: #fff;
}
.compAddBrand textarea{
  width: 500px;
}

.compAddBrand span.n{
  display: block;
  font-weight: 600;
}
.compAddBrand a{
  color: #246fe2;
}
.compAddBrand p.result{
  border: 1px solid #e1e1e1;
  padding: 0 10px;
}
.compAddBrand th{
  background: #f9f9f9;
}
.compAddBrand .secTable{
  height: 400px;
  overflow: auto;
}
.compAddBrand .ivu-modal-footer{
  margin-left: -16px;
  margin-right: -16px;
  margin-bottom: -16px;
}
.compAddBrand .tips{
  text-align: center;
  padding-top: 15px;
}
</style>
