<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权基础信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20" class="el_row1">
      <el-col :span="16">
        <div class="grid-content1">
          <el-dropdown trigger="click">
            <el-button type="primary">
              新增<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <router-link
                  target="_blank"
                  :to="{path:'/creditInfo/FInfo', query:{claimType:''} }">
                <el-dropdown-item>普通债权</el-dropdown-item>
              </router-link>
              <router-link
                  :to="(multipleSelection.length!==1)?('#'):({path:'/creditInfo/FInfo',query:{claimType : '资产包', assetPackageId:multipleSelection[0].assetPackageId}})"
                  :target="(multipleSelection.length!==1)?('_self'):('_blank')">
                <el-dropdown-item :disabled="Boolean(multipleSelection.length!==1)">资产包债权</el-dropdown-item>
              </router-link>
              <router-link
                  :to="(multipleSelection.length===0)?('#'):({path:'/creditInfo/SMortgage',query:{creditList:JSON.stringify(multipleSelection_iou)}})"
                  :target="(multipleSelection.length===0)?('_self'):('_blank')">
                <el-dropdown-item :disabled="Boolean(multipleSelection.length===0)">担保抵押信息</el-dropdown-item>
              </router-link>
              <router-link
                  :to="(multipleSelection.length===0)?('#'):({path:'/creditInfo/fee',query:{creditList:JSON.stringify(multipleSelection_iou)}})"
                  :target="(multipleSelection.length===0)?('_self'):('_blank')">
                <el-dropdown-item :disabled="Boolean(multipleSelection.length===0)">债权费用信息</el-dropdown-item>
              </router-link>
              <router-link
                  :to="(multipleSelection.length!==1)?('#'):({path:'/creditRecall/recallXq',query:{iou:multipleSelection[0].id}})"
                  :target="(multipleSelection.length!==1)?('_self'):('_blank')">
                <el-dropdown-item :disabled="Boolean(multipleSelection.length!==1)">还款信息</el-dropdown-item>
              </router-link>
            </el-dropdown-menu>
          </el-dropdown>
<!--          <el-cascader-->
<!--            v-model="new_value"-->
<!--            :options="new_options"-->
<!--            placeholder="新增"-->
<!--            :props="{ expandTrigger: 'hover' }"-->
<!--            @change="handleCascaderChange">-->
<!--          </el-cascader>-->
          <el-button @click="" type="success">数据导出</el-button>
