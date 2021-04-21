<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/timeRemider"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">资产包</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20" class="el_row1">
      <el-col :span="16">
        <div class="grid-content1">
          <el-button type="primary" @click="addAsset">新增资产包</el-button>
          <el-button type="success">数据导出</el-button>
<!--          <el-button>打印</el-button>-->
          <el-popconfirm
              title="确定删除资产包数据？"
              @confirm="deleteAssetPack">
            <el-button slot="reference" type="danger">删除</el-button>
          </el-popconfirm>

<!--          <el-popover-->
<!--              width="600"-->
<!--              placement="down"-->
<!--              trigger="click">-->
<!--            <el-form ref="form1" :model="form1">-->
<!--              <el-form-item>-->
<!--                <el-row :gutter="20" type="flex" class="row-bg">-->
<!--                  <el-col :span="20" :offset="1"><el-checkbox v-model="form1.assetPackageId_show">资产包ID</el-checkbox></el-col>-->
<!--                  <el-col :span="20" ><el-checkbox v-model="form1.creditNum_show">债权数量</el-checkbox></el-col>-->
<!--                  <el-col :span="20" ><el-checkbox v-model="form1.creditor_show">债权人</el-checkbox></el-col>-->
<!--                  <el-col :span="20" ><el-checkbox v-model="form1.originalCreditor_show">原债权人</el-checkbox></el-col>-->
<!--                </el-row>-->
<!--                <el-row :gutter="20" type="flex" class="row-bg">-->
<!--                  <el-col :span="20" :offset="1"><el-checkbox v-model="form1.totalConsiderationPaid_show">支付对价总费用</el-checkbox></el-col>-->
<!--                  <el-col :span="20" ><el-checkbox v-model="form1.considerationPayer_show">对价支付人</el-checkbox></el-col>-->
<!--                  <el-col :span="20" ><el-checkbox v-model="form1.recycleTotal_show">回收款合计</el-checkbox></el-col>-->
<!--                  <el-col :span="20" ><el-checkbox v-model="form1.costDebtTotal_show">债权总成本</el-checkbox></el-col>-->
<!--                </el-row>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--            <el-button slot="reference" type="warning">隐藏列<i class="el-icon-caret-bottom"></i></el-button>-->
<!--          </el-popover>-->
          <el-popover
              placement="down"
              trigger="click">
            <el-form ref="search_form" :model="search_form">
              <el-row :gutter="10" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="资产包ID:" label-width="75px"><el-input v-model="search_form.id" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="债权人:" label-width="75px">
                    <el-select v-model="search_form.creditor" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="原债权人:" label-width="75px">
                    <el-select v-model="search_form.originalCreditor" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-button @click="filterReset">清空</el-button>
              <el-button type="primary" @click="filterSearch">筛选</el-button>
            </el-form>
            <el-button slot="reference" type="success">筛选<i class="el-icon-caret-bottom"></i></el-button>
          </el-popover>
