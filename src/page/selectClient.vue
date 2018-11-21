<template lang="pug">
.pageSelectClient
  header-body
  .mainBody
    ul.list.clear(v-show="list.length")
      li(v-for="item in list")
        a(href="")
          Row(type="flex", align="middle")
            Col(span="24")
              span.logo
                img(:src="item.orgFile")
              strong {{item.name}}
    comp-list-none(label="暂无管理客户",v-show="!list.length")
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import * as types from '@/store/types'
import compListNone from '@/components/compListNone'
import headerBody from '../modular/header'
export default {
  components: {
    compListNone,
    headerBody
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    ...mapActions({
      queryUserCustomersList: types.QUERY_USER_CUSTOMERS_LIST
    })
  },
  computed: {
  },
  beforeMount () {
    this.queryUserCustomersList((response) => {
      console.log(response)
      this.list = response.data.data
    })
  },
  mounted(){
  }
}
</script>

<style scoped>
.mainBody{
  width:1200px;
  margin:0 auto;
  padding-top:100px;
}
.list li{
  float:left;
  width:380px;
  height:160px;
  margin:0 30px 30px 0;
}
.list li:nth-child(2n+3){
  margin-right:0;
}
.list li a{
  height:100%;
  display:block;
  border:1px solid #e0e0e0;
  border-radius: 10px;
  background:#fff;
}
.list li a:hover{
  border-color:#35a7ff;
  -moz-box-shadow:0px 0px 10px rgba(0,0,0,0.3);
  -webkit-box-shadow:0px 0px 10px rgba(0,0,0,0.3);
  box-shadow:0px 0px 10px rgba(0,0,0,0.3)
}
.list li .ivu-row-flex{
  height:100%;
}
.list .logo{
  width:80px;
  height:80px;
  border-radius:100%;
  overflow:hidden;
  display:inline-block;
  border:5px solid #fff;
  vertical-align:middle;
  margin-left:30px;
  margin-right:20px;
  -moz-box-shadow:0px 0px 6px rgba(0,0,0,0.2);
  -webkit-box-shadow:0px 0px 6px rgba(0,0,0,0.2);
  box-shadow:0px 0px 6px rgba(0,0,0,0.2);
}
.list li strong{
  width:220px;
  font-size:16px;
  display:inline-block;
  vertical-align:middle;
  line-height:24px;
}
</style>
