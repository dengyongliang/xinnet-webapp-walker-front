<template lang="pug">
div.list
  ul.listStyle1
    li(v-for="item in list")
      h3.clear()
        span.left(v-text='item.type?"下属公司":"主体公司"')
        span.right
          a(@click="showCompanyDetail(item.id)") 修改
          a(@click="delCompany(item.id)", v-show="item.type>0") 删除企业
      Row
        Col.col1(span="6")
          span.logo
            img(:src='item.logoFile')
        Col.col2(span="8")
          strong.clear  {{item.name}}
          .col2Cont
            .row1.clear
              span.left 员工数量：<em>{{item.userCount}}</em>个
              router-link.right(to="/mgmt/accountMgmt") 员工详情
            .row2.clear
              span.left 联系人：{{item.contactor}}
            .row3.clear
              span.left 手机：{{item.mobile}}
            .row4.clear
              span.left 固话：{{item.tel}}
            .row5.clear
              span.left 邮箱：{{item.email}}
        Col.col3(span="10")
          .col3Cont
            .row1.clear
              span.left 域名总数：{{item.domainCount}} 个
              router-link.right(to="/domain/mgmt") 域名详情
            .row2.clear(v-if="!item.groups.length")
              span.left 暂无分组
            .row2.clear(v-else, v-for="group in item.groups")
              span.left <i></i>{{group.name}}：
              span.right {{group.domainCount}}个

            .row6.clear(v-if="item.groups.length>4")
              span.left <i></i>...
              a.right(@click="showCompanyDetail(item.id, 'name2')") 全部分组

  <!-- 修改企业 抽屉 -->
  Drawer(:closable="true", width="640", v-model="drawerCompanyDetail", title="企业详情", :mask-closable="maskClosable", @on-visible-change="drawerChange")
    comp-company-detail(
      v-if="refresh",
      :on-close="closeDrawer",
      :detailData = "companyDetailData",
      @resetDetailData = "resetDetailData"
    )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from '@/components/compInput'
import compCompanyDetail from '@/components/compCompanyDetail'
export default {
  components: {
    compCompanyDetail
  },
  name: 'compListStyle1',
  props: {
    list: {
      type: Array,
      default: function () {
        return {
          data: []
        }
      }
    },
    onShowcompanydetail: {
      type: Function
    }
  },
  data () {
    return {
      refresh: false,
      drawerCompanyDetail: false,
      companyDetailData: {}
    }
  },
  methods: {
    closeDrawer () {
      this.drawerCompanyDetail = false
    },
    drawerChange () {
      if (this.drawerCompanyDetail) {
        this.refresh = true
      } else {
        this.refresh = false
        this.$emit('refreshData')
      }
    },
    resetDetailData (obj) {
      Object.assign(this.companyDetailData, obj)
      console.log(this.companyDetailData)
    },
    showCompanyDetail (id, tabIdx) {
      let params = {
        param:{
          companyId: id
        },
        callback: (response) => {
          this.loadingBtn = false
          if (response.data.code === '1000'){
            this.companyDetailData = response.data.data
            if (typeof tabIdx !== 'undefined') {
              this.companyDetailData.tabIdx = tabIdx
            } else {
              this.companyDetailData.tabIdx = "name1"
            }
            this.drawerCompanyDetail = true
          } else {
            this.$Message.error('企业信息获取失败')
          }
        }
      }
      this.queryCompanyInfo(params)
    },
    delCompany (id) {
      this.$Modal.confirm({
        title: '确认',
        content: '<p>请确认是否删除该企业？</p>',
        loading: true,
        onOk: () => {
          let params = {
            param: {
              companyId: id
            },
            callback: (response) => {
              this.$Modal.remove()
              if (response.data.code === '1000'){
                this.$Message.success('企业删除成功')
                this.$emit('refreshData')
              } else {
                if (response.data.code === '100') {
                  this.$Message.error('企业不存在！')
                } else if (response.data.code === '200') {
                  this.$Message.error('主体公司不允许删除！')
                } else if (response.data.code === '300') {
                  this.$Message.error('企业下有域名，不允许删除！')
                } else if (response.data.code === '400') {
                  this.$Message.error('企业下有员工，不允许删除！')
                } else {
                  this.$Message.error('企业删除失败！')
                }
              }
            }
          }
          this.deleteCompany(params)
        },
        onCancel: () => {
        }
      })
    },
    ...mapActions({
      deleteCompany: types.DELETE_COMPANY,
      queryCompanyInfo: types.QUERY_COMPANY_INFO
    })
  },
  beforeMount () {
  },
  mounted () {
  },
  computed: {
    ...mapState({
      myUserInfo (state) {
        return state.user.myUserInfo
      },
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  watch: {
    list: function (val, oldVal) {
    }
  }
}
</script>
<style scoped>
.listStyle1 li{
  padding: 18px 0 0 0;
  height:325px;
  margin-bottom:20px;
  background:#fff;
}
.listStyle1 h3{
  font-size:16px;
  font-weight:200;
  padding-left:17px;
  padding-right:20px;
  border-left:3px solid #2271f4;
  margin-bottom:38px;
}
.listStyle1 h3 .right{
  float:right;
}
.listStyle1 h3 a{
  font-size:12px;
  font-weight:200;
  color:#2372f3;
  display:inline-block;
  margin-left:10px;
}
.listStyle1 .logo{
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
.listStyle1 .logo img{
  width: 100%;
  height: 100%;
  vertical-align: top;
}
.listStyle1 .col1{
  text-align:center;
  height:178px;
  line-height:178px;
  vertical-align:middle;
}
.listStyle1 .row1{
  font-size:16px;
  padding-bottom:25px;
  margin-bottom:0px!important;
}
.listStyle1 .row1 span{
  font-size:16px!important;
}
.listStyle1 .row1 a{
  font-size:12px;
  float:right;
  text-decoration:underline;
  margin-top:10px;
}

.listStyle1 .row1 em{
  font-size:24px;
  font-weight:600;
}
.listStyle1 .col2 strong{
  display:block;
  margin-bottom:25px;
}
.listStyle1 .col2 strong{
  font-size:16px;
}
.listStyle1 .col2Cont {
  border-right:1px solid #ededed;
  padding-right:50px;
}
.listStyle1 .col2Cont > div,
.listStyle1 .col3Cont > div{
  margin-bottom:10px;
}
.listStyle1 .col2Cont > div span,
.listStyle1 .col3Cont > div span{
  color:#666;
  font-size:12px;
}
.listStyle1 .col3Cont {
  padding:49px 50px 0 50px;
}
.listStyle1 .col3Cont .row1 a{
  margin-top:3px;
}
.listStyle1 .col3Cont .right{
  float:right;
  font-size:12px;
}
.listStyle1 .col3Cont a.right{
  text-decoration:underline;
}
.listStyle1 .col3Cont span i{
  display:inline-block;
  width:8px;
  height:8px;
  border-radius:100%;
  margin-right:10px;
}
.listStyle1 .col3Cont .row2 i{
  background:#2295f2;
}
.listStyle1 .col3Cont .row3 i{
  background:#ff8341;
}
.listStyle1 .col3Cont .row4 i{
  background:#62d3fd;
}
.listStyle1 .col3Cont .row5 i{
  background:#febf60;
}
.listStyle1 .col3Cont .row6 i{
  background:#fff;
}
</style>
