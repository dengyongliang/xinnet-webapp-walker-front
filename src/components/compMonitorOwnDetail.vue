<template lang="pug">
.compMonitorOwnDetail
  .domainName
    h2 xxxxx.com
      Icon(type="md-star", style="color:#f00")
      .time 更新时间：2019-22-22 66:22

  .secBox.secBox1
    h3.h3T.clear
      span.t 域名信息
    .c
      table
        tr
          td.td1 注册商信息
          td.td2 注册商：新网
          td.td3
          td.td4
        tr
          td.td1 域名所有人信息
          td.td2 域名所有人：北京网讯科技有限公司
          td.td3 注册邮箱：app@xinnet.com
          td.td4
        tr
          td.td1 时间信息
          td.td2 注册时间：2002-08-23
          td.td3 到期时间：2022-08-23
          td.td4 更新日期：2018-09-12
        tr
          td.td1 域名状态
          td.td2 域名状态：OK（正常状态）
            Tooltip(placement="top-start")
              span(slot="content", style="color:#fff") 解析监控列表仅记录3个月内解析修改情况，<br />详细域名解析监控日志，<br />请查看下方全部域名监控日志。
              Icon(custom="i-icon i-icon-tips", size="16")
          td.td3
          td.td4
        tr
          td.td1 DNS服务器
          td.td2(colspan="3")
            span.dns NS19.XINCACHE.COM
            span.dns NS19.XINCACHE.COM
            span.dns NS19.XINCACHE.COM

  .secBox.secBox2
    h3.h3T.clear
      span.t 解析监控

  .secBox.secBox3
    h3.h3T.clear
      span.t 监控日志
    .secFilter
      form.filterWrap
        table
          tr.row1
            td.td1
              span.n 日志记录时间：
              .inputWrap
                DatePicker(type="daterange",placeholder="全部",v-model="time",format="yyyy-MM-dd",@on-change="time=$event",style="width:100%")
              span.n 事件类型：
              .inputWrap
                Select(v-model="type")
                  Option(v-for="item in typeList",:value="item.value",:key="item.value") {{ item.label }}
              Button(type="primary", @click="",:loading="loadingBtn") 查询
            td.tdBtn
              a 导出日志
    .secTable.secTable2
      <Table :columns="columns" :data="list" :loading="loadingTable"></Table>
    <!-- 翻页区 -->
    Page(:total="page.pageItems",:current="page.pageNo",show-elevator,show-total,prev-text="上一页",next-text="下一页",@on-change="pageChange",:page-size=20)
</template>

<script>
export default {
  name: 'compMonitorOwnDetail',
  components: {
  },
  props: {
    detailData: {
      type: Object,
      default: function () {
        return {
          data: []
        }
      }
    }
  },
  data () {
    return {
      type: '',
      time: [],
      loadingTable: false,
      loadingBtn: false,
      columns: [
        {
          title: '时间',
          width: 200,
          key: 'sendTime',
          className: 'col1',
          render: (h, params) => {
            return h('div', [
              h('i', {
                class: this.list[params.index].readFlag === 1 ? 'unRead' : ''
              }, '●' ),
              h('span', {
              }, this.list[params.index].sendTime )
            ])
          }
        },
        {
          title: '通知内容',
          key: 'title',
          className: 'col2',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'md-alert',
                  size: "17"
                },
                style: {
                  color: '#f00',
                  margin: '0 5px 0 0',
                  display: this.list[params.index].sendType === 2 ? "inline-block" : "none"
                }
              }, this.list[params.index].title ),
              h('a', {
                style: {
                  color: '#2271f4'
                }
              }, this.list[params.index].title )
            ])
          }
        }
      ],
      list: [],
      typeList: [
        {
            value: '',
            label: '全部'
        },
        {
            value: 1,
            label: '普通'
        },
        {
            value: 2,
            label: '重要'
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
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  computed: {
  }
}
</script>
<style>
.compMonitorOwnDetail{
  padding: 0 20px;
}
.compMonitorOwnDetail .domainName{
  background:#fff;
  padding: 20px;
  border-radius: 20px;
  margin-bottom:20px;
}
.compMonitorOwnDetail .domainName h2{
  font-size: 40px;
}
.compMonitorOwnDetail .domainName strong{
  display:block;
  padding: 15px 0;
}
.compMonitorOwnDetail .domainName .ivu-icon{
  font-size: 24px;
}
.compMonitorOwnDetail .domainName .time{
  font-size: 12px;
  color: #676767;
  float: right;
  font-weight: normal;
  padding: 18px 0 0 0;
}
.compMonitorOwnDetail .secBox{
  background: #fff;
  padding: 13px 0;
}
.compMonitorOwnDetail .secBox .h3T{
  font-weight: normal;
}
.compMonitorOwnDetail .secBox .h3T .t{
  font-size: 14px;
  line-height: 16px;
  display:inline-block;
  padding-left: 17px;
  border-left: 3px solid #2471f5;
  margin: 8px 0;
}
.compMonitorOwnDetail .secBox .h3T .tR{
  float: right;
  font-size: 12px;
  padding-right: 20px;
}
.compMonitorOwnDetail .secBox .h3T .tR a.text{
  display:inline-block;
  line-height: 16px;
  margin: 8px 0;
  color: #2271f4;
}
.compMonitorOwnDetail .secBox1{
  margin-bottom: 20px;
}
.compMonitorOwnDetail .secBox1 .c{
  padding: 20px;
}
.compMonitorOwnDetail .secBox1 td{
  border-bottom: 1px dashed #ededed;
  padding: 14px 0;
  color: #666;
  font-size: 12px;
}
.compMonitorOwnDetail .secBox1 td .dns{
  display: inline-block;
  margin-right: 20px;
}
.compMonitorOwnDetail .secBox1 .ivu-icon{
  color: #3aaafe;
}
.compMonitorOwnDetail .secBox2{
  margin-bottom: 20px;
}
.compMonitorOwnDetail .secBox3 .h3T{
  margin-bottom: 10px;
}
.compMonitorOwnDetail .secBox3 .secFilter{
  background: #ecf3fb;
}
.compMonitorOwnDetail .secBox3 .filterWrap{
  padding: 20px;
}
.compMonitorOwnDetail .secBox3 .filterWrap td{
  padding: 0px;
}
.compMonitorOwnDetail .secBox3 .filterWrap .td1{
  width: 75%!important;
}
.compMonitorOwnDetail .secBox3 .filterWrap .td1 .n{
  width: 90px;
  display:inline-block;
  float: none;
}
.compMonitorOwnDetail .secBox3 .filterWrap .td1 .inputWrap{
  width: 200px;
  margin: 0px;
  display: inline-block;
  text-align: left;
}
.compMonitorOwnDetail .secBox3 .filterWrap .td1 .ivu-btn{
  margin-left: 10px;
}
</style>
