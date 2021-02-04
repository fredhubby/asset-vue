<template>
<div class="mainBox">
<!--  <h1>这是主页面</h1>-->
<!--  <span id="usrname">欢迎您：{{ $store.getters.getUser.name }}</span><br/>-->
<!--  <span id="logintime">登录于：{{ logintime }}</span>-->
  <el-container>
    <el-header class="el-header" style="height: 80px">
      <el-row>
        <el-col :span="12"><div class="titleName">债权清收管理系统</div></el-col>
        <el-col :span="12"><div class="loginName">欢迎您：{{ $store.getters.getUser.name }} {{ nowDateTime }}</div></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="240px">
        <el-menu >
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-home"></i>首页</template>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>债权信息</template>
            <el-menu-item-group>
<!--              <template slot="title">分组一</template>-->
              <el-menu-item index="2-1">债权基础信息</el-menu-item>
              <el-menu-item index="2-2">资产包</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>债权清收</template>
            <el-menu-item-group>
              <!--              <template slot="title">分组一</template>-->
              <el-menu-item index="3-1">债权清收明细</el-menu-item>
              <el-menu-item index="3-2">债权信息详情</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-menu"></i>司法诉讼</template>
            <el-menu-item-group>
              <!--              <template slot="title">分组一</template>-->
              <el-menu-item index="4-1">司法明细</el-menu-item>
              <el-menu-item index="4-2">司法详情</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-menu"></i>个人信息</template>
            <el-menu-item-group>
              <!--              <template slot="title">分组一</template>-->
              <el-menu-item index="5-1">用户资料</el-menu-item>
              <el-menu-item index="5-2">用户管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-menu"></i>查询统计</template>
            <el-menu-item-group>
              <!--              <template slot="title">分组一</template>-->
              <el-menu-item index="6-1">催收公告管理</el-menu-item>
              <el-menu-item index="6-2">分期还款企业名单</el-menu-item>
              <el-menu-item index="6-3">破产债权</el-menu-item>
              <el-menu-item index="6-4">以物抵债资产管理</el-menu-item>
              <el-menu-item index="6-5">债权转让</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>main</el-main>
        <el-footer>Copyright © 江苏丹阳投资集团有限公司 版权所有</el-footer>
      </el-container>
    </el-container>
  </el-container>
</div>
</template>

<script>
export default {
  name: "Main",
  data () {
    return{
      nowDateTime: '',
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
    }
  },

  created() {
    this.currentTime();
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
    color: black;
    font-family: 隶书;
    font-size: 20px;
    font-weight: bold;
    line-height: 100px;
  }
  .el-footer {
    background-color: cornflowerblue;
    color: #000;
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
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>