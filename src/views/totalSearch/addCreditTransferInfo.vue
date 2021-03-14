<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">查询统计</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权转让</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权转让录入</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="el-row1">
      <el-col :span="24">
        <div class="grid-content">
          <el-button @click="reset('form1')">清空</el-button>
          <el-button>保存</el-button>
          <el-button type="primary">保存并提交</el-button>
        </div>
      </el-col>
    </el-row>

    <el-form ref="form1" :model="form1">
      <el-form-item>
        <el-row class="el-row2">
          <el-col :span="2"><div class="grid-content1" >债务人：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value"></el-input></div></el-col>
          <el-col :span="2" style="margin-left: 20px"><div class="grid-content1" >债权本金：</div></el-col>
          <el-col :span="7"><div class="grid-content2" style=""><el-input v-model="form1.value1"></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row class="el-row3">
          <el-col :span="2"><div class="grid-content1">取得本金：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value2"></el-input></div></el-col>
          <el-col :span="2" style="margin-left: 20px"><div class="grid-content1">评估价格：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value3"></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row class="el-row4">
          <el-col :span="2"><div class="grid-content1">转让价格：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value4"></el-input></div></el-col>
          <el-col :span="2" style="margin-left: 20px"><div class="grid-content1" >原债权人：</div></el-col>
          <el-col :span="7"><div class="grid-content3">
            <el-select v-model="form1.value5" clearable filterable placeholder="请选择">
              <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row class="el-row5">
          <el-col :span="2"><div class="grid-content1">债权人：</div></el-col>
          <el-col :span="7"><div class="grid-content2">
            <el-select v-model="form1.value6" clearable filterable placeholder="请选择">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div></el-col>
          <el-col :span="2" style="margin-left: 20px"><div class="grid-content1" >债权转让进度：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value7"></el-input></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row class="el-row6">
          <el-col :span="2"><div class="grid-content1">备注：</div></el-col>
          <el-col :span="7"><div class="grid-content2">
            <el-input v-model="form1.value8" type="textarea"
                      autosize
                      maxlength="100"></el-input>
          </div></el-col>
        </el-row>
      </el-form-item>
      <el-divider></el-divider>
      <span class="span1">转让借据</span>

      <div>
        <div v-for="(iou,index) in form1.iou"
             :key="iou.key" style="margin-top: 20px">
          <el-row :gutter="30">
            <el-col :span="9" :offset="1">
              <el-form-item :label="'借据号'+(index+1)+'：'" class="form_item">
                <el-input v-model="iou.value" clearable style="width: 80%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button @click.prevent="removeIou(iou)" type="danger">删除</el-button>
            </el-col>
          </el-row>
        </div>
        <el-form-item style="margin-left: 30%">
          <el-button type="primary" @click="addIou">新增借据</el-button>
          <el-button @click="resetIou">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "addCreditTransferInfo",
  data(){
    return{
      temp_iouId:0,
      form1:{
        value:'',
        value1:'',
        value2:'',
        value3:'',
        value4:'',
        value5:'',
        value6:'',
        value7:'',
        value8:'',
        iou:[{key:'', value: ''}]
      },
      options: [{
        value: '选项1',
        label: '天惠投资'
      }, {
        value: '选项2',
        label: '天晟投资'
      }, {
        value: '选项3',
        label: '天工惠农小贷'
      }, {
        value: '选项4',
        label: '银润小贷'
      }, {
        value: '选项5',
        label: '阳光企业'
      }],
      options1: [{
        value: '选项1',
        label: '丹阳工行'
      }, {
        value: '选项2',
        label: '丹阳农行'
      }, {
        value: '选项3',
        label: '丹阳中行'
      }, {
        value: '选项4',
        label: '丹阳建行'
      }, {
        value: '选项5',
        label: '丹阳交行'
      }, {
        value: '选项6',
        label: '丹阳农发行'
      }, {
        value: '选项7',
        label: '丹阳农商行'
      }, {
        value: '选项8',
        label: '丹阳江苏'
      }, {
        value: '选项9',
        label: '丹阳保得'
      }, {
        value: '选项10',
        label: '丹阳华夏'
      }, {
        value: '选项11',
        label: '丹阳民生'
      }, {
        value: '选项12',
        label: '丹阳浦发'
      }, {
        value: '选项13',
        label: '丹阳招商'
      }, {
        value: '选项14',
        label: '丹阳中信'
      }, {
        value: '选项15',
        label: '丹阳兴业'
      }, {
        value: '选项16',
        label: '丹阳南京'
      }, {
        value: '选项17',
        label: '丹阳紫金农商'
      }, {
        value: '选项18',
        label: '丹阳广发'
      }, {
        value: '选项19',
        label: '丹阳储蓄'
      }]
    }
  },
  methods: {
    reset() {
      this.form1 = this.$options.data().form1
    },
    //借据对象
    addIou(){
      this.form1.iou.push({key:this.getTempIouId,value: ''});
    },
    removeIou(iou){
      var index = this.form1.iou.indexOf(iou);
      if (index !== -1) {
        this.form1.iou.splice(index, 1);
      }
    },
    resetIou(){
      this.form1.iou=[{key:this.getTempIouId, value: ''}];
    }
  },
  computed:{
    getTempIouId(){
      this.temp_iouId++;
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
  margin-top: 40px;
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
  margin-left: 30px;
}
.el-icon-circle-plus,.el-icon-remove{
  font-size: 150%;
}
.grid-content1{
  background-color: #DCDFE6;
  text-align: end;
}
</style>
