<template lang="pug">
  .pageMain
    header-body()
    .mainBody.brandQueryResult(v-if="islogin")
      .queryCont
        form()
          <Input placeholder="请输入域名">
            <Select v-model="type" slot="prepend" class="selectType">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button slot="append" icon="ios-search">立即查询</Button>
          </Input>
      .detailCont
        .step
          Steps(:current="step",)
            Step(title="提交申请", content="2018-12-23")
            Step(title="初审公告", content="2018-12-23")
            Step(title="注册公告", content="2018-12-23")
            Step(title="提交申请", content="2018-12-23")
        Row
          Col.col1(span="4")
            span.img
          Col.col2(span="16")
            table
              tr
                td 申请人：
                  span 北京按实际法卡萨来得及发上来公司
                td 初审公告：
                  span 北京按实际法卡萨来得及发上来公司
              tr
                td 注册号：
                  span 北京按实际法卡萨来得及发上来公司
                td 申请日期：
                  span 北京按实际法卡萨来得及发上来公司
              tr
                td
                td 注册公告：
                  span 北京按实际法卡萨来得及发上来公司
          Col.col3(span="4")
            div
              Button(icon="ios-star-outline") 关注商标
        Row
          Col.col1(span="12")
            h3.h3T.clear
              span.t 商标信息
            ul
              li 申请时间：2018-12-12
              li 注册时间：2019-12-31
              li 申请人名称：北京天翼文化传播有限公司
              li 申请人地址：北京市通州区经济开发区南区鑫隅街45号
              li 商标类型：一般

          Col.col2(span="12")
            h3.h3T.clear
              span.t 商品/服务
              em 具体核准商品/服务以商标公告为准，
              a 点击查看
            ul
              li 2025 —— 清漆
              li 2025 —— 清漆
              li 2025 —— 清漆
              li 2025 —— 清漆
              li 2025 —— 清漆
              li 2025 —— 清漆
              li 2025 —— 清漆
        Row
          Col.col1(span="12")
            h3.h3T.clear
              span.t 审核信息
            ul
              li 初审公告期号：1025
              li 初审公告期时间：2019-12-13
              li 注册公告期号：1025
              li 注册公告期时间：2019-12-13
              li 专用权期限： 2015年05月21日至2025年05月20日
          Col.col2(span="12")
            h3.h3T.clear
              span.t 商标状态
              em 结果仅供参考，准确商标状态请进入
              a 中国商标网>>查询
            ul
              li 2014-03-24商标注册申请中
              li 2015-05-21商标注册申请注册公告排版完成
              li 2015-06-23商标注册申请完成

        Row
          Col.col1(span="12")
            h3.h3T.clear
              span.t 商标公告
            ul
              li 2015-02-20 第1444期《商标初步审定公告》第1387页
                a 查看
              li 2015-05-20 第1456期《商标注册公告（一）》第12514页
                a 查看
      footer-body()
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
      type: '',
      step: 2,
      disabledGroup: [],
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
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
    pageChange: function (curPage) {
      // this.queryList({pageNum: curPage})
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
  }
}
</script>

