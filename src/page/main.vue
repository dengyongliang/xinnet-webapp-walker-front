<template lang="pug">
  .pageMain
    header-body()
    .frameBottom()
      .frameMenu
        menu-body
      .frameBody
        router-view
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
  },
  methods: {
  },
  computed: {
  },
}
</script>

<style>
@import '../assets/css/cont.css';
</style>
