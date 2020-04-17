<template lang="pug">
  .pageMain
    header-body()
    .mainBody.brandQuery(v-if="islogin")
      .queryCont
        h1 商标查询
        .form()
          <Input placeholder="" v-model="keyWords" @keydown.native.enter.prevent ="handleSearch">
            <Select v-model="searchType" slot="prepend" class="selectType">
                <Option v-for="item in searchTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button slot="append" icon="ios-search" @click="handleSearch" :loading="loadingBtn"></Button>
          </Input>
          p.p1 查询结果仅供参考，准确商标状态请进入 <a href="http://sbj.cnipa.gov.cn/sbcx/" target="_blank">中国商标网》</a>查询
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
      loadingBtn: false,
      loadingTable: false,
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
          label: '按申请人'
        },
        {
          value: '3',
          label: '按注册号'
        }
      ]
    }
  },
  beforeMount () {
  },
  mounted () {
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
  }
}
</script>

<style>
.brandQuery .queryCont{
  width: 1200px;
  height: 462px;
  margin: 100px auto 0 auto;
  text-align: center;
  background: url(../../static/img/domainQuery/img_01.png) no-repeat 0 0;
}
.brandQuery .queryCont h1{
  color: #fff;
  font-size: 30px;
  text-align: center;
  font-weight: normal;
  padding-top: 140px;
}
.brandQuery .queryCont .form{
  margin: 20px auto;
  width: 740px;
  position: relative;
}
/* .brandQuery .queryCont .ivu-input-wrapper{
  margin: 0px auto;
  padding: 20px 0;
  width: 740px;
} */
.brandQuery .queryCont .p1{
  font-size: 15px;
  color: #fff;
  padding-top: 30px;
}
.brandQuery .queryCont .p1 a{
  color: #ff9900;
}
.brandQuery .queryCont .ivu-input-wrapper input{
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  font-size: 15px;
  border: none;
}
.brandQuery .queryCont .ivu-input-wrapper input:focus{
  /* border: 2px solid #ff9900!important; */
  box-shadow:0px 0px 0px 2px #ff9900 inset;
}
.brandQuery .queryCont .ivu-input-group-prepend{
  width: 110px;
  background: #fff;
  border: none;
  border-right: 1px solid #e1e1e1;
  border-radius: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
.brandQuery .queryCont .ivu-select-selected-value{
  font-size: 16px;
}
.brandQuery .queryCont .ivu-input-group-append{
  width: 90px;
  background: #ff9900!important;
  border-radius: 0px;
  border: none;
  padding: 0px;
}
.brandQuery .queryCont .ivu-input-group-append button{
  padding:0px;
  display: block;
  height: 50px;
  line-height: 50px;
  width: 100%;
  margin: 0px;
}
.brandQuery .queryCont .ivu-input-group-append .ivu-icon{
  line-height: 30px;
}
.brandQuery .queryCont .ivu-input-group-append i:before{
  font-size: 30px;
  color: #fff;
}
.brandQuery .selectType{

}
.brandQuery .footer{
  width: 1200px;
  margin: 0 auto;
}
</style>
