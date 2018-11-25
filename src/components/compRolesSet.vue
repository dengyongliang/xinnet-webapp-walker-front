<template lang="pug">
  Form(:label-width="150")
    FormItem(label="角色名称：")
      comp-input(name='roleName',label="角色名称",ref="roleName",:defaultValue="defaultValue")
    FormItem(label="页面权限勾选：")
      .roleList
        vue-scroll(:ops="ops",ref="vs")
          Tree(:data="roleData.list", show-checkbox, ref="Tree",:render="renderContent",)
    FormItem(label="")
      Button(type="primary",@click="getCheckedNodes",:loading="loadingBtn") 确定
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compInput from './compInput'
import validateFormResult from '@/global/validateForm'
export default {
  components: {
    compInput
  },
  props: {
    roleData: {
      type: Object,
      default: function () {
        return {
          data: {}
        }
      }
    },
    defaultValue: {
      type: String,
      default: ''
    },
    onClose: {
      type: Function
    }
  },
  data () {
    return {
      ops: {
        bar: {
          background: 'rgba(0,0,0,0.2)',
          keepShow: true
        }
      },
      loadingBtn: false
    }
  },
  methods: {
    getCheckedNodes(){
      let checkedArray = this.$refs.Tree.getCheckedAndIndeterminateNodes().map((val,idx,arr) => {
        return val.title
      })
      console.log(checkedArray)
    },
    close () {
      this.onClose();
    },
    renderContent(h, { root, node, data }){
      return h(
        'span', {
          style: {
            display: 'inline-block',
            margin: '0 0 0 25px'
          },
          on:{
            click:(e)=>{
            }
          }
        }, 
        [
          h('span', data.label)
        ]
      )
    },
    updateForm () {
    },
    ...mapActions({
    })
  },
  computed: {
  },
  beforeMount () {
  },
  mounted () {
  }
}
</script>
<style scoped>
form{
  padding:50px 0 0 0;
}
.roleList{
  width:300px;
  height:400px;
  border:1px solid #dcdee2;
  padding-left:10px;
}
</style>