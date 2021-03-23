<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1" to="/creditInfo/assetPackage/assetPackMenu">资产包</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">资产包录入</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="el-row1">
      <el-col :span="24">
        <div class="grid-content">
          <el-button @click="reset('formLabelAlign')">清空</el-button>
          <el-popconfirm
              title="确定提交？"
              style="margin-right: 40px;margin-left: 20px"
              @confirm="submit">
            <el-button type="primary" slot="reference">提交</el-button>
          </el-popconfirm>
        </div>
      </el-col>
    </el-row>

      <el-form :label-position="labelPosition" :model="formLabelAlign" label-width="150px" style="margin-top: 20px">
        <el-form-item label="资产包ID">
          <el-input clearable v-model="formLabelAlign.id" style="width: 40%"></el-input>
        </el-form-item>
        <el-form-item label="资产包债权人">
          <el-select v-model="formLabelAlign.creditor" clearable filterable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产包原债权人">
          <el-select v-model="formLabelAlign.originalCreditor" clearable filterable placeholder="请选择">
            <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="债权总成本">
          <el-input clearable v-model="formLabelAlign.costDebtTotal" style="width: 40%"></el-input>
        </el-form-item>
        <el-form-item label="回收款合计">
          <el-input clearable v-model="formLabelAlign.recycleTotal" style="width: 40%"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input clearable v-model="formLabelAlign.remarks" style="width: 40%" type="textarea" autosize></el-input>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
<!--      <span>受让前催收公告</span>-->
      <el-form :model="formInline" class="form2">

        <div>
          <span style="font-family: 黑体;font-size: 18px">受让前催收公告</span>
          <div v-for="(inform,index) in formInline.inform"
              :key="inform.key" style="margin-top: 20px">
            <el-row :gutter="20">
              <el-col :span="9" :offset="1">
                <el-form-item label="催告方式：" class="form_item">
                  <el-select v-model="inform.method">
                    <el-option label="省级媒体" value="省级媒体"></el-option>
                    <el-option label="直接送达" value="直接送达"></el-option>
                    <el-option label="邮寄送达" value="邮寄送达"></el-option>
                    <el-option label="本地媒体" value="本地媒体"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="催收公告日:" class="form_item">
                  <el-date-picker
                      v-model="inform.date"
                      type="date"
                      placeholder="选择日期"
                      style="width: 70%">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-button @click.prevent="removeInform(inform)" type="danger">删除</el-button>
              </el-col>
            </el-row>
          </div>
          <el-form-item style="margin-left: 30%">
            <el-button type="primary" @click="addInform">新增催收公告</el-button>
            <el-button @click="resetInform">重置</el-button>
          </el-form-item>
        </div>
      </el-form>

  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "assetPack-add",
  data(){
    return{
      labelPosition: 'right',
      formLabelAlign: {
        id:'',
        creditor: '',
        originalCreditor:'',
        costDebtTotal:'',
        recycleTotal:'',
        remarks:''
      },
      formInline: {
        inform:[{key:'', method:'', date:''}]
      },
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
      temp_informID: 0

    }
  },
  methods:{
    reset(){
      this.formLabelAlign = this.$options.data().formLabelAlign
      this.formInline = this.$options.data().formInline
    },
    submit(){
      var _this = this;
      let informList = []
      for(let i=0;i<this.formInline.inform.length;i++){
        informList.push({assetPackageId:this.formLabelAlign.id,urgingType:this.formInline.inform[i].method,
          urgingNoticeDate:this.formInline.inform[i].date,deleteFlag:0});
      }

      api({
        url: "assetPackage/addAssetPackage",
        method: "post",
        data:{
          id:_this.formLabelAlign.id,
          creditor: _this.formLabelAlign.creditor,
          originalCreditor:_this.formLabelAlign.originalCreditor,
          costDebtTotal:_this.formLabelAlign.costDebtTotal,
          recycleTotal:_this.formLabelAlign.recycleTotal,
          remarks: _this.formLabelAlign.remarks,
          urgingNoticeDaoList: informList
        }
      }).then(data => {
        console.log(data);
        this.$router.replace('/creditInfo/assetPackage/assetPackMenu');
      }).catch(err => {
        console.log(err);
      })
    },
    //催收公告
    addInform(){
      this.formInline.inform.push({key:this.getInformID,method:'',date:''});
      console.log(this.formInline.temp_informID)
    },
    removeInform(inform){
      var index = this.formInline.inform.indexOf(inform);
      if (index !== -1) {
        this.formInline.inform.splice(index, 1);
      }
    },
    resetInform(){
      this.formInline.inform=[{key:this.getInformID,method:'',date:''}];
    }
  },
  computed:{
    getInformID(){
      this.temp_informID++;
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
.boxcard1{
  margin-top: 40px;
  width: 90%;
}
.form2{
  margin-top: 20px;
  margin-left: 30px;
}
.el-icon-circle-plus{
  font-size: 200%;
}
</style>
