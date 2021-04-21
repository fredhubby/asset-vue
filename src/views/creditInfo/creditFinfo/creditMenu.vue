<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/timeRemider"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权基础信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content1" style="text-align: start">
<!--          <el-dropdown trigger="click">-->
<!--            <el-button type="primary">-->
<!--              新增<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--            </el-button>-->
<!--            <el-dropdown-menu slot="dropdown">-->
<!--              <router-link-->
<!--                  target="_blank"-->
<!--                  :to="(first_table.multipleSelection.length===1)?{path:'/creditInfo/FInfo', query:{data:JSON.stringify(first_table.multipleSelection[0])}}:{path:'/creditInfo/FInfo'}">-->
<!--                <el-dropdown-item>普通债权</el-dropdown-item>-->
<!--              </router-link>-->
<!--              <router-link-->
<!--                  :to="(first_table.multipleSelection.length===1)?({path:'/creditInfo/FInfo',query:{data:JSON.stringify(first_table.multipleSelection[0])}}):({path:'/creditInfo/FInfo'})"-->
<!--                  target="_blank">-->
<!--                  <el-dropdown-item>资产包债权</el-dropdown-item>-->
<!--              </router-link>-->
<!--            </el-dropdown-menu>-->
<!--          </el-dropdown>-->
          <el-button @click="addIou" type="primary">新增借据</el-button>
          <el-button>数据导出</el-button>
