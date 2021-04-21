<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/timeRemider"><i class="el-icon-s-home"></i></el-breadcrumb-item>
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

    <el-form style="margin-top: 20px" ref="form1" :model="form1" label-width="140px" :rules="rules">

      <el-form-item label="担保方式：" class="form_item" style="margin-left: 200px" prop="guaranteeMethod">
        <el-select v-model="form1.guaranteeMethod" clearable placeholder="请选择" style="width: 30%">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="备注：" class="form_item" style="margin-left: 200px" prop="note">
        <el-input v-model="form1.note" clearable type="textarea" autosize  style="width: 30%"></el-input>
      </el-form-item>

      <el-divider></el-divider>
      <span style="font-family: 黑体;font-size: 18px">担保对象</span>
      <el-form-item
          v-for="(iou, index) in form1.iouIdList"
          :label="'借据号' + index"
          :key="iou.key"
          :prop="'iouIdList.'+index+'.value'"
          :rules="{required:true,message:'不允许为空',trigger:['blur','change']}"
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
      <div v-if="Boolean(form1.guaranteeMethod==='0')">
        <span style="font-family: 黑体;font-size: 18px">抵押物</span>
        <div
            v-for="(collatera,index1) in form1.collateralList"
            :key="collatera.key">

          <el-row :gutter="60">
            <el-col :span="9" :offset="1">
              <el-form-item
                  label="抵押物名称："
                  class="form_item"
                  :prop="'collateralList.'+index1+'.collateralName'"
                  :rules="{required:true,message:'不允许为空',trigger:['blur','change']}">
                <el-input v-model="collatera.collateralName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="抵押物类型:" class="form_item"
                  :prop="'collateralList.'+index1+'.collateralType'"
                  :rules="{required:true,message:'不允许为空',trigger:['blur','change']}">
                <el-select v-model="collatera.collateralType" clearable placeholder="请选择" style="width: 100%">
                  <el-option
                      v-for="item in collateralType_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button @click.prevent="removeCollatera(collatera)" type="danger">删除</el-button>
            </el-col>
          </el-row>

          <el-row :gutter="60">
            <el-col :span="9" :offset="1">
              <el-form-item label="抵押物位置:" class="form_item">
                <el-input v-model="collatera.collateralLocation" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item
                  label="房产面积(平方米):"
                  class="form_item"
                  :prop="'collateralList.'+index1+'.propertySize'"
                  :rules="{pattern:/^\d+(\.\d*)?$/,message:'必须为数字',trigger:['change','blur']}">
                <el-input v-model="collatera.propertySize" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="60">
            <el-col :span="9" :offset="1">
              <el-form-item label="土地性质：" class="form_item">
                <el-select v-model="collatera.landType" clearable placeholder="请选择" style="width: 100%">
                  <el-option
                      v-for="item in landType_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item
                  label="土地面积(亩):"
                  class="form_item"
                  :prop="'collateralList.'+index1+'.landArea'"
                  :rules="{pattern:/^\d+(\.\d*)?$/,message:'必须为数字',trigger:['change','blur']}">
                <el-input v-model="collatera.landArea" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="60">
            <el-col :span="9" :offset="1">
              <el-form-item
                  label-width="135px"
                  label="抵押物评估价(元)："
                  class="form_item"
                  :prop="'collateralList.'+index1+'.appraisedValue'"
                  :rules="{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']}">
                <el-input v-model="collatera.appraisedValue" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item
                  label-width="140px"
                  label="抵押物登记金额(元):"
                  class="form_item"
                  :prop="'collateralList.'+index1+'.registrationAmount'"
                  :rules="{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']}">
                <el-input v-model="collatera.registrationAmount" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="60">
            <el-col :span="9" :offset="1">
              <el-row>
                <el-col :span="16">
                  <el-form-item
                      label-width="150px"
                      label="抵押期限起止日期："
                      class="form_item"
                      :prop="'collateralList.'+index1+'.guaranteeStartDate'"
                      :rules="{required:true,message:'不允许为空',trigger:['blur','change']}">
                    <el-date-picker
                        v-model="collatera.guaranteeStartDate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width: 100%">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                      label-width="3px"
                      :prop="'collateralList.'+index1+'.guaranteeEndDate'"
                      :rules="{required:true,message:'不允许为空',trigger:['blur','change']}">
                    <el-date-picker
                        v-model="collatera.guaranteeEndDate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width: 100%">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="9">
              <el-form-item
                  class="form_item"
                  :prop="'collateralList.'+index1+'.reminderDay'"
                  :rules="[{required:true,message:'不允许为空',trigger:['blur','change']},{pattern:/^\d+$/,message:'必须为数字',trigger:['change','blur']}]">
                <template slot="label">
                  <span>提醒时间(天):</span>
                  <el-tooltip class="item" effect="dark" content="提前多长时间进行时效提醒" placement="top-start">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </template>
                <el-input v-model="collatera.reminderDay" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item
              v-for="(guarantor, index2) in collatera.guarantor"
              :label="'抵押人' + index2+':'"
              :key="guarantor.key"
              style="margin-top: 10px;margin-left: 53px"
              :prop="'collateralList.'+index1+'.guarantor.'+index2+'.value'"
              :rules="{required:true,message:'不允许为空',trigger:['blur','change']}">
            <el-input v-model="guarantor.value" style="width: 28%"></el-input>
            <el-button
                @click.prevent="removeGuarantor(index1,guarantor)"
                icon="el-icon-delete"
                circle
                type="danger"
                style="margin-left: 20px">
            </el-button>
          </el-form-item>
          <el-form-item style="margin-left: 53px">
            <el-button type="primary" @click="addGuarantor(index1)">新增抵押人</el-button>
            <el-button @click="resetGuarantor(index1)">重置</el-button>
          </el-form-item>
        </div>
        <el-form-item style="margin-left: 300px">
          <el-button type="primary" @click="addCollatera">新增抵押物</el-button>
          <el-button @click="resetCollatera">重置</el-button>
        </el-form-item>
      </div>

      <div v-if="Boolean(form1.guaranteeMethod==='1')">
        <span style="font-family: 黑体;font-size: 18px">质押物</span>
        <div
            v-for="(pledge,index1) in form1.pledgesList"
            :key="pledge.key">
          <el-row :gutter="60">
            <el-col :span="9" :offset="1">
              <el-form-item
                  label="质押物名称："
                  class="form_item"
                  :prop="'pledgesList.'+index1+'.pledgesName'"
                  :rules="{required:true,message:'不允许为空',trigger:['blur','change']}">
                <el-input v-model="pledge.pledgesName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item
                  label="质押物价值(元):"
                  class="form_item"
                  :prop="'pledgesList.'+index1+'.pledgesValue'"
                  :rules="{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']}">
                <el-input v-model="pledge.pledgesValue" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button @click.prevent="removePledge(pledge)" type="danger">删除</el-button>
            </el-col>
          </el-row>

          <el-row :gutter="60">
            <el-col :span="9" :offset="1">
              <el-form-item
                  label="质押物类型："
                  class="form_item"
                  :prop="'pledgesList.'+index1+'.pledgesType'"
                  :rules="{required:true,message:'不允许为空',trigger:['blur','change']}">
                <el-select v-model="pledge.pledgesType" clearable placeholder="请选择" style="width: 100%">
                  <el-option
                      v-for="item in pledgesType_options"
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
              <el-row>
                <el-col :span="16">
                  <el-form-item
                      label-width="150px"
                      label="质押期限起止日期："
                      class="form_item"
                      :prop="'pledgesList.'+index1+'.guaranteeStartDate'"
                      :rules="{required:true,message:'不允许为空',trigger:['blur','change']}">
                    <el-date-picker
                        v-model="pledge.guaranteeStartDate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width: 100%">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                      label-width="3px"
                      :prop="'pledgesList.'+index1+'.guaranteeEndDate'"
                      :rules="{required:true,message:'不允许为空',trigger:['blur','change']}">
                    <el-date-picker
                        v-model="pledge.guaranteeEndDate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width: 100%">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="9">
              <el-form-item
                  class="form_item"
                  :prop="'pledgesList.'+index1+'.reminderDay'"
                  :rules="[{required:true,message:'不允许为空',trigger:['blur','change']},{pattern:/^\d+$/,message:'必须为数字',trigger:['change','blur']}]">
                <template slot="label">
                  <span>提醒时间(天):</span>
                  <el-tooltip class="item" effect="dark" content="提前多长时间进行时效提醒" placement="top-start">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </template>
                <el-input v-model="pledge.reminderDay" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item
              v-for="(guarantor, index2) in pledge.guarantor"
              :label="'质押人' + index2+':'"
              :key="guarantor.key"
              style="margin-top: 10px;margin-left: 53px"
              :prop="'pledgesList.'+index1+'.guarantor.'+index2+'.value'"
              :rules="{required:true,message:'不允许为空',trigger:['blur','change']}">
            <el-input v-model="guarantor.value" style="width: 28%"></el-input>
            <el-button
                @click.prevent="removeGuarantor(index1,guarantor)"
                icon="el-icon-delete"
                circle
                type="danger"
                style="margin-left: 20px">
            </el-button>
          </el-form-item>
          <el-form-item style="margin-left: 53px">
            <el-button type="primary" @click="addGuarantor(index1)">新增质押人</el-button>
            <el-button @click="resetGuarantor(index1)">重置</el-button>
          </el-form-item>

        </div>
        <el-form-item style="margin-left: 200px">
          <el-button type="primary" @click="addPledge">新增质押物</el-button>
          <el-button @click="resetPledge">重置</el-button>
        </el-form-item>
      </div>

      <div v-if="Boolean(form1.guaranteeMethod==='2')">
        <span style="font-family: 黑体;font-size: 18px">保证担保</span>
        <div
            v-for="(period,index1) in form1.assuranceList"
            :key="period.key">
          <el-row :gutter="60">
            <el-col :span="9" :offset="1">
              <el-row>
                <el-col :span="16">
                  <el-form-item
                      label-width="150px"
                      label="保证期限起止日期："
                      class="form_item"
                      :prop="'assuranceList.'+index1+'.guaranteeStartDate'"
                      :rules="{required:true,message:'不允许为空',trigger:['blur','change']}">
                    <el-date-picker
                        v-model="period.guaranteeStartDate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width: 100%">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                      label-width="3px"
                      :prop="'assuranceList.'+index1+'.guaranteeEndDate'"
                      :rules="{required:true,message:'不允许为空',trigger:['blur','change']}">
                    <el-date-picker
                        v-model="period.guaranteeEndDate"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        style="width: 100%">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-col>
            <el-col :span="9">
              <el-form-item
                  class="form_item"
                  :prop="'assuranceList.'+index1+'.reminderDay'"
                  :rules="[{required:true,message:'不允许为空',trigger:['blur','change']},{pattern:/^\d+$/,message:'必须为数字',trigger:['change','blur']}]">
                <template slot="label">
                  <span>提醒时间(天):</span>
                  <el-tooltip class="item" effect="dark" content="提前多长时间进行时效提醒" placement="top-start">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </template>
                <el-input v-model="period.reminderDay" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button @click.prevent="removePeriod(period)" type="danger">删除</el-button>
            </el-col>
          </el-row>

          <el-form-item
              v-for="(guarantor, index2) in period.guarantor"
              :label="'保证人' + index2+':'"
              :key="guarantor.key"
              style="margin-top: 10px;margin-left: 53px"
              :prop="'assuranceList.'+index1+'.guarantor.'+index2+'.value'"
              :rules="{required:true,message:'不允许为空',trigger:['blur','change']}">
            <el-input v-model="guarantor.value" style="width: 28%"></el-input>
            <el-button
                @click.prevent="removeGuarantor(index1,guarantor)"
                icon="el-icon-delete"
                circle
                type="danger"
                style="margin-left: 20px">
            </el-button>
          </el-form-item>
          <el-form-item style="margin-left: 53px">
            <el-button type="primary" @click="addGuarantor(index1)">新增保证人</el-button>
            <el-button @click="resetGuarantor(index1)">重置</el-button>
          </el-form-item>
        </div>
        <el-form-item style="margin-left: 200px">
          <el-button type="primary" @click="addPeriod">新增保证担保</el-button>
          <el-button @click="resetPeriod">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "SMortgage",
  data() {
    return {
      activeIndex: '2',
      form1: {
        guaranteeMethod:'',
        note:'',
        iouIdList:[],
        collateralList:[],
        // {key:'',collateralName:'',collateralType:'',collateralLocation:'',landArea:'',landType:'', propertySize:'',appraisedValue:'',registrationAmount:'',guarantor:[],guaranteeStartDate:'', guaranteeEndDate:'',reminderDay:''}
        pledgesList:[],
        // key:'',pledgesName:'',pledgesValue:'',pledgesType:'',guarantor:[],guaranteeStartDate:'',guaranteeEndDate:'',reminderDay:''
        assuranceList:[]
        // key:'', guarantor:[],guaranteeStartDate:'',guaranteeEndDate:'',reminderDay:''
      },
      rules:{
        guaranteeMethod:{required:true,message:'不允许为空',trigger:['blur','change']}
      },
      options:[
        {value: '0', label: '抵押担保'},
        {value: '1', label: '质押担保'},
        {value: '2', label: '保证担保'},
        {value: '3', label: '综合担保'}],
      collateralType_options:[
        {value:'0', label:'建筑物和其它土地附着物'},
        {value:'1', label:'建设用地使用权'},
        {value:'2', label:'海域使用权'},
        {value:'3', label:'生产设备、原材料、半成品、产品'},
        {value:'4', label:'交通运输工具'},
        {value:'5', label:'其它'}],
      landType_options:[
        {value:'0', label:'工业用地'},
        {value:'1', label:'商业用地'}],
      pledgesType_options:[
        {value:'0', label:'动产'},
        {value:'1', label:'汇票、支票、本票'},
        {value:'2', label:'债券、存款单'},
        {value:'3', label:'仓单、提单'},
        {value:'4', label:'基金份额、股权'},
        {value:'5', label:'知识产权中的财产权'},
        {value:'6', label:'其它'}],
      pickerOptions:[],
      temp_key:0
    }
    },
  created() {
    this.iouinit();
    this.form1.collateralList.push({key:this.getTempKey(),collateralName:'',collateralType:'',collateralLocation:'',landArea:'',landType:'', propertySize:'',appraisedValue:'',registrationAmount:'',guarantor:[{key:this.getTempKey(),value:''}],guaranteeStartDate:'', guaranteeEndDate:'',reminderDay:''})
    this.form1.pledgesList.push({key:this.getTempKey(),pledgesName:'',pledgesValue:'',pledgesType:'',guarantor:[{key:this.getTempKey(),value:''}],guaranteeStartDate:'',guaranteeEndDate:'',reminderDay:''})
    this.form1.assuranceList.push({key:this.getTempKey(), guarantor:[{key:this.getTempKey(),value:''}],guaranteeStartDate:'',guaranteeEndDate:'',reminderDay:''})
  },
  methods:{
    getTempKey(){
      this.temp_key++;
      return this.temp_key;
    },
    iouinit(){
      this.form1.iouIdList=[];
      let i;
      let str='';
      let x=JSON.parse(this.$route.query.creditList);
      let nkey;
      for (i=0;i<x.length;i++){
        //去除两端的空格
        str=x[i].replace(/^\s+|\s+$/g,"");
        this.form1.iouIdList.push({key:this.getTempKey(), value: str});
      }
    },
    reset(){
      this.iouinit();
      this.form1.collateralList=[{key:this.getTempKey(),collateralName:'',collateralType:'',collateralLocation:'',landArea:'',landType:'', propertySize:'',appraisedValue:'',registrationAmount:'',guarantor:[{key:this.getTempKey(),value:''}],guaranteeStartDate:'', guaranteeEndDate:'',reminderDay:''}];
      this.form1.pledgesList=[{key:this.getTempKey(),pledgesName:'',pledgesValue:'',pledgesType:'',guarantor:[{key:this.getTempKey(),value:''}],guaranteeStartDate:'',guaranteeEndDate:'',reminderDay:''}];
      this.form1.assuranceList=[{key:this.getTempKey(), guarantor:[{key:this.getTempKey(),value:''}],guaranteeStartDate:'',guaranteeEndDate:'',reminderDay:''}];
    },
    //借据对象
    addIou(){
      this.form1.iouIdList.push({key:this.getTempKey(),value: ''});
    },
    removeIou(iou){
      var index = this.form1.iouIdList.indexOf(iou);
      if (index !== -1) {
        this.form1.iouIdList.splice(index, 1);
      }
    },
    resetIou(){
      this.form1.iouIdList=[{key:this.getTempKey(), value: ''}];
    },

    addCollatera(){
      this.form1.collateralList.push({key:this.getTempKey(),collateralName:'',collateralType:'',collateralLocation:'',landArea:'',landType:'', propertySize:'',appraisedValue:'',registrationAmount:'',guarantor:[{key:this.getTempKey(),value:''}],guaranteeStartDate:'', guaranteeEndDate:'',reminderDay:''})
    },
    removeCollatera(collatera){
      var index = this.form1.collateralList.indexOf(collatera);
      if (index !== -1) {
        this.form1.collateralList.splice(index, 1);
      }
    },
    resetCollatera(){
      this.form1.collateralList=[{key:this.getTempKey(),collateralName:'',collateralType:'',collateralLocation:'',landArea:'',landType:'', propertySize:'',appraisedValue:'',registrationAmount:'',guarantor:[{key:this.getTempKey(),value:''}],guaranteeStartDate:'', guaranteeEndDate:'',reminderDay:''}]
    },

    //质押物
    addPledge(){
      this.form1.pledgesList.push({key:this.getTempKey(),pledgesName:'',pledgesValue:'',pledgesType:'',guarantor:[{key:this.getTempKey(),value:''}],guaranteeStartDate:'',guaranteeEndDate:'',reminderDay:''})
    },
    removePledge(pledge){
      var index = this.form1.pledgesList.indexOf(pledge);
      if (index !== -1) {
        this.form1.pledgesList.splice(index, 1);
      }
    },
    resetPledge(){
      this.form1.pledgesList=[{key:this.getTempKey(),pledgesName:'',pledgesValue:'',pledgesType:'',guarantor:[{key:this.getTempKey(),value:''}],guaranteeStartDate:'',guaranteeEndDate:'',reminderDay:''}];
    },

    //保证期间
    addPeriod(){
      this.form1.assuranceList.push({key:this.getTempKey(), guarantor:[{key:this.getTempKey(),value:''}],guaranteeStartDate:'',guaranteeEndDate:'',reminderDay:''})
    },
    removePeriod(period){
      var index = this.form1.assuranceList.indexOf(period);
      if (index !== -1) {
        this.form1.assuranceList.splice(index, 1);
      }
    },
    resetPeriod(){
      this.form1.assuranceList=[{key:this.getTempKey(), guarantor:[{key:this.getTempKey(),value:''}],guaranteeStartDate:'',guaranteeEndDate:'',reminderDay:''}];
    },

    //担保人
    addGuarantor(index){
      let typeIndex = {'0':'collateralList','1':'pledgesList','2':'assuranceList'};
      if(this.form1.guaranteeMethod !== '3'){
        this.form1[typeIndex[this.form1.guaranteeMethod]][index].guarantor.push({key:this.getTempKey(),value: ''});
      }
    },
    removeGuarantor(index,guarantor){
      let typeIndex = {'0':'collateralList','1':'pledgesList','2':'assuranceList'};
      if(this.form1.guaranteeMethod !== '3'){
        let gaurantors = this.form1[typeIndex[this.form1.guaranteeMethod]][index].guarantor;
        var i = gaurantors.indexOf(guarantor);
        if (i !== -1) {
          gaurantors.splice(i, 1);
        }
      }
    },
    resetGuarantor(index){
      let typeIndex = {'0':'collateralList','1':'pledgesList','2':'assuranceList'};
      if(this.form1.guaranteeMethod !== '3'){
        this.form1[typeIndex[this.form1.guaranteeMethod]][index].guarantor=[{key:this.getTempKey(),value: ''}];
      }
    },

    submit(){
      this.$refs['form1'].validate((valid) => {
        if(valid){
          let send_data = {};
          let typeIndex = {'0':'collateralInfo','1':'pledgesInfo','2':'assuranceInfo','3':'guaranteeInfo'};
          let typeIndex2 = {'0':'collateralList','1':'pledgesList','2':'assuranceList'};

          let guaranteeMethod = typeIndex[this.form1.guaranteeMethod];
          send_data[guaranteeMethod] = {};
          send_data[guaranteeMethod]['guaranteeMethod'] = this.form1.guaranteeMethod;
          send_data[guaranteeMethod]['note'] = this.form1.note;
          let iouList = [];
          for(let i=0;i<this.form1.iouIdList.length;i++){
            iouList.push(this.form1.iouIdList[i].value);
          }
          send_data[guaranteeMethod]['iouIdList'] = iouList;

          if(this.form1.guaranteeMethod !== '3'){
            let guaranteInfoList = typeIndex2[this.form1.guaranteeMethod];
            send_data[guaranteeMethod][guaranteInfoList] = [];

            for(let i=0;i<this.form1[guaranteInfoList].length;i++){
              let temp_dict = {};
              for(let key in this.form1[guaranteInfoList][i]){
                if(key === 'guarantor'){
                  let guarantors='';
                  let j;
                  for(j=0;j<this.form1[guaranteInfoList][i][key].length;j++){
                    if(j===0){
                      guarantors+=String(this.form1[guaranteInfoList][i][key][j].value);
                    }
                    else{
                      guarantors+=","+String(this.form1[guaranteInfoList][i][key][j].value)
                    }
                  }
                  temp_dict[key] = guarantors;
                }
                else if(key !== 'key'){
                  temp_dict[key] = this.form1[guaranteInfoList][i][key];
                }
              }
              send_data[guaranteeMethod][guaranteInfoList].push(temp_dict);
            }
          }
          console.log(send_data);
          api({
            url: "/Secure/addSecure",
            method: "post",
            data:send_data
          }).then(data => {
            console.log(data);
            if(data.data.success){
              this.$router.replace({path:'/creditInfo/creditFinfo/xqSmortgage',query:{iou:iouList[0]}});
            }
            else{
              this.$message(data.data.msg)
            }

          }).catch(err => {
            console.log(err);
          })
        }
        else{
          console.log('err submit')
          return false
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
.grid-content1{
  background-color: #DCDFE6;
  text-align: end;
}
</style>