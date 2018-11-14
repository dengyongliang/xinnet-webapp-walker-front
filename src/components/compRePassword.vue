<template lang="pug">
  div
    FormItem(:label="label1",class="compInput")
      slot(name="left1")
      Input(
        type="text",
        v-if="type === 'text'",
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
      slot(name="right1")
      Alert(type="error",show-icon, style="display:inline-block",v-show="showPasswordError",ref="msgErrorPw") {{errorTextPassword}}
    FormItem(:label="label2",class="compInput")
      slot(name="left2")
      Input(
        type="text",
        v-if="type === 'text'",
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
      slot(name="right2")
      Alert(type="error",show-icon, style="display:inline-block",v-show="showRePasswordError",ref="msgErrorRePw") {{errorTextRePassword}}
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
