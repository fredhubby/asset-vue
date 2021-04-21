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
          <el-dropdown @command="handleAddCommand" style="margin-right: 20px">
            <el-button type="primary" class="el-dropdown-link">
              新增<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="urge">新增催告</el-dropdown-item>
              <el-dropdown-item command="limitation">诉讼时效变更</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
            :to="{path:'/creditInfo/creditFinfo/xqCreditFinfo',query:{iou:require_params.iou}}">债权基本信息</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link
            :to="{path:'/creditInfo/creditFinfo/xqSmortgage',query:{iou:require_params.iou}}">担保抵押信息</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link
            :to="{path:'/creditInfo/creditFinfo/xqFee',query:{iou:require_params.iou}}">债权费用信息</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link
            :to="{path:'/creditInfo/creditFinfo/xqRecall',query:{iou:require_params.iou}}">债权清收信息</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link
            :to="{path:'/creditInfo/creditFinfo/xqJudicature',query:{iou:require_params.iou}}">债权司法信息</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <router-link
            :to="{path:'/creditInfo/creditFinfo/xqCollection',query:{iou:require_params.iou}}">债权催收信息</router-link>
      </el-menu-item>
    </el-menu>

    <el-row style="margin-top: 20px" :gutter="20">
      <el-col :span="9">
        <el-card>
          <el-table :data="urgeTableData">
            <el-table-column prop="urgingNoticeDate" label="催收公告日"></el-table-column>
            <el-table-column prop="typeName" label="催告方式"></el-table-column>
            <el-table-column prop="state" label="状态"></el-table-column>
            <el-table-column prop="operate" label="操作" fixed="right">
              <template slot="header" slot-scope="scope">
                <span v-if="!isUrgeEdit">操作</span>
                <el-button type="primary" v-if="isUrgeEdit" @click="updateUrge">提交</el-button>
              </template>
              <template slot-scope="scope">
                <el-button @click="urgeEdit(scope.row,scope.$index)" type="text" size="small">编辑</el-button>
                <el-popconfirm
                    title="确定删除？"
                    @confirm="urgeDelete(scope.row)"
                    style="margin-left: 10px">
                  <el-button type="text" size="small" slot="reference">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="15">
        <el-card>
          <el-table :data="limitationTableData">
            <el-table-column prop="changeDate" label="登记日期"></el-table-column>
            <el-table-column prop="limitationOfActionStartDate" label="诉讼时效起始日"></el-table-column>
            <el-table-column prop="limitationOfActionEndDate" label="诉讼时效到期日"></el-table-column>
            <el-table-column prop="actionNoticeTime" label="时效提醒"></el-table-column>
            <el-table-column prop="state" label="状态"></el-table-column>
            <el-table-column prop="operate" label="操作" fixed="right" width="90px">
              <template slot="header" slot-scope="scope">
                <span v-if="!isLimitationEdit">操作</span>
                <el-button type="primary" v-if="isLimitationEdit" @click="updateLimitation">提交</el-button>
              </template>
              <template slot-scope="scope">
                <el-button @click="limitationEdit(scope.row,scope.$index)" type="text" size="small">编辑</el-button>
                <el-popconfirm
                    title="确定删除？"
                    @confirm="limitationDelete(scope.row)"
                    style="margin-left: 10px">
                  <el-button type="text" size="small" slot="reference">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog :title="(addType === 'urge')?'新增催收':'新增诉讼'" :visible.sync="addDialogShow" :append-to-body="true" :close-on-click-modal="false" :before-close="addDialogClose">
      <el-form style="margin-top: 20px" ref="addForm" :model="addForm" :rules="addFormRules" label-width="130px">
