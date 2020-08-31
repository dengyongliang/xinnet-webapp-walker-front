<template lang="pug">
.contBrand
  <!-- 标题区 -->
  h1.pageTitle.clear
    <span>商标监控</span>
    .tR
      Button(type="default", class="btnTop" @click="showModalBody",:loading="loadingBtn",) 通知设置
  .secMain()
    Tabs(value="name1", :animated="false", @on-click="handleTabChange",)
      TabPane(label="关注的商标", name="name1", class="tabCont1")
        comp-trademark-follow(ref="compTrademarkFollow", :currentStatusList="currentStatusList",:brandList="brandList")
      TabPane(label="近似商标监控", name="name2", class="tabCont2")
        comp-trademark-similar(ref="compTrademarkSimilar", :brandList="brandList")
      TabPane(label="按申请主体监控", name="name3", class="tabCont3")
        comp-trademark-body(ref="compTrademarkBody")
    comp-trademark-notify-set(ref="compTrademarkNotifySet", :notifyData="notifyData")
</template>
<script>
import compTrademarkFollow from '@/components/compTrademarkFollow'
import compTrademarkSimilar from '@/components/compTrademarkSimilar'
import compTrademarkBody from '@/components/compTrademarkBody'
import compTrademarkNotifySet from '@/components/compTrademarkNotifySet'

import moment from 'moment'
import { mapState } from 'vuex'
export default {
  components: {
    compTrademarkFollow,
    compTrademarkSimilar,
    compTrademarkBody,
    compTrademarkNotifySet
  },
  data () {
    return {
      id: 0,
      tabIdx: 'name1',
      currentStatusList: [
        {
          label: '全部',
          value: '',
          key: 0
        },
        {
          label: '申请中',
          value: '申请中',
          key: 1
        },
        {
          label: '初审公告期',
          value: '初审公告期',
          key: 2
        },
        {
          label: '续展/宽限期',
          value: '续展/宽限期',
          key: 3
        },
        {
          label: '有效',
          value: '有效',
          key: 4
        },
        {
          label: '无效',
          value: '无效',
          key: 5
        }
      ],
      brandList: [],
      loadingTable: true,
      loadingBtn: false,
      applicantCn: '',
      notifyData: {}
    }
  },
  methods: {
    handleTabChange: function (name) {
      this.tabIdx = name
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
    },
    getNotify () {
      this.$store.dispatch('FOLLOW_TRADEMARK_SEARCH_NOTIFY', {}).then(response => {
        this.loadingTable = false
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.notifyData = response.data.data
        } else {
        }
      }).catch(() => {})
    },
    showModalBody (num) {
      this.$refs.compTrademarkNotifySet.handleShowModal()
    }
  },
  computed: {
    ...mapState({
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  beforeMount () {

  },
  mounted () {
    this.$nextTick(function () {
      this.getBrandList()
      this.getNotify()
    })
    // alert(this.$route.query.id)
    // alert(this.$route.query.issueNumber)
    // alert(this.$route.query.intClass)
    // alert(this.$route.query.order)
    // alert(this.$route.query.orderType)
    // alert(this.$route.query.pageNum)
    // alert(this.$route.query.pageSize)
    // alert(this.$route.query.monitorBodyId)
    // alert(this.$route.query.keyWords)
    // if (this.$route.query.id) {
    //   this.show = 2
    // } else if (this.$route.query.monitorBodyId) {
    //   this.show = 3
    // } else {
    //   this.$nextTick(function () {
    //     this.getBrandList()
    //   })
    // }
  },
  watch: {
  }
}
</script>
<style>
.contBrand .secMain {
    background: none!important;
}
.contBrand .ivu-tabs{
  overflow: visible;
}
.contBrand .ivu-tabs-bar{
  background: #fff;
  margin-bottom: 0px;
}
.contBrand .ivu-tabs-bar .ivu-tabs-tab{
  height: 50px;
  line-height: 50px;
  padding: 0 30px;
  /* margin: 0px; */
}
/* .contBrand .btnTop{
  display: none;
} */
.contBrand .btnMore{
  border: none;
  background: none;
  padding: 0px;
}
.contBrand .btnMore span{
  color: #333;
}
.contBrand .secFilter{
  background: #ecf3fb;
  padding-top: 10px;
  padding-right: 20px;
}
.contBrand .filterWrap {
  padding: 10px 0px;
}
.contBrand .filterWrap .td1,
.contBrand .filterWrap .td2,
.contBrand .filterWrap .td3{
  width: 30%;
}
.contBrand .filterWrap .tdBtn{
  width: 10%;
}
.contBrand .tabCont2 .filterWrap td,
.contBrand .tabCont3 .filterWrap td{
  width: 25%!important;
} 
.contBrand .secFilter .compSelect{
  width: 100%;
}
.contBrand .secFilter .compCheckbox{
  padding: 8px 0;
}
.contBrand .secFilter .inputWrap{
  background: none;
}
.contBrand .secFilter .inputWrap{
  background: none;
}
.contBrand .secFilter .ivu-radio-group{
  overflow: hidden;
}
.contBrand .secFilter .ivu-radio-group-item{
  float: left;
  width: 100px;
  height: 26px;
  line-height: 26px;
  background: none;
  margin-right: 5px;
  margin-bottom: 2.5px;
  margin-top: 2.5px;
}
.contBrand .secFilter .ivu-radio-group-item .ivu-radio{
  opacity: 0;
  width: 10px;
}
.contBrand .secFilter .ivu-radio-group-item em{
  color: #999;
}
.contBrand .secFilter .ivu-radio-wrapper-checked{
  background: #2271f4;
  color: #fff;
}
.contBrand .secFilter .ivu-radio-wrapper-checked span{
  color: #fff;
}
.contBrand .tableTool {
  background:#fff;
  padding: 10px 20px;
}
.contBrand .tableTool .ivu-btn{
  margin: 0 5px;
}
.contBrand .tableTool .toolBtn span{
  color:#333;
}
.contBrand .tableTool a{
  display:inline-block;
  margin: 0 10px;
}
.contBrand .intClsInfoDiv{
  max-height: 200px;
  overflow: auto;
}
</style>
