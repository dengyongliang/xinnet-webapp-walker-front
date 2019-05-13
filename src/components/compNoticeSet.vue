<template lang="pug">
.compNoticeSet
  Form(:label-width="120", ref="type3")
    h3
      span 域名信息修改
    FormItem(label="通知范围：",)
      comp-radio.radioRange(name="range",:list="rangeList",ref="range3", :defaultValue="notifyDetail.length>0?notifyDetail[getIdxItem(3)].notifyRange.toString():'1'")
    FormItem(label="通知方式：",)
      comp-select.radioWay(name="way",:list="wayList",ref="way3", :defaultValue="notifyDetail.length>0?notifyDetail[getIdxItem(3)].notifyWay.toString():'3'")

  Form(:label-width="120", ref="type4") <!-- 4,5 -->
    h3
      span 域名过户/实名认证
    FormItem(label="通知范围：",)
      comp-radio.radioRange(name="range",:list="rangeList",ref="range4", :defaultValue="notifyDetail.length>0?notifyDetail[getIdxItem(4)].notifyRange.toString():'1'") <!-- 4,5 -->
    FormItem(label="通知方式：",)
      comp-select.radioWay(name="way",:list="wayList",ref="way4", :defaultValue="notifyDetail.length>0?notifyDetail[getIdxItem(4)].notifyWay.toString():'3'") <!-- 4,5 -->

  Form(:label-width="120", ref="type8")
    h3
      span 域名安全设置
    FormItem(label="通知范围：",)
      comp-radio.radioRange(name="range",:list="rangeList",ref="range8", :defaultValue="notifyDetail.length>0?notifyDetail[getIdxItem(8)].notifyRange.toString():'1'")
    FormItem(label="通知方式：",)
      comp-select.radioWay(name="way",:list="wayList",ref="way8", :defaultValue="notifyDetail.length>0?notifyDetail[getIdxItem(8)].notifyWay.toString():'3'")

  Form(:label-width="120", ref="type2")
    h3
      span 域名状态变化
    FormItem(label="通知范围：",)
      comp-radio.radioRange(name="range",:list="rangeList",ref="range2", :defaultValue="notifyDetail.length>0?notifyDetail[getIdxItem(2)].notifyRange.toString():'1'")
    FormItem(label="通知方式：",)
      comp-select.radioWay(name="way",:list="wayList",ref="way2", :defaultValue="notifyDetail.length>0?notifyDetail[getIdxItem(2)].notifyWay.toString():'3'")

  Form(:label-width="120", ref="type6") <!-- 6,7 -->
    h3
      span 域名解析/DNS服务器修改
    FormItem(label="通知范围：",)
      comp-radio.radioRange(name="range",:list="rangeList",ref="range6", :defaultValue="notifyDetail.length>0?notifyDetail[getIdxItem(6)].notifyRange.toString():'1'") <!-- 6,7 -->
    FormItem(label="通知方式：",)
      comp-select.radioWay(name="way",:list="wayList",ref="way6", :defaultValue="notifyDetail.length>0?notifyDetail[getIdxItem(6)].notifyWay.toString():'3'") <!-- 6,7 -->

  Form(:label-width="120", ref="type1")
    h3
      span 域名到期时间通知
    FormItem(label="通知范围：",)
      comp-radio.radioRange(name="range",:list="rangeList",ref="range1", :defaultValue="notifyDetail.length>0?notifyDetail[getIdxItem(1)].notifyRange.toString():'1'")
    FormItem(label="通知方式：",)
      comp-select.radioWay(name="way",:list="wayList",ref="way1", :defaultValue="notifyDetail.length>0?notifyDetail[getIdxItem(1)].notifyWay.toString():'3'")

  Form(:label-width="120", ref="type9")
    h3
      span 域名转入
    FormItem(label="通知范围：",)
      comp-radio.radioRange(name="range",:list="rangeList",ref="range9", :defaultValue="notifyDetail.length>0?notifyDetail[getIdxItem(9)].notifyRange.toString():'1'")
    FormItem(label="通知方式：",)
      comp-select.radioWay(name="way",:list="wayList",ref="way9", :defaultValue="notifyDetail.length>0?notifyDetail[getIdxItem(9)].notifyWay.toString():'3'")

  .btn
    Button(type="primary",@click="saveForm",:loading="loadingBtn") 保存
</template>

<script>
import compRadio from './compRadio'
import compSelect from './compSelect'

export default {
  components: {
    compRadio,
    compSelect
  },
  props: {
  },
  data () {
    return {
      loadingBtn: false,
      notifyDetail: [],
      rangeList: [
        {
          value: '仅通知域名所在分组负责人',
          label: '1'
        },
        {
          value: '通知域名所在分组全部管理人员',
          label: '2'
        }
      ],
      wayList: [
        {
          label: '不通知',
          value: '1'
        },
        {
          label: '短信通知',
          value: '2'
        },
        {
          label: '邮件通知',
          value: '3'
        },
        {
          label: '短信和邮件通知',
          value: '4'
        }
      ]
    }
  },
  methods: {
    saveForm () {
      let params = {
        notifyInfo: (function (vm) {
          let arr = []
          for (var i = 1; i <= 9; i++) {
            if (i === 5) {
              arr.push({
                type: i,
                way: vm.$refs.way4.value * 1,
                range: vm.$refs.way4.value * 1
              })
            } else if (i === 7) {
              arr.push({
                type: i,
                way: vm.$refs.way6.value * 1,
                range: vm.$refs.way6.value * 1
              })
            } else {
              arr.push({
                type: i,
                way: vm.$refs['way' + i].value * 1,
                range: vm.$refs['range' + i].value * 1
              })
            }
          }
          return arr
        })(this)
      }
      this.$store.dispatch('NOTIFY_SET', params).then(response => {
        this.loadingBtn = false
        if (!response) {
          return false
        }
        if (response.data.code === '1000') {
          this.$Message.success('保存成功')
          this.$emit('refreshData')
        } else {
        }
      }).catch(() => {})
    },
    getIdxItem (v) {
      return this.notifyDetail.findIndex((item) => (item.notifyType === v))
    }
  },
  computed: {
  },
  beforeMount () {
    this.$store.dispatch('NOTIFY_SET_DETAIL').then(response => {
      this.loadingBtn = false
      if (!response) {
        return false
      }
      if (response.data.code === '1000') {
        this.notifyDetail = response.data.data.list
      } else {
      }
    }).catch(() => {})
  },
  watch: {
  }
}
</script>

<style>
.compNoticeSet{
  padding: 30px;
}
.compNoticeSet form{
  background: #f9f9f9;
  margin-bottom: 20px;
}
.compNoticeSet form h3{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e2e2e2;
  margin-bottom: 10px;
}
.compNoticeSet form h3 span{
  border-left: 3px solid #2271f4;
  padding-left: 18px;
  font-weight: normal;
}
.compNoticeSet form .ivu-form-item{
  padding-left: 20px;
  margin: 0px;
  padding-bottom: 15px;
}
.compNoticeSet form .ivu-form-item-label{
  text-align: left;
}
.compNoticeSet form .radioRange .ivu-radio-group-item{
  display: block;
  padding: 0px;
}
.compNoticeSet .btn{
  text-align: center;
  border-top: 1px solid #f0f0f0;
  padding-top: 30px;
}
</style>
