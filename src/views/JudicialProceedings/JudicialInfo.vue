<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/timeRemider"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">司法诉讼</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">司法信息录入</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="el-row1">
      <el-col :span="24">
        <div class="grid-content">
          <el-button type="primary">清空</el-button>
          <el-popconfirm
              title="确定提交？"
              @confirm="submit">
            <el-button
                type="primary"
                slot="reference"
                style="margin-left: 20px">
              提交
            </el-button>
          </el-popconfirm>
        </div>
      </el-col>
    </el-row>

    <el-form label-width="130px" style="margin-top: 50px" :rules="rules" :model="form" ref="form">
      <el-form-item label="之前司法状态">
        <el-select v-model="form.prejudicialStatusName" clearable filterable placeholder="" style="width: 30%" :disabled="true">
          <el-option
              v-for="item in judicalState_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
<!--        <el-input v-model="form.prejudicialStatusName" style="width: 30%" :disabled="true"></el-input>-->
      </el-form-item>
      <el-form-item label="司法状态" prop="judicialStatusName">
        <el-select v-model="form.judicialStatusName" clearable filterable placeholder="请选择" style="width: 30%">
          <el-option
              v-for="item in judicalState_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
<!--        <el-input v-model="form.judicialStatusName" style="width: 30%"></el-input>-->
      </el-form-item>
      <el-form-item label="创建日期" prop="statusGenerationDate">
        <el-date-picker
            v-model="form.statusGenerationDate"
            type="date"
            placeholder="选择日期"
            style="width: 30%"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-divider></el-divider>
      <span style="font-family: 黑体;font-size: 18px">借据号</span>
      <el-form-item
          v-for="(iou, index) in form.iouIdList"
          :label="'借据号' + index"
          :key="iou.key"
          :prop="'iouIdList.'+index+'.value'"
          :rules="{required:true,message:'不允许为空',trigger:['change','blur']}"
          style="margin-top: 20px;margin-left: 200px">
        <el-input v-model="iou.value" style="width: 30%" :disabled="Boolean(addState==='1')"></el-input>
        <el-button
            v-if="addState==='0'"
            @click.prevent="removeIou(iou)"
            icon="el-icon-delete"
            circle
            type="danger"
            style="margin-left: 20px">
        </el-button>
      </el-form-item>
      <el-form-item style="margin-left: 200px" v-if="addState==='0'">
        <el-button type="primary" @click="addIou">新增借据</el-button>
      </el-form-item>

      <div>
        <el-divider></el-divider>
        <span style="font-size: 15px; font-weight: bold; margin-left:20px; margin-bottom:20px; display:inline-block">案号信息</span>
        <el-form-item label="案号" prop="caseId">
          <el-input v-model="form.caseId" style="width: 30%"></el-input>
        </el-form-item>
        <el-form-item label="法院" prop="court">
          <el-select v-model="form.court" clearable filterable placeholder="请选择" style="width: 30%">
            <el-option
                v-for="item in court_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="承办法官" prop="chargeJudge">
          <el-input v-model="form.chargeJudge" style="width: 30%"></el-input>
        </el-form-item>
        <el-form-item label="受托律所" prop="entrustedLawFirm">
          <el-select v-model="form.entrustedLawFirm" clearable filterable placeholder="请选择" style="width: 30%">
            <el-option
                v-for="item in firm_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="律师" prop="layer">
          <el-input v-model="form.layer" style="width: 30%"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" style="width: 30%"></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "JudicialInfo",
  data(){
    return{
      form:{
        iouIdList:[],
        judicialStatusName:'',
        prejudicialStatusName:'',
        priJudicialStatusId:'',
        caseId:'',
        court:'',
        chargeJudge:'',
        layer:'',
        entrustedLawFirm:'',
        remarks:'',
        statusGenerationDate:'',
      },
      rules:{
        judicialStatusName:{required:true,message: '不允许为空',trigger:['change','blur']},
        statusGenerationDate:{required:true,message: '不允许为空',trigger:['change','blur']},
      },
      court_options:[
        {value:'丹阳法院',label:'丹阳法院'},
        {value:'京口法院',label:'京口法院'},
        {value:'润洲法院',label:'润洲法院'},
        {value:'丹徒法院',label:'丹徒法院'}],
      firm_options:[
        {value:'金矛律所',label:'金矛律所'},
        {value:'荣誉祥律所',label:'荣誉祥律所'},
        {value:'沪宁律所律所',label:'沪宁律所律所'},
        {value:'君合力律所',label:'君合力律所'},
        {value:'隆安律所',label:'隆安律所'},
        {value:'漫修斯律所',label:'漫修斯律所'},
        {value:'必正律所',label:'必正律所'},
        {value:'陈志伟律所',label:'陈志伟律所'}],
      judicalState_options:[
        {value:'0',label:'撤诉'},
        {value:'1',label:'起诉中'},
        {value:'2',label:'一审审理中'},
        {value:'3',label:'一审判决书生效'},
        {value:'4',label:'一审调解中'},
        {value:'5',label:'一审上诉中'},
        {value:'6',label:'二审审理中'},
        {value:'7',label:'二审判决书生效'},
        {value:'8',label:'二审调解中'},
        {value:'9',label:'二审上诉中'},
        {value:'10',label:'再审审理中'},
        {value:'11',label:'再审判决书生效'},
        {value:'12',label:'再审调解中'},
        {value:'13',label:'申请执行中'},
        {value:'15',label:'执行中'},
        {value:'16',label:'和解终结'},
        {value:'17',label:'无财产终结'},
        {value:'18',label:'申请恢复执行'},
        ],
      tempKey:0,
      judicalAllIou:[],
      query_iou:'',
      addState:'0',
    }
  },
  created() {
    //需要的路由传参:iouList,priJudicialStatusId,prejudicialStatusName
    let ious = JSON.parse(this.$route.query.iouIdList);
    this.judicalAllIou = JSON.parse(this.$route.query.judicalAllIou);
    if(ious.length>0){
      ious.forEach((value) => {
        let str=value.replace(/^\s+|\s+$/g,"");
        this.form.iouIdList.push({key:this.getTempKey(),value:str});
      })
    }
    this.form.priJudicialStatusId = this.$route.query.priJudicialStatusId;
    this.form.prejudicialStatusName = '';
    this.form.statusGenerationDate = this.$moment().format("YYYY-MM-DD");
    this.query_iou = this.$route.query.query_iou;
    if(this.form.priJudicialStatusId === ''){
      this.addState = '0';  //新增最初的司法状态
    }
    else{
      this.addState = '1';
      this.form.prejudicialStatusName = this.$route.query.prejudicialStatusName;
    }
  },
  methods:{
    getTempKey(){
      return this.tempKey++;
    },
    addIou(){
      this.form.iouIdList.push({key:this.getTempKey(),value: ''});
    },
    removeIou(iou){
      var index = this.form.iouIdList.indexOf(iou);
      if (index !== -1) {
        this.form.iouIdList.splice(index, 1);
      }
    },
    // submit(){
    //   this.$refs['form'].validate((valid) => {
    //     if(valid){
    //       //根据有无之前司法ID确定是更新司法状态还是新增最初的司法状态
    //       let check_ious = [];
    //       if(this.addState==='0'){
    //         this.form.iouIdList.forEach((value) => {
    //           check_ious.push(value.value);
    //         })
    //       }
    //       let promiseList = [];
    //       check_ious.forEach((value) => {
    //         let p = new Promise((resolve,reject) => {
    //           api({url: "/Judicial/getJudicature", method: "get", params:{iouId:value}
    //           }).then(data => {resolve(data);})
    //               .catch(err => {reject(err);})
    //         });
    //         promiseList.push(p);
    //       })
    //
    //       function addJpro(isSubmit,send_data){
    //         const p = new Promise((resolve,reject) => {
    //           console.log(isSubmit,send_data)
    //           if(isSubmit){
    //             api({
    //               url: "/Judicial/addJudicature",
    //               method: "post",
    //               data:send_data
    //             }).then(data => {
    //               resolve(data);
    //             }).catch(err => {
    //               reject(err);
    //             })
    //           }
    //         });
    //         return p;
    //       }
    //
    //       Promise.all(promiseList).then((result) => {
    //         console.log(result);
    //         let ious = '';
    //         result.forEach((value,index) => {
    //           if(value.data.datas!== null && value.data.datas.judicialInformationList !== null && value.data.datas.judicialInformationList.length > 0){
    //             ious+=String(check_ious[index])+'\n';
    //           }
    //         })
    //         let isSubmit = true;
    //         let send_data = {
    //           iouIdList:this.form.iouIdList.map(item => {return item.value}),
    //           judicialStatusName:this.form.judicialStatusName,
    //           caseId:this.form.caseId,
    //           court:this.form.court,
    //           chargeJudge:this.form.chargeJudge,
    //           layer:this.form.layer,
    //           entrustedLawFirm:this.form.entrustedLawFirm,
    //           remarks:this.form.remarks,
    //           statusGenerationDate:this.form.statusGenerationDate,
    //         };
    //         if(this.form.priJudicialStatusId !== ''){
    //           send_data['priJudicialStatusId'] = this.form.priJudicialStatusId;
    //         }
    //         if(ious!==''){
    //           alert("借据号:\n"+ious+"已存在对应的司法信息");
    //           isSubmit = false;
    //         }
    //         return addJpro(isSubmit,send_data);
    //       }).then(res => {
    //         console.log('add'+res);
    //         this.$router.replace({
    //           path:'/creditInfo/creditFinfo/xqJudicature',
    //           query:{iou:this.query_iou}
    //         })
    //       }).catch((err) => {
    //         console.log(err);
    //       })
    //     }
    //     else{
    //       this.$message("请检查提交的内容")
    //       return false;
    //     }
    //   })
    // },
    submit(){
      this.$refs['form'].validate((valid) => {
        if(valid){
          //根据有无之前司法ID确定是更新司法状态还是新增最初的司法状态
          // function addJpro(isSubmit,send_data){
          //   const p = new Promise((resolve,reject) => {
          //     console.log(isSubmit,send_data)
          //     if(isSubmit){
          //       api({
          //         url: "/Judicial/addJudicature",
          //         method: "post",
          //         data:send_data
          //       }).then(data => {
          //         resolve(data);
          //       }).catch(err => {
          //         reject(err);
          //       })
          //     }
          //   });
          //   return p;
          // }
          let send_data = {
            iouIdList:this.form.iouIdList.map(item => {return item.value}),
            judicialStatusName:this.form.judicialStatusName,
            caseId:this.form.caseId,
            court:this.form.court,
            chargeJudge:this.form.chargeJudge,
            layer:this.form.layer,
            entrustedLawFirm:this.form.entrustedLawFirm,
            remarks:this.form.remarks,
            statusGenerationDate:this.form.statusGenerationDate,
          };
          if(this.form.priJudicialStatusId !== ''){
            send_data['priJudicialStatusId'] = this.form.priJudicialStatusId;
          }
          api({
            url: "/Judicial/addJudicature",
            method: "post",
            data:send_data
          }).then(data => {
            console.log(data);
            if(data.data.success){
              this.$router.replace({
                path:'/creditInfo/creditFinfo/xqJudicature',
                query:{iou:this.query_iou}
              })
            }
            else{
              this.$message(data.data.msg);
            }
          }).catch(err => {
            console.log(err);
          })

        }
        else{
          this.$message('请检查提交的内容')
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
.span2{
  font-size: 18px;
  font-weight: bold;
  font-family: 黑体;
  margin-left: 30px;
}
.grid-content1{
  background-color: #DCDFE6;
  text-align: end;
}
.el-icon-circle-plus,.el-icon-remove{
  font-size: 150%;
}
</style>