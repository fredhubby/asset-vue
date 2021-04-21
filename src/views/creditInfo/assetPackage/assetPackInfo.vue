<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/timeRemider"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">资产包</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">资产包详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="el-row1">
      <el-col :span="24">
        <div class="grid-content">
          <el-button @click="addIou">新增借据</el-button>
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
          <el-col :span="2"><div class="grid-content1">资产包ID：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.assetPackageId" :disabled="true"></el-input></div></el-col>
          <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">债权数量：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.assetNum" :disabled="true"></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row class="el-row3">
          <el-col :span="2"><div class="grid-content1">债权总成本：</div></el-col>
          <el-col :span="7"><div class="grid-content2" style="text-align: start">
            <el-input v-model="form1.costDebtTotal" :disabled="true"></el-input>
          </div></el-col>
          <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">对价支付总额：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.debtPaymentTotal" :disabled="true"></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row class="el-row4">
          <el-col :span="2"><div class="grid-content1">债权人：</div></el-col>
          <el-col :span="7"><div class="grid-content3" style="text-align: start">
            <el-select v-model="form1.creditor" clearable filterable :disabled="!allow_edit" placeholder="请选择">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div></el-col>
          <el-col :span="3"><div class="grid-content1" style="margin-left: 20px">原债权人：</div></el-col>
          <el-col :span="7"><div class="grid-content3" style="text-align: start">
            <el-select v-model="form1.originalCreditor" clearable filterable :disabled="!allow_edit" placeholder="请选择">
              <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row class="el-row5">
          <el-col :span="2"><div class="grid-content1">备注：</div></el-col>
          <el-col :span="7"><div class="grid-content2">
            <el-input v-model="form1.remarks"
                      :disabled="!allow_edit" type="textarea" autosize>
          </el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-divider></el-divider>
      <div>
        <span style="font-family: 黑体;font-size: 18px">受让前催收公告</span>
        <div v-for="(inform,index1) in form1.informList"
             :key="inform.key" style="margin-top: 20px">
          <el-row :gutter="20">
            <el-col :span="9" :offset="1">
              <el-form-item label="催告方式：" class="form_item">
<!--                <el-select v-model="informList.method">-->
<!--                  <el-option label="省级媒体" value="省级媒体"></el-option>-->
<!--                  <el-option label="直接送达" value="直接送达"></el-option>-->
<!--                  <el-option label="邮寄送达" value="邮寄送达"></el-option>-->
<!--                  <el-option label="本地媒体" value="本地媒体"></el-option>-->
<!--                </el-select>-->
                <el-select v-model="inform.method" clearable filterable placeholder="请选择"
                           :disabled="Boolean((form1.informList[index1].isOrigin==='1') && !allow_edit)">
                  <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="催收公告日:" class="form_item">
                <el-date-picker
                    v-model="inform.date"
                    type="date"
                    :disabled="Boolean((form1.informList[index1].isOrigin==='1') && !allow_edit)"
                    placeholder="选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    style="width: 70%">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-popconfirm
                  v-if="!allow_edit"
                  :title="Boolean(form1.informList.length>1)?'确定删除该催收公告？':'确定删除最后一个催收公告？此删除将删除整个催收信息'"
                  @confirm="removeInform(inform,index1)"
                  style="margin-left: 20px">
                <el-button
                    icon="el-icon-delete"
                    circle
                    type="danger"
                    slot="reference">
                </el-button>
              </el-popconfirm>
<!--              <el-button @click.prevent="removeInform(inform,index1)" type="danger"-->
<!--                         v-if="((inform.isOrigin==='2') && !allow_edit)">删除</el-button>-->
            </el-col>
          </el-row>
        </div>
        <el-form-item v-if="!allow_edit" style="margin-left: 30%">
          <el-button type="primary" @click="addInform">新增催收公告</el-button>
          <el-popconfirm
              v-if="inform_length < form1.informList.length"
              title="确定提交新增的催收公告？"
              @confirm="addUrgingNotice(index1)">
            <el-button
                type="primary"
                slot="reference"
                style="margin-left: 20px">
              提交
            </el-button>
          </el-popconfirm>
        </el-form-item>
      </div>

