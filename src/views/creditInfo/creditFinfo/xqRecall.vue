<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/timeRemider"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权基础信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="el-row1">
      <el-col :span="24">
        <div class="grid-content">
          <el-button @click="addRecall" type="primary">新增</el-button>
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

    <el-form :model="form">
      <el-form-item>
        <el-row class="el-row2">
          <el-col :span="2"><div class="grid-content1">借据号：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form.id" :disabled="true"></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" style="margin-left: 20px">债务人：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form.obligor" :disabled="true"></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row class="el-row3">
          <el-col :span="2"><div class="grid-content1">本金：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form.principalOfLoan" :disabled="true"></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" style="margin-left: 20px">利息：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form.loanInterest" :disabled="true"></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row class="el-row4">
          <el-col :span="2"><div class="grid-content1">债权人：</div></el-col>
          <el-col :span="7"><div class="grid-content3" style="text-align: start">
            <el-select v-model="form.creditor" clearable filterable placeholder="请选择" :disabled="true">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div></el-col>
          <el-col :span="2"><div class="grid-content1" style="margin-left: 20px">备注：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form.remarks" :disabled="true"></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-divider></el-divider>
      <span style="font-family: 黑体; font-weight: bold;font-size: 20px">还款明细</span>
      <el-table :data="tableData" :summary-method="getSummaries" show-summary>
<!--        <el-table-column property="id" label="还款ID" width="100"></el-table-column>-->
        <el-table-column property="repaymentDate" label="还款时间" width="120">
          <template slot-scope="scope">
            <span v-show="!scope.row.edit">{{scope.row.repaymentDate}}</span>
            <el-date-picker v-show="scope.row.edit" v-model="scope.row.repaymentDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column property="repaymentPrincipal" label="还款本金金额" width="120">
          <template slot-scope="scope">
            <span v-show="!scope.row.edit">{{scope.row.repaymentPrincipal}}</span>
            <el-input size="mini" v-show="scope.row.edit" v-model="scope.row.repaymentPrincipal"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="repaymentInterest" label="还款利息金额" width="120">
          <template slot-scope="scope">
            <span v-show="!scope.row.edit">{{scope.row.repaymentInterest}}</span>
            <el-input size="mini" v-show="scope.row.edit" v-model="scope.row.repaymentInterest"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="payType" label="支付方式" width="120">
          <template slot-scope="scope">
            <span v-show="!scope.row.edit">{{scope.row.payType}}</span>
            <el-input size="mini" v-show="scope.row.edit" v-model="scope.row.payType"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="drawee" label="付款人" width="180">
          <template slot-scope="scope">
            <span v-show="!scope.row.edit">{{scope.row.drawee}}</span>
            <el-input size="mini" v-show="scope.row.edit" v-model="scope.row.drawee"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="payee" label="收款人" width="130">
          <template slot-scope="scope">
            <span v-show="!scope.row.edit">{{scope.row.payee}}</span>
            <el-select v-show="scope.row.edit" v-model="scope.row.payee" filterable placeholder="请选择" style="width: 100%" size="mini">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
