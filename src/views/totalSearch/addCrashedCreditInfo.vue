<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/timeRemider"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">查询统计</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">破产债权</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="el-row1">
      <el-col :span="24">
        <div class="grid-content">
          <el-button @click="reset('form1')">清空</el-button>
          <el-popconfirm
              title="确定提交？"
              style="margin-right: 40px;margin-left: 20px"
              @confirm="submit">
            <el-button type="primary" slot="reference">提交</el-button>
          </el-popconfirm>
        </div>
      </el-col>
    </el-row>

  <el-form ref="form1" :model="form1" :rules="rules">
    <el-form-item style="margin-left: 20px;margin-top: 20px">
      <el-row>
        <el-col :span="2"><div class="grid-content1">破产企业：</div></el-col>
        <el-col :span="7"><el-form-item class="grid-content2" prop="bustEnterprise"><el-input style="width: 70%" v-model="form1.bustEnterprise" clearable></el-input></el-form-item></el-col>
        <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">破产受理日：</div></el-col>
        <el-col :span="7"><el-form-item class="grid-content2" prop="bankruptcyAcceptanceDate">
          <el-date-picker
              v-model="form1.bankruptcyAcceptanceDate"
              align="right"
              type="date"
              placeholder="选择日期"
              style="width: 70%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item></el-col>
      </el-row>
    </el-form-item>
    <el-form-item style="margin-left: 20px">
      <el-row>
        <el-col :span="2"><div class="grid-content1">破产管理人：</div></el-col>
        <el-col :span="7"><el-form-item class="grid-content2" prop="bankruptcyAdministrator"><el-input style="width: 70%" v-model="form1.bankruptcyAdministrator" clearable></el-input></el-form-item></el-col>
        <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">债权申报人：</div></el-col>
        <el-col :span="7"><el-form-item class="grid-content2" prop="claimsDeclarant"><el-input style="width: 70%" v-model="form1.claimsDeclarant" clearable></el-input></el-form-item></el-col>
      </el-row>
   </el-form-item>
    <el-form-item style="margin-left: 20px">
      <el-row>
        <el-col :span="2"><div class="grid-content1">债权性质：</div></el-col>
        <el-col :span="7"><el-form-item class="grid-content2" prop="claimsProperties"><el-input style="width: 70%" v-model="form1.claimsProperties" clearable></el-input></el-form-item></el-col>
        <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">申报金额(元)：</div></el-col>
        <el-col :span="7"><el-form-item class="grid-content3" prop="declaredAmount"><el-input style="width: 70%" v-model="form1.declaredAmount" clearable></el-input></el-form-item></el-col>
      </el-row>
    </el-form-item>
    <el-form-item style="margin-left: 20px">
      <el-row>
        <el-col :span="2"><div class="grid-content1">核减金额(元)：</div></el-col>
        <el-col :span="7"><el-form-item class="grid-content2" prop="deductionAmount"><el-input style="width: 70%" v-model="form1.deductionAmount" clearable></el-input></el-form-item></el-col>
        <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">认定金额(元)：</div></el-col>
        <el-col :span="7"><el-form-item class="grid-content2" prop="recognizedAmount"><el-input style="width: 70%" v-model="form1.recognizedAmount" clearable></el-input></el-form-item></el-col>
      </el-row>
    </el-form-item>
    <el-form-item style="margin-left: 20px">
      <el-row>
        <el-col :span="2"><div class="grid-content1">分配金额(元)：</div></el-col>
        <el-col :span="7"><el-form-item class="grid-content2" prop="allocationAmount"><el-input style="width: 70%" v-model="form1.allocationAmount" clearable></el-input></el-form-item></el-col>
        <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">联系人姓名：</div></el-col>
        <el-col :span="7"><el-form-item class="grid-content2" prop="contacts"><el-input style="width: 70%" v-model="form1.contacts" clearable></el-input></el-form-item></el-col>
      </el-row>
    </el-form-item>
    <el-form-item style="margin-left: 20px">
      <el-row>
        <el-col :span="2"><div class="grid-content1">联系人电话：</div></el-col>
        <el-col :span="7"><el-form-item class="grid-content2" prop="contactNumber"><el-input style="width: 70%" v-model="form1.contactNumber" clearable></el-input></el-form-item></el-col>
        <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">备注：</div></el-col>
        <el-col :span="7"><el-form-item class="grid-content2" prop="remarks">
          <el-input v-model="form1.remarks" type="textarea" style="width: 70%"
                    autosize
                    maxlength="100"></el-input>
        </el-form-item></el-col>
      </el-row>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "addCrashedCreditInfo",
  data(){
    return{
      form1:{
        bustEnterprise:'',
        bankruptcyAcceptanceDate:'',
        bankruptcyAdministrator:'',
        claimsDeclarant:'',
        claimsProperties:'',
        declaredAmount:'',
        deductionAmount:'',
        recognizedAmount:'',
        allocationAmount:'',
        contacts:'',
        contactNumber:'',
        remarks: ''
      },
      rules:{
        bustEnterprise:{required:true,message:'不允许为空',trigger:['change','blur']},
        declaredAmount:{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']},
        deductionAmount:{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']},
        recognizedAmount:{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']},
        allocationAmount:{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']},
        contactNumber:{pattern:/^(0\d{2,3}-\d{7,8})|(1\d\d{9})$/,message:'不符合号码格式',trigger:['blur']},
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
  },
    submit(){
      var _this = this;
      this.$refs['form1'].validate((valid) => {
        if(valid){
          api({
            url: "/CrashedCredit/addCrashedCredit",
            method: "post",
            data:{
              bustEnterprise:_this.form1.bustEnterprise,
              bankruptcyAcceptanceDate:_this.form1.bankruptcyAcceptanceDate,
              bankruptcyAdministrator:_this.form1.bankruptcyAdministrator,
              claimsDeclarant:_this.form1.claimsDeclarant,
              claimsProperties:_this.form1.claimsProperties,
              declaredAmount:_this.form1.declaredAmount,
              deductionAmount:_this.form1.deductionAmount,
              recognizedAmount:_this.form1.recognizedAmount,
              allocationAmount:_this.form1.allocationAmount,
              contacts:_this.form1.contacts,
              contactNumber:_this.form1.contactNumber,
              remarks:_this.form1.remarks
            }
          }).then(data => {
            console.log(data);
            this.$router.replace('/totalSearch/crashedCredit');
          }).catch(err => {
            console.log(err);
          })
        }
        else{
          this.$message('请检查提交内容')
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
  text-align: start;
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
  text-align: end;
}
.el-table{
  margin-top: 20px;
}
</style>
