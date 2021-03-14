<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">查询统计</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">以物抵债资产管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="el-row1">
      <el-col :span="24">
        <div class="grid-content">
          <el-button @click="reset('form1')">清空</el-button>
          <el-button>保存</el-button>
          <el-button type="primary">保存并提交</el-button>
        </div>
      </el-col>
    </el-row>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#b2bec3"
        text-color="#333"
        active-text-color="#409eff">
      <el-menu-item index="1">
        <router-link to="/totalSearch/SMADXQ/SMADFinfo">抵押物基本信息</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/totalSearch/SMADXQ/SMADauction">法拍明细</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/totalSearch/SMADXQ/SMADinfo">以物抵债详情</router-link>
      </el-menu-item>
    </el-menu>

    <el-form style="margin-top: 60px" ref="form1" :model="form1">
      <el-form-item style="margin-left: 30%">
        <el-row class="el-row2">
          <el-col :span="3"><div class="grid-content1" >执行案号：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value19" clearable></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item style="margin-top: 30px;margin-left: 30%">
        <el-row class="el-row3">
          <el-col :span="3"><div class="grid-content1" >执行裁定结果：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value20" clearable></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item style="margin-top: 30px;margin-left: 30%">
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/pdf文件</div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SMADinfo",
  data(){
    return{
      activeIndex: '3',
        form1:{
          value1:'',
          value2:''
        }
     }
  },
  methods:{
    reset(){
      this.form1 = this.$options.data().form1;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<style scoped>
.el-icon-s-home{
  font-size: 200%;
}
.el-breadcrumb1{
  font-size: 15px;
  margin-top: 10px;
}
.el-row1{
  margin-top: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  text-align: end;
  height: 50px;
  line-height: 50px;
  padding-right: 20px;
}
.span1{
  font-size: 20px;
  font-weight: bold;
  font-family: 黑体;
  margin-left: 20px;
}
.grid-content1{
  background-color: #DCDFE6;
  text-align: end;
}
</style>