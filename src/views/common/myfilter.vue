<template>
  <div class="myfilter-container">
    <div style="width:200px">
      <el-input placeholder="支持条件模糊搜索" v-model="search_input" @keyup.native.enter="filterSearch" ref="input">
        <el-button slot="append" icon="el-icon-search" @click.native="filterSearch"></el-button>
      </el-input>
    </div>
    <div>
      <div>
        <el-checkbox-group v-model="checkList">
          <div v-for="result in search_results">
            <el-checkbox :label="result" :key="result">{{result}}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </div>
    <div>
      <el-button type="text" @click.native="handleFilter" :disabled="isAbled">筛选</el-button>
      <el-button type="text" @click.native="selectAll">全选</el-button>
      <el-button type="text" @click.native="handleReset">重置</el-button>
    </div>
  </div>
</template>

<script>
import {default as api} from '../../utils/api'
export default {
  name: "myfilter",
  data(){
    return{
      checkList:[],
      search_results:[],
      search_input:'',
      tableData:[{}],  //回传给父组件（creditMenu）的主表数据tableData
      isAbled:true
    }
  },
  props:['label','property'],
  methods:{
    filterSearch(){
      let _this = this;
      api({
        url: "/filterSearch",
        method: "post",
        data: {
          "name":_this.property,
          "value":_this.$refs.input.value
        }
      }).then(data => {
        //返回的数据是列表形式的债权信息
        let _this = this;
        console.log(data);
        _this.tableData = data.data;
        //先清空筛选框中的搜索结果，将从返回的数据中获取相应表头（this.property）的对应值，比如获取表头为'zqr'的值，将其赋值给search_results
        //显示到筛选框中
        _this.search_results=[];
        let i;
        let list = data.data;
        for(i=0;i<list.length;i++){
          _this.search_results.push(list[i][_this.property]);
        }
        _this.checkList=[];
      }).catch(err => {
        console.log(err);
      })
    },
    //筛选按钮的点击事件，将被选中的复选框对应的债权信息回传给父组件
    handleFilter(){
      console.log(this.checkList);
      //获取选中checklist对应的债权信息
      let i;
      let filterItem={property:this.property,item:this.checkList};
      // for(i=0;i<this.tableData.length;i++)
      // {
      //   if(this.checkList.indexOf(this.tableData[i][this.property])>=0){
      //     check_tableData.push(this.tableData[i]);
      //   }
      // }
      this.$emit('click_filter',filterItem);
    },
    //重置
    handleReset(){
      this.checkList=[];
      this.isAbled=true;
      let filterItem={property:this.property,item:this.checkList};
      this.$emit('click_filter',filterItem);
    },
    //全选，全不选
    selectAll(){
      if(this.checkList.length===this.search_results.length){
        this.checkList=[];
        this.isAbled=true;
      }
      else{
        this.checkList=this.search_results;
        this.isAbled=false;
      }

    }
  },
  watch:{
    checkList:function (){
      if(this.checkList.length===0){
        this.isAbled=true;
      }
      else{
        this.isAbled=false;
      }
    }
  }
}
</script>

<style scoped>

.myfilter-container{
  width: 200px;
  /*height: 200px;*/
  /*background-color: black;*/
}
</style>