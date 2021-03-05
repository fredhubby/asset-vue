<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/Main"><i class="el-icon-s-home"></i></el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权信息</el-breadcrumb-item>
      <el-breadcrumb-item class="el-breadcrumb1">债权基础信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content1">
          <el-dropdown trigger="click">
            <el-button type="primary">
              新增<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <router-link
                  target="_blank"
                  :to="{path:'/creditInfo/FInfo', query:{claimType:''} }">
                <el-dropdown-item>普通债权</el-dropdown-item>
              </router-link>
              <router-link
                  :to="(multipleSelection.length!==1)?('#'):({path:'/creditInfo/FInfo',query:{claimType : '资产包', assetPackageId:multipleSelection[0].assetPackageId}})"
                  :target="(multipleSelection.length!==1)?('_self'):('_blank')">
                <el-dropdown-item :disabled="Boolean(multipleSelection.length!==1)">资产包债权</el-dropdown-item>
              </router-link>
              <router-link
                  :to="(multipleSelection.length===0)?('#'):({path:'/creditInfo/SMortgage',query:{creditList:JSON.stringify(multipleSelection_iou)}})"
                  :target="(multipleSelection.length===0)?('_self'):('_blank')">
                <el-dropdown-item :disabled="Boolean(multipleSelection.length===0)">担保抵押信息</el-dropdown-item>
              </router-link>
              <router-link
                  :to="(multipleSelection.length===0)?('#'):({path:'/creditInfo/fee',query:{creditList:JSON.stringify(multipleSelection_iou)}})"
                  :target="(multipleSelection.length===0)?('_self'):('_blank')">
                <el-dropdown-item :disabled="Boolean(multipleSelection.length===0)">债权费用信息</el-dropdown-item>
              </router-link>
              <router-link
                  :to="(multipleSelection.length!==1)?('#'):({path:'/creditRecall/recallXq',query:{iou:multipleSelection[0].id}})"
                  :target="(multipleSelection.length!==1)?('_self'):('_blank')">
                <el-dropdown-item :disabled="Boolean(multipleSelection.length!==1)">还款信息</el-dropdown-item>
              </router-link>
            </el-dropdown-menu>
          </el-dropdown>
<!--          <el-cascader-->
<!--            v-model="new_value"-->
<!--            :options="new_options"-->
<!--            placeholder="新增"-->
<!--            :props="{ expandTrigger: 'hover' }"-->
<!--            @change="handleCascaderChange">-->
<!--          </el-cascader>-->
          <el-button>数据导出</el-button>
          <el-button>打印</el-button>
          <el-popconfirm
              title="确定删除借据数据？"
              @confirm="deleteCreditList"
              >
            <el-button slot="reference">删除</el-button>
          </el-popconfirm>
<!--          <el-button>删除</el-button>-->
          <el-button>隐藏列</el-button>
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
        <span>债权记录</span>
      </div>
      <div  class="text item">
        <el-table :data="tableData" border height="500" style="width: 100%" class="el-table"
                  ref="filterTable" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="id" label="借据号" width="200" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="contractNo" label="借款合同号" width="200" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="assetPackageId" label="资产包ID" width="200" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="obligor" label="债务人" width="150" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="region" label="所在镇区" width="150" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="creditor" label="债权人" width="150" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="originalCreditor" label="原债权人" width="150" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="claimsType" label="债权类别" width="150" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="loanCompensationDate" label="借款(代偿)日" width="100" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="loanCompensationDueDate" label="借款(代偿)到期日" width="120" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="principalOfLoan" label="交易日借款本金" width="120" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="annualInterestRate" label="借款年利率" width="120" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="penaltyAnnualInterestRate" label="逾期罚息年利率" width="120" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="loanInterest" label="交易日借款利息" width="120" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="tradingBaseDate" label="交易基准日" width="120" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="transferType" label="是否转让" width="120" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="acquisitionCost" label="取得成本" width="120" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="valuationPrice" label="评估价格" width="120" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="transferPrice" label="转让价格" width="120" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="claimsProgress" label="债权转让进度" width="120" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="remarks" label="备注" width="120" :render-header="renderHeader"></el-table-column>
          <el-table-column prop="operate" fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="creditDetail(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination style="margin-top: 10px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalsize">
