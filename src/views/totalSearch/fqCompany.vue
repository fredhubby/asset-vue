<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">查询统计</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">分期还款企业名单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20" class="el_row1">
      <el-col :span="16">
        <div class="grid-content1">
          <el-button type="primary" @click="addFqCompany">新增分期还款企业</el-button>
          <el-button type="success">数据导出</el-button>
<!--          <el-button>打印</el-button>-->
          <el-popconfirm
              title="确定删除此条数据？"
              @confirm="">
            <el-button slot="reference" type="danger">删除</el-button>
          </el-popconfirm>

          <el-popover
              width="600"
              placement="down"
              trigger="click">
            <el-form ref="form1" :model="form1">
              <el-form-item>
                <el-row :gutter="20" type="flex" class="row-bg">
                  <el-col :span="20" offset="1"><el-checkbox v-model="form1.obligor_show">债务人</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.repayPrincipal_show">应还款本金</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.repayDate_show">还款期限</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.keyPerson_show">关键人</el-checkbox></el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg">
                  <el-col :span="20" offset="1"><el-checkbox v-model="form1.creditor_show">债权人</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.repayType_show">还款状态</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.remarks_show">备注</el-checkbox></el-col>
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
                  <el-col :span="2"><el-checkbox v-model="form1.zwr_checked">债务人</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.zwr" clearable :disabled="Boolean(!form1.zwr_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.yhkbj_checked">应还款本金</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.yhkbj" clearable :disabled="Boolean(!form1.yhkbj_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.hkqx_checked">还款期限</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.hkqx" clearable :disabled="Boolean(!form1.hkqx_checked)"></el-input></el-col>
                </el-form-item>
              </el-row>
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.zqr_checked">债权人</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30">
                    <el-select v-model="form1.zqr" clearable :disabled="Boolean(!form1.zqr_checked)">
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
                  <el-col :span="2"><el-checkbox v-model="form1.gjr_checked">关键人</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.gjr" clearable :disabled="Boolean(!form1.gjr_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.hkzt_checked">还款状态</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.hkzt" clearable :disabled="Boolean(!form1.hkzt_checked)"></el-input></el-col>
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
        <span>分期还款企业名单</span>
      </div>
      <div  class="text item">
        <el-table :data="tableData" border height="500" style="width: 100%" class="el-table"
                  ref="filterTable" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="obligor" label="债务人" width="200" v-if="!form1.obligor_show"></el-table-column>
          <el-table-column prop="repayPrincipal" sortable label="应还款本金" width="250" v-if="!form1.repayPrincipal_show"></el-table-column>
          <el-table-column prop="repayDate" sortable label="还款期限" width="250" v-if="!form1.repayDate_show"></el-table-column>
          <el-table-column prop="keyPerson" label="关键人" width="200" v-if="!form1.keyPerson_show"></el-table-column>
          <el-table-column prop="creditor" label="债权人" width="200" v-if="!form1.creditor_show"></el-table-column>
          <el-table-column prop="repayType" label="还款状态" width="200" v-if="!form1.repayType_show"></el-table-column>
          <el-table-column prop="remarks" label="备注" width="300" v-if="!form1.remarks_show"></el-table-column>
          <el-table-column prop="operate" fixed="right" label="操作" width="100">
            详情
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
export default {
  name: "fqCompany",
  data(){
    return{
      input1:'',
      currentPage: 1,
      form1:{
        zwr_checked:false,
        zwr:'',
        yhkbj_checked:false,
        yhkbj:'',
        hkqx_checked:false,
        hkqx:'',
        zqr_checked:false,
        zqr:'',
        gjr_checked:false,
        gjr:'',
        hkzt_checked:false,
        hkzt:'',
        obligor_show:false,
        repayPrincipal_show:false,
        repayDate_show:false,
        keyPerson_show:false,
        creditor_show:false,
        repayType_show:false,
        remarks_show:false
      },
      options1:[{
        value: '天惠投资',
        label: '天惠投资'
      }, {
        value: '天晟投资',
        label: '天晟投资'
      }, {
        value: '天工惠农小贷',
        label: '天工惠农小贷'
      }, {
        value: '银润小贷',
        label: '银润小贷'
      }, {
        value: '阳光企业',
        label: '阳光企业'
      }],
      tableData: [{
        bz:'',
        hkzt:'',
        zqr:'',
        gjr:'',
        hkqx:'',
        yhkbj:'',
        zwr:''
      }]
    }
  },
  methods:{
    reset(){
      this.form1 = this.$options.data().form1
    },
    submit(){
      alert("submit")
    },
    addFqCompany(){
      this.$router.replace('/totalSearch/addfqCompanyInfo')
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
    // formatter(row, column) {
    //   return row.address;
    // },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
