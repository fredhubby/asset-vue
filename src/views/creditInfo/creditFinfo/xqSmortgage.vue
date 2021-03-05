<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">担保抵押信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="el-row1">
      <el-col :span="24">
        <div class="grid-content">
          <el-button @click="reset('formLabelAlign')">清空</el-button>
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

    <el-form style="margin-top: 20px" ref="form1" :model="form1">
      <el-collapse>
        <el-collapse-item
            v-for="(single_smortgage,index) in form1"
            :title="index"
            :name="index"
            :key="g">

        </el-collapse-item>
      </el-collapse>






      <el-form-item>
        <el-row>
          <el-col :span="2"><div class="grid-content1">担保ID：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value1" clearable></el-input></div></el-col>
          <el-col :span="2"><div class="grid-content1" style="margin-left: 20px">担保方式：</div></el-col>
          <el-col :span="7"><div class="grid-content2">
            <el-select v-model="form1.value2" clearable placeholder="请选择">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="2"><div class="grid-content1">担保起始日：</div></el-col>
          <el-col :span="7"><div class="grid-content2">
            <el-date-picker
                v-model="form1.value3"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </div></el-col>
          <el-col :span="2"><div class="grid-content1" style="margin-left: 20px">担保到期日：</div></el-col>
          <el-col :span="7"><div class="grid-content2">
            <el-date-picker
                v-model="form1.value4"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="2"><div class="grid-content1">备注：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value5" clearable></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-divider></el-divider>
      <span style="font-family: 黑体;font-size: 18px">抵押人</span>
      <el-form-item label="抵押人1：" style="margin-top: 15px;margin-left: 60px">
        <el-input style="width: 40%" v-model="form1.value6"></el-input>
      </el-form-item>
      <el-form-item label="抵押人2：" style="margin-top: 15px;margin-left: 60px">
        <el-input style="width: 40%" v-model="form1.value7"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <span style="font-family: 黑体;font-size: 18px">抵押物</span>
      <el-table :data="tableData" border style="margin-top: 15px">
        <el-table-column
            prop="dyw"
            label="抵押物"
            width="200">
        </el-table-column>
        <el-table-column
            prop="dywlx"
            label="抵押物类型"
            width="200">
        </el-table-column>
        <el-table-column
            prop="dywwz"
            label="抵押物位置">
        </el-table-column>
        <el-table-column
            prop="tdmj"
            label="土地面积"
            width="200">
        </el-table-column>
        <el-table-column
            prop="fcmj"
            label="房产面积"
            width="200">
        </el-table-column>
        <el-table-column
            prop="dywpgj"
            label="抵押物评估价"
            width="200">
        </el-table-column>
        <el-table-column
            prop="dywdjje"
            label="抵押物评登记金额"
            width="200">
        </el-table-column>
      </el-table>
      <el-divider></el-divider>
      <span style="font-family: 黑体;font-size: 18px">抵押借据对象</span>
      <el-form-item label="借据ID：" style="margin-top: 15px;margin-left: 60px">
        <el-input clearable style="width: 40%" v-model="form1.value15"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "xqSmortgage",
  data() {
    return {
      activeIndex: '2',
      form1: {
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        value8: '',
        value9: '',
        value10: '1',
        value11: '',
        value12: '',
        value13: '',
        value14: '',
        value15: ''
      },
      options:[{
        value: '选项1',
        label: '抵押担保'
      }, {
        value: '选项2',
        label: '质押担保'
      }, {
        value: '选项3',
        label: '保证担保'
      }, {
        value: '选项4',
        label: '留置'
      }, {
        value: '选项5',
        label: '其他担保'
      }],
      pickerOptions:[],
      tableData: [{
        dyw:'房子',
        dywlx:'',
        dywwz:'',
        tdmj:'',
        fcmj:'',
        dywpgj:'',
        dywdjje:''
      }]
    }
  },
  created() {
    var _this = this;
    api({
      url: "/Secure/getSecure",
      method: "get",
      params:{
        iouId:_this.$route.query.iou,
      }
    }).then(data => {
      console.log(data);
    }).catch(err => {
      console.log(err);
    })
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
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  text-align: end;
  height: 50px;
  line-height: 50px;
  padding-right: 20px;
}
.grid-content1{
  background-color: #DCDFE6;
  text-align: end;
}
</style>