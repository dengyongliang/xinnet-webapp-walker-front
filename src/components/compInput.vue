<template lang="pug">
div(class="compInput")
  slot(name="left")
  Input(
    type="text",
    v-if="type === 'text' && show",
    :name="name",
    :placeholder="placeholder",
    :style="styles",
    @on-blur="onBlur",
    @on-focus="onFocus",
    ref="input",
    :maxlength = "maxLength",
    v-model = "value",
    :required = "required",
    :disabled = "disabled",
    :class="{ 'error': showError }",
    :validate="validate"
  )
  Input(
    type="password",
    v-if="type === 'password' && show",
    :name="name",
    :placeholder="placeholder",
    :style="styles",
    @on-blur="onBlur",
    @on-focus="onFocus",
    ref="input",
    :maxlength = "maxLength",
    v-model = "value",
    :required = "required",
    :disabled = "disabled",
    :class="{ 'error': showError }",
    :validate="validate"
  )
  Input(
    type="textarea",
    v-if="type === 'textarea' && show",
    :name="name",
    :placeholder="placeholder",
    :style="styles",
    @on-blur="onBlur",
    @on-focus="onFocus",
    ref="input",
    :maxlength = "maxLength",
    v-model = "value",
    :required = "required",
    :disabled = "disabled",
    :class="{ 'error': showError }",
    :validate="validate"
  )
  slot(name="right")
  Alert(type="error",show-icon, style="display:inline-block",v-show="showError && errorInCompInput",ref="msgError") {{errorText}}
</template>

<script>
import mixinsInput from '@/mixins/mixinsInput'
export default {
  mixins: [mixinsInput],
  name: 'compInput',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style scoped>
.compInput .iconleft{
  position:absolute;
  top: 15px;
  left:20px;
  z-index:1;
  color:#bcbcbc;
}
</style>
