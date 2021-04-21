<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/timeRemider"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">查询统计</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">以物抵债资产管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content1">
          <el-tooltip class="item" effect="dark" content="请选择抵押物明细列表中的抵押物" placement="top">
            <el-button type="primary" @click="addSMAD">新增以物抵债</el-button>
          </el-tooltip>
          <el-button>数据导出</el-button>
<!--          <el-button>打印</el-button>-->
          <el-popconfirm
              v-if="activeModel==='third'"
              title="确定删除法拍记录？"
              @confirm="deleteForce">
            <el-button slot="reference">删除</el-button>
          </el-popconfirm>
          <el-popconfirm
              v-if="activeModel==='second'"
              title="确定删除以物抵债记录？"
              @confirm="deleteDebInKind">
            <el-button slot="reference">删除</el-button>
          </el-popconfirm>
          <el-popconfirm
              v-if="activeModel==='first'"
              title="确定删除抵押物？"
              @confirm="deleteCollatreal">
            <el-button slot="reference">删除</el-button>
          </el-popconfirm>
<!--          <el-button>隐藏列</el-button>-->
          <el-popover
              v-if="activeModel==='first'"
              placement="down"
              trigger="click">
            <el-form ref="form1" :model="first_table.search_form">
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="抵押物ID:" label-width="75px"><el-input v-model="first_table.search_form.id" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="抵押物:" label-width="75px"><el-input v-model="first_table.search_form.collateralName" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="抵押人:" label-width="75px"><el-input v-model="first_table.search_form.guarantor" clearable></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="抵押类型:" label-width="75px">
                    <el-select v-model="first_table.search_form.collateralType" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in collateralType_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="抵押物位置:" label-width="90px"><el-input v-model="first_table.search_form.collateralLocation" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="土地性质:" label-width="75px">
                    <el-select v-model="first_table.search_form.landType" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in landType_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="抵押起始日:" label-width="90px">
                    <el-date-picker v-model="first_table.search_form.guaranteeStartDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="抵押到期日:" label-width="90px">
                    <el-date-picker v-model="first_table.search_form.guaranteeEndDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="是否被催告:" label-width="90px">
                    <el-select v-model="first_table.search_form.timeConversion" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in timeTransfer_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-button @click="filterReset">清空</el-button>
              <el-button type="primary" @click="filterSearch">筛选</el-button>
            </el-form>
            <el-button slot="reference" type="success">筛选<i class="el-icon-caret-bottom"></i></el-button>
          </el-popover>
          <el-popover
              v-if="activeModel==='second'"
              placement="down"
              trigger="click">
            <el-form ref="form1" :model="second_table.search_form">
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="抵押物ID:" label-width="75px"><el-input v-model="second_table.search_form.id" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="抵押物:" label-width="75px"><el-input v-model="second_table.search_form.collateralName" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="被执行人:" label-width="75px"><el-input v-model="second_table.search_form.executee" clearable></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="抵押类型:" label-width="75px">
                    <el-select v-model="second_table.search_form.collateralType" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in collateralType_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="抵押物位置:" label-width="90px"><el-input v-model="second_table.search_form.collateralLocation" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="执行案号:" label-width="75px"><el-input v-model="second_table.search_form.caseId" clearable></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="案件状态:" label-width="75px"><el-input v-model="second_table.search_form.caseStatus" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="执行裁定结果:" label-width="100px"><el-input v-model="second_table.search_form.rulingResult" clearable></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-button @click="filterReset">清空</el-button>
              <el-button type="primary" @click="filterSearch">筛选</el-button>
            </el-form>
            <el-button slot="reference" type="success">筛选<i class="el-icon-caret-bottom"></i></el-button>
          </el-popover>
          <el-popover
              v-if="activeModel==='third'"
              placement="down"
              trigger="click">
            <el-form ref="form1" :model="third_table.search_form">
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="抵押物ID:" label-width="75px"><el-input v-model="third_table.search_form.id" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="抵押物:" label-width="75px"><el-input v-model="third_table.search_form.collateralName" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="抵押人:" label-width="75px"><el-input v-model="third_table.search_form.guarantor" clearable></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="资产性质:" label-width="75px"><el-input v-model="third_table.search_form.natureAsset" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="抵押物位置:" label-width="90px"><el-input v-model="third_table.search_form.collateralLocation" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="土地性质:" label-width="75px">
                    <el-select v-model="third_table.search_form.landType" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in landType_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="案件进度:" label-width="75px"><el-input v-model="third_table.search_form.caseAdvancing" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="现产权人:" label-width="75px"><el-input v-model="third_table.search_form.currentOwner" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="移交部门:" label-width="75px"><el-input v-model="third_table.search_form.transferringDepartment" clearable></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="移交时间:" label-width="75px">
                    <el-date-picker v-model="third_table.search_form.handoverTime" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
