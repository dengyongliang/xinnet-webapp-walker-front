<template lang="pug">
  .pageMain
    header-body()
    .mainBody.brandDetail(v-if="islogin")
      .queryCont
        .form()
          <Input placeholder="请输入域名" v-model="keyWords" @keydown.native.enter.prevent ="handleSearch">
            <Select v-model="searchType" slot="prepend" class="selectType">
                <Option v-for="item in searchTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button slot="append" icon="ios-search" @click="handleSearch" :loading="loadingBtn">立即查询</Button>
          </Input>
      .detailCont
        .step
          Steps(:current="step", :status="stepStatus")
            Step(title="提交申请", :content="objDetail.appDate")
            Step(title="初审公告", :content="objDetail.announcementDate")
            Step(title="注册公告", :content="objDetail.regDate")
            Step(title="商标终止", :content="objDetail.isTerminate ? '' : objDetail.privateDate")
        Row
          Col.col1(span="4")
            span.img
              img(:src="'http://tmpic.tmkoo.com/' + objDetail.tmImg")
          Col.col2(span="16")
            table
              tr
                td 申请人：
                  span {{objDetail.applicantCn}}
                td 初审公告：
                  span {{objDetail.announcementIssue}}
              tr
                td 注册号：
                  span {{objDetail.regNo}}
                td 申请日期：
                  span {{objDetail.appDate}}
              tr
                td
                td 注册公告：
                  span {{objDetail.regIssue}}
          Col.col3(span="4")
            div
              //- Button(icon="ios-star-outline") 关注商标
        Row
          Col.col1(span="12")
            h3.h3T.clear
              span.t 商标信息
            ul
              li 申请时间：{{objDetail.appDate}}
              li 注册时间：{{objDetail.regDate}}
              li 申请人名称：{{objDetail.applicantCn}}
              li 申请人地址：{{objDetail.addressCn}}
              li 商标类型：{{objDetail.intCls}}

          Col.col2(span="12")
            h3.h3T.clear
              span.t 商品/服务
              em 具体核准商品/服务以商标公告为准，
              a(href="http://sbj.cnipa.gov.cn/sbcx/", target="_blank") 点击查看
            ul
              li(v-for="item in objDetail.goods", :style="item.beDeleted==='true' ? 'text-decoration: line-through' : ''") {{item.goodsCode}} —— {{item.goodsName}}
        Row
          Col.col1(span="12")
            h3.h3T.clear
              span.t 审核信息
            ul
              li 初审公告期号：{{objDetail.announcementIssue}}
              li 初审公告期时间：{{objDetail.announcementDate}}
              li 注册公告期号：{{objDetail.regIssue}}
              li 注册公告期时间：{{objDetail.regDate}}
              li 专用权期限： {{objDetail.privateDate}}
          Col.col2(span="12")
            h3.h3T.clear
              span.t 商标状态
              em 结果仅供参考，准确商标状态请进入
              a(href="http://sbj.cnipa.gov.cn/sbcx/", target="_blank") 中国商标网>>查询
            ul
              li(v-for="item in objDetail.flow") {{item.flowDate}} {{item.flowName}}
        Row
          Col.col1(span="12")
            h3.h3T.clear
              span.t 商标公告
            ul
              li(v-for="item in objDetail.gonggaos") {{item.ggDate}} 第{{item.ggQihao}}期《{{item.ggName}}》第{{item.ggPage}}页
                a(:href="item.url", target="_blank") 查看
      //- footer-body()
</template>

