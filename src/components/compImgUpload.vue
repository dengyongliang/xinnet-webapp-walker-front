<template lang="pug">
  div.compImgUpload(:class="(status==='view' && modify)?'modify':'view'")
    .demo-upload-list(v-for="item in uploadList")
      template(v-if="item.status === 'finished'")
        img(:src="item.url")
        .demo-upload-list-cover(v-show="showCover")
          Icon(type="ios-eye-outline",@click.native="handleView(item.url)")
      template(v-else)
        Progress(v-if="item.showProgress",:percent="item.percentage",hide-info)
    Upload(v-show="(status==='view' && modify) || status==='creat'",ref="upload", :show-upload-list="false", :default-file-list="defaultList", :on-success="handleSuccess", :format="['jpg','jpeg','png']", :max-size="size", :on-format-error="handleFormatError", :on-exceeded-size="handleMaxSize", :before-upload="handleBeforeUpload", multiple, :action="uploadAction",:name="name", style="display: inline-block;width:58px;vertical-align: top;")
      div(style="width: 58px;height:58px;line-height: 58px;text-align:center;")
        span(v-show="status==='creat'") {{creatText}}
        span(v-show="status==='view'") 重新上传

    .unit(v-show="status==='creat' || modify") {{tips}}
      slot(name="unit")
    Modal(title="图片预览" v-model="visible",:footer-hide="true",:mask-closable="maskClosable")
      img(:src="imgName",v-if="visible",style="width: 100%")
    Alert(type="error",show-icon, v-show="showError",ref="msgErrorFile") {{errorText}}
    slot(name="last")
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'compImgUpload',
  props: {
    modify: {
      type: Boolean,
      default: false
    },
    creatText: {
      type: String,
      default: ''
    },
    showCover: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'file'
    },
    size: {
      type: Number,
      default: 1024
    },
    tips: {
      type: String,
      default: '支持jpg、gif、png格式，2M以内。'
    },
    file: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: 'view'
    },
    errorText: {
      type: String,
      default: '请上传！'
    },
    type: {
      type: String,
      default: 'upload'
    },
    uploadAction: {
      type: String,
      default: ''
    },
    onSuccesscallback: {
      type: Function
    },
    onBeforecallback: {
      type: Function
    }
  },
  data () {
    return {
      uploadList: [],
      defaultList: [],
      visible: false,
      showError: false
    }
  },
  methods: {
    showValidateResult () {
      this.showError = true
    },
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file, fileList) {
      console.log('res')
      console.log(res)
      console.log('file')
      console.log(file)
      console.log(fileList)
      file.url = res.url
      file.name = res.name
      file.file = res.file
      if (this.onSuccesscallback && typeof this.onSuccesscallback === 'function') {
        this.onSuccesscallback(res)
      }
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式错误',
        desc: '文件 ' + file.name + ' 格式错误, 请上传jpg、gif、png格式，' + this.size + 'KB 以内。'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '文件过大',
        desc: '文件  ' + file.name + ' 体积大于 ' + this.size + 'KB。'
      })
    },
    handleBeforeUpload (file) {
      if (this.$refs.upload.fileList.length) {
        this.handleRemove(this.$refs.upload.fileList[0])
      }
      const check = this.uploadList.length < 2
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        })
      } else {
        if (this.onBeforecallback && typeof this.onBeforecallback === 'function') {
          this.onBeforecallback(file)
        }
      }
      return check
    }
  },
  computed: {
    ...mapState({
      maskClosable (state) {
        return state.maskClosable
      }
    })
  },
  beforeMount () {
    if (this.status === 'view') {
      this.defaultList[0] = {}
      this.defaultList[0].url = this.file
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  watch: {
    file (val) {
      this.uploadList = [
        {
          percentage: 100,
          status: 'finished',
          uid: '',
          url: val
        }
      ]
    },
    uploadList (val) {
    }
  }
}
</script>
<style scoped>

.demo-upload-list{
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: absolute;
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
  margin-right: 4px;
}
.demo-upload-list img{
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover{
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
  display: block;
}
.demo-upload-list-cover i{
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