<!--            :hide-on-single-page="true">-->
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import myfilter from "../../common/myfilter";
import {default as api} from "@/utils/api";
export default {
  name: "creditMenu",
  data(){
    return{
      input1:'',
      currentPage: 1,
      pagesize:10,
      totalsize:10,
      tableData: [{
      }],
      filterItems:{
      },
      multipleSelection:[],
      new_value:[],
      new_options: [{
        value: 'creditBasic',
        label: '债权基本信息',
        children: [{
          value: 'assetPackage',
          label: '资产包债权',
        }, {
          value: 'commonCredit',
          label: '普通债权',
        }]
      }, {
        value: 'danbaodiya',
        label: '担保抵押信息',
        children: [{
          value: 'baozheng',
          label: '保证担保',
        }, {
          value: 'diya',
          label: '抵押担保',
        }, {
          value: 'zhiya',
          label: '质押担保',
        }, {
          value: 'other_danbao',
          label: '其它担保',
        }]
      }, {
        value: 'fee',
        label: '费用',
        children: [{
          value: 'susong',
          label: '诉讼费'
        }, {
          value: 'zhixing',
          label: '执行费'
        }, {
          value: 'baoquan',
          label: '保全费'
        }, {
          value: 'other_fee',
          label: '其它费用'
        }, {
          value: 'duijia',
          label: '债权支付对价'
        }]
      }]
    }
  },
  created() {
    this.pagesize=10;
    this.currentPage=1;
    this.getCreditList();
  },
  methods:{
    renderHeader(h, { column }) {
      return h("div",
          [
            h("span", column.label),
            h('span',{
                  style:'position: relative;left:3px'
                },
                [
                  h("i",{
                    class: "el-icon-caret-top",
                    style:'display:inline-block;color:#409EFF;position: absolute;',
                    attrs: {id: "el-icon-caret-top"+column.property},
                    on:{
                      click:()=>{
                        const top = document.getElementById("el-icon-caret-top"+column.property);
                        const bottom = document.getElementById("el-icon-caret-bottom"+column.property);
                        console.log(top);
                        console.log(bottom);
                        top.style.color = '#409EFF';
                        bottom.style.color = '#C0C4CC';
                        this.sortByAscend();
                      }
                    }
                  }),
                  h("i",{
                    class: "el-icon-caret-bottom",
                    style:'display:inline-block;color:#C0C4CC;position: absolute;top:5px',
                    attrs: {id: "el-icon-caret-bottom"+column.property},
                    on:{
                      click:()=>{
                        const top = document.getElementById("el-icon-caret-top"+column.property);
                        const bottom = document.getElementById("el-icon-caret-bottom"+column.property);
                        bottom.style.color = '#409EFF';
                        top.style.color = '#C0C4CC';
                        this.sortByDescend();
                      }
                    }
                  }),
                  h("el-popover", {
                        props:{placement : "bottom", trigger:"click"},
                        style:'position:absolute;left:17px'
                      },
                      [
                        h(myfilter, {
                          props:{label:column.label, property:column.property},
                          on: {click_filter: this.clickFilter}
                        }),
                        h("i", {
                          slot:"reference",
                          class:'el-icon-arrow-down'
                        })
                      ])
                ]),
          ]);
    },
    getCreditList(){
      var _this = this;
      api({
        url: "CreditInfo/getCreditList",
        method: "get",
        params:{
          current:_this.currentPage,
          size:_this.pagesize
        }
      }).then(data => {
        console.log(data);
        this.tableData = data.data.datas.records;
        this.totalsize = data.data.datas.total;
      }).catch(err => {
        console.log(err);
      })
    },
    deleteCreditList(){
      if(this.multipleSelection_iou.length===0){
        alert('请先选择要删除的借据');
      }
      else{
        var _this = this;
        api({
          url: "/CreditInfo/deleteFundamentalCredit",
          method: "post",
          data:this.multipleSelection_iou
        }).then(data => {
          console.log(data);
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }
    },
    creditDetail(row){
      this.$router.push({path:'/creditInfo/creditFinfo/xqCreditFinfo',query:{iou:row.id}})
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
      console.log(val);
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pagesize=val;
      this.getCreditList();
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getCreditList();
    },
    handleCascaderChange(){
      console.log(this.new_value)
    },
    //子组件myfilter点击筛选传过来的债权信息数据
    clickFilter(item){
      // this.filterItems[item['property']]=item['item']
      // api({
      //   url: "/combinedQuery",
      //   method: "post",
      //   data: this.filterItems
      // }).then(data => {
      //   this.tableData=data.data;
      //   console.log(data.data);
      // }).catch(err => {
      //   console.log(err);
      // })
    },
    sortByAscend(){
      console.log('sortByAscend')
      // api({
      //   url: "/sortByAscend",
      //   method: "post",
      //   data: {
      //     "name":_this.property,
      //     "value":_this.$refs.input.value
      //   }
      // }).then(data => {
      //
      // }).catch(err => {
      //   console.log(err);
      // })
    },
    sortByDescend(){
      console.log('sortByDescend')
    },

  },
  computed:{
    multipleSelection_iou:function (){
      let ious=[];
      let i;
      for(i=0;i<this.multipleSelection.length;i++){
        ious.push(this.multipleSelection[i].id);
      }
      console.log('ious')
      console.log(ious)
      return ious;
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
.el-row{
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