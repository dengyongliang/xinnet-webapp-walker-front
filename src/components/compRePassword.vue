<template lang="pug">
  div(class="compRePassword")
    FormItem(:label="label1")
      slot(name="left1")
      Input(
        type="password",
        :name="name1",
        :placeholder="placeholder1",
        :style="styles1",
        @on-blur="onBlur",
        @on-focus="onFocus",
        ref="password",
        :maxlength = "maxLength",
        v-model = "value1",
        :class="{ 'error': showPasswordError }"
      )
      Icon.ok.iconright(custom="i-icon i-icon-correct_",size="16",v-show="ok1")
      slot(name="right1")
      Alert(type="error",show-icon, style="display:inline-block;max-width:350px;",v-show="showPasswordError && errorInCompInput",ref="msgErrorPw") {{errorTextPassword}}
    FormItem(:label="label2")
      slot(name="left2")
      Input(
        type="password",
        :name="name2",
        :placeholder="placeholder2",
        :style="styles2",
        @on-blur="onBlur",
        @on-focus="onFocus",
        ref="rePassword",
        :maxlength = "maxLength",
        v-model = "value2",
        :class="{ 'error': showRePasswordError }"
      )
      Icon.ok.iconright(custom="i-icon i-icon-correct_",size="16",v-show="ok2")
      slot(name="right2")
      Alert(type="error",show-icon, style="display:inline-block;max-width:350px;",v-show="showRePasswordError && errorInCompInput",ref="msgErrorRePw") {{errorTextRePassword}}
</template>

<script>
import mixinsRePassword from '@/mixins/mixinsRePassword'
export default {
  mixins: [mixinsRePassword],
  name: 'compRePassword',
  props: {

  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {

  }
}
</script>
<style>
.compRePassword input{
  height:46px;
  line-height:46px;
  padding-left:55px;
}
.compRePassword .iconleft{
  position:absolute;
  top: 15px;
  left:20px;
  z-index:1;
  color:#bcbcbc;
}
.compRePassword .iconright{
  font-size:20px;
  right:-17px;
  top:13px;
  position:absolute;
  color:#77c936;
}
.compRePassword .ok{
  color:#7aca33;
}
</style>
