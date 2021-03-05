<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">查询统计</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">以物抵债资产管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content1">
          <el-dropdown trigger="click">
            <el-button type="primary" @click="addSMAD">
              新增<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>以物抵债资产</el-dropdown-item>
              <el-dropdown-item>法拍资产明细</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
        <span>以物抵债资产明细</span>
      </div>
      <div  class="text item">
        <el-table :data="tableData" border height="500" style="width: 100%" class="el-table"
                  ref="filterTable" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="dywid" sortable label="抵押物ID" width="200"></el-table-column>
          <el-table-column prop="dywmc" label="抵押物名称" width="150"></el-table-column>
          <el-table-column prop="bzxr" label="被执行人" width="150"></el-table-column>
          <el-table-column prop="bj" sortable label="本金" width="150"></el-table-column>
          <el-table-column prop="zxah" sortable label="执行案号" width="250"></el-table-column>
          <el-table-column prop="dywqk" label="抵押物情况" width="150"></el-table-column>
          <el-table-column prop="dywpgjg" sortable label="抵押物评估价格" width="180"></el-table-column>
          <el-table-column prop="zxcdjg" label="执行裁定结果" width="180"></el-table-column>
          <el-table-column prop="flws" label="法律文书" width="180"></el-table-column>
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
  name: "SMAD",
  data(){
    return{
      input1:'',
      currentPage: 1,
      tableData: [{
        flws:'',
        zxcdjg:'',
        dywpgjg:'',
        dywqk:'',
        zxah:'',
        bj:'',
        bzxr:'',
        dywmc:'',
        dywid:''
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
    addSMAD(){
      this.$router.replace('/totalSearch/SMADXQ/SMADxq')
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