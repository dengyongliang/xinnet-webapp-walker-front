<template lang="pug">
  div.compAddFocusDomain
    Button(type="default", @click="modal1 = true",) + 添加关注域名
    Modal(v-model="modal1",title="", ok-text="立即添加", width="625px", class-name="modalAddFocusDomain")
      div.clear(slot="header")
        strong 添加关注域名
      Form(:label-width="150",v-if="modal1")
        FormItem(label="添加方式：", :required="true")
          RadioGroup(v-model="methodGroup")
              Radio(label="1") 直接添加
              Radio(label="2") 智能生成
        FormItem(label="请输入域名：", :required="true", v-if="methodGroup==='1'")
          comp-input(type="textarea", ref="domainNames", styles="width:80%",placeholder="每行一个,支持中英文数字和连字符“-”")
        FormItem(label="品牌：", :required="true", v-if="methodGroup==='1'")
          comp-radio(:list="brandList", ref="brandIds1",:on-parentmethod="setBrandId")
        FormItem(label="品牌词：", :required="true", v-if="methodGroup==='2'")
          comp-input(type="textarea", ref="brandWords", styles="width:80%",placeholder="可以取品牌英文名、中文全拼及简拼，每行一个")
        FormItem(label="扩展词：", :required="true", v-if="methodGroup==='2'")
          span.n 正面
          comp-checkbox(:list="expPlusList", ref="expPlus",)
          span.n 负面
          comp-checkbox(:list="expMinusList", ref="expMinus",)
          span.n 行业词
          comp-checkbox(:list="expIndustryList", ref="expIndustry",)
          div
            comp-input(type="textarea", ref="expwords", styles="width:80%",placeholder="每行一个扩展词", v-show="addExpWord")
            p.result(v-if="!addExpWord && expWords.length") {{expWords.join(',')}}
            Alert(type="error",show-icon, v-show="showErrorExp") 请选择！
            a(@click="addExpWordFun",v-if="!addExpWord && !expWords.length") 增加扩展词
            a(@click="modifyExpWordFun",v-if="!addExpWord && expWords.length") 修改
            Button(type="primary",v-if="addExpWord", @click="submitExpWordFun") 确定
        FormItem(label="后缀：", :required="true", v-if="methodGroup==='2'")
          span.n 正面
          comp-checkbox(:list="suffixPlusList", ref="suffixPlus",)
          div
            comp-input(type="textarea", ref="suffixs", styles="width:80%",placeholder="每行一个后缀",v-show="addSuffix")
            p.result(v-if="!addSuffix && suffixs.length") {{suffixs.join(',')}}
            Alert(type="error",show-icon, v-show="showErrorSuffix") 请选择！
            a(@click="addSuffixFun", v-if="!addSuffix && !suffixs.length") 增加后缀
            a(@click="modifySuffixFun", v-if="!addSuffix && suffixs.length") 修改
            Button(type="primary",v-if="addSuffix", @click="submitSuffixFun") 确定
        FormItem(label="组合方式：", :required="true", v-if="methodGroup==='2'")
          span.n 正面
          comp-checkbox(:list="combMethodList", ref="combMethod",)
        FormItem(label="品牌：",:required="true", v-if="methodGroup==='2'")
          comp-radio(:list="brandList", ref="brandIds2",:on-parentmethod="setBrandId")
        FormItem(label="智能生成域名：", :required="true", v-if="methodGroup==='2'")
          span {{list.length}}个
      div(slot="footer")
        Button(type="default", @click="modal1 = false") 取消
        Button(type="primary", @click="submitStep1", :loading="loadingBtn") 立即添加
    <!-- 添加品牌 -->
    Modal(v-model="modal2",title="",width="625px", class-name="modalAddFocusDomainList")
      div.clear(slot="header")
        strong 添加关注域名
      p(v-if="modal2") 添加关注域名：{{list.length}}个
      <!-- 列表主体 -->
      .secTable(v-if="modal2")
        <Table :columns="columns" :data="list" :loading="loadingTable"></Table>
      div(slot="footer")
        Button(type="primary", @click="submitDomain", :loading="loadingBtn") 确定添加
</template>

