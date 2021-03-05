<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">查询统计</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">分期还款企业名单</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">详情</el-breadcrumb-item>
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

    <el-form ref="form1" :model="form1">
      <el-form-item>
        <el-row class="el-row2">
          <el-col :span="2"><div class="grid-content1">债务人：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value1"></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" style="margin-left: 20px">应还本金：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value2"></el-input></div></el-col>
        </el-row>
      </el-form-item>
    <el-form-item>
      <el-row class="el-row3">
        <el-col :span="2"><div class="grid-content1">应还利息：</div></el-col>
        <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value3"></el-input></div></el-col>
        <el-col :span="2"><div class="grid-content1" style="margin-left: 20px">还款期限：</div></el-col>
        <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value4"></el-input></div></el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-row class="el-row4">
        <el-col :span="3"><div class="grid-content1">企业实际控制人或关键人：</div></el-col>
        <el-col :span="6"><div class="grid-content2"><el-input v-model="form1.value5"></el-input></div></el-col>
        <el-col :span="2"><div class="grid-content1" style="margin-left: 20px">债权人：</div></el-col>
        <el-col :span="7"><div class="grid-content3" style="text-align: start">
          <el-select v-model="creditMan" clearable filterable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div></el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-row class="el-row5">
        <el-col :span="2"><div class="grid-content1">还款是否结清：</div></el-col>
        <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value6"></el-input></div></el-col>
        <el-col :span="2"><div class="grid-content1" style="margin-left: 20px">备注：</div></el-col>
        <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value7"></el-input></div></el-col>
      </el-row>
    </el-form-item>

    <el-divider></el-divider>
    <span style="font-family: 黑体; font-weight: bold;font-size: 20px">还款明细</span>
    <el-table :data="tableData" border height="300" style="width: 100%" class="el-table">
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
  name: "addfqCompanyInfo",
  data(){
    return{
      form1:{
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:'',
        value6:'',
        value7:''
      },
      creditMan:'',
      options:[{
        value: '选项1',
        label: '丹阳工行'
      }, {
        value: '选项2',
        label: '丹阳农行'
      }, {
        value: '选项3',
        label: '丹阳中行'
      }, {
        value: '选项4',
        label: '丹阳建行'
      }, {
        value: '选项5',
        label: '丹阳交行'
      }, {
        value: '选项6',
        label: '丹阳农发行'
      }, {
        value: '选项7',
        label: '丹阳农商行'
      }, {
        value: '选项8',
        label: '丹阳江苏'
      }, {
        value: '选项9',
        label: '丹阳保得'
      }, {
        value: '选项10',
        label: '丹阳华夏'
      }, {
        value: '选项11',
        label: '丹阳民生'
      }, {
        value: '选项12',
        label: '丹阳浦发'
      }, {
        value: '选项13',
        label: '丹阳招商'
      }, {
        value: '选项14',
        label: '丹阳中信'
      }, {
        value: '选项15',
        label: '丹阳兴业'
      }, {
        value: '选项16',
        label: '丹阳南京'
      }, {
        value: '选项17',
        label: '丹阳紫金农商'
      }, {
        value: '选项18',
        label: '丹阳广发'
      }, {
        value: '选项19',
        label: '丹阳储蓄'
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
      this.form1 = this.$options.data().form1
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
.el-row3, .el-row4, .el-row5{
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