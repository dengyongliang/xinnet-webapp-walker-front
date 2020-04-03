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
      .typeCont
        CheckboxGroup(v-model="disabledGroup")
          Checkbox(label="香蕉")
          Checkbox(label="苹果")
          Checkbox(label="西瓜")
          Checkbox(label="香蕉")
          Checkbox(label="苹果")
          Checkbox(label="西瓜")
          Checkbox(label="香蕉")
          Checkbox(label="苹果")
          Checkbox(label="西瓜")
          Checkbox(label="香蕉")
          Checkbox(label="苹果")
          Checkbox(label="西瓜")
          Checkbox(label="香蕉")
          Checkbox(label="苹果")
          Checkbox(label="西瓜")
          Checkbox(label="香蕉")
          Checkbox(label="苹果")
          Checkbox(label="西瓜")
      .resultList
        Row
          Col.col1(span="4")
            span.img
          Col.col2(span="16")
            div.tit
              strong 天意
              span 按时会计法拉萨大姐夫时空裂缝
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
              Tag(type="success") 申请中
            div
              Button(icon="ios-star-outline") 关注商标
      <!-- 翻页区 -->
      Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size="20")
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
.brandQueryResult .typeCont .ivu-checkbox-group{
  overflow: hidden;
}
.brandQueryResult .typeCont .ivu-checkbox-group-item{
  float: left;
  width: 162px;
  height: 26px;
  line-height: 26px;
  background: #efefef;
  margin-right: 5px;
  margin-bottom: 5px;
}
.brandQueryResult .typeCont .ivu-checkbox-group-item .ivu-checkbox{
  opacity: 0;
}
.brandQueryResult .typeCont .ivu-checkbox-group-item:nth-child(7n){
  margin-right: 0px;
}
.brandQueryResult .typeCont .ivu-checkbox-wrapper-checked{
  background: #2271f4;
}
.brandQueryResult .typeCont .ivu-checkbox-wrapper-checked span{
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
  border: 1px solid #e5e5e5;
  display: inline-block;
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
