<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权基础信息</el-breadcrumb-item>
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
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#b2bec3"
        text-color="#333"
        active-text-color="#409eff">
      <el-menu-item index="1">
        <router-link to="/creditInfo/creditFinfo/xqCreditFinfo">债权基本信息</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/creditInfo/creditFinfo/xqSmortgage">担保抵押信息</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/creditInfo/creditFinfo/xqFee">债权费用信息</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/creditInfo/creditFinfo/xqRecall">债权清收信息</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/creditInfo/creditFinfo/xqJudicature">债权司法信息</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <router-link to="/creditInfo/creditFinfo/xqCollection">债权催收信息</router-link>
      </el-menu-item>
    </el-menu>

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
      <span class="span1">借据对象</span>
      <div>
        <div v-for="(iou,index) in formLabelAlign.iou"
             :key="iou.key" style="margin-top: 20px">
          <el-row :gutter="30">
            <el-col :span="9" :offset="1">
              <el-form-item :label="'借据号'+(index+1)+'：'" class="form_item">
                <el-input v-model="iou.value" clearable style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button @click.prevent="removeIou(iou)" type="danger">删除</el-button>
            </el-col>
          </el-row>
        </div>
        <el-form-item style="margin-left: 15%">
          <el-button type="primary" @click="addIou">新增借据</el-button>
          <el-button @click="resetIou">重置</el-button>
        </el-form-item>
      </div>

      <el-divider></el-divider>
      <span class="span1">催收公告日</span>
      <div>
        <div v-for="(date,index) in formLabelAlign.date"
             :key="date.key" style="margin-top: 20px">
          <el-row :gutter="30">
            <el-col :span="9" :offset="1">
              <el-form-item :label="'公告日'+(index+1)+'：'" class="form_item">
                <el-date-picker
                    v-model="date.value"
                    type="date"
                    placeholder="选择日期"
                    style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button @click.prevent="removeDate(date)" type="danger">删除</el-button>
            </el-col>
          </el-row>
        </div>
        <el-form-item style="margin-left: 15%">
          <el-button type="primary" @click="addDate">新增催收公告日</el-button>
          <el-button @click="resetDate">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "addCollection",
  data(){
    return{
      activeIndex:'6',
      labelPosition: 'right',
      temp_iouId:0,
      temp_dateId:0,
      formLabelAlign: {
        value: '',
        value1: '',
        value2: '',
        iou:[{key:'', value: ''}],
        date:[{key:'', value: ''}]
      },
      options: [
        {value: '天惠投资', label: '天惠投资'},
        {value: '天晟投资', label: '天晟投资'},
        {value: '天工惠农小贷', label: '天工惠农小贷'},
        {value: '银润小贷', label: '银润小贷'},
        {value: '阳光企业', label: '阳光企业'}],
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
      }],
      pickerOptions:[]
    }
  },
  methods:{
    reset(){
      this.formLabelAlign = this.$options.data().formLabelAlign
    },
    //借据对象
    addIou(){
      this.formLabelAlign.iou.push({key:this.getTempIouId,value: ''});
    },
    removeIou(iou){
      var index = this.formLabelAlign.iou.indexOf(iou);
      if (index !== -1) {
        this.formLabelAlign.iou.splice(index, 1);
      }
    },
    resetIou(){
      this.formLabelAlign.iou=[{key:this.getTempIouId, value: ''}];
    },
    //催收公告日
    addDate(){
      this.formLabelAlign.date.push({key:this.getTempDateId,value: ''});
    },
    removeDate(date){
      var index = this.formLabelAlign.date.indexOf(date);
      if (index !== -1) {
        this.formLabelAlign.date.splice(index, 1);
      }
    },
    resetDate(){
      this.formLabelAlign.date=[{key:this.getTempDateId, value: ''}];
    }
  },
  computed:{
    getTempIouId(){
      this.temp_iouId++;
    },
    getTempDateId(){
      this.temp_dateId++;
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
  margin-top: 20px;
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