<!--                <el-col :span="7">-->
<!--                  <el-form-item label="债务人:" label-width="75px"><el-input v-model="third_table.search_form.borrower" clearable></el-input></el-form-item>-->
<!--                </el-col>-->
              </el-row>
              <el-button @click="filterReset">清空</el-button>
              <el-button type="primary" @click="filterSearch">筛选</el-button>
            </el-form>
            <el-button slot="reference" type="success">筛选<i class="el-icon-caret-bottom"></i></el-button>
          </el-popover>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content2" style="margin-top: 5px">
<!--          <el-input placeholder="支持条件模糊搜索" v-model="input1">-->
<!--            <el-button slot="append" icon="el-icon-search"></el-button>-->
<!--          </el-input>-->
        </div>
      </el-col>
    </el-row>

    <el-tabs v-model="activeModel" type="border-card" @tab-click="changeModel">
      <el-tab-pane label="抵押物明细" name="first">
        <el-card class="box-card">
          <el-table :data="first_table.table_data" border :height="tableHeight" style="width: 100%;" class="el-table"
                    ref="filterTable" @selection-change="handleSelectionChange" >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="collateralName" sortable label="抵押物" ></el-table-column>
            <el-table-column prop="guarantor" label="抵押人"></el-table-column>
            <el-table-column prop="collateralTypeName" label="抵押类型"></el-table-column>
            <el-table-column prop="collateralLocation" sortable label="抵押物位置"></el-table-column>
            <el-table-column prop="landArea" sortable label="土地面积"></el-table-column>
            <el-table-column prop="landTypeName" label="土地性质" ></el-table-column>
            <el-table-column prop="propertySize" sortable label="房产面积"></el-table-column>
            <el-table-column prop="appraisedValue" label="评估价"></el-table-column>
            <el-table-column prop="registrationAmount" label="登记金额" ></el-table-column>
            <el-table-column prop="guaranteeStartDate" label="抵押期限起始日" ></el-table-column>
            <el-table-column prop="guaranteeEndDate" label="抵押期限到期日" ></el-table-column>
            <el-table-column prop="timeConversion" label="是否被催告" ></el-table-column>
            <el-table-column prop="operate" fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button  @click="detail(scope.row,scope.$index)" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination style="margin-top: 10px"
                         @size-change="handleFirstSizeChange"
                         @current-change="handleFirstCurChange"
                         :current-page="first_table.currentPage"
                         :page-sizes="[10, 20, 30, 40, 50]"
                         :page-size="first_table.pagesize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="first_table.totalsize">
          </el-pagination>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="以物抵债明细" name="second">
        <el-card class="box-card">
          <div  class="text item">
            <el-table :data="second_table.table_data" border :height="tableHeight" style="width: 100%;" class="el-table"
                      ref="filterTable" @selection-change="handleSelectionChange" >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column prop="executee" sortable label="被执行人" ></el-table-column>
              <el-table-column prop="transferPrincipalBalance" label="转让时本金余额"></el-table-column>
              <el-table-column prop="caseId" label="执行案号"></el-table-column>
              <el-table-column prop="caseStatus" sortable label="案件状态"></el-table-column>
              <el-table-column prop="collateralName" sortable label="抵押物"></el-table-column>
              <el-table-column prop="collateralLocation" label="抵押物位置" ></el-table-column>
              <el-table-column prop="appraisedValue" sortable label="评估价格"></el-table-column>
              <el-table-column prop="debtInKindValue" sortable label="以物抵债金额"></el-table-column>
              <el-table-column prop="rulingResult" label="执行裁定结果"></el-table-column>
              <el-table-column prop="legalDocument" label="法律文书" ></el-table-column>
              <el-table-column prop="operate" fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button  @click="detail(scope.row,scope.$index)" type="text" size="small">详情</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-pagination style="margin-top: 10px"
                           @size-change="handleSecondSizeChange"
                           @current-change="handleSecondCurChange"
                           :current-page="second_table.currentPage"
                           :page-sizes="[10, 20, 30, 40, 50]"
                           :page-size="second_table.pagesize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="second_table.totalsize">
            </el-pagination>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="法拍" name="third">
        <el-card class="box-card">
          <div  class="text item">
            <el-table :data="third_table.table_data" border :height="tableHeight" style="width: 100%;" class="el-table"
                      ref="filterTable" @selection-change="handleSelectionChange" >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column prop="principal" sortable label="本金" ></el-table-column>
              <el-table-column prop="borrower" label="借款人"></el-table-column>
              <el-table-column prop="guarantor" label="抵押人"></el-table-column>
              <el-table-column prop="collateralName" sortable label="抵押物"></el-table-column>
              <el-table-column prop="collateralLocation" sortable label="抵押物位置"></el-table-column>
              <el-table-column prop="landArea" sortable label="土地面积"></el-table-column>
              <el-table-column prop="landTypeName" label="土地性质" ></el-table-column>
              <el-table-column prop="propertySize" sortable label="房产面积"></el-table-column>
              <el-table-column prop="natureAsset" label="资产性质"></el-table-column>
              <el-table-column prop="caseAdvancing" label="案件进度" ></el-table-column>
              <el-table-column prop="currentOwner" label="现产权人" ></el-table-column>
              <el-table-column prop="transferringDepartment" label="移交部门" ></el-table-column>
              <el-table-column prop="handoverTime" label="移交时间" ></el-table-column>
              <el-table-column prop="operate" fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button  @click="detail(scope.row,scope.$index)" type="text" size="small">详情</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-pagination style="margin-top: 10px"
                           @size-change="handleThirdSizeChange"
                           @current-change="handleThirdCurChange"
                           :current-page="third_table.currentPage"
                           :page-sizes="[10, 20, 30, 40, 50]"
                           :page-size="third_table.pagesize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="third_table.totalsize">
            </el-pagination>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "SMAD",
  data(){
    return{
      input1:'',
      activeModel:'first',
      first_table:{
        pagesize:10,
        currentPage: 1,
        table_data:[],
        totalsize:0,
        multipleSelection:[],
        search_form:{id:'',collateralName:'',guarantor:'',collateralType:'',collateralLocation:'',landType:'',guaranteeStartDate:'',guaranteeEndDate:'',timeConversion:'',},
        filter_flag:false,
      },
      second_table:{
        pagesize:10,
        currentPage: 1,
        table_data:[],
        totalsize:0,
        multipleSelection:[],
        search_form:{id:'',executee:'',caseId:'',caseStatus:'',collateralName:'',collateralLocation:'',rulingResult:'',},
        filter_flag:false,
      },
      third_table:{
        pagesize:10,
        currentPage: 1,
        table_data:[],
        totalsize:0,
        multipleSelection:[],
        search_form:{id:'',guarantor:'',collateralName:'',collateralLocation:'',landType:'',natureAsset:'',caseAdvancing:'',currentOwner:'',transferringDepartment:'',handoverTime:''},
        filter_flag:false,
      },
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
      timeTransfer_options:[
        {value:'0',label:'否'},
        {value:'1',label:'是'}
      ],
      collateralTypeIndex: {'0':'建筑物和其它土地附着物','1':'建设用地使用权','2':'海域使用权','3':'生产设备、原材料、半成品、产品','4':'交通运输工具','5':'其它'},
      landTypeIndex:{'0':'工业用地','1':'商业用地'},
      tableHeight:window.innerHeight - 400,
    }
  },
  created() {
    let first_cur = this.first_table.currentPage;
    let first_pagesize = this.first_table.pagesize;
    let second_cur = this.second_table.currentPage;
    let second_pagesize = this.second_table.pagesize;
    let third_cur = this.third_table.currentPage;
    let third_pagesize = this.third_table.pagesize;
    Promise.all([this.getCollateralList(first_cur,first_pagesize),this.getPayInKindList(second_cur,second_pagesize),this.getPayInKindList(third_cur,third_pagesize)]).then(res => {
      this.setCollateralTableData(res[0].data.datas.records);
      this.first_table.totalsize = res[0].data.datas.total;
      this.setPayinkindTableData(res[1].data.datas.records);
      this.second_table.totalsize = res[1].data.datas.total;
      this.setForceTableData(res[2].data.datas.records);
      this.third_table.totalsize = res[2].data.datas.total;
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
  mounted () {
    window.onresize = () => {
      return (() => {
          this.tableHeight = window.innerHeight - 400
      })()
    }
  },
  activated () {
    this.tableHeight = window.innerHeight - 400
  },
  methods:{
    //获取抵押物信息List
    getCollateralList(currentPage,pagesize){
      let p1 = new  Promise(((resolve, reject) => {
        api({
          url: "/collateral/getCollateralList",
          method: "get",
          params:{
            current:currentPage,
            size:pagesize
          }
        }).then(data => {
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      }))
      return p1;
    },
    //获取以物抵债信息List
    getPayInKindList(currentPage,pagesize){
      let p1 = new Promise(((resolve, reject) => {
        api({
          url: "/collateral/getPayInKindList",
          method: "get",
          params:{
            current:currentPage,
            size:pagesize
          }
        }).then(data => {
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      }))
      return p1;
    },
    //解析数据置于表格中
    setCollateralTableData(data){
      this.first_table.table_data = [];
      data.forEach((value,index) => {
        this.first_table.table_data.push({
          id: value.id,
          index: index,
          collateralName: value.collateralName,
          guarantor: value.guarantor,
          collateralType: value.collateralType,
          collateralTypeName: this.collateralTypeIndex[value.collateralType],
          collateralLocation: value.collateralLocation,
          landArea: value.landArea,
          landType: value.landType,
          landTypeName: this.landTypeIndex[value.landType],
          propertySize: value.propertySize,
          appraisedValue: value.appraisedValue,
          registrationAmount: value.registrationAmount,
          guaranteeStartDate: value.guaranteeStartDate,
          guaranteeEndDate: value.guaranteeEndDate,
          timeConversion: (value.timeConversion === '1') ? '是' : '否',
          borrower:value.borrower,
          principal:value.principal,
          transferPrincipalBalance:value.transferPrincipalBalance,
        })
      })
    },
    setPayinkindTableData(data){
      this.second_table.table_data = [];
      data.forEach((value,index) => {
        this.second_table.table_data.push({
          id:value.id,
          index:index,
          executee:value.executee,
          transferPrincipalBalance:value.transferPrincipalBalance,
          caseId:value.caseId,
          caseStatus:value.caseStatus,
          collateralName:value.collateralName,
          collateralLocation:value.collateralLocation,
          appraisedValue:value.appraisedValue,
          debtInKindValue:value.debtInKindValue,
          rulingResult:value.rulingResult,
          legalDocument:'',
          borrower:value.borrower,
          principal:value.principal,
        })
      })
    },
    setForceTableData(data){
      this.third_table.table_data = [];
      data.forEach((value,index) => {
        this.third_table.table_data.push({
          id:value.id,
          index:index,
          guarantor:value.guarantor,
          collateralName:value.collateralName,
          collateralLocation:value.collateralLocation,
          landArea:value.landArea,
          landTypeName:this.landTypeIndex[value.landType],
          propertySize:value.propertySize,
          natureAsset:value.natureAsset,
          caseAdvancing:value.caseAdvancing,
          currentOwner:value.currentOwner,
          transferringDepartment:value.transferringDepartment,
          handoverTime:value.handoverTime,
          borrower:value.borrower,
          principal:value.principal,
          transferPrincipalBalance:value.transferPrincipalBalance,
        })
      })
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      if(this.activeModel === 'first'){
        this.first_table.multipleSelection = val;
      }
      else if(this.activeModel === 'second'){
        this.second_table.multipleSelection = val;
      }
      else{
        this.third_table.multipleSelection = val;
      }
    },

    handleFirstSizeChange(val){
      this.first_table.pagesize = val;
      if(this.first_table.filter_flag){
        let send_data = JSON.parse(JSON.stringify(this.first_table.search_form));
        send_data.size = this.first_table.pagesize;
        send_data.current = this.first_table.currentPage;
        this.getSearchDataList('collateral/searchCollateralList',send_data).then(res => {
          console.log(res);
          this.setCollateralTableData(res.data.datas.records);
          this.first_table.totalsize = res.data.datas.total;
          this.first_table.filter_flag = true;
        }).catch(err => {
          console.log(err);
        })
      }
      else{
        this.getCollateralList(this.first_table.currentPage,this.first_table.pagesize).then(res => {
          this.setCollateralTableData(res.data.datas.records);
          this.first_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    handleFirstCurChange(val){
      this.first_table.currentPage = val;
      if(this.first_table.filter_flag){
        let send_data = JSON.parse(JSON.stringify(this.first_table.search_form));
        send_data.size = this.first_table.pagesize;
        send_data.current = this.first_table.currentPage;
        this.getSearchDataList('collateral/searchCollateralList',send_data).then(res => {
          console.log(res);
          this.setCollateralTableData(res.data.datas.records);
          this.first_table.totalsize = res.data.datas.total;
          this.first_table.filter_flag = true;
        }).catch(err => {
          console.log(err);
        })
      }
      else{
        this.getCollateralList(this.first_table.currentPage,this.first_table.pagesize).then(res => {
          this.setCollateralTableData(res.data.datas.records);
          this.first_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    handleSecondSizeChange(val){
      this.second_table.pagesize = val;
      if(this.second_table.filter_flag){
        let send_data = JSON.parse(JSON.stringify(this.second_table.search_form));
        send_data.size = this.second_table.pagesize;
        send_data.current = this.second_table.currentPage;
        this.getSearchDataList('collateral/searchPayInKindList',send_data).then(res => {
          this.setPayinkindTableData(res.data.datas.records);
          this.second_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
      else{
        this.getPayInKindList(this.second_table.currentPage,this.second_table.pagesize).then(res => {
          this.setPayinkindTableData(res.data.datas.records);
          this.second_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    handleSecondCurChange(val){
      this.second_table.currentPage = val;
      if(this.second_table.filter_flag){
        let send_data = JSON.parse(JSON.stringify(this.second_table.search_form));
        send_data.size = this.second_table.pagesize;
        send_data.current = this.second_table.currentPage;
        this.getSearchDataList('collateral/searchPayInKindList',send_data).then(res => {
          this.setPayinkindTableData(res.data.datas.records);
          this.second_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
      else{
        this.getPayInKindList(this.second_table.currentPage,this.second_table.pagesize).then(res => {
          this.setPayinkindTableData(res.data.datas.records);
          this.second_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    handleThirdSizeChange(val){
      this.third_table.pagesize = val;
      if(this.third_table.filter_flag){
        let send_data = JSON.parse(JSON.stringify(this.third_table.search_form));
        send_data.size = this.third_table.pagesize;
        send_data.current = this.third_table.currentPage;
        this.getSearchDataList('collateral/searchPayInKindList',send_data).then(res => {
          this.setForceTableData(res.data.datas.records);
          this.third_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
      else{
        this.getPayInKindList(this.third_table.currentPage,this.third_table.pagesize).then(res => {
          this.setForceTableData(res.data.datas.records);
          this.third_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    handleThirdCurChange(val){
      this.third_table.currentPage = val;
      if(this.third_table.filter_flag){
        let send_data = JSON.parse(JSON.stringify(this.third_table.search_form));
        send_data.size = this.third_table.pagesize;
        send_data.current = this.third_table.currentPage;
        this.getSearchDataList('collateral/searchPayInKindList',send_data).then(res => {
          this.setForceTableData(res.data.datas.records);
          this.third_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
      else{
        this.getPayInKindList(this.third_table.currentPage,this.third_table.pagesize).then(res => {
          this.setForceTableData(res.data.datas.records);
          this.third_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
    },

    addSMAD(){
      console.log(this.first_table.multipleSelection.length)
      if(this.first_table.multipleSelection.length===0){
        this.$message("请选择抵押物")
      }
      else if(this.first_table.multipleSelection.length>1){
        this.$message("最多选择一项抵押物")
      }
      else if(this.first_table.multipleSelection.length === 1){
        let newpage = this.$router.resolve({
          path: '/totalSearch/addSMAD',
          query:{
            id:this.first_table.multipleSelection[0].id.replace(/^\s+|\s+$/g,""),
            name:this.first_table.multipleSelection[0].collateralName,
            caseId:'',
          }
        })
        window.open(newpage.href, '_blank');
      }
    },
    detail(row,index){
      this.$router.push({
        path:'/totalSearch/SMADXQ/SMADxq',
        query:{
          id:row.id.replace(/^\s+|\s+$/g,""),
          borrower:row.borrower,
          principal:row.principal,
          transferPrincipalBalance:row.transferPrincipalBalance,
        }
      })
    },
    deleteCollatreal(){
      if(this.first_table.multipleSelection.length===0){
        alert('请先选择要删除的数据');
      }
      else{
        var _this = this;
        api({
          url: "/Secure/deleteCollateral",
          method: "post",
          data:this.first_table.multipleSelection.map(item => {return item.id})
        }).then(data => {
          // console.log(data);
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }
    },
    deleteDebInKind(){
      if(this.second_table.multipleSelection.length===0){
        alert('请先选择要删除的数据');
      }
      else{
        let promiseList = [];
        this.second_table.multipleSelection.forEach((value,index)=>{
          let p1 = new Promise((resolve, reject) => {
            api({
              url:'/collateral/getCollateral',
              method:'get',
              params:{
                id:value.id
              }
            }).then(data => {
              resolve(data);
            }).catch(err => {
              reject(err);
            })
          })
          promiseList.push(p1);
        })
        Promise.all(promiseList).then(res=>{
          console.log(res)
          let send_data = [];
          res.forEach((value,index)=>{
            delete value.data.datas.legalDocumentList;
            value.data.datas.debtInKindDeleteFlag = 1;
            send_data.push(value.data.datas);
          })
          return new Promise((resolve, reject) => {
            api({
              url: "/Secure/updateCollateral",
              method: "post",
              data:send_data
            }).then(data => {
              resolve(data)
            }).catch(err => {
              reject(err);
            })
          })
        }).then(res => {
          console.log(res);
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }
    },
    deleteForce(){
      if(this.third_table.multipleSelection.length===0){
        alert('请先选择要删除的数据');
      }
      else{
        let promiseList = [];
        this.third_table.multipleSelection.forEach((value,index)=>{
          let p1 = new Promise((resolve, reject) => {
            api({
              url:'/collateral/getCollateral',
              method:'get',
              params:{
                id:value.id
              }
            }).then(data => {
              resolve(data);
            }).catch(err => {
              reject(err);
            })
          })
          promiseList.push(p1);
        })
        Promise.all(promiseList).then(res=>{
          console.log(res)
          let send_data = [];
          res.forEach((value,index)=>{
            delete value.data.datas.legalDocumentList;
            value.data.datas.debtInKindDeleteFlag = 1;
            send_data.push(value.data.datas);
          })
          return new Promise((resolve, reject) => {
            api({
              url: "/Secure/updateCollateral",
              method: "post",
              data:send_data
            }).then(data => {
              resolve(data)
            }).catch(err => {
              reject(err);
            })
          })
        }).then(res => {
          console.log(res);
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }
    },
    changeModel(tab,event){

    },
    filterReset(){
      if(this.activeModel === 'first'){
        this.first_table.search_form= {id:'',collateralName:'',guarantor:'',collateralType:'',collateralLocation:'',landType:'',guaranteeStartDate:'',guaranteeEndDate:'',timeConversion:'',};
        if(this.first_table.filter_flag){
          this.first_table.pagesize =10;
          this.first_table.currentPage=1;
          this.getCollateralList(this.first_table.currentPage,this.first_table.pagesize).then(res => {
            this.setCollateralTableData(res.data.datas.records);
            this.first_table.totalsize = res.data.datas.total;
            this.first_table.filter_flag = false;
          }).catch(err => {
            console.log(err);
          })
        }
      }
      else if(this.activeModel === 'second'){
        this.second_table.search_form={id:'',executee:'',caseId:'',caseStatus:'',collateralName:'',collateralLocation:'',rulingResult:'',};
        if(this.second_table.filter_flag){
          this.second_table.pagesize =10;
          this.second_table.currentPage=1;
          this.getPayInKindList(this.second_table.currentPage,this.second_table.pagesize).then(res => {
            this.setPayinkindTableData(res.data.datas.records);
            this.second_table.totalsize = res.data.datas.total;
            this.second_table.filter_flag = false;
          }).catch(err => {
            console.log(err);
          })
        }
      }
      else if(this.activeModel === 'third'){
        this.third_table.search_form = {id:'',guarantor:'',collateralName:'',collateralLocation:'',landType:'',natureAsset:'',caseAdvancing:'',currentOwner:'',transferringDepartment:'',handoverTime:''};
        if(this.third_table.filter_flag){
          this.third_table.pagesize =10;
          this.third_table.currentPage=1;
          this.getPayInKindList(this.third_table.currentPage,this.third_table.pagesize).then(res => {
            this.setForceTableData(res.data.datas.records);
            this.third_table.totalsize = res.data.datas.total;
            this.third_table.filter_flag = false;
          }).catch(err => {
            console.log(err);
          })
        }
      }
    },
    filterSearch(){
      if(this.activeModel==='first' && !this.isSearchFormEmpty(this.first_table.search_form)){
        let send_data = JSON.parse(JSON.stringify(this.first_table.search_form));
        this.first_table.pagesize =10;
        this.first_table.currentPage=1;
        send_data.size = this.first_table.pagesize;
        send_data.current = this.first_table.currentPage;
        this.getSearchDataList('collateral/searchCollateralList',send_data).then(res => {
          console.log(res);
          this.setCollateralTableData(res.data.datas.records);
          this.first_table.totalsize = res.data.datas.total;
          this.first_table.filter_flag = true;
        }).catch(err => {
          console.log(err);
        })
      }
      else if(this.activeModel==='second' && !this.isSearchFormEmpty(this.second_table.search_form)){
        let send_data = JSON.parse(JSON.stringify(this.second_table.search_form));
        this.second_table.pagesize =10;
        this.second_table.currentPage=1;
        send_data.size = this.second_table.pagesize;
        send_data.current = this.second_table.currentPage;
        this.getSearchDataList('collateral/searchPayInKindList',send_data).then(res => {
          console.log(res);
          this.setPayinkindTableData(res.data.datas.records);
          this.second_table.totalsize = res.data.datas.total;
          this.second_table.filter_flag = true;
        }).catch(err => {
          console.log(err);
        })
      }
      else if(this.activeModel==='third' && !this.isSearchFormEmpty(this.third_table.search_form)){
        let send_data = JSON.parse(JSON.stringify(this.third_table.search_form));
        this.third_table.pagesize =10;
        this.third_table.currentPage=1;
        send_data.size = this.third_table.pagesize;
        send_data.current = this.third_table.currentPage;
        this.getSearchDataList('collateral/searchPayInKindList',send_data).then(res => {
          console.log(res);
          this.setForceTableData(res.data.datas.records);
          this.third_table.totalsize = res.data.datas.total;
          this.third_table.filter_flag = true;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    isSearchFormEmpty(data){
      let isNull = true;
      for(let prop in data){
        if(data[prop] !== ''){
          isNull = false;
        }
      }
      return isNull
    },
    getSearchDataList(url,send_data){
      let p1 = new Promise(((resolve, reject) => {
        api({
          url: url,
          method: "post",
          data:send_data
        }).then(data => {
          resolve(data)
        }).catch(err => {
          reject(err);
        })
      }))
      return p1;
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
.el-row{
  margin-top: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  height: 50px;
}
.el-button{
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
  font-family: 黑体;
  font-size: 15px;
}
.box-card{
  border: none;
  box-shadow: none;
}

/deep/ .el-card__body{
  padding: 0 0 0 0;
}
/deep/ .el-tabs--border-card{
  margin-top: 20px;
  min-height: 300px;
}

.cardHeader{
  height: 15px;
  font-size: 15px;
  font-weight: bold;
}
.el-table{
  text-align: center;
  /*max-height: 400px;*/
}
/deep/ .el-table__body-wrapper{

}
/deep/ .el-table__fixed-right{

}
.item {
  margin: 4px;
}
.row_bg{
  box-shadow:none;
  margin-top: 5px;
}
</style>