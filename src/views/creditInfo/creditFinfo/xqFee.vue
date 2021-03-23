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

    <el-form style="margin-top: 15px" ref="form1" :model="form1" label-width="130px">
      <div
          v-for="(fee,index1) in form1.feeList"
          :key="fee.key">
        <el-row :gutter="60" style="margin-top: 40px">
          <el-col :span="9" :offset="1">
            <el-form-item label="费用类型：" class="form_item">
              <el-select v-model="fee.feeType" clearable placeholder="请选择" style="width: 100%" :disabled="!allow_edit">
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
              <el-input v-model="fee.feeValue" clearable :disabled="!allow_edit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-popconfirm
                title="确定删除该费用？"
                @confirm="deleteFee(fee)">
              <el-button
                  type="danger"
                  slot="reference">
                删除
              </el-button>
            </el-popconfirm>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="9" :offset="1">
            <el-form-item label="费用支付日期：" class="form_item">
              <el-date-picker
                  v-model="fee.paidDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :disabled="!allow_edit"
                  style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <span style="font-family: 黑体;font-size: 18px">借据号</span>
        <el-form-item
            v-for="(iou, index2) in fee.iouList"
            :label="'借据号' + (index2+1)"
            :key="iou.key"
            style="margin-top: 20px;margin-left: 200px">
          <el-input v-model="iou.value" style="width: 30%" :disabled="iou.isorigin"></el-input>

          <el-popconfirm
              v-if="iou.isorigin && !allow_edit"
              :title="Boolean(fee.iouList.length>1)?'确定删除该借据？':'确定删除最后一个借据？此删除将删除整个费用'"
              @confirm="removeIou(iou,index1)"
              style="margin-left: 20px">
            <el-button
                icon="el-icon-delete"
                circle
                type="danger"
                slot="reference">
            </el-button>
          </el-popconfirm>
          <el-button
              v-if="!iou.isorigin && !allow_edit"
              @click.prevent="removeIou(iou,index1)"
              icon="el-icon-delete"
              circle
              type="danger"
              style="margin-left: 20px">
          </el-button>
        </el-form-item>
        <el-form-item style="margin-left: 200px" v-if="!allow_edit">
          <el-button type="primary" @click="addIou(index1)">新增借据</el-button>
          <el-popconfirm
              v-if="fee.iouList_length < fee.iouList.length"
              title="确定提交新增的借据？"
              @confirm="addIouSubmit(index1)">
            <el-button
                type="primary"
                slot="reference"
                style="margin-left: 20px">
              提交
            </el-button>
          </el-popconfirm>
          <!--          <el-button v-if="fee.iouList_length < fee.iouList.length" type="primary" @click="addIouSubmit(index1)">提交</el-button>-->
        </el-form-item>
        <el-divider></el-divider>
      </div>
    </el-form>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "xqFee",
  data(){
    return{
      activeIndex: '3',
      form1:{feeList:[]},
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
      temp_key:0,
      origin_form_data:'',
      query_iou:this.$route.query.iou,
      edit_label:'编辑',
      allow_edit:false,
    }
  },
  created() {
    var _this = this;
    api({
      url: "/Fee/getFee",
      method: "get",
      params:{
        iouId:_this.$route.query.iou,
      }
    }).then(data => {
      console.log(data)
      this.origin_form_data = data.data.datas;
      this.jsondata2form(data.data.datas)
    }).catch(err => {
      console.log(err);
    })
  },
  methods:{
    getTempKey(){
      this.temp_key++;
      return this.temp_key;
    },
    edit(){
      //如果是允许编辑，即是点击放弃修改
      if(this.allow_edit){
        this.allow_edit=false;
        this.jsondata2form(this.origin_form_data);
        this.edit_label='编辑';
      }
      else{
        this.allow_edit=true;
        this.edit_label='放弃修改';
      }
    },
    jsondata2form(data){
      this.form1.feeList=[];
      for(let i=0;i<data.length;i++){
        let iouList = [];
        if(data[i].iouIdList!==null){
          for(let j=0;j<data[i].iouIdList.length;j++){
            iouList.push({key:this.getTempKey(),value:data[i].iouIdList[j], isorigin:true})
          }
        }
        let feeTypeIndex = [
          {name:'preAssignmentLitigationFee',value:data[i].preAssignmentLitigationFee,label:'0'},
          {name:'preAssignmentPreservationFee',value:data[i].preAssignmentPreservationFee,label:'1'},
          {name:'preAssignmentExecutionFee',value:data[i].preAssignmentExecutionFee,label:'2'},
          {name:'preAssignmentAgencyFee',value:data[i].preAssignmentAgencyFee,label:'3'},
          {name:'preAssignmentOtherFee',value:data[i].preAssignmentOtherFee,label:'4'},
          {name:'postAssignmentLitigationFee',value:data[i].postAssignmentLitigationFee,label:'5'},
          {name:'postAssignmentPreservationFee',value:data[i].postAssignmentPreservationFee,label:'6'},
          {name:'postAssignmentExecutionFee',value:data[i].postAssignmentExecutionFee,label:'7'},
          {name:'postAssignmentAgencyFee',value:data[i].postAssignmentAgencyFee,label:'8'},
          {name:'postAssignmentOtherFee',value:data[i].postAssignmentOtherFee,label:'9'},
          {name:'debtPayment',value:data[i].debtPayment,label:'10'}]
        for(let j=0;j<feeTypeIndex.length;j++){
          if(data[i][feeTypeIndex[j].name] !== null){
            let fee = {key:this.getTempKey(),feeId:data[i].feeId, feeType:feeTypeIndex[j].label,feeValue:feeTypeIndex[j].value,paidDate:data[i].paidDate,iouList:iouList,iouList_length:iouList.length};
            this.form1.feeList.push(fee);
          }
        }
      }
    },
    removeIou(iou,index){
      //如果删除的是原有的借据，需要调用删除接口，否则只是在界面上删除
      if(iou.isorigin){
        api({
          url: "/Fee/deleteFeeByIouId",
          method: "post",
          data:[{feeId:this.form1.feeList[index].feeId,iouId:iou.value}]
        }).then(data => {
          console.log(data);
          // this.$router.replace('/creditInfo/creditFinfo/creditMenu');
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }
      else{
        var i = this.form1.feeList[index].iouList.indexOf(iou);
        if (i !== -1) {
          this.form1.feeList[index].iouList.splice(i, 1);
        }
      }
    },
    addIou(index){
      this.form1.feeList[index].iouList.push({key:this.getTempKey(),value:'', isorigin:false})
    },
    addIouSubmit(index){
      let send_data = [];
      let fee = {'0':null,'1':null,'2':null,'3':null,'4':null,'5':null,'6':null,'7':null,'8':null,'9':null,'10':null};
      fee[this.form1.feeList[index].feeType] = this.form1.feeList[index].feeValue;
      for(let i=0;i<this.form1.feeList[index].iouList.length;i++){
        if(!this.form1.feeList[index].iouList[i].isorigin){
          send_data.push({
            iouId:this.form1.feeList[index].iouList[i].value,
            feeId:this.form1.feeList[index].feeId,
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
            paidDate: this.form1.feeList[index].paidDate,
            deleteFlag: 0
          })
        }
      }
      // console.log(send_data)
      api({
        url: "/Fee/addFeeByIouId",
        method: "post",
        data:send_data
      }).then(data => {
        console.log(data);
        location.reload();
      }).catch(err => {
        console.log(err);
      })

    },
    submit(){
      var _this = this;
      let send_data = [];
      for(let i=0;i<this.form1.feeList.length;i++){
        let fee = {'0':null,'1':null,'2':null,'3':null,'4':null,'5':null,'6':null,'7':null,'8':null,'9':null,'10':null};
        fee[this.form1.feeList[i].feeType] = this.form1.feeList[i].feeValue;
        let iouList = []
        for(let j=0;j<this.form1.feeList[i].iouList.length;j++){
          iouList.push(this.form1.feeList[i].iouList[j].value);
        }
        send_data.push({
          feeId:this.form1.feeList[i].feeId,
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
          paidDate: this.form1.feeList[i].paidDate,
          iouIdList:iouList,
          deleteFlag: 0}
        )
      }
      console.log(send_data);
      api({
        url: "/Fee/updateFee",
        method: "post",
        data:send_data
      }).then(data => {
        console.log(data);
        location.reload();
      }).catch(err => {
        console.log(err);
      })
    },
    deleteFee(fee){
      api({
        url: "/Fee/deleteFee",
        method: "post",
        data:[fee.feeId]
      }).then(data => {
        console.log(data);
        location.reload();
      }).catch(err => {
        console.log(err);
      })
    }
  },
  computed:{
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
