<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">司法诉讼</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">司法明细</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content1">
          <el-button type="primary" @click="addJudicial">新增司法记录</el-button>
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
        <span>司法记录</span>
      </div>
      <div  class="text item">
        <el-table :data="tableData" border height="500" style="width: 100%" class="el-table"
                  ref="filterTable" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="jjh" sortable label="借据号" width="200"></el-table-column>
          <el-table-column prop="ah" sortable label="案号" width="250"></el-table-column>
          <el-table-column prop="sfzt" label="司法状态" width="150"
                           :filters="[{text: '诉前', value: '诉前'}, {text: '诉中', value: '诉中'},
                           {text: '执行', value: '执行'}, {text: '结案', value: '结案'}, {text: '转让', value: '转让'}]"
                           :filter-method="filterHandler">
          </el-table-column>
          <el-table-column prop="sssxdqr" sortable label="诉讼时效到期日" width="180"
                           :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'},
                           {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                           :filter-method="filterHandler">
          </el-table-column>
          <el-table-column prop="dbsxdqr" sortable label="担保时效到期日" width="180"
                           :filters="[{text: '2018-05-01', value: '2018-05-01'}, {text: '2018-05-02', value: '2018-05-02'},
                           {text: '2018-05-03', value: '2018-05-03'}, {text: '2018-05-04', value: '2018-05-04'}]"
                           :filter-method="filterHandler">
          </el-table-column>
          <el-table-column prop="zxsxdqr" sortable label="执行时效到期日" width="180"
                           :filters="[{text: '2021-05-01', value: '2021-05-01'}, {text: '2021-05-02', value: '2021-05-02'},
                           {text: '2021-05-03', value: '2021-05-03'}, {text: '2021-05-04', value: '2021-05-04'}]"
                           :filter-method="filterHandler">
          </el-table-column>
          <el-table-column prop="slfy" label="审理法院" width="180"
                           :filters="[{text: '丹阳法院', value: '丹阳法院'}, {text: '京口法院', value: '京口法院'},
                           {text: '润洲法院', value: '润洲法院'}, {text: '丹徒法院', value: '丹徒法院'}]"
                           :filter-method="filterHandler">
          </el-table-column>
          <el-table-column prop="cbfg" label="承办法官" width="150"></el-table-column>
          <el-table-column prop="stls" label="受托律所" width="150"
                           :filters="[{text: '金矛律所', value: '金矛律所'}, {text: '荣誉祥律所', value: '荣誉祥律所'},
                           {text: '沪宁律所', value: '沪宁律所'}, {text: '君合力律所', value: '君合力律所'},
                            {text: '隆安律所', value: '隆安律所'}, {text: '漫修斯律所', value: '漫修斯律所'},
                            {text: '必正律所', value: '必正律所'}, {text: '陈志伟律所', value: '陈志伟律所'}]"
                           :filter-method="filterHandler">
          </el-table-column>
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
  name: "JudicialDetail",
  data(){
    return{
      input1:'',
      currentPage: 1,
      tableData: [{
        stls:'',
        cbfg:'',
        slfy:'',
        zxsxdqr:'',
        dbsxdqr:'',
        sssxdqr:'',
        sfzt:'',
        ah:'',
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
    addJudicial(){
      this.$router.replace('/JudicialProceedings/JudicialInfo')
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