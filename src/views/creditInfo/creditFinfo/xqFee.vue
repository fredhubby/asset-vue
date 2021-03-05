<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权费用信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="el-row1">
      <el-col :span="24">
        <div class="grid-content">
          <!--          <el-dropdown trigger="click">-->
          <!--            <el-button type="primary">-->
          <!--              新增费用<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
          <!--            </el-button>-->
          <!--            <el-dropdown-menu slot="dropdown">-->
          <!--              <el-dropdown-item>诉讼费</el-dropdown-item>-->
          <!--              <el-dropdown-item>保全费</el-dropdown-item>-->
          <!--              <el-dropdown-item>执行费</el-dropdown-item>-->
          <!--              <el-dropdown-item>代理费</el-dropdown-item>-->
          <!--              <el-dropdown-item>其他费用</el-dropdown-item>-->
          <!--            </el-dropdown-menu>-->
          <!--          </el-dropdown>-->
          <el-button @click="reset('form1')">清空</el-button>
          <el-button>保存</el-button>
          <el-button type="primary">保存并提交</el-button>
        </div>
      </el-col>
    </el-row>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#b2bec3"
        text-color="#333"
        active-text-color="#409eff">
      <el-menu-item index="1">
        <router-link to="/creditInfo/creditFinfo/xqCreditFinfo">债权基本信息</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/creditInfo/creditFinfo/xqSmortgage">担保抵押信息</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/creditInfo/creditFinfo/xqFee">债权费用信息</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/creditInfo/creditFinfo/xqRecall">债权清收信息</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/creditInfo/creditFinfo/xqJudicature">债权司法信息</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <router-link to="/creditInfo/creditFinfo/xqCollection">债权催收信息</router-link>
      </el-menu-item>
    </el-menu>

    <el-form style="margin-top: 15px" ref="form1" :model="form1">
      <span class="span1">诉讼费</span>
      <el-form-item label="诉讼费用：" style="margin-top: 15px;margin-left: 60px">
        <el-input v-model="form1.value1" clearable style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item label="诉讼借据1：" style="margin-left: 60px">
        <el-input v-model="form1.value2" clearable style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item label="诉讼借据2：" style="margin-left: 60px">
        <el-input v-model="form1.value3" clearable style="width: 40%"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <span class="span1">保全费</span>
      <el-form-item label="保全费用：" style="margin-top: 15px;margin-left: 60px">
        <el-input v-model="form1.value4" clearable style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item label="保全借据1：" style="margin-left: 60px">
        <el-input v-model="form1.value5" clearable style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item label="保全借据2：" style="margin-left: 60px">
        <el-input v-model="form1.value6" clearable style="width: 40%"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <span class="span1">执行费</span>
      <el-form-item label="执行费用：" style="margin-top: 15px;margin-left: 60px">
        <el-input v-model="form1.value7" clearable style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item label="执行借据1：" style="margin-left: 60px">
        <el-input v-model="form1.value8" clearable style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item label="执行借据2：" style="margin-left: 60px">
        <el-input v-model="form1.value9" clearable style="width: 40%"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <span class="span1">代理费</span>
      <el-form-item label="代理费用：" style="margin-top: 15px;margin-left: 60px">
        <el-input v-model="form1.value10" clearable style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item label="代理借据1：" style="margin-left: 60px">
        <el-input v-model="form1.value11" clearable style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item label="代理借据2：" style="margin-left: 60px">
        <el-input v-model="form1.value12" clearable style="width: 40%"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <span class="span1">其他费用</span>
      <el-form-item label="其他费用：" style="margin-top: 15px;margin-left: 60px">
        <el-input v-model="form1.value13" clearable style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item label="借据1：" style="margin-left: 60px">
        <el-input v-model="form1.value14" clearable style="width: 40%"></el-input>
      </el-form-item>
      <el-form-item label="借据2：" style="margin-left: 60px">
        <el-input v-model="form1.value15" clearable style="width: 40%"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "xqFee",
  data(){
    return{
      activeIndex: '3',
      form1:{
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:'',
        value6:'',
        value7:'',
        value8:'',
        value9:'',
        value10:'',
        value11:'',
        value12:'',
        value13:'',
        value14:'',
        value15:''
      }
    }
  },
  methods:{
    reset(){
      this.form1 = this.$options.data().form1;
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
.el-row1{
  margin-top: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  text-align: end;
  height: 50px;
  line-height: 50px;
  padding-right: 20px;
}
.span1{
  font-size: 20px;
  font-weight: bold;
  font-family: 黑体;
  margin-left: 20px;
}
</style>