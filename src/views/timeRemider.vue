<template>
  <div>
    <span class="el-main-span1">今日，</span><br/>
    <span class="el-main-span2">{{todayDateTime}}，欢迎使用债权清收管理系统</span>
    <el-row :gutter="20" class="el-row2">
      <el-col :span="22">
        <el-card class="boxcard1" shadow="hover">
          <div slot="header" class="clearfix">
            <span style="font-family: 宋体; font-weight: bold"><i class="el-icon-message-solid"></i>时限提醒通知</span>
          </div>
          <el-tabs v-model="activeModel" @tab-click="changeModel">
            <el-tab-pane label="担保期间" name="first">
              <el-table
                  :height="tableHeight"
                  :data="timeTableData.first"
                  :row-class-name="tableRowClassName"
                  style="width: 100%">
                <el-table-column prop="type" sortable label="期限类型" width="140px"></el-table-column>
                <el-table-column prop="StartDate" sortable label="起始日"></el-table-column>
                <el-table-column prop="EndDate" sortable label="到期日"></el-table-column>
                <el-table-column prop="state" sortable label="状态" width="90px"></el-table-column>
                <el-table-column prop="left_days" sortable label="剩余时间" width="90px"></el-table-column>
                <el-table-column prop="guarantor" label="担保人"></el-table-column>
                <el-table-column prop="info" label="具体信息"></el-table-column>
                <el-table-column prop="operate" label="操作" fixed="right" width="90px">
                  <template slot-scope="scope">
                    <el-button  @click="timeDetail(scope.row,scope.$index)" type="text" size="small">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="借款到期日" name="second">
              <el-table
                  :data="timeTableData.second"
                  :row-class-name="tableRowClassName"
                  style="width: 100%">
                <!--                        <el-table-column prop="type" sortable label="借款到期日" width="140px"></el-table-column>-->
                <el-table-column prop="info" label="借据号"></el-table-column>
                <el-table-column prop="StartDate" sortable label="起始日"></el-table-column>
                <el-table-column prop="EndDate" sortable label="到期日"></el-table-column>
                <el-table-column prop="state" sortable label="状态" width="90px"></el-table-column>
                <el-table-column prop="left_days" sortable label="剩余时间" width="90px"></el-table-column>
                <el-table-column prop="guarantor" label="债务人"></el-table-column>
                <el-table-column prop="operate" label="操作" fixed="right" width="90px">
                  <template slot-scope="scope">
                    <el-button  @click="timeDetail(scope.row,scope.$index)" type="text" size="small">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="诉讼时效" name="third">
              <el-table
                  :data="timeTableData.third"
                  :row-class-name="tableRowClassName"
                  style="width: 100%">
                <!--                        <el-table-column prop="type" sortable label="时效类型" width="140px"></el-table-column>-->
                <el-table-column prop="info" label="借据号"></el-table-column>
                <el-table-column prop="StartDate" sortable label="起始日"></el-table-column>
                <el-table-column prop="EndDate" sortable label="到期日"></el-table-column>
                <el-table-column prop="state" sortable label="状态" width="90px"></el-table-column>
                <el-table-column prop="left_days" sortable label="剩余时间" width="90px"></el-table-column>
                <el-table-column prop="guarantor" label="债务人"></el-table-column>
                <el-table-column prop="operate" label="操作" fixed="right" width="90px">
                  <template slot-scope="scope">
                    <el-button  @click="timeDetail(scope.row,scope.$index)" type="text" size="small">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="保全时效" name="four">
              <el-table
                  :data="timeTableData.four"
                  :row-class-name="tableRowClassName"
                  style="width: 100%">
                <el-table-column prop="type" sortable label="时效类型" width="140px"></el-table-column>
                <el-table-column prop="StartDate" sortable label="起始日"></el-table-column>
                <el-table-column prop="EndDate" sortable label="到期日"></el-table-column>
                <el-table-column prop="state" sortable label="状态" width="90px"></el-table-column>
                <el-table-column prop="left_days" sortable label="剩余时间" width="90px"></el-table-column>
                <el-table-column prop="info" label="具体信息"></el-table-column>
                <el-table-column prop="operate" label="操作" fixed="right" width="90px">
                  <template slot-scope="scope">
                    <el-button  @click="timeDetail(scope.row,scope.$index)" type="text" size="small">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="执行时效" name="five">
              <el-table
                  :data="timeTableData.five"
                  :row-class-name="tableRowClassName"
                  style="width: 100%">
                <el-table-column prop="StartDate" sortable label="起始日"></el-table-column>
                <el-table-column prop="EndDate" sortable label="到期日"></el-table-column>
                <el-table-column prop="state" sortable label="状态" width="90px"></el-table-column>
                <el-table-column prop="left_days" sortable label="剩余时间" width="90px"></el-table-column>
                <el-table-column prop="info" label="司法ID"></el-table-column>
                <el-table-column prop="operate" label="操作" fixed="right" width="90px">
                  <template slot-scope="scope">
                    <el-button  @click="timeDetail(scope.row,scope.$index)" type="text" size="small">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="申请上述时效" name="six">
              <el-table
                  :data="timeTableData.six"
                  :row-class-name="tableRowClassName"
                  style="width: 100%">
                <el-table-column prop="StartDate" sortable label="起始日"></el-table-column>
                <el-table-column prop="EndDate" sortable label="到期日"></el-table-column>
                <el-table-column prop="state" sortable label="状态" width="90px"></el-table-column>
                <el-table-column prop="left_days" sortable label="剩余时间" width="90px"></el-table-column>
                <el-table-column prop="info" label="司法ID"></el-table-column>
                <el-table-column prop="operate" label="操作" fixed="right" width="90px">
                  <template slot-scope="scope">
                    <el-button  @click="timeDetail(scope.row,scope.$index)" type="text" size="small">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :span="8">
        <!--                <el-card class="boxcard2" shadow="hover">-->
        <!--                  <div slot="header" class="clearfix">-->
        <!--                    <span style="font-family: 宋体; font-weight: bold"><i class="el-icon-s-claim"></i>使用记录</span>-->
        <!--                  </div>-->
        <!--                  <div v-for="o in 4" :key="o" style="padding-top: 10px">-->
        <!--                    {{'列表内容 ' + o }}-->
        <!--                  </div>-->
        <!--                </el-card>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {default as api} from "@/utils/api";

