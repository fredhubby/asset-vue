<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权清收</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">清收明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20" class="el_row1">
      <el-col :span="16">
        <div class="grid-content1">
          <el-button type="primary" @click="addRecall">新增还款记录</el-button>
          <el-button>数据导出</el-button>
<!--          <el-button>打印</el-button>-->
          <el-button>删除</el-button>
          <el-button>隐藏列</el-button>
          <el-popover
              placement="down"

              trigger="click">
            <el-form ref="form1" :model="form1">
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.jjh_checked">借据号</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.jjh" clearable :disabled="Boolean(!form1.jjh_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.hkh_checked">还款号</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.hkh" clearable :disabled="Boolean(!form1.hkh_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.hkfy_checked">还款费用</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.hkfy" clearable :disabled="Boolean(!form1.hkfy_checked)"></el-input></el-col>
                </el-form-item>
              </el-row>
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.jkbj_checked">借款本金</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.jkbj" clearable :disabled="Boolean(!form1.jkbj_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.hksj_checked">还款时间</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30">
                    <el-date-picker
                        v-model="form1.hksj"
                        type="daterange"
                        :disabled="Boolean(!form1.hksj_checked)"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                  </el-col>
                </el-form-item>
              </el-row>
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.hkbj_checked">还款本金</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.hkbj" clearable :disabled="Boolean(!form1.hkb_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.zfr_checked">支付人</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.zfr" clearable :disabled="Boolean(!form1.zfr_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.zffs_checked">支付方式</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.zffs" clearable :disabled="Boolean(!form1.zffs_checked)"></el-input></el-col>
                </el-form-item>
              </el-row>

              <el-button @click="reset('form1')">清空</el-button>
              <el-button type="primary" @click="submit">筛选</el-button>
            </el-form>
            <el-button slot="reference">筛选<i class="el-icon-caret-bottom"></i></el-button>
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
        <span>还款记录</span>
      </div>
      <div  class="text item">
        <el-table :data="tableData" border height="500" style="width: 100%" class="el-table"
                  ref="filterTable" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="jjh" sortable label="借据号" width="200"></el-table-column>
          <el-table-column prop="hkh" sortable label="还款号" width="200"></el-table-column>
          <el-table-column prop="hkfy" sortable label="还款费用" width="150"></el-table-column>
          <el-table-column prop="jkbj" sortable label="借款本金" width="150"></el-table-column>
          <el-table-column prop="jklx" label="借款利息" width="120"></el-table-column>
          <el-table-column prop="hksj" sortable label="还款时间" width="200"></el-table-column>
          <el-table-column prop="hkbj" sortable label="还款本金" width="150"></el-table-column>
          <el-table-column prop="hklx" label="还款利息" width="150"></el-table-column>
          <el-table-column prop="zfr" label="支付人" width="200"></el-table-column>
          <el-table-column prop="zffs" label="支付方式" width="150"></el-table-column>
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
  name: "recallDetail",
  data(){
    return{
      input1:'',
      currentPage: 1,
      form1:{
        jjh_checked: false,
        jjh:'',
        hkh_checked: false,
        hkh:'',
        hkfy_checked: false,
        hkfy:'',
        jkbj_checked: false,
        jkbj:'',
        hksj_checked: false,
        hksj:'',
        hkbj_checked: false,
        hkbj:'',
        zfr_checked: false,
        zfr:'',
        zffs_checked: false,
        zffs:'',
      },
      pickerOptions:[],
      tableData: [{
        zffs:'',
        zfr:'',
        hklx:'',
        hkbj:'',
        hksj:'',
        jklx:'',
        jkbj:'',
        hkfy:'',
        hkh:'',
        jjh:''
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
    },
    addRecall(){
      this.$router.replace('/creditRecall/recallXq')
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