<!--      <el-divider></el-divider>-->
<!--      <span style="font-family: 黑体; font-weight: bold;font-size: 20px">还款明细</span>-->
<!--      <el-table :data="tableData" border height="300" style="width: 100%" class="el-table">-->
<!--        <el-table-column prop="id" label="资产包ID" width="250"></el-table-column>-->
<!--        <el-table-column prop="iouId" label="借据号" width="250"></el-table-column>-->
<!--        <el-table-column prop="obligor" label="债务人" width="150"></el-table-column>-->
<!--        <el-table-column prop="tradingDayPrincipal" label="交易日本金" width="150"></el-table-column>-->
<!--        <el-table-column prop="tradingDayInterest" label="交易日利息" width="150"></el-table-column>-->
<!--        <el-table-column prop="otherFees" label="其他费用" width="150"></el-table-column>-->
<!--        <el-table-column prop="creditTotalFee" label="债权总额" width="150"></el-table-column>-->
<!--        <el-table-column prop="remarks" label="备注" width="300"></el-table-column>-->
<!--        <el-table-column prop="operate" label="操作">-->
<!--          删除-->
<!--        </el-table-column>-->
<!--      </el-table>-->
    </el-form>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "assetPackInfo",
  data(){
    return{
      form1:{
        assetPackageId:'',
        assetNum:'',
        costDebtTotal:'',
        recycleTotal:'',
        creditor:'',
        originalCreditor:'',
        considerationPayer:'',
        remarks:'',
        debtPaymentTotal:"",
        informList:[]
      },
      allow_edit:false,
      edit_label:'编辑',
      origin_form_data:'',
      options: [
        {value: '天惠投资', label: '天惠投资'},
        {value: '天晟投资', label: '天晟投资'},
        {value: '天工惠农小贷', label: '天工惠农小贷'},
        {value: '银润小贷', label: '银润小贷'},
        {value: '阳光企业', label: '阳光企业'}],
      options1:[
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
        {value: '省级媒体', label: '省级媒体'},
        {value: '直接送达', label: '直接送达'},
        {value: '邮寄送达', label: '邮寄送达'},
        {value: '本地媒体', label: '本地媒体'}],
      tableData: [],
      temp_informID: 0,
      inform_length:0
    }
  },
  created() {
    var _this = this;
    api({
      url: "assetPackage/getAssetPackage",
      method: "get",
      params:{
        id:_this.$route.query.assetPackageId,
      }
    }).then(data => {
      console.log(data)
      _this.origin_form_data = data.data.datas;
      this.jsondata2form(_this.origin_form_data);

      console.log(this.form1.informList.length);
      this.temp_informID=_this.form1.informList.length-1;
      console.log(_this.temp_informID);
      console.log(_this.form1.informList)
    }).catch(err => {
      console.log(err);
    })
  },
  methods:{
    getInformID(){
      this.temp_informID++;
      return this.temp_informID;
    },
    jsondata2form(data){
      let informList1 = []
      for(let i=0;i<data.urgingNoticeDaoList.length;i++){
        informList1.push({key:i, urgingId:data.urgingNoticeDaoList[i].id, method:data.urgingNoticeDaoList[i].urgingType,
          date:data.urgingNoticeDaoList[i].urgingNoticeDate, isOrigin:'1'});
      }
      this.form1.assetPackageId = data.id;
      this.form1.debtPaymentTotal = data.debtPaymentTotal;
      // this.form1.creditNum = data.creditNum;
      // this.form1.recycleTotal = data.recycleTotal;
      this.form1.creditor = data.creditor;
      this.form1.originalCreditor = data.originalCreditor;
      this.form1.costDebtTotal = data.costDebtTotal;
      this.form1.remarks = data.remarks;
      this.form1.informList = informList1;
      this.inform_length = data.urgingNoticeDaoList.length;
      this.form1.assetNum = this.$route.query.assetNum;
    },
    addIou(){
      let newPage = this.$router.resolve({
        path:'/creditInfo/FInfo',
        query:{
          data:JSON.stringify({
            assetPackageId:this.form1.assetPackageId,
            creditor:this.form1.creditor,
            originalCreditor:this.form1.originalCreditor,
            claimsType:'2'
          })
        },
      })
      window.open(newPage.href,'_blank');
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
    submit(){
      var _this = this;
      let informList1 = []
      for(let j=0;j<this.form1.informList.length;j++){
        informList1.push({id:this.form1.informList[j].urgingId, assetPackageId:this.form1.assetPackageId,urgingType:this.form1.informList[j].method,
          urgingNoticeDate:this.form1.informList[j].date,deleteFlag:0});
      }
      // console.log({
      //   id:_this.form1.assetPackageId,
      //   creditor: _this.form1.creditor,
      //   originalCreditor:_this.form1.originalCreditor,
      //   costDebtTotal:_this.form1.costDebtTotal,
      //   recycleTotal:_this.form1.recycleTotal,
      //   remarks: _this.form1.remarks,
      //   urgingNoticeDaoList: informList1
      // })
      api({
        url: "/assetPackage/updateAssetPackage",
        method: "post",
        data:{
          id:_this.form1.assetPackageId,
          creditor: _this.form1.creditor,
          originalCreditor:_this.form1.originalCreditor,
          costDebtTotal:_this.form1.costDebtTotal,
          recycleTotal:_this.form1.recycleTotal,
          remarks: _this.form1.remarks,
          urgingNoticeDaoList: informList1
        }
      }).then(data => {
        console.log(data);
        location.reload();
      }).catch(err => {
        console.log(err);
      })
    },
    addUrgingNotice(index1){
      var _this = this;
      let informList1 = []
      for(let j=_this.inform_length;j<this.form1.informList.length;j++){
        informList1.push({assetPackageId:this.form1.assetPackageId,urgingType:this.form1.informList[j].method,
          urgingNoticeDate:this.form1.informList[j].date,deleteFlag:0});
      }
      api({
        url: "/assetPackage/addAssetPackageUrgingNotice",
        method: "post",
        data:{
          id:_this.form1.assetPackageId,
          urgingNoticeDaoList: informList1
        }
      }).then(data => {
        console.log(data);
        location.reload();
      }).catch(err => {
        console.log(err);
      })
    },
    //催收公告
    addInform(index1){
      this.form1.informList.push({key:this.getInformID(),method:'',date:'',isOrigin:'2'});
      console.log(this.form1.informList.length)
    },
    removeInform(inform,index1){
      if(this.form1.informList[index1].isOrigin==='1'){
        api({
          url: "/assetPackage/deleteAssetPackageUrgingNotice",
          method: "post",
          data:{
            urgingNoticeDaoList:[{id:this.form1.informList[index1].urgingId}]
          }
        }).then(data => {
          console.log(data);
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }
      else {
        var index1 = this.form1.informList.indexOf(inform);
        if (index1 !== -1) {
          this.form1.informList.splice(index1, 1);
        }
      }
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
}
.el-table{
  margin-top: 20px;
}
</style>