<!--          <el-button>打印</el-button>-->
          <el-popconfirm
              v-if="activeModel==='third'"
              title="确定删除催告记录？"
              @confirm="deleteUrgeList">
            <el-button slot="reference">删除</el-button>
          </el-popconfirm>
          <el-popconfirm
              v-if="activeModel==='second'"
              title="确定删除转让记录？"
              @confirm="deleteTransferList">
            <el-button slot="reference">删除</el-button>
          </el-popconfirm>
          <el-popconfirm
              v-if="activeModel==='first'"
              title="确定删除借据数据？"
              @confirm="deleteCreditList">
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
                  <el-form-item label="借据ID:" label-width="70px"><el-input v-model="first_table.search_form.id" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="借据号:" label-width="75px"><el-input v-model="first_table.search_form.iouId" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="合同号:" label-width="75px"><el-input v-model="first_table.search_form.contractNo" clearable></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="资产包:" label-width="70px"><el-input v-model="first_table.search_form.assetPackageId" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="债务人:" label-width="75px"><el-input v-model="first_table.search_form.obligor" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="所在区域:" label-width="75px">
                    <el-select v-model="first_table.search_form.region" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="债权人:" label-width="70px">
                    <el-select v-model="first_table.search_form.creditor" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="原债权人:" label-width="75px">
                    <el-select v-model="first_table.search_form.originalCreditor" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="债权类型:" label-width="75px">
                    <el-select v-model="first_table.search_form.claimsType" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="借款起始日:" label-width="90px">
                    <el-date-picker v-model="first_table.search_form.loanCompensationDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="借款到期日:" label-width="90px">
                    <el-date-picker v-model="first_table.search_form.loanCompensationDueDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="交易基准日:" label-width="90px">
                    <el-date-picker v-model="first_table.search_form.tradingBaseDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
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
                  <el-form-item label="借据ID:" label-width="70px"><el-input v-model="second_table.search_form.id" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="借据号:" label-width="75px"><el-input v-model="second_table.search_form.iouId" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="债务人:" label-width="75px"><el-input v-model="second_table.search_form.obligor" clearable></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="债权人:" label-width="70px">
                    <el-select v-model="second_table.search_form.creditor" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="原债权人:" label-width="75px">
                    <el-select v-model="second_table.search_form.originalCreditor" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="债权类型:" label-width="75px">
                    <el-select v-model="second_table.search_form.claimsType" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="转让进度:" label-width="75px"><el-input v-model="second_table.search_form.claimsProgress" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="备注:" label-width="75px"><el-input v-model="second_table.search_form.remarks" clearable></el-input></el-form-item>
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
                  <el-form-item label="借据ID:" label-width="70px"><el-input v-model="third_table.search_form.id" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="借据号:" label-width="75px"><el-input v-model="third_table.search_form.iouId" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="债务人:" label-width="75px"><el-input v-model="third_table.search_form.obligor" clearable></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="债权人:" label-width="70px">
                    <el-select v-model="third_table.search_form.creditor" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="原债权人:" label-width="75px">
                    <el-select v-model="third_table.search_form.originalCreditor" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="债权类型:" label-width="75px">
                    <el-select v-model="third_table.search_form.claimsType" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="催告方式:" label-width="75px">
                    <el-select v-model="third_table.search_form.urgingType" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in urgeType_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="催告日:" label-width="75px">
                    <el-date-picker v-model="third_table.search_form.urgingNoticeDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="诉讼时效起始日:" label-width="120px">
                    <el-date-picker v-model="third_table.search_form.limitationOfActionStartDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="诉讼时效截止日:" label-width="120px">
                    <el-date-picker v-model="third_table.search_form.limitationOfActionEndDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="登记日期:" label-width="75px">
                    <el-date-picker v-model="third_table.search_form.changeDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
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
<!--          <el-input placeholder="支持条件模糊搜索" v-model="searchInput">-->
<!--            <el-button slot="append" icon="el-icon-search"></el-button>-->
<!--          </el-input>-->
        </div>
      </el-col>
    </el-row>

    <el-tabs v-model="activeModel" type="border-card" @tab-click="changeModel">
      <el-tab-pane label="债权基本信息" name="first">
        <el-card class="box-card">
            <el-table :data="first_table.tableData" border :height="tableHeight" style="width: 100%" class="el-table"
                      ref="filterTable" @selection-change="firstSelectionChange" >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column prop="id" label="ID" width="150" ></el-table-column>
              <el-table-column prop="iouId" label="借据号" width="150" ></el-table-column>
              <el-table-column prop="contractNo" label="借款合同号" width="120" ></el-table-column>
              <el-table-column prop="assetPackageId" label="资产包ID" width="120" ></el-table-column>
              <el-table-column prop="obligor" label="债务人" width="130" ></el-table-column>
              <el-table-column prop="region" label="所在镇区" width="130" ></el-table-column>
              <el-table-column prop="creditor" label="债权人" width="130" ></el-table-column>
              <el-table-column prop="originalCreditor" label="原债权人" width="130" ></el-table-column>
              <el-table-column prop="claimsTypeName" label="债权类别" width="150" ></el-table-column>
              <el-table-column prop="loanCompensationDate" label="借款(代偿)日" width="100" ></el-table-column>
              <el-table-column prop="loanCompensationDueDate" label="借款(代偿)到期日" width="120" ></el-table-column>
              <el-table-column prop="principalOfLoan" label="交易日借款本金" width="120" ></el-table-column>
              <el-table-column prop="annualInterestRate" label="借款年利率" width="120" ></el-table-column>
              <el-table-column prop="penaltyAnnualInterestRate" label="逾期罚息年利率" width="120" ></el-table-column>
              <el-table-column prop="loanInterest" label="交易日借款利息" width="120" ></el-table-column>
              <el-table-column prop="tradingBaseDate" label="交易基准日" width="120" ></el-table-column>

              <el-table-column prop="repaymentPrincipal" label="还款本金总额" width="120" ></el-table-column>
              <el-table-column prop="repaymentInterest" label="还款利息金额" width="120" ></el-table-column>
              <el-table-column prop="remainPrincipal" label="剩余本金" width="120" ></el-table-column>
              <el-table-column prop="remainInterest" label="剩余利息" width="120" ></el-table-column>
              <el-table-column prop="remarks" label="备注" width="120" ></el-table-column>
              <el-table-column prop="operate" fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="creditDetail(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-pagination style="margin-top: 10px"
                           @size-change="firstSizeChange"
                           @current-change="firstCurrentChange"
                           :current-page="first_table.currentPage"
                           :page-sizes="[10, 20, 30, 40, 50]"
                           :page-size="first_table.pagesize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="first_table.totalsize">
              <!--            :hide-on-single-page="true">-->
            </el-pagination>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="债权转让记录" name="second">
        <el-card class="box-card">
          <el-table :data="second_table.tableData" border :height="tableHeight" style="width: 100%" class="el-table"
                    ref="filterTable" @selection-change="secondSelectionChange" >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="id" label="ID" width="150" ></el-table-column>
            <el-table-column prop="iouId" label="借据号" width="150" ></el-table-column>
            <el-table-column prop="obligor" label="债务人" width="130" ></el-table-column>
            <el-table-column prop="creditor" label="债权人" width="130" ></el-table-column>
            <el-table-column prop="originalCreditor" label="原债权人" width="130" ></el-table-column>
            <el-table-column prop="claimsTypeName" label="债权类别" width="150" ></el-table-column>
            <el-table-column prop="principalOfLoan" label="交易日借款本金" width="120" ></el-table-column>
            <el-table-column prop="loanInterest" label="交易日借款利息" width="120" ></el-table-column>
