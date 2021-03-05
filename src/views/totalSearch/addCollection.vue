<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">查询统计</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">催收公告管理</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">催收公告录入</el-breadcrumb-item>
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

    <el-form :label-position="labelPosition" :model="formLabelAlign" label-width="150px">
      <el-form-item label="债务人：" style="margin-top: 30px">
        <el-input v-model="formLabelAlign.value" clearable style="width: 30%"></el-input>
      </el-form-item>
      <el-form-item label="债权人：">
        <el-select v-model="formLabelAlign.value1" clearable filterable placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="原债权人：">
        <el-select v-model="formLabelAlign.value2" clearable filterable placeholder="请选择">
          <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-divider></el-divider>
      <span class="span1">催收借据</span>
      <el-form-item label="借据1：" style="margin-top: 20px">
        <el-input v-model="formLabelAlign.list1" clearable style="width: 40%"></el-input><i class="el-icon-remove"></i>
      </el-form-item>
      <el-form-item label="借据2：">
        <el-input v-model="formLabelAlign.list2" clearable style="width: 40%"></el-input><i class="el-icon-circle-plus"></i><i class="el-icon-remove"></i>
      </el-form-item>

      <el-divider></el-divider>
      <span class="span1">催收公告日</span>
      <el-form-item label="公告日1：" style="margin-top: 20px">
        <el-date-picker
            clearable
            v-model="formLabelAlign.date1"
            type="date"
            placeholder="选择日期">
        </el-date-picker><i class="el-icon-remove"></i>
      </el-form-item>
      <el-form-item label="公告日2：">
        <el-date-picker
            clearable
            v-model="formLabelAlign.date2"
            type="date"
            placeholder="选择日期">
        </el-date-picker><i class="el-icon-remove"></i>
      </el-form-item>
      <el-form-item label="最新公告日：">
        <el-date-picker
            clearable
            v-model="formLabelAlign.date3"
            type="date"
            placeholder="选择日期">
        </el-date-picker><i class="el-icon-circle-plus"></i><i class="el-icon-remove"></i>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "addCollection",
  data(){
    return{
      labelPosition: 'right',
      formLabelAlign: {
        value: '',
        value1: '',
        value2: '',
        list1:'',
        list2:'',
        date1:'',
        date2:'',
        date3:''
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
  margin-top: 40px;
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
  margin-left: 30px;
}
.el-icon-circle-plus,.el-icon-remove{
  font-size: 150%;
}
</style>