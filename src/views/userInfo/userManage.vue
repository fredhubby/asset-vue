<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">个人信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20" class="el_row1">
      <el-col :span="16">
        <div class="grid-content1">
          <el-button type="primary">新增用户</el-button>
          <el-button @click="" type="success">数据导出</el-button>
<!--          <el-button>打印</el-button>-->
          <el-popconfirm
              title="确定删除用户信息吗？"
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
                  <el-col :span="20" :offset="1"><el-checkbox v-model="form1.account_show">账户</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.name_show">姓名</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.department_show">部门</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.registerTime_show">注册时间</el-checkbox></el-col>
                </el-row>
                <el-row :gutter="20" type="flex" class="row-bg">
                  <el-col :span="20" :offset="1"><el-checkbox v-model="form1.phone_show">电话</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.mail_show">邮箱地址</el-checkbox></el-col>
                  <el-col :span="20" ><el-checkbox v-model="form1.latestLogTime_show">最近登录时间</el-checkbox></el-col>
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
                  <el-col :span="2"><el-checkbox v-model="form1.department_checked">部门</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30"><el-input v-model="form1.department" clearable :disabled="Boolean(!form1.department_checked)"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="2"><el-checkbox v-model="form1.registerTime_checked">注册时间</el-checkbox></el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="30">
                    <el-date-picker
                        v-model="form1.registerTime"
                        type="daterange"
                        :disabled="Boolean(!form1.registerTime_checked)"
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
        <span>用户记录</span>
      </div>
      <div  class="text item">
        <el-table :data="tableData" border height="500" style="width: 100%" class="el-table"
                  ref="filterTable" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="account" label="账户" width="150" v-if="!form1.account_show"></el-table-column>
          <el-table-column prop="name" label="姓名" width="150" v-if="!form1.name_show"></el-table-column>
          <el-table-column prop="department" label="部门" width="150" v-if="!form1.department_show"></el-table-column>
          <el-table-column prop="registerTime" sortable label="注册时间" width="200" v-if="!form1.registerTime_show"></el-table-column>
          <el-table-column prop="phone" label="电话" width="200" v-if="!form1.phone_show"></el-table-column>
          <el-table-column prop="mail" label="邮箱地址" width="300" v-if="!form1.mail_show"></el-table-column>
          <el-table-column prop="latestLogTime" sortable label="最近登录时间" width="250" v-if="!form1.latestLogTime_show"></el-table-column>
          <el-table-column prop="operate" label="操作">
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
  name: "userManage",
  data(){
    return{
      input1:'',
      currentPage: 1,
      form1:{
        department_checked: false,
        department: '',
        registerTime_checked: false,
        registerTime: '',
        account_show:false,
        name_show:false,
        department_show:false,
        registerTime_show:false,
        phone_show:false,
        mail_show:false,
        latestLogTime_show:false,

      },
      pickerOptions:[],
      tableData: []
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
