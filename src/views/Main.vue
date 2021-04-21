<template>
  <el-container v-if="isLogin">
    <el-header class="el-header" style="height: 80px">
      <el-row class="header_row">
        <el-col :span="12" ><div class="titleName">债权清收管理系统</div></el-col>
        <el-col :span="12">
          <div class="loginName">
            <span>
              欢迎您：{{ $store.getters.getUser.name }} {{ nowDateTime }}
            </span>
            <el-dropdown>
              <i class="el-icon-s-tools" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/userInfo/userInfo"><el-dropdown-item>个人信息</el-dropdown-item></router-link>
                <router-link to="/userInfo/userManage"><el-dropdown-item>用户管理</el-dropdown-item></router-link>
                <router-link to="/logout"><el-dropdown-item>切换账户</el-dropdown-item></router-link>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="el-aside" width="200px">
        <el-menu >
          <el-menu-item index="1">
            <span slot="title">
              <i class="el-icon-s-home"></i>
              <router-link to="/timeRemider">首页</router-link>
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
          <!--          <el-menu-item index="3">-->
          <!--            <span slot="title">-->
          <!--              <i class="el-icon-finished"></i>-->
          <!--              <router-link to="/creditRecall/recallDetail">债权清收</router-link>-->
          <!--            </span>-->
          <!--          </el-menu-item>-->
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
              <!--              <el-menu-item index="6-1">-->
              <!--                <router-link to="/totalSearch/collectionManage">催收公告管理</router-link>-->
              <!--              </el-menu-item>-->
              <el-menu-item index="6-2">
                <router-link to="/totalSearch/fqCompany">分期还款企业名单</router-link>
              </el-menu-item>
              <el-menu-item index="6-3">
                <router-link to="/totalSearch/crashedCredit">破产债权</router-link>
              </el-menu-item>
              <el-menu-item index="6-4">
                <router-link to="/totalSearch/SMAD">以物抵债资产管理</router-link>
              </el-menu-item>
              <!--              <el-menu-item index="6-5">-->
              <!--                <router-link to="/totalSearch/creditTransfer">债权转让</router-link>-->
              <!--              </el-menu-item>-->
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer class="el-footer" style="height: 50px">Copyright © 江苏丹阳投资集团有限公司 版权所有</el-footer>
      </el-container>
    </el-container>
  </el-container>
  <div v-else>
    <h1>您还未登录，请先去登录....</h1>
    <span>页面将在3秒后自动跳转，若未自动跳转,请</span>
    <router-link to="/Login" style="color: #409eff">点击此处返回登录</router-link>
  </div>

</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "Main",
  data () {
    return{
      username:'wanyu',
      nowDateTime: '',
      isLogin: localStorage.getItem('isLogin')
    }
  },
  created() {
    this.currentTime();
    if(!this.$store.getters.getLogin.isLogin){
      this.threeGo()
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
    //3秒后进入跳转页面
    threeGo(){
      const TIME_COUNT = 3;
      if(!this.timer){
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(()=>{
          if(this.count > 0 && this.count <= TIME_COUNT){
            this.count--;
          }else{
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
            //跳转的页面写在此处
            this.$router.push({
              path: '/Login'
            });
          }
        },1000)
      }
    }
  },
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
  min-height: 650px;
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
  height: 80px;
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
  min-height: 600px;
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
  /*height: ;*/
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
/*.el-card__body{*/
/*  padding: 0;*/
/*}*/
</style>