<!--            <el-table-column prop="transferType" label="是否转让" width="120" ></el-table-column>-->
            <el-table-column prop="acquisitionCost" label="取得成本" width="120" ></el-table-column>
            <el-table-column prop="valuationPrice" label="评估价格" width="120" ></el-table-column>
            <el-table-column prop="transferPrice" label="转让价格" width="120" ></el-table-column>
            <el-table-column prop="claimsProgress" label="债权转让进度" width="120" ></el-table-column>
            <el-table-column prop="remarks" label="备注" width="120" ></el-table-column>
            <el-table-column prop="operate" fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="creditTransferDetail(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination style="margin-top: 10px"
                         @size-change="secondSizeChange"
                         @current-change="secondCurrentChange"
                         :current-page="second_table.currentPage"
                         :page-sizes="[10, 20, 30, 40, 50]"
                         :page-size="second_table.pagesize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="second_table.totalsize">
            <!--            :hide-on-single-page="true">-->
          </el-pagination>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="债权催告记录" name="third">
        <el-card class="box-card">
          <el-table :data="third_table.tableData" border :height="tableHeight" style="width: 100%" class="el-table"
                    ref="filterTable" @selection-change="thirdSelectionChange" >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="id" label="ID" width="150" ></el-table-column>
            <el-table-column prop="iouId" label="借据号" width="150" ></el-table-column>
            <el-table-column prop="obligor" label="债务人" width="130" ></el-table-column>
            <el-table-column prop="creditor" label="债权人" width="130" ></el-table-column>
            <el-table-column prop="originalCreditor" label="原债权人" width="130" ></el-table-column>
            <el-table-column prop="claimsTypeName" label="债权类别" width="150" ></el-table-column>
            <el-table-column prop="urgeTypeName" label="催告方式" width="120" ></el-table-column>
            <el-table-column prop="urgingNoticeDate" label="催告日" width="120" ></el-table-column>
            <el-table-column prop="limitationOfActionStartDate" label="诉讼时效起始日" width="120" ></el-table-column>
            <el-table-column prop="limitationOfActionEndDate" label="诉讼时效截止日" width="120" ></el-table-column>
<!--            <el-table-column prop="actionNoticeTime" label="时效提醒" width="120" ></el-table-column>-->
            <el-table-column prop="changeDate" label="登记日期" width="120" ></el-table-column>
            <el-table-column prop="operate" fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="urgeDetail(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination style="margin-top: 10px"
                         @size-change="thirdSizeChange"
                         @current-change="thirdCurrentChange"
                         :current-page="third_table.currentPage"
                         :page-sizes="[10, 20, 30, 40, 50]"
                         :page-size="third_table.pagesize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="third_table.totalsize">
            <!--            :hide-on-single-page="true">-->
          </el-pagination>
        </el-card>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import myfilter from "../../common/myfilter";
