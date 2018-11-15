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

<style scoped>
.pageMain{
  height:100%;
}

.frameBottom{
  width:100%;
  background:#f6f8f9;
  min-height:100%;
}
.frameBottom .frameMenu{
  width:200px;
  height:100%;
  background:#f6f8f9;
  position:fixed;
  top:0px;
  left:0px;
  border-right:1px solid #ededed;
  padding-top:50px;
}

.frameBottom .frameBody{
  min-height:300px;
  margin-left: 200px;
  padding-top: 70px;
}

</style>