<script>
import {mapState} from 'vuex'
import headerBody from '../modular/header'
import footerBody from '../modular/footer'
export default {
  name: 'DOMAIN_QUERY',
  components: {
    headerBody,
    footerBody
  },
  data () {
    return {
      stepStatus: 'process',
      loadingBtn: false,
      loadingTable: false,
      step: 2,
      regNo: '',
      intCls: '',
      objDetail: {},
      searchType: '4',
      keyWords: '',
      searchTypeList: [
        {
          value: '4',
          label: '全部'
        },
        {
          value: '1',
          label: '按商标名'
        },
        {
          value: '2',
          label: '按注册号'
        },
        {
          value: '3',
          label: '按申请人'
        }
      ],
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    handleSearch () {
      if (this.GLOBALS.TRIM_ALL(this.keyWords).length) {
        this.$router.push({path: '/brandQueryResult', query: {'type': this.searchType, 'key': this.keyWords, 'intcls': 0}})
      } else {
        this.$Message.error('请输入要查询的商标！')
      }
    }
  },
  computed: {
    ...mapState([
      'islogin'
    ])
  },
  beforeMount () {
  },
  mounted () {
    console.log(this.$route.query.regNo)
    console.log(this.$route.query.intCls)
    this.regNo = this.$route.query.regNo ? this.$route.query.regNo : ''
    this.intCls = this.$route.query.intCls ? this.$route.query.intCls : '0'
    this.$store.dispatch('TRADEMARK_INFO', {'regNo': this.regNo, 'intCls': this.intCls}).then(response => {
      this.loadingBtn = false
      this.loadingTable = false
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.objDetail = response.data.data
        if (!this.objDetail.appDate) {
          this.step = 0
        } else if (this.objDetail.appDate && !this.objDetail.announcementDate) {
          this.step = 0
          this.stepStatus = 'finish'
        } else if (this.objDetail.announcementDate && !this.objDetail.regDate) {
          this.step = 1
          this.stepStatus = 'finish'
        } else if (this.objDetail.regDate && !this.objDetail.terminateDate) {
          this.step = 2
          this.stepStatus = 'finish'
        } else if (this.objDetail.terminateDate && !this.objDetail.isTerminate) {
          this.step = 2
          this.stepStatus = 'finish'
        } else if (this.objDetail.terminateDate && this.objDetail.isTerminate) {
          this.step = 0
          this.stepStatus = 'wait'
          // this.$set(this.objDetail, 'privateDate', '')
        }
      } else {
        // if (response.data.code === '900') {
        //   this.$Message.error('查询失败')
        // }
      }
    }).catch(() => {})
  }
}
</script>

