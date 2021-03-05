<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">查询统计</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权转让</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content1">
          <el-button type="primary" @click="addCreditTransfer">新增债权转让</el-button>
          <el-button>数据导出</el-button>
          <el-button>打印</el-button>
          <el-button>删除</el-button>
          <el-button>隐藏列</el-button>
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
        <span>债权转让记录</span>
      </div>
      <div  class="text item">
        <el-table :data="tableData" border height="500" style="width: 100%" class="el-table"
                  ref="filterTable" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="jjh" label="借据号" width="200"></el-table-column>
          <el-table-column prop="zwr" label="债务人" width="150"></el-table-column>
          <el-table-column prop="zqbj" sortable label="债权本金" width="150"></el-table-column>
          <el-table-column prop="qdcb" sortable label="取得成本" width="150"></el-table-column>
          <el-table-column prop="pgjg" sortable label="评估价格" width="150"></el-table-column>
          <el-table-column prop="zqr" label="债权人" width="150"
                           :filters="[{text: '天惠投资', value: '天惠投资'}, {text: '天晟投资', value: '天晟投资'},
                           {text: '天工惠农小贷', value: '天工惠农小贷'}, {text: '银润小贷', value: '银润小贷'}, {text: '阳光企业', value: '阳光企业'}]"
                           :filter-method="filterHandler">
          </el-table-column>
          <el-table-column prop="yzqr" label="原债权人" width="150"></el-table-column>
          <el-table-column prop="zqze" sortable label="债权总额" width="150"></el-table-column>
          <el-table-column prop="bz" label="备注" width="300"></el-table-column>
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
  name: "creditTransfer",
  data(){
    return{
      input1:'',
      currentPage: 1,
      tableData: [{
        bz:'',
        zqze:'',
        yzqr:'',
        zqr:'',
        pgjg:'',
        qdcb:'',
        zqbj:'',
        zwr:'',
        jjh:''
      }]
    }
  },
  methods:{
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
    addCreditTransfer(){
      this.$router.replace('/totalSearch/addCreditTransferInfo')
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