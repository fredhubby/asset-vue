<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">查询统计</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">催收公告管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20" class="el_row1">
      <el-col :span="16">
        <div class="grid-content1">
          <el-button type="primary" @click="addCollection">新增催收记录</el-button>
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
                  <el-col :span="20" offset="1"><el-checkbox v-model="form1.id_show">借据号</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.obligor_show">债务人</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.creditor_show">债权人</el-checkbox></el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg">
                  <el-col :span="20" offset="1"><el-checkbox v-model="form1.originalCreditor_show">原债权人</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.latestUrgingDate_show">还款状态</el-checkbox></el-col>
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
                  <el-col :span="2"><el-checkbox v-model="form1.id_checked">借据号</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.id" clearable :disabled="Boolean(!form1.id_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.obligor_checked">债务人</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.obligor" clearable :disabled="Boolean(!form1.obligor_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.creditor_checked">债权人</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30">
                    <el-select v-model="form1.creditor" clearable :disabled="Boolean(!form1.creditor_checked)">
                      <el-option
                          v-for="item in options1"
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
                          v-for="item in options2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.latestUrgingDate_checked">最新催收公告日</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30">
                    <el-date-picker
                        v-model="form1.latestUrgingDate"
                        type="daterange"
                        :disabled="Boolean(!form1.latestUrgingDate_checked)"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                  </el-col>
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
        <span>催收公告记录</span>
      </div>
      <div  class="text item">
        <el-table :data="tableData" border height="500" style="width: 100%" class="el-table"
                  ref="filterTable" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="id" sortable label="借据号" width="280" v-if="!form1.id_show"></el-table-column>
          <el-table-column prop="obligor" label="债务人" width="200" v-if="!form1.obligor_show"></el-table-column>
          <el-table-column prop="creditor" label="债权人" width="200" v-if="!form1.creditor_show"></el-table-column>
          <el-table-column prop="originalCreditor" label="原债权人" width="250" v-if="!form1.originalCreditor_show"></el-table-column>
          <el-table-column prop="latestUrgingDate" sortable label="最新催收公告日" width="200" v-if="!form1.latestUrgingDate_show"></el-table-column>
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
  name: "collectionManage",
  data(){
    return{
      input1:'',
      currentPage: 1,
      form1:{
        id_checked:false,
        id:'',
        obligor_checked:false,
        obligor:'',
        creditor_checked:false,
        creditor:'',
        originalCreditor_checked:false,
        originalCreditor:'',
        latestUrgingDate_checked:false,
        latestUrgingDate:'',
        id_show:false,
        obligor_show:false,
        creditor_show:false,
        originalCreditor_show:false,
        latestUrgingDate_show:false,
        remarks_show:false,
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
      options2: [{
        value: '丹阳工行',
        label: '丹阳工行'
      }, {
        value: '丹阳农行',
        label: '丹阳农行'
      }, {
        value: '丹阳中行',
        label: '丹阳中行'
      }, {
        value: '丹阳建行',
        label: '丹阳建行'
      }, {
        value: '丹阳交行',
        label: '丹阳交行'
      }, {
        value: '丹阳农发行',
        label: '丹阳农发行'
      }, {
        value: '丹阳农商行',
        label: '丹阳农商行'
      }, {
        value: '丹阳江苏',
        label: '丹阳江苏'
      }, {
        value: '丹阳保得',
        label: '丹阳保得'
      }, {
        value: '丹阳华夏',
        label: '丹阳华夏'
      }, {
        value: '丹阳民生',
        label: '丹阳民生'
      }, {
        value: '丹阳浦发',
        label: '丹阳浦发'
      }, {
        value: '丹阳招商',
        label: '丹阳招商'
      }, {
        value: '丹阳中信',
        label: '丹阳中信'
      }, {
        value: '丹阳兴业',
        label: '丹阳兴业'
      }, {
        value: '丹阳南京',
        label: '丹阳南京'
      }, {
        value: '丹阳紫金农商',
        label: '丹阳紫金农商'
      }, {
        value: '丹阳广发',
        label: '丹阳广发'
      }, {
        value: '丹阳储蓄',
        label: '丹阳储蓄'
      }],
      tableData: [{
        bz:'',
        zxcsggr:'',
        yzqr:'',
        zqr:'',
        zwr:'',
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
    addCollection(collection) {
      this.$router.replace('/totalSearch/addCollection')
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
