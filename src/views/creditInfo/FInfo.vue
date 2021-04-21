<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/timeRemider"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权基本信息</el-breadcrumb-item>
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
      <el-menu-item index="1">
<!--        <router-link to="/creditInfo/Finfo">债权基本信息</router-link>-->
        债权基本信息
      </el-menu-item>
<!--      <el-menu-item index="2">-->
<!--        <router-link to="/creditInfo/SMortgage">担保抵押信息</router-link>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="3">-->
<!--        <router-link to="/creditInfo/fee">债权费用信息</router-link>-->
<!--      </el-menu-item>-->
    </el-menu>

    <el-form style="margin-top: 40px" ref="form1" :model="form1" :rules="rules" label-width="130px">
      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label='借据号：' class="form_item" prop="iouId">
            <el-input v-model="form1.iouId" clearable @input="id_input_change"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label='合同号：' class="form_item" prop="contractNo">
            <el-input v-model="form1.contractNo" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label='债权类别：' class="form_item" prop="claimsType">
            <el-select v-model="form1.claimsType" filterable placeholder="请选择" @change="claimType_change" style="width: 100%">
              <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="资产包：" class="form_item" prop="assetPackageId" :rules="[{required:form1.claimsType==='2',message:' ',trigger:['blur','change']}]">
            <el-input v-model="form1.assetPackageId" clearable :disabled="Boolean(form1.claimsType!=='2')">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="债权人：" class="form_item" prop="creditor">
            <el-select v-model="form1.creditor" clearable filterable placeholder="请选择" style="width: 100%">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="原债权人：" class="form_item" prop="originalCreditor">
            <el-select v-model="form1.originalCreditor" clearable filterable placeholder="请选择" style="width: 100%">
              <el-option
                  v-for="item in options1"
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
          <el-form-item label="债务人：" class="form_item" prop="obligor">
            <el-input v-model="form1.obligor" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="所在镇区：" class="form_item" prop="region">
            <el-select v-model="form1.region" clearable filterable placeholder="请选择" style="width: 100%">
              <el-option
                  v-for="item in options2"
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
          <el-form-item label="借款日：" class="form_item" prop="loanCompensationDate">
            <el-date-picker
                v-model="form1.loanCompensationDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="借款到期日：" class="form_item" prop="loanCompensationDueDate">
            <el-date-picker
                v-model="form1.loanCompensationDueDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="借款本金(元)：" class="form_item" prop="principalOfLoan">
            <el-input v-model="form1.principalOfLoan" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="借款利息(元)：" class="form_item" prop="loanInterest">
            <el-input v-model="form1.loanInterest" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="借款年利率(%)：" class="form_item" prop="annualInterestRate">
            <el-input v-model="form1.annualInterestRate" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="逾期罚款利率(%)：" label-width="135px" class="form_item" prop="penaltyAnnualInterestRate">
            <el-input v-model="form1.penaltyAnnualInterestRate" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="交易基准日：" class="form_item" prop="tradingBaseDate">
            <el-date-picker
                v-model="form1.tradingBaseDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "FInfo",
  data() {
    return {
      require_params:{},
      activeIndex: '1',
      options: [
        {value: '天惠投资', label: '天惠投资'},
        {value: '天晟投资', label: '天晟投资'},
        {value: '天工惠农小贷', label: '天工惠农小贷'},
        {value: '银润小贷', label: '银润小贷'},
        {value: '阳光企业', label: '阳光企业'}],
      options1: [
        {value: '丹阳工行', label: '丹阳工行'}, {value: '丹阳农行', label: '丹阳农行'},
        {value: '丹阳中行', label: '丹阳中行'}, {value: '丹阳建行', label: '丹阳建行'},
        {value: '丹阳交行', label: '丹阳交行'}, {value: '丹阳农发行', label: '丹阳农发行'},
        {value: '丹阳农商行', label: '丹阳农商行'}, {value: '丹阳江苏', label: '丹阳江苏'},
        {value: '丹阳保得', label: '丹阳保得'}, {value: '丹阳华夏', label: '丹阳华夏'},
        {value: '丹阳民生', label: '丹阳民生'}, {value: '丹阳浦发', label: '丹阳浦发'},
        {value: '丹阳招商', label: '丹阳招商'}, {value: '丹阳中信', label: '丹阳中信'},
        {value: '丹阳兴业', label: '丹阳兴业'}, {value: '丹阳南京', label: '丹阳南京'},
        {value: '丹阳紫金农商', label: '丹阳紫金农商'}, {value: '丹阳广发', label: '丹阳广发'},
        {value: '丹阳储蓄', label: '丹阳储蓄'}],
      options2: [
        {value: '云阳镇', label: '云阳镇'}, {value: '开发区', label: '开发区'},
        {value: '新桥镇', label: '新桥镇'}, {value: '后巷镇', label: '后巷镇'},
        {value: '界牌镇', label: '界牌镇'}, {value: '陴城镇', label: '陴城镇'},
        {value: '访仙镇', label: '访仙镇'}, {value: '吕城镇', label: '吕城镇'},
        {value: '陵口镇', label: '陵口镇'}, {value: '珥陵镇', label: '珥陵镇'},
        {value: '导墅镇', label: '导墅镇'}, {value: '皇堂镇', label: '皇堂镇'},
        {value: '延陵镇', label: '延陵镇'}],
      options3: [
        {value: '2', label: '资产包'},
        {value: '1', label: '小贷公司'},
        {value: '0', label: '阳光担保'}],
      form1: {
        iouId: '',
        contractNo: '',
        claimsType: '',
        assetPackageId: '',
        creditor: '',
        originalCreditor: '',
        obligor: '',
        region: '',
        loanCompensationDate: '',
        loanCompensationDueDate: '',
        principalOfLoan: '',
        loanInterest: '',
        annualInterestRate:'',
        penaltyAnnualInterestRate: '',
        tradingBaseDate: ''
      },
      rules:{
        contractNo:[
          {required:true,message:'请输入合同号',trigger:'blur'},
        ],
        // iouId: [],
        claimsType: [{required:true,message:'请输入债权类型',trigger:'blur'}],
        creditor: [{required:true,message:'请输入债权人',trigger:'blur'}],
        originalCreditor: [{required:true,message:'请输入原债权人',trigger:'blur'}],
        obligor: [{required:true,message:'请输入债务人',trigger:'blur'}],
        loanCompensationDate: [{required:true,message:'不允许为空',trigger:'blur'}],
        loanCompensationDueDate: [{required:true,message:'不允许为空',trigger:'blur'}],
        principalOfLoan: [{required:true,message:'不允许为空',trigger:'blur'},{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:'blur'}],
        loanInterest: [{required:true,message:'不允许为空',trigger:'blur'},{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:'blur'}],
        annualInterestRate:[{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:'blur'}],
        penaltyAnnualInterestRate: [{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:'blur'}],
      },
      form1_error:{
        iouId: '',
      },
      pickerOptions:[]
    }
  },
  created() {
    //解析传过来的参数
    console.log(this.$route.query.data)
    if(typeof this.$route.query.data !=='undefined' && this.$route.query.data !=='' && this.$route.query.data !== null){
      this.parseParams(JSON.parse(this.$route.query.data));
    }
  },
  methods:{
    parseParams(data){
      for(let prop in data){
        if(this.form1.hasOwnProperty(prop)){
          this.form1[prop] = data[prop];
        }
      }
    },
    reset(){
      this.form1={
        iouId: '',
        contractNo: '',
        claimsType: this.$route.query.claimType==='资产包' ? '2' : '',
        assetPackageId: this.$route.query.assetPackageId,
        creditor: '',
        originalCreditor: '',
        obligor: '',
        region: '',
        loanCompensationDate: '',
        loanCompensationDueDate: '',
        principalOfLoan: '',
        loanInterest: '',
        annualInterestRate:'',
        penaltyAnnualInterestRate: '',
        tradingBaseDate: ''
      };
    },
    claimType_change(){
      this.form1.assetPackageId = '';
    },
    submit(){
      var _this = this;
      this.$refs['form1'].validate((valid) => {
        if(valid){
          api({
            url: "CreditInfo/addFundamentalCredit",
            method: "post",
            data:{
              iouId:_this.form1.iouId,
              contractNo:_this.form1.contractNo,
              assetPackageId:_this.form1.assetPackageId,
              obligor:_this.form1.obligor,
              region:_this.form1.region,
              creditor:_this.form1.creditor,
              originalCreditor:_this.form1.originalCreditor,
              claimsType:_this.form1.claimsType,
              loanCompensationDate:_this.form1.loanCompensationDate,
              loanCompensationDueDate:_this.form1.loanCompensationDueDate,
              principalOfLoan:_this.form1.principalOfLoan,
              annualInterestRate:_this.form1.annualInterestRate,
              penaltyAnnualInterestRate:_this.form1.penaltyAnnualInterestRate,
              loanInterest:_this.form1.loanInterest,
              tradingBaseDate:_this.form1.tradingBaseDate,
              transferType:1,
              limitationDeleteFlag:1,
              urgeDeleteFlag:1
            }
          }).then(data => {
            console.log(data);
            if(!data.data.success){
              this.$message(data.data.msg)
            }
            else{
              this.$router.replace('/creditInfo/creditFinfo/creditMenu')
            }
            // if(data.data.msg==='借据号重复！') {
            //   this.$message('借据号已存在,提交失败')
            // }
            // else{
            //   this.$router.replace('/creditInfo/creditFinfo/creditMenu')
            // }
          }).catch(err => {
            console.log(err);
          })
        }
        else{
          console.log('err submit');
          return false;
        }
      });

    },
    id_input_change(){
      this.form1_error.iouId='';
    },
    ///////////////////////////////////////////////表单验证相关函数/////////////////////////////////////////////////////////
    numCheckBlur(value,prop){
      let pattern = /^\d+(\.\d?\d?)?$/
      if(pattern.test(value)){
        let num = Number(value)
        this.form1[prop] = num.toFixed(2);
      }
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


</style>