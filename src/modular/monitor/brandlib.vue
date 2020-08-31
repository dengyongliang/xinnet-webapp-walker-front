<template lang="pug">
.contBrandLib
  <!-- 标题区 -->
  h1.pageTitle.clear
    <span>品牌库</span>
    .tR
      //- Button(type="default", class="btnTop" @click="",:loading="loadingBtn") 品牌设置
  .secMain()
    .secFilter()
      form.filterWrap(ref="exportForm")
        table
          tr.row1
            td.td1
              span.n 搜索商标：
              .inputWrap
                <Input v-model="brandName" ref="brandName" placeholder="品牌名称" />
            td.td2
              span.n 品牌级别：
              .inputWrap
                Select(v-model="brandLevel")
                  Option(v-for="item in brandLevelList", :value="item.value", :key="item.value") {{ item.label }}
            td.td3
              span.n 排序：
              .inputWrap
                Select(v-model="orderByType")
                  Option(v-for="item in orderByTypeList", :value="item.value", :key="item.value") {{ item.label }}
            td.tdBtn
              Button(type="primary", @click="searchListData",:loading="loadingBtn") 搜索
              Button(type="default", @click="handleBrandSet('')") + 添加品牌

    div.list
      ul
        li(v-for="item in list")
          h3.clear()
            span.left() {{item.brandLevelText}}
            span.right
              a(:href="'/monitor/followBrandDetail/id/'+item.id" target="blank") 详情
              a(@click="handleBrandSet(item.id)") 设置
              a(@click="toBrandDel(item.id)") 删除
          Row
          Col.col1(span="6")
            span.logo
              img(:src='item.brandLogo')
          Col.col2(span="7")
            strong.clear
              span(v-if="!item.brandKeyword.length") {{item.brandName}}
              Poptip(trigger="hover", content="content", placement="bottom" v-if="item.brandKeyword.length") {{item.brandName}}
                <Icon type="ios-menu" style="color:#666;font-size: 15px;font-weight:200" />
                div(slot="content")
                  p(v-for="item2 in item.brandKeyword.split(';')", style="font-weight:normal") {{item2}}
            .col2Cont
              .row1.clear
                span.left 品牌安全分：<em>{{item.brandSafeMark}}</em>个
              .row2.clear
                span.left 管理公司：{{item.companyName}}
              .row3.clear
                span.left 商标数量：{{item.tradeMarkCount}}
              .row4.clear
                span.left 域名数量：{{item.domainCount}}
              .row5.clear
                span.left 品牌级别：{{item.brandLevelText}}
          Col.col3(span="11")
            .col3Cont
              .row1.clear
                span.left 域名监控：
                span.right
                  span.item <Icon type="ios-alert" />{{item.ddExpireCount}}个域名即将过期
              .row1.clear
                span.left 商标监控：
                span.right
                  span.item <Icon type="ios-alert" />续展/宽展期商标{{item.ttExtensionCount}}个
                  span.item <Icon type="ios-alert" />初审公告期商标{{item.ttAnnouncementCount}}个
    <!-- 翻页区 -->
    Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size='20')
    <!-- 创建企业 抽屉 -->
    Drawer(:closable="true", width="640", v-model="drawerFollowDomainBrandCreate", title="添加品牌", :mask-closable="maskClosable", @on-visible-change="drawerChange")
      comp-follow-domain-brand-create(
        v-if="drawerFollowDomainBrandCreate",
        :brandLevelList="brandLevelList",
        :on-close="closeDrawer",
        :orgFile = "orgFile",
        :id = "id"
      )
