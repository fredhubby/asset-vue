<template>
  <el-container>
    <el-header class="el-header" style="height: 80px">
      <el-row>
        <el-col :span="12"><div class="titleName">债权清收管理系统</div></el-col>
        <el-col :span="12">
          <div class="loginName">
            <span>
              欢迎您：{{ username }} {{ nowDateTime }}
            </span>
            <el-dropdown>
              <i class="el-icon-s-tools" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/userInfo/userInfo"><el-dropdown-item>个人信息</el-dropdown-item></router-link>
                <router-link to="/userInfo/userManage"><el-dropdown-item>用户管理</el-dropdown-item></router-link>
                <el-dropdown-item>退出账户</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="el-aside" width="240px">
        <el-menu >
          <el-menu-item index="1">
            <span slot="title">
              <i class="el-icon-s-home"></i>
              <router-link to="/Main">首页</router-link>
            </span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>债权信息</template>
            <el-menu-item-group>
<!--              <template slot="title">分组一</template>-->
              <el-menu-item index="2-1">
                <router-link to="/creditInfo/creditFinfo/creditMenu">债权基础信息</router-link>
              </el-menu-item>
              <el-menu-item index="2-2">
                <router-link to="/creditInfo/assetPackage/assetPackMenu">资产包</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3">
            <span slot="title">
              <i class="el-icon-finished"></i>
              <router-link to="/creditRecall/recallDetail">债权清收</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="4">
            <span slot="title">
              <i class="el-icon-s-grid"></i>
              <router-link to="/JudicialProceedings/JudicialDetail">司法诉讼</router-link>
            </span>
          </el-menu-item>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-user-solid"></i>个人信息</template>
            <el-menu-item-group>
              <!--              <template slot="title">分组一</template>-->
              <el-menu-item index="5-1">
                <router-link to="/userInfo/userInfo">用户资料</router-link>
              </el-menu-item>
              <el-menu-item index="5-2">
                <router-link to="/userInfo/userManage">用户管理</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-search"></i>查询统计</template>
            <el-menu-item-group>
              <!--              <template slot="title">分组一</template>-->
              <el-menu-item index="6-1">
                <router-link to="/totalSearch/collectionManage">催收公告管理</router-link>
              </el-menu-item>
              <el-menu-item index="6-2">
                <router-link to="/totalSearch/fqCompany">分期还款企业名单</router-link>
              </el-menu-item>
              <el-menu-item index="6-3">
                <router-link to="/totalSearch/crashedCredit">破产债权</router-link>
              </el-menu-item>
              <el-menu-item index="6-4">
                <router-link to="/totalSearch/SMAD">以物抵债资产管理</router-link>
              </el-menu-item>
              <el-menu-item index="6-5">
                <router-link to="/totalSearch/creditTransfer">债权转让</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <div v-if="this.$route.path === '/Main'">
            <span class="el-main-span1">今日，</span><br/>
            <span class="el-main-span2">{{todayDateTime}}，欢迎使用债权清收管理系统</span>
            <el-row :gutter="20" class="el-row2">
              <el-col :span="16">
                <el-card class="boxcard1" shadow="hover">
                  <div slot="header" class="clearfix">
                    <span style="font-family: 宋体; font-weight: bold"><i class="el-icon-message-solid"></i>时限提醒通知</span>
                  </div>
                  <div  class="text item">
                    <el-table
                        :data="tableData"
                        style="width: 100%"
                        :row-class-name="tableRowClassName">
                      <el-table-column
                          prop="content"
                          label="通知内容"
                          width="600">
                      </el-table-column>
                      <el-table-column
                          prop="time"
                          label="时间"
                          width="300">
                      </el-table-column>
                      <el-table-column
                          prop="status"
                          label="状态">
                      </el-table-column>
                    </el-table>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card class="boxcard2" shadow="hover">
                  <div slot="header" class="clearfix">
                    <span style="font-family: 宋体; font-weight: bold"><i class="el-icon-s-claim"></i>使用记录</span>
                  </div>
                  <div v-for="o in 4" :key="o" style="padding-top: 10px">
                    {{'列表内容 ' + o }}
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <router-view v-else/>
        </el-main>
        <el-footer class="el-footer">Copyright © 江苏丹阳投资集团有限公司 版权所有</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Main",
  data () {
    return{
      username:'wanyu',
      nowDateTime: '',
      todayDateTime:'',
      tableData: [{
        content: 'xxx债权申请执行日为xxxxx',
        time: '2021-01-01',
        status: '未处理'
      }, {
        content: 'xxx债权申请执行日为xxxxx',
        time: '2021-01-01',
        status: '未处理'
      }, {
        content: 'xxx债权申请执行日为xxxxx',
        time: '2021-01-01',
        status: '已处理'
      }, {
        content: 'xxx债权申请执行日为xxxxx',
        time: '2021-01-01',
        status: '急需处理'
      }]
    }
  },

  methods:{
    getTime(){
      var that = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      that.nowDateTime = yy+'-'+mm+'-'+dd+'  '+hh+':'+mf+':'+ss;
    },
    currentTime(){
      setInterval(this.getTime,500)
    },
    getDate(){
      var that = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      that.todayDateTime = yy+'年'+mm+'月'+dd+'日';
    },

    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 2) {
        return 'success-row';
      } else if (rowIndex === 3) {
        return 'danger-row';
      }
      return '';
    }
  },

  created() {
    this.currentTime();
    this.getDate()
  }
}
</script>

<style>
  html,
  body,
  #app,
  .mainBox, .el-container{
    margin: 0px;
    padding: 0px;
    height: 100%;
  }
  /*去掉原有链接文字下划线*/
  a {
    text-decoration: none;
    color: #333333;
   }
  .router-link-active {
    text-decoration: none;
    color: #409eff;
  }

  .el-header{
    background-color: #409eff;
  }
  .titleName{
    text-align: start;
    line-height: 80px;
    font-family: 隶书;
    font-size: 50px;
    color: white;
  }
  .loginName{
    text-align: end;
    color: white;
    font-family: 隶书;
    font-size: 20px;
    font-weight: bold;
    line-height: 100px;
  }
  .el-footer {
    background-color: cornflowerblue;
    color: #333;
    text-align: start;
    height: 50px;
    line-height: 60px;
    font-size: 10px;
  }

  .el-aside {
    background-color: rgba(0, 168, 255,0.1);
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #ffffff;
    text-align: start;
  }
  .el-main-span1{
    font-size: 30px;
    font-weight: bold;
  }
  .el-main-span2{
    font-family: 黑体;
  }

  .el-row2{
    margin-top: 50px;
  }
  .boxcard1{
    height: 580px;
    margin-left: 50px;
  }
  .boxcard2{
    height: 580px;
    margin-right: 50px;
  }

  .el-table .warning-row {
    background: #fdcb6e;
  }
  .el-table .success-row {
    background: #55efc4;
  }
  .el-table .danger-row{
    background-color: #ff7675;
  }
</style>