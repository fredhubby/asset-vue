<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">查询统计</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">破产债权</el-breadcrumb-item>
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
        <el-col :span="2"><div class="grid-content1" >破产企业：</div></el-col>
        <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value1"></el-input></div></el-col>
        <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">破产受理日：</div></el-col>
        <el-col :span="7"><div class="grid-content2" style="text-align: start">
          <el-date-picker
              v-model="form1.solveTime"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions">
          </el-date-picker>
        </div></el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-row class="el-row3">
        <el-col :span="2"><div class="grid-content1">破产受理人：</div></el-col>
        <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value2"></el-input></div></el-col>
        <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">债权申报人：</div></el-col>
        <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value3"></el-input></div></el-col>
      </el-row>
   </el-form-item>
    <el-form-item>
      <el-row class="el-row4">
        <el-col :span="2"><div class="grid-content1">债权性质：</div></el-col>
        <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value4"></el-input></div></el-col>
        <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">申报金额：</div></el-col>
        <el-col :span="7"><div class="grid-content3"><el-input v-model="form1.value5"></el-input></div></el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-row class="el-row5">
        <el-col :span="2"><div class="grid-content1">核减金额：</div></el-col>
        <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value6"></el-input></div></el-col>
        <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">认定金额：</div></el-col>
        <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value7"></el-input></div></el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-row class="el-row6">
        <el-col :span="2"><div class="grid-content1">分配金额：</div></el-col>
        <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value8"></el-input></div></el-col>
        <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">联系人及电话：</div></el-col>
        <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value9"></el-input></div></el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-row class="el-row7">
        <el-col :span="2"><div class="grid-content1">备注：</div></el-col>
        <el-col :span="7"><div class="grid-content2">
          <el-input v-model="form1.value10" type="textarea"
                    autosize
                    maxlength="100"></el-input>
        </div></el-col>
      </el-row>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  name: "addCrashedCreditInfo",
  data(){
    return{
      form1:{
        value:'',
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
      solveTime: ''
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      }
    }
  },
  methods: {
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
  margin-top: 40px;
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
.el-row3, .el-row4, .el-row5,.el-row6,.el-row7{
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
