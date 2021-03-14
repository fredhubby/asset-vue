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
      <el-form-item style="margin-left: 30%" label="案件进度：">
        <el-input v-model="form1.value1" clearable style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 30px;margin-left: 30%" label="现产权人：">
        <el-input v-model="form1.value2" clearable style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 30px;margin-left: 30%" label="移交部门：">
        <el-input v-model="form1.value3" clearable style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 30px;margin-left: 30%" label="移交时间：">
        <el-date-picker
            v-model="form1.value4"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SMADauction",
  data(){
    return{
      activeIndex: '2',
        form1:{
          value1:'',
          value2:'',
          value3:'',
          value4:''
       },
      pickerOptions:[]
    }
  },
  methods:{
    reset(){
      this.form1 = this.$options.data().form1;
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