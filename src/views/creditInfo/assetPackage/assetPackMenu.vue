<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">资产包</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20" class="el_row1">
      <el-col :span="16">
        <div class="grid-content1">
          <el-button type="primary" @click="addAsset">新增资产包</el-button>
          <el-button>数据导出</el-button>
          <el-button>打印</el-button>
          <el-button>删除</el-button>
          <el-button>隐藏列</el-button>
          <el-popover
              placement="down"

              trigger="click">
            <el-form ref="form1" :model="form1">
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.zqsl_checked">债权数量</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.zqsl" clearable :disabled="Boolean(!form1.zqsl_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.zcbID_checked">资产包ID</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.zcbID" clearable :disabled="Boolean(!form1.zcbID_checked)"></el-input></el-col>
                </el-form-item>
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
              </el-row>
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.yzqr_checked">原债权人</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30">
                    <el-select v-model="form1.yzqr" clearable :disabled="Boolean(!form1.yzqr_checked)">
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
                  <el-col :span="2"><el-checkbox v-model="form1.jyjzr_checked">交易基准日</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30">
                    <el-date-picker
                        v-model="form1.jyjzr"
                        type="daterange"
                        :disabled="Boolean(!form1.jyjzr_checked)"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.djzfr_checked">对价支付人</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.djzfr" clearable :disabled="Boolean(!form1.djzfr_checked)"></el-input></el-col>
                </el-form-item>
              </el-row>
              <el-row :gutter="20" type="flex" class="row-bg">
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.zfdj_checked">支付对价总费用</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.zfdj" clearable :disabled="Boolean(!form1.zfdj_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.zqze_checked">债权总额</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.zqze" clearable :disabled="Boolean(!form1.zqze_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.djze_checked">对价总额</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.djze" clearable :disabled="Boolean(!form1.djze_checked)"></el-input></el-col>
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
        <span>资产包记录</span>
      </div>
      <div  class="text item">
        <el-table :data="tableData" border height="500" style="width: 100%" class="el-table"
                  ref="filterTable" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="zcbid" sortable label="资产包ID" width="280"></el-table-column>
          <el-table-column prop="zqsl" sortable label="债权数量" width="120"></el-table-column>
          <el-table-column prop="zqr" label="债权人" width="200"></el-table-column>
          <el-table-column prop="yzqr" label="原债权人" width="250"></el-table-column>
          <el-table-column prop="jyjzr" sortable label="交易基准日" width="150"></el-table-column>
          <el-table-column prop="zfdjzfy" sortable label="支付对价总费用" width="150"></el-table-column>
          <el-table-column prop="djzfr" label="对价支付人" width="120"></el-table-column>
          <el-table-column prop="zqze" sortable label="债权总额" width="120"></el-table-column>
          <el-table-column prop="djze" sortable label="对价总额" width="120"></el-table-column>
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
  name: "assetPackMenu",
  data(){
    return{
      input1:'',
      currentPage: 1,
      form1: {
        zcbID_checked: false,
        zcbID: '',
        zqsl_checked: false,
        zqsl: '',
        zqr_checked: false,
        zqr: '',
        yzqr_checked: false,
        yzqr: '',
        jyjzr_checked: false,
        jyjzr: '',
        djzfr_checked: false,
        djzfr: '',
        zfdj_checked: false,
        zfdj: '',
        zqze_checked: false,
        zqze: '',
        djze_checked: false,
        djze: ''
      },
      tableData: [{
        djze:'',
        zqze:'',
        djzfr:'',
        zfdjzfy:'',
        jyjzr:'',
        yzqr:'',
        zqr:'',
        zqsl:'',
        zcbid:''
      }],
      pickerOptions:[],
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
    addAsset(){
      this.$router.replace('/creditInfo/assetPackage/assetPackAdd')
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
