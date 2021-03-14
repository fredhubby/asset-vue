<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">资产包</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">资产包详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="el-row1">
      <el-col :span="24">
        <div class="grid-content">
          <el-button @click="addAsset">新增</el-button>
          <el-button @click="reset('form1')">清空</el-button>
          <el-button>保存</el-button>
          <el-button type="primary">保存并提交</el-button>
        </div>
      </el-col>
    </el-row>

    <el-form ref="form1" :model="form1">
      <el-form-item>
        <el-row class="el-row2">
          <el-col :span="2"><div class="grid-content1">资产包ID：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value1"></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" style="margin-left: 20px">债权数量：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value2"></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row class="el-row3">
          <el-col :span="2"><div class="grid-content1">交易基准日：</div></el-col>
          <el-col :span="7"><div class="grid-content2" style="text-align: start">
          <el-date-picker
              clearable
              v-model="form1.value3"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
          </div></el-col>
          <el-col :span="2"><div class="grid-content1" style="margin-left: 20px">支付对价总额：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value4"></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row class="el-row4">
          <el-col :span="2"><div class="grid-content1">债权人：</div></el-col>
          <el-col :span="7"><div class="grid-content3" style="text-align: start">
            <el-select v-model="form1.value5" clearable filterable placeholder="请选择">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div></el-col>
          <el-col :span="2"><div class="grid-content1" style="margin-left: 20px">原债权人：</div></el-col>
          <el-col :span="7"><div class="grid-content3" style="text-align: start">
            <el-select v-model="form1.value6" clearable filterable placeholder="请选择">
              <el-option
                  v-for="item in options1"
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
          <el-col :span="2"><div class="grid-content1">对价支付人：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value7"></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" style="margin-left: 20px">备注：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value8"></el-input></div></el-col>
        </el-row>
      </el-form-item>

      <el-divider></el-divider>
      <span style="font-family: 黑体; font-weight: bold;font-size: 20px">还款明细</span>
      <el-table :data="tableData" border height="300" style="width: 100%" class="el-table">
        <el-table-column prop="zcbid" label="资产包ID" width="250"></el-table-column>
        <el-table-column prop="jjh" label="借据号" width="250"></el-table-column>
        <el-table-column prop="zwr" label="债务人" width="150"></el-table-column>
        <el-table-column prop="jyrbj" label="交易日本金" width="150"></el-table-column>
        <el-table-column prop="jyrlx" label="交易日利息" width="150"></el-table-column>
        <el-table-column prop="qtfy" label="其他费用" width="150"></el-table-column>
        <el-table-column prop="zqze" label="债权总额" width="150"></el-table-column>
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
  name: "assetPackInfo",
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
      options1:[{
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
        zqze:'',
        qtfy:'',
        jyrlx:'',
        jyrbj:'',
        zwr:'',
        jjh:'',
        zcbid:''
      }]
    }
  },
  methods:{
    reset(){
      this.form1 = this.$options.data().form1
    },
    addAsset(){
      this.$router.replace('/creditInfo/assetPackage/assetPackAdd')
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