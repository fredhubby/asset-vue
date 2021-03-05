<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">资产包</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">资产包录入</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="el-row1">
      <el-col :span="24">
        <div class="grid-content">
          <el-button @click="reset('formLabelAlign')">清空</el-button>
          <el-button>保存</el-button>
          <el-button type="primary">保存并提交</el-button>
        </div>
      </el-col>
    </el-row>

    <el-card class="boxcard1" shadow="hover">
      <div slot="header" class="clearfix">
        <span style="font-family: 宋体; font-weight: bold">新增资产包</span>
      </div>
      <el-form :label-position="labelPosition" :model="formLabelAlign" label-width="150px">
        <el-form-item label="资产包ID">
          <el-input clearable v-model="formLabelAlign.id" style="width: 40%"></el-input>
        </el-form-item>
        <el-form-item label="资产包债权人">
          <el-select v-model="formLabelAlign.value" clearable filterable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产包原债权人">
          <el-select v-model="formLabelAlign.value1" clearable filterable placeholder="请选择">
            <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产包交易基准日">
          <el-date-picker
              v-model="formLabelAlign.date"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="对价费用">
          <el-input clearable v-model="formLabelAlign.fee" style="width: 40%"></el-input>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <span>受让前催收公告</span>
      <el-form :inline="true" :model="formInline" class="form2">
        <el-form-item label="催告方式">
          <el-select v-model="formInline.method">
            <el-option label="省级媒体" value="shengji"></el-option>
            <el-option label="直接送达" value="zhijie"></el-option>
            <el-option label="邮寄送达" value="youji"></el-option>
            <el-option label="本地媒体" value="bendi"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收公告日">
          <el-date-picker
              v-model="formInline.date"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <i class="el-icon-circle-plus" @click="add"></i>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>
export default {
  name: "assetPack-add",
  data(){
    return{
      labelPosition: 'right',
      formLabelAlign: {
        id:'',
        value: '',
        value1:'',
        date:'',
        fee:''
      },
      formInline: {
        method : '',
        date : ''
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
      options1: [{
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
      }]

    }
  },
  methods:{
    add(){
      alert('add')
    },
    reset(){
      this.formLabelAlign = this.$options.data().formLabelAlign
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
.boxcard1{
  margin-top: 40px;
  width: 90%;
}
.form2{
  margin-top: 20px;
  margin-left: 30px;
}
.el-icon-circle-plus{
  font-size: 200%;
}
</style>