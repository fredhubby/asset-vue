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

    <el-form style="margin-top: 15px" ref="form1" :model="form1">
      <span class="span1">诉前阶段</span>
      <el-form-item>
        <el-row style="margin-top: 15px">
          <el-col :span="2"><div class="grid-content1" >借款到期日：</div></el-col>
          <el-col :span="7"><div class="grid-content2" style="text-align: start">
            <el-date-picker
                v-model="form1.value1"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
            </el-date-picker>
          </div></el-col>
          <el-col :span="2"><div class="grid-content1">保证期限：</div></el-col>
          <el-col :span="7"><div class="grid-content2" style="text-align: start">
            <el-date-picker
                v-model="form1.value2"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
            </el-date-picker>
          </div></el-col>
        </el-row>
        <el-row class="el-row3">
          <el-col :span="2"><div class="grid-content1">担保期限：</div></el-col>
          <el-col :span="7"><div class="grid-content2" style="text-align: start">
            <el-date-picker
                v-model="form1.value3"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
            </el-date-picker>
          </div></el-col>
          <el-col :span="2"><div class="grid-content1" >备注：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value4" clearable></el-input></div></el-col>
        </el-row>
        <el-row class="el-row4">
          <el-col :span="2"><div class="grid-content1" >借据号：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value5" clearable></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-divider></el-divider>
      <span class="span1">一审审理</span>
      <el-form-item style="margin-top: 15px">
        <el-row class="el-row5">
          <el-col :span="2"><div class="grid-content1" >案号：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value6" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >审理法院：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value7" clearable></el-input></div></el-col>
        </el-row>
        <el-row class="el-row6">
          <el-col :span="2"><div class="grid-content1" >审理法官：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value8" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >备注：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value9" clearable></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <span class="span2">一审审理对象</span>
      <el-form-item label="借据1：" style="margin-top: 20px;margin-left: 35px">
        <el-input v-model="formLabelAlign.list1" clearable style="width: 40%"></el-input><i class="el-icon-remove"></i>
      </el-form-item>
      <el-form-item label="借据2：" style="margin-left: 35px">
        <el-input v-model="formLabelAlign.list2" clearable style="width: 40%"></el-input><i class="el-icon-circle-plus"></i><i class="el-icon-remove"></i>
      </el-form-item>

      <el-divider></el-divider>
      <span class="span1">一审判决中</span>
      <el-form-item style="margin-top: 15px">
        <el-row class="el-row7">
          <el-col :span="2"><div class="grid-content1" >生效期：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value10" placeholder="15" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >判决生效日：</div></el-col>
          <el-col :span="7"><div class="grid-content2" style="text-align: start">
            <el-date-picker
                v-model="form1.value11"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
            </el-date-picker>
          </div></el-col>
        </el-row>
        <el-row class="el-row8">
          <el-col :span="2"><div class="grid-content1" >申请截止日：</div></el-col>
          <el-col :span="7"><div class="grid-content2" style="text-align: start">
            <el-date-picker
                v-model="form1.value12"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
            </el-date-picker>
          </div></el-col>
          <el-col :span="2"><div class="grid-content1" >备注：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value13" clearable></el-input></div></el-col>
        </el-row>
      </el-form-item>

      <el-divider></el-divider>
      <span class="span1">申请执行</span>
      <el-form-item style="margin-top: 15px">
        <el-row class="el-row7">
          <el-col :span="2"><div class="grid-content1" >执行时效：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value14" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >申请执行日：</div></el-col>
          <el-col :span="7"><div class="grid-content2" style="text-align: start">
            <el-date-picker
                v-model="form1.value15"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
            </el-date-picker>
          </div></el-col>
        </el-row>
        <el-row class="el-row8">
          <el-col :span="2"><div class="grid-content1" >执行时效截止日：</div></el-col>
          <el-col :span="7"><div class="grid-content2" style="text-align: start">
            <el-date-picker
                v-model="form1.value16"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
            </el-date-picker>
          </div></el-col>
          <el-col :span="2"><div class="grid-content1" >备注：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value17" clearable></el-input></div></el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "xqJudicial",
  data(){
    return{
      activeIndex: '5',
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
        value10:'15天',
        value11:'',
        value12:'',
        value13:'',
        value14:'2年',
        value15:'',
        value16:'',
        value17:''
      },
      formLabelAlign:{
        list1: '',
        list2: ''
      },
      pickerOptions:[]
    }
  },
  methods:{
    reset(){
      this.form1 = this.$options.data().form1;
      this.formLabelAlign =this.$options.data().formLabelAlign
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
  margin-left: 20px;
}
.span2{
  font-size: 18px;
  font-weight: bold;
  font-family: 黑体;
  margin-left: 30px;
}
.grid-content1{
  background-color: #DCDFE6;
  text-align: end;
}
.el-icon-circle-plus,.el-icon-remove{
  font-size: 150%;
}
</style>