<!--          <el-button>打印</el-button>-->
          <el-popconfirm
              title="确定删除借据数据？"
              @confirm="deleteCreditList">
            <el-button slot="reference" type="danger">删除</el-button>
          </el-popconfirm>

          <el-popover
              width="600"
              placement="down"
              trigger="click">
            <el-form ref="form1" :model="form">
              <el-form-item>
                <el-row :gutter="20" type="flex" class="row-bg">
                  <el-col :span="20" :offset="1"><el-checkbox v-model="form.id_show">借据号</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form.contractNo_show">借款合同号</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form.assetPackageId_show">资产包ID</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form.obligor_show">债务人</el-checkbox></el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg">
                  <el-col :span="20" :offset="1"><el-checkbox v-model="form.region_show">所在镇区</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form.creditor_show">债权人</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form.originalCreditor_show">原债权人</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form.claimsType_show">债权类别</el-checkbox></el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg">
                  <el-col :span="20" :offset="1"><el-checkbox v-model="form.loanCompensationDate_show">借款(代偿)日</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form.loanCompensationDueDate_show">借款(代偿)到期日</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form.principalOfLoan_show">交易日借款本金</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form.annualInterestRate_show">借款年利率</el-checkbox></el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg">
                  <el-col :span="20" :offset="1"><el-checkbox v-model="form.penaltyAnnualInterestRate_show">逾期罚息年利率</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form.loanInterest_show">交易日借款利息</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form.tradingBaseDate_show">交易基准日</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form.transferType_show">是否转让</el-checkbox></el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg">
                  <el-col :span="20" :offset="1"><el-checkbox v-model="form.acquisitionCost_show">取得成本</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form.valuationPrice_show">评估价格</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form.transferPrice_show">转让价格</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form.claimsProgress_show">债权转让进度</el-checkbox></el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg">
                  <el-col :span="20" :offset="1"><el-checkbox v-model="form.remarks_show">备注</el-checkbox></el-col>
                </el-row>
              </el-form-item>
            </el-form>
            <el-button slot="reference" type="warning">隐藏列<i class="el-icon-caret-bottom"></i></el-button>
          </el-popover>

          <el-popover
              placement="down"
              trigger="click">
            <el-form ref="form1" :model="form1">
              <el-row :gutter="20" type="flex" class="row-bg">
                  <el-form-item label="">
                      <el-col :span="2"><el-checkbox v-model="form1.id_checked">借据号</el-checkbox></el-col>
                  </el-form-item>
                  <el-form-item>
                      <el-col :span="30"><el-input v-model="form1.id" clearable :disabled="Boolean(!form1.id_checked)"></el-input></el-col>
                  </el-form-item>
                  <el-form-item>
                      <el-col :span="2"><el-checkbox v-model="form1.contractNo_checked">借款合同号</el-checkbox></el-col>
                  </el-form-item>
                  <el-form-item>
                      <el-col :span="30"><el-input v-model="form1.contractNo" clearable :disabled="Boolean(!form1.contractNo_checked)"></el-input></el-col>
                  </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.assetPackageId_checked">资产包ID</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.assetPackageId" clearable :disabled="Boolean(!form1.assetPackageId_checked)"></el-input></el-col>
                </el-form-item>
              </el-row>
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.obligor_checked">债务人</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.obligor" clearable :disabled="Boolean(!form1.obligor_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.region_checked">所在镇区</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30">
                    <el-select v-model="form1.region"  clearable :disabled="Boolean(!form1.region_checked)">
                      <el-option
                          v-for="item in options1"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.creditor_checked">债权人</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30">
                    <el-select v-model="form1.creditor" clearable :disabled="Boolean(!form1.creditor_checked)">
                      <el-option
                          v-for="item in options2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-row>
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-form-item>
                <el-col :span="2"><el-checkbox v-model="form1.originalCreditor_checked">原债权人</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30">
                    <el-select v-model="form1.originalCreditor" clearable :disabled="Boolean(!form1.originalCreditor_checked)">
                      <el-option
                          v-for="item in options3"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.claimsType_checked">债权类别</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30">
                    <el-select v-model="form1.claimsType" clearable :disabled="Boolean(!form1.claimsType_checked)">
                      <el-option
                          v-for="item in options4"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.loanCompensationDate_checked">借款（代偿）日</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30">
                    <el-date-picker
                        v-model="form1.loanCompensationDate"
                        type="daterange"
                        :disabled="Boolean(!form1.loanCompensationDate_checked)"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                  </el-col>
                </el-form-item>
              </el-row>
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.loanCompensationDueDate_checked">借款（代偿）到期日</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30">
                    <el-date-picker
                        v-model="form1.loanCompensationDueDate"
                        type="daterange"
                        :disabled="Boolean(!form1.loanCompensationDueDate_checked)"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.tradingBaseDate_checked">交易基准日</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30">
                    <el-date-picker
                        v-model="form1.tradingBaseDate"
                        type="daterange"
                        :disabled="Boolean(!form1.tradingBaseDate_checked)"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                  </el-col>
                </el-form-item>
              </el-row>
              <el-row :gutter="30" type="flex" class="row-bg">
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.transferType_checked">是否转让</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="20">
                    <el-select v-model="form1.transferType" :disabled="Boolean(!form1.transferType_checked)">
                      <el-option
                          v-for="item in options5"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.claimsProgress_checked">债权转让进度</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="20">
                    <el-select v-model="form1.claimsProgress"
                               :disabled="Boolean(!(form1.claimsProgress_checked && form1.transferType_checked))">
                      <el-option
                          v-for="item in options6"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-form-item>

              </el-row>
