<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/timeRemider"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">查询统计</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">以物抵债资产管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="el-row1">
      <el-col :span="24">
        <div class="grid-content">
          <el-button @click="edit">{{edit_label}}</el-button>
          <el-popconfirm
              title="确定提交？"
              style="margin-right: 40px;margin-left: 20px"
              @confirm="submit">
            <el-button type="primary" slot="reference">提交</el-button>
          </el-popconfirm>
        </div>
      </el-col>
    </el-row>

    <el-form style="margin-top: 15px" ref="form" :model="form" :rules="rules">
      <span class="span1">抵押物基本信息</span>
      <el-form-item style="margin-top: 15px">
        <el-row class="el-row3">
          <el-col :span="3"><div class="grid-content1" >抵押物ID：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2"><el-input v-model="form.id" clearable :disabled="true" style="width: 70%"></el-input></el-form-item></el-col>
          <el-col :span="3"><div class="grid-content1" >担保ID：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2">
            <el-input v-model="form.guaranteeId" clearable :disabled="true" style="width: 70%"></el-input>
            <el-button type="text" style="margin-left: 20px" @click="guranteeDetail">担保详情</el-button>
          </el-form-item></el-col>
        </el-row>
        <el-row class="el-row3">
          <el-col :span="3"><div class="grid-content1" >本金：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2"><el-input v-model="require_params.principal" clearable :disabled="true" style="width: 70%"></el-input></el-form-item></el-col>
          <el-col :span="3"><div class="grid-content1" >借款人：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2"><el-input v-model="require_params.borrower" clearable :disabled="true" style="width: 70%"></el-input></el-form-item></el-col>
        </el-row>
        <el-row class="el-row5">
          <el-col :span="3"><div class="grid-content1" >抵押物：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" prop="collateralName" :inline-message="true"><el-input style="width: 70%" v-model="form.collateralName" clearable :disabled="!allow_edit"></el-input></el-form-item></el-col>
          <el-col :span="3"><div class="grid-content1" >抵押物类型：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" prop="collateralType" :inline-message="true">
            <el-select v-model="form.collateralType" clearable placeholder="请选择" style="width: 70%" :disabled="!allow_edit">
              <el-option
                  v-for="item in collateralType_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item></el-col>
        </el-row>
        <el-row class="el-row6">
          <el-col :span="3"><div class="grid-content1" >抵押物位置：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2"><el-input style="width: 70%" v-model="form.collateralLocation" clearable :disabled="!allow_edit"></el-input></el-form-item></el-col>
          <el-col :span="3"><div class="grid-content1" >土地面积(亩)：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" prop="landArea" :inline-message="true"><el-input style="width: 70%" v-model="form.landArea" clearable :disabled="!allow_edit"></el-input></el-form-item></el-col>
        </el-row>
        <el-row class="el-row6">
          <el-col :span="3"><div class="grid-content1" >土地性质：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" :inline-message="true">
            <el-select v-model="form.landType" clearable placeholder="请选择" style="width: 70%" :disabled="!allow_edit">
              <el-option
                  v-for="item in landType_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
           </el-form-item></el-col>
          <el-col :span="3"><div class="grid-content1" >房产面积(平方米)：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" prop="propertySize" :inline-message="true"><el-input style="width: 70%" v-model="form.propertySize" clearable :disabled="!allow_edit"></el-input></el-form-item></el-col>
        </el-row>
        <el-row class="el-row6">
          <el-col :span="3"><div class="grid-content1" >评估价(元)：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" prop="appraisedValue" :inline-message="true"><el-input style="width: 70%" v-model="form.appraisedValue" clearable :disabled="!allow_edit"></el-input></el-form-item></el-col>
          <el-col :span="3"><div class="grid-content1" >登记金额(元)：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" prop="registrationAmount" :inline-message="true"><el-input style="width: 70%" v-model="form.registrationAmount" clearable :disabled="!allow_edit"></el-input></el-form-item></el-col>
        </el-row>
        <el-row class="el-row4">
          <el-col :span="3"><div class="grid-content1">抵押期限起始日：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" prop="guaranteeStartDate" :inline-message="true">
            <el-date-picker
                v-model="form.guaranteeStartDate"
                align="right"
                type="date"
                placeholder="选择日期"
                style="width: 70%"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="!allow_edit">
            </el-date-picker>
          </el-form-item></el-col>
          <el-col :span="3"><div class="grid-content1" >抵押期限到期日：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" prop="guaranteeEndDate" :inline-message="true">
            <el-date-picker
                v-model="form.guaranteeEndDate"
                align="right"
                type="date"
                placeholder="选择日期"
                style="width: 70%"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="!allow_edit">
            </el-date-picker>
          </el-form-item></el-col>
        </el-row>
        <el-row class="el-row4">
          <el-col :span="3"><div class="grid-content1" >时间提醒(天)：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" prop="reminderDay" :inline-message="true"><el-input style="width: 70%" v-model="form.reminderDay" clearable :disabled="!allow_edit"></el-input></el-form-item></el-col>
          <el-col :span="3"><div class="grid-content1" >是否被催告：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" prop="timeConversion" :inline-message="true">
            <el-select v-model="form.timeConversion" clearable placeholder="请选择" style="width: 70%" :disabled="!allow_edit">
              <el-option
                  v-for="item in isurge_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item></el-col>
        </el-row>
      </el-form-item>

      <el-divider></el-divider>
      <span class="span1">以物抵债详情</span>
      <el-form-item style="margin-top: 15px" v-if="!debtInKindDeleteFlag">
        <el-row class="el-row11">
          <el-col :span="3"><div class="grid-content1" >被执行人：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2"><el-input style="width: 70%" v-model="form.executee" clearable :disabled="!allow_edit"></el-input></el-form-item></el-col>
          <el-col :span="3"><div class="grid-content1" >转让时本金余额(元)：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2"><el-input style="width: 70%" v-model="require_params.transferPrincipalBalance" clearable :disabled="true"></el-input></el-form-item></el-col>
        </el-row>
        <el-row class="el-row11">
          <el-col :span="3"><div class="grid-content1" >执行案号：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" prop="caseId" :inline-message="true"><el-input style="width: 70%" v-model="form.caseId" clearable :disabled="!allow_edit"></el-input></el-form-item></el-col>
          <el-col :span="3"><div class="grid-content1" >案件状态：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2"><el-input style="width: 70%" v-model="form.caseStatus" clearable :disabled="!allow_edit"></el-input></el-form-item></el-col>
        </el-row>
        <el-row class="el-row11">
          <el-col :span="3"><div class="grid-content1" >以物抵债金额(元)：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2" prop="debtInKindValue" :inline-message="true"><el-input style="width: 70%" v-model="form.debtInKindValue" clearable :disabled="!allow_edit"></el-input></el-form-item></el-col>
          <el-col :span="3"><div class="grid-content1" >执行裁定结果：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2"><el-input style="width: 70%" v-model="form.rulingResult" clearable :disabled="!allow_edit"></el-input></el-form-item></el-col>
        </el-row>
        <el-row class="el-row11">
          <el-col :span="3"><div class="grid-content1" >法律文书原件：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2"><el-button type="text" @click="showlegalDocumen" style="margin-left: 20px">详情</el-button></el-form-item></el-col>
        </el-row>
      </el-form-item>

      <el-dialog title="法律文书原件" :visible.sync="dialogShow" :append-to-body="true" :close-on-click-modal="false" :before-close="handleClose">
        <div v-if="!debtInKindDeleteFlag">
          <el-row v-for="(doc, index) in form.legalDocumentList" :key="doc.key" style="margin-left: 30px">
            <el-col :span="12">
              <el-form-item :label="'法律文书' + index"><el-input v-model="doc.legalDocumentName" style="width: 70%"></el-input></el-form-item>
            </el-col>
            <el-col :span="3">
              <el-upload
                  class="upload-demo"
                  action=""
                  :http-request="uploadFile"
                  :data="{index:index}"
                  :on-preview="previewFile"
                  :on-success="sucessProcess"
                  :show-file-list="false"
                  :on-remove="removeFile">
                <el-button size="mini" type="primary" style="margin-top: 4px">{{doc.isorigin?'重新上传':'上传'}}</el-button>
                <!--              <div slot="tip" class="el-upload__tip">支持上传jpg/pdf文件</div>-->
              </el-upload>
            </el-col>
            <el-col :span="2">
              <el-popconfirm
                  v-if="doc.isorigin"
                  title="确定从数据库删除该原件？"
                  @confirm="removeDoc(doc,index)"
                  style="margin-left: 20px">
                <el-button
                    icon="el-icon-delete"
                    circle
                    type="danger"
                    slot="reference">
                </el-button>
              </el-popconfirm>
              <el-button
                  v-if="!doc.isorigin"
                  @click.prevent="removeDoc(doc,index)"
                  icon="el-icon-delete"
                  circle
                  type="danger"
                  style="margin-left: 20px">
              </el-button>
            </el-col>
          </el-row>
          <el-form-item style="margin-left: 30px">
            <el-row>
              <el-col :span="12">
                <el-button type="primary" @click="addDoc">新增原件</el-button>
                <el-button type="primary" @click="download">下载</el-button>
              </el-col>
              <el-col :span="12">
                <div style="text-align: right">
                  <el-button type="primary" @click="updateLegalDocument" style="margin-right: 30px">提交</el-button>
                </div>
              </el-col>
            </el-row>

          </el-form-item>
        </div>
      </el-dialog>
      <el-divider></el-divider>
      <span class="span1">法拍明细</span>
      <el-form-item style="margin-top: 15px" v-if="!debtInKindDeleteFlag">
        <el-row class="el-row9">
          <el-col :span="3"><div class="grid-content1" >案件进度：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2"><el-input style="width: 70%" v-model="form.caseAdvancing" clearable :disabled="!allow_edit"></el-input></el-form-item></el-col>
          <el-col :span="3"><div class="grid-content1" >现产权人：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2"><el-input style="width: 70%" v-model="form.currentOwner" clearable :disabled="!allow_edit"></el-input></el-form-item></el-col>
        </el-row>
        <el-row class="el-row10">
          <el-col :span="3"><div class="grid-content1" >移交部门：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2"><el-input style="width: 70%" v-model="form.transferringDepartment" clearable :disabled="!allow_edit"></el-input></el-form-item></el-col>
          <el-col :span="3"><div class="grid-content1" >移交时间：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2">
            <el-date-picker
                v-model="form.handoverTime"
                align="right"
                type="date"
                placeholder="选择日期"
                style="width: 70%"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :disabled="!allow_edit">
            </el-date-picker>
          </el-form-item></el-col>
        </el-row>
        <el-row class="el-row9">
          <el-col :span="3"><div class="grid-content1" >资产性质：</div></el-col>
          <el-col :span="7"><el-form-item class="grid-content2"><el-input style="width: 70%" v-model="form.natureAsset" clearable :disabled="!allow_edit"></el-input></el-form-item></el-col>
        </el-row>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "SMADxq",
  data(){
    return{
      form:{},
      rules:{
        collateralName:{required:true,message:'不允许为空',trigger:['change','blur']},
        collateralType:{required:true,message:'不允许为空',trigger:['change','blur']},
        landArea:{pattern:/^\d+(\.\d*)?$/,message:'必须为数字',trigger:['change','blur']},
        propertySize:{pattern:/^\d+(\.\d*)?$/,message:'必须为数字',trigger:['change','blur']},
        appraisedValue:{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']},
        registrationAmount:{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']},
        caseId:{required:true,message:'不允许为空',trigger:['change','blur']},
        guaranteeStartDate:{required:true,message:'不允许为空',trigger:['change','blur']},
        guaranteeEndDate:{required:true,message:'不允许为空',trigger:['change','blur']},
        reminderDay:[{required:true,message:'不允许为空',trigger:['change','blur']},{pattern:/^\d+$/,message:'必须为自然数',trigger:['change','blur']}],
        timeConversion:{required:true,message:'不允许为空',trigger:['change','blur']},
        debtInKindValue:{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']},
      },
      require_params:{id:'',borrower:'',principal:'',transferPrincipalBalance:''},
      origin_data:'',
      edit_label:'编辑',
      allow_edit:false,
      debtInKindDeleteFlag:false,
      temp_key:0,
      dialogShow:false,
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
      isurge_options:[
        {value:'0',label:'否'},
        {value:'1',label:'是'}],
      collateralTypeIndex: {'0':'建筑物和其它土地附着物','1':'建设用地使用权','2':'海域使用权','3':'生产设备、原材料、半成品、产品','4':'交通运输工具','5':'其它'},
      landTypeIndex:{'0':'工业用地','1':'商业用地'},
      isurgeIndex:{'0':'否','1':'是'},
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
    }
  },
  created() {
    if((typeof this.$route.query.id) !== 'undefined' && this.$route.query.id!== ''){
      this.require_params.id = this.$route.query.id.replace(/^\s+|\s+$/g,"");
    }
    if((typeof this.$route.query.borrower) !== 'undefined' && this.$route.query.borrower!== ''){
      this.require_params.borrower = this.$route.query.borrower;
    }
    if((typeof this.$route.query.principal) !== 'undefined' && this.$route.query.principal!== ''){
      this.require_params.principal = this.$route.query.principal;
    }
    if((typeof this.$route.query.transferPrincipalBalance) !== 'undefined' && this.$route.query.transferPrincipalBalance!== ''){
      this.require_params.transferPrincipalBalance = this.$route.query.transferPrincipalBalance;
    }
    api({
      url: "/collateral/getCollateral",
      method: "get",
      params:{
        id:this.require_params.id
      }
    }).then(data => {
      console.log(data);
      this.form = JSON.parse(JSON.stringify(data.data.datas));
      this.form.legalDocumentList.forEach((value,index) => {
        this.$set(value,'key',this.getTempKey())
        this.$set(value,'isorigin',true)
      })
      this.origin_data = data.data.datas;
      this.debtInKindDeleteFlag = !Boolean(data.data.datas.debtInKindDeleteFlag===0);
    }).catch(err => {
      console.log(err);
    })
  },
  methods:{
    //根据担保ID查找担保详情
    guranteeDetail(){
      api({
        url: '/Secure/getSecureByCollateralGuaranteeId',
        method: "get",
        params:{guaranteeId:this.form.guaranteeId},
      }).then(data => {
        this.$router.push({path:'/creditInfo/creditFinfo/xqSmortgage',query:{iou:data.data.datas.iouIdList[0],type:'0',id:this.form.id}});
      }).catch(err => {
        console.log(err);
      })
    },
    showlegalDocumen(){
      this.dialogShow = true;
    },
    handleClose(done){
      let isChange = false;
      if(this.form.legalDocumentList.length !== this.origin_data.legalDocumentList.length){
        isChange = true;
      }
      else{
        this.origin_data.legalDocumentList.forEach((value,index) => {
          for(let prop in value){
            if(value[prop] !== this.form.legalDocumentList[index][prop]){
              isChange = true;
            }
          }
        })
      }
      if(isChange){
        this.$confirm('确认放弃修改').then(_ => {
          done();
          this.form.legalDocumentList = JSON.parse(JSON.stringify(this.origin_data.legalDocumentList))
        }).catch(_ => {
          done()
        })
      }
      else{
        done();
      }
    },
    removeDoc(doc,index){
      if(doc.isorigin){
        api({
          url: "/collateral/deleteLegalDocument",
          method: "post",
          data:[doc.id]
        }).then(data => {
          location.reload()
        }).catch(err => {
          console.log(err);
        })
      }
      else{
        var i = this.form.legalDocumentList.indexOf(doc)
        if(i!==-1){
          this.form.legalDocumentList.splice(i,1);
        }
      }
    },
    addDoc(){
      this.form.legalDocumentList.push({key:this.getTempKey(),legalDocumentName:'',url:'',isorigin:false})
    },
    getTempKey(){
      return this.temp_key++;
    },
    updateLegalDocument(){
      let isAdd = false;
      let isUpdate = false;
      if(this.form.legalDocumentList.length !== this.origin_data.legalDocumentList.length){
        isAdd = true;
      }
      this.origin_data.legalDocumentList.forEach((value,index) => {
        for(let prop in value){
          if(value[prop] !== this.form.legalDocumentList[index][prop]){
            isUpdate = true;
          }
        }
      })

      function addDocument(send_data){
        let p1 = new Promise(((resolve, reject) => {
          api({
            url: "/collateral/addLegalDocument",
            method: "post",
            data:send_data
          }).then(data => {
            resolve(data);
          }).catch(err => {
            reject(err);
          })
        }))
        return p1;
      }
      function updateDocument(send_data){
        let p1 = new Promise(((resolve, reject) => {
          api({
            url: "/collateral/updateLegalDocument",
            method: "post",
            data:send_data
          }).then(data => {
            resolve(data);
          }).catch(err => {
            reject(err);
          })
        }))
        return p1;
      }

      if(!isAdd && !isUpdate){
        alert("未发现内容变动")
      }
      else{
        let add_send_data = [{id:this.form.id,legalDocumentList:[]}];
        let update_send_data = [];
        this.form.legalDocumentList.forEach((value,index) =>{
          if(!value.isorigin){
            add_send_data[0].legalDocumentList.push({
              url:value.url,
              legalDocumentName:value.legalDocumentName,
              deleteFlag:0
            })
          }
          else{
            let temp = JSON.parse(JSON.stringify(value));
            delete temp.key;
            delete temp.isorigin;
            update_send_data.push(temp);
          }
        })
        if(!isAdd && isUpdate){
          updateDocument(update_send_data).then(res => {
            location.reload();
          }).catch(err => {
            console.log(err)
          })
        }
        else if(isAdd && !isUpdate){
          addDocument(add_send_data).then(res => {
            location.reload();
          }).catch(err => {
            console.log(err)
          })
        }
        else if(isAdd && isUpdate){
          updateDocument(update_send_data).then(res => {
            return addDocument(add_send_data);
          }).then(res => {
            location.reload();
          }).catch(err => {
            console.log(err)
          })
        }
      }
    },
    submit(){
      this.$refs['form'].validate((valid) => {
        if(valid){
          let isChange = false;
          for(let prop in this.form){
            if(prop !== 'legalDocumentList' && this.form[prop] !== this.origin_data[prop]){
              isChange = true;
            }
          }
          if(!isChange){
            alert("未发现内容变动")
          }
          else{
            let sent_data = JSON.parse(JSON.stringify(this.form))
            delete sent_data.legalDocumentList
            api({
              url: "/Secure/updateCollateral",
              method: "post",
              data:[sent_data]
            }).then(data => {
              console.log('senddata',sent_data)
              if(data.data.success){
                location.reload()
                console.log(data)
              }
              else{
                this.$message(data.data.msg)
              }
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
    edit(){
      //如果是允许编辑，即是点击放弃修改
      if(this.allow_edit){
        this.allow_edit=false;
        this.form = JSON.parse(JSON.stringify(this.origin_data));
        this.form.legalDocumentList.forEach((value,index) => {
          this.$set(value,'key',this.getTempKey())
          this.$set(value,'isorigin',true)
        })
        this.edit_label='编辑';
      }
      else{
        this.allow_edit=true;
        this.edit_label='放弃修改';
      }
    },
    uploadFile(e){
      let file = e.file
      let index = e.data.index;
      /* eslint-disable no-undef */
      let param = new FormData()  // 创建form对象
      param.append('file', file)  // 通过append向form对象添加数据
      param.append('chunk', '0') // 添加form表单中其他数据
      // console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      api({
        url: "/collateral/fileUpload",
        method: "post",
        data:param,
        config:config
      }).then(data => {
        // console.log(data)
        this.$message("sucess")
        data.data.index=index;
        e.onSuccess(data,e.file);
      }).catch(err => {
        console.log(err);
      })
    },
    sucessProcess(res, file){
      console.log('sucess回调')
      // console.log('res',res)
      // console.log('file',file)
      this.setLegalDocument(file, res.data.index);
      //成功上传文件后需要将文件的名字赋值给debt_form中的法律文书列表字段
    },
    setLegalDocument(file,index){
      if(typeof file.response !== 'undefined') {
        let url = file.response.data.datas;
        let name = file.name.substring(0, file.name.indexOf("."))
        console.log(url,name,index)
        this.form.legalDocumentList[index].legalDocumentName = name;
        this.form.legalDocumentList[index].url = url;
      }
    },
    previewFile(file,fileList){
      console.log(file)
      var image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = file.name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = file.url;
    },
    removeFile(){

    },
    download(){

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
.grid-content1{
  background-color: #DCDFE6;
  text-align: end;
}
/deep/ .el-upload__tip{
  display: inline-block;
  margin-left: 10px;
}
</style>