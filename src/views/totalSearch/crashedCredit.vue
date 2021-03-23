<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">查询统计</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">破产债权</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20" class="el_row1">
      <el-col :span="16">
        <div class="grid-content1">
          <el-button type="primary" @click="addCrashedCredit">新增破产债权</el-button>
          <el-button @click="" type="success">数据导出</el-button>
<!--          <el-button>打印</el-button>-->
          <el-popconfirm
              title="确定删除此条数据？"
              @confirm="deleteCrashedCreditList">
            <el-button slot="reference" type="danger">删除</el-button>
          </el-popconfirm>

          <el-popover
              width="600"
              placement="down"
              trigger="click">
            <el-form ref="form1" :model="form1">
              <el-form-item>
                <el-row :gutter="20" type="flex" class="row-bg">
                  <el-col :span="20" :offset="1"><el-checkbox v-model="form1.id_show">破产企业id</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.bustEnterprise_show">破产企业</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.bankruptcyAcceptanceDate_show">破产受理日</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.bankruptcyAdministrator_show">破产管理人</el-checkbox></el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg">
                  <el-col :span="20" :offset="1"><el-checkbox v-model="form1.claimsDeclarant_show">债权申报人</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.claimsProperties_show">债权性质</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.declaredAmount_show">申报金额</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.deductionAmount_show">核减金额</el-checkbox></el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg">
                  <el-col :span="20" :offset="1"><el-checkbox v-model="form1.recognizedAmount_show">认定金额</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.allocationAmount_show">分配金额</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.contacts_show">联系人</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.contactNumber_show">联系人电话</el-checkbox></el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg">
                  <el-col :span="20" :offset="1"><el-checkbox v-model="form1.remarks_show">备注</el-checkbox></el-col>
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
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.bustEnterprise_checked">破产企业</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.bustEnterprise" clearable :disabled="Boolean(!form1.bustEnterprise_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.bankruptcyAcceptanceDate_checked">破产受理日</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30">
                    <el-date-picker
                        v-model="form1.bankruptcyAcceptanceDate"
                        type="daterange"
                        :disabled="Boolean(!form1.bankruptcyAcceptanceDate_checked)"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                  </el-col>
                </el-form-item>
              </el-row>
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.bankruptcyAdministrator_checked">破产管理人</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.bankruptcyAdministrator" clearable :disabled="Boolean(!form1.bankruptcyAdministrator_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.claimsDeclarant_checked">债权申报人</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.claimsDeclarant" clearable :disabled="Boolean(!form1.claimsDeclarant_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.claimsProperties_checked">债权性质</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.claimsProperties" clearable :disabled="Boolean(!form1.claimsProperties_checked)"></el-input></el-col>
                </el-form-item>
              </el-row>
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.declaredAmount_checked">申报金额</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.declaredAmount" clearable :disabled="Boolean(!form1.declaredAmount_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.deductionAmount_checked">核减金额</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.deductionAmount" clearable :disabled="Boolean(!form1.deductionAmount_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.recognizedAmount_checked">认定金额</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.recognizedAmount" clearable :disabled="Boolean(!form1.recognizedAmount_checked)"></el-input></el-col>
                </el-form-item>
              </el-row>
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.allocationAmount_checked">分配金额</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.allocationAmount" clearable :disabled="Boolean(!form1.allocationAmount_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.contacts_checked">联系人</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.contacts" clearable :disabled="Boolean(!form1.contacts_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.contactNumber_checked">联系人电话</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.contactNumber" clearable :disabled="Boolean(!form1.contactNumber_checked)"></el-input></el-col>
                </el-form-item>
              </el-row>

              <el-button @click="reset('form1')">清空</el-button>
              <el-button type="primary" @click="submit">筛选</el-button>
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
        <span>破产债权记录</span>
      </div>
      <div  class="text item">
        <el-table :data="tableData" border height="500" style="width: 100%" class="el-table"
                  ref="filterTable" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="id" label="破产企业id" width="280" v-if="!form1.id_show"></el-table-column>
          <el-table-column prop="bustEnterprise" label="破产企业" width="280" v-if="!form1.bustEnterprise_show"></el-table-column>
          <el-table-column prop="bankruptcyAcceptanceDate" sortable label="破产受理日" width="200" v-if="!form1.bankruptcyAcceptanceDate_show"></el-table-column>
          <el-table-column prop="bankruptcyAdministrator" label="破产管理人" width="200" v-if="!form1.bankruptcyAdministrator_show"></el-table-column>
          <el-table-column prop="claimsDeclarant" label="债权申报人" width="200" v-if="!form1.claimsDeclarant_show"></el-table-column>
          <el-table-column prop="claimsProperties" label="债权性质" width="150" v-if="!form1.claimsProperties_show"></el-table-column>
          <el-table-column prop="declaredAmount" sortable label="申报金额" width="150" v-if="!form1.declaredAmount_show"></el-table-column>
          <el-table-column prop="deductionAmount" sortable label="核减金额" width="150" v-if="!form1.deductionAmount_show"></el-table-column>
          <el-table-column prop="recognizedAmount" sortable label="认定金额" width="150" v-if="!form1.recognizedAmount_show"></el-table-column>
          <el-table-column prop="allocationAmount" sortable label="分配金额" width="150" v-if="!form1.allocationAmount_show"></el-table-column>
          <el-table-column prop="contacts" sortable label="联系人" width="150" v-if="!form1.contacts_show"></el-table-column>
          <el-table-column prop="contactNumber" sortable label="联系电话" width="150" v-if="!form1.contactNumber_show"></el-table-column>
          <el-table-column prop="remarks" sortable label="备注" width="150" v-if="!form1.remarks_show"></el-table-column>
          <el-table-column prop="operate" fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="crashedCreditDetail(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination style="margin-top: 10px"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10, 20, 30, 40, 50]"
                       :page-size="10"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="400">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "crashedCredit",
  data(){
    return{
      input1:'',
      form1:{
        id_checked:false,
        bustEnterprise_checked:false,
        bankruptcyAcceptanceDate_checked:false,
        bankruptcyAdministrator_checked:false,
        claimsDeclarant_checked:false,
        claimsProperties_checked:false,
        declaredAmount_checked:false,
        deductionAmount_checked:false,
        recognizedAmount_checked:false,
        allocationAmount_checked:false,
        contacts_checked:false,
        contactNumber_checked:false,
        remarks_checked:false,
        id:'',
        claimsDeclarant:'',
        bustEnterprise:'',
        bankruptcyAcceptanceDate:'',
        bankruptcyAdministrator:'',
        claimsProperties:'',
        declaredAmount:'',
        deductionAmount:'',
        recognizedAmount:'',
        allocationAmount:'',
        contacts:'',
        contactNumber:'',
        remarks:'',
        id_show:false,
        bustEnterprise_show:false,
        bankruptcyAcceptanceDate_show:false,
        bankruptcyAdministrator_show:false,
        claimsDeclarant_show:false,
        claimsProperties_show:false,
        declaredAmount_show:false,
        deductionAmount_show:false,
        recognizedAmount_show:false,
        allocationAmount_show:false,
        contacts_show:false,
        contactNumber_show:false,
        remarks_show:false
      },
      pickerOptions:[],
      tableData: [],
      multipleSelection:[],
      currentPage: 1,
      pagesize:10,
      totalsize:10,
    }
  },
  created() {
    this.pagesize=10;
    this.currentPage=1;
    this.getCrashedCreditList();
  },
  methods:{
    reset(){
      this.form1 = this.$options.data().form1
    },
    submit(){
      alert("submit")
    },
    addCrashedCredit(){
      this.$router.replace('/totalSearch/addCrashedCreditInfo')
    },
    getCrashedCreditList(){
      var _this = this;
      api({
        url: "/CrashedCredit/getCrashedCreditList",
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
    deleteCrashedCreditList(){
      if(this.multipleSelection_crash.length===0){
        alert('请先选择要删除的数据');
      }
      else{
        var _this = this;
        api({
          url: "/CrashedCredit/deleteCrashedCredit",
          method: "post",
          data:this.multipleSelection_crash
        }).then(data => {
          console.log(data);
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }
    },
    crashedCreditDetail(row){
      this.$router.push({path:'/totalSearch/crashedCreditDetail',query:{id:row.id}})
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
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    handleSizeChange(val) {
      this.pagesize=val;
      this.getCrashedCreditList();
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getCrashedCreditList();
    }
  },
  computed:{
    multipleSelection_crash:function (){
      let crashes=[];
      let i;
      for(i=0;i<this.multipleSelection.length;i++){
        crashes.push(this.multipleSelection[i].id);
      }
      console.log('crashes')
      console.log(crashes)
      return crashes;
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
