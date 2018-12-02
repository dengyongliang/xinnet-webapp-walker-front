<template lang="pug">
  .pageMain
    header-body()
    .frameBottom()
      .frameMenu
        menu-body
      .frameBody
        router-view(v-if="islogin")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '../store/types'
import { emitter as restEmitter } from '../global/rest'
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
    let vm = this
    this.getCurrentUserData(function (response) {
      if (response.data.code === '1000') {
        vm.$store.commit(types.SET_LOGINED)
        vm.$store.commit(types.SET_CURRENT_USER_DATA, response.data)
        Promise.all([
          vm.$store.dispatch(types.GET_USER_ROLES),
          vm.$store.dispatch(types.GET_USERS),
          vm.$store.dispatch(types.GET_COMPANYS),
          vm.$store.dispatch(types.GET_USER_AUTH_GROUPS)
        ]).then((response) => {
          // 获取信息成功
        }).catch((error) => {
          console.log(error)
        })
      } else {
        vm.$router.replace({ path: '/login' })
      }
    })
  },
  methods: {
    ...mapActions({
      getCurrentUserData: types.GET_CURRENT_USER_DATA
    })
  },
  computed: {
    ...mapState([
      'islogin'
    ])
  },
}
</script>

<style>
@import '../assets/css/cont.css';
</style>
