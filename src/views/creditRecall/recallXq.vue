<template>
<div>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
    <el-breadcrumb-item class="el-breadcrumb1">债权清收</el-breadcrumb-item>
    <el-breadcrumb-item class="el-breadcrumb1">债权清收详情</el-breadcrumb-item>
  </el-breadcrumb>

  <el-row class="el-row1">
    <el-col :span="24">
      <div class="grid-content">
        <el-button @click="reset('form')">清空</el-button>
        <el-button>保存</el-button>
        <el-button type="primary">保存并提交</el-button>
      </div>
    </el-col>
  </el-row>

  <el-form :model="form">
    <el-form-item>
      <el-row class="el-row2">
        <el-col :span="2"><div class="grid-content1">借据号：</div></el-col>
        <el-col :span="7"><div class="grid-content2"><el-input v-model="form.value1"></el-input></div></el-col>
        <el-col :span="2"><div class="grid-content1" style="margin-left: 20px">债务人：</div></el-col>
        <el-col :span="7"><div class="grid-content2"><el-input v-model="form.value2"></el-input></div></el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-row class="el-row3">
        <el-col :span="2"><div class="grid-content1">本金：</div></el-col>
        <el-col :span="7"><div class="grid-content2"><el-input v-model="form.value3"></el-input></div></el-col>
        <el-col :span="2"><div class="grid-content1" style="margin-left: 20px">利息：</div></el-col>
        <el-col :span="7"><div class="grid-content2"><el-input v-model="form.value4"></el-input></div></el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-row class="el-row4">
        <el-col :span="2"><div class="grid-content1">债权人：</div></el-col>
        <el-col :span="7"><div class="grid-content3" style="text-align: start">
          <el-select v-model="form.creditMan" clearable filterable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div></el-col>
        <el-col :span="2"><div class="grid-content1" style="margin-left: 20px">备注：</div></el-col>
        <el-col :span="7"><div class="grid-content2"><el-input v-model="form.value5"></el-input></div></el-col>
      </el-row>
    </el-form-item>
    <el-divider></el-divider>
    <span style="font-family: 黑体; font-weight: bold;font-size: 20px">还款明细</span>
    <el-table :data="tableData" border height="350" style="width: 100%" class="el-table">
      <el-table-column prop="hkid" label="还款ID" width="200"></el-table-column>
      <el-table-column prop="hksj" label="还款时间" width="200"></el-table-column>
      <el-table-column prop="hkbjje" label="还款本金金额" width="200"></el-table-column>
      <el-table-column prop="hklxje" label="还款利息金额" width="200"></el-table-column>
      <el-table-column prop="zffs" label="支付方式" width="150"></el-table-column>
      <el-table-column prop="fkr" label="付款人" width="150"></el-table-column>
      <el-table-column prop="skr" label="收款人" width="120"></el-table-column>
      <el-table-column prop="bz" label="备注" width="300"></el-table-column>
      <el-table-column prop="operate" label="操作">
        删除
      </el-table-column>
    </el-table>
  </el-form>
</div>
</template>

<script>
export default {
  name: "recallXq",
  data(){
    return{
      creditMan:'',
      form:{

      },
      options: [{
        value: '选项1',
        label: '天惠投资'
      }, {
        value: '选项2',
        label: '天晟投资'
      }, {
        value: '选项3',
        label: '天工惠农小贷'
      }, {
        value: '选项4',
        label: '银润小贷'
      }, {
        value: '选项5',
        label: '阳光企业'
      }],
      tableData: [{
        bz:'',
        skr:'',
        fkr:'',
        zffs:'',
        hklxje:'',
        hkbjje:'',
        hksj:'',
        hkid:''
      }]
    }
  },
  methods:{
    reset(){
      this.form = this.$options.data().form
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
.el-row2 {
  margin-top: 30px;
  text-align: end;
  height: 40px;
  line-height: 40px;
}
.el-row3, .el-row4{
  margin-top: 10px;
  text-align: end;
  height: 40px;
  line-height: 40px;
}
.grid-content1{
  background-color: #DCDFE6;
}
.el-table{
  margin-top: 20px;
}
</style>