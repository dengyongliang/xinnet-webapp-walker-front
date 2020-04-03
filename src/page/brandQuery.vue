<template lang="pug">
  .pageMain
    header-body()
    .mainBody.brandQuery(v-if="islogin")
      .queryCont
        h1 域名注册
        form()
          <Input placeholder="请输入域名">
            <Select v-model="type" slot="prepend" class="selectType">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button slot="append" icon="ios-search"></Button>
          </Input>
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
      ]
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
.brandQuery .queryCont form{
  margin: 20px auto;
  width: 740px;
  position: relative;
}
/* .brandQuery .queryCont .ivu-input-wrapper{
  margin: 0px auto;
  padding: 20px 0;
  width: 740px;
} */
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
}
.brandQuery .queryCont .ivu-input-group-append button{
  padding:0px;
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
