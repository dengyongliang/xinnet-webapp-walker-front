<template lang="pug">
  .pageMain
    header-body()
    .mainBody.domainQueryResult(v-if="islogin")
      .queryCont
        .t 域名查询
        <Input search enter-button placeholder="请输入域名" />
        ul.result
          li
            Row
              Col.colL(span="12") 域名 <b>ASDFKSJ.com</b> 的信息
              Col.colR(span="12")
                a 查看更多后缀
          li
            Row
              Col.colL(span="12") <b>ASDFKSJ.com</b> <em style="color: #31aa00;">(未注册)</em>
              Col.colR(span="12")
                Button 立即注册
                a.attention <Icon type="ios-star-outline" /> 设为关注
          li
            Row
              Col.colL(span="12") <b>ASDFKSJ.com</b> <em style="color: #999">(暂不支持此域名后缀查询)</em>
              Col.colR(span="12")
                a <Icon type="md-person" /> 请管家查询
        .tabs
          a(href="javascript:;") 热销后缀
          span |
          a(href="javascript:;") 中文后缀
          span |
          a(href="javascript:;") 行政区域后缀
        .suffix
          CheckboxGroup
            Checkbox.ivu-icon.ivu-icon-ios-checkmark(label="北京")
            Checkbox.ivu-icon.ivu-icon-ios-checkmark(label="北京1")
            Checkbox.ivu-icon.ivu-icon-ios-checkmark(label="北京2")
            Checkbox.ivu-icon.ivu-icon-ios-checkmark(label="北京3")
            Checkbox.ivu-icon.ivu-icon-ios-checkmark(label="北京4")
            Checkbox.ivu-icon.ivu-icon-ios-checkmark(label="北京5")
            Checkbox.ivu-icon.ivu-icon-ios-checkmark(label="北京6")
            Checkbox.ivu-icon.ivu-icon-ios-checkmark(label="北京7")
            Checkbox.ivu-icon.ivu-icon-ios-checkmark(label="北京8")
            Checkbox.ivu-icon.ivu-icon-ios-checkmark(label="北京9")
        .t 未注册域名
          //- Row
          //-   Col.selected.ivu-icon.ivu-icon-ios-checkmark(span="4") .com
          //-   Col(span="4") .com
          //-   Col(span="4") .com
          //-   Col(span="4") .com
          //-   Col(span="4") .com
          //-   Col(span="4") .com
          //-   Col(span="4") .com
          //-   Col(span="4") .com
          //-   Col(span="4") .com
          //-   Col(span="4") .com
      footer-body()
</template>

<script>
import {mapState} from 'vuex'
import headerBody from '../modular/header'
import footerBody from '../modular/footer'
export default {
  name: 'DOMAIN_QUERY_RESULT',
  components: {
    headerBody,
    footerBody
  },
  data () {
    return {
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  methods: {
  },
  computed: {
    ...mapState([
      'islogin'
    ])
  }
}
</script>

<style>
.domainQueryResult{
  width: 1200px;
  margin: 100px auto 0 auto;
}
.domainQueryResult .t{
  font-size: 20px;
  margin-bottom: 30px;
}
.domainQueryResult .queryCont{
  padding: 30px;
  background: #fff;
}
.domainQueryResult .result li{
  border-bottom: 1px solid #f0f0f0;
  height: 59px;
  line-height: 59px;
}
.domainQueryResult .result b{
  color: #000;
}
.domainQueryResult .result li:nth-child(1) b{
  color: #fd0200;
}
.domainQueryResult .result .colR{
  text-align: right;
}
.domainQueryResult .result .colR .ivu-btn{
  border-color: #135ede;
  margin-right: 60px;
}
.domainQueryResult .result .colR .ivu-btn span{
  color: #135ede;
}
.domainQueryResult .result .colR .ivu-icon{
  font-size: 17px;
  margin-top: -3px;
}
.domainQueryResult .queryCont .ivu-input-wrapper{
  margin: 0px;
  border-bottom: 2px solid #e5e5e5;
}
.domainQueryResult .queryCont .ivu-input-wrapper input{
  height: 83px;
  line-height: 83px;
  padding: 0 20px;
  font-size: 15px;
  background: #f4f5f7;
  border: none;
}
.domainQueryResult .queryCont .ivu-input-wrapper input:focus{
  /* border: 2px solid #ff9900!important; */
  border-color: none!important;
  outline: none!important;
  box-shadow:0px 0px 0px 2px #ff9900 inset!important;
}
.domainQueryResult .queryCont .ivu-input-search{
  width: 60px;
  height: 60px;
  line-height: 60px;
  background: #135edb!important;
  border-radius: 0px;
  border: 1px solid #135edb!important;
  padding: 0px!important;
  position: absolute;
  right: 10px;
  top: 10px;
  box-shadow:-2px 3px 5px rgba(19, 94, 219, 0.3);
}
.domainQueryResult .queryCont .ivu-input-search i:before{
  font-size: 30px;
  color: #fff;
}
.domainQueryResult .tabs {
  padding: 30px 0;
}
.domainQueryResult .tabs a{
  display: inline-block;
  color: #9a9a9a;
}
.domainQueryResult .tabs span{
  display: inline-block;
  color: #e3e3e3;
  padding: 0 10px;
}
.domainQueryResult .suffix .ivu-checkbox-group{
  display: block;
}
.domainQueryResult .suffix .ivu-checkbox-group .ivu-checkbox-wrapper{
  display: inline-block;
  width: 13.15%;
  height: 32px;
  line-height: 30px;
  padding: 0 15px;
  font-size: 12px;
  color: #515a6e;
  -webkit-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
  cursor: pointer;
  border: 1px solid #dcdee2;
  background: #fff;
  position: relative;
  text-align: center;
  margin: 0 15px 15px 0;
  vertical-align: top!important;
}
.domainQueryResult .suffix .ivu-checkbox-group .ivu-checkbox-wrapper:before{
  display: none;
}
.domainQueryResult .suffix .ivu-checkbox-group .ivu-checkbox-wrapper:nth-child(7){
  margin-right: 0px;
}
.domainQueryResult .suffix .ivu-checkbox-group .ivu-checkbox-wrapper>span {
  margin-left: 0;
}
.domainQueryResult .suffix .ivu-checkbox-group .ivu-checkbox {
  width: 0;
  margin-right: 0;
}
.domainQueryResult .suffix .ivu-checkbox-group .ivu-checkbox-inner{
  display: none;
}
.domainQueryResult .suffix .ivu-checkbox-group .ivu-checkbox-wrapper-checked {
  background: #fff;
  border-color: #135ede;
  color: #135ede;
}
.domainQueryResult .suffix .ivu-checkbox-group .ivu-checkbox-wrapper-checked:before{
  display: block;
  content: "";
  position: absolute;
  bottom: 0px;
  right: 0px;
  border-width: 0 0 15px 15px;
  border-style: solid;
  border-color: transparent transparent #135ede;
}
.domainQueryResult .suffix .ivu-checkbox-group .ivu-checkbox-wrapper-checked:after{
  content: "\F171";
  position: absolute;
  bottom: -2px;
  right: -2px;
  color: #fff;
  font-size: 15px;
  line-height: 12px;
  display: block;
  text-align: right;
}
.domainQueryResult .footer{
  background: #f7f8fa!important;
}
</style>
