<template lang="pug">
  div
    Modal(v-model="modalshow",title="",:footer-hide="true", width="625px", class-name="compTrademarkNotifySet",:mask-closable="maskClosable")
      div.clear(slot="header")
        strong 商标监控通知设置
      Form(:label-width="150", v-if="modalshow")
        FormItem(label="监控通知员工：")
          comp-select(:list="usersList", :multiple="true", ref="notifyUsers", :defaultValue="notifyData.notifyUsers")
        FormItem(label="通知类型：")
          comp-radio(:list="notifyWayList", ref="notifyWay", :defaultValue="(notifyData.notifyWay+'')")
        div.ivu-modal-footer
          Button(@click="close") 取消
          Button(type="primary",@click="saveForm",:loading="loadingBtn") 保存
</template>

<script>
import { mapState } from 'vuex'
import compSelect from './compSelect'
import compRadio from './compRadio'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compSelect,
    compRadio
  },
  name: 'compBrandSet',
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    notifyData: {
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
      notifyWay: '',
      notifyUsers: '',
      modalshow: false,
      // list: [],
      notifyUsersList: [],
      notifyWayList: [
        {
          label: '不通知',
          value: '1'
        },
        // {
        //   label: '短信通知',
        //   value: '2'
        // },
        {
          label: '邮件通知',
          value: '3'
        }
        // {
        //   label: '邮件和短信通知',
        //   value: '4'
        // }
      ],
      loadingTable: false,
      loadingBtn: false
    }
  },
  methods: {
    saveForm () {
      // FOLLOW_TRADEMARK_ADD_NOTIFY
      this.loadingBtn = true
      // 校验
      let result = validateFormResult([
        this.$refs.notifyUsers,
        this.$refs.notifyWay
      ])
      if (result) {
        let params = {
          notifyUsers: this.$refs.notifyUsers.value.length ? this.$refs.notifyUsers.value.join(',') : '',
          notifyWay: this.$refs.notifyWay.value
        }
        this.$store.dispatch('FOLLOW_TRADEMARK_ADD_NOTIFY', params).then(response => {
          this.loadingBtn = false
          if (!response) {
            return false
          }
          if (response.data.code === '1000') {
            this.$Message.success('操作成功')
            this.modalshow = false
          } else {
            this.$Message.error(response.data.msg)
          }
        }).catch(() => {})
      } else {
        this.loadingBtn = false
      }
    },
    close () {
      // this.$Message.info('Clicked cancel');
    },
    handleShowModal () {
      this.modalshow = !this.modalshow
    }
  },
  beforeMount () {
    // this.getBrandList()
  },
  mounted () {
  },
  computed: {
    ...mapState({
      usersList (state) {
        return this.GLOBALS.CONVERT_SELECT(state.user.users, {
          label: 'userName',
          value: 'id',
          code: 'userCode'
        })
      },
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  watch: {
  }
}
</script>
<style>
.compTrademarkNotifySet .ivu-modal-header{
  height: 100px;
  background: #2271f4;
  text-align: left;
}
.compTrademarkNotifySet .ivu-modal-header strong{
  font-size: 16px;
  font-weight: 200;
  color: #fff;
}
.compTrademarkNotifySet .ivu-modal-header button{
  float: right;
  margin-right: 50px;
}
.compTrademarkNotifySet .ivu-modal-close i{
  color: #fff;
}
.compTrademarkNotifySet th{
  background: #f9f9f9;
}
.compTrademarkNotifySet form{
  padding-top: 20px;
}
.compTrademarkNotifySet .ivu-modal-footer{
  padding-bottom: 20px!important;
}
</style>
