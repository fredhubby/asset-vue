<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/timeRemider"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">查询统计</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">分期还款企业名单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content1">
          <el-button type="primary" @click="addFqCompany">新增分期还款企业</el-button>
          <el-button>数据导出</el-button>
<!--          <el-button>打印</el-button>-->
          <el-popconfirm
              title="确定删除记录？"
              @confirm="deleteList">
            <el-button slot="reference">删除</el-button>
          </el-popconfirm>
          <el-popover
              placement="down"
              trigger="click">
            <el-form ref="form1" :model="search_form">
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="8">
                  <el-form-item label="分期还款企业名单ID:" label-width="150px"><el-input v-model="search_form.id" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="债权人:" label-width="75px">
                    <el-select v-model="search_form.creditor" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="债务人:" label-width="75px"><el-input v-model="search_form.obligor" clearable></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="8">
                  <el-form-item label="实际控制人或关键人:" label-width="150px"><el-input v-model="search_form.actualController" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="还款期限:" label-width="75px">
                    <el-input v-model="search_form.repaymentTerm" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="还款是否结清:" label-width="100px">
                    <el-select v-model="search_form.repaymentStatus" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in isEnd_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="8">
                  <el-form-item label="备注:" label-width="50px">
                    <el-input v-model="search_form.remarks" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-button @click="filterReset">清空</el-button>
              <el-button type="primary" @click="filterSearch">筛选</el-button>
            </el-form>
            <el-button slot="reference" type="success">筛选<i class="el-icon-caret-bottom"></i></el-button>
          </el-popover>
<!--          <el-button>隐藏列</el-button>-->
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
        <span>分期还款企业名单</span>
      </div>
      <div  class="text item">
        <el-table :data="tableData" border :height="tableHeight" style="width: 100%" class="el-table"
                  ref="filterTable" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="id" label="分期还款企业名单ID" width="150"></el-table-column>
          <el-table-column prop="obligor" sortable label="债务人" width="180"></el-table-column>
          <el-table-column prop="creditor" sortable label="债权人" width="150"></el-table-column>
          <el-table-column prop="payablePrincipal" label="应还本金" width="130"></el-table-column>
          <el-table-column prop="repaymentTerm" label="还款期限" width="120"></el-table-column>
          <el-table-column prop="actualController" label="企业实际控制人或关键人" width="200"></el-table-column>
          <el-table-column prop="statusName" label="还款是否结清" width="120"></el-table-column>
          <el-table-column prop="remarks" label="备注"></el-table-column>
          <el-table-column prop="operate" fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="getDetail(scope.row)" type="text" size="small">查看</el-button>
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
  name: "fqCompany",
  data(){
    return{
      input1:'',
      currentPage: 1,
      pagesize:10,
      totalsize:0,
      tableData: [],
      multipleSelection:[],
      search_form:{id:'',obligor:'',creditor:'',repaymentTerm:'',actualController:'',repaymentStatus:'',remarks:''},
      filter_flag:false,
      options: [
        {value: '天惠投资', label: '天惠投资'},
        {value: '天晟投资', label: '天晟投资'},
        {value: '天工惠农小贷', label: '天工惠农小贷'},
        {value: '银润小贷', label: '银润小贷'},
        {value: '阳光企业', label: '阳光企业'}],
      isEnd_options:[
        {value:'0',label:'否'},
        {value:'1',label:'是'}
      ],
      statuIndex:{'0':'否','1':'是'},
      tableHeight:window.innerHeight - 420,
    }
  },
  created() {
    this.getInstallmentList();
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
    getInstallmentList(){
      api({
        url: "/Installments/getInstallmentList",
        method: "get",
        params:{
          size:this.pagesize,
          current:this.currentPage
        }
      }).then(data => {
        this.setTableData(data.data.datas.records);
        this.totalsize = data.data.datas.total;
        console.log(data)
      }).catch(err => {
        console.log(err);
      })
    },
    setTableData(data){
      this.tableData = JSON.parse(JSON.stringify(data));
      this.tableData.forEach((value,index) => {
        this.$set(value,'statusName',this.statuIndex[value.repaymentStatus])
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
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
      if(this.filter_flag){
        let send_data = JSON.parse(JSON.stringify(this.search_form));
        send_data.size = this.pagesize;
        send_data.current = this.currentPage;
        api({
          url: "Installments/searchInstallmentList",
          method: "post",
          data:send_data
        }).then(data => {
          console.log(data)
          this.setTableData(data.data.datas.records)
          this.totalsize = data.data.datas.total;
          this.filter_flag = true;
        }).catch(err => {
          console.log(err)
        })
      }
      else{
        this.getInstallmentList();
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if(this.filter_flag){
        let send_data = JSON.parse(JSON.stringify(this.search_form));
        send_data.size = this.pagesize;
        send_data.current = this.currentPage;
        api({
          url: "Installments/searchInstallmentList",
          method: "post",
          data:send_data
        }).then(data => {
          console.log(data)
          this.setTableData(data.data.datas.records)
          this.totalsize = data.data.datas.total;
          this.filter_flag = true;
        }).catch(err => {
          console.log(err)
        })
      }
      else{
        this.getInstallmentList();
      }
    },
    getDetail(row){
      this.$router.push({path:'/totalSearch/fqCompanyxq',query:{id:row.id.replace(/^\s+|\s+$/g,"")}})
    },
    addFqCompany(){
      let newpage = this.$router.resolve({
        path: '/totalSearch/addfqCompanyInfo',
      })
      window.open(newpage.href, '_blank');
      // this.$router.push('/totalSearch/addfqCompanyInfo')
    },
    deleteList(){
      if(this.multipleSelection.length ===0){
        alert("请选择要删除的记录")
      }
      else{
        api({
          url: "/Installments/deleteInstallmentsEnterprises",
          method: "post",
          data:this.multipleSelection.map(item => {return item.id})
        }).then(data => {
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }
    },
    filterReset(){
      this.search_form= {id:'',obligor:'',creditor:'',repaymentTerm:'',actualController:'',repaymentStatus:'',remarks:''};
      if(this.filter_flag){
        this.pagesize =10;
        this.currentPage=1;
        this.getInstallmentList();
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
        url: "Installments/searchInstallmentList",
        method: "post",
        data:send_data
      }).then(data => {
        console.log(data)
        this.setTableData(data.data.datas.records)
        this.totalsize = data.data.datas.total;
        this.filter_flag = true;
      }).catch(err => {
        console.log(err)
      })
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
.row_bg{
  box-shadow:none;
  margin-top: 5px;
}
</style>