<style>
.brandQueryResult .queryCont{
  width: 1200px;
  margin: 0 auto;
  padding: 88px 0 38px 0;
  text-align: center;
}
.brandQueryResult .queryCont form{
  margin: 0 auto;
  width: 925px;
  position: relative;
}
/* .brandQueryResult .queryCont .ivu-input-wrapper{
  margin: 0px auto;
  padding: 20px 0;
  width: 740px;
} */
.brandQueryResult .queryCont .ivu-input-wrapper input{
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  font-size: 15px;
  border: none;
}
.brandQueryResult .queryCont .ivu-input-wrapper input:focus{
  /* border: 2px solid #ff9900!important; */
  box-shadow:0px 0px 0px 0px #ff9900 inset;
}
.brandQueryResult .queryCont .ivu-input-group-prepend{
  width: 110px;
  background: #fff;
  border: none;
  border-right: 1px solid #e1e1e1;
  border-radius: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
.brandQueryResult .queryCont .ivu-select-selected-value{
  font-size: 16px;
}
.brandQueryResult .queryCont .ivu-input-group-append{
  width: 148px;
  background: #2271f4!important;
  border-radius: 0px;
  border: none;
}
.brandQueryResult .queryCont .ivu-input-group-append button{
  padding:0px;
}
.brandQueryResult .queryCont .ivu-input-group-append .ivu-icon{
  line-height: 30px;
}
.brandQueryResult .queryCont .ivu-input-group-append i:before{
  font-size: 30px;
  color: #fff;
  vertical-align: middle;
}
.brandQueryResult .queryCont .ivu-input-group-append span{
  font-size: 15px;
  line-height: 30px;
  color: #fff;
  display: inline-block;
  vertical-align: middle;
}
.brandQueryResult .queryCont .ivu-input-wrapper{
  border: 1px solid #135edb;
}
.brandQueryResult .detailCont{
  width: 1200px;
  margin: 0 auto;
  padding: 38px 0;
  text-align: center;
  background: #fff;
}
.brandQueryResult .step{
  padding-bottom: 35px;
  border-bottom: 1px solid #f7f8fa;
}
.brandQueryResult .ivu-steps{
  width: 665px;
  margin: 0 auto;
}
.brandQueryResult .ivu-steps-item{
  text-align: center;
}
.brandQueryResult .ivu-steps-item .ivu-steps-head-inner{
  width: 23px;
  height: 23px;
  line-height: 23px;
  vertical-align: middle;
}
.brandQueryResult .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner,
.brandQueryResult .ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner{
  border-color: #b8e9d4;
  border-radius: 100%;
  background: none;
}
.brandQueryResult .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner .ivu-icon,
.brandQueryResult .ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner span,
.brandQueryResult .ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner span{
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
.brandQueryResult .ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner span,
.brandQueryResult .ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner span{
  font-size: 12px;
  position: relative;
}
.brandQueryResult .ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner span{
  background: #d7d7d7;
}
.ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail>i:after{
  background: #18bf6d;
}

.brandQueryResult .ivu-steps .ivu-steps-tail{
  left: 75px;
}
.brandQueryResult .ivu-steps .ivu-steps-tail>i:after{
  left: 0px;
}
.brandQueryResult .ivu-steps .ivu-steps-head{
  margin-left: 0px!important;
}
.brandQueryResult .ivu-steps .ivu-steps-main{
  display: block;
}
.brandQueryResult .ivu-steps .ivu-steps-title{
  padding: 0px;
  color: #333333;
  font-size: 12px;
  font-weight: normal;
}
.brandQueryResult .ivu-steps .ivu-steps-content{
  padding: 0px;
  font-size: 12px;
}
.brandQueryResult .ivu-row {
  padding: 30px 50px;
  border-bottom: 1px solid #f0f0f0;
}
.brandQueryResult .ivu-row .img{
  width: 168px;
  height: 98px;
  border: 1px solid #e5e5e5;
  display: inline-block;
}

.brandQueryResult .ivu-row td{
  padding: 5px 0;
  font-size: 14px;
  color: #666666;
}
.brandQueryResult .ivu-row td span{
  color: #333;
}
.brandQueryResult .ivu-row .col1{
  text-align: left;
}
.brandQueryResult .ivu-row .col3{
  text-align: right;
}
.brandQueryResult .ivu-row .ivu-btn{
  border: none;
  padding: 0px;
  background: none;
}
.brandQueryResult .ivu-row .ivu-btn span{
  color: #333;
  margin: 0px;
}
.brandQueryResult .ivu-row .ivu-icon::before{
  font-size: 16px;
}
.brandQueryResult .h3T{
  font-weight: normal;
  text-align: left;
}
.brandQueryResult .h3T .t{
  font-size: 15px;
  line-height: 16px;
  display:inline-block;
  padding-left: 17px;
  border-left: 3px solid #2471f5;
  margin: 8px 5px 8px 0;
}
.brandQueryResult .h3T em{
  font-size: 12px;
  color: #999;
  display:inline-block;
}
.brandQueryResult .h3T a{
  font-size: 12px;
  color: #2271f4;
  display:inline-block;
}
.brandQueryResult .h3T .tR{
  float: right;
  font-size: 12px;
  padding-right: 20px;
}
.brandQueryResult .h3T .tR a.text{
  display:inline-block;
  line-height: 16px;
  margin: 8px 0;
  color: #2271f4;
}
.brandQueryResult .ivu-row ul{
  text-align: left;
  padding-left: 20px;
}
.brandQueryResult .ivu-row ul li{
  color: #666;
  font-size: 12px;
  padding: 7px 0;
}
.brandQueryResult .ivu-row ul li a{
  color: #2271f4;
  display: inline-block;
  margin-left: 5px;
}
.brandQueryResult .footer{
  width: 1200px;
  margin: 0 auto;
}
</style>
