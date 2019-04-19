/**
 * Created by Eric on 2017/12/11.
 *
 * 表格组件
 *      此组件必须引用bootstrap.css\jquery\font-awesome\summernote

 *  参数说明:
 *          @param {String} upLoadUrl  图片上传接口地址
 *          @param {String} content  获取编辑器内容
 *          @param {Integer} minHeight 编辑器最低高度
 *  使用方式:
 *      ex:<bg-editor
                :minHeight="300"
                :uploadUrl="uploadApi"
                :content="getApi"
                @editorData='editorInfo'>
            </bg-editor>
 *       @editorData 取得编辑器内容
 *
 *
 */
<template>
  <div
  v-loading="loading"
  element-loading-text="拼命上传中..."
  element-loading-spinner="el-icon-loading"
  >
     <div id="summernote"></div>
  </div>
</template>
<script>
import CONSTANT from "../../constant/constant.js";
let common = require("../../common.js");
import $ from 'jquery'
export default {
    data(){
        return{
          loading:false,
          fileKey:''
        }
    },
    props:{
        uploadUrl:String,
        minHeight:{
            type: Number,
            default: 300
        },
        content:{
            type: String,
            default: ''
        }
    },
    watch:{
    },
    mounted() {
        setTimeout(()=>{
         $('#summernote').summernote('code',this.content)
        },300)
        $('#summernote').summernote({
          toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['picture',['picture']],
            ['table',['table']],
            // ['fullscreen',['fullscreen']]
          ],
          lang: 'zh-CN',
          minHeight: this.minHeight, // set editor height
          dialogsFade: true,
          callbacks: {
            onImageUpload: (files) => {
                this.loading = true;
                let file = files[0];
                let url = CONSTANT.SYSTEM.ADMINUPLOADFILE+`/${file.name.split(".")[1]}`;
                let sessionId = sessionStorage.getItem('sessionId');
                $.ajax({  url: url,  method: 'GET',
                data: {
                  contentType: file.type
                },
                headers: {
                  sessionId: sessionId,
                }
                }).success((res)=>{
                  console.log(res);
                  this.upLoadUrl = res.data.bussData.uploadUrl;
                  let fileKey = res.data.bussData.fileKey;
                   this.$emit('childEvent', { fileKey:fileKey});
                  let downloadUrl = res.data.bussData.downloadUrl;
                  common.uploadFile(this.upLoadUrl,file,file.type,(res)=>{
                    console.log(res);
                    $('#summernote').summernote('editor.insertImage', downloadUrl);
                    this.loading = false;
                  })
                })
            },
            onChange: (contents, $editable)=> {
                this.$emit('editorData',contents)
            }
          },
          content(item) {

          }
        })
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
@import '/static/bootstrap.css';
@import '/sys/static/bootstrap.css';
</style>
