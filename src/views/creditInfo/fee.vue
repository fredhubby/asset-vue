<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/timeRemider"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权费用信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="el-row1">
      <el-col :span="24">
        <div class="grid-content">
          <el-button @click="reset">清空</el-button>
          <el-popconfirm
              title="确定提交？"
              style="margin-right: 40px;margin-left: 20px"
              @confirm="submit">
            <el-button type="primary" slot="reference">提交</el-button>
          </el-popconfirm>
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
      <el-menu-item index="3">
        债权费用信息
      </el-menu-item>
    </el-menu>


    <el-form style="margin-top: 15px" ref="form1" :model="form1" label-width="130px" :rules="rules">
      <el-row :gutter="60" style="margin-top: 30px">
        <el-col :span="9" :offset="1">
          <el-form-item label="费用类型：" class="form_item" prop="form_feeType">
            <el-select v-model="form1.form_feeType" clearable placeholder="请选择" style="width: 100%">
              <el-option
                  v-for="item in fee_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="费用(元):" class="form_item" prop="form_fee">
            <el-input v-model="form1.form_fee" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="费用支付日期：" class="form_item" prop="form_paidDate">
            <el-date-picker
                v-model="form1.form_paidDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider></el-divider>
      <span style="font-family: 黑体;font-size: 18px">借据号</span>
      <el-form-item
          v-for="(iou, index) in form1.form_ious"
          :label="'借据号' + index"
          :key="iou.key"
          :prop="'form_ious.' + index + '.value'"
          :rules="{required:true,message:'不能为空',trigger:['change','blur']}"
          style="margin-top: 20px;margin-left: 200px">
        <el-input v-model="iou.value" style="width: 30%"></el-input>
        <el-button
            @click.prevent="removeIou(iou)"
            icon="el-icon-delete"
            circle
            type="danger"
            style="margin-left: 20px">
        </el-button>
      </el-form-item>
      <el-form-item style="margin-left: 200px">
        <el-button type="primary" @click="addIou">新增借据</el-button>
        <el-button @click="resetIou">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "fee",
  data(){
    return{
      activeIndex: '3',
      form1:{
        form_feeType:'',
        form_fee:'',
        form_ious:[{key:'',value:''}],
        form_paidDate:''
      },
      fee_options:[
        {value:'0', label:'受让前诉讼费'},
        {value:'1', label:'受让前保全费'},
        {value:'2', label:'受让前执行费'},
        {value:'3', label:'受让前代理费'},
        {value:'4', label:'受让前其它费'},
        {value:'5', label:'受让后诉讼费'},
        {value:'6', label:'受让后保全费'},
        {value:'7', label:'受让后执行费'},
        {value:'8', label:'受让后代理费'},
        {value:'9', label:'受让后其它费'},
        {value:'10', label:'债权支付对价'}],
      temp_iouId:0,
      rules:{
        form_feeType:[{required: true,message: '不能为空',trigger:['change','blur']}],
        form_fee:[{required: true,message: '不能为空',trigger:['change','blur']},{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']}],
      }
    }
  },
  created() {
    this.initIou();
  },
  methods:{
    reset(){
      this.form1={
        form_feeType:'',
        form_fee:'',
        form_ious:[{key:'',value:''}],
        form_paidDate:''
      };
      this.initIou();
    },
    initIou(){
      this.form1.form_ious=[];
      let i;
      let str;
      let x=JSON.parse(this.$route.query.creditList);
      for (i=0;i<x.length;i++){
        str=x[i].replace(/^\s+|\s+$/g,"");
        this.form1.form_ious.push({key:this.getTempIouId(),value: str});
      }
    },
    getTempIouId(){
      this.temp_iouId++;
      return  this.temp_iouId;
    },
    addIou(){
      this.form1.form_ious.push({key:this.getTempIouId(),value: ''});
    },
    removeIou(iou){
      var index = this.form1.form_ious.indexOf(iou);
      if (index !== -1) {
        this.form1.form_ious.splice(index, 1);
      }
    },
    resetIou(){
      this.form1.form_ious=[{key:this.getTempIouId(),value: ''}];
    },
    submit(){
      var _this = this;
      this.$refs['form1'].validate((valid) => {
        if(valid){
          let fee = {'0':null,'1':null,'2':null,'3':null,'4':null,'5':null,'6':null,'7':null,'8':null,'9':null,'10':null};
          fee[this.form1.form_feeType]=this.form1.form_fee;
          let iouList = []
          for(let i=0;i<this.form1.form_ious.length;i++){
            iouList.push(this.form1.form_ious[i].value);
          }
          let send_data = [{
            preAssignmentExecutionFee: fee['2'],
            preAssignmentLitigationFee: fee['0'],
            preAssignmentPreservationFee: fee['1'],
            preAssignmentOtherFee: fee['4'],
            preAssignmentAgencyFee:fee['3'],
            postAssignmentExecutionFee: fee['7'],
            postAssignmentLitigationFee: fee['5'],
            postAssignmentPreservationFee: fee['6'],
            postAssignmentOtherFee: fee['9'],
            postAssignmentAgencyFee:fee['8'],
            debtPayment: fee['10'],
            debtPaymentDate: null,
            paidDate: _this.form1.form_paidDate,
            iouIdList:iouList,
            deleteFlag: 0
          }]
          console.log(send_data)
          api({
            url: "/Fee/addFee",
            method: "post",
            data:send_data
          }).then(data => {
            console.log(data);
            if(data.data.success){
              this.$router.replace({path:'/creditInfo/creditFinfo/xqFee',query:{iou:iouList[0]}});
            }
            else{
              this.$message(data.data.msg)
            }

          }).catch(err => {
            console.log(err);
          })
        }
        else{
          console.log('err submit')
          return false;
        }
      })
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
</style>