<!--            <el-input size="mini" v-show="scope.row.edit" v-model="scope.row.payee"></el-input>-->
          </template>
        </el-table-column>
        <el-table-column property="remarks" label="备注" width="130">
          <template slot-scope="scope">
            <span v-show="!scope.row.edit">{{scope.row.remarks}}</span>
            <el-input size="mini" v-show="scope.row.edit" v-model="scope.row.remarks"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="operate" width="130">
          <template slot="header" slot-scope="scope">
            <span v-if="!edit_state">操作</span>
            <el-button type="primary" v-if="edit_state" @click="updateSubmit">提交</el-button>
          </template>
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="recallEdit(scope.row, scope.$index)">{{scope.row.edit_label}}</el-button>
            <el-button type="text" size="small" @click="deleteRecall(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-dialog title="新增还款记录" :visible.sync="dialogShow" :append-to-body="true" :close-on-click-modal="false" :before-close="handleClose">
      <el-form style="margin-top: 20px" ref="form_add" :model="form_add" label-width="120px" :rules="form_addRules">
        <el-row :gutter="20">
          <el-col :span="10" :offset="1">
            <el-form-item
                label-width="150px"
                label='还款本金金额(元)：'
                prop="repaymentPrincipal"
                :rules="[{required:String(this.form_add.repaymentInterest) === '',message:'本金、利息金额不能都为空',trigger:['change','blur']},
                         {pattern:/^\d+(\.\d?\d?)?$/,message: '必须为数字(最多两位小数)',trigger:['change','blur']}]">
              <el-input v-model="form_add.repaymentPrincipal" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item
                label-width="150px"
                label='还款利息金额(元)：'
                class="form_item"
                prop="repaymentInterest"
                :rules="[{required:String(this.form_add.repaymentPrincipal) === '',message:'本金、利息金额不能都为空',trigger:['change','blur']},
                         {pattern:/^\d+(\.\d?\d?)?$/,message: '必须为数字(最多两位小数)',trigger:['change','blur']}]">
              <el-input v-model="form_add.repaymentInterest" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10" :offset="1">
            <el-form-item label='还款时间：' prop="repaymentDate">
              <el-date-picker v-model="form_add.repaymentDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="支付方式：" prop="payType">
              <el-input v-model="form_add.payType" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10" :offset="1">
            <el-form-item label="付款人：" prop="drawee">
              <el-input v-model="form_add.drawee" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="收款人：" prop="payee">
              <el-select v-model="form_add.payee" clearable filterable placeholder="请选择" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" @click="submitNewRecall" style="margin-left: 50px">提交</el-button>
    </el-dialog>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "xqRecall",
  data(){
    return{
      activeIndex: '4',
      form:{},
      form_add:{iouId:'',repaymentPrincipal:'', repaymentInterest:'', repaymentDate:'', payType:'', drawee:'', payee:'', remarks:''},
      form_addRules:{
        repaymentDate:{required:true,message:'不允许为空',trigger:['change','blur']},
        drawee:{required:true,message:'不允许为空',trigger:['change','blur']},
        payee:{required:true,message:'不允许为空',trigger:['change','blur']},
      },
      options: [
        {value: '天惠投资', label: '天惠投资'},
        {value: '天晟投资', label: '天晟投资'},
        {value: '天工惠农小贷', label: '天工惠农小贷'},
        {value: '银润小贷', label: '银润小贷'},
        {value: '阳光企业', label: '阳光企业'}],
      tableData: [],
      query_iou:this.$route.query.iou,
      origin_data:'',
      dialogShow:false,
      edit_state:false,
    }
  },
  created() {
    this.query_iou = this.$route.query.iou.replace(/^\s+|\s+$/g,"");
    api({
      url: "/Recall/getRecall",
      method: "get",
      params:{
        iouId:this.$route.query.iou,
      }
    }).then(data => {
      console.log(data);
      this.origin_data = data.data.datas;
      this.jsdata2form(data.data.datas);
      this.setTableData();
    }).catch(err => {
      console.log(err);
    })

  },
  methods:{
    jsdata2form(data){
      this.form = JSON.parse(JSON.stringify(data));
    },
    setTableData(){
      this.tableData = []
      for(let i=0;i<this.form.feeList.length;i++){
        let temp = {};
        for(let key in this.form.feeList[i]){
          temp[key] = this.form.feeList[i][key]
        }
        temp['edit'] = false;
        temp['edit_label'] = "编辑"
        this.tableData.push(temp);
      }
    },
    recallEdit(row,index){
      if(!row.edit){
        row.edit=true;
        row.edit_label = "放弃修改";
      }
      else{
        row.edit = false;
        row.edit_label="编辑";
        row.repaymentDate = this.origin_data.feeList[index].repaymentDate;
        row.repaymentPrincipal = this.origin_data.feeList[index].repaymentPrincipal;
        row.repaymentInterest = this.origin_data.feeList[index].repaymentInterest;
        row.payType = this.origin_data.feeList[index].payType;
        row.drawee = this.origin_data.feeList[index].drawee;
        row.payee = this.origin_data.feeList[index].payee;
        row.remarks = this.origin_data.feeList[index].remarks;
      }
      //每一次点击都判断以下所有列的修改状态，更改edit_state
      this.edit_state = false;
      this.tableData.forEach((data) => {
        if(data.edit){
          this.edit_state = true;
          return;
        }
      })
      console.log(this.edit_state)
    },
    deleteRecall(row){
      this.$confirm('确认删除？')
          .then(_ => {
            api({
              url: "/Recall/deleteRecall",
              method: "post",
              data:[row.id]
            }).then(data => {
              location.reload();
            }).catch(err => {
              console.log(err);
            })
          })
          .catch(_ => {});
    },
    updateSubmit(){
      let send_data = [];
      this.tableData.forEach((data,index) => {
        if(data.edit){
          let isChange = false;
          let temp_data ={};
          for(let prop in data){
            if(prop!=='edit' && prop!=='edit_label'){
              temp_data[prop] = data[prop];
            }
            if(data[prop] !== this.origin_data.feeList[index][prop] && prop!=='edit' && prop!=='edit_label'){
              isChange = true;
            }
          }
          if(isChange){
            send_data.push(temp_data)
          }
        }
      })
      if(send_data.length === 0){
        alert("未发现内容变动");
      }
      else{
        this.$confirm('确认提交？')
            .then(_ => {
              api({
                url: "/Recall/updateRecall",
                method: "post",
                data:send_data
              }).then(data => {
                location.reload();
              }).catch(err => {
                console.log(err);
              })
            })
            .catch(_ => {});
      }
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '还款合计';
          return;
        }
        if(index === 1 || index === 2){
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            // sums[index] += '';
          } else {
            sums[index] = 'N/A';
          }
        }
      });
      return sums;
    },
    handleClose(done){
      //判断内容为空
      let isAllNull = true;
      for(let key in this.form_add){
        if(this.form_add[key]!=='' && key!=='iouId'){
          isAllNull = false;
        }
      }
      if(isAllNull){
        done();
      }
      else{
        this.$confirm('确认关闭并放弃修改？')
            .then(_ => {
              this.form_add = {iouId:this.form.id,repaymentPrincipal:'', repaymentInterest:'', payType:'', drawee:'', payee:'', remarks:''},
              done();
            })
            .catch(_ => {});
      }

    },
    addRecall(){
      this.dialogShow = true;
      //为form_add赋值
      this.form_add.iouId = this.form.id;
    },
    submitNewRecall(){
      this.$refs['form_add'].validate((valid) => {
        if(valid){
          //判断内容为空
          let isAllNull = true;
          for(let key in this.form_add){
            if(this.form_add[key]!=='' && key!=='iouId'){
              isAllNull = false;
            }
          }
          if(isAllNull){
            alert("内容为空");
          }
          else{
            this.$confirm('确认提交？')
                .then(_ => {
                  api({
                    url: "/Recall/addRecall",
                    method: "post",
                    data:this.form_add
                  }).then(data => {
                    location.reload();
                  }).catch(err => {
                    console.log(err);
                  })
                })
                .catch(_ => {});
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
  margin-top: 20px;
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
.el-row3, .el-row4{
  margin-top: 10px;
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