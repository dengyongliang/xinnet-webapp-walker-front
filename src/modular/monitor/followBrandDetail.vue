<template lang="pug">
  .contFollowBrandDetail()
    <!-- 标题区 -->
    h1.pageTitle.clear
      <span @click="" class="backlist">品牌库 - {{brandDetail.brandName}}</span>
      .tR
        Button(type="default", class="btnTop" @click="handleBrandSet") 品牌设置
    .secMain()
      .cont1
        Row()
          Col(span="14")
            div
              span.logo
                img(:src='brandDetail.brandLogo')
              .info
                h4 {{brandDetail.brandName}}
                ul
                  li 管理公司：{{brandDetail.companyName}}
                  li 品牌级别：{{brandDetail.brandLevel}}
                p 关键词：{{brandDetail.brandKeyword}}
          Col(span="10")
            div
              .chart
                i-circle(:percent="brandDetail.brandSafeMark", :size="100", stroke-color="#099bfe")
                  <span class="demo-circle-inner" style="font-size:24px">{{brandDetail.brandSafeMark}}分</span>
              .info
                strong 品牌安全分
                //- a 查看品牌健康报告
      .cont2
        h2.h2T 品牌资产
        Row()
          Col(span="12")
            comp-chart-brand-domain(:charData="chartBrandDomain")
          Col(span="12")
            comp-chart-brand(:charData="chartBrand")

      .cont3
        h2.h2T 品牌监控
        Row(:gutter="20")
          Col(span="8")
            div
              h3.h3T.clear
                span.t 自有域名监控
                div.tR
                  router-link.text(to="/domain/mgmt ") 详情
              ul
                li <Icon type="ios-alert" />{{brandDetail.ddExpireCount}}个域名即将过期
          Col(span="8")
            div
              h3.h3T.clear
                span.t 自有商标监控
                div.tR
                  router-link.text(to="/monitor/brand") 详情
              ul
                li <Icon type="ios-alert" />初审公告期商标{{brandDetail.ttAnnouncementCount}}个
                li <Icon type="ios-alert" />续展/宽展期商标{{brandDetail.ttExtensionCount}}个
          Col(span="8")
            div
              h3.h3T.clear
                span.t 关注域名监控
                div.tR
                  router-link.text(to="/monitor/focus") 详情
              ul
                li <Icon type="ios-alert" />{{brandDetail.fdIllegalWebsiteCount}}个域名指向疑似非法网站
                li <Icon type="ios-alert" />{{brandDetail.fdNonContinentalCount}}个域名指向非大陆IP
                li <Icon type="ios-alert" />{{brandDetail.fdOnSaleCount}}个域名正在出售
                li <Icon type="ios-alert" />{{brandDetail.fdToRegisterCount}}个域名正在抢注
                li <Icon type="ios-alert" />{{brandDetail.fdExpireCount}}个域名即将到期
          Col(span="8")
            div
              h3.h3T.clear
                span.t 关注商标监控-关注的商标
                div.tR
                  router-link.text(to="/monitor/brand") 详情
              ul
                li <Icon type="ios-alert" />初审公告期商标{{brandDetail.ftAnnouncementCount}}个
                li <Icon type="ios-alert" />续展/宽展期商标{{brandDetail.ftExtensionCount}}个
          Col(span="8")
            div
              h3.h3T.clear
                span.t 关注商标监控-近似商标监控
                  em （公告期内近似/高度近似）
                div.tR
                  router-link.text(to="/monitor/brand") 详情
              ul
                li(v-if="brandDetail.similars") <Icon type="ios-alert" />{{brandDetail.similars}}
    <!-- 创建企业 抽屉 -->
    Drawer(:closable="true", width="640", v-model="drawerFollowDomainBrandCreate", title="创建企业", :mask-closable="maskClosable", @on-visible-change="drawerChange")
      comp-follow-domain-brand-create(
        v-if="drawerFollowDomainBrandCreate",
        :brandLevelList="brandLevelList",
        :on-close="closeDrawer",
        :id = "id"
      )
</template>

