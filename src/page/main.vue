<template lang="pug">
  .pageMain
    header-body()
    .frameBottom()
      .frameMenu
        menu-body
      .frameBody(v-if="islogin")
        router-view
</template>

<script>
import {mapState} from 'vuex'
import menuBody from '../modular/menu'
import headerBody from '../modular/header'
export default {
  name: 'MAIN_BODY',
  components: {
    menuBody,
    headerBody
  },
  data () {
    return {
    }
  },
  mounted () {

  },
  beforeMount () {
    // // 进入此组件 设为 登出状态，防止加载 frameBody 加载数据
    // this.$store.commit('SET_LOGOUT')
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
</style>
