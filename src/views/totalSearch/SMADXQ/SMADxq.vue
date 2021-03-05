<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">司法诉讼</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">司法信息录入</el-breadcrumb-item>
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

    <el-form style="margin-top: 15px" ref="form1" :model="form1">
      <span class="span1">抵押物基本信息</span>
      <el-form-item style="margin-top: 15px">
        <el-row>
          <el-col :span="2"><div class="grid-content1" >借据号1：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value1" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >借据号2：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value2" clearable></el-input></div></el-col>
        </el-row>
        <el-row class="el-row3">
          <el-col :span="2"><div class="grid-content1" >担保ID：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value3" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >抵押人1：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value4" clearable></el-input></div></el-col>
        </el-row>
        <el-row class="el-row4">
          <el-col :span="2"><div class="grid-content1" >抵押人2：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value5" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >备注：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value6" clearable></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <span class="span2">抵押物情况</span>
      <el-form-item style="margin-top: 15px">
        <el-row class="el-row5">
          <el-col :span="2"><div class="grid-content1" >抵押物：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value7" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >抵押物类型：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value8" clearable></el-input></div></el-col>
        </el-row>
        <el-row class="el-row6">
          <el-col :span="2"><div class="grid-content1" >抵押物位置：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value9" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >土地面积：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value10" clearable></el-input></div></el-col>
        </el-row>
        <el-row class="el-row7">
          <el-col :span="2"><div class="grid-content1" >房产面积：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value11" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >抵押物评估价：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value12" clearable></el-input></div></el-col>
        </el-row>
        <el-row class="el-row8">
          <el-col :span="2"><div class="grid-content1" >抵押物登记金额：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value13" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >资产性质：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value14" clearable></el-input></div></el-col>
        </el-row>
      </el-form-item>

      <el-divider></el-divider>
      <span class="span1">法拍明细</span>
      <el-form-item style="margin-top: 15px">
        <el-row class="el-row9">
          <el-col :span="2"><div class="grid-content1" >案件进度：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value15" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >现产权人：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value16" clearable></el-input></div></el-col>
        </el-row>
        <el-row class="el-row10">
          <el-col :span="2"><div class="grid-content1" >移交部门：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value17" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >移交时间：</div></el-col>
          <el-col :span="7"><div class="grid-content2">
            <el-date-picker
                v-model="form1.value18"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
            </el-date-picker>
          </div></el-col>
        </el-row>
      </el-form-item>

      <el-divider></el-divider>
      <span class="span1">以物抵债详情</span>
      <el-form-item>
        <el-row class="el-row11">
          <el-col :span="2"><div class="grid-content1" >执行案号：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value19" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >执行裁定结果：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value20" clearable></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
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
  name: "SMADxq",
  data(){
    return{
      form1:{
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:'',
        value6:'',
        value7:'',
        value8:'',
        value9:'',
        value10:'',
        value11:'',
        value12:'',
        value13:'',
        value14:'',
        value15:'',
        value16:'',
        value17:'',
        value18:'',
        value19:'',
        value20:''
      },
      pickerOptions:[],
      fileList: [{name: 'list1.jpg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'list2.pdf', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
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
.el-row11{
  margin-top: 15px;
}
</style>