<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/timeRemider"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">查询统计</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">分期还款企业名单</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="el-row1">
      <el-col :span="24">
        <div class="grid-content">
          <el-popconfirm
              title="确定提交？"
              style="margin-right: 40px;margin-left: 20px"
              @confirm="submit">
            <el-button type="primary" slot="reference">提交</el-button>
          </el-popconfirm>
        </div>
      </el-col>
    </el-row>

    <el-form style="margin-top: 40px" ref="form" :model="form" label-width="140px" :rules="rules">
      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label='债务人' class="form_item" prop="obligor">
            <el-input v-model="form.obligor" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label='债权人' class="form_item" prop="creditor">
            <el-select v-model="form.creditor" filterable placeholder="请选择" style="width: 100%">
              <el-option v-for="item in creditor_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label='应还本金(元)' class="form_item" prop="payablePrincipal">
            <el-input v-model="form.payablePrincipal" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="还款期限" class="form_item" prop="repaymentTerm">
            <el-input v-model="form.repaymentTerm" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="实际控制人或关键人" class="form_item" prop="actualController">
            <el-input v-model="form.actualController" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="还款是否结清：" class="form_item" prop="repaymentStatus">
            <el-select v-model="form.repaymentStatus" clearable filterable placeholder="请选择" style="width: 100%">
              <el-option
                  v-for="item in isEnd_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="备注" class="form_item">
            <el-input v-model="form.remarks" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "addfqCompanyInfo",
  data(){
    return{
      form:{obligor:'',creditor:'',payablePrincipal:'',repaymentTerm:'',actualController:'',repaymentStatus:'',remarks:''},
      rules:{
        obligor: {required:true,message:'不允许为空',trigger:['change','blur']},
        creditor: {required:true,message:'不允许为空',trigger:['change','blur']},
        payablePrincipal: [{required:true,message:'不允许为空',trigger:['change','blur']},{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']}],
        repaymentStatus:{required:true,message:'不允许为空',trigger:['change','blur']},
      },
      creditor_options: [
        {value: '天惠投资', label: '天惠投资'},
        {value: '天晟投资', label: '天晟投资'},
        {value: '天工惠农小贷', label: '天工惠农小贷'},
        {value: '银润小贷', label: '银润小贷'},
        {value: '阳光企业', label: '阳光企业'}],
      isEnd_options:[
        {value:'0',label:'否'},
        {value:'1',label:'是'}
      ]
    }
  },
  methods:{
    submit(){
      this.$refs['form'].validate((valid) => {
        if(valid){
          let isNull = true;
          for(let prop in this.form){
            if(this.form[prop]!==''){
              isNull = false;
            }
          }
          if(isNull){
            alert('内容为空');
          }
          else{
            let sent_data = JSON.parse(JSON.stringify(this.form));
            sent_data['deleteFlag'] = 0;
            api({
              url: "Installments/addInstallment",
              method: "post",
              data:sent_data
            }).then(data => {
              console.log(data);
              this.$router.replace('/totalSearch/fqCompany')
            }).catch(err => {
              console.log(err);
            })
          }
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
  text-align: end;
}
.el-table{
  margin-top: 20px;
}
</style>