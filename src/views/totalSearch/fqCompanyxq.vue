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
          <el-button @click="addReords" type="primary">新增还款记录</el-button>
          <el-button @click="editMain" type="primary">{{edit_label}}</el-button>
          <el-popconfirm
              v-if="allow_edit"
              title="确定提交？"
              @confirm="updateMainSubmit"
              style="margin-left: 10px">
            <el-button slot="reference" type="primary">提交</el-button>
          </el-popconfirm>
        </div>
      </el-col>
    </el-row>

    <el-form ref="form" :model="form" :rules="form_rules">
      <el-form-item style="margin-top:20px;">
        <el-row>
          <el-col :span="3"><div class="grid-content1">债务人：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" prop="obligor"><el-input v-model="form.obligor" :disabled="!allow_edit" style="width: 70%"></el-input></el-form-item></el-col>
          <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">债权人：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content3" style="text-align: start" prop="creditor">
            <el-select v-model="form.creditor" clearable filterable placeholder="请选择" style="width: 70%":disabled="!allow_edit">
              <el-option
                  v-for="item in creditor_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="3"><div class="grid-content1">应还本金(元)：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" prop="payablePrincipal"><el-input style="width: 70%" v-model="form.payablePrincipal" :disabled="!allow_edit"></el-input></el-form-item></el-col>
          <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">还款期限：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" prop="repaymentTerm"><el-input style="width: 70%" v-model="form.repaymentTerm" :disabled="!allow_edit"></el-input></el-form-item></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="3"><div class="grid-content1">实际控制人或关键人：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" prop="actualController"><el-input style="width: 70%" v-model="form.actualController" :disabled="!allow_edit"></el-input></el-form-item></el-col>
          <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">还款是否结清：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" prop="repaymentStatus">
            <el-select v-model="form.repaymentStatus" clearable filterable placeholder="请选择" style="width: 70%" :disabled="!allow_edit">
              <el-option
                  v-for="item in repamentStatu_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="3"><div class="grid-content1">备注：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2"><el-input style="width: 70%" v-model="form.remarks" :disabled="!allow_edit"></el-input></el-form-item></el-col>
        </el-row>
      </el-form-item>

      <el-divider></el-divider>
      <span style="font-family: 黑体; font-weight: bold;font-size: 20px">还款明细</span>
      <el-table :data="installmentsDaoList" border style="width: 100%" class="el-table">
        <el-table-column prop="repaymentMoney" label="还款金额" width="200">
          <template slot-scope="scope">
            <span v-show="!allow_edit">{{scope.row.repaymentMoney}}</span>
            <el-input size="mini" v-show="allow_edit" v-model="scope.row.repaymentMoney"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="repaymentType" label="还款方式" width="200">
          <template slot-scope="scope">
            <span v-show="!allow_edit">{{statuIndex[scope.row.repaymentType]}}</span>
            <el-input size="mini" v-show="allow_edit" v-model="scope.row.repaymentType"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="payer" label="支付人" width="200">
          <template slot-scope="scope">
            <span v-show="!allow_edit">{{scope.row.payer}}</span>
            <el-input size="mini" v-show="allow_edit" v-model="scope.row.payer"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="payee" label="收款人" width="200">
          <template slot-scope="scope">
            <span v-show="!allow_edit">{{scope.row.payee}}</span>
            <el-input size="mini" v-show="allow_edit" v-model="scope.row.payee"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="repaymentTime" label="还款时间" width="150">
          <template slot-scope="scope">
            <span v-show="!allow_edit">{{scope.row.repaymentTime}}</span>
            <el-date-picker v-show="allow_edit" v-model="scope.row.repaymentTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-popconfirm
                title="确定删除？"
                @confirm="deleteRecord(scope.row)">
              <el-button slot="reference" type="text" size="small">删除</el-button>
            </el-popconfirm>