<script>
import { mapState } from 'vuex'
import compChartBrandDomain from '@/components/compChartBrandDomain'
import compChartBrand from '@/components/compChartBrand'
import compFollowDomainBrandCreate from '@/components/compFollowDomainBrandCreate'
export default {
  components: {
    compChartBrandDomain,
    compChartBrand,
    compFollowDomainBrandCreate
  },
  props: {

  },
  data () {
    return {
      id: '',
      brandDetail: {},
      chartBrandDomain: {},
      chartBrand: {},
      drawerFollowDomainBrandCreate: false,
      brandLevelList: [
        {
          value: '1',
          label: '集团名称/核心品牌'
        },
        {
          value: '2',
          label: '主要产品品牌'
        },
        {
          value: '3',
          label: '次要产品品牌/内部使用'
        },
        {
          value: '4',
          label: '防御性品牌'
        },
        {
          value: '5',
          label: '其他'
        }
      ]
    }
  },
  methods: {
    queryDetail () {
      this.$store.dispatch('FOLLOW_BRAND_DETAIL', {id: this.$route.params.id}).then(response => {
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.id = this.$route.params.id
          this.brandDetail = response.data.data
          this.brandDetail.brandLevel = this.DATAS.BRAND_LEVEL[response.data.data.brandLevel]
          this.brandDetail.brandKeyword = this.brandDetail.brandKeyword.split(';').join('，')
          this.$set(this.chartBrandDomain, 'ddServiceCount', response.data.data.ddServiceCount)
          this.$set(this.chartBrandDomain, 'ddRenewCount', response.data.data.ddRenewCount)
          this.$set(this.chartBrandDomain, 'ddPaybackCount', response.data.data.ddPaybackCount)

          this.$set(this.chartBrand, 'ttValidCount', response.data.data.ttValidCount)
          this.$set(this.chartBrand, 'ttApplyCount', response.data.data.ttApplyCount)
          this.$set(this.chartBrand, 'ttExtensionCount', response.data.data.ttExtensionCount)
          this.$set(this.chartBrand, 'ttInvalidCount', response.data.data.ttInvalidCount)
        } else {
        }
      }).catch(() => {})
      this.brandDetailShow = true
    },
    drawerChange () {
      if (!this.drawerFollowDomainBrandCreate) {
        this.queryDetail()
      }
    },
    closeDrawer () {
      this.drawerFollowDomainBrandCreate = false
    },
    handleBrandSet () {
      this.drawerFollowDomainBrandCreate = true
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
      this.queryDetail()
    })
  },
  watch: {
  }
}
</script>
<style scoped>
.contFollowBrandDetail .secMain{
  background: none;
}
.contFollowBrandDetail .h2T{
  font-size: 25px;
  margin-bottom: 30px;
  font-weight: normal;
}
.contFollowBrandDetail .cont1{
  margin-bottom: 35px;
}
.contFollowBrandDetail .cont1 .ivu-col{
  padding: 50px 0;
  background: #fff;
}
.contFollowBrandDetail .cont1 .ivu-col>div{
  overflow: hidden;
  height: 130px;
  padding-left: 40px;
}
.contFollowBrandDetail .cont1 .ivu-col:nth-child(1)>div{
  border-right: 1px solid #ededed;
}
.contFollowBrandDetail .cont1 .logo{
  width:80px;
  height:80px;
  border-radius:100%;
  overflow:hidden;
  border:5px solid #fff;
  vertical-align:middle;
  margin-right: 50px;
  margin-top: 20px;
  float: left;
  -moz-box-shadow:0px 0px 6px rgba(0,0,0,0.2);
  -webkit-box-shadow:0px 0px 6px rgba(0,0,0,0.2);
  box-shadow:0px 0px 6px rgba(0,0,0,0.2);
}
.contFollowBrandDetail .cont1 .logo img{
  width: 100%;
  height: 100%;
  vertical-align: top;
}
.contFollowBrandDetail .cont1 .info{
  overflow: hidden;
}
.contFollowBrandDetail .cont1 .info h4{
  font-size: 19px;
  margin-bottom: 20px;
}
.contFollowBrandDetail .cont1 .info ul{
  margin-bottom: 20px;
}
.contFollowBrandDetail .cont1 .info li{
  color: #666;
  padding: 7px 0;
  font-size: 12px;
}
.contFollowBrandDetail .cont1 .chart{
  width: 100px;
  height: 100px;
  float: left;
  margin-right: 40px;
  margin-top: 15px;
}
.contFollowBrandDetail .cont1 .info strong{
  display: block;
  font-size: 19px;
  font-weight: normal;
  text-align: left;
  margin-bottom: 20px;
  padding-top: 40px;
}
.contFollowBrandDetail .cont1 .info a{
  color: #2271f4;
  font-size: 12px;
}
.contFollowBrandDetail .cont2{
  margin-bottom: 35px;
}
.contFollowBrandDetail .cont2 .ivu-col{
  padding: 50px 0;
  background: #fff;
}
.contFollowBrandDetail .cont2 .ivu-col>div{
  height: 220px;
}
.contFollowBrandDetail .cont2 .ivu-col:nth-child(1)>div{
  border-right: 1px solid #ededed;
}
.contFollowBrandDetail .cont3 .ivu-col{
  margin-bottom: 20px;
}
.contFollowBrandDetail .cont3 .ivu-col>div{
  background: #fff;
  padding: 20px;
}
.contFollowBrandDetail .cont3 .h3T{
  font-weight: normal;
  margin-bottom: 20px;
}
.contFollowBrandDetail .cont3 .h3T .t{
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  display:inline-block;
}
.contFollowBrandDetail .cont3 .h3T .t em{
  font-size: 12px;
  font-weight: normal;
}
.contFollowBrandDetail .cont3 .h3T .tR{
  float: right;
  font-size: 12px;
}
.contFollowBrandDetail .cont3 .h3T .tR a.text{
  display:inline-block;
  line-height: 16px;
  color: #2271f4;
}
.contFollowBrandDetail .cont3 li{
  font-size: 12px;
  color: #666;
}
.contFollowBrandDetail .cont3 li .ivu-icon{
  color: #f00;
  font-size: 17px;
  display: inline-block;
  vertical-align: top;
  position: relative;
  top: -3px;
}
</style>
