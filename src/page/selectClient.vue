<template lang="pug">
.pageSelectClient
  header-body
  .mainBody
    h1 请选择客户
    ul.list.clear(v-show="list.length")
      li(v-for="item in list")
        a(href="javascript:;",@click="changeCustomersEv(item.id)")
          Row(type="flex", align="middle")
            Col(span="24")
              strong {{item.name}}
    comp-list-none(label="暂无管理客户",v-show="!list.length")
</template>

<script>
import {mapActions} from 'vuex'
import * as types from '@/store/types'
import compListNone from '@/components/compListNone'
import headerBody from '../modular/headerNoLogin'
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
    changeCustomersEv (id) {
      let params = {
        param: {
          customerId: id
        },
        vm: this
      }
      this.changeCustomers(params)
    },
    ...mapActions({
      queryUserCustomersList: types.QUERY_USER_CUSTOMERS_LIST,
      changeCustomers: types.CHANGE_CUSTOMERS
    })
  },
  computed: {
  },
  beforeMount () {
    this.queryUserCustomersList((response) => {
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.list = response.data.data
      }
    })
  },
  mounted () {
  }
}
</script>

<style scoped>
.mainBody{
  width:1200px;
  margin:0 auto;
  padding-top:100px;
}
.mainBody h1{
  text-align: center;
  font-size: 30px;
  font-weight: normal;
  padding-bottom: 40px;
}
.list li{
  float:left;
  width:380px;
  height:120px;
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
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffffff+1,fbfdff+100 */
  background: rgb(255,255,255); /* Old browsers */
  background: -moz-linear-gradient(top,  rgba(255,255,255,1) 1%, rgba(251,253,255,1) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top,  rgba(255,255,255,1) 1%,rgba(251,253,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom,  rgba(255,255,255,1) 1%,rgba(251,253,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  -moz-box-shadow:0px 0px 10px rgba(0,0,0,0.2);
  -webkit-box-shadow:0px 0px 10px rgba(0,0,0,0.2);
  box-shadow:0px 0px 10px rgba(0,0,0,0.2)
}
.list li a:hover{
  background:#fff url(../../static/img/img_client_hover.png) no-repeat 100% 0;
}
.list li a:hover strong{
  color:#35a7ff;
}
.list li .ivu-row-flex{
  height:100%;
}
.list li strong{
  font-size:16px;
  display:block;
  line-height:24px;
  padding: 0 40px;
}
</style>