import {default as api} from "@/utils/api";
import qs from 'qs';
export default {
  name: "creditMenu",
  data(){
    return{

      first_table:{
        currentPage: 1,
        pagesize:10,
        totalsize:10,
        tableData:[],
        multipleSelection:[],
        url:"CreditInfo/getCreditList",
        search_form:{id:'', iouId:'', contractNo:'', assetPackageId:'', obligor:'', region:'', creditor:'', originalCreditor:'', claimsType:'', loanCompensationDate:"", loanCompensationDueDate:'', tradingBaseDate:"",},
        filter_flag:false,
      },
      second_table:{
        currentPage: 1,
        pagesize:10,
        totalsize:10,
        tableData:[],
        multipleSelection:[],
        url:"CreditTransfer/getCreditTransferList",
        search_form:{id:'',iouId:'',obligor:'',creditor:'',originalCreditor:'',claimsType:'',claimsProgress:'',remarks:''},
        filter_flag:false,
      },
      third_table:{
        currentPage: 1,
        pagesize:10,
        totalsize:10,
        tableData:[],
        multipleSelection:[],
        url:"urgingNote/getUrgingNoteList",
        search_form:{id:'',iouId:'',obligor:'',creditor:'',originalCreditor:'',claimsType:'',urgingType:'',urgingNoticeDate:'',limitationOfActionStartDate:'',limitationOfActionEndDate:'',changeDate:''},
        filter_flag:false,
      },
      clamimsIndex:{'0':'阳光担保','1':'小贷公司','2':'资产包'},
      urgeTypeIndex:{'0':'省级媒体','1':'直接送达','2':'邮寄送达','3':'本地媒体'},
      searchInput:'',
      activeModel:'first',
      tableHeight:window.innerHeight - 400,
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
      options2: [
        {value: '云阳镇', label: '云阳镇'}, {value: '开发区', label: '开发区'},
        {value: '新桥镇', label: '新桥镇'}, {value: '后巷镇', label: '后巷镇'},
        {value: '界牌镇', label: '界牌镇'}, {value: '陴城镇', label: '陴城镇'},
        {value: '访仙镇', label: '访仙镇'}, {value: '吕城镇', label: '吕城镇'},
        {value: '陵口镇', label: '陵口镇'}, {value: '珥陵镇', label: '珥陵镇'},
        {value: '导墅镇', label: '导墅镇'}, {value: '皇堂镇', label: '皇堂镇'},
        {value: '延陵镇', label: '延陵镇'}],
      options3: [
        {value: '2', label: '资产包'},
        {value: '1', label: '小贷公司'},
        {value: '0', label: '阳光担保'}],
      urgeType_options:[
        {value:'0',label:'省级媒体'},
        {value:'1',label:'直接送达'},
        {value:'2',label:'邮寄送达'},
        {value:'3',label:'本地媒体'},
      ],

    }
  },
  created() {
    let promise_credit = this.getdataList(this.first_table.url,this.first_table.currentPage,this.first_table.pagesize);
    let promise_transfer = this.getdataList(this.second_table.url,this.second_table.currentPage,this.second_table.pagesize);
    let promise_urge = this.getdataList(this.third_table.url,this.third_table.currentPage,this.third_table.pagesize);
    Promise.all([promise_credit,promise_transfer,promise_urge]).then(res => {
      this.setFirstTable(res[0].data.datas.records)
      this.setSecondTable(res[1].data.datas.records)
      this.setThirdTable(res[2].data.datas.records)
      this.first_table.totalsize = res[0].data.datas.total;
      this.second_table.totalsize = res[1].data.datas.total;
      this.third_table.totalsize = res[2].data.datas.total;
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
    getdataList(url,currentPage,pagesize){
      let p1 = new  Promise(((resolve, reject) => {
        api({
          url: url,
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
    setFirstTable(data){
      this.first_table.tableData = JSON.parse(JSON.stringify(data));
      for(let i=0;i<this.first_table.tableData.length;i++){
        this.$set(this.first_table.tableData[i],'remainPrincipal',Number(this.first_table.tableData[i].principalOfLoan)-Number(this.first_table.tableData[i].repaymentPrincipal));
        this.$set(this.first_table.tableData[i],'remainInterest',Number(this.first_table.tableData[i].loanInterest)-Number(this.first_table.tableData[i].repaymentInterest));
        this.$set(this.first_table.tableData[i],'claimsTypeName',this.clamimsIndex[this.first_table.tableData[i].claimsType])
      }
    },
    setSecondTable(data){
      this.second_table.tableData = JSON.parse(JSON.stringify(data));
      for(let i=0;i<this.second_table.tableData.length;i++){
        this.$set(this.second_table.tableData[i],'claimsTypeName',this.clamimsIndex[this.second_table.tableData[i].claimsType])
      }
    },
    setThirdTable(data){
      this.third_table.tableData = JSON.parse(JSON.stringify(data));
      for(let i=0;i<this.third_table.tableData.length;i++){
        this.$set(this.third_table.tableData[i],'claimsTypeName',this.clamimsIndex[this.third_table.tableData[i].claimsType])
        this.$set(this.third_table.tableData[i],'urgeTypeName',this.urgeTypeIndex[this.third_table.tableData[i].urgingType]);
      }
    },
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    firstSelectionChange(val) {
      this.first_table.multipleSelection = val;
    },
    firstSizeChange(val) {
      this.first_table.pagesize=val;
      if(this.first_table.filter_flag){
        let send_data = JSON.parse(JSON.stringify(this.first_table.search_form));
        send_data.size = this.first_table.pagesize;
        send_data.current = this.first_table.currentPage;
        this.getSearchDataList('CreditInfo/searchFundamentalCredit',send_data).then(res => {
          this.setFirstTable(res.data.datas.records);
          this.first_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
      else{
        this.getdataList(this.first_table.url,this.first_table.currentPage,this.first_table.pagesize).then(res => {
          this.setFirstTable(res.data.datas.records);
          this.first_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    firstCurrentChange(val) {
      this.first_table.currentPage=val;
      if(this.first_table.filter_flag){
        let send_data = JSON.parse(JSON.stringify(this.first_table.search_form));
        send_data.size = this.first_table.pagesize;
        send_data.current = this.first_table.currentPage;
        this.getSearchDataList('CreditInfo/searchFundamentalCredit',send_data).then(res => {
          this.setFirstTable(res.data.datas.records);
          this.first_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
      else{
        this.getdataList(this.first_table.url,this.first_table.currentPage,this.first_table.pagesize).then(res => {
          this.setFirstTable(res.data.datas.records);
          this.first_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    secondSelectionChange(val) {
      this.second_table.multipleSelection = val;
    },
    secondSizeChange(val) {
      this.second_table.pagesize=val;
      if(this.second_table.filter_flag){
        let send_data = JSON.parse(JSON.stringify(this.second_table.search_form));
        send_data.size = this.second_table.pagesize;
        send_data.current = this.second_table.currentPage;
        this.getSearchDataList('CreditTransfer/searchCreditTransferList',send_data).then(res => {
          this.setSecondTable(res.data.datas.records);
          this.second_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
      else{
        this.getdataList(this.second_table.url,this.second_table.currentPage,this.second_table.pagesize).then(res => {
          this.setSecondTable(res.data.datas.records);
          this.second_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    secondCurrentChange(val) {
      this.second_table.currentPage=val;
      if(this.second_table.filter_flag){
        let send_data = JSON.parse(JSON.stringify(this.second_table.search_form));
        send_data.size = this.second_table.pagesize;
        send_data.current = this.second_table.currentPage;
        this.getSearchDataList('CreditTransfer/searchCreditTransferList',send_data).then(res => {
          this.setSecondTable(res.data.datas.records);
          this.second_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
      else{
        this.getdataList(this.second_table.url,this.second_table.currentPage,this.second_table.pagesize).then(res => {
          this.setSecondTable(res.data.datas.records);
          this.second_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    thirdSelectionChange(val) {
      this.third_table.multipleSelection = val;
    },
    thirdSizeChange(val) {
      this.third_table.pagesize=val;
      if(this.third_table.filter_flag){
        let send_data = JSON.parse(JSON.stringify(this.third_table.search_form));
        send_data.size = this.third_table.pagesize;
        send_data.current = this.third_table.currentPage;
        this.getSearchDataList('urgingNote/searchUrgingNote',send_data).then(res => {
          this.setThirdTable(res.data.datas.records);
          this.third_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
      else{
        this.getdataList(this.third_table.url,this.third_table.currentPage,this.third_table.pagesize).then(res => {
          this.setThirdTable(res.data.datas.records);
          this.third_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
    },
    thirdCurrentChange(val) {
      this.third_table.currentPage=val;
      if(this.third_table.filter_flag){
        let send_data = JSON.parse(JSON.stringify(this.third_table.search_form));
        send_data.size = this.third_table.pagesize;
        send_data.current = this.third_table.currentPage;
        this.getSearchDataList('urgingNote/searchUrgingNote',send_data).then(res => {
          this.setThirdTable(res.data.datas.records);
          this.third_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
      else {
        this.getdataList(this.third_table.url, this.third_table.currentPage, this.third_table.pagesize).then(res => {
          this.setThirdTable(res.data.datas.records);
          this.third_table.totalsize = res.data.datas.total;
        }).catch(err => {
          console.log(err);
        })
      }
    },

    creditDetail(row){
      this.$router.push({path:'/creditInfo/creditFinfo/xqCreditFinfo',query:{iou:row.id.replace(/^\s+|\s+$/g,"")}});
    },
    creditTransferDetail(row){
      this.$router.push({path:'/creditInfo/creditFinfo/xqCreditFinfo',query:{iou:row.id.replace(/^\s+|\s+$/g,"")}});
    },
    urgeDetail(row){
      this.$router.push({path:'/creditInfo/creditFinfo/xqCollection',query:{iou:row.id.replace(/^\s+|\s+$/g,"")}});
    },

    deleteUrgeList(){
      if(this.third_table.multipleSelection.length===0){
        alert('请先选择要删除的记录')
      }
      else{
        api({
          url: "/CreditInfo/updateFundamentalCredit",
          method: "post",
          data:this.third_table.multipleSelection.map(item => {return {id:item.id,urgeDeleteFlag:1}})
        }).then(data => {
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }
    },
    deleteTransferList(){
      if(this.second_table.multipleSelection.length===0){
        alert('请先选择要删除的记录')
      }
      else{
        api({
          url: "/CreditInfo/updateFundamentalCredit",
          method: "post",
          data:this.second_table.multipleSelection.map(item => {return {id:item.id,transferType:1}})
        }).then(data => {
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }
    },
    deleteCreditList(){
      if(this.first_table.multipleSelection.length===0){
        alert('请先选择要删除的借据');
      }
      else{
        var _this = this;
        api({
          url: "/CreditInfo/deleteFundamentalCredit",
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


    renderHeader(h, { column }) {
      return h("div",
          [
            h("span", column.label),
            h('span',{
                  style:'position: relative;left:3px'
                },
                [
                  h("i",{
                    class: "el-icon-caret-top",
                    style:'display:inline-block;color:#409EFF;position: absolute;',
                    attrs: {id: "el-icon-caret-top"+column.property},
                    on:{
                      click:()=>{
                        const top = document.getElementById("el-icon-caret-top"+column.property);
                        const bottom = document.getElementById("el-icon-caret-bottom"+column.property);
                        console.log(top);
                        console.log(bottom);
                        top.style.color = '#409EFF';
                        bottom.style.color = '#C0C4CC';
                        this.sortByAscend();
                      }
                    }
                  }),
                  h("i",{
                    class: "el-icon-caret-bottom",
                    style:'display:inline-block;color:#C0C4CC;position: absolute;top:5px',
                    attrs: {id: "el-icon-caret-bottom"+column.property},
                    on:{
                      click:()=>{
                        const top = document.getElementById("el-icon-caret-top"+column.property);
                        const bottom = document.getElementById("el-icon-caret-bottom"+column.property);
                        bottom.style.color = '#409EFF';
                        top.style.color = '#C0C4CC';
                        this.sortByDescend();
                      }
                    }
                  }),
                  h("el-popover", {
                        props:{placement : "bottom", trigger:"click", popperClass:"popper_class"},

                        style:'position:absolute;left:17px'
                      },
                      [
                        h(myfilter, {
                          props:{label:column.label, property:column.property},
                          on: {click_filter: this.clickFilter}
                        }),
                        h("i", {
                          slot:"reference",
                          class:'el-icon-arrow-down'
                        })
                      ])
                ]),
          ]);
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
    changeModel(){

    },
    //清空筛选数据,
    filterReset(){
      if(this.activeModel === 'first'){
        this.first_table.search_form= {id:'', iouId:'', contractNo:'', assetPackageId:'', obligor:'', region:'', creditor:'', originalCreditor:'', claimsType:'', loanCompensationDate:"", loanCompensationDueDate:'', tradingBaseDate:"",};
        if(this.first_table.filter_flag){
          this.first_table.pagesize =10;
          this.first_table.currentPage=1;
          this.getdataList(this.first_table.url,this.first_table.currentPage,this.first_table.pagesize).then(res => {
            console.log('qignkong',res)
            this.setFirstTable(res.data.datas.records);
            this.first_table.totalsize = res.data.datas.total;
            this.first_table.filter_flag = false;
          }).catch(err => {
            console.log(err);
          })
        }
      }
      else if(this.activeModel === 'second'){
        this.second_table.search_form={id:'',iouId:'',obligor:'',creditor:'',originalCreditor:'',claimsType:'',claimsProgress:'',remarks:''};
        if(this.second_table.filter_flag){
          this.second_table.pagesize =10;
          this.second_table.currentPage=1;
          this.getdataList(this.second_table.url,this.second_table.currentPage,this.second_table.pagesize).then(res => {
            this.setSecondTable(res.data.datas.records);
            this.second_table.totalsize = res.data.datas.total;
            this.second_table.filter_flag = false;
          }).catch(err => {
            console.log(err);
          })
        }
      }
      else if(this.activeModel === 'third'){
        this.third_table.search_form = {id:'',iouId:'',obligor:'',creditor:'',originalCreditor:'',claimsType:'',urgingType:'',urgingNoticeDate:'',limitationOfActionStartDate:'',limitationOfActionEndDate:'',changeDate:''};
        if(this.third_table.filter_flag){
          this.third_table.pagesize =10;
          this.third_table.currentPage=1;
          this.getdataList(this.third_table.url,this.third_table.currentPage,this.third_table.pagesize).then(res => {
            this.setThirdTable(res.data.datas.records);
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
        this.getSearchDataList('CreditInfo/searchFundamentalCredit',send_data).then(res => {
          console.log(res);
          this.setFirstTable(res.data.datas.records);
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
        this.getSearchDataList('CreditTransfer/searchCreditTransferList',send_data).then(res => {
          console.log(res);
          this.setSecondTable(res.data.datas.records);
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
        this.getSearchDataList('urgingNote/searchUrgingNote',send_data).then(res => {
          console.log(res);
          this.setThirdTable(res.data.datas.records);
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
    },
    addIou(){
      let newPage = this.$router.resolve({
        path:'/creditInfo/FInfo',
        query:{
          data:Boolean(this.first_table.multipleSelection.length===1)?JSON.stringify(this.first_table.multipleSelection[0]):'',
        }
      })
      window.open(newPage.href,'_blank')
    }
  },
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
}
.row_bg{
  box-shadow:none;
  margin-top: 5px;
}
</style>