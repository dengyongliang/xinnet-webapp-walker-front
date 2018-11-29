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
    this.getCurrentUserData()
    this.getUserRoles()
    this.getUsers()
    this.getCompanys()
    let params = {
      param: {
        userId: ''
      }
    }
    this.getUserAuthGroups(params)
  },
  methods: {
    ...mapActions({
      getCurrentUserData: types.GET_CURRENT_USER_DATA,
      getUserRoles: types.GET_USER_ROLES,
      getUsers: types.GET_USERS,
      getCompanys: types.GET_COMPANYS,
      getUserAuthGroups: types.GET_USER_AUTH_GROUPS
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
