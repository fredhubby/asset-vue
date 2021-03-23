<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权基础信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="el-row1">
      <el-col :span="24">
        <div class="grid-content">
          <el-dropdown trigger="click" style="margin-right: 10px">
            <el-button type="primary">
              状态更新<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="first++" :disabled="first==1">新增一审信息</el-dropdown-item>
              <el-dropdown-item @click.native="second++" :disabled="((first==0)||(second==2))">新增二审信息</el-dropdown-item>
              <el-dropdown-item @click.native="third++" :disabled="((first==0)||(second==1)||(third==3))">新增再审信息</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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

    <el-form style="margin-top: 15px" ref="form1" :model="form1">
      <span class="span1">诉前阶段</span>
      <el-form-item>
        <el-row style="margin-top: 15px">
          <el-col :span="2"><div class="grid-content1" >借款到期日：</div></el-col>
          <el-col :span="7"><div class="grid-content2" style="text-align: start">
            <el-date-picker
                v-model="form1.value1"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
            </el-date-picker>
          </div></el-col>
          <el-col :span="2"><div class="grid-content1">保证期限：</div></el-col>
          <el-col :span="7"><div class="grid-content2" style="text-align: start">
            <el-date-picker
                v-model="form1.value2"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
            </el-date-picker>
          </div></el-col>
        </el-row>
        <el-row class="el-row3">
          <el-col :span="2"><div class="grid-content1">担保期限：</div></el-col>
          <el-col :span="7"><div class="grid-content2" style="text-align: start">
            <el-date-picker
                v-model="form1.value3"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
            </el-date-picker>
          </div></el-col>
          <el-col :span="2"><div class="grid-content1" >备注：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value4" clearable></el-input></div></el-col>
        </el-row>
        <el-row class="el-row4">
          <el-col :span="2"><div class="grid-content1" >借据号：</div></el-col>
          <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value5" clearable></el-input></div></el-col>
        </el-row>
      </el-form-item>

      <div v-if="first==1">
        <el-divider></el-divider>
        <span class="span">一审审理</span>
        <el-form-item style="margin-top: 15px">
          <el-row class="el-row5">
            <el-col :span="2"><div class="grid-content1" >案号：</div></el-col>
            <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value6" clearable></el-input></div></el-col>
            <el-col :span="2"><div class="grid-content1" >审理法院：</div></el-col>
            <el-col :span="7"><div class="grid-content2">
              <el-select v-model="form1.value7"  clearable>
                <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div></el-col>
          </el-row>
          <el-row class="el-row6">
            <el-col :span="2"><div class="grid-content1" >审理法官：</div></el-col>
            <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value8" clearable></el-input></div></el-col>
            <el-col :span="2"><div class="grid-content1" >备注：</div></el-col>
            <el-col :span="7"><div class="grid-content2">
              <el-input v-model="form1.value9" clearable
                        type="textarea"
                        autosize
                        maxlength="100">
              </el-input></div></el-col>
          </el-row>
        </el-form-item>
        <span class="span2">一审审理对象</span>
        <div>
          <div v-for="(iou,index) in formLabelAlign.iou"
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
          <el-form-item style="margin-left: 20%">
            <el-button type="primary" @click="addIou">新增借据</el-button>
            <el-button @click="resetIou">重置</el-button>
          </el-form-item>
        </div>
        <el-divider></el-divider>
        <span class="span1">一审判决中</span>
        <el-form-item style="margin-top: 15px">
          <el-row class="el-row7">
            <el-col :span="2"><div class="grid-content1" >生效期：</div></el-col>
            <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value10" placeholder="15" clearable></el-input></div></el-col>
            <el-col :span="2"><div class="grid-content1" >判决生效日：</div></el-col>
            <el-col :span="7"><div class="grid-content2" style="text-align: start">
              <el-date-picker
                  v-model="form1.value11"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
              </el-date-picker>
            </div></el-col>
          </el-row>
          <el-row class="el-row8">
            <el-col :span="2"><div class="grid-content1" >申请截止日：</div></el-col>
            <el-col :span="7"><div class="grid-content2" style="text-align: start">
              <el-date-picker
                  v-model="form1.value12"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
              </el-date-picker>
            </div></el-col>
            <el-col :span="2"><div class="grid-content1" >备注：</div></el-col>
            <el-col :span="7"><div class="grid-content2">
              <el-input v-model="form1.value13"
                        clearable
                        type="textarea"
                        autosize
                        maxlength="100">
              </el-input></div></el-col>
          </el-row>
        </el-form-item>
        <el-divider></el-divider>
        <span class="span1">申请执行</span>
        <el-form-item style="margin-top: 15px">
          <el-row class="el-row7">
            <el-col :span="3"><div class="grid-content1" >执行时效：</div></el-col>
            <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value14" clearable></el-input></div></el-col>
            <el-col :span="3"><div class="grid-content1" >申请执行日：</div></el-col>
            <el-col :span="7"><div class="grid-content2" style="text-align: start">
              <el-date-picker
                  v-model="form1.value15"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
              </el-date-picker>
            </div></el-col>
          </el-row>
          <el-row class="el-row8">
            <el-col :span="3"><div class="grid-content1" >执行时效截止日：</div></el-col>
            <el-col :span="7"><div class="grid-content2" style="text-align: start">
              <el-date-picker
                  v-model="form1.value16"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
              </el-date-picker>
            </div></el-col>
            <el-col :span="3"><div class="grid-content1" >备注：</div></el-col>
            <el-col :span="7"><div class="grid-content2">
              <el-input v-model="form1.value17"
                        clearable
                        type="textarea"
                        autosize
                        maxlength="100">
              </el-input></div></el-col>
          </el-row>
        </el-form-item>
        <el-button type="danger" style="margin-left: 40%;" @click="delFirst">删除一审信息</el-button>
      </div>

      <div v-if="second==2">
        <el-divider>二审审理</el-divider>
        <span class="span">二审审理</span>
        <el-form-item style="margin-top: 15px">
          <el-row class="el-row5">
            <el-col :span="2"><div class="grid-content1" >案号：</div></el-col>
            <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value18" clearable></el-input></div></el-col>
            <el-col :span="2"><div class="grid-content1" >审理法院：</div></el-col>
            <el-col :span="7"><div class="grid-content2">
              <el-select v-model="form1.value19"  clearable>
                <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div></el-col>
          </el-row>
          <el-row class="el-row6">
            <el-col :span="2"><div class="grid-content1" >审理法官：</div></el-col>
            <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value20" clearable></el-input></div></el-col>
            <el-col :span="2"><div class="grid-content1" >备注：</div></el-col>
            <el-col :span="7"><div class="grid-content2">
              <el-input v-model="form1.value21" clearable type="textarea"
                        autosize
                        maxlength="100">
              </el-input></div></el-col>
          </el-row>
        </el-form-item>
        <span class="span2">二审审理对象</span>
        <div>
          <div v-for="(iou,index) in formLabelAlign.iou"
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
          <el-form-item style="margin-left: 20%">
            <el-button type="primary" @click="addIou">新增借据</el-button>
            <el-button @click="resetIou">重置</el-button>
          </el-form-item>
        </div>
        <el-divider></el-divider>
        <span class="span1">二审判决中</span>
        <el-form-item style="margin-top: 15px">
          <el-row class="el-row7">
            <el-col :span="2"><div class="grid-content1" >生效期：</div></el-col>
            <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value22" placeholder="15" clearable></el-input></div></el-col>
            <el-col :span="2"><div class="grid-content1" >判决生效日：</div></el-col>
            <el-col :span="7"><div class="grid-content2" style="text-align: start">
              <el-date-picker
                  v-model="form1.value23"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
              </el-date-picker>
            </div></el-col>
          </el-row>
          <el-row class="el-row8">
            <el-col :span="2"><div class="grid-content1" >申请截止日：</div></el-col>
            <el-col :span="7"><div class="grid-content2" style="text-align: start">
              <el-date-picker
                  v-model="form1.value24"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
              </el-date-picker>
            </div></el-col>
            <el-col :span="2"><div class="grid-content1" >备注：</div></el-col>
            <el-col :span="7"><div class="grid-content2">
              <el-input v-model="form1.value25" clearable type="textarea"
                        autosize
                        maxlength="100">
              </el-input></div></el-col>
          </el-row>
        </el-form-item>
        <el-divider></el-divider>
        <span class="span1">申请执行</span>
        <el-form-item style="margin-top: 15px">
          <el-row class="el-row7">
            <el-col :span="3"><div class="grid-content1" >执行时效：</div></el-col>
            <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value26" clearable></el-input></div></el-col>
            <el-col :span="3"><div class="grid-content1" >申请执行日：</div></el-col>
            <el-col :span="7"><div class="grid-content2" style="text-align: start">
              <el-date-picker
                  v-model="form1.value27"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
              </el-date-picker>
            </div></el-col>
          </el-row>
          <el-row class="el-row8">
            <el-col :span="3"><div class="grid-content1" >执行时效截止日：</div></el-col>
            <el-col :span="7"><div class="grid-content2" style="text-align: start">
              <el-date-picker
                  v-model="form1.value28"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
              </el-date-picker>
            </div></el-col>
            <el-col :span="3"><div class="grid-content1" >备注：</div></el-col>
            <el-col :span="7"><div class="grid-content2">
              <el-input v-model="form1.value29" clearable type="textarea"
                        autosize
                        maxlength="100">
              </el-input></div></el-col>
          </el-row>
        </el-form-item>
        <el-button type="danger" style="margin-left: 40%;" @click="delSecond">删除二审信息</el-button>
      </div>

      <div v-if="third==3">
        <el-divider>再审审理</el-divider>
        <span class="span">再审审理</span>
        <el-form-item style="margin-top: 15px">
          <el-row class="el-row5">
            <el-col :span="2"><div class="grid-content1" >案号：</div></el-col>
            <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value30" clearable></el-input></div></el-col>
            <el-col :span="2"><div class="grid-content1" >审理法院：</div></el-col>
            <el-col :span="7"><div class="grid-content2">
              <el-select v-model="form1.value31"  clearable>
                <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div></el-col>
          </el-row>
          <el-row class="el-row6">
            <el-col :span="2"><div class="grid-content1" >审理法官：</div></el-col>
            <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value32" clearable></el-input></div></el-col>
            <el-col :span="2"><div class="grid-content1" >备注：</div></el-col>
            <el-col :span="7"><div class="grid-content2">
              <el-input v-model="form1.value33" clearable type="textarea"
                        autosize
                        maxlength="100">
              </el-input></div></el-col>
          </el-row>
        </el-form-item>
        <span class="span2">再审审理对象</span>
        <div>
          <div v-for="(iou,index) in formLabelAlign.iou"
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
          <el-form-item style="margin-left: 20%">
            <el-button type="primary" @click="addIou">新增借据</el-button>
            <el-button @click="resetIou">重置</el-button>
          </el-form-item>
        </div>
        <el-divider></el-divider>
        <span class="span1">再审判决中</span>
        <el-form-item style="margin-top: 15px">
          <el-row class="el-row7">
            <el-col :span="2"><div class="grid-content1" >生效期：</div></el-col>
            <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value34" placeholder="15" clearable></el-input></div></el-col>
            <el-col :span="2"><div class="grid-content1" >判决生效日：</div></el-col>
            <el-col :span="7"><div class="grid-content2" style="text-align: start">
              <el-date-picker
                  v-model="form1.value35"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
              </el-date-picker>
            </div></el-col>
          </el-row>
          <el-row class="el-row8">
            <el-col :span="2"><div class="grid-content1" >申请截止日：</div></el-col>
            <el-col :span="7"><div class="grid-content2" style="text-align: start">
              <el-date-picker
                  v-model="form1.value36"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
              </el-date-picker>
            </div></el-col>
            <el-col :span="2"><div class="grid-content1" >备注：</div></el-col>
            <el-col :span="7"><div class="grid-content2">
              <el-input v-model="form1.value37" clearable type="textarea"
                        autosize
                        maxlength="100">
              </el-input></div></el-col>
          </el-row>
        </el-form-item>
        <el-divider></el-divider>
        <span class="span1">申请执行</span>
        <el-form-item style="margin-top: 15px">
          <el-row class="el-row7">
            <el-col :span="3"><div class="grid-content1" >执行时效：</div></el-col>
            <el-col :span="7"><div class="grid-content2"><el-input v-model="form1.value38" clearable></el-input></div></el-col>
            <el-col :span="3"><div class="grid-content1" >申请执行日：</div></el-col>
            <el-col :span="7"><div class="grid-content2" style="text-align: start">
              <el-date-picker
                  v-model="form1.value39"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
              </el-date-picker>
            </div></el-col>
          </el-row>
          <el-row class="el-row8">
            <el-col :span="3"><div class="grid-content1" >执行时效截止日：</div></el-col>
            <el-col :span="7"><div class="grid-content2" style="text-align: start">
              <el-date-picker
                  v-model="form1.value40"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions">
              </el-date-picker>
            </div></el-col>
            <el-col :span="3"><div class="grid-content1" >备注：</div></el-col>
            <el-col :span="7"><div class="grid-content2">
              <el-input v-model="form1.value41" clearable
                        type="textarea"
                        autosize
                        maxlength="100"></el-input>
            </div></el-col>
          </el-row>
        </el-form-item>
        <el-button type="danger" style="margin-left: 40%;" @click="delThird">删除再审信息</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "JudicialInfo",
  data(){
    return{
      activeIndex:'5',
      first:1,
      second:1,
      third:2,
      temp_iouId:0,
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
        value10:'15天',
        value11:'',
        value12:'',
        value13:'',
        value14:'2年',
        value15:'',
        value16:'',
        value17:'',
        value18:'',
        value19:'',
        value20:'',
        value21:'',
        value22:'15天',
        value23:'',
        value24:'',
        value25:'',
        value26:'2年',
        value27:'',
        value28:'',
        value29:'',
        value30:'',
        value31:'',
        value32:'',
        value33:'',
        value34:'15天',
        value35:'',
        value36:'',
        value37:'',
        value38:'2年',
        value39:'',
        value40:'',
        value41:'',
      },
      options1:[{
        value: '丹阳法院',
        label: '丹阳法院'
      }, {
        value: '京口法院',
        label: '京口法院'
      }, {
        value: '润洲法院',
        label: '润洲法院'
      }, {
        value: '丹徒法院',
        label: '丹徒法院'
      }],
      formLabelAlign:{
        iou:[{key:'', value: ''}]
      },
      pickerOptions:[]
    }
  },
  methods:{
    reset(){
      this.form1 = this.$options.data().form1;
      this.formLabelAlign =this.$options.data().formLabelAlign
    },
    delFirst(){
      if(this.second==2){
        alert("请先删除二审信息！")
      }
      else {
        this.first--
      }
    },
    delSecond(){
      if(this.third==3){
        alert("请先删除再审信息！")
      }
      else {
        this.second--
      }
    },
    delThird(){
      this.third--
    },
    //借据对象
    addIou(){
      this.formLabelAlign.iou.push({key:this.getTempIouId,value: ''});
    },
    removeIou(iou){
      var index = this.formLabelAlign.iou.indexOf(iou);
      if (index !== -1) {
        this.formLabelAlign.iou.splice(index, 1);
      }
    },
    resetIou(){
      this.formLabelAlign.iou=[{key:this.getTempIouId, value: ''}];
    }
  },
  computed:{
    getTempIouId(){
      this.temp_iouId++;
    },
    getAddFirst(){
      this.first++
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
.span{
  font-size: 25px;
  font-weight: bold;
  font-family: 楷体;
  margin-left: 35%;
}
.span1{
  font-size: 20px;
  font-weight: bold;
  font-family: 黑体;
  margin-left: 20px;
}
.span2{
  font-size: 18px;
  font-weight: bold;
  font-family: 黑体;
  margin-left: 30px;
}
.grid-content1{
  background-color: #DCDFE6;
  text-align: end;
}
.el-icon-circle-plus,.el-icon-remove{
  font-size: 150%;
}
</style>
