<template lang="pug">
.compDomainCreateTemplate
  comp-domain-create-template-step1(
  )
  comp-domain-create-template-step2(
  )
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/types'
import compDomainCreateTemplateStep1 from '@/components/compDomainCreateTemplateStep1'
import compDomainCreateTemplateStep2 from '@/components/compDomainCreateTemplateStep2'
export default {
  components: {
    compDomainCreateTemplateStep1,
    compDomainCreateTemplateStep2,
  },
  props: {
    onClose: {
      type: Function
    }
  },
  data () {
    return {
      value:''
    }
  },
  methods: {
  },
  computed: {

  },
  beforeMount () {
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style>

</style>