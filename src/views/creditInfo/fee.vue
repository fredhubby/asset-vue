<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权费用信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="el-row1">
      <el-col :span="24">
        <div class="grid-content">
<!--          <el-dropdown trigger="click">-->
<!--            <el-button type="primary">-->
<!--              新增费用<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--            </el-button>-->
<!--            <el-dropdown-menu slot="dropdown">-->
<!--              <el-dropdown-item>诉讼费</el-dropdown-item>-->
<!--              <el-dropdown-item>保全费</el-dropdown-item>-->
<!--              <el-dropdown-item>执行费</el-dropdown-item>-->
<!--              <el-dropdown-item>代理费</el-dropdown-item>-->
<!--              <el-dropdown-item>其他费用</el-dropdown-item>-->
<!--            </el-dropdown-menu>-->
<!--          </el-dropdown>-->
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
<!--      <el-menu-item index="1">-->
<!--        <router-link to="/creditInfo/Finfo">债权基本信息</router-link>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="2">-->
<!--        <router-link to="/creditInfo/SMortgage">担保抵押信息</router-link>-->
<!--      </el-menu-item>-->
      <el-menu-item index="3">
        债权费用信息
      </el-menu-item>
    </el-menu>


    <el-form style="margin-top: 15px" ref="form1" :model="form1" label-width="130px">
      <el-row :gutter="60" style="margin-top: 40px">
        <el-col :span="9" :offset="1">
          <el-form-item label="费用类型：" class="form_item">
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
          <el-form-item label="费用:" class="form_item">
            <el-input v-model="form1.form_fee" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="费用支付日期：" class="form_item">
            <el-date-picker
                v-model="form1.form_paidDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%">
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
        {
          value:'受让后诉讼费',
          label:'受让后诉讼费'
        },
        {
          value:'受让后保全费',
          label:'受让后保全费'
        },
        {
          value:'受让后执行费',
          label:'受让后执行费'
        },
        {
          value:'受让后代理费',
          label:'受让后代理费'
        },
        {
          value:'受让后其它费',
          label:'受让后其它费'
        },
        {
          value:'债权支付对价',
          label:'债权支付对价'
        },
      ],
      temp_iouId:0
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
    submit(){
      var _this = this;
      let i;
      let data_List=[];
      let data={};
      // for(i=0;i<this.form1.form_ious.length;i++){
      //   data = {
      //     iouId: this.form1.form_ious[i].value,                                               ,
      //     preAssignmentExecutionFee: 222,
      //     preAssignmentLitigationFee: 33333,
      //     preAssignmentPreservationFee: 222222,
      //     preAssignmentOtherFee: 222222,
      //     postAssignmentExecutionFee: 222222,
      //     postAssignmentLitigationFee: 206287,
      //     postAssignmentPreservationFee: 222222,
      //     postAssignmentOtherFee: null,
      //     debtPayment: null,
      //     debtPaymentDate: null,
      //     paidDate: 2020-04-08 00:00:00.0,
      //   }
      // }
      // api({
      //   url: "/Fee/addFee",
      //   method: "post",
      //   data:[{
      //     iouId:_this.$route.query.iou,
      //   }]
      // }).then(data => {
      //   console.log(data);
      // }).catch(err => {
      //   console.log(err);
      // })
      // "id": "112",
      //     "iouId": "143                                               ",
      //     "feeId": "2",
      //     "preAssignmentExecutionFee": "222",
      //     "preAssignmentLitigationFee": "33333",
      //     "preAssignmentPreservationFee": "222222",
      //     "preAssignmentOtherFee": "222222",
      //     "postAssignmentExecutionFee": "222222",
      //     "postAssignmentLitigationFee": "206287",
      //     "postAssignmentPreservationFee": "222222",
      //     "postAssignmentOtherFee": null,
      //     "debtPayment": null,
      //     "debtPaymentDate": null,
      //     "paidDate": "2020-04-08 00:00:00.0",
      //     "deleteFlag": 0,
      //     "createBy": "小王",
      //     "gmtCreate": "2021-02-09 17:10:25.0",
      //     "updateBy": "",
      //     "gmtModified": null,
      //     "iouIdList": [
      //   "131                                               ",
      //   "132                                               ",
      //   "143                                               ",
      //   "128                                               ",
      //   "129                                               ",
      //   "130                                               "
      // ]
    },
    initIou(){
      this.form1.form_ious=[];
      let i;
      let str;
      let x=JSON.parse(this.$route.query.creditList);
      for (i=0;i<x.length;i++){
        str=x[i].replace(/^\s+|\s+$/g,"");
        this.form1.form_ious.push({key:this.getTempIouId,value: str});
      }
    },
    addIou(){
      this.form1.form_ious.push({key:this.getTempIouId,value: ''});
    },
    removeIou(iou){
      var index = this.form1.form_ious.indexOf(iou);
      if (index !== -1) {
        this.form1.form_ious.splice(index, 1);
      }
    },
    resetIou(){
      this.form1.form_ious=[{key:this.getTempIouId,value: ''}];
    },
  },
  computed:{
    getTempIouId(){
      this.temp_iouId++;
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