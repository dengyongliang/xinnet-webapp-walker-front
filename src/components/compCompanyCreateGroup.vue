<template lang="pug">
  .compCompanyCreateGroup
    Alert(type="warning", show-icon) 温馨提示：
      Icon(custom="i-icon i-icon-notice_", size="16", slot="icon")
      template(slot="desc") 每个域名都会关联至企业的分组，用户可为不同分组的域名设置不同的管理人员，实现域名分权管理。

    .companyName 每个域名都会{{baseInfoData.name}}
      span ( 域名总数：<em>0</em> 个 )
    ul.groupList(ref="group")
      li(v-for="(item, index) in formDynamic.items", v-if="item.status", :key="index")
        comp-input(name='name',label="请输入组名",:ref="'name'+index",:maxLength="20",styles="width:208px")
        Button(@click="") + 添加负责人
          Tooltip(placement="top-start")
            span(slot="content", style="color:#fff") 重点保护域名设置解析<br />及修改DNS需分组负责人授权。<br />重要域名监控消息将通知分组负责人。
            Icon(custom="i-icon i-icon-tips", size="16")
        a(href="javascript:;") 保存
        a(href="javascript:;") 取消
        a(href="javascript:;") 修改
        a(href="javascript:;", :ref="index", @click="handleRemove(index)") 删除
      li
        div.groupName
          span.name 默认分组默认分组默认
          em.num 300个
        div.manager 负责人：韩梅梅（78df8d）
          Tooltip(placement="top-start")
            span(slot="content", style="color:#fff") 重点保护域名设置解析<br />及修改DNS需分组负责人授权。<br />重要域名监控消息将通知分组负责人。
            Icon(custom="i-icon i-icon-tips", size="16")
        a(href="javascript:;") 保存
        a(href="javascript:;") 取消
        a(href="javascript:;") 修改
        a(href="javascript:;", @click="handleRemove(index)") 删除
    Button( @click="handleAdd", v-show="showAddBtn") + 添加分组
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from '@/components/compInput'
import compSelect from '@/components/compSelect'
import validateFormResult from '@/global/validateForm'
export default {
  name: 'compAccountStaffInfo',
  components: {
    compInput,
    compSelect
  },
  props: {
    baseInfoData: {
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
      loadingBtn: false,
      showAddBtn: false,
      index: 0,
      formDynamic: {
        items: [
        ]
      }
    }
  },
  methods: {
    nextForm () {
      this.loadingBtn = true
      let result = validateFormResult([
        this.$refs.userName,
        this.$refs.userEmail,
        this.$refs.companyId
      ])
      if (result) {
        let param = {
          userName: this.$refs.userName.value,
          userEmail: this.$refs.userEmail.value,
          companyId: this.$refs.companyId.value.split("_")[0]
        }
        this.$emit('getBaseInfo',param)
        console.log(param)
      } else {
        this.loadingBtn = false
      }
    },
    handleAdd () {
      if (this.$refs.group.children.length===5) {
        this.showAddBtn = false
      }
      this.index++;
      this.formDynamic.items.push({
        value: '',
        index: this.index,
        status: 1
      })
    },
    handleRemove (index) {
      console.log(this.$refs)
      this.showAddBtn = true
      this.formDynamic.items.splice(index, 1)
    },
    ...mapActions({
    })
  },
  beforeMount () {
  },
  mounted () {
    if (!this.index) {
      this.handleAdd()
      this.showAddBtn = true
    }
  },
  computed: {
    ...mapState({
      companysList (state) {
        return this.GLOBALS.CONVERT_SELECT(state.user.companys, {
          label: 'name',
          value: 'id'
        })
      }
    })
  },
  watch: {
  }
}
</script>
<style scoped>
.filter .text{
  display:inline-block;
  margin-right:10px;
  padding-left:10px;
}
.filter button{
  margin-left:10px;
}
.totalInfo{
  font-size:17px;
  text-align:center;
  padding:30px 0;
  color:#666;
}
.totalInfo .i-icon{
  color:#a3a3a3;
  display:inline-block;
  margin:-2px 5px 0 0;
}
.totalInfo em{
  font-size:30px;
  font-weight:600;
}
td{
  width:50%;
  height:29px;
  line-height:29px;
  border-bottom:1px dashed #eee;
  padding:0 20px;
  font-size:12px;
}
td .v{
  float:right;
}
.status_1{
  background:url(../../static/img/img_bill_1.png) no-repeat 95% 0px;
}
.status_2{
  background:url(../../static/img/img_bill_2.png) no-repeat 95% 0px;
}
.status_3{
  background:url(../../static/img/img_bill_3.png) no-repeat 95% 0px;
}
</style>
