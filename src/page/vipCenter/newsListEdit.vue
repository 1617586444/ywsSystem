<template>
  <div>
    <!-- <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)">
    </quill-editor>-->
    <quill-editor
      ref="myTextEditor"
      :content="content"
      :options="editorOption"
      @change="onEditorChange($event)"
    >//内容改变事件</quill-editor>
  </div>
</template>
<script>
    import { quillEditor } from 'vue-quill-editor'
    export default{
        data(){
            return {
                content:'fgwuhuw9fwfu0wehf0wfww',
                editorOption:{}
            }
        },
        methods:{
            onEditorBlur(e){//失去焦点事件
            console.log(e);
            console.log(this.content);
            },
            onEditorFocus(ele){//获得焦点事件
                console.log(ele);
                 console.log(this.content);
            },
            onEditorChange(e){//内容改变事件
             console.log(this.content);
             console.log(e);
            }
        }
    }
//     export default {
//     components: {
//         quillEditor
//    },data(){
//      return{
//        content:""
//      }
//     },
//     methods: {

//        getContent(){
//         //   <span style="white-space:pre">  </span>    onEditorChange({ editor, html, text }) {//富文本编辑器  文本改变时 设置字段值
//         // <span style="white-space:pre">  </span>        this.content = html
//         // <span style="white-space:pre">  </span>    }
//         // <span style="white-space:pre">  </span>
//        }
//    }

// }
</script>