<style>
.brandDetail .queryCont{
  width: 1200px;
  margin: 0 auto;
  padding: 88px 0 38px 0;
  text-align: center;
}
.brandDetail .queryCont .form{
  margin: 0 auto;
  width: 925px;
  position: relative;
}
/* .brandDetail .queryCont .ivu-input-wrapper{
  margin: 0px auto;
  padding: 20px 0;
  width: 740px;
} */
.brandDetail .queryCont .ivu-input-wrapper input{
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  font-size: 15px;
  border: none;
}
.brandDetail .queryCont .ivu-input-wrapper input:focus{
  /* border: 2px solid #ff9900!important; */
  box-shadow:0px 0px 0px 0px #ff9900 inset;
}
.brandDetail .queryCont .ivu-input-group-prepend{
  width: 110px;
  background: #fff;
  border: none;
  border-right: 1px solid #e1e1e1;
  border-radius: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
.brandDetail .queryCont .ivu-select-selected-value{
  font-size: 16px;
}
.brandDetail .queryCont .ivu-input-group-append{
  width: 148px;
  background: #2271f4!important;
  border-radius: 0px;
  border: none;
  padding: 0px;
}
.brandDetail .queryCont .ivu-input-group-append button{
  padding:0px;
  display: block;
  height: 50px;
  line-height: 50px;
  width: 100%;
  margin: 0px;
}
.brandDetail .queryCont .ivu-input-group-append .ivu-icon{
  line-height: 30px;
}
.brandDetail .queryCont .ivu-input-group-append i:before{
  font-size: 30px;
  color: #fff;
  vertical-align: middle;
}
.brandDetail .queryCont .ivu-input-group-append span{
  font-size: 15px;
  line-height: 30px;
  color: #fff;
  display: inline-block;
  vertical-align: middle;
}
.brandDetail .queryCont .ivu-input-wrapper{
  border: 1px solid #135edb;
}
.brandDetail .detailCont{
  width: 1200px;
  margin: 0 auto;
  padding: 38px 0;
  text-align: center;
  background: #fff;
}
.brandDetail .step{
  padding-bottom: 35px;
  border-bottom: 1px solid #f7f8fa;
}
.brandDetail .ivu-steps{
  width: 665px;
  margin: 0 auto;
}
.brandDetail .ivu-steps-item{
  text-align: center;
}

.brandDetail .ivu-steps-item .ivu-steps-head-inner{
  width: 23px;
  height: 23px;
  line-height: 23px;
  vertical-align: middle;
}
.brandDetail .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner,
.brandDetail .ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner{
  border-color: #b8e9d4;
  border-radius: 100%;
  background: none;
}
.brandDetail .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner .ivu-icon,
.brandDetail .ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner span,
.brandDetail .ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner span{
  display: inline-block;
  width: 17px;
  height: 17px;
  line-height: 17px;
  background: #11ac60;
  border-radius: 100%;
  color: #fff;
  font-size: 17px;
  top: -2px;
}
.brandDetail .ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner span,
.brandDetail .ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner span{
  font-size: 12px;
  position: relative;
}
.brandDetail .ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner span{
  background: #d7d7d7;
}
.ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail>i:after{
  background: #18bf6d;
}

.brandDetail .ivu-steps .ivu-steps-tail{
  left: 75px;
}
.brandDetail .ivu-steps .ivu-steps-tail>i:after{
  left: 0px;
}
.brandDetail .ivu-steps .ivu-steps-head{
  margin-left: 0px!important;
}
.brandDetail .ivu-steps .ivu-steps-main{
  display: block;
}
.brandDetail .ivu-steps .ivu-steps-title{
  padding: 0px;
  color: #333333;
  font-size: 12px;
  font-weight: normal;
}
.brandDetail .ivu-steps .ivu-steps-content{
  padding: 0px;
  font-size: 12px;
}
.brandDetail .ivu-row {
  padding: 30px 50px;
  border-bottom: 1px solid #f0f0f0;
  text-align: left;
}
.brandDetail .ivu-row .img{
  width: 168px;
  height: 98px;
  line-height: 95px;
  border: 1px solid #e5e5e5;
  display: inline-block;
  text-align: center;
}
.brandDetail .ivu-row .img img{
  max-width: 166px;
  max-height: 96px;
  vertical-align: middle;
}

.brandDetail .ivu-row td{
  padding: 5px 0;
  font-size: 14px;
  color: #666666;
}
.brandDetail .ivu-row td span{
  color: #333;
}
.brandDetail .ivu-row .col1{
  text-align: left;
}
.brandDetail .ivu-row .col3{
  text-align: right;
}
.brandDetail .ivu-row .ivu-btn{
  border: none;
  padding: 0px;
  background: none;
}
.brandDetail .ivu-row .ivu-btn span{
  color: #333;
  margin: 0px;
}
.brandDetail .ivu-row .ivu-icon::before{
  font-size: 16px;
}
.brandDetail .h3T{
  font-weight: normal;
  text-align: left;
}
.brandDetail .h3T .t{
  font-size: 15px;
  line-height: 16px;
  display:inline-block;
  padding-left: 17px;
  border-left: 3px solid #2471f5;
  margin: 8px 5px 8px 0;
}
.brandDetail .h3T em{
  font-size: 12px;
  color: #999;
  display:inline-block;
}
.brandDetail .h3T a{
  font-size: 12px;
  color: #2271f4;
  display:inline-block;
}
.brandDetail .h3T .tR{
  float: right;
  font-size: 12px;
  padding-right: 20px;
}
.brandDetail .h3T .tR a.text{
  display:inline-block;
  line-height: 16px;
  margin: 8px 0;
  color: #2271f4;
}
.brandDetail .ivu-row ul{
  text-align: left;
  padding-left: 20px;
}
.brandDetail .ivu-row ul li{
  color: #666;
  font-size: 12px;
  padding: 7px 0;
}
.brandDetail .ivu-row ul li a{
  color: #2271f4;
  display: inline-block;
  margin-left: 5px;
}
.brandDetail .footer{
  width: 1200px;
  margin: 0 auto;
}
</style>