<!--        <span style="font-family: 黑体;font-size: 18px">借据号</span>-->
        <el-form-item
            v-for="(iou, index) in addForm.newIouList"
            :label="'借据号' + index"
            :key="iou.key"
            style="margin-top: 20px;margin-left: 20px"
            :prop="'newIouList.'+index+'.value'"
            :rules="{required:true,message:'不允许为空',trigger:['change','blur']}">
          <el-input v-model="iou.value" style="width: 50%"></el-input>
          <el-button
              @click.prevent="removeIou(iou)"
              icon="el-icon-delete"
              circle
              type="danger"
              style="margin-left: 20px">
          </el-button>
        </el-form-item>
        <el-form-item style="margin-left: 20px">
          <el-button type="primary" @click="addIou">新增借据</el-button>
          <el-button @click="resetIou">重置</el-button>
        </el-form-item>
        <el-divider></el-divider>
        <el-row :gutter="10" v-if="addType==='urge'">
          <el-col :span="12" :offset="0">
            <el-form-item label='催收公告日：' :prop="'addUrgeForm.urgingNoticeDate'">
              <el-date-picker
                  v-model="addForm.addUrgeForm.urgingNoticeDate"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="urgingNoticeChange">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='催收方式：' class="form_item" :prop="'addUrgeForm.urgingType'">
              <el-select v-model="addForm.addUrgeForm.urgingType" clearable placeholder="请选择" style="width: 100%">
                <el-option
                    v-for="item in urgeType_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12" :offset="0">
            <el-form-item label='诉讼时效起始日：' :prop="'addLimitationForm.limitationOfActionStartDate'" label-width="140px">
              <el-date-picker v-model="addForm.addLimitationForm.limitationOfActionStartDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='诉讼时效到期日：' class="form_item" :prop="'addLimitationForm.limitationOfActionEndDate'" label-width="140px">
              <el-date-picker v-model="addForm.addLimitationForm.limitationOfActionEndDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12" :offset="0">
            <el-form-item label='登记日期：'>
              <el-date-picker v-model="addForm.addLimitationForm.changeDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='时效提醒：' class="form_item" :prop="'addLimitationForm.actionNoticeTime'">
              <el-input v-model="addForm.addLimitationForm.actionNoticeTime" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="text-align: end">
          <el-popconfirm
              title="确定提交？"
              style="margin-right: 10px;"
              @confirm="addUrgeSubmit">
            <el-button type="primary" slot="reference">提交</el-button>
          </el-popconfirm>
        </el-row>


      </el-form>
    </el-dialog>
    <el-dialog :title="(updateType === 'urge')?'催收详情':'诉讼详情'" :visible.sync="updateDialogShow" :append-to-body="true" :close-on-click-modal="false" :before-close="updateDialogClose">
      <el-form label-width="130px" :model="updateForm" ref="updateForm" :rules="updateRules">
        <el-row :gutter="10" v-if="updateType==='urge'">
          <el-col :span="12" :offset="0">
            <el-form-item label='催收公告日：' :prop="'updateUrgeForm.urgingNoticeDate'">
              <el-date-picker
                  v-model="updateForm.updateUrgeForm.urgingNoticeDate"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label='催收方式：' class="form_item" :prop="'updateUrgeForm.urgingType'">
              <el-select v-model="updateForm.updateUrgeForm.urgingType" clearable placeholder="请选择" style="width: 100%">
                <el-option
                    v-for="item in urgeType_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="updateType!=='urge'">
          <el-col :span="12" :offset="0">
            <el-form-item label='诉讼时效起始日：' :prop="'updateLimitationForm.limitationOfActionStartDate'" label-width="140px">
              <el-date-picker v-model="updateForm.updateLimitationForm.limitationOfActionStartDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='诉讼时效到期日：' class="form_item" :prop="'updateLimitationForm.limitationOfActionEndDate'" label-width="140px">
              <el-date-picker v-model="updateForm.updateLimitationForm.limitationOfActionEndDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" v-if="updateType!=='urge'">
          <el-col :span="12" :offset="0">
            <el-form-item label='登记日期：'>
              <el-date-picker v-model="updateForm.updateLimitationForm.changeDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label='时效提醒：' class="form_item" :prop="'updateLimitationForm.actionNoticeTime'">
              <el-input v-model="updateForm.updateLimitationForm.actionNoticeTime" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="text-align: end">
          <el-popconfirm
              title="确定提交？"
              style="margin-right: 10px;"
              @confirm="updateSubmit">
            <el-button type="primary" slot="reference">提交</el-button>
          </el-popconfirm>
        </el-row>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "xqCollection",
  data(){
    return{
      activeIndex: '6',
      require_params:{iou:''},
      tempKey:0,
      //催告表格相关数据
      origin_urgeData:'',
      urgeTableData:[],
      isUrgeEdit:false,
      urgeType_options:[
        {value:'0',label:'省级媒体'},
        {value:'1',label:'直接送达'},
        {value:'2',label:'邮寄送达'},
        {value:'3',label:'本地媒体'},
      ],
      urgeType:{'0':'省级媒体','1':'直接送达','2':'邮寄送达','3':'本地媒体'},

      //诉讼时效表格相关数据
      origin_limitationData:'',
      limitationTableData:[],
      isLimitationEdit:false,

      addForm:{
        newIouList:[],
        addUrgeForm:{urgingType:'',urgingNoticeDate:''},
        addLimitationForm:{limitationOfActionStartDate:'',limitationOfActionEndDate:'',changeDate:'',actionNoticeTime:''},
      },
      addFormRules:{
        'addUrgeForm.urgingNoticeDate':{required:true,message:'不允许为空',trigger:['change','blur']},
        'addUrgeForm.urgingType':{required:true,message:'不允许为空',trigger:['change','blur']},
        'addLimitationForm.limitationOfActionStartDate':{required:true,message:'不允许为空',trigger:['change','blur']},
        'addLimitationForm.limitationOfActionEndDate':{required:true,message:'不允许为空',trigger:['change','blur']},
        'addLimitationForm.actionNoticeTime':[{required:true,message:'不允许为空',trigger:['change','blur']},{pattern:/^\d+$/,message:'必须为数字',trigger:['change','blur']}],
      },

      //新增诉讼时效或者催告时的借据List
      // newIouList:[],
      //addType代表新增的是催告还是诉讼
      addType:'urge',
      //新增催告的表单
      // addUrgeForm:{urgingType:'',urgingNoticeDate:''},
      addDialogShow:false,
      //新增诉讼的表单
      // addLimitationForm:{limitationOfActionStartDate:'',limitationOfActionEndDate:'',changeDate:'',actionNoticeTime:''},

      //催告以及诉讼详情的表单
      updateForm:{
        updateUrgeForm:{urgingType:'',urgingNoticeDate:'',index:'',isLatest:''},
        updateLimitationForm:{limitationOfActionStartDate:'',limitationOfActionEndDate:'',changeDate:'',actionNoticeTime:'',index:'',isLatest:''},
      },
      updateRules:{
        'updateUrgeForm.urgingNoticeDate':{required:true,message:'不允许为空',trigger:['change','blur']},
        'updateUrgeForm.urgingType':{required:true,message:'不允许为空',trigger:['change','blur']},
        'updateLimitationForm.limitationOfActionStartDate':{required:true,message:'不允许为空',trigger:['change','blur']},
        'updateLimitationForm.limitationOfActionEndDate':{required:true,message:'不允许为空',trigger:['change','blur']},
        'updateLimitationForm.actionNoticeTime':[{required:true,message:'不允许为空',trigger:['change','blur']},{pattern:/^\d+$/,message:'必须为数字',trigger:['change','blur']}],
      },
      updateType:'urge',
      // updateUrgeForm:{urgingType:'',urgingNoticeDate:'',index:'',isLatest:''},
      // updateLimitationForm:{limitationOfActionStartDate:'',limitationOfActionEndDate:'',changeDate:'',actionNoticeTime:'',index:'',isLatest:''},
      updateDialogShow:false,
      //借据详情
      credit_data:'',

    }
  },
  created() {
    //接受require数据
    this.require_params.iou = this.$route.query.iou.replace(/^\s+|\s+$/g,"");
    //获取借据号对应的催收信息、诉讼时效信息
    let p1 = new Promise((resolve,reject) => {
      api({
        url: "/urgingNote/getUrgingNote",
        method: "get",
        params:{
          iouId:this.require_params.iou,
        }
      }).then(data => {
        resolve(data.data.datas);
      }).catch(err => {
        reject(err);
      })
    });
    let p2 = new Promise((resolve,reject) => {
      api({
        url: "/litigation/getLitigation",
        method: "get",
        params:{
          iouId:this.require_params.iou,
        }
      }).then(data => {
        resolve(data.data.datas);
      }).catch(err => {
        reject(err);
      })
    });
    let p3 = new Promise(((resolve, reject) => {
      api({
        url: "/CreditInfo/getFundamentalCredit",
        method: "get",
        params:{
          iouId:this.require_params.iou,
        }
      }).then(data => {
        resolve(data.data.datas);
      }).catch(err => {
        reject(err);
      })
    }))
    Promise.all([p1,p2,p3]).then(res => {
      console.log(res)
      this.credit_data = res[2];
      this.json2urge(res[0]);
      this.json2limitation(res[1]);
    }).catch(err => {
      console.log(err)
    })
    this.dataInit();
  },
  methods:{
    getTempKey(){
      return this.tempKey++;
    },
    dataInit(){
      this.addForm.newIouList.push({key:this.getTempKey(),value:this.require_params.iou})
    },
    //获取催告信息，将最新催告信息与历史催告信息合并在一起
    json2urge(data){
      this.origin_urgeData = JSON.parse(JSON.stringify(data));
      this.urgeTableData = [];
      let latest_row = {
        urgingNoticeDate:this.credit_data.urgingNoticeDate,
        urgingType:this.credit_data.urgingType,
        typeName:this.urgeType[this.credit_data.urgingType],
        index:0,
        isLatest:true,
        state:'最新',
      }
      if(this.credit_data.urgeDeleteFlag === 0){
        this.urgeTableData.push(latest_row);
      }
      data.forEach((value,index) => {
        let temp = {};
        temp['urgingNoticeDate'] = value.urgingNoticeDate;
        temp['urgingType'] = value.urgingType;
        temp['typeName'] = this.urgeType[value.urgingType];
        temp['index'] = index;
        temp['isLatest'] = false;
        temp['state'] = '历史记录';
        this.urgeTableData.push(temp);
      })
    },
    //获取诉讼信息，将最新诉讼信息与历史诉讼信息合并在一起
    json2limitation(data){
      this.origin_limitationData = JSON.parse(JSON.stringify(data));
      this.limitationTableData = [];
      let latest_row = {
        changeDate:this.credit_data.changeDate,
        limitationOfActionEndDate:this.credit_data.limitationOfActionEndDate,
        limitationOfActionStartDate:this.credit_data.limitationOfActionStartDate,
        actionNoticeTime:this.credit_data.actionNoticeTime,
        index:0,
        isLatest:true
      }
      if(this.credit_data.limitationDeleteFlag === 0){
        let endday = this.$moment(this.credit_data.limitationOfActionEndDate,"YYYY-MM-DD")
        let nowday = this.$moment().format("YYYY-MM-DD")
        let remindays = endday.diff(nowday,'days');
        let state = (Number(remindays)>Number(this.credit_data.actionNoticeTime))?'正常(最新)':(Number(remindays)>=0)?"剩余"+String(remindays)+"天到期(最新)":"已超期(最新)";
        latest_row.state = state;
        this.limitationTableData.push(latest_row);
      }
      data.forEach((value,index) => {
        let temp = {};
        temp['changeDate'] = value.changeDate;
        temp['limitationOfActionEndDate'] = value.limitationOfActionEndDate;
        temp['limitationOfActionStartDate'] = value.limitationOfActionStartDate;
        temp['actionNoticeTime'] = value.actionNoticeTime;
        temp['index'] = index;
        temp['isLatest'] = false;
        temp['state'] = "历史记录";
        this.limitationTableData.push(temp);
      })
    },
    /////////////////////////////////////////新增表单有关函数/////////////////////////////////////////////////////////
    handleAddCommand(command){
      this.addType = command;
      this.addDialogShow = true;
      //数据初始化
      this.addForm.addUrgeForm = {urgingType:'',urgingNoticeDate:''};
      this.addForm.addLimitationForm={limitationOfActionStartDate:'',limitationOfActionEndDate:'',changeDate:'',actionNoticeTime:''};
    },
    addDialogClose(done){
      // let urgeisNull = true;
      // let limitationisNull = true;
      // for(let prop in this.addForm.addUrgeForm){
      //   if(this.addForm.addUrgeForm[prop] !== ''){
      //     urgeisNull = false;
      //   }
      // }
      // for(let prop in this.addForm.addLimitationForm){
      //   if(this.addForm.addLimitationForm[prop] !== ''){
      //     limitationisNull = false;
      //   }
      // }
      // if((this.addType === 'urge' && (!urgeisNull || !limitationisNull)) || (this.addType ==='limitation' && !limitationisNull)){
      //   this.$confirm('确定放弃修改').then(_ => {
      //     done();
      //   }).catch(_ => {
      //
      //   })
      // }
      // else{
      //   done();
      // }
      done()
    },
    addIou(){
      this.addForm.newIouList.push({key:this.getTempKey(),value: ''});
    },
    removeIou(iou){
      var index = this.addForm.newIouList.indexOf(iou);
      if (index !== -1) {
        this.addForm.newIouList.splice(index, 1);
      }
    },
    resetIou(){
      this.addForm.newIouList=[{key:this.getTempKey(),value: this.require_params.iou}];
    },
    urgingNoticeChange(){
      this.addForm.addLimitationForm.limitationOfActionStartDate = this.addForm.addUrgeForm.urgingNoticeDate;
      let endDate = this.$moment(this.addForm.addUrgeForm.urgingNoticeDate).add(3, 'y').format("YYYY-MM-DD")
      this.addForm.addLimitationForm.limitationOfActionEndDate = endDate;
      this.addForm.addLimitationForm.changeDate = this.addForm.addUrgeForm.urgingNoticeDate;
    },
    addUrgeSubmit(){
      //对内容进行检验再提交
      this.$refs['addForm'].validate((valid) => {
        if(valid){
          //判断内容是否为空
          let urgeisNull = true;
          let limitationisNull = true;
          for(let prop in this.addForm.addUrgeForm){
            if(this.addForm.addUrgeForm[prop] !== ''){
              urgeisNull = false;
            }
          }
          for(let prop in this.addForm.addLimitationForm){
            if(this.addForm.addLimitationForm[prop] !== ''){
              limitationisNull = false;
            }
          }
          function postUrge(send_data){
            let p1 = new Promise(((resolve, reject) => {
              api({
                url: "/urgingNote/addUrgingNote",
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
          function postLimitation(send_data){
            let p1 = new Promise(((resolve, reject) => {
              api({
                url: "/litigation/addLitigation",
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

          if(this.addType==='urge' && !urgeisNull && !limitationisNull){
            //当前的处理方式存在漏洞，如果两个提交接口因为某总原因一个提交成功，一个失败，则会造成较大的影响
            let urge_data ={
              urgingNoticeDate:this.addForm.addUrgeForm.urgingNoticeDate,
              urgingType:this.addForm.addUrgeForm.urgingType,
              urgeDeleteFlag:0,
              iouIdList:this.addForm.newIouList.map(item => {return item.value})
            };
            let limitation_data = {
              changeDate:this.addForm.addLimitationForm.changeDate,
              limitationOfActionStartDate:this.addForm.addLimitationForm.limitationOfActionStartDate,
              limitationOfActionEndDate:this.addForm.addLimitationForm.limitationOfActionEndDate,
              actionNoticeTime:this.addForm.addLimitationForm.actionNoticeTime,
              limitationDeleteFlag: 0,
              iouIdList:this.addForm.newIouList.map(item => {return item.value}),
            };
            postUrge(urge_data).then(res => {
              // console.log('addurge',res)
              if(res.data.success){
                return postLimitation(limitation_data);
              }
              else{
                this.$message(res.data.msg)
                return false;
              }
            }).then(res => {
              // console.log('addlimi',res)
              if(res.data.success){
                location.reload();
              }
              else{
                this.$message(res.data.msg);
              }
              // location.reload();
            }).catch(err => {
              console.log(err);
            })
          }
          else if(this.addType==='limitation' && !limitationisNull){
            api({
              url: "/litigation/addLitigation",
              method: "post",
              data:{
                changeDate:this.addForm.addLimitationForm.changeDate,
                limitationOfActionStartDate:this.addForm.addLimitationForm.limitationOfActionStartDate,
                limitationOfActionEndDate:this.addForm.addLimitationForm.limitationOfActionEndDate,
                actionNoticeTime:this.addForm.addLimitationForm.actionNoticeTime,
                limitationDeleteFlag: 0,
                iouIdList:this.addForm.newIouList.map(item => {return item.value}),
              }
            }).then(data => {
              location.reload();
            }).catch(err => {
              console.log(err);
            })
          }
          else{
            alert('提交内容为空或者不完全')
          }
        }
        else{
          this.$message('请检查提交内容')
        }
      })
    },
///////////////////////////////////////////删除催告以及诉讼的函数/////////////////////////////////////////////////////////
    urgeDelete(row){
      //如果删除的是最新的，只修改主表，将主表的urgeDeleteFlag置为1;
      function deleteHiostory(send_data){
        let p1 = new Promise((resolve, reject) => {
          api({
            url: "/urgingNote/deleteUrgingNote",
            method: "post",
            data:send_data
          }).then(data => {
            resolve(data);
          }).catch(err => {
            reject(err);
          })
        })
        return p1;
      }
      function updateMain(send_data){
        let p2 = new Promise((resolve, reject) => {
          api({
            url: "CreditInfo/updateFundamentalCredit",
            method: "post",
            data:[send_data]
          }).then(data => {
            resolve(data);
          }).catch(err => {
            reject(err);
          })
        })
        return p2;
      }
      if(row.isLatest){
        let iou = this.require_params.iou;
        // let updateData = {id:this.require_params.iou, urgeDeleteFlag:1,limitationDeleteFlag:1}; //置为空，
        new Promise((resolve, reject) => {
          api({
            url: "/CreditInfo/getFundamentalCredit",
            method: "get",
            params:{
              iouId:iou,
            }
          }).then(data => {
            resolve(data);
          }).catch(err => {
            reject(err);
          })
        }).then(res => {
          let updateData = res.data.datas;
          updateData.urgeDeleteFlag =1;
          updateData.limitationDeleteFlag =1;
          return updateMain(updateData);
        }).then(res => {
          location.reload();
        }).catch(err => {
          console.log(err)
        })
        // updateMain(updateData).then(res => {
        //   location.reload();
        // }).catch(err => {
        //   console.log(err)
        // })
      }
      else{
        let deleteData = [this.origin_urgeData[row.index].id];
        deleteHiostory(deleteData).then(res => {
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }

    },
    limitationDelete(row){
      //如果删除的是最新的，要同时修改历史表和主表，历史表删除，主表记录修改为空
      function deleteHiostory(send_data){
        let p1 = new Promise((resolve, reject) => {
          api({
            url: "/litigation/deleteLitigation",
            method: "post",
            data:send_data
          }).then(data => {
            resolve(data);
          }).catch(err => {
            reject(err);
          })
        })
        return p1;
      }
      function updateMain(send_data){
        let p2 = new Promise((resolve, reject) => {
          api({
            url: "CreditInfo/updateFundamentalCredit",
            method: "post",
            data:[send_data]
          }).then(data => {
            resolve(data);
          }).catch(err => {
            reject(err);
          })
        })
        return p2;
      }

      if(row.isLatest){
        let iou = this.require_params.iou;
        // let updateData = {id:this.require_params.iou, urgeDeleteFlag:1,limitationDeleteFlag:1}; //置为空，
        new Promise((resolve, reject) => {
          api({
            url: "/CreditInfo/getFundamentalCredit",
            method: "get",
            params:{
              iouId:iou,
            }
          }).then(data => {
            resolve(data);
          }).catch(err => {
            reject(err);
          })
        }).then(res => {
          let updateData = res.data.datas;
          updateData.urgeDeleteFlag =1;
          updateData.limitationDeleteFlag =1;
          return updateMain(updateData);
        }).then(res => {
          location.reload();
        }).catch(err => {
          console.log(err)
        })
        // let updateData = [{id:this.require_params.iou, limitationDeleteFlag:1,urgeDeleteFlag:1}]; //置为空，如果允许的话最好置为Null
        // updateMain(updateData).then(res => {
        //   location.reload();
        // }).catch(err => {
        //   console.log(err)
        // })
      }
      else{
        let deleteData = [this.origin_limitationData[row.index].id];
        deleteHiostory(deleteData).then(res => {
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }
    },
  ///////////////////////////////////////////修改催告以及诉讼的函数/////////////////////////////////////////////////////////
    urgeEdit(row,index){
      this.updateType = 'urge';
      this.updateForm.updateUrgeForm.urgingNoticeDate = row.urgingNoticeDate;
      this.updateForm.updateUrgeForm.urgingType = row.urgingType;
      this.updateForm.updateUrgeForm.index = row.index;
      this.updateForm.updateUrgeForm.isLatest = row.isLatest;
      this.updateDialogShow = true;
    },
    limitationEdit(row,index){
      this.updateType = 'limitation';
      this.updateForm.updateLimitationForm.limitationOfActionStartDate = row.limitationOfActionStartDate;
      this.updateForm.updateLimitationForm.limitationOfActionEndDate = row.limitationOfActionEndDate;
      this.updateForm.updateLimitationForm.actionNoticeTime = row.actionNoticeTime;
      this.updateForm.updateLimitationForm.changeDate = row.changeDate;
      this.updateForm.updateLimitationForm.index = row.index;
      this.updateForm.updateLimitationForm.isLatest = row.isLatest;
      this.updateDialogShow = true;
    },
    updateSubmit(){
      this.$refs['updateForm'].validate((valid) => {
        if(valid){
          function updateUrge(send_data){
            let p1 = new Promise(((resolve, reject) => {
              api({
                url: "urgingNote/updateUrgingNote",
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
          function updateLimitation(send_data){
            let p1 = new Promise(((resolve, reject) => {
              api({
                url: "litigation/updateLitigation",
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
          function updateCredit(send_data){
            let p1 = new Promise(((resolve, reject) => {
              api({
                url: "CreditInfo/updateFundamentalCredit",
                method: "post",
                data:[send_data]
              }).then(data => {
                resolve(data);
              }).catch(err => {
                reject(err);
              })
            }))
            return p1;
          }

          if(this.updateType==='urge' && this.updateForm.updateUrgeForm.isLatest){
            let iou = this.require_params.iou;
            let urgeType = this.updateForm.updateUrgeForm.urgingType;
            let urgingNoticeDate = this.updateForm.updateUrgeForm.urgingNoticeDate;
            // let updateData = {id:this.require_params.iou, urgeDeleteFlag:1,limitationDeleteFlag:1}; //置为空，
            new Promise((resolve, reject) => {
              api({
                url: "/CreditInfo/getFundamentalCredit",
                method: "get",
                params:{
                  iouId:iou,
                }
              }).then(data => {
                resolve(data);
              }).catch(err => {
                reject(err);
              })
            }).then(res => {
              let updateData = res.data.datas;
              updateData.urgingType =urgeType;
              updateData.urgingNoticeDate =urgingNoticeDate;
              updateData.urgeDeleteFlag =0;
              return updateCredit(updateData);
            }).then(res => {
              location.reload();
            }).catch(err => {
              console.log(err)
            })
            // let creditData = [{id:this.credit_data.id,urgingType:this.updateForm.updateUrgeForm.urgingType, urgingNoticeDate:this.updateForm.updateUrgeForm.urgingNoticeDate,urgeDeleteFlag:0}];
            // updateCredit(creditData).then(res => {
            //   location.reload();
            // }).catch(err => {
            //   console.log(err);
            // })
          }
          else if(this.updateType==='urge' && !this.updateForm.updateUrgeForm.isLatest){
            let urgeData = {
              id:this.origin_urgeData[this.updateForm.updateUrgeForm.index].id,
              urgingType:this.updateForm.updateUrgeForm.urgingType,
              urgingNoticeDate:this.updateForm.updateUrgeForm.urgingNoticeDate
            };
            updateUrge(urgeData).then(res => {
              location.reload();
            }).catch(err => {
              console.log(err);
            })
          }
          else if(this.updateType==='limitation' && this.updateForm.updateLimitationForm.isLatest){
            let iou = this.require_params.iou;
            let limitationOfActionStartDate = this.updateForm.updateLimitationForm.limitationOfActionStartDate;
            let limitationOfActionEndDate = this.updateForm.updateLimitationForm.limitationOfActionEndDate;
            let actionNoticeTime = this.updateForm.updateLimitationForm.actionNoticeTime;
            let changeDate = this.updateForm.updateLimitationForm.changeDate;
            // let updateData = {id:this.require_params.iou, urgeDeleteFlag:1,limitationDeleteFlag:1}; //置为空，
            new Promise((resolve, reject) => {
              api({
                url: "/CreditInfo/getFundamentalCredit",
                method: "get",
                params:{
                  iouId:iou,
                }
              }).then(data => {
                resolve(data);
              }).catch(err => {
                reject(err);
              })
            }).then(res => {
              let updateData = res.data.datas;
              updateData.limitationOfActionStartDate =limitationOfActionStartDate;
              updateData.limitationOfActionEndDate =limitationOfActionEndDate;
              updateData.actionNoticeTime =actionNoticeTime;
              updateData.changeDate =changeDate;
              updateData.limitationDeleteFlag =0;
              return updateCredit(updateData);
            }).then(res => {
              location.reload();
            }).catch(err => {
              console.log(err)
            })
            // let creditData = [{
            //   id:this.credit_data.id,
            //   limitationOfActionStartDate:this.updateForm.updateLimitationForm.limitationOfActionStartDate,
            //   limitationOfActionEndDate:this.updateForm.updateLimitationForm.limitationOfActionEndDate,
            //   actionNoticeTime:this.updateForm.updateLimitationForm.actionNoticeTime,
            //   changeDate:this.updateForm.updateLimitationForm.changeDate,
            //   limitationDeleteFlag:0
            // }];
            // updateCredit(creditData).then(res => {
            //   location.reload();
            // }).catch(err => {
            //   console.log(err);
            // })
          }
          else if(this.updateType==='limitation' && !this.updateForm.updateLimitationForm.isLatest){
            let limitationData = {
              id:this.origin_limitationData[this.updateForm.updateLimitationForm.index].id,
              limitationOfActionStartDate:this.updateForm.updateLimitationForm.limitationOfActionStartDate,
              limitationOfActionEndDate:this.updateForm.updateLimitationForm.limitationOfActionEndDate,
              actionNoticeTime:this.updateForm.updateLimitationForm.actionNoticeTime,
              changeDate:this.updateForm.updateLimitationForm.changeDate,
            };
            updateLimitation(limitationData).then(res => {
              location.reload();
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
    updateDialogClose(done){
      done()
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
  margin-top: 20px;
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
</style>