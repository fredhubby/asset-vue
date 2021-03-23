<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
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

    <el-form style="margin-top: 40px" ref="form1" :model="form1" label-width="130px">
      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label='借据号：' class="form_item" :error="form1_error.form_id">
            <el-input v-model="form1.form_id" clearable @input="id_input_change"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label='合同号：' class="form_item">
            <el-input v-model="form1.form_contractNo" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label='债权类别：' class="form_item">
            <el-select v-model="form1.form_claimsType" filterable placeholder="请选择" @change="claimType_change" style="width: 100%">
              <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="资产包：" class="form_item">
            <el-input v-model="form1.form_assetPackageId" clearable :disabled="Boolean(form1.form_claimsType!=='2')">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="债权人：" class="form_item">
            <el-select v-model="form1.form_creditor" clearable filterable placeholder="请选择" style="width: 100%">
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
          <el-form-item label="原债权人：" class="form_item">
            <el-select v-model="form1.form_originalCreditor" clearable filterable placeholder="请选择" style="width: 100%">
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
          <el-form-item label="债务人：" class="form_item">
            <el-input v-model="form1.form_obligor" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="所在镇区：" class="form_item">
            <el-select v-model="form1.form_region" clearable filterable placeholder="请选择" style="width: 100%">
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
          <el-form-item label="借款日：" class="form_item">
            <el-date-picker
                v-model="form1.form_loanCompensationDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="借款到期日：" class="form_item">
            <el-date-picker
                v-model="form1.form_loanCompensationDueDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="借款本金：" class="form_item">
            <el-input v-model="form1.form_principalOfLoan" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="借款利息：" class="form_item">
            <el-input v-model="form1.form_loanInterest" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="借款年利率：" class="form_item">
            <el-input v-model="form1.form_annualInterestRate" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="逾期罚款利率：" class="form_item">
            <el-input v-model="form1.form_penaltyAnnualInterestRate" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="交易基准日：" class="form_item">
            <el-date-picker
                v-model="form1.form_tradingBaseDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%">
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
      options3: [{
        value: '2',
        label: '资产包'
      }, {
        value: '1',
        label: '小贷公司'
      }],
      form1: {
        form_id: '',
        form_contractNo: '',
        form_claimsType: this.$route.query.claimType==='资产包' ? '2' : '',
        form_assetPackageId: this.$route.query.assetPackageId,
        form_creditor: '',
        form_originalCreditor: '',
        form_obligor: '',
        form_region: '',
        form_loanCompensationDate: '',
        form_loanCompensationDueDate: '',
        form_principalOfLoan: '',
        form_loanInterest: '',
        form_annualInterestRate:'',
        form_penaltyAnnualInterestRate: '',
        form_tradingBaseDate: ''
      },
      form1_error:{
        form_id: '',
      },
      pickerOptions:[]
    }
  },
  methods:{
    reset(){
      this.form1={
        form_id: '',
        form_contractNo: '',
        form_claimsType: this.$route.query.claimType==='资产包' ? '2' : '',
        form_assetPackageId: this.$route.query.assetPackageId,
        form_creditor: '',
        form_originalCreditor: '',
        form_obligor: '',
        form_region: '',
        form_loanCompensationDate: '',
        form_loanCompensationDueDate: '',
        form_principalOfLoan: '',
        form_loanInterest: '',
        form_annualInterestRate:'',
        form_penaltyAnnualInterestRate: '',
        form_tradingBaseDate: ''
      };
    },
    claimType_change(){

    },
    submit(){
      var _this = this;
      api({
        url: "CreditInfo/addFundamentalCredit",
        method: "post",
        data:{
          id:_this.form1.form_id,
          contractNo:_this.form1.form_contractNo,
          assetPackageId:_this.form1.form_assetPackageId,
          obligor:_this.form1.form_obligor,
          region:_this.form1.form_region,
          creditor:_this.form1.form_creditor,
          originalCreditor:_this.form1.form_originalCreditor,
          claimsType:_this.form1.form_claimsType,
          loanCompensationDate:_this.form1.form_loanCompensationDate,
          loanCompensationDueDate:_this.form1.form_loanCompensationDueDate,
          principalOfLoan:_this.form1.form_principalOfLoan,
          annualInterestRate:_this.form1.form_annualInterestRate,
          penaltyAnnualInterestRate:_this.form1.form_penaltyAnnualInterestRate,
          loanInterest:_this.form1.form_loanInterest,
          tradingBaseDate:_this.form1.form_tradingBaseDate,
        }
      }).then(data => {
        console.log(data);
        if(data.data.msg==='借据号重复！') {
          this.form1_error.form_id = '';
          this.form1_error.form_id = '借据号已存在';
        }
        else{
          this.$router.replace('/creditInfo/creditFinfo/creditMenu')
        }
      }).catch(err => {
        console.log(err);
      })
    },
    id_input_change(){
      this.form1_error.form_id='';
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
