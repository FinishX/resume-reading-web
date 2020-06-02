<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="http://localhost:8899/image/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-preview="handlePreview">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imageUrl: '',
        dialogVisible: false,
        dialogImageUrl:null
      };
    },
    methods: {
      handlePreview(file) {
        this.dialogVisible = true;
        this.dialogImageUrl=file.url;
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<!-- <template> 
  <div>
    <el-upload
      action="upload"
      multiple
      :data="dataObj"
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :limit="maxCount"
      :on-exceed="handleExceed"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
// <script>
//   import {policy} from '@/api/oss'

//   export default {
//     name: 'multiUpload',
//     props: {
//       //图片属性数组
//       value: Array,
//       //最大上传图片数量
//       maxCount:{
//         type:Number,
//         default:5
//       }
//     },
//     data() {
//       return {
//         dataObj: {
//           policy: '',
//           signature: '',
//           key: '',
//           ossaccessKeyId: '',
//           dir: '',
//           host: ''
//         },
//         dialogVisible: false,
//         dialogImageUrl:null
//       };
//     },
//     computed: {
//       fileList() {
//         let fileList=[];
//         for(let i=0;i<this.value.length;i++){
//           fileList.push({url:this.value[i]});
//         }
//         return fileList;
//       }
//     },
//     methods: {
//       emitInput(fileList) {
//         let value=[];
//         for(let i=0;i<fileList.length;i++){
//           value.push(fileList[i].url);
//         }
//         this.$emit('input', value)
//       },
//       handleRemove(file, fileList) {
//         this.emitInput(fileList);
//       },
//       handlePreview(file) {
//         this.dialogVisible = true;
//         this.dialogImageUrl=file.url;
//       },
//       beforeUpload(file) {
//         let _self = this;
//         return new Promise((resolve, reject) => {
//           policy().then(response => {
//             _self.dataObj.policy = response.data.policy;
//             _self.dataObj.signature = response.data.signature;
//             _self.dataObj.ossaccessKeyId = response.data.accessKeyId;
//             _self.dataObj.key = response.data.dir + '/${filename}';
//             _self.dataObj.dir = response.data.dir;
//             _self.dataObj.host = response.data.host;
//             resolve(true)
//           }).catch(err => {
//             console.log(err)
//             reject(false)
//           })
//         })
//       },
//       handleUploadSuccess(res, file) {
//         this.fileList.push({url: file.name,url:this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name});
//         this.emitInput(this.fileList);
//       },
//       handleExceed(files, fileList) {
//         this.$message({
//           message: '最多只能上传'+this.maxCount+'张图片',
//           type: 'warning',
//           duration:1000
//         });
//       },
//     }
//   }
// </script>
// <style>

// </style> -->