export default {
  name: "timeRemider",
  data(){
    return{
      todayDateTime:'',
      activeModel:'first',
      timeTableData:{
        first:[],
        second:[],
        third:[],
        four:[],
        five:[],
        six:[],
      },
      tableHeight:window.innerHeight - 400,
    }
  },
  mounted () {
    window.onresize = () => {
      return (() => {
        this.tableHeight = window.innerHeight - 400
      })()
    }
  },
  activated () {
    this.tableHeight = window.innerHeight - 400
  },
  created() {
    Promise.all([
      this.getNotice('/notice/noticeSecure'),
      this.getNotice('/notice/noticeBorrowingDue'),
      this.getNotice('/notice/noticeLimitationsStatute'),
      this.getNotice('/notice/noticePreservationPeriod'),
      this.getNotice('/notice/noticeEnforcementStatute'),
      this.getNotice('/notice/noticeAboveApply'),
    ]).then(res => {
      console.log(res);
      this.setTableData(res);
    }).catch(err => {
      console.log(err);
    })
    this.getDate();
  },
  methods:{
    getDate(){
      var that = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      that.todayDateTime = yy+'年'+mm+'月'+dd+'日';
    },
    tableRowClassName({row, rowIndex}) {
      // if (rowIndex === 1) {
      //   return 'warning-row';
      // } else if (rowIndex === 2) {
      //   return 'success-row';
      // } else if (rowIndex === 3) {
      //   return 'danger-row';
      // }
      return '';
    },
    getNotice(url){
      let p1 = new Promise(((resolve, reject) => {
        api({
          url: url,
          method: "get",
          params:''
        }).then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        })
      }))
      return p1;
    },
    setTableData(res){
      this.timeTableData = {first:[], second:[], third:[], four:[], five:[], six:[]};
      this.setCollateral(res[0].data.datas.collateralDaoList,'抵押期限','即将到期')
      this.setCollateral(res[0].data.datas.pledgesDaoList,'质押期限','即将到期')
      this.setCollateral(res[0].data.datas.assuranceDaoList,'担保期限','即将到期')
      this.setCollateral(res[0].data.datas.dueCollateralDaoList,'抵押期限','已到期')
      this.setCollateral(res[0].data.datas.duePledgesDaoList,'质押期限','已到期')
      this.setCollateral(res[0].data.datas.dueAssuranceDaoList,'担保期限','已到期')
      this.setMain(res[1].data.datas.iouMainDaoDaoList,'即将到期')
      this.setMain(res[1].data.datas.dueIouMainDaoDaoList,'已到期')
      this.setLimitation(res[2].data.datas.iouMainDaoDaoList,'即将到期')
      this.setLimitation(res[2].data.datas.dueIouMainDaoDaoList,'已到期')
      this.setPreserv(res[3].data.datas.preservationPeriodList,'即将到期')
      this.setPreserv(res[3].data.datas.duePreservationPeriodList,'已到期')
      this.setexcute(res[4].data.datas.preservationPeriodList,'即将到期')
      this.setexcute(res[4].data.datas.duePreservationPeriodList,'已到期')
      this.setApply(res[5].data.datas.preservationPeriodList,'即将到期')
      this.setApply(res[5].data.datas.duePreservationPeriodList,'已到期')
    },
    setCollateral(data,type,state){
      data.forEach((value,index) => {
        this.timeTableData.first.push({
          id:value.id, type:type, guaranteeId:value.guaranteeId,
          StartDate:value.guaranteeStartDate, EndDate:value.guaranteeEndDate, reminderDay:value.reminderDay,
          guarantor:value.guarantor, info:value.collateralName, state:state,
          left_days:(state==='即将到期')?this.$moment(value.guaranteeEndDate,"YYYY-MM-DD").diff(this.$moment().format("YYYY-MM-DD"),"days"):'',
          index:index,
        })
      })
    },
    setMain(data,state){
      data.forEach((value,index) => {
        this.timeTableData.second.push({
          id:value.id, type:'借款到期日',
          StartDate:value.loanCompensationDate, EndDate:value.loanCompensationDueDate, reminderDay:30,
          guarantor:value.creditor, info:value.id, state:state,
          left_days:(state==='即将到期')?this.$moment(value.loanCompensationDueDate,"YYYY-MM-DD").diff(this.$moment().format("YYYY-MM-DD"),"days"):'',
          index:index,
        })
      })
    },
    setLimitation(data,state){
      data.forEach((value,index) => {
        this.timeTableData.third.push({
          id:value.id, type:'诉讼时效',
          StartDate:value.limitationOfActionStartDate, EndDate:value.limitationOfActionEndDate, reminderDay:value.actionNoticeTime,
          guarantor:value.creditor, info:value.id, state:state,
          left_days:(state==='即将到期')?this.$moment(value.limitationOfActionEndDate,"YYYY-MM-DD").diff(this.$moment().format("YYYY-MM-DD"),"days"):'',
          index:index,
        })
      })
    },
    setexcute(data,state){
      data.forEach((value,index) => {
        this.timeTableData.five.push({
          id:value.id, type:'执行时效',judicialStatusId:value.judicialStatusId,
          StartDate:value.startDate, EndDate:value.endDate, reminderDay:value.reminderDay,
          guarantor:'', info:value.judicialStatusId, state:state,
          left_days:(state==='即将到期')?this.$moment(value.endDate,"YYYY-MM-DD").diff(this.$moment().format("YYYY-MM-DD"),"days"):'',
          index:index,
        })
      })
    },
    setPreserv(data,state){
      let typeIndex = {'0':'账户查封期限', '1':'动产查封期限', '2':'不动产查封期限', '3':'其它查封期限', '4':'执行时效', '5':'可申请上述时效'};
      data.forEach((value,index) => {
        this.timeTableData.four.push({
          id:value.id, type:typeIndex[value.type],judicialStatusId:value.judicialStatusId,
          StartDate:value.startDate, EndDate:value.endDate, reminderDay:value.reminderDay,
          guarantor:'', info:value.info, state:state,
          left_days:(state==='即将到期')?this.$moment(value.endDate,"YYYY-MM-DD").diff(this.$moment().format("YYYY-MM-DD"),"days"):'',
          index:index,
        })
      })
    },
    setApply(data,state){
      data.forEach((value,index) => {
        this.timeTableData.six.push({
          id:value.id, type:'可申请上述时效',judicialStatusId:value.judicialStatusId,
          StartDate:value.startDate, EndDate:value.endDate, reminderDay:value.reminderDay,
          guarantor:'', info:value.judicialStatusId, state:state,
          left_days:(state==='即将到期')?this.$moment(value.endDate,"YYYY-MM-DD").diff(this.$moment().format("YYYY-MM-DD"),"days"):'',
          index:index,
        })
      })
    },
    changeModel(){

    },
    timeDetail(row,index){
      if(this.activeModel==='first'){
        let url = (row.type==='抵押期限')?'/Secure/getSecureByCollateralGuaranteeId':(row.type==='质押期限')?'/Secure/getSecureByPledgesGuaranteeId':(row.type==='担保期限')?'/Secure/getSecureByAssuranceGuaranteeId':'';
        let type = (row.type==='抵押期限')?'0':(row.type==='质押期限')?'1':(row.type==='担保期限')?'2':'';
        api({
          url: url,
          method: "get",
          params:{guaranteeId:row.guaranteeId},
        }).then(data => {
          this.$router.push({path:'/creditInfo/creditFinfo/xqSmortgage',query:{iou:data.data.datas.iouIdList[0],type:type,id:row.id}});
        }).catch(err => {
          console.log(err);
        })
      }
      else if(this.activeModel==='second'){
        this.$router.push({path:'/creditInfo/creditFinfo/xqCreditFinfo',query:{iou:row.id}});
      }
      else if(this.activeModel==='third'){
        this.$router.push({path:'/creditInfo/creditFinfo/xqCollection',query:{iou:row.id}});
      }
      else if(this.activeModel==='four'){
        api({
          url: '/Judicial/getIouIdByJudicialId',
          method: "get",
          params:{id:row.judicialStatusId},
        }).then(data => {
          this.$router.push({path:'/creditInfo/creditFinfo/xqJudicature',query:{iou:data.data.datas[0]}});
        }).catch(err => {
          console.log(err);
        })
        // this.$router.push({path:'/creditInfo/creditFinfo/xqJudicature',query:{iou:row.id}});
      }
      else if(this.activeModel==='five'){
        api({
          url: '/Judicial/getIouIdByJudicialId',
          method: "get",
          params:{id:row.judicialStatusId},
        }).then(data => {
          this.$router.push({path:'/creditInfo/creditFinfo/xqJudicature',query:{iou:data.data.datas[0]}});
        }).catch(err => {
          console.log(err);
        })
        // this.$router.push({path:'/creditInfo/creditFinfo/xqJudicature',query:{iou:row.id}});
      }
      else if(this.activeModel==='six'){
        api({
          url: '/Judicial/getIouIdByJudicialId',
          method: "get",
          params:{id:row.judicialStatusId},
        }).then(data => {
          this.$router.push({path:'/creditInfo/creditFinfo/xqJudicature',query:{iou:data.data.datas[0]}});
        }).catch(err => {
          console.log(err);
        })
        // this.$router.push({path:'/creditInfo/creditFinfo/xqJudicature',query:{iou:row.id}});
      }
    },
  }
}
</script>

<style scoped>
.boxcard1 >>> .el-card__body{
  padding: 0 15px 0 15px;
}
</style>