<script>
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
    brandList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      modal1: false,
      modal2: false,
      methodGroup: '1',
      id: '',
      domainNames: [],
      showErrorExp: false,
      showErrorSuffix: false,
      addExpWord: false,
      addSuffix: false,
      expWords: [],
      suffixs: [],
      expWordsTotal: [],
      suffixsTotal: [],
      columns: [
        {
          title: '域名',
          key: 'domain',
          className: 'col1'
        },
        {
          title: '品牌',
          key: 'brandName',
          className: 'col2'
        }
      ],
      list: [],
      // brandList: [],
      expPlusList: [
        {
          label: 'group',
          value: 'group'
        },
        {
          label: 'corp',
          value: 'corp'
        },
        {
          label: 'cloud',
          value: 'cloud'
        },
        {
          label: 'company',
          value: 'company'
        },
        {
          label: 'bank',
          value: 'bank'
        },
        {
          label: 'pay',
          value: 'pay'
        },
        {
          label: 'net',
          value: 'net'
        },
        {
          label: 'plus',
          value: 'plus'
        },
        {
          label: 'vip',
          value: 'vip'
        }
      ],
      expMinusList: [
        {
          label: 'bet',
          value: 'bet'
        },
        {
          label: 'sex',
          value: 'sex'
        },
        {
          label: 'drug',
          value: 'drug'
        },
        {
          label: 'sb',
          value: 'sb'
        },
        {
          label: 'fuck',
          value: 'fuck'
        }
      ],
      expIndustryList: [
        {
          label: 'mall',
          value: 'mall'
        },
        {
          label: 'buy',
          value: 'buy'
        },
        {
          label: 'blog',
          value: 'blog'
        },
        {
          label: 'news',
          value: 'news'
        },
        {
          label: 'media',
          value: 'media'
        }
      ],
      suffixPlusList: [
        {
          label: '.com',
          value: '.com'
        },
        {
          label: '.cn',
          value: '.cn'
        },
        {
          label: '.com.cn',
          value: '.com.cn'
        },
        {
          label: '.中国',
          value: '.中国'
        }
      ],
      combMethodList: [
        {
          label: 'brand',
          value: '品牌词'
        },
        {
          label: 'brandexp',
          value: '品牌词+拓展词'
        },
        {
          label: 'expbrand',
          value: '拓展词+品牌词'
        },
        {
          label: 'brand-exp',
          value: '品牌词+ - +拓展词'
        },
        {
          label: 'exp-brand',
          value: '拓展词+ - +品牌词'
        }
      ],
      loading: true,
      loadingTable: false,
      loadingBtn: false
    }
  },
  methods: {
    submitStep1 () {
      let result = true
      let domains = []
      if (this.methodGroup === '1') {
        result = validateFormResult([
          this.$refs.domainNames,
          this.$refs.brandIds1
        ])
        if (this.$refs.domainNames.value.length) {
          domains = this.$refs.domainNames.value.replace(/[\n\r]/g, ',').split(',')
          if (domains.length > 500) {
            this.$refs.domainNames.showValidateResult({text: '最多允许一次提交500个域名！'})
            result = false
          } else {
            for (var i = 0; i < domains.length; i++) {
              this.list.push({
                domain: domains[i],
                brandName: this.$refs.brandIds1.param.label,
                brandId: this.$refs.brandIds1.param.value
              })
              if (!this.GLOBALS.IS_DOMAIN_AVAILABLE(domains[i])) {
                result = false
                this.$refs.domainNames.showValidateResult({text: '域名格式错误！'})
                break
              }
            }
          }
        }
      } else {
        // 校验
        result = validateFormResult([
          this.$refs.brandWords,
          this.$refs.combMethod,
          this.$refs.brandIds2
        ])

        if (this.$refs.brandWords.value.length) {
          // 品牌词格式校验
          let brandWords = this.$refs.brandWords.value.replace(/[\n\r]/g, ',').split(',')
          for (let i = 0; i < brandWords.length; i++) {
            if (!this.GLOBALS.IS_ALL_ENGLISH(brandWords[i])) {
              result = false
              this.$refs.brandWords.showValidateResult({text: '格式错误！'})
              break
            }
          }
        }

        result = this.submitExpWordFun()
        if (result) {
          this.expWordsTotal = [...this.$refs.expPlus.value, ...this.$refs.expMinus.value, ...this.$refs.expIndustry.value, ...this.expWords]
          if (!this.expWordsTotal.length) {
            this.showErrorExp = true
            result = false
          } else {
            this.showErrorExp = false
          }
        }
        this.suffixsTotal = [...this.$refs.suffixPlus.value, ...this.suffixs]
        if (!this.suffixsTotal.length) {
          this.showErrorSuffix = true
          result = false
        } else {
          this.showErrorSuffix = false
        }
        // 计算条数
        this.suffixsTotal.map((v) => { // 后缀
          this.$refs.combMethod.value.map((v2) => { // 组合方式
            this.$refs.brandWords.value.replace(/[\n\r]/g, ',').split(',').map((v3) => { // 品牌词
              if (v2 === 'brand') {
                this.list.push({
                  domain: v3 + v,
                  brandName: this.$refs.brandIds2.param.label,
                  brandId: this.$refs.brandIds2.param.value
                })
                domains.push(v3 + v)
              } else if (v2 === 'brandexp') {
                this.expWordsTotal.map((v4) => {
                  this.list.push({
                    domain: v3 + v4 + v,
                    brandName: this.$refs.brandIds2.param.label,
                    brandId: this.$refs.brandIds2.param.value
                  })
                  domains.push(v3 + v4 + v)
                })
              } else if (v2 === 'expbrand') {
                this.expWordsTotal.map((v4) => {
                  this.list.push({
                    domain: v4 + v3 + v,
                    brandName: this.$refs.brandIds2.param.label,
                    brandId: this.$refs.brandIds2.param.value
                  })
                  domains.push(v4 + v3 + v)
                })
              } else if (v2 === 'brand-exp') {
                this.expWordsTotal.map((v4) => {
                  this.list.push({
                    domain: v3 + '-' + v4 + v,
                    brandName: this.$refs.brandIds2.param.label,
                    brandId: this.$refs.brandIds2.param.value
                  })
                  domains.push(v3 + '-' + v4 + v)
                })
              } else if (v2 === 'exp-brand') {
                this.expWordsTotal.map((v4) => {
                  this.list.push({
                    domain: v4 + '-' + v3 + v,
                    brandName: this.$refs.brandIds2.param.label,
                    brandId: this.$refs.brandIds2.param.value
                  })
                  domains.push(v4 + '-' + v3 + v)
                })
              }
            })
          })
        })
      }
      console.log(domains)
      if (result) {
        this.modal1 = false
        this.modal2 = true
      }
      this.domainNames = domains
    },
    submitDomain () {
      this.loadingBtn = true
      let param = {
        brandId: this.id,
        domainNames: this.domainNames.join(',')
      }
      this.$store.dispatch('CREATE_DOMAIN', param).then(response => {
        this.loadingTable = false
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.modal2 = false
          this.expWords = []
          this.suffixs = []
          this.list = []
          this.$Modal.info({
            title: '提示',
            content: `<p>添加成功：${response.data.countSuccess}个</p><p>添加失败：${response.data.countFaild}个</p>`
          })
          this.$emit('queryList')
        } else {
          if (response.data.code === '100') {
            this.$Message.error('品牌信息错误')
          }
        }
      }).catch(() => {})
    },
    addExpWordFun () {
      this.addExpWord = true
    },
    addSuffixFun () {
      this.addSuffix = true
    },
    modifyExpWordFun () {
      this.addExpWord = true
    },
    modifySuffixFun () {
      this.addSuffix = true
    },
    submitExpWordFun () {
      // 扩展词格式校验
      let result = true
      if (this.$refs.expwords.value.length) {
        let expwords = this.$refs.expwords.value.replace(/[\n\r]/g, ',').split(',')
        for (var i = 0; i < expwords.length; i++) {
          if (!this.GLOBALS.IS_ALL_ENGLISH(expwords[i])) {
            result = false
            this.$refs.expwords.showValidateResult({text: '格式错误！'})
            break
          }
        }
      }

      if (result) {
        this.expWords = this.$refs.expwords.value.length ? this.$refs.expwords.value.replace(/[\n\r]/g, ',').split(',') : []
        this.addExpWord = false
        return true
      } else {
        return false
      }
    },
    submitSuffixFun () {
      this.suffixs = this.$refs.suffixs.value.length ? this.$refs.suffixs.value.replace(/[\n\r]/g, ',').split(',') : []
      this.addSuffix = false
    },
    // getBrandList () {
    //   // 品牌列表
    //   this.$store.dispatch('FOLLOW_BRAND_LIST', {pageNum: -1, pageSize: -1}).then(response => {
    //     this.loadingTable = false
    //     this.loadingBtn = false
    //     if (!response) {
    //       return false
    //     }
    //     if (response.data.code === '1000') {
    //       this.brandList = response.data.list.map((v) => {
    //         return {
    //           label: v.id,
    //           value: v.brandName
    //         }
    //       })
    //     } else {
    //     }
    //   }).catch(() => {})
    // },
    setBrandId (obj) {
      this.id = obj.value
    }
  },
  beforeMount () {
    // this.getBrandList()
  },
  mounted () {
  },
  computed: {
  },
  watch: {
  }
}
</script>
<style>
.compAddFocusDomain{
  display: inline-block;
}

.modalAddFocusDomain .ivu-modal-header,
.modalAddFocusDomainList .ivu-modal-header{
  height: 100px;
  background: #2271f4;
  text-align: left;
}
.modalAddFocusDomain .ivu-modal-header strong,
.modalAddFocusDomainList .ivu-modal-header strong{
  font-size: 16px;
  font-weight: 200;
  color: #fff;
}
.modalAddFocusDomain .ivu-modal-close i,
.modalAddFocusDomainList .ivu-modal-close i{
  color: #fff;
}
.compAddFocusDomain textarea{
  width: 500px;
}

.modalAddFocusDomain span.n{
  display: block;
  font-weight: 600;
}
.modalAddFocusDomain a{
  color: #246fe2;
}
.modalAddFocusDomain p.result{
  border: 1px solid #e1e1e1;
  padding: 0 10px;
}
.modalAddFocusDomainList th{
  background: #f9f9f9;
}
.modalAddFocusDomainList .secTable{
  height: 470px;
  overflow: auto;
}
</style>
