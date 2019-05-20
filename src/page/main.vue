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
