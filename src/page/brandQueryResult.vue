<template lang="pug">
  .pageMain
    header-body()
    .mainBody.brandQueryResult(v-if="islogin")
      .queryCont
        .form()
          <Input placeholder="" v-model="keyWords" @keydown.native.enter.prevent ="handleSearch">
            <Select v-model="searchType" slot="prepend" class="selectType">
                <Option v-for="item in searchTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button slot="append" icon="ios-search"  @click="handleSearch" :loading="loadingBtn">立即查询</Button>
          </Input>
      .typeCont(v-show="list.length")
        RadioGroup(v-model="facetsGroup", @on-change="handleRadioChange")
          Radio(label="0", key="0") 全部
          Radio(v-for="item in facetsList", :label="item.code", :key="item.id") 第{{item.code}}类-{{item.codeName}}
            em ({{item.count}})
      .resultList
        a(:href="'/brandDetail?regNo='+item.regNo+'&intCls='+item.intCls", target="_blank", v-for="item in list", v-show="list.length")
          Row()
            Col.col1(span="4")
              span.img
                img(:src="'http://tmpic.tmkoo.com/' + item.tmImg")
            Col.col2(span="16")
              div.tit
                strong {{item.tmName}}
                span {{item.intCls}}
              table
                tr
                  td 申请人：
                    span {{item.applicantCn}}
                  td 初审公告：
                    span {{item.announcementDate}}{{item.announcementIssue ? `(${item.announcementIssue})` : ''}}
                tr
                  td 注册号：
                    span {{item.regNo}}
                  td 申请日期：
                    span {{item.appDate}}
                tr
                  td
                  td 注册公告：
                    span {{item.regDate}}{{item.regIssue ? `(${item.regIssue})` : ''}}
            Col.col3(span="4")
              div
                Tag(color="success", v-if="item.currentStatus") {{item.currentStatus}}
              //- div
              //-   Button(icon="ios-star-outline") 关注商标
        comp-list-none(label="没有符合条件的记录！",v-show="!list.length")
      <!-- 翻页区 -->
      Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size="20",v-show="list.length")
      //- footer-body()
</template>

