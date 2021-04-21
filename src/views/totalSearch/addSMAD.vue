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
          <el-popconfirm
              title="确定提交？"
              style="margin-right: 40px;margin-left: 20px"
              @confirm="submit">
            <el-button type="primary" slot="reference">提交</el-button>
          </el-popconfirm>
        </div>
      </el-col>
    </el-row>
    <el-form style="margin-top: 20px" ref="form" :model="form" :rules="rules">
      <span class="span1">抵押物基本信息</span>
      <el-form-item>
        <el-row style="margin-top: 20px" >
          <el-col :span="2" :offset="1"><div class="grid-content1" >抵押物ID：</div></el-col>
          <el-col :span="8"><div class="grid-content2"><el-input v-model="form.basic_form.id" clearable style="width: 80%" :disabled="true"></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" >抵押物：</div></el-col>
          <el-col :span="8"><div class="grid-content2"><el-input v-model="form.basic_form.collateralName" clearable style="width: 80%" :disabled="true"></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-divider></el-divider>
      <span class="span1">以物抵债</span>
      <el-form-item>
        <el-row style="margin-top: 20px">
          <el-col :span="2" :offset="1"><div class="grid-content1" >被执行人：</div></el-col>
          <el-col :span="8"><el-form-item class="grid-content2"><el-input v-model="form.debt_form.executee" clearable style="width: 80%"></el-input></el-form-item></el-col>
          <el-col :span="2"><div class="grid-content1" >执行案号：</div></el-col>
          <el-col :span="8"><el-form-item class="grid-content2" :prop="'debt_form.caseId'" :inline-message="true"><el-input v-model="form.debt_form.caseId" clearable style="width: 80%"></el-input></el-form-item></el-col>
        </el-row>
        <el-row>
          <el-col :span="2" :offset="1"><div class="grid-content1" >案件状态：</div></el-col>
          <el-col :span="8"><el-form-item class="grid-content2"><el-input v-model="form.debt_form.caseStatus" clearable style="width: 80%"></el-input></el-form-item></el-col>
          <el-col :span="2" ><div class="grid-content1" >以物抵债金额：</div></el-col>
          <el-col :span="8"><el-form-item class="grid-content2" :prop="'debt_form.debtInKindValue'" :inline-message="true"><el-input v-model="form.debt_form.debtInKindValue" clearable style="width: 80%"></el-input></el-form-item></el-col>
        </el-row>
        <el-row>
          <el-col :span="2" :offset="1"><div class="grid-content1" >执行裁定结果：</div></el-col>
          <el-col :span="8"><el-form-item class="grid-content2"><el-input v-model="form.debt_form.rulingResult" clearable style="width: 80%"></el-input></el-form-item></el-col>
        </el-row>
      </el-form-item>

      <span class="span1">法律文书原件</span>
      <el-row v-for="(doc, index) in form.debt_form.legalDocumentList" :key="doc.key" style="margin-top: 20px;margin-left: 80px">
        <el-col :span="9">
          <el-form-item :label="'法律文书' + index"><el-input v-model="doc.legalDocumentName" style="width: 76%"></el-input></el-form-item>
        </el-col>
        <el-col :span="7">
          <el-upload
              class="upload-demo"
              action=""
              :http-request="uploadFile"
              :data="{index:index}"
              :on-change="getFile"
              :on-preview="previewFile"
              :on-success="sucessProcess"
              :show-file-list="false"
              :on-remove="removeFile">
            <el-button size="mini" type="primary">上传</el-button>
            <div slot="tip" class="el-upload__tip">支持上传jpg/pdf文件</div>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-button
              @click.prevent="removeDoc(doc,index)"
              icon="el-icon-delete"
              circle
              type="danger"
              style="margin-left: 20px">
          </el-button>
        </el-col>
      </el-row>

      <el-form-item style="margin-left: 80px">
        <el-button type="primary" @click="addDoc(index)">新增原件</el-button>
      </el-form-item>


      <el-divider></el-divider>
      <span class="span1">法拍明细</span>
      <el-form-item style="margin-top: 15px">
        <el-row class="el-row9">
          <el-col :span="2" :offset="1"><div class="grid-content1" >案件进度：</div></el-col>
          <el-col :span="8"><el-form-item class="grid-content2"><el-input v-model="form.force_form.caseAdvancing" clearable style="width: 80%"></el-input></el-form-item></el-col>
          <el-col :span="2"><div class="grid-content1" >现产权人：</div></el-col>
          <el-col :span="8"><el-form-item class="grid-content2"><el-input v-model="form.force_form.currentOwner" clearable style="width: 80%"></el-input></el-form-item></el-col>
        </el-row>
        <el-row class="el-row10">
          <el-col :span="2" :offset="1"><div class="grid-content1" >移交部门：</div></el-col>
          <el-col :span="8"><el-form-item class="grid-content2"><el-input v-model="form.force_form.transferringDepartment" clearable style="width: 80%"></el-input></el-form-item></el-col>
          <el-col :span="2"><div class="grid-content1" >移交时间：</div></el-col>
          <el-col :span="8"><el-form-item class="grid-content2">
            <el-date-picker
                v-model="form.force_form.handoverTime"
                align="right"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                style="width: 80%">
            </el-date-picker>
          </el-form-item></el-col>
        </el-row>
        <el-row class="el-row9">
          <el-col :span="2" :offset="1"><div class="grid-content1" >资产性质：</div></el-col>
          <el-col :span="8"><el-form-item class="grid-content2"><el-input v-model="form.force_form.natureAsset" clearable style="width: 80%"></el-input></el-form-item></el-col>
        </el-row>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "addSMAD",
  data(){
    return{
      require_params:{id:'',caseId:'',collateralName:''},
      form:{
        basic_form:{id:'',collateralName:''},
        debt_form:{executee:'',caseId:'',caseStatus:'',debtInKindValue:'',rulingResult:'',legalDocumentList:[{key:this.getTempKey(),legalDocumentName:'',url:''}]},
        force_form:{caseAdvancing:'',currentOwner:'',transferringDepartment:'',natureAsset:''},
      },
      rules:{
        'debt_form.caseId':{required:true,message:'不允许为空',trigger:['change','blur']},
        'debt_form.debtInKindValue':{pattern:/^\d+(\.\d?\d?)?$/,message:'必须为数字(最多两位小数)',trigger:['change','blur']},
      },
      fileList:[],
      temp_key:0,
    }
  },
  created() {
    if((typeof this.$route.query.id) !== 'undefined' && this.$route.query.id!== ''){
      this.require_params.id = this.$route.query.id.replace(/^\s+|\s+$/g,"");
    }
    if((typeof this.$route.query.name) !== 'undefined' && this.$route.query.name!== ''){
      this.require_params.collateralName = this.$route.query.name;
    }
    if((typeof this.$route.query.caseId) !== 'undefined' && this.$route.query.caseId!== ''){
      this.require_params.caseId = this.$route.query.caseId;
    }
    this.form.basic_form.id = this.require_params.id;
    this.form.debt_form.caseId = this.require_params.caseId;
    this.form.basic_form.collateralName = this.require_params.collateralName;
  },
  methods:{
    removeDoc(doc,index){
      var i = this.form.debt_form.legalDocumentList.indexOf(doc)
      if(i!==-1){
        this.form.debt_form.legalDocumentList.splice(i,1);
      }
    },
    addDoc(index){
      this.form.debt_form.legalDocumentList.push({key:this.getTempKey(),legalDocumentName:'',url:''})
    },
    getTempKey(){
      return this.temp_key++;
    },
    promiseGetCollateral(){
      let id = this.require_params.id;
      return new Promise((resolve, reject) => {
        api({
          url:'/collateral/getCollateral',
          method:'get',
          params:{
            id:id
          }
        }).then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        })
      })
    },
    submit(){
      this.$refs['form'].validate((valid) => {
        if(valid){
          //判断以物抵债与法拍明细是否为空
          let payinkindNull = true;
          for(let prop in this.form.debt_form){
            if((prop !=='legalDocumentList' && this.form.debt_form[prop] !== '') && (this.form.debt_form.legalDocumentList.length !== 0)){
              payinkindNull = false;
            }
          }
          let forceNull = true;
          for(let prop in this.form.force_form){
            if(this.form.force_form[prop] !== ''){
              forceNull = false;
            }
          }
          let send_data = {};
          if(payinkindNull && forceNull){
            alert("内容为空")
            return ;
          }
          else{
            this.promiseGetCollateral().then(res => {
              send_data = res.data.datas;
              // console.log('pre',send_data)
              for(let prop in this.form.debt_form){
                send_data[prop] = this.form.debt_form[prop];
              }
              for(let prop in this.form.force_form){
                send_data[prop] = this.form.force_form[prop];
              }
              send_data.legalDocumentList = send_data.legalDocumentList.map(item => {delete item.key; return item});
              send_data.debtInKindDeleteFlag = 0;
              // console.log('after',send_data)
              return new Promise((resolve, reject) => {
                api({
                  url: "/collateral/addPayInKind",
                  method: "post",
                  data:send_data,
                }).then(res => {
                  resolve(res)
                }).catch(err => {
                  reject(err)
                })
              })
            }).then(res => {
              console.log(res)
              if(res.data.success){
                this.$router.replace('/totalSearch/SMAD')
              }
              else{
                this.$message(res.data.msg)
              }
            }).catch(err => {
              console.log(err);
            })
          }
          // else if(!payinkindNull && forceNull){
          //   send_data = JSON.parse(JSON.stringify(this.form.debt_form));
          //   send_data.id = this.form.basic_form.id;
          //   send_data.legalDocumentList = send_data.legalDocumentList.map(item => {delete item.key; return item});
          //   send_data.debtInKindDeleteFlag = 0;
          //
          // }
          // else if(payinkindNull && !forceNull){
          //   send_data = JSON.parse(JSON.stringify(this.form.force_form));
          //   send_data.id=this.form.basic_form.id;
          //   send_data.debtInKindDeleteFlag = 0;
          // }
          // else{
          //   for(let prop in this.form.debt_form){
          //     send_data[prop] = this.form.debt_form[prop];
          //   }
          //   for(let prop in this.form.force_form){
          //     send_data[prop] = this.form.force_form[prop];
          //   }
          //   send_data.legalDocumentList = send_data.legalDocumentList.map(item => {delete item.key; return item});
          //   send_data.id = this.form.basic_form.id;
          //   send_data.debtInKindDeleteFlag = 0;
          // }
          // console.log(send_data);
        }
        else{
          this.$message('请检查提交内容')
        }
      })
    },
    getFile(file,fileList){
      this.fileList = fileList;
    },
    setLegalDocument(file,index){
      if(typeof file.response !== 'undefined') {
        let url = file.response.data.datas;
        let name = file.name.substring(0, file.name.indexOf("."))
        console.log(url,name,index)
        this.form.debt_form.legalDocumentList[index].legalDocumentName = name;
        this.form.debt_form.legalDocumentList[index].url = url;
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
    previewFile(file){
      console.log('查看回调')
      // window.open(file.response.data.datas)
    },
    sucessProcess(res, file){
      console.log('sucess回调')
      // console.log('res',res)
      // console.log('file',file)
      this.setLegalDocument(file, res.data.index);
      //成功上传文件后需要将文件的名字赋值给debt_form中的法律文书列表字段
    },
    removeFile(file,fileList){
      console.log('删除回调')
      //删除时的file
      // console.log('file',file);
      // 删除后的fileList
      // console.log('fileList',fileList)
      // this.setLegalDocument(fileList);
    },
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
  margin-top: 40px;
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
  margin-left: 30px;
}
.el-icon-circle-plus,.el-icon-remove{
  font-size: 150%;
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