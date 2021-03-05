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
      </el-form-item>
      <el-form-item style="margin-top: 15px">
        <el-row class="el-row6">
          <el-col :span="2"><div class="grid-content1" >抵押物位置：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value9" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >土地面积：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value10" clearable></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item style="margin-top: 15px">
        <el-row class="el-row7">
          <el-col :span="2"><div class="grid-content1" >房产面积：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value11" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >抵押物评估价：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value12" clearable></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item style="margin-top: 15px">
        <el-row class="el-row8">
          <el-col :span="2"><div class="grid-content1" >抵押物登记金额：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value13" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >资产性质：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value14" clearable></el-input></div></el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SMADFinfo",
  data(){
    return{
      activeIndex: '1',
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
        value14:''
      }
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