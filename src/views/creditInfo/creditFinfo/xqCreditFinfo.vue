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
          <el-button @click="edit">{{edit_label}}</el-button>
          <el-popconfirm
              v-if="allow_edit"
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
        <router-link
            :to="{path:'/creditInfo/creditFinfo/xqCreditFinfo',query:{iou:query_iou}}">债权基本信息</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link
            :to="{path:'/creditInfo/creditFinfo/xqSmortgage',query:{iou:query_iou}}">担保抵押信息</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link
            :to="{path:'/creditInfo/creditFinfo/xqFee',query:{iou:query_iou}}">债权费用信息</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link
            :to="{path:'/creditInfo/creditFinfo/xqRecall',query:{iou:query_iou}}">债权清收信息</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link
            :to="{path:'/creditInfo/creditFinfo/xqJudicature',query:{iou:query_iou}}">债权司法信息</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <router-link
            :to="{path:'/creditInfo/creditFinfo/xqCollection',query:{iou:query_iou}}">债权催收信息</router-link>
      </el-menu-item>
    </el-menu>

    <el-form style="margin-top: 40px" ref="form" :model="form" :rules="rules" label-width="130px">
      <span class="span1">债权基本信息</span>
      <el-row :gutter="60" style="margin-top: 30px">
        <el-col :span="9" :offset="1">
          <el-form-item label='借据号：' class="form_item" :error="form1_error.form_iouId" prop="iouId">
            <el-input v-model="form.iouId" clearable @input="id_input_change" :disabled="!allow_edit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label='合同号：' class="form_item" prop="contractNo">
            <el-input v-model="form.contractNo" clearable :disabled="!allow_edit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label='债权类别：' class="form_item" prop="claimsType">
            <el-select v-model="form.claimsType" filterable placeholder="请选择" style="width: 100%" :disabled="!allow_edit" @change="claimType_change">
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
          <el-form-item label="资产包：" class="form_item" prop="assetPackageId" :rules="[{required:form.claimsType==='2',message:' ',trigger:['change','blur']}]">
            <el-input v-model="form.assetPackageId" clearable :disabled="Boolean(form.claimsType!=='2') || !allow_edit">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="债权人：" class="form_item" prop="creditor">
            <el-select v-model="form.creditor" clearable filterable placeholder="请选择" style="width: 100%" :disabled="!allow_edit">
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
            <el-select v-model="form.originalCreditor" clearable filterable placeholder="请选择" style="width: 100%" :disabled="!allow_edit">
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
            <el-input v-model="form.obligor" clearable :disabled="!allow_edit"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="所在镇区：" class="form_item" prop="region">
            <el-select v-model="form.region" clearable filterable placeholder="请选择" style="width: 100%" :disabled="!allow_edit">
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
                v-model="form.loanCompensationDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="!allow_edit">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="借款到期日：" class="form_item" prop="loanCompensationDueDate">
            <el-date-picker
                v-model="form.loanCompensationDueDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="!allow_edit">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="借款本金(元)：" class="form_item" prop="principalOfLoan">
            <el-input v-model="form.principalOfLoan" clearable :disabled="!allow_edit"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="借款利息(元)：" class="form_item" prop="loanInterest">
            <el-input v-model="form.loanInterest" clearable :disabled="!allow_edit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="借款年利率(%)：" class="form_item" prop="annualInterestRate" label-width="135px">
            <el-input v-model="form.annualInterestRate" clearable :disabled="!allow_edit"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="逾期罚款利率(%)：" class="form_item" prop="penaltyAnnualInterestRate" label-width="135px">
            <el-input v-model="form.penaltyAnnualInterestRate" clearable :disabled="!allow_edit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="交易基准日：" class="form_item" prop="tradingBaseDate">
            <el-date-picker
                v-model="form.tradingBaseDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="!allow_edit">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <span class="span1">债权转让信息</span>
      <el-row :gutter="60" style="margin-top: 30px" >
        <el-col :span="9" :offset="1">
          <el-form-item label='是否转让' class="form_item" prop="transferType">
            <el-select v-model="form.transferType" filterable placeholder="请选择" style="width: 100%" :disabled="!allow_edit">
              <el-option
                  v-for="item in transferType_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label='取得成本(元)' class="form_item" prop="acquisitionCost">
            <el-input v-model="form.acquisitionCost" clearable :disabled="!allow_edit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label='评估价格(元)' class="form_item" prop="valuationPrice">
            <el-input v-model="form.valuationPrice" clearable :disabled="!allow_edit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="转让价格(元)" class="form_item" prop="transferPrice">
            <el-input v-model="form.transferPrice" clearable :disabled="!allow_edit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label='债权转让进度' class="form_item" prop="claimsProgress">
            <el-input v-model="form.claimsProgress" clearable :disabled="!allow_edit"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="备注" class="form_item" prop="remarks">
            <el-input v-model="form.remarks" clearable :disabled="!allow_edit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "xqCreditFinfo",
  data() {
    return {
      activeIndex: '1',
      options: [
        {value: '天惠投资', label: '天惠投资'}, {value: '天晟投资', label: '天晟投资'},
        {value: '天工惠农小贷', label: '天工惠农小贷'}, {value: '银润小贷', label: '银润小贷'},
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
      transferType_options:[
        {value:0,label:'是'},
        {value:1,label:'否'}
      ],
      form: {},
      form1_error:{
        form_iouId: '',
      },
      rules:{
        contractNo:[{required:true,message:'合同号不能为空',trigger:['change','blur']}],
        claimsType: [{required:true,message:'请输入债权类型',trigger:['change','blur']}],
        creditor: [{required:true,message:'请输入债权人',trigger:['change','blur']}],
        originalCreditor: [{required:true,message:'请输入原债权人',trigger:['change','blur']}],
        obligor: [{required:true,message:'请输入债务人',trigger:['change','blur']}],
        loanCompensationDate: [{required:true,message:'不允许为空',trigger:['change','blur']}],
        loanCompensationDueDate: [{required:true,message:'不允许为空',trigger:['change','blur']}],
        principalOfLoan: [{required:true,message:'不允许为空',trigger:['change','blur']},{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']}],
        loanInterest: [{required:true,message:'不允许为空',trigger:['change','blur']},{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']}],
        annualInterestRate:[{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']}],
        penaltyAnnualInterestRate: [{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']}],
        acquisitionCost: [{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']}],
        valuationPrice: [{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']}],
        transferPrice: [{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']}],
      },
      allow_edit:false,
      edit_label:'编辑',
      origin_form_data:null,
      pickerOptions:[],
      query_iou:'',
    }
  },
  created() {
    var _this = this;
    this.query_iou = this.$route.query.iou.replace(/^\s+|\s+$/g,"");
    api({
      url: "/CreditInfo/getFundamentalCredit",
      method: "get",
      params:{
        iouId:_this.$route.query.iou,
      }
    }).then(data => {
      console.log(data);
      _this.origin_form_data=data.data.datas;
      this.form = JSON.parse(JSON.stringify(data.data.datas));
    }).catch(err => {
      console.log(err);
    })
  },
  methods:{
    id_input_change(){
      this.form1_error.form_iouId='';
    },
    claimType_change(){
      this.form.assetPackageId = '';
    },
    edit(){
      //如果是允许编辑，即是点击放弃修改
      if(this.allow_edit){
        this.allow_edit=false;
        this.form = JSON.parse(JSON.stringify(this.origin_form_data));
        this.edit_label='编辑';
        // console.log(this.edit_label)
      }
      else{
        this.allow_edit=true;
        this.edit_label='放弃修改';
      }
    },
    submit(){
      var _this = this;
      let isChange = false;
      for(let prop in this.form){
        if(String(this.form[prop]) !== String(this.origin_form_data[prop])){
          isChange = true;
          console.log(String(this.form[prop]),String(this.origin_form_data[prop]))
        }
      }
      this.$refs['form'].validate((valid) => {
        if(valid && isChange){
          api({
            url: "CreditInfo/updateFundamentalCredit",
            method: "post",
            data:[this.form]
          }).then(data => {
            // console.log(data);
            location.reload();
          }).catch(err => {
            console.log(err);
          })
        }
        else if(valid && !isChange){
          this.$message('未发现内容变动')
        }
        else if(!valid){
          console.log('err submit');
          return false;
        }
      })
    },
    numCheckBlur(value,prop){
      let pattern = /^\d+(\.\d?\d?)?$/
      console.log(value,prop)
      if(pattern.test(value)){
        let num = Number(value)
        this.form[prop] = num.toFixed(2);
      }
    },
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
.grid-content1{
  background-color: #DCDFE6;
  text-align: end;
}

.span1{
  font-size: 20px;
  font-weight: bold;
  font-family: 黑体;
  margin-left: 30px;
  display: inline-block;
}
</style>