<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">担保抵押信息</el-breadcrumb-item>
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
<!--      <el-menu-item index="1">-->
<!--        <router-link to="/creditInfo/Finfo">债权基本信息</router-link>-->
<!--      </el-menu-item>-->
      <el-menu-item index="2">
        担保抵押信息
      </el-menu-item>
<!--      <el-menu-item index="3">-->
<!--        <router-link to="/creditInfo/fee">债权费用信息</router-link>-->
<!--      </el-menu-item>-->
    </el-menu>

    <el-form style="margin-top: 20px" ref="form1" :model="form1" label-width="130px">
      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="担保方式：" class="form_item">
            <el-select v-model="form1.form_guaranteeMethod" clearable placeholder="请选择" style="width: 100%">
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
          <el-form-item label="担保提醒时效:" class="form_item">
            <el-input v-model="form1.form_reminderDay" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="担保起始日：" class="form_item">
            <el-date-picker
                v-model="form1.form_guaranteeStartDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-form-item label="担保到期日:" class="form_item">
            <el-date-picker
                v-model="form1.form_guaranteeEndDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="60">
        <el-col :span="9" :offset="1">
          <el-form-item label="备注：" class="form_item">
            <el-input v-model="form1.form_note" clearable type="textarea" autosize></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider></el-divider>
      <span style="font-family: 黑体;font-size: 18px">担保对象</span>
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

      <el-divider></el-divider>
      <span style="font-family: 黑体;font-size: 18px">担保人</span>
      <el-form-item
          v-for="(guarantor, index) in form1.guarantor"
          :label="'担保人' + index"
          :key="guarantor.key"
          style="margin-top: 20px;margin-left: 200px">
        <el-input v-model="guarantor.value" style="width: 30%"></el-input>
        <el-button
            @click.prevent="removeGuarantor(guarantor)"
            icon="el-icon-delete"
            circle
            type="danger"
            style="margin-left: 20px">
        </el-button>
      </el-form-item>
      <el-form-item style="margin-left: 200px">
        <el-button type="primary" @click="addGuarantor">新增担保人</el-button>
        <el-button @click="resetGuarantor">重置</el-button>
      </el-form-item>

      <el-divider></el-divider>
      <div v-if="Boolean(form1.form_guaranteeMethod==='抵押')">
        <span style="font-family: 黑体;font-size: 18px">抵押物</span>
        <div
            v-for="(collatera,index) in form1.form_collatera"
            :key="collatera.key">
          <el-row :gutter="60">
            <el-col :span="9" :offset="1">
              <el-form-item label="抵押物名称：" class="form_item">
                <el-input v-model="collatera.collateralName" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="9">
              <el-form-item label="抵押物位置:" class="form_item">
                <el-input v-model="collatera.collateralLocation" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="60">
            <el-col :span="9" :offset="1">
              <el-form-item label="土地面积：" class="form_item">
                <el-input v-model="collatera.landArea" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="9">
              <el-form-item label="房产面积:" class="form_item">
                <el-input v-model="collatera.propertySize" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="60">
            <el-col :span="9" :offset="1">
              <el-form-item label="抵押物评估价：" class="form_item">
                <el-input v-model="collatera.appraisedValue" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="抵押物登记金额:" class="form_item">
                <el-input v-model="collatera.registrationAmount" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button @click.prevent="removeCollatera(collatera)" type="danger">删除</el-button>
            </el-col>
          </el-row>

        </div>
        <el-form-item style="margin-left: 200px">
          <el-button type="primary" @click="addCollatera">新增抵押物</el-button>
          <el-button @click="resetCollatera">重置</el-button>
        </el-form-item>
      </div>
      <div v-if="Boolean(form1.form_guaranteeMethod==='质押')">
        <span style="font-family: 黑体;font-size: 18px">抵押物</span>
        <div
            v-for="(pledge,index) in form1.form_pledges"
            :key="pledge.key">
          <el-row :gutter="60">
            <el-col :span="9" :offset="1">
              <el-form-item label="质押物名称：" class="form_item">
                <el-input v-model="pledge.pledgeName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="质押物价值:" class="form_item">
                <el-input v-model="pledge.pledgeValue" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button @click.prevent="removePledge(pledge)" type="danger">删除</el-button>
            </el-col>
          </el-row>
        </div>
        <el-form-item style="margin-left: 200px">
          <el-button type="primary" @click="addPledge">新增质押物</el-button>
          <el-button @click="resetPledge">重置</el-button>
        </el-form-item>
      </div>

      <div v-if="Boolean(form1.form_guaranteeMethod==='保证')">
        <span style="font-family: 黑体;font-size: 18px">保证期间</span>
        <div
            v-for="(period,index) in form1.form_assurancePeriod"
            :key="period.key">
          <el-row :gutter="60">
            <el-col :span="9" :offset="1">
              <el-form-item label="保证期间起始日：" class="form_item">
                <el-date-picker
                    v-model="period.assuranceStartDate"
                    type="date"
                    placeholder="选择日期"
                    style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="保证期间到期日:" class="form_item">
                <el-date-picker
                    v-model="period.assuranceEndDate"
                    type="date"
                    placeholder="选择日期"
                    style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button @click.prevent="removePeriod(period)" type="danger">删除</el-button>
            </el-col>
          </el-row>
        </div>
        <el-form-item style="margin-left: 200px">
          <el-button type="primary" @click="addPeriod">新增保证期间</el-button>
          <el-button @click="resetPeriod">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SMortgage",
  data() {
    return {
      activeIndex: '2',
      form1: {
        form_guaranteeMethod: '',
        form_reminderDay: '',
        form_guaranteeStartDate: '',
        form_guaranteeEndDate: '',
        form_note: '',
        form_ious: [{key:'',value:''}],
        form_collatera:[{key:'',collateralName:'',collateralLocation:'',landArea:'',propertySize:'',appraisedValue:'',registrationAmount:''}],
        form_pledges: [{key:'',pledgeName:'',pledgeValue:''}],
        form_assurancePeriod: [{key:'',assuranceStartDate:'',assuranceEndDate:''}],
        guarantor:[{key:'', value:''}]
      },
      options:[{
        value: '抵押',
        label: '抵押担保'
      }, {
        value: '质押',
        label: '质押担保'
      }, {
        value: '保证',
        label: '保证担保'
      }, {
        value: '留置',
        label: '留置'
      }, {
        value: '其他',
        label: '其他担保'
      }],
      pickerOptions:[],
      temp_iouId:0,
      temp_collateraId:0,
      temp_pledgeId:0,
      temp_assurancePeriodId:0,
      temp_guarantorId:0
    }
    },
  created() {
    this.iouinit();
  },
  methods:{
    reset(){
      this.iouinit();
      this.form1.form_guaranteeMethod='';
      this.form1.form_reminderDay= '';
      this.form1.form_guaranteeStartDate= '';
      this.form1.form_guaranteeEndDate= '';
      this.form1.form_note= '';
      this.form1.form_collatera=[{key:this.getCollateraId,collateralName:'',collateralLocation:'',landArea:'',propertySize:'',appraisedValue:'',registrationAmount:''}];
      this.form1.form_pledges= [{key:this.getPledgeId,pledgeName:'',pledgeValue:''}];
      this.form1.form_assurancePeriod= [{key:this.getAssurancePeriodId,assuranceStartDate:'',assuranceEndDate:''}];
      this.form1.guarantor=[{key:this.getTempGuarantorId,value:''}]
    },
    submit(){

    },
    iouinit(){
      this.form1.form_ious=[];
      let i;
      let str='';
      let x=JSON.parse(this.$route.query.creditList);
      for (i=0;i<x.length;i++){
        //去除两端的空格
        str=x[i].replace(/^\s+|\s+$/g,"");
        this.form1.form_ious.push({key:this.getTempIouId, value: str});
      }
    },
    //担保人
    addGuarantor(){
      this.form1.guarantor.push({key:this.getTempGuarantorId,value: ''});
    },
    removeGuarantor(guarantor){
      var index = this.form1.guarantor.indexOf(guarantor);
      if (index !== -1) {
        this.form1.guarantor.splice(index, 1);
      }
    },
    resetGuarantor(){
      this.form1.guarantor=[{key:this.getTempGuarantorId,value: ''}];
    },

    //借据对象
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
      this.form1.form_ious=[{key:this.getTempIouId, value: ''}];
    },

    //抵押物
    addCollatera(){
      this.form1.form_collatera.push({key:this.getCollateraId,collateralName:'',collateralLocation:'',landArea:'',propertySize:'',appraisedValue:'',registrationAmount:''});
    },
    removeCollatera(collatera){
      var index = this.form1.form_collatera.indexOf(collatera);
      if (index !== -1) {
        this.form1.form_collatera.splice(index, 1);
      }
    },
    resetCollatera(){
      this.form1.form_collatera=[{key:this.getCollateraId,collateralName:'',collateralLocation:'',landArea:'',propertySize:'',appraisedValue:'',registrationAmount:''}];
    },

    //质押物
    addPledge(){
      this.form1.form_pledges.push({key:this.getPledgeId,pledgeName:'',pledgeValue:''});
    },
    removePledge(pledge){
      var index = this.form1.form_pledges.indexOf(pledge);
      if (index !== -1) {
        this.form1.form_pledges.splice(index, 1);
      }
    },
    resetPledge(){
      this.form1.form_pledges=[{key:this.getPledgeId,pledgeName:'',pledgeValue:''}];
    },

    //保证期间
    addPeriod(){
      this.form1.form_assurancePeriod.push({key:this.getAssurancePeriodId,assuranceStartDate:'',assuranceEndDate:''});
    },
    removePeriod(period){
      var index = this.form1.form_assurancePeriod.indexOf(period);
      if (index !== -1) {
        this.form1.form_assurancePeriod.splice(index, 1);
      }
    },
    resetPeriod(){
      this.form1.form_assurancePeriod=[{key:this.getAssurancePeriodId,assuranceStartDate:'',assuranceEndDate:''}];
    }
  },
  computed:{
    getCollateraId(){
      this.temp_collateraId++;
    },
    getPledgeId(){
      this.temp_pledgeId++;
    },
    getAssurancePeriodId(){
      this.temp_assurancePeriodId++;
    },
    getTempIouId(){
      this.temp_iouId++;
    },
    getTempGuarantorId(){
      this.temp_guarantorId++;
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
.grid-content1{
  background-color: #DCDFE6;
  text-align: end;
}
</style>