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
<!--          <el-button @click="addCrashedCredit">新增破产债权</el-button>-->
          <el-button @click="edit">{{edit_label}}</el-button>
          <el-popconfirm
              title="确定提交？"
              style="margin-right: 40px;margin-left: 20px"
              @confirm="submit"
              v-if="allow_edit">
            <el-button type="primary" slot="reference">提交</el-button>
          </el-popconfirm>
        </div>
      </el-col>
    </el-row>

    <el-form ref="form1" :model="form1">
      <el-form-item>
        <el-row class="el-row2">
          <el-col :span="2"><div class="grid-content1" >破产企业：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.bustEnterprise" clearable :disabled="!allow_edit"></el-input></div></el-col>
          <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">破产受理日：</div></el-col>
          <el-col :span="7"><div class="grid-content2" style="text-align: start">
            <el-date-picker
                :disabled="!allow_edit"
                v-model="form1.bankruptcyAcceptanceDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
                align="right"
                format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd">
            </el-date-picker>
          </div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row class="el-row3">
          <el-col :span="2"><div class="grid-content1">破产管理人：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.bankruptcyAdministrator" clearable :disabled="!allow_edit"></el-input></div></el-col>
          <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">债权申报人：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.claimsDeclarant" clearable :disabled="!allow_edit"></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row class="el-row4">
          <el-col :span="2"><div class="grid-content1">债权性质：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.claimsProperties" clearable :disabled="!allow_edit"></el-input></div></el-col>
          <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">申报金额：</div></el-col>
          <el-col :span="7"><div class="grid-content3"><el-input v-model="form1.declaredAmount" clearable :disabled="!allow_edit"></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row class="el-row5">
          <el-col :span="2"><div class="grid-content1">核减金额：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.deductionAmount" clearable :disabled="!allow_edit"></el-input></div></el-col>
          <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">认定金额：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.recognizedAmount" clearable :disabled="!allow_edit"></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row class="el-row6">
          <el-col :span="2"><div class="grid-content1">分配金额：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.allocationAmount" clearable :disabled="!allow_edit"></el-input></div></el-col>
          <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">联系人姓名：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.contacts" clearable :disabled="!allow_edit"></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row class="el-row7">
          <el-col :span="2"><div class="grid-content1">联系人电话：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.contactNumber" clearable :disabled="!allow_edit"></el-input></div></el-col>
          <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">备注：</div></el-col>
          <el-col :span="7"><div class="grid-content2">
            <el-input v-model="form1.remarks" type="textarea"
                      autosize :disabled="!allow_edit"
                      maxlength="100"></el-input>
          </div></el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "crashedCreditDetail",
  data(){
    return{
      allow_edit:false,
      edit_label:'编辑',
      origin_form_data:'',
      form1:{
        id:'',
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
  created() {
    var _this = this;
    api({
      url: "CrashedCredit/getCrashedCredit",
      method: "get",
      params:{
        id:_this.$route.query.id,
      }
    }).then(data => {
      console.log(data)
      _this.origin_form_data = data.data.datas;
      this.jsondata2form(_this.origin_form_data);
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    reset(){
      this.form1 = this.$options.data().form1
    },
    jsondata2form(data){
      this.form1.id = data.id;
      this.form1.bustEnterprise = data.bustEnterprise;
      this.form1.bankruptcyAcceptanceDate = data.bankruptcyAcceptanceDate;
      this.form1.bankruptcyAdministrator = data.bankruptcyAdministrator;
      this.form1.claimsDeclarant = data.claimsDeclarant;
      this.form1.claimsProperties = data.claimsProperties;
      this.form1.remarks = data.remarks;
      this.form1.declaredAmount = data.declaredAmount;
      this.form1.deductionAmount = data.deductionAmount;
      this.form1.recognizedAmount = data.recognizedAmount;
      this.form1.allocationAmount = data.allocationAmount;
      this.form1.contacts = data.contacts;
      this.form1.contactNumber = data.contactNumber;
    },
    submit(){
      var _this = this;

      api({
        url: "/CrashedCredit/updateCrashedCredit",
        method: "post",
        data:{
          id:_this.form1.id,
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
        location.reload();
      }).catch(err => {
        console.log(err);
      })
    },
    addCrashedCredit(){
      this.$router.replace('/totalSearch/addCrashedCreditInfo')
    },
    edit(){
      //如果是允许编辑，即是点击放弃修改
      if(this.allow_edit){
        this.allow_edit=false;
        this.jsondata2form(this.origin_form_data);
        this.edit_label='编辑';
        console.log(this.edit_label)
      }
      else{
        this.allow_edit=true;
        this.edit_label='放弃修改';
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