</template>
<script>
import compFollowDomainBrandCreate from '@/components/compFollowDomainBrandCreate'
import compSelect from '@/components/compSelect'
import compCheckbox from '@/components/compCheckbox'
import moment from 'moment'
import * as actions from '@/actions/followdomain.js'
import { mapState } from 'vuex'
export default {
  components: {
    compFollowDomainBrandCreate,
    compSelect,
    compCheckbox
  },
  data () {
    return {
      id: '',
      drawerFollowDomainBrandCreate: false,
      brandName: '',
      orderByType: 'domain_count,asc',
      brandLevel: '',
      list: [],
      orderByTypeList: [
        {
          value: 'domain_count,asc',
          label: '按域名数量由高到低排序'
        },
        {
          value: 'domain_count,desc',
          label: '按域名数量由低到高排序'
        },
        {
          value: 'trademark_count,asc',
          label: '按商标数量由高到低排序'
        },
        {
          value: 'trademark_count,desc',
          label: '按商标数量由低到高排序'
        }
      ],
      brandLevelList: (function (vm) {
        let array = [{
          label: '全部',
          value: ''
        }]
        for (var i in vm.DATAS.BRAND_LEVEL) {
          array.push({
            label: vm.DATAS.BRAND_LEVEL[i],
            value: i + ''
          })
        }
        return array
      })(this),
      orgFile: '',
      loadingTable: true,
      loadingBtn: false,
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    searchListData () {
      this.queryList({pageNum: 1})
    },
    pageChange: function (curPage) {
      this.queryList({pageNum: curPage})
    },
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        brandName: this.brandName,
        brandLevel: this.brandLevel,
        order: this.orderByType.split(',')[0],
        orderType: this.orderByType.split(',')[1]
      }
      console.log(params)
      return params
    },
    queryList (obj) {
      this.list = []
      this.$store.dispatch('SEARCH_FOLLOW_BRAND_LIST', this.queryListParam(obj)).then(response => {
        this.loadingBtn = false
        this.loadingTable = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.list = response.data.data.list.map((v) => {
            v.brandLevelText = this.DATAS.BRAND_LEVEL[v.brandLevel]
            return v
          })
          this.page.pageItems = response.data.totalNum
        } else {
        }
      }).catch(() => {})
    },
    toBrandDel (id) {
      this.$Modal.confirm({
        title: '确认',
        content: '<p>删除品牌同时删除品牌下所有关注域名，请确认是否删除？</p>',
        loading: true,
        onOk: () => {
          this.$store.dispatch('DELETE_BRAND', {id: id}).then(response => {
            if (!response) {
              return false
            }
            if (response.data.code === '1000') {
              this.$Message.success('删除成功')
              this.queryList({pageNum: 1})
            } else {
              if (response.data.code === '100') {
                this.$Message.error('品牌信息错误')
              } else {
                this.$Message.error('删除失败')
              }
            }
            this.$Modal.remove()
          }).catch(() => {})
        },
        onCancel: () => {
        }
      })
    },
    drawerChange () {
      if (!this.drawerFollowDomainBrandCreate) {
        this.searchListData()
      }
    },
    closeDrawer () {
      this.drawerFollowDomainBrandCreate = false
    },
    handleBrandSet (id) {
      this.id = id + ''
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
      // // 域名列表
      this.queryList({pageNum: 1})
      // // 监控通知
      // this.getBrandList()
      // let id = this.$route.params.id
      // if (id) {
      //   this.showDetailFun(id)
      // }
    })
  }
  // ,
  // watch: {
  //   brandList: {
  //     handler (val, oldVal) {
  //       this.brandList(val)
  //     },
  //     deep: true
  //   }
  // }
}
</script>
<style scoped>
.contBrandLib .secMain {
    background: none;
}
.contBrandLib .filterWrap {
  padding: 10px 0px;
}
.contBrandLib .filterWrap .ivu-btn{
  margin-left: 10px;
}
.contBrandLib .secFilter .compSelect{
  width: 100%;
}
.contBrandLib .list li{
  padding: 18px 0 0 0;
  height:325px;
  margin-bottom:20px;
  background:#fff;
}
.contBrandLib .list h3{
  font-size:16px;
  font-weight:200;
  padding-left:17px;
  padding-right:20px;
  border-left:3px solid #2271f4;
  margin-bottom:38px;
}
.contBrandLib .list h3 .right{
  float:right;
}
.contBrandLib .list h3 a{
  font-size:12px;
  font-weight:normal;
  color:#2372f3;
  display:inline-block;
  margin-left:10px;
}
.contBrandLib .list .logo{
  width:80px;
  height:80px;
  border-radius:100%;
  overflow:hidden;
  display:inline-block;
  border:5px solid #fff;
  vertical-align:middle;
  -moz-box-shadow:0px 0px 6px rgba(0,0,0,0.2);
  -webkit-box-shadow:0px 0px 6px rgba(0,0,0,0.2);
  box-shadow:0px 0px 6px rgba(0,0,0,0.2);
}
.contBrandLib .list .logo img{
  width: 100%;
  height: 100%;
  vertical-align: top;
}
.contBrandLib .list .col1{
  text-align:center;
  height:178px;
  line-height:178px;
  vertical-align:middle;
}
.contBrandLib .list .row1{
  font-size:16px;
  padding-bottom:25px;
  margin-bottom:0px!important;
}
.contBrandLib .list .row1 span{
  font-size:16px!important;
}
.contBrandLib .list .row1 a{
  font-size:12px;
  float:right;
  text-decoration:underline;
  margin-top:10px;
}

.contBrandLib .list .row1 em{
  font-size:24px;
  font-weight:600;
}
.contBrandLib .list .col2 strong{
  display:block;
  margin-bottom:25px;
}
.contBrandLib .list .col2 strong{
  font-size:16px;
}
.contBrandLib .list .col2Cont {
  border-right:1px solid #ededed;
  padding-right:50px;
}
.contBrandLib .list .col2Cont > div,
.contBrandLib .list .col3Cont > div{
  margin-bottom:10px;
}
.contBrandLib .list .col2Cont > div span,
.contBrandLib .list .col3Cont > div span{
  color:#666;
  font-size:12px;
}
.contBrandLib .list .col3Cont{
  padding:49px 50px 0 50px;
}
.contBrandLib .list .col3Cont .row1 .left,
.contBrandLib .list .col3Cont .row1 .item{
  font-size: 12px!important;
  float: left;
  line-height: 18px;
}
.contBrandLib .list .col3Cont .right{
  display: block;
  overflow: hidden;
}
.contBrandLib .list .col3Cont .row1 .item{
  width: 50%;
  margin-bottom: 10px;
}
.contBrandLib .list .col3Cont .row1 .ivu-icon{
  color: #f00;
  font-size: 17px;
  display: inline-block;
  vertical-align: top;
  position: relative;
}

</style>