<!--                -->
              <el-button @click="reset('form1')">清空</el-button>
              <el-button type="primary" @click="screen">筛选</el-button>
            </el-form>
            <el-button slot="reference" type="success">筛选<i class="el-icon-caret-bottom"></i></el-button>
          </el-popover>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content2" style="margin-top: 5px">
          <el-input placeholder="支持条件模糊搜索" v-model="input1">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>

    <el-card class="box-card">
      <div slot="header" class="cardHeader">
        <span>债权记录</span>
      </div>
      <div  class="text item">
        <el-table :data="tableData" border height="500" style="width: 100%" class="el-table"
                  ref="filterTable" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="id" label="借据号" width="200" :render-header="renderHeader" v-if="!form.id_show"></el-table-column>
          <el-table-column prop="contractNo" label="借款合同号" width="200" :render-header="renderHeader" v-if="!form.contractNo_show"></el-table-column>
          <el-table-column prop="assetPackageId" label="资产包ID" width="200" :render-header="renderHeader" v-if="!form.assetPackageId_show"></el-table-column>
          <el-table-column prop="obligor" label="债务人" width="150" :render-header="renderHeader" v-if="!form.obligor_show"></el-table-column>
          <el-table-column prop="region" label="所在镇区" width="150" :render-header="renderHeader" v-if="!form.region_show"></el-table-column>
          <el-table-column prop="creditor" label="债权人" width="150" :render-header="renderHeader" v-if="!form.creditor_show"></el-table-column>
          <el-table-column prop="originalCreditor" label="原债权人" width="150" :render-header="renderHeader" v-if="!form.originalCreditor_show"></el-table-column>
          <el-table-column prop="claimsType" label="债权类别" width="150" :render-header="renderHeader" v-if="!form.claimsType_show"></el-table-column>
          <el-table-column prop="loanCompensationDate" label="借款(代偿)日" width="100" :render-header="renderHeader" v-if="!form.loanCompensationDate_show"></el-table-column>
          <el-table-column prop="loanCompensationDueDate" label="借款(代偿)到期日" width="120" :render-header="renderHeader" v-if="!form.loanCompensationDueDate_show"></el-table-column>
          <el-table-column prop="principalOfLoan" label="交易日借款本金" width="120" :render-header="renderHeader" v-if="!form.principalOfLoan_show"></el-table-column>
          <el-table-column prop="annualInterestRate" label="借款年利率" width="120" :render-header="renderHeader" v-if="!form.annualInterestRate_show"></el-table-column>
          <el-table-column prop="penaltyAnnualInterestRate" label="逾期罚息年利率" width="120" :render-header="renderHeader" v-if="!form.penaltyAnnualInterestRate_show"></el-table-column>
          <el-table-column prop="loanInterest" label="交易日借款利息" width="120" :render-header="renderHeader" v-if="!form.loanInterest_show"></el-table-column>
          <el-table-column prop="tradingBaseDate" label="交易基准日" width="120" :render-header="renderHeader" v-if="!form.tradingBaseDate_show"></el-table-column>
          <el-table-column prop="transferType" label="是否转让" width="120" :render-header="renderHeader" v-if="!form.transferType_show"></el-table-column>
          <el-table-column prop="acquisitionCost" label="取得成本" width="120" :render-header="renderHeader" v-if="!form.acquisitionCost_show"></el-table-column>
          <el-table-column prop="valuationPrice" label="评估价格" width="120" :render-header="renderHeader" v-if="!form.valuationPrice_show"></el-table-column>
          <el-table-column prop="transferPrice" label="转让价格" width="120" :render-header="renderHeader" v-if="!form.transferPrice_show"></el-table-column>
          <el-table-column prop="claimsProgress" label="债权转让进度" width="120" :render-header="renderHeader" v-if="!form.claimsProgress_show"></el-table-column>
          <el-table-column prop="remarks" label="备注" width="120" :render-header="renderHeader" v-if="!form.remarks_show"></el-table-column>
          <el-table-column prop="operate" fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="creditDetail(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination style="margin-top: 10px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalsize">