<!--          <el-popover-->
<!--              placement="down"-->
<!--              trigger="click">-->
<!--            <el-form ref="form1" :model="form1">-->
<!--              <el-row :gutter="20" type="flex" class="row-bg">-->
<!--                <el-form-item>-->
<!--                  <el-col :span="2"><el-checkbox v-model="form1.creditNum_checked">债权数量</el-checkbox></el-col>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                  <el-col :span="30"><el-input v-model="form1.creditNum" clearable-->
<!--                                               :disabled="Boolean(!form1.creditNum_checked)"></el-input></el-col>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                  <el-col :span="2"><el-checkbox v-model="form1.assetPackageId_checked">资产包ID</el-checkbox></el-col>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                  <el-col :span="30"><el-input v-model="form1.assetPackageId" clearable-->
<!--                                               :disabled="Boolean(!form1.assetPackageId_checked)"></el-input></el-col>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                  <el-col :span="2"><el-checkbox v-model="form1.creditor_checked">债权人</el-checkbox></el-col>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                  <el-col :span="30">-->
<!--                    <el-select v-model="form1.creditor" clearable :disabled="Boolean(!form1.creditor_checked)">-->
<!--                      <el-option-->
<!--                          v-for="item in options1"-->
<!--                          :key="item.value"-->
<!--                          :label="item.label"-->
<!--                          :value="item.value">-->
<!--                      </el-option>-->
<!--                    </el-select>-->
<!--                  </el-col>-->
<!--                </el-form-item>-->
<!--              </el-row>-->
<!--              <el-row :gutter="20" type="flex" class="row-bg">-->
<!--                <el-form-item>-->
<!--                  <el-col :span="2"><el-checkbox v-model="form1.originalCreditor_checked">原债权人</el-checkbox></el-col>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                  <el-col :span="30">-->
<!--                    <el-select v-model="form1.originalCreditor" clearable :disabled="Boolean(!form1.originalCreditor_checked)">-->
<!--                      <el-option-->
<!--                          v-for="item in options2"-->
<!--                          :key="item.value"-->
<!--                          :label="item.label"-->
<!--                          :value="item.value">-->
<!--                      </el-option>-->
<!--                    </el-select>-->
<!--                  </el-col>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                  <el-col :span="2"><el-checkbox v-model="form1.recycleTotal_checked">回收款合计</el-checkbox></el-col>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                  <el-col :span="30">-->
<!--                    <el-input v-model="form1.recycleTotal" clearable-->
<!--                              :disabled="Boolean(!form1.recycleTotal_checked)"></el-input>-->
<!--                  </el-col>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                  <el-col :span="2"><el-checkbox v-model="form1.considerationPayer_checked">对价支付人</el-checkbox></el-col>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                  <el-col :span="30"><el-input v-model="form1.considerationPayer" clearable-->
<!--                                               :disabled="Boolean(!form1.considerationPayer_checked)"></el-input></el-col>-->
<!--                </el-form-item>-->
<!--              </el-row>-->
<!--              <el-row :gutter="20" type="flex" class="row-bg">-->
<!--                <el-form-item>-->
<!--                  <el-col :span="2"><el-checkbox v-model="form1.totalConsiderationPaid_checked">支付对价总费用</el-checkbox></el-col>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                  <el-col :span="30"><el-input v-model="form1.totalConsiderationPaid" clearable-->
<!--                                               :disabled="Boolean(!form1.totalConsiderationPaid_checked)"></el-input></el-col>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                  <el-col :span="2"><el-checkbox v-model="form1.costDebtTotal_checked">债权总成本</el-checkbox></el-col>-->
<!--                </el-form-item>-->
<!--                <el-form-item>-->
<!--                  <el-col :span="30"><el-input v-model="form1.costDebtTotal" clearable-->
<!--                                               :disabled="Boolean(!form1.costDebtTotal_checked)"></el-input></el-col>-->
<!--                </el-form-item>-->
<!--              </el-row>-->

<!--              <el-button @click="reset('form1')">清空</el-button>-->
<!--              <el-button type="primary" @click="submit">筛选</el-button>-->
<!--            </el-form>-->
<!--            <el-button slot="reference" type="success">筛选<i class="el-icon-caret-bottom"></i></el-button>-->
<!--          </el-popover>-->
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

    <el-card class="box-card">
      <div slot="header" class="cardHeader">
        <span>资产包记录</span>
      </div>
      <div  class="text item">
        <el-table :data="tableData" border :height="tableHeight" style="width: 100%" class="el-table"
                  ref="filterTable" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="id" sortable label="资产包ID" width="280" v-if="!form1.assetPackageId_show"></el-table-column>
          <el-table-column prop="assetNum" sortable label="债权数量" width="120" v-if="!form1.creditNum_show"></el-table-column>
          <el-table-column prop="creditor" label="债权人" width="200" v-if="!form1.creditor_show"></el-table-column>
          <el-table-column prop="originalCreditor" label="原债权人" width="250" v-if="!form1.originalCreditor_show"></el-table-column>
<!--          <el-table-column prop="recycleTotal" sortable label="回收款合计" width="150" v-if="!form1.recycleTotal_show"></el-table-column>-->
          <el-table-column prop="debtPaymentTotal" sortable label="支付对价总费用" width="150" v-if="!form1.totalConsiderationPaid_show"></el-table-column>