<script>
import {mapState} from 'vuex'
import headerBody from '../modular/header'
import footerBody from '../modular/footer'
import compListNone from '@/components/compListNone'
export default {
  name: 'BRAND_QUERY_RESULT',
  components: {
    headerBody,
    footerBody,
    compListNone
  },
  data () {
    return {
      list: [],
      loadingBtn: false,
      loadingTable: false,
      facetsGroup: '',
      searchType: '4',
      keyWords: '',
      intCls: '',
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
      facetsList: [],
      page: {
        pageNo: 1,
        pagePages: 1,
        pageItems: 1
      }
    }
  },
  methods: {
    pageChange: function (curPage) {
      this.queryList(curPage)
    },
    handleSearch () {
      if (this.GLOBALS.TRIM_ALL(this.keyWords).length) {
        this.facetsGroup = '0'
        this.intCls = '0'
        this.queryList(1)
      } else {
        this.$Message.error('请输入要查询的商标！')
      }
    },
    handleRadioChange (checked) {
      this.intCls = checked
      this.queryList(1)
    },
    queryListParam (obj) {
      this.page.pageNo = obj.pageNum
      this.loadingBtn = true
      this.loadingTable = true

      let params = {
        pageNum: obj.pageNum,
        pageSize: 20,
        searchType: this.searchType,
        keyWords: this.keyWords,
        intCls: this.intCls
      }
      return params
    },
    queryList (num) {
      this.$store.dispatch('TRADEMARK_SEARCH', this.queryListParam({pageNum: num})).then(response => {
        this.loadingBtn = false
        this.loadingTable = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.list = response.data.list
          this.page.pageItems = response.data.totalNum
          this.facetsList = response.data.facets
        } else {
          // if (response.data.code === '900') {
          //   this.$Message.error('查询失败')
          // }
        }
      }).catch(() => {})
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
    this.searchType = this.$route.query.type.length ? this.$route.query.type : '4'
    this.keyWords = this.$route.query.key.length ? this.$route.query.key : ''
    this.intCls = this.$route.query.intcls.length ? this.$route.query.intcls : '0'
    this.queryList(1)
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
.brandQueryResult .queryCont .form{
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
  padding: 0px;
}
.brandQueryResult .queryCont .ivu-input-group-append button{
  padding:0px;
  display: block;
  height: 50px;
  line-height: 50px;
  width: 100%;
  margin: 0px;
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
.brandQueryResult .ivu-input-wrapper{
  border: 1px solid #135edb;
}
.brandQueryResult .typeCont{
  width: 1200px;
  background: #fff;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 18px 18px 13px 18px;
  -webkit-box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
}
.brandQueryResult .typeCont .ivu-radio-group{
  overflow: hidden;
}
.brandQueryResult .typeCont .ivu-radio-group-item{
  float: left;
  width: 162px;
  height: 26px;
  line-height: 26px;
  background: #efefef;
  margin-right: 5px;
  margin-bottom: 5px;
}
.brandQueryResult .typeCont .ivu-radio-group-item .ivu-radio{
  opacity: 0;
}
.brandQueryResult .typeCont .ivu-radio-group-item:nth-child(7n){
  margin-right: 0px;
}
.brandQueryResult .typeCont .ivu-radio-group-item em{
  color: #999;
}
.brandQueryResult .typeCont .ivu-radio-wrapper-checked{
  background: #2271f4;
  color: #fff;
}
.brandQueryResult .typeCont .ivu-radio-wrapper-checked span{
  color: #fff;
}
.brandQueryResult .resultList{
  width: 1200px;
  background: #fff;
  margin: 0 auto;
}
.brandQueryResult .resultList .ivu-row{
  padding: 30px 20px;
  border-bottom: 1px solid #f0f0f0;
}
.brandQueryResult .resultList .ivu-row:hover{
  background: #fbfbfb;
}
.brandQueryResult .resultList .img{
  width: 168px;
  height: 98px;
  line-height: 95px;
  border: 1px solid #e5e5e5;
  display: inline-block;
  text-align: center;
  background: #fff;
}
.brandQueryResult .resultList img{
  max-width: 166px;
  max-height: 96px;
  vertical-align: middle;
}
.brandQueryResult .resultList .tit{
  margin-bottom: 15px;
}
.brandQueryResult .resultList .tit strong{
  font-size: 18px;
  font-weight: normal;
  display: inline-block;
  vertical-align: middle;
}
.brandQueryResult .resultList .tit span{
  display: inline-block;
  font-size: 12px;
  color: #5e7bb3;
  background: #edf2f6;
  height: 18px;
  line-height: 18px;
  padding: 0 5px;
  margin-left: 20px;
  vertical-align: middle;
  position: relative;
}
.brandQueryResult .resultList .tit span::after{
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  border-top: 9px solid transparent;
  border-bottom: 9px solid transparent;
  border-right: 10px solid #edf2f6;
  top: 0;
  right: 100%;
}
.brandQueryResult .resultList td{
  width: 50%;
  padding: 5px 0;
  font-size: 12px;
  color: #666666;
}
.brandQueryResult .resultList td span{
  color: #333;
}
.brandQueryResult .resultList .col3{
  text-align: right;
}
.brandQueryResult .resultList .ivu-tag{
  height: 26px;
  line-height: 26px;
  padding: 0 20px;
  margin: 0px 0 20px 0;
}
.brandQueryResult .resultList .ivu-tag span{
  color: #fff;
}
.brandQueryResult .resultList .ivu-btn{
  border: none;
  padding: 0px;
  background: none;
}
.brandQueryResult .resultList .ivu-btn span{
  color: #333;
  margin: 0px;
}
.brandQueryResult .resultList .ivu-icon::before{
  font-size: 16px;
}
.brandQueryResult .ivu-page{
  text-align: center;
}
.brandQueryResult .footer{
  width: 1200px;
  margin: 0 auto;
}
</style>