<!--            :hide-on-single-page="true">-->
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import myfilter from "../../common/myfilter";
import {default as api} from "@/utils/api";
export default {
  name: "creditMenu",
  data(){
    return{
      form:{
        id_show:false,
        contractNo_show:false,
        assetPackageId_show:false,
        obligor_show:false,
        region_show:false,
        creditor_show:false,
        originalCreditor_show:false,
        claimsType_show:false,
        loanCompensationDate_show:false,
        loanCompensationDueDate_show:false,
        principalOfLoan_show:false,
        annualInterestRate_show:false,
        penaltyAnnualInterestRate_show:false,
        loanInterest_show:false,
        tradingBaseDate_show:false,
        transferType_show:false,
        acquisitionCost_show:false,
        valuationPrice_show:false,
        transferPrice_show:false,
        claimsProgress_show:false,
        remarks_show:false
      },
      form1:{
        id_checked: false,
        id:'',
        contractNo_checked: false,
        contractNo: '',
        assetPackageId_checked: false,
        assetPackageId: '',
        obligor_checked:false,
        obligor: '',
        region_checked:false,
        region: '',
        creditor_checked:false,
        creditor: '',
        originalCreditor_checked:false,
        originalCreditor: '',
        claimsType_checked:false,
        claimsType: '',
        loanCompensationDate_checked:false,
        loanCompensationDate: '',
        loanCompensationDueDate_checked:false,
        loanCompensationDueDate: '',
        tradingBaseDate_checked:false,
        tradingBaseDate: '',
        transferType_checked:false,
        transferType: '',
        claimsProgress_checked:false,
        claimsProgress: ''
      },
      pickerOptions:[],
      input1:'',
      currentPage: 1,
      pagesize:10,
      totalsize:10,
      tableData: [],
      filterItems:{},
      multipleSelection:[],
      new_value:[],
      options1: [
        {value: '云阳镇', label: '云阳镇'}, {value: '开发区', label: '开发区'},
        {value: '新桥镇', label: '新桥镇'}, {value: '后巷镇', label: '后巷镇'},
        {value: '界牌镇', label: '界牌镇'}, {value: '陴城镇', label: '陴城镇'},
        {value: '访仙镇', label: '访仙镇'}, {value: '吕城镇', label: '吕城镇'},
        {value: '陵口镇', label: '陵口镇'}, {value: '珥陵镇', label: '珥陵镇'},
        {value: '导墅镇', label: '导墅镇'}, {value: '皇堂镇', label: '皇堂镇'},
        {value: '延陵镇', label: '延陵镇'}],
      options2:[
        {value: '天惠投资', label: '天惠投资'},
        {value: '天晟投资', label: '天晟投资'},
        {value: '天工惠农小贷', label: '天工惠农小贷'},
        {value: '银润小贷', label: '银润小贷'},
        {value: '阳光企业', label: '阳光企业'}],
      options3: [
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
      options4: [{value: '2', label: '资产包'}, {value: '1', label: '小贷公司'}],
      options5: [{value: '1', label: '是'}, {value: '2', label: '否'}],
      options6: [{value: '1', label: '转让中'}, {value: '2', label: '转让完成'}],
      new_options: [{
        value: 'creditBasic',
        label: '债权基本信息',
        children: [{
          value: 'assetPackage',
          label: '资产包债权',
        }, {
          value: 'commonCredit',
          label: '普通债权',
        }]
      }, {
        value: 'danbaodiya',
        label: '担保抵押信息',
        children: [{
          value: 'baozheng',
          label: '保证担保',
        }, {
          value: 'diya',
          label: '抵押担保',
        }, {
          value: 'zhiya',
          label: '质押担保',
        }, {
          value: 'other_danbao',
          label: '其它担保',
        }]
      }, {
        value: 'fee',
        label: '费用',
        children: [{
          value: 'susong',
          label: '诉讼费'
        }, {
          value: 'zhixing',
          label: '执行费'
        }, {
          value: 'baoquan',
          label: '保全费'
        }, {
          value: 'other_fee',
          label: '其它费用'
        }, {
          value: 'duijia',
          label: '债权支付对价'
        }]
      }]
    }
  },
  created() {
    this.pagesize=10;
    this.currentPage=1;
    this.getCreditList();
  },
  methods:{
    reset(){
      this.form1 = this.$options.data().form1
    },
    screen(){
      alert("submit")
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
                  // h("el-popover", {
                  //       props:{placement : "bottom", trigger:"click"},
                  //       style:'position:absolute;left:17px'
                  //     },
                  //     [
                  //       h(myfilter, {
                  //         props:{label:column.label, property:column.property},
                  //         on: {click_filter: this.clickFilter}
                  //       }),
                  //       h("i", {
                  //         slot:"reference",
                  //         class:'el-icon-arrow-down'
                  //       })
                  //     ])
                ]),
          ]);
    },
    getCreditList(){
      var _this = this;
      api({
        url: "CreditInfo/getCreditList",
        method: "get",
        params:{
          current:_this.currentPage,
          size:_this.pagesize
        }
      }).then(data => {
        console.log(data);
        this.tableData = data.data.datas.records;
        this.totalsize = data.data.datas.total;
      }).catch(err => {
        console.log(err);
      })
    },
    deleteCreditList(){
      if(this.multipleSelection_iou.length===0){
        alert('请先选择要删除的借据');
      }
      else{
        var _this = this;
        api({
          url: "/CreditInfo/deleteFundamentalCredit",
          method: "post",
          data:this.multipleSelection_iou
        }).then(data => {
          console.log(data);
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }
    },
    creditDetail(row){
      this.$router.push({path:'/creditInfo/creditFinfo/xqCreditFinfo',query:{iou:row.id}})
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
      console.log(val);
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pagesize=val;
      this.getCreditList();
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getCreditList();
    },
    handleCascaderChange(){
      console.log(this.new_value)
    },
    //子组件myfilter点击筛选传过来的债权信息数据
    clickFilter(item){
      // this.filterItems[item['property']]=item['item']
      // api({
      //   url: "/combinedQuery",
      //   method: "post",
      //   data: this.filterItems
      // }).then(data => {
      //   this.tableData=data.data;
      //   console.log(data.data);
      // }).catch(err => {
      //   console.log(err);
      // })
    },
    sortByAscend(){
      console.log('sortByAscend')
      // api({
      //   url: "/sortByAscend",
      //   method: "post",
      //   data: {
      //     "name":_this.property,
      //     "value":_this.$refs.input.value
      //   }
      // }).then(data => {
      //
      // }).catch(err => {
      //   console.log(err);
      // })
    },
    sortByDescend(){
      console.log('sortByDescend')
    },

  },
  computed:{
    multipleSelection_iou:function (){
      let ious=[];
      let i;
      for(i=0;i<this.multipleSelection.length;i++){
        ious.push(this.multipleSelection[i].id);
      }
      console.log('ious')
      console.log(ious)
      return ious;
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
.el_row1{
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
  margin-top: 20px;
}
.cardHeader{
  height: 15px;
  font-size: 15px;
  font-weight: bold;
}
.el-table{
  text-align: center;
}
</style>