<!--          <el-table-column prop="considerationPayer" label="对价支付人" width="120" v-if="!form1.considerationPayer_show"></el-table-column>-->
          <el-table-column prop="costDebtTotal" sortable label="债权总成本" width="120" v-if="!form1.costDebtTotal_show"></el-table-column>
          <el-table-column prop="remarks" sortable label="备注" v-if="!form1.costDebtTotal_show"></el-table-column>
          <el-table-column prop="operate" fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="assetPackDetail(scope.row)" type="text" size="small">查看</el-button>
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
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "assetPackMenu",
  data(){
    return{
      input1:'',
      form1: {
        assetPackageId: '',
        creditNum: '',
        creditor: '',
        originalCreditor: '',
        totalConsiderationPaid:'',
        considerationPayer: '',
        recycleTotal: '',
        costDebtTotal: '',


        assetPackageId_show:false,
        creditNum_show:false,
        creditor_show:false,
        originalCreditor_show:false,
        totalConsiderationPaid_show:false,
        considerationPayer_show:false,
        recycleTotal_show:false,
        costDebtTotal_show:false,
      },
      search_form:{id: '', creditor: '', originalCreditor: '', considerationPayer: '',},
      filter_flag:false,
      currentPage: 1,
      pagesize:10,
      totalsize:10,
      tableData: [],
      multipleSelection:[],
      pickerOptions:[],
      options1:[
        {value: '天惠投资', label: '天惠投资'},
        {value: '天晟投资', label: '天晟投资'},
        {value: '天工惠农小贷', label: '天工惠农小贷'},
        {value: '银润小贷', label: '银润小贷'},
        {value: '阳光企业', label: '阳光企业'}],
      options2: [
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
      tableHeight:window.innerHeight - 420,
    }
  },
  created() {
    this.pagesize=10;
    this.currentPage=1;
    this.getAssetPackageList();
  },
  mounted () {
    window.onresize = () => {
      return (() => {
        this.tableHeight = window.innerHeight - 420
      })()
    }
  },
  activated () {
    this.tableHeight = window.innerHeight - 420
  },
  methods:{
    reset(){
      this.form1 = this.$options.data().form1
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
    getAssetPackageList(){
      var _this = this;
      api({
        url: "assetPackage/getAssetPackageList",
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
    deleteAssetPack(){
      if(this.multipleSelection_asset.length===0){
        alert('请先选择要删除的资产包');
      }
      else{
        var _this = this;
        api({
          url: "/assetPackage/deleteAssetPackage",
          method: "post",
          data:this.multipleSelection_asset
        }).then(data => {
          console.log(data);
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }
    },
    assetPackDetail(row){
      this.$router.push({path:'/creditInfo/assetPackage/assetPackInfo',query:{assetPackageId:row.id,assetNum:row.assetNum}})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pagesize=val;
      if(this.filter_flag){
        let send_data = JSON.parse(JSON.stringify(this.search_form));
        send_data.size = this.pagesize;
        send_data.current = this.currentPage;
        api({
          url: "assetPackage/searchAssetPackageList",
          method: "post",
          data:send_data
        }).then(data => {
          console.log(data)
          this.tableData = data.data.datas.records;
          this.totalsize = data.data.datas.total;
          this.filter_flag = true;
        }).catch(err => {
          console.log(err)
        })
      }
      else{
        this.getAssetPackageList();
      }
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      if(this.filter_flag){
        let send_data = JSON.parse(JSON.stringify(this.search_form));
        send_data.size = this.pagesize;
        send_data.current = this.currentPage;
        api({
          url: "assetPackage/searchAssetPackageList",
          method: "post",
          data:send_data
        }).then(data => {
          console.log(data)
          this.tableData = data.data.datas.records;
          this.totalsize = data.data.datas.total;
          this.filter_flag = true;
        }).catch(err => {
          console.log(err)
        })
      }
      else{
        this.getAssetPackageList();
      }
    },
    addAsset(){
      let newPage = this.$router.resolve({
        path:'/creditInfo/assetPackage/assetPackAdd'
      })
      window.open(newPage.href,'_balnk')
      // this.$router.replace('/creditInfo/assetPackage/assetPackAdd')
    },
    filterReset(){
      this.search_form={assetPackageId: '', creditor: '', originalCreditor: '', considerationPayer: '',};
      if(this.filter_flag){
        this.pagesize =10;
        this.currentPage=1;
        this.getAssetPackageList();
        this.filter_flag = false;
      }
    },
    filterSearch(){
      let send_data = JSON.parse(JSON.stringify(this.search_form));
      this.pagesize =10;
      this.currentPage=1;
      send_data.size = this.pagesize;
      send_data.current = this.currentPage;
      api({
        url: "assetPackage/searchAssetPackageList",
        method: "post",
        data:send_data
      }).then(data => {
        console.log(send_data)
        console.log(data)
        this.tableData = data.data.datas.records;
        this.totalsize = data.data.datas.total;
        this.filter_flag = true;
      }).catch(err => {
        console.log(err)
      })
    },

  },
  computed:{
    multipleSelection_asset:function (){
      let assets=[];
      let i;
      for(i=0;i<this.multipleSelection.length;i++){
        assets.push(this.multipleSelection[i].id);
      }
      console.log('assets')
      console.log(assets)
      return assets;
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