<!--            <el-button type="text" size="small" @click="deleteRecord(scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-dialog title="新增还款记录" :visible.sync="dialogShow" :append-to-body="true" :close-on-click-modal="false" :before-close="handleClose">
      <el-form style="margin-top: 20px" ref="form_add" :model="form_add" label-width="110px" :rules="addRules">
        <el-row :gutter="20">
          <el-col :span="10" :offset="1">
            <el-form-item label='还款金额(元)：' prop="repaymentMoney" label-width="120px">
              <el-input v-model="form_add.repaymentMoney" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label='还款方式：' class="form_item" prop="repaymentType">
              <el-input v-model="form_add.repaymentType" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="1">
            <el-form-item label="支付人：" prop="payer">
              <el-input v-model="form_add.payer" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="收款人：" prop="payee">
              <el-input v-model="form_add.payee" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="1">
            <el-form-item label='还款时间：' prop="repaymentTime">
              <el-date-picker v-model="form_add.repaymentTime" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-popconfirm
          title="确定提交？"
          @confirm="submitNewRecord"
          style="margin-left: 50px">
        <el-button slot="reference" type="primary">提交</el-button>
      </el-popconfirm>
    </el-dialog>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "fqCompanyxq",
  data(){
    return{
      form:{},
      form_rules:{
        obligor: {required:true,message:'不允许为空',trigger:['change','blur']},
        creditor: {required:true,message:'不允许为空',trigger:['change','blur']},
        payablePrincipal: [{required:true,message:'不允许为空',trigger:['change','blur']},{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']}],
        repaymentStatus:{required:true,message:'不允许为空',trigger:['change','blur']},
      },
      installmentsDaoList:[],
      require_params:{id:''},
      creditor_options: [
        {value: '天惠投资', label: '天惠投资'},
        {value: '天晟投资', label: '天晟投资'},
        {value: '天工惠农小贷', label: '天工惠农小贷'},
        {value: '银润小贷', label: '银润小贷'},
        {value: '阳光企业', label: '阳光企业'}],
      repamentStatu_options:[
        {value:'0',label:'否'},
        {value:'1',label:'是'}
      ],
      statuIndex:{'0':'否','1':'是'},
      origin_data:'',
      edit_label:'编辑',
      allow_edit:false,
      form_add:{repaymentMoney:'',repaymentType:'',payer:'',payee:'',repaymentTime:''},
      addRules:{
        repaymentMoney:[{required:true,message:'不允许为空',trigger:['change','blur']},{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']}],
        repaymentType:'',
        payer:{required:true,message:'不允许为空',trigger:['change','blur']},
        payee:{required:true,message:'不允许为空',trigger:['change','blur']},
        repaymentTime:{required:true,message:'不允许为空',trigger:['change','blur']},
      },
      dialogShow:false,

    }
  },
  created() {
    this.require_params.id = this.$route.query.id.replace(/^\s+|\s+$/g,"");
    api({
      url: "/Installments/getInstallment",
      method: "get",
      params:{
        id:this.require_params.id
      }
    }).then(data => {
      console.log(data)
      this.form = JSON.parse(JSON.stringify(data.data.datas));
      this.installmentsDaoList = JSON.parse(JSON.stringify(data.data.datas.installmentsDaoList))
      this.installmentsDaoList.forEach((value,index) => {
        this.$set(value,'index',index);
      })
      this.origin_data = data.data.datas;
    }).catch(err => {
      console.log(err);
    })
  },
  methods:{
    addReords(){
      this.dialogShow = true;
      this.form_add = {repaymentMoney:'',repaymentType:'',payer:'',payee:'',repaymentTime:''};
    },
    editMain(){
      if(this.allow_edit){
        this.allow_edit = false;
        this.edit_label = '编辑';
        this.form = JSON.parse(JSON.stringify(this.origin_data));
      }
      else{
        this.allow_edit = true;
        this.edit_label = '放弃修改';
      }
    },
    updateMainSubmit(){
      this.$refs['form'].validate((valid) => {
        if(valid){
          let mainDataChange = false;
          let recordsChange = false;
          for(let prop in this.form){
            if(prop!=='installmentsDaoList' && this.form[prop] !== this.origin_data[prop]){
              mainDataChange = true;
            }
          }
          this.installmentsDaoList.forEach((value,index) => {
            for(let prop in value){
              if(prop!=='index' && value[prop] !== this.origin_data.installmentsDaoList[value['index']][prop]){
                recordsChange = true;
              }
            }
          })
          if(!mainDataChange && !recordsChange){
            alert("未发现内容变动");
          }
          else{
            let send_data = {};
            send_data = JSON.parse(JSON.stringify(this.form));
            let temp_records = JSON.parse(JSON.stringify(this.installmentsDaoList));
            send_data['installmentsDaoList'] = temp_records.map(item => {delete item.index; return item})
            api({
              url: "/Installments/updateInstallment",
              method: "post",
              data:send_data
            }).then(data => {
              location.reload();
            }).catch(err => {
              console.log(err);
            })
          }
        }
        else {
          this.$message('请检查提交内容')
        }
      })
    },
    deleteRecord(row){
      api({
        url: "/Installments/deleteInstallments",
        method: "get",
        params:{id:row.id}
      }).then(data => {
        location.reload();
      }).catch(err => {
        console.log(err);
      })
    },
    submitNewRecord(){
      this.$refs['form_add'].validate((valid) => {
        if(valid){
          let isNull = true;
          for(let prop in this.form_add){
            if(this.form_add[prop] !== ''){
              isNull = false;
            }
          }
          if(isNull){
            alert("内容为空")
          }
          else{
            this.form_add.deleteFlag = 0;
            api({
              url: "/Installments/addInstallments",
              method: "post",
              data:{
                id:this.origin_data.id,
                installmentsDaoList:[this.form_add]
              }
            }).then(data => {
              console.log(data)
              location.reload();
            }).catch(err => {
              console.log(err);
            })
          }
        }
        else{
          this.$message('请检查提交内容')
        }
      })
    },
    handleClose(done){
      done()
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