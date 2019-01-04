<template lang="pug">
Collapse(v-model="colllapseValue", class-name="compAsideFilter")
  Panel(name="1") 按公司筛选
    div(slot="content", style="height: 400px; position:relative; overflow:hidden")
      a(@click="drawerInner1=true") 展开
      Drawer(:inner="true", :transfer="false", v-model="drawerInner1", :mask="false", :scrollable="false", width="188px")
  Panel(name="2") 按域名管理权限筛选
    div(slot="content")
  Panel(name="3") 服务状态
    div(slot="content")
      comp-checkbox(style="display:block;", :list="datas", :defaultValue="[]")
      Tag(
        v-for="item in param.value_1",
        :key="item",
        :name="item",
        closable,
        @on-close="handleClose2"
      ) 标签{{ item + 1 }}
  Panel(name="4") 管理公司
    div(slot="content")
  Panel(name="5") 监控日志
    div(slot="content")
  Panel(name="6") 注册时间
    div(slot="content")
  Panel(name="7") 到期时间
    div(slot="content")
  Panel(name="8") 域名后缀
    div(slot="content")
  Panel(name="9") 安全服务
    div(slot="content")
  Panel(name="10") 管理方式
    div(slot="content")
  Panel(name="11") 实名状态
    div(slot="content")
  Panel(name="12") 命名状态
    div(slot="content")
  Panel(name="13") 提交时间
    div(slot="content")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compCheckbox from '@/components/compCheckbox'
export default {
  components: {
    compCheckbox
  },
  name: 'compAsideFilter',
  props: {

  },
  data () {
    return {
      value: '',
      colllapseValue: '',
      drawerInner1: false,
      param: {
        value_1: [0, 1, 2]
      },
      datas:[
        {
          label: 'box1',
          value: 'box1'
        },
        {
          label: 'box2',
          value: 'box2'
        }
      ]
    }
  },
  methods: {
    handleAdd (type, idx) {
      if (this.count.length) {
        this.count.push(this.count[this.count.length - 1] + 1)
      } else {
        this.count.push(0)
      }
    },
    handleClose2 (event, name) {
      const index = this.count.indexOf(name)
      this.count.splice(index, 1)
    }
  },
  computed: {
  }
}
</script>

<style>
.compAsideFilter{
  
}
</style>
