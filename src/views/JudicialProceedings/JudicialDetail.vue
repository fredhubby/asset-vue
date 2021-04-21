<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/timeRemider"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">司法诉讼</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">司法明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content1">
<!--          <el-button type="primary" @click="addJudicial">新增司法记录</el-button>-->
          <el-button>数据导出</el-button>
          <el-button>打印</el-button>
          <el-popover
              placement="down"
              trigger="click">
            <el-form ref="form1" :model="search_form">
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="司法ID:" label-width="70px"><el-input v-model="search_form.judicialStatusId" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="司法状态:" label-width="75px">
                    <el-select v-model="search_form.judicialStatusName" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in judicalState_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="借据ID:" label-width="75px"><el-input v-model="search_form.iouId" clearable></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="状态生成日:" label-width="90px">
                    <el-date-picker v-model="search_form.statusGenerationDate" type="date" placeholder="选择日期" style="width: 100%" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="案号:" label-width="75px"><el-input v-model="search_form.caseId" clearable></el-input></el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="法院:" label-width="75px">
                    <el-select v-model="search_form.court" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in court_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="承办法官:" label-width="75px">
                    <el-input v-model="search_form.chargeJudge" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="受托律所:" label-width="75px">
                    <el-select v-model="search_form.entrustedLawFirm" clearable filterable placeholder="请选择" style="width: 100%">
                      <el-option v-for="item in firm_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="律师:" label-width="75px">
                    <el-input v-model="search_form.layer" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30" type="flex" class="row_bg">
                <el-col :span="7">
                  <el-form-item label="备注:" label-width="75px">
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
        <span>司法记录</span>
      </div>
      <div  class="text item">
        <el-table :data="tableData" border :height="tableHeight" style="width: 100%" class="el-table"
                  ref="filterTable" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="judicialStatusId" sortable label="司法状态ID" width="200"></el-table-column>
<!--          <el-table-column prop="priJudicialStatusId" sortable label="之前司法状态ID" width="200"></el-table-column>-->
          <el-table-column prop="judicalName" sortable label="司法状态" width="250"></el-table-column>
          <el-table-column prop="iouId" label="借据号" width="150"></el-table-column>
          <el-table-column prop="statusGenerationDate" sortable label="状态生成日" width="180"></el-table-column>
          <el-table-column prop="caseId" sortable label="案号" width="180"></el-table-column>
          <el-table-column prop="court" sortable label="法院" width="180"></el-table-column>
          <el-table-column prop="chargeJudge" label="承办法官" width="180"></el-table-column>
          <el-table-column prop="entrustedLawFirm" label="受托律所" width="150"></el-table-column>
          <el-table-column prop="layer" label="律师" width="150"></el-table-column>
          <el-table-column prop="remarks" label="备注" width="150"></el-table-column>
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
  name: "JudicialDetail",
  data(){
    return {
      input1: '',
      currentPage: 1,
      pagesize: 10,
      tableData: [],
      totalsize: 0,
      tableHeight: window.innerHeight - 420,
      multipleSelection: [],
      search_form:{judicialStatusId:'',judicialStatusName:'',iouId:'',statusGenerationDate:'',caseId:'',court:'',chargeJudge:'',entrustedLawFirm:'',layer:'',remarks:''},
      nameIndex: {
        '0': '撤诉',
        '1': '起诉中',
        '2': '一审审理中',
        '3': '一审判决书生效',
        '4': '一审调解中',
        '5': '一审上诉中',
        '6': '二审审理中',
        '7': '二审判决书生效',
        '8': '二审调解中',
        '9': '二审上诉中',
        'a': '再审审理中',
        'b': '再审判决书生效',
        'c': '再审调解中',
        'd': '申请执行中',
        'e': '执行中',
        'f': '和解终结',
        'g': '无财产终结',
        'h': '申请恢复执行'
      },
      filter_flag:false,
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
        {value:'a',label:'再审审理中'},
        {value:'b',label:'再审判决书生效'},
        {value:'c',label:'再审调解中'},
        {value:'d',label:'申请执行中'},
        {value:'e',label:'执行中'},
        {value:'f',label:'和解终结'},
        {value:'g',label:'无财产终结'},
        {value:'h',label:'申请恢复执行'},
      ],
    }
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
  created() {
    this.getJudicalList();
  },
  methods:{
    getJudicalList(){
      api({
        url: "Judicial/getJudicatureList",
        method: "get",
        params:{
          current:this.currentPage,
          size:this.pagesize
        }
      }).then(data => {
        console.log(data)
        this.tableData = data.data.datas.records;
        this.tableData.forEach((value,index) => {
          this.$set(value,'judicalName',this.nameIndex[value.judicialStatusName])
        })
        this.totalsize = data.data.datas.total;
      }).catch(err => {
        console.log(err)
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
          url: "Judicial/searchJudicatureList",
          method: "post",
          data:send_data
        }).then(data => {
          console.log(data)
          this.tableData = data.data.datas.records;
          this.tableData.forEach((value,index) => {
            this.$set(value,'judicalName',this.nameIndex[value.judicialStatusName])
          })
          this.totalsize = data.data.datas.total;
          this.filter_flag = true;
        }).catch(err => {
          console.log(err)
        })
      }
      else{
        this.getJudicalList();
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if(this.filter_flag){
        let send_data = JSON.parse(JSON.stringify(this.search_form));
        send_data.size = this.pagesize;
        send_data.current = this.currentPage;
        api({
          url: "Judicial/searchJudicatureList",
          method: "post",
          data:send_data
        }).then(data => {
          console.log(data)
          this.tableData = data.data.datas.records;
          this.tableData.forEach((value,index) => {
            this.$set(value,'judicalName',this.nameIndex[value.judicialStatusName])
          })
          this.totalsize = data.data.datas.total;
          this.filter_flag = true;
        }).catch(err => {
          console.log(err)
        })
      }
      else{
        this.getJudicalList();
      }
    },
    addJudicial(){
      this.$router.replace('/JudicialProceedings/JudicialInfo')
    },
    getDetail(row){
      this.$router.push({path:'/creditInfo/creditFinfo/xqJudicature',query:{iou:row.iouId}})
    },
    deleteList(){
      if(this.multipleSelection.length===0){
        alert("请选择要删除的记录")
      }
      else{
        // api({
        //   url: "/Judicial/deleteJudicature",
        //   method: "get",
        //   params: this.multipleSelection.map(item => {return item.judicialStatusId}),
        // }).then(data => {
        //   location.reload();
        // }).catch(err => {
        //   console.log(err);
        // })
      }
    },
    filterReset(){
      this.search_form= {judicialStatusId:'',judicialStatusName:'',iouId:'',statusGenerationDate:'',caseId:'',court:'',chargeJudge:'',entrustedLawFirm:'',layer:'',remarks:''};
      if(this.filter_flag){
        this.pagesize =10;
        this.currentPage=1;
        this.getJudicalList();
        this.filter_flag = false;
      }
    },
    filterSearch(){
      let send_data = JSON.parse(JSON.stringify(this.search_form));
      this.pagesize =10;
      this.currentPage=1;
      send_data.size = this.pagesize;
      send_data.current = this.currentPage;
      // console.log(send_data)
      api({
        url: "Judicial/searchJudicatureList",
        method: "post",
        data:send_data
      }).then(data => {
        console.log(data)
        this.tableData = data.data.datas.records;
        this.tableData.forEach((value,index) => {
          this.$set(value,'judicalName',this.nameIndex[value.judicialStatusName])
